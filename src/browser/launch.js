'use strict';

/**
 * src/browser/launch.js
 *
 * Entry point: launches the real, installed Google Chrome (not Playwright's
 * bundled Chromium) using a persistent context bound to a dedicated
 * automation profile at .playwright-profile/. That profile is fully
 * isolated from the user's personal Chrome profile — this script never
 * reads from or copies the user's real profile — so the user's everyday
 * Chrome can stay open and running throughout.
 *
 * Flags:
 *   --reset-profile   Wipe the saved automation profile before launching,
 *                      forcing a fresh manual login.
 *
 * Usage:
 *   node src/browser/launch.js [brandName]
 *
 *   brandName defaults to config.DEFAULT_BRAND_NAME when omitted.
 */

const { chromium } = require('playwright');
const { PROFILE_DIR, TARGET_URL, LOAD_EVENT_TIMEOUT_MS, DEFAULT_BRAND_NAME } = require('./config');
const { log, warn, error } = require('./logger');
const {
  verifyChromeIsInstalled,
  ensureProfileDir,
  warnIfLocked,
  resetProfile,
} = require('./profileManager');
const { ensureLoggedIn } = require('./session');
const { askQuestion } = require('./prompt');
const { navigateToBrand } = require('../scraper/navigation');
const { detectAds } = require('../scraper/ads');

// Separates "--flag"-style switches from the positional brand name
// argument, so they can appear in any order on the command line.
function parseArgs(argv) {
  const flags = new Set();
  const positional = [];
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      flags.add(arg);
    } else {
      positional.push(arg);
    }
  }
  return { flags, positional };
}

const { flags, positional } = parseArgs(process.argv.slice(2));
const brandName = positional[0] || DEFAULT_BRAND_NAME;

// Module-level so the SIGINT handler can reach it for a graceful shutdown.
let context;

async function launchBrowser() {
  verifyChromeIsInstalled();

  if (flags.has('--reset-profile')) {
    resetProfile();
  }

  ensureProfileDir();
  warnIfLocked();

  log('LAUNCH', 'Launching Google Chrome with the automation profile...');
  log('LAUNCH', `Profile dir: ${PROFILE_DIR}`);

  try {
    context = await chromium.launchPersistentContext(PROFILE_DIR, {
      channel: 'chrome', // Use the real installed Chrome binary, not Playwright's Chromium.
      headless: false,
      // Playwright appends --no-sandbox to the Chrome command line by
      // default unless chromiumSandbox is explicitly true. --no-sandbox is
      // only needed on root/containerized Linux hosts that can't set up the
      // SUID sandbox; on macOS the OS sandbox works normally. Leaving it on
      // also makes Chrome show an "unsupported command-line flag" warning
      // infobar, which overlays the page and blocks clicks until dismissed
      // — that's the greyed-out/unresponsive page. Opting into the sandbox
      // avoids both the unnecessary flag and the blocking infobar.
      chromiumSandbox: true,
    });
  } catch (err) {
    error('LAUNCH', `Failed to launch Chrome: ${err.message}`);
    process.exit(1);
  }

  log('LAUNCH', 'Chrome launched successfully. Your personal Chrome profile was not touched.');
}

async function main() {
  await launchBrowser();

  const page = context.pages()[0] || (await context.newPage());

  page.on('domcontentloaded', () =>
    log('NAVIGATE', 'DOMContentLoaded fired — initial HTML parsed.')
  );
  page.on('load', () => log('NAVIGATE', 'Load event fired — initial sub-resources loaded.'));

  log('NAVIGATE', `Navigation starting: ${TARGET_URL}`);
  // GetHook keeps a long-lived connection open (websocket/polling for live
  // updates), so the network never goes idle and waitUntil: 'networkidle'
  // hangs until Playwright's navigation timeout. 'domcontentloaded' only
  // waits for the initial HTML to parse, which is enough for a modern SPA
  // shell to start mounting.
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });

  try {
    await page.waitForLoadState('load', { timeout: LOAD_EVENT_TIMEOUT_MS });
  } catch {
    warn(
      'NAVIGATE',
      `Load event did not fire within ${LOAD_EVENT_TIMEOUT_MS}ms; continuing anyway.`
    );
  }
  log('NAVIGATE', 'Page is interactive.');

  await ensureLoggedIn(page);

  log('BRAND', `Using brand: "${brandName}"`);
  await navigateToBrand(page, brandName);

  await detectAds(page);

  await askQuestion('\nBrowser is open and ready. Press Enter in this terminal to close it...\n');

  log('CLOSE', 'Closing browser...');
  await context.close();
  log('CLOSE', 'Browser closed. Goodbye!');
}

// Ensure Ctrl+C also closes Chrome cleanly instead of leaving an orphaned process.
process.on('SIGINT', async () => {
  console.log('\n[CLOSE] Interrupt received, closing browser...');
  if (context) {
    await context.close();
  }
  process.exit(0);
});

main().catch((err) => {
  error('FATAL', err.stack || err.message);
  process.exit(1);
});
