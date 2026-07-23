# src/analysis/

The Brand Analysis Engine (Milestone 3). Generates one comprehensive
analysis across every ad collected for a brand — not per-ad — by reading
from Supabase, prompting an LLM, and saving the result as both a Markdown
file and a `brand_analyses` row.

## Design constraint

Modules here read from Supabase (`src/supabase/client.js`) — never from
Playwright/browser state and never by driving the scraper. The scraper
(`src/scraper/`, `src/browser/`) is responsible only for collecting and
persisting ad data; analysis is a separate, later stage that only reads
already-collected data back out.

## Layout

- `adRepository.js` — Repository Layer: loads a brand and its ads from
  Supabase, sorted chronologically (`saved_date`, falling back to
  `created_at`).
- `analysisRepository.js` — Repository Layer: inserts into
  `brand_analyses`. Insert-only — never updates, so every run preserves
  history.
- `instructionBuilder.js` — builds the full LLM prompt: a dataset section
  (brand + every ad) shared by all analyzers, plus the requested
  analyzer's own instructions.
- `analyzers/` — one file per analysis type (e.g. `comprehensiveV1.js`),
  each exporting `{ analysisType, promptVersion, instructions }`, plus
  `index.js` as the type -> analyzer registry. Adding a new analysis type
  is one new file + one registry line — nothing else changes.
- `analysisService.js` — `generateBrandAnalysis(brandName, opts)`, the
  single public entrypoint. Orchestrates repository -> instructionBuilder
  -> `src/llm/provider.js` -> disk + Supabase.
- `runAnalysis.js` — CLI entrypoint (`node src/analysis/runAnalysis.js
  <brandName>`), since there's no UI yet.

The LLM itself is abstracted behind `src/llm/provider.js`, not this
directory — `analysisService.js` only knows `generateCompletion()`, never
a model name or SDK detail.
