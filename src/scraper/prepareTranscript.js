'use strict';

/**
 * src/scraper/prepareTranscript.js
 *
 * Transcript preparation: gets an ad's Details dialog into a single,
 * consistent, extraction-ready state, regardless of which of two valid
 * UI states GetHook starts in:
 *
 *   (a) a transcript already exists, or
 *   (b) a "Generate Transcription" button must be clicked first.
 *
 * It also ensures the "Show timestamps" toggle is off before handing off
 * to extraction, so extraction itself doesn't have to filter that back
 * out of the rendered text.
 *
 * Reuses:
 *   - src/scraper/details.js (openFirstAdDetails) to open the panel.
 *   - src/scraper/transcript.js (openTranscriptTab) to open the tab.
 *
 * Does not extract, read, or analyze the transcript text itself — that
 * stays the sole responsibility of src/scraper/extract.js.
 *
 * Extensibility note: the Details dialog also has a "Share" button in its
 * toolbar. A future phase will click it and read a clipboard URL to store
 * per ad — not implemented here. This module resolves and returns the
 * `dialog` locator so that future step can locate the Share button the
 * same way this one locates the timestamps toggle, without re-deriving
 * the dialog itself.
 */

const { openAdDetails } = require('./details');
const { openTranscriptTab } = require('./transcript');
const { log, warn } = require('../browser/logger');

const ACTION_TIMEOUT_MS = 15000;
const GENERATE_BUTTON_PROBE_MS = 3000;
const GENERATE_CLICK_ATTEMPTS = 3;
const GENERATION_FLOW_ATTEMPTS = 3;
const STABILITY_TIMEOUT_MS = 5000;
const POLL_MS = 200;
const STABLE_CHECKS_REQUIRED = 2;
const GENERATE_BUTTON_NAME_PATTERN = /generate transcri/i;
const TIMESTAMPS_TOGGLE_SELECTOR = 'label:has-text("Show timestamps") [role="switch"]';
const TRANSCRIBE_API_PATTERN = /\/api\/ad-script\/transcribe(\?|$)/;

/**
 * Distinguishes a real backend failure (confirmed live via
 * /api/ad-script/transcribe returning transcription_status: "failed" and
 * an empty transcription array for a specific ad's media) from a scraper
 * defect. Callers use this to route the ad to a "skipped" result instead
 * of counting it as an error — there's nothing the scraper could have
 * done differently.
 */
