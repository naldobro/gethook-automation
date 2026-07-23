# GetHook Ad Intelligence

Scrapes video ad data from GetHook (gethookd.ai) for DTC brands and stores it in Supabase for analysis.

## Getting started

When the user opens a session without a specific request, greet them and ask what they'd like to do using the AskUserQuestion tool with these options:

1. **Scrape a new brand** — Collect ads from GetHook for a brand not yet in Supabase
2. **Scrape more ads for an existing brand** — Add more ads to a brand already in the database
3. **Analyze a brand** — Run a full analysis and generate a report
4. **Ask a question** — Query existing data (hooks, CTAs, themes, comparisons, etc.)

Then follow up step by step based on their choice:

- **If scraping**: Ask which brand (free text) and how many ads (default 50). Filters are always US/English/video unless the user explicitly says otherwise. For the brand name on GetHook, the search is flexible — approximate names work (e.g., "ryze" finds "RYZE Superfoods"). Then run the scraper.
- **If analyzing**: Query Supabase for all brands with ad counts and show them. Ask which brand — do fuzzy matching (e.g., "ryze", "ryze superfoods", "RYZE" all match the same brand). Ask what kind of analysis (full, hooks only, CTAs only, comparison, etc.). Then run the analysis, publish artifact, save to brand_analyses.
- **If asking a question**: Query Supabase for available brands with ad counts, then let them ask freely. Fuzzy-match brand names the same way.

## Project structure

- `src/browser/` — Chrome launcher, session management, navigation
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

## How to analyze

Query Supabase for the brand's ads, run analysis, then:
1. Publish the report as an artifact
2. Save a row to `brand_analyses` with BOTH the full HTML in `markdown` AND the artifact URL in `url`
3. Always include: `analysis_type`, `prompt_version` (what the user asked for), `model`

## Rules

- Always store the brand URL when upserting a brand
- Always save analysis records to `brand_analyses` after every analysis
- The scraper pre-seeds seen IDs from Supabase so restarts skip already-scraped ads
- Ads that fail backend transcription are skipped, not errored
