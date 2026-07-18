# src/analysis/

Reserved for future ad-transcript analysis (e.g. AI-based summarization,
classification, or insight extraction). Intentionally empty except for
this file.

## Design constraint

Modules placed here must consume the JSON files written by
`src/export/json.js` (`output/<brand>_<timestamp>.json`) — they must
never import or drive Playwright/browser automation directly.

The scraper (`src/scraper/`, `src/browser/`) is responsible only for
collecting and exporting ad data and must never contain AI or analysis
logic. Analysis is a separate, later stage that reads already-exported
JSON from disk, decoupled from the browser session that produced it.