class BackendTranscriptionFailedError extends Error {
  constructor(transcriptionStatus) {
    super(`GetHook's backend reported transcription_status="${transcriptionStatus}" for this ad's media.`);
    this.name = 'BackendTranscriptionFailedError';
    this.transcriptionStatus = transcriptionStatus;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Watches the page for /api/ad-script/transcribe responses (both the
 * POST that starts a job and the GET polls that check it) and remembers
 * the most recently seen transcription_status. Must be stopped once the
 * caller is done with it, since the underlying listener stays on `page`
 * for the whole run otherwise.
 */
function watchTranscriptionStatus(page) {
  let latestStatus = null;

  const handler = async (response) => {
    if (!TRANSCRIBE_API_PATTERN.test(response.url())) return;
    try {
      const body = await response.json();
      if (body && typeof body.transcription_status === 'string') {
        latestStatus = body.transcription_status;
      }
    } catch {
      // Non-JSON or unreadable response; nothing to record.
    }
  };

  page.on('response', handler);

  return {
    stop: () => page.off('response', handler),
    getStatus: () => latestStatus,
  };
}

/**
 * Waits for a locator's bounding box to stop moving across consecutive
 * polls. GetHook can re-render the "Generate Transcription" button's
 * subtree shortly after the dialog opens (observed live: Playwright
 * reports "element is not stable" then "detached from the DOM, retrying"
 * when a click races that re-render), so a bare visibility check isn't
 * enough — this confirms the node has actually settled before it's
 * clicked. An unreadable box (element momentarily detached) counts as
 * "not yet stable" rather than an error.
 */
async function waitForBoundingBoxToSettle(locator, timeoutMs = STABILITY_TIMEOUT_MS) {
  const deadline = Date.now() + timeoutMs;
  let lastBox = null;
  let stableCount = 0;

  while (Date.now() < deadline) {
    const box = await locator.boundingBox().catch(() => null);
    const key = box ? `${box.x},${box.y},${box.width},${box.height}` : null;

    if (key && key === lastBox) {
      stableCount += 1;
      if (stableCount >= STABLE_CHECKS_REQUIRED) return true;
    } else {
      stableCount = key ? 1 : 0;
    }
    lastBox = key;
    await sleep(POLL_MS);
  }
  return false;
}

/**
 * Clicks the "Generate Transcription" button, tolerating the mid-render
 * race described above: waits for the button to stop moving before each
 * attempt, and retries a bounded number of times if a click still fails
 * to land. If the button disappears between attempts, a prior click most
 * likely already registered before Playwright reported it as failed —
 * that's left for the caller's transcript-content check to confirm
 * either way, rather than treated as an error here.
 */
async function clickGenerateButtonWithRetry(button) {
  let lastError = null;

  for (let attempt = 1; attempt <= GENERATE_CLICK_ATTEMPTS; attempt++) {
    const stillVisible = await button
      .waitFor({ state: 'visible', timeout: GENERATE_BUTTON_PROBE_MS })
      .then(() => true)
      .catch(() => false);

    if (!stillVisible) {
      log(
        'PREPARE',
        '"Generate Transcription" button no longer present — assuming a prior click already registered.'
      );
      return;
    }

    await waitForBoundingBoxToSettle(button);

    try {
      await button.click({ timeout: ACTION_TIMEOUT_MS });
      return;
    } catch (err) {
      lastError = err;
      warn(
        'PREPARE',
        `"Generate Transcription" click attempt ${attempt}/${GENERATE_CLICK_ATTEMPTS} failed ` +
          '(button likely re-rendered mid-click); retrying.'
      );
    }
  }

  throw lastError;
}

/**
 * Waits for a locator's rendered text to become non-empty and unchanged
 * across consecutive polls — the condition-based equivalent of "content
 * has finished rendering," since there's no Playwright event for that.
 */
async function waitForTextToSettle(locator, timeoutMs = ACTION_TIMEOUT_MS) {
  const deadline = Date.now() + timeoutMs;
  let lastText = null;
  let stableCount = 0;

  while (Date.now() < deadline) {
    const text = (await locator.innerText().catch(() => '')).trim();
    if (text.length > 0 && text === lastText) {
      stableCount += 1;
      if (stableCount >= STABLE_CHECKS_REQUIRED) return text;
    } else {
      stableCount = text.length > 0 ? 1 : 0;
    }
    lastText = text;
    await sleep(POLL_MS);
  }
  return (lastText || '').trim();
}

/**
 * UI state (b): if a "Generate Transcription" button is present, click it
 * and wait for real transcript content to appear and settle (no fixed
 * sleep — a content-stability poll instead). If absent, state (a) is
 * assumed: a transcript already exists.
 *
 * Generation can silently fail/revert for a given ad: the click lands,
 * the button briefly hides, but the panel ends up back at its untouched
 * state — and since that state's only text is the button's own label
 * ("Generate Transcription"), a plain non-empty/stable check treats it
 * as valid content (confirmed live: settled text was exactly that label,
 * panel otherwise empty, no downstream controls ever rendered). So a
 * settled result matching the button's own name is rejected as content,
 * and the whole click-and-wait flow is retried a bounded number of times
 * before giving up with an error that names what actually happened.
 *
 * Separately, GetHook's backend can genuinely fail to produce a
 * transcript for a given ad's media (confirmed live via
 * /api/ad-script/transcribe responding transcription_status: "failed",
 * transcription: []) — that's not a scraper defect and retrying the
 * click won't fix it. The frontend can also show a brief transient
 * "settled" state before the backend's own poll loop reports the failure
 * a few seconds later (confirmed live: content settled and passed this
 * function's checks, then the toggle wait failed afterward once the
 * backend's "failed" response actually arrived) — so `statusWatcher` is
 * created by the caller and kept alive across the timestamps step too,
 * not just this function, and is checked again there.
 */
async function ensureTranscriptGenerated(statusWatcher, dialog, transcriptPanel) {
  const generateButton = dialog.getByRole('button', { name: GENERATE_BUTTON_NAME_PATTERN }).first();
  const present = await generateButton
    .waitFor({ state: 'visible', timeout: GENERATE_BUTTON_PROBE_MS })
    .then(() => true)
    .catch(() => false);

  if (!present) {
    log('PREPARE', '"Generate Transcription" button not present — transcript already exists.');
    return { required: false, clicked: false, settledText: await waitForTextToSettle(transcriptPanel) };
  }

  let text = '';

  for (let attempt = 1; attempt <= GENERATION_FLOW_ATTEMPTS; attempt++) {
    log(
      'PREPARE',
      `"Generate Transcription" button found. Clicking (generation attempt ${attempt}/${GENERATION_FLOW_ATTEMPTS})...`
    );
    await clickGenerateButtonWithRetry(generateButton);

    await generateButton.waitFor({ state: 'hidden', timeout: ACTION_TIMEOUT_MS }).catch(() => {
      warn('PREPARE', '"Generate Transcription" button did not disappear within the timeout; continuing.');
    });

    text = await waitForTextToSettle(transcriptPanel);

    const backendStatus = statusWatcher.getStatus();
    if (backendStatus === 'failed') {
      log(
        'PREPARE',
        `GetHook's backend reported transcription_status="failed" for this ad — not retrying further.`
      );
      throw new BackendTranscriptionFailedError(backendStatus);
    }

    if (text && !GENERATE_BUTTON_NAME_PATTERN.test(text)) {
      log('PREPARE', 'Transcript generated and content has settled.');
      return { required: true, clicked: true, settledText: text };
    }

    warn(
      'PREPARE',
      `Generation attempt ${attempt}/${GENERATION_FLOW_ATTEMPTS} did not produce real transcript content ` +
        `(settled text was ${JSON.stringify(text)} — looks like the button's own label, not a transcript); ` +
        (attempt < GENERATION_FLOW_ATTEMPTS ? 're-attempting.' : 'giving up.')
    );
  }

  throw new Error(
    `Transcript generation did not produce real content after ${GENERATION_FLOW_ATTEMPTS} attempts ` +
      `(last settled text: ${JSON.stringify(text)}).`
  );
}

/**
 * Ensures "Show timestamps" is off, using the exact control confirmed by
 * live DOM inspection: a role="switch" div nested inside the <label>
 * that contains the "Show timestamps" text — a sibling of that text, not
 * an ancestor of it. Its accessible name doesn't resolve reliably (it
 * carries no aria-label of its own, and implicit labelling-by-wrapping
 * only applies to native form controls, not an arbitrary role="switch"
 * div), so it can't be found by role+name; its position relative to the
 * label text is what's stable here, independent of generated ids or CSS
 * classes. State is read solely from aria-checked, the mechanism this
 * control actually uses (not data-state, which belongs to an unrelated
 * ancestor — the Radix Tabs panel — and caused a false match previously).
 */
async function ensureTimestampsDisabled(dialog, transcriptPanel) {
  const toggle = dialog.locator(TIMESTAMPS_TOGGLE_SELECTOR);
  await toggle.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT_MS });

