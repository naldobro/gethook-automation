'use strict';

/**
 * Detects and establishes an authenticated GetHook session inside the
 * automation-controlled page. Because the browser context is persistent
 * (bound to .playwright-profile/), any cookies/local storage created by a
 * manual login are saved to disk by Chrome automatically — there is no
 * explicit "save session" step, and no manual login is required again on
 * future runs as long as the session stays valid.
 *
 * The authentication signal is UI-based, not stdin-based: we poll for the
 * "Brands" tab on the Explore page rather than asking the user to press
 * Enter in the terminal. That works whether the scraper runs in a real
 * terminal or headless/background (no interactive stdin), and it survives
 * two failure modes seen in the wild:
 *   1. A stale session that still *looks* logged-in on the landing page but
 *      bounces to Google OAuth on the first real navigation — the old
 *      "is there a password field?" check passed it through, then the next
 *      step timed out. Here we wait for the actual authenticated UI instead.
 *   2. A fresh login that redirects to an account-default page WITHOUT the
 *      Brands tab — we steer back to /explore until the tab appears.
 */

const { log, warn } = require('./logger');
const { TARGET_URL } = require('./config');

// How long to wait for the user to complete a manual login before giving up.
const AUTH_WAIT_MS = 5 * 60 * 1000;
// How often to re-check the page state while waiting.
const POLL_MS = 2000;

/**
 * The authenticated signal: the "Brands" tab (the Explore Ads / Brands
 * switcher) is only present once a logged-in Explore page has mounted.
 * .first() keeps this safe under Playwright strict mode if more than one
 * node ever matches; isVisible() returns immediately (no implicit wait), so
 * it's cheap to call in a poll loop.
 */
async function brandsTabVisible(page) {
  return page
    .getByRole('tab', { name: 'Brands', exact: true })
    .first()
    .isVisible()
    .catch(() => false);
}

/**
 * True when the page is sitting on a login / OAuth screen — either GetHook's
 * own /login-style route, Google's accounts.google.com sign-in, or any page
 * rendering a password field. Used to (a) know a manual login is needed and
 * (b) avoid navigating the page out from under the user mid-login.
 */
async function onAuthPage(page) {
  const url = page.url();
  if (/accounts\.google\.com/i.test(url)) return true;
  if (/\/(login|signin|sign-in)(\/|$|\?)/i.test(url)) return true;
  const passwordField = await page.$('input[type="password"]').catch(() => null);
  return passwordField !== null;
}

/**
 * Ensures the page ends up on an authenticated Explore view (Brands tab
 * visible). Returns as soon as that's true. If the user needs to log in, it
 * waits (polling) up to AUTH_WAIT_MS for them to finish, then continues
 * automatically — no terminal interaction required. Throws if the
 * authenticated UI never appears within the window.
 *
 * Assumes the caller has already navigated to TARGET_URL (/explore); on a
 * valid session the tab is usually visible within a poll or two.
 */
async function ensureLoggedIn(page) {
  const deadline = Date.now() + AUTH_WAIT_MS;
  let promptedForLogin = false;

  while (Date.now() < deadline) {
    if (await brandsTabVisible(page)) {
      log('AUTH', 'Authenticated — Brands tab visible on Explore.');
      return;
    }

    const onAuth = await onAuthPage(page);
    const url = page.url();

    if (onAuth) {
      if (!promptedForLogin) {
        log('AUTH', 'No active session — please sign into GetHook in the Chrome window that just opened.');
        log(
          'AUTH',
          `Waiting up to ${Math.round(AUTH_WAIT_MS / 60000)} min — I'll continue automatically once you're in.`
        );
        promptedForLogin = true;
      }
      // Leave the page alone while the user is mid-login; navigating now
      // would interrupt the OAuth flow.
    } else if (/app\.gethookd\.ai/.test(url) && !/\/explore/.test(url)) {
      // Logged in but landed on a non-Explore default page (seen right after
      // a fresh login). Steer back to Explore so the Brands tab surfaces.
      log('AUTH', `Landed on ${url} — steering to Explore to find the Brands tab.`);
      await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' }).catch(() => {});
    }

    await page.waitForTimeout(POLL_MS);
  }

  throw new Error(
    'Timed out waiting for an authenticated Explore page — the Brands tab never appeared. ' +
      'The saved session may have expired and login was not completed in time.'
  );
}

module.exports = { ensureLoggedIn };
