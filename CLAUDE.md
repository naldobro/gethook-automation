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
# Preferred: paste the brand's GetHook link directly (brand name still required for storage)
node src/browser/launch.js "HIKE Footwear" "--url=https://app.gethookd.ai/brand-spy/937298?tab=all-ads"

# Fallback: brand name only (drives the Brands search — see caveat below)
node src/browser/launch.js "HIKE Footwear"
```

Brand name is the first positional arg (used for storage/export/Supabase). Filters (country, language, format) are in `src/config.js` and are **auto-appended to whatever URL you pass** — so pasting a link + filters just works; don't put filter params in the link yourself. The scraper uses a persistent Chrome profile at `.playwright-profile/` — the user's personal Chrome is never touched.

**GetHook app change (Oct 2026) — paste the link, don't rely on search.** GetHook reworked its app. The brand detail page is now the **Brand Spy** page `app.gethookd.ai/brand-spy/{id}` for brands you *follow/spy on in advance*; brands you don't follow still open as the normal `app.gethookd.ai/brands/{id}`. **The brand-name search (`/explore/brands`) still finds the brand but clicking the result no longer navigates to the detail page** — so the name-only fallback above is unreliable post-update. Preferred workflow: open the brand on GetHook yourself, copy the address-bar URL (either `/brand-spy/{id}` or `/brands/{id}`), and pass it via `--url=`. `navigateToBrandByUrl` accepts both shapes; `applyBrandFilters` layers the US/English/video params onto it. The initial landing page is `/explore/brands` (set by `TARGET_URL`); login is detected by waiting for the Brands tab (no terminal keypress needed), and the launcher strips Chrome's automation flags so Google OAuth doesn't block manual sign-in when the session expires.

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

## 8-part / 8-layer messaging blueprint — MANDATORY trigger

Whenever the user asks for an **"8-part blueprint" / "8-layer blueprint"** (any wording), you MUST:
1. **Read `docs/messaging-blueprint-methodology.md` IN FULL, line by line, first** — and run the analysis on those rules ONLY (not generic marketing knowledge).
2. Then reply with **"I've read the whole methodology and will follow every line"**, OR explicitly list any rule you intend to skip/can't follow so the user can approve or correct — never start silently, never skip a rule silently.

The two rules most often botched: **Angle is AD-specific, Unique mechanism is BRAND-specific** (a message that recurs across the brand's ads is a UM, not a one-off angle — don't produce one unique angle per ad); and **read every transcript line by line** (no shortcuts). Angle = our words, ad's single biggest selling premise, primary + `Angle (candidate)` rows that keep their removal reason in `note`. Hook = first 12–20 words (20 max), verbatim.

## Known issues & fixes applied

- **Share URL clipboard race condition (fixed):** Early scrapes (RYZE batch of 94 ads) captured share URLs with a single instant clipboard read after clicking "Share ad." The clipboard often still held the previous ad's URL, causing ~36 ads to get the same wrong share_url. Fixed in `src/scraper/share.js` by writing a sentinel value to the clipboard before clicking, then polling until the clipboard content changes (up to 5s, checking every 150ms). All scrapes after this fix capture correct share URLs. The affected RYZE ads need repair via the fix scraper (`node src/browser/fix.js "RYZE Superfoods" --fix share-urls`).

- **Transcript "Generating..." placeholder (fixed):** Slow-transcribing ads showed a `Generating...` (or `Generate Transcription`) placeholder in the panel; the scraper captured that stable text and saved it as the transcript. Fixed in `src/scraper/prepareTranscript.js` on BOTH paths: `waitForTextToSettle` now takes a placeholder pattern (`/^generat(e transcri|ing)/i`) and treats matching text as not-settled, polling up to the 60s generation window for real content; the "transcript already exists" early-return path was hardened the same way (it used to read once with no check). If it's still a placeholder after the wait, the ad errors out (skipped, not saved) rather than saving a bad row. Existing bad rows are repaired with `node src/browser/fix.js "<brand>" --fix transcripts`.

## Whitelisting & full-footprint intelligence (IN PROGRESS — active project)

**Goal:** capture a competitor brand's *full* ad footprint — not just its main page — and rank what's actually working by behavioural signals, not by how long an ad has run. Driven by two realities: (1) aggressive brands run their best creative through secondary accounts and whitelisted creator pages while the main page is mostly retargeting; (2) long-running ≠ winning — brands keep decoy ads alive on ABO at minimum spend to mislead competitors.

**Hypothesis doc (v1):** the full reasoning + signal framework lives as an artifact stored under the `BRIGHT IDEAS` container brand (brands id=32) in `brand_analyses` (id=16, `analysis_type=strategy_hypothesis`). Artifact URL: https://claude.ai/code/artifact/e1a07e32-4059-4c5d-9179-8b751d800644 . `BRIGHT IDEAS` is a pseudo-brand bucket for cross-brand strategic artifacts — future strategy docs go there too. Signals (to be computed by the ANALYSIS body, never the scraper): iteration depth, launch velocity/recency, freshness slope, cross-account spread; longevity is demoted to a supporting signal and penalised in isolation.

**Architecture (two independent collectors, brand → pages → ads):**
- **Layer A — Meta Ad Library page finder (BUILT — `src/adlibrary/findPages.js`):** a *separate* automation from the GetHook scraper. Pivots on the brand's landing-page domains (read from its existing `ads.landing_page`): every page running ads to a brand-owned lander IS the brand. Collects page **names only** (no ad data), classifies main/whitelist/secondary, and writes new ones to `pages` under the brand (never creates a brand). Card data is text-anchored ("Library ID:" bounds each card, page name sits above "Sponsored") since Meta's classes are obfuscated. Uses Ad Library's **DEFAULT (impressions) sort** — "Most recent" was tested and buries whitelist pages behind the main account's daily volume (2 found vs 10). Stops per domain when page discovery plateaus. Run: `node src/adlibrary/findPages.js "ryze" [--max-scrolls=400] [--inspect]`. Validated on ryze (id=1): found 12 pages incl. Popsugar/FailArmy whitelist partnerships.
- **Layer B — per-page ad scraper (BUILT — `src/adlibrary/scrapePages.js`):** takes a brand's discovered pages from `pages`, and per page: searches it in GetHook, requires a real name match (skips otherwise — never scrapes the wrong account), scrapes its ads via the existing granular pipeline, and upserts each under the REAL `brand_id` + that page's `page_id` — never a new brand. Independent of the normal scraper (own loop/storage, like fix.js). `upsertAd` gained an optional 3rd `pageId` arg (backward compatible). Run: `node src/adlibrary/scrapePages.js "ryze" [--max-ads=25] [--page="Name"]`. Validated on ryze/Shroomcoffeeshop (2 ads under brand_id=1, page_id=10). NOTE: for the branded-content "Creator with Brand" names, the GetHook search term strips the " with <brand>" suffix. Full end-to-end (findPages -> scrapePages across all pages, at scale) not yet run; only covered pages will scrape (see coverage note below).
  - **Direct-URL page mode (BUILT — preferred post-app-update):** since the Oct-2026 GetHook rework broke the search-result click (so the discovered-pages/search path above can't navigate), the normal way to add a 3rd-party page is now to **paste its GetHook link**: `node src/adlibrary/scrapePages.js "<Brand>" --url="<page URL>" --page="<Page Name>" [--type=whitelist|secondary] [--max-ads=100]`. It `ensurePage()`s a `pages` row (whitelist by default) under the brand, navigates straight to the URL (no search), and files **every** ad on the page under `(brand_id, page_id)` — **no domain filter** in this mode (the page IS the 3rd-party account, so all its ads are the brand's). Ads already stored for the brand (e.g. on the main page) are pre-seeded into seenIds and skipped, never re-saved/reassigned. Validated on HIKE Footwear (brand 67): YOUR HEALTH JOURNAL (`/brands/2883`) → page_id=220, 98 ads saved; HIKE footprint 98 main + 98 = 196.

**Data model (planned schema change):**
- New `pages` table: `id, brand_id (FK brands), name, meta_page_id, page_url, type ('main'|'whitelist'|'secondary'), created_at`, unique `(brand_id, name)`.
- `ads` gets a new `page_id` column (FK → pages). **`ads.brand_id` STAYS the real brand for ALL ads** (main or whitelisted) so "analyse RYZE" returns the whole footprint; `page_id` records which account ran the ad. A whitelist page is NEVER a new brand.
- Backfill: existing ads get a `type='main'` page for their brand.
- Additional per-ad fields to collect later: page identity, explicit ad start date, version/variation count, platforms, CTA label.

**Scrape-time routing decision (agreed):** when starting a scrape, ASK "Is this a brand or a 3rd-party page?" — *brand* → normal flow (new row in `brands`); *3rd-party page* (= whitelisting = account = page, all synonyms) → do NOT create a `brands` row; add it to `pages` linked to the chosen existing brand, and file its ads under that brand with the page's `page_id`.

**Pilot brand:** RYZE.

**GetHook coverage of discovered pages: PARTIAL (tested 2026-08-01 on ryze's 12 finds).** ~5/7 sampled pages exist in GetHook (Popsugar, FailArmy, Shroomcoffeeshop, The Berardo Productions = clean matches; Jordan Staten = ambiguous — many "Jordan" pages; Mushroomcoffeecorner, Drinkmushrooms = NOT in GetHook). So Layer B can collect ads for GetHook-covered pages but not all; uncovered pages stay recorded-but-unscraped (Ad Library ad-collection deferred per user). GetHook search returns multiple results — Layer B needs a disambiguation rule, not "click first result." Ad Library landing-page/domain search is confirmed working (Layer A).

**Boundary (strict):** the scraper only COLLECTS reliably and fast and stores. All clustering/scoring/conviction/trend logic lives in the separate analysis body — never in the scraper.

## Ad numbering & rank history (BUILT 2026-11-20)

Migration `20261120132626_ad_codes_page_letters_rank_history.sql` (applied via the Management API migrations endpoint; the `.env` access token is scoped to Migrations read-write only, so `supabase db push` is refused — POST the SQL to `/v1/projects/{ref}/database/migrations` instead).
- **Permanent ID** `ads.ad_code` = `<brands.code>-<4-digit seq>` (e.g. `HK-0042`), first-seen order, never changes. Use it to reference ads in blueprints/notes.
- **Rank label** `#<rank><page letter>`: `#1` = most impressions on the main page, `#1a` = top ad on the brand's 1st 3rd-party page, `#1b` the 2nd, … Ranked WITHIN each page. `pages.letter`: `''` for main, `a, b, …` fixed in the order pages first got ads (null = no ads yet).
- **History:** every scrape run of a page writes `scrape_runs` + one `ad_rank_snapshots` row per listed ad; latest copied to `ads.current_rank/current_label`. View `ad_rank_history` joins it all. Ads missing from a run that reached the end of the list get `ads.status='dropped'`. The first snapshot per page (`source='backfill'`) is the original scrape order.
- Triggers assign `ad_code`, brand `code` and page `letter` automatically on insert — no scraper code needed for that. Ranks are recorded by `src/supabase/ranksRepository.js`, called from `collect.js` and `scrapePages.js`.
- **Rescrape semantics:** ads already in the DB are ranked but NOT re-processed; only new ads get the full transcript/share pipeline. `maxAds` / `--max-ads` = how far down GetHook's list to look.
- **Depth rule (user-set):** main brand page = 100 max (`config.maxAds`, enforced inside `launch.js`); 3rd-party/whitelist/secondary pages = 50 max (`config.thirdPartyMaxAds`, enforced inside `scrapePages.js`). Stored ads deeper than that keep their previous rank. Confirm counts with the user before scraping.
- **Rescrape everything:** `node scripts/rescrape_all.js [--dry-run] [--only=] [--skip=] [--from=]`. Pages without a GetHook link are flagged `pages.skip_rescrape` (+ `skip_reason`) and skipped until a link is added.