  const initialChecked = await toggle.getAttribute('aria-checked');
  const initiallyOn = initialChecked === 'true';
  log(
    'PREPARE',
    `"Show timestamps" aria-checked="${initialChecked}" (${initiallyOn ? 'ENABLED' : 'DISABLED'}).`
  );

  if (!initiallyOn) {
    log('PREPARE', 'Timestamps already disabled; nothing to do.');
    return {
      selector: TIMESTAMPS_TOGGLE_SELECTOR,
      initialChecked,
      finalChecked: initialChecked,
      initiallyOn,
      disabled: true,
      actionTaken: false,
    };
  }

  log('PREPARE', 'Disabling "Show timestamps"...');
  await toggle.click({ timeout: ACTION_TIMEOUT_MS });

  const deadline = Date.now() + ACTION_TIMEOUT_MS;
  let finalChecked = initialChecked;
  let stateOff = false;
  while (Date.now() < deadline) {
    finalChecked = await toggle.getAttribute('aria-checked');
    if (finalChecked === 'false') {
      stateOff = true;
      break;
    }
    await sleep(POLL_MS);
  }
  if (!stateOff) {
    throw new Error(`aria-checked did not become "false" after clicking (last seen: "${finalChecked}").`);
  }
  log('PREPARE', `Toggle confirmed: aria-checked="${finalChecked}".`);

  await waitForTextToSettle(transcriptPanel);
  log('PREPARE', 'Transcript content has stabilized after disabling timestamps.');

  return {
    selector: TIMESTAMPS_TOGGLE_SELECTOR,
    initialChecked,
    finalChecked,
    initiallyOn,
    disabled: true,
    actionTaken: true,
  };
}

/**
 * Full preparation flow: open Details -> open Transcript tab -> ensure a
 * transcript exists (generating it if needed) -> ensure timestamps are
 * off. Leaves the UI in one consistent, extraction-ready state either
 * way. Returns the dialog/panel locators plus a summary, for reporting
 * and for extraction (or a future Share-button step) to reuse.
 *
 * `card` defaults to the first visible ad card (original single-ad
 * behavior); Phase 8's multi-ad loop passes a specific card locator so
 * every ad can be prepared in turn, not just the first.
 *
 * The transcription-status watcher is created here (not inside
 * ensureTranscriptGenerated) and kept alive through the timestamps step
 * too: the backend's own "failed" response can arrive a few seconds
 * after content already looked settled, surfacing as a timestamps-toggle
 * timeout rather than during generation itself. If that happens, the
 * watcher's status — not ensureTimestampsDisabled's own logic, which is
 * unchanged — is what reclassifies the failure as a backend issue rather
 * than a scraper error.
 */
async function prepareTranscript(page, card = page.getByTestId('ad-card').first()) {
  await openAdDetails(page, card);
  const dialog = page.getByRole('dialog');
  const transcriptPanel = await openTranscriptTab(page);

  const statusWatcher = watchTranscriptionStatus(page);
  try {
    const generation = await ensureTranscriptGenerated(statusWatcher, dialog, transcriptPanel);

    let timestamps;
    try {
      timestamps = await ensureTimestampsDisabled(dialog, transcriptPanel);
    } catch (err) {
      if (statusWatcher.getStatus() === 'failed') {
        log(
          'PREPARE',
          `GetHook's backend reported transcription_status="failed" for this ad — the timestamps toggle ` +
            'was never going to appear; not a scraper error.'
        );
        throw new BackendTranscriptionFailedError('failed');
      }
      throw err;
    }

    const ready = Boolean(generation.settledText) && timestamps.disabled;
    log('PREPARE', `Transcript ready for extraction: ${ready}.`);

    return { dialog, transcriptPanel, generation, timestamps, ready };
  } finally {
    statusWatcher.stop();
  }
}

module.exports = { prepareTranscript, BackendTranscriptionFailedError };
