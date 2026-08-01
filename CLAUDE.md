# GetHook Ad Intelligence

Scrapes video ad data from GetHook (gethookd.ai) for DTC brands and stores it in Supabase for analysis.

## Getting started

When the user opens a session without a specific request, greet them and ask what they'd like to do using the AskUserQuestion tool with these options:

1. **Scrape a new brand** — Collect ads from GetHook for a brand not yet in Supabase
2. **Scrape more ads for an existing brand** — Add more ads to a brand already in the database
3. **Fix scraped data** — Repair share URLs or other fields for already-scraped ads
4. **Analyze a brand** — Run a full analysis and generate a report
5. **Ask a question** — Query existing data (hooks, CTAs, themes, comparisons, etc.)

Then follow up step by step based on their choice:

- **If scraping**: Ask which brand (free text) and how many ads (default 50). Filters are always US/English/video unless the user explicitly says otherwise. For the brand name on GetHook, the search is flexible — approximate names work (e.g., "ryze" finds "RYZE Superfoods"). Then run the scraper.
- **If fixing**: Ask which brand. Query Supabase to identify ads with bad data (e.g. duplicate share URLs). Run the fix scraper (`src/browser/fix.js`) which re-opens only the affected ads on GetHook and repairs the specific field. See "How to fix" section below.
- **If analyzing**: Query Supabase for all brands with ad counts and show them. Ask which brand — do fuzzy matching (e.g., "ryze", "ryze superfoods", "RYZE" all match the same brand). Ask what kind of analysis (full, hooks only, CTAs only, comparison, etc.). Then run the analysis, publish artifact, save to brand_analyses.
- **If asking a question**: Query Supabase for available brands with ad counts, then let them ask freely. Fuzzy-match brand names the same way.

## Project structure

- `src/browser/` — Chrome launcher (`launch.js`), fix scraper (`fix.js`), session management, navigation
- `src/scraper/` — Ad collection, transcript extraction, share URL capture
- `src/supabase/` — Supabase client and repository (upsert brands, ads, analyses)
- `src/config.js` — Collection settings (maxAds, filters)
- `supabase/migrations/` — Database schema

## Supabase schema

Three tables:

- **`brands`** — One row per brand (`id`, `name`, `url`, `created_at`)
- **`ads`** — One row per ad, linked via `brand_id` (`media_id`, `title`, `duration`, `saved_date`, `active_period`, `landing_page`, `transcript`, `share_url`)
- **`brand_analyses`** — One row per analysis run (`brand_id`, `analysis_type`, `prompt_version`, `model`, `markdown`, `url`, `created_at`)

## How to scrape

```bash
node src/browser/launch.js
```

Brand name is set in `src/scraper/navigation.js`. Filters (country, language, format) are in `src/config.js`. The scraper uses a persistent Chrome profile at `.playwright-profile/` — the user's personal Chrome is never touched.

## How to fix

```bash
node src/browser/fix.js "RYZE Superfoods" --fix share-urls
```

The fix scraper is a separate entry point that repairs specific fields for already-scraped ads without re-running the full pipeline. It reuses the same browser launch, navigation, and filter modules as the normal scraper but has its own lightweight processing loop.

**Design principles:**
- Never touches the normal scraper code — completely independent
- Only UPDATE existing rows in Supabase, never INSERT or DELETE
- Each fix mode defines: (1) which ads need fixing (a Supabase query), (2) what to do per ad (a minimal pipeline), (3) which column(s) to update
- Safe to run on any brand at any time — worst case, an ad keeps its current value

**Current fix modes:**
- `share-urls` — Finds ads with duplicate/shared share URLs (same URL assigned to multiple ads = scraper bug from before the clipboard polling fix). Opens each affected ad's detail dialog, captures the correct share URL, updates only the `share_url` column.

**Adding new fix modes:** Each mode is a self-contained object with:
- `identify(brandId)` — queries Supabase, returns the list of media_ids that need fixing
- `process(context, page, card, dialog)` — does the minimal work per ad (e.g. capture share URL, re-extract transcript), returns the new values
- `update(mediaId, newValues)` — writes the fixed column(s) to Supabase
- `needsBrowser` — whether this fix requires opening ads on GetHook (share-urls: yes) or is DB-only (delete-duplicates: no)

Examples of fix modes that could be added later:
- `--fix transcripts` — re-extract transcripts for ads with empty/failed transcripts
- `--fix delete-duplicates` — remove duplicate ad rows (DB-only, no browser needed)
- `--fix overview` — re-capture savedDate/activePeriod/landingPage for ads missing that data
- `--fix all` — chain multiple fixes in sequence

## How to analyze

Query Supabase for the brand's ads, run analysis, then:
1. Publish the report as an artifact
2. Save a row to `brand_analyses` with BOTH the full HTML in `markdown` AND the artifact URL in `url`
3. Always include: `analysis_type`, `prompt_version` (what the user asked for), `model`

## Known issues & fixes applied

- **Share URL clipboard race condition (fixed):** Early scrapes (RYZE batch of 94 ads) captured share URLs with a single instant clipboard read after clicking "Share ad." The clipboard often still held the previous ad's URL, causing ~36 ads to get the same wrong share_url. Fixed in `src/scraper/share.js` by writing a sentinel value to the clipboard before clicking, then polling until the clipboard content changes (up to 5s, checking every 150ms). All scrapes after this fix capture correct share URLs. The affected RYZE ads need repair via the fix scraper (`node src/browser/fix.js "RYZE Superfoods" --fix share-urls`).

## Rules

- Always store the brand URL when upserting a brand
- Always save analysis records to `brand_analyses` after every analysis
- The scraper pre-seeds seen IDs from Supabase so restarts skip already-scraped ads
- Ads that fail backend transcription are skipped, not errored
- The normal scraper and fix scraper are completely independent — never modify one to do the other's job
- Fix scraper only UPDATEs existing rows, never INSERTs or DELETEs (unless a specific fix mode explicitly needs it, e.g. `--fix delete-duplicates`)