## Project log (keep it updated, every session)

Running log page: https://claude.ai/artifact/15zkVRgTp8cNdpLDXcqhDt (source `docs/project-log.html`, data in its artifact database via the `ArtifactData` tool).
- **Main log = one per date:** collection `days`, doc id `YYYY-MM-DD`, fields `{title, summary}`. On the first piece of work on a new date, create that day's doc; same date = update the existing one (read it first, pin `if_version`).
- **Small logs = entries:** collection `entries`, doc id `YYYY-MM-DD-NN`, fields `{date, seq, kind, title, detail}`; `kind` is one of `decision | change | scrape | fix | analysis | note`. Backticks in text render as code.
- Add entries as work lands (decisions made, code/schema changes, scrapes run with counts, fixes, analyses published), not just at the end. Don't republish the page to add entries.

## Rules

- Always store the brand URL when upserting a brand
- Always save analysis records to `brand_analyses` after every analysis
- The scraper pre-seeds seen IDs from Supabase so restarts skip already-scraped ads
- Ads that fail backend transcription are skipped, not errored
- The normal scraper and fix scraper are completely independent — never modify one to do the other's job
- Fix scraper only UPDATEs existing rows, never INSERTs or DELETEs (unless a specific fix mode explicitly needs it, e.g. `--fix delete-duplicates`)

