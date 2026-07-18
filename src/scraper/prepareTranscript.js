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
const POLL_MS = 200;
const STABLE_CHECKS_REQUIRED = 2;
const TIMESTAMPS_TOGGLE_SELECTOR = 'label:has-text("Show timestamps") [role="switch"]';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
 * exactly once and wait for real transcript content to appear and settle
 * (no fixed sleep — a content-stability poll instead). If absent, state
 * (a) is assumed: a transcript already exists.
 */
async function ensureTranscriptGenerated(dialog, transcriptPanel) {
  const generateButton = dialog.getByRole('button', { name: /generate transcri/i }).first();
  const present = await generateButton
    .waitFor({ state: 'visible', timeout: GENERATE_BUTTON_PROBE_MS })
    .then(() => true)
    .catch(() => false);

  if (!present) {
    log('PREPARE', '"Generate Transcription" button not present — transcript already exists.');
    return { required: false, clicked: false, settledText: await waitForTextToSettle(transcriptPanel) };
  }

  log('PREPARE', '"Generate Transcription" button found. Clicking once...');
  await generateButton.click({ timeout: ACTION_TIMEOUT_MS });

  await generateButton.waitFor({ state: 'hidden', timeout: ACTION_TIMEOUT_MS }).catch(() => {
    warn('PREPARE', '"Generate Transcription" button did not disappear within the timeout; continuing.');
  });

  const text = await waitForTextToSettle(transcriptPanel);
  if (!text) {
    throw new Error('Transcript generation did not produce any visible content.');
  }

  log('PREPARE', 'Transcript generated and content has settled.');
  return { required: true, clicked: true, settledText: text };
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
 */
async function prepareTranscript(page, card = page.getByTestId('ad-card').first()) {
  await openAdDetails(page, card);
  const dialog = page.getByRole('dialog');
  const transcriptPanel = await openTranscriptTab(page);

  const generation = await ensureTranscriptGenerated(dialog, transcriptPanel);
  const timestamps = await ensureTimestampsDisabled(dialog, transcriptPanel);

  const ready = Boolean(generation.settledText) && timestamps.disabled;
  log('PREPARE', `Transcript ready for extraction: ${ready}.`);

  return { dialog, transcriptPanel, generation, timestamps, ready };
}

module.exports = { prepareTranscript };
