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

- **Transcript "Generating..." placeholder (fixed):** Slow-transcribing ads showed a `Generating...` (or `Generate Transcription`) placeholder in the panel; the scraper captured that stable text and saved it as the transcript. Fixed in `src/scraper/prepareTranscript.js` on BOTH paths: `waitForTextToSettle` now takes a placeholder pattern (`/^generat(e transcri|ing)/i`) and treats matching text as not-settled, polling up to the 60s generation window for real content; the "transcript already exists" early-return path was hardened the same way (it used to read once with no check). If it's still a placeholder after the wait, the ad errors out (skipped, not saved) rather than saving a bad row. Existing bad rows are repaired with `node src/browser/fix.js "<brand>" --fix transcripts`.

## Whitelisting & full-footprint intelligence (IN PROGRESS — active project)

**Goal:** capture a competitor brand's *full* ad footprint — not just its main page — and rank what's actually working by behavioural signals, not by how long an ad has run. Driven by two realities: (1) aggressive brands run their best creative through secondary accounts and whitelisted creator pages while the main page is mostly retargeting; (2) long-running ≠ winning — brands keep decoy ads alive on ABO at minimum spend to mislead competitors.

**Hypothesis doc (v1):** the full reasoning + signal framework lives as an artifact stored under the `BRIGHT IDEAS` container brand (brands id=32) in `brand_analyses` (id=16, `analysis_type=strategy_hypothesis`). Artifact URL: https://claude.ai/code/artifact/e1a07e32-4059-4c5d-9179-8b751d800644 . `BRIGHT IDEAS` is a pseudo-brand bucket for cross-brand strategic artifacts — future strategy docs go there too. Signals (to be computed by the ANALYSIS body, never the scraper): iteration depth, launch velocity/recency, freshness slope, cross-account spread; longevity is demoted to a supporting signal and penalised in isolation.

**Planned architecture (two independent collectors, brand → pages → ads):**
- **Layer A — Meta Ad Library page finder (NOT built yet):** a *separate* automation from the GetHook scraper. Given a brand, it opens Meta Ad Library, pivots on landing pages to discover all pages/accounts (main + whitelisting), collects page **names only** (no ad data), dedups, and writes them to a new `pages` table under the brand. Meta Ad Library is the discovery source because it's more accurate/complete than GetHook for finding accounts.
- **Layer B — GetHook scraper (existing, to be extended to multi-page):** runs the normal reliable ad-collection pipeline once per discovered page and files ads under the brand.

**Data model (planned schema change):**
- New `pages` table: `id, brand_id (FK brands), name, meta_page_id, page_url, type ('main'|'whitelist'|'secondary'), created_at`, unique `(brand_id, name)`.
- `ads` gets a new `page_id` column (FK → pages). **`ads.brand_id` STAYS the real brand for ALL ads** (main or whitelisted) so "analyse RYZE" returns the whole footprint; `page_id` records which account ran the ad. A whitelist page is NEVER a new brand.
- Backfill: existing ads get a `type='main'` page for their brand.
- Additional per-ad fields to collect later: page identity, explicit ad start date, version/variation count, platforms, CTA label.

**Scrape-time routing decision (agreed):** when starting a scrape, ASK "Is this a brand or a 3rd-party page?" — *brand* → normal flow (new row in `brands`); *3rd-party page* (= whitelisting = account = page, all synonyms) → do NOT create a `brands` row; add it to `pages` linked to the chosen existing brand, and file its ads under that brand with the page's `page_id`.

**Pilot brand:** RYZE.

**Verified/open:** GetHook DOES cover at least some creator/whitelist pages (user spot-checked one RYZE creator page — searchable in GetHook); needs testing at scale. Confirm Meta Ad Library's landing-page/domain search behaviour when building Layer A.

**Boundary (strict):** the scraper only COLLECTS reliably and fast and stores. All clustering/scoring/conviction/trend logic lives in the separate analysis body — never in the scraper.

## Rules

- Always store the brand URL when upserting a brand
- Always save analysis records to `brand_analyses` after every analysis
- The scraper pre-seeds seen IDs from Supabase so restarts skip already-scraped ads
- Ads that fail backend transcription are skipped, not errored
- The normal scraper and fix scraper are completely independent — never modify one to do the other's job
- Fix scraper only UPDATEs existing rows, never INSERTs or DELETEs (unless a specific fix mode explicitly needs it, e.g. `--fix delete-duplicates`)