## Research docs

Standalone research deliverables (voice-of-customer, consumer/VoC dossiers, Reddit pulls, etc.) live in `research-docs/`. These are self-contained `.txt`/`.md` files meant to be re-uploaded into Claude as context for persona/angle/hook work — they are NOT part of the scraper or Supabase pipeline. Add new research artifacts here rather than scattering them in the project root.

**Reddit MCP removed from this project (2026-11-13).** The Reddit MCP (`Claude Skills/reddit-mcp`, user-scoped) was de-registered from this project and its `mcp__reddit__*` permissions stripped from `.claude/settings.local.json`. Why: Reddit tightened its API lockdown and now blocks *all* unauthenticated programmatic access — the MCP relied on unauthenticated `.json`/`.rss` fetches, which started returning 403 (search) / 429 (feeds) across every IP we tried (home, two VPNs, phone hotspot), and server-side proxies (Jina) + public redlib mirrors are all blocked too. Reddit's own block page says "log in to your Reddit account or use your developer token" — i.e. auth is now mandatory. The sanctioned fix is an OAuth dev-token (create a `script` app at reddit.com/prefs/apps → client ID + secret → `client_credentials` grant against `oauth.reddit.com`); app creation itself kept failing because reCAPTCHA rejects VPN/hotspot IPs (needs a clean residential IP). **Decision:** rather than re-plumb this (valuable, GetHook-focused) project around Reddit auth, Reddit VoC research moves to a **separate dedicated project**. The `reddit-mcp` source repo is left intact for reuse there. The existing `research-docs/*reddit*` dossiers below were built before this lockdown and remain valid as re-uploadable context.

- `research-docs/male-50plus-reddit.txt` — verbatim Reddit voice-of-customer for the male 50+ / snow-belt ICP (winter ice-traction + barefoot-grip footwear): mindmap + themed verbatim quotes + ready-made hooks. Built via the Reddit MCP, 2026-11-05.
- `research-docs/winter-benched-barefooter-voc.txt` — verbatim Reddit VoC for the "Winter-Benched Barefooter" ICP (US women ~25–50 who love barefoot shoes but hit a wall every winter): winter-problem, competitor experiences (Saguaro/Xero Alpine/Vivo/Hike/cheap dropship), objections, + PATTERNS/SURPRISES. ~55 quotes, r/barefootshoestalk et al. Built via the Reddit MCP, 2026-11-10.
- `research-docs/dog-fence-america-voc.txt` — verbatim Reddit research on dog fences / GPS & invisible-fence collars (USA): 5 personas, pain points, desires, brand map (SpotOn/Halo/Dogtra Pathfinder 2/Tractive/wired PetSafe/DogWatch), + surprises/landmines. 40 quotes from 13 fully-read threads. Collected via the Reddit MCP 2026-10-29, reconstructed from the session transcript 2026-11-12.
