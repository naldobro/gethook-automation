# gethook-automation

## Setup

```bash
npm install
cp .env.example .env
```

## Project structure

```
src/
  browser/    # Playwright browser/session setup
  scraper/    # Data extraction logic
  analyzer/   # Data processing/analysis
  sheets/     # Google Sheets (or similar) output integration
```

## Browser automation (`src/browser/launch.js`)

Launches your real, locally installed Google Chrome (not Playwright's
bundled Chromium) through a **dedicated automation profile** stored at
`.playwright-profile/` inside this project. This profile is completely
isolated from your personal Chrome profile — it is never read from or
copied — so your everyday Chrome can stay open the whole time.

Run it with:

```bash
node src/browser/launch.js
```

### First run

- No automation profile exists yet, so one is created automatically at
  `.playwright-profile/`.
- The script opens GetHook and detects that you're not logged in.
- Log into GetHook manually in the Chrome window that opens.
- Once you're logged in, press **Enter** in the terminal when prompted.
- Chrome saves your session (cookies/local storage) into
  `.playwright-profile/` automatically — no extra step needed.

### Subsequent runs

- The script detects the existing profile and reuses the saved session.
- The terminal will log `Existing session found — reusing saved GetHook
  login.` and you'll land on GetHook already authenticated.
- Press **Enter** in the terminal at any time to close the browser
  gracefully.

### Resetting the session

If the saved session ever expires or you need to log in as someone else,
wipe the automation profile and log in fresh:

```bash
node src/browser/launch.js --reset-profile
```

### Notes

- `.playwright-profile/` is git-ignored — it holds live session data and
  should never be committed.
- This automation never touches your personal Chrome profile in any way.
