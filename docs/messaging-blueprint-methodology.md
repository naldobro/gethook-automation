# 8-Layer Messaging Blueprint — Reusable Methodology

**Version:** `8-layer-messaging-blueprint-v1`
**Purpose:** Turn any brand's scraped ad scripts into a deduplicated, fidelity-verified map of *every messaging building block it has tested* — split into 8 layers, each element tagged with the exact scripts (and coverage count) that used it. This is the canonical spec so the **exact** analysis can be re-run on any brand from a fresh session/terminal.

Validated on **Kelle Skin** (brand_id 23, 121 scripts → 602 elements, 0 fidelity failures).

---

## When to use
The user asks for a "messaging playbook / blueprint / mind-map" of a brand — what hooks/angles/mechanisms/CTAs/etc. it has tested, deduplicated, with source references. Not a themes summary; a **structured inventory of tested messaging**.

## Prerequisite
The brand's ads must already be in Supabase (`ads` rows under its `brand_id`) **with transcripts** (the copy). If not, scrape first (`node src/browser/launch.js "<Brand>"`). Exclude duplicate rows (byte-identical "Copy of …" / "Kopija …").

---

## The 8 layers

1. **Hook** — the opening line(s). Ads usually label them `Hook 1/2/3`; each distinct hook = one entry. For formats with no labeled hook (static, animation, VSL), use the opening line and note `no labeled hook`.
2. **Angle** — the ad's single **strongest reason/purpose** (persona lens, belief being moved, core argument). **One per ad.** Short label — a few words, NOT a paragraph. *This is the ONLY layer written in your own words.*
3. **Unique mechanism** — the "why it works" explanation, **full verbatim passage** (not a topic name).
4. **CTA** — the actual close / call-to-action / risk-reversal, **full verbatim**. (A bare guarantee mention is a data point, not the CTA — capture the whole closing block.)
5. **Avatar** — who's targeted (persona/segment). Mix of verbatim descriptors + short persona labels.
6. **Problem** — every ICP problem/roadblock called out, **verbatim** (words or full sentences).
7. **Desire** — every dream-state / want, **verbatim**.
8. **Repeated messaging** — blocks that recur across 3+ ads (near-verbatim), representing the reusable "spine."

## Extraction rules (hard-won — follow exactly)
- **Verbatim everywhere except Angle.** Every non-angle element is exact transcript text. Angle is the only interpretive label. "One wrong word is costly."
- **Full messaging, not topic names.** Mechanism/CTA/problem/desire = complete passages, not compacted summaries. (Do NOT reduce "During menopause estrogen drops and testosterone converts to DHT…" to "estrogen→DHT".)
- **Merge rule:** if two elements are ~85%+ identical, merge into one row (list all script IDs, note the variant). Under that threshold, keep separate.
- **One angle per ad**, short.
- **Coverage:** each element lists *every* script that contains it (see auto-coverage below).

---

## Architecture — deterministic, reproducible, fidelity-guarded

Do **not** hand-type a CSV (retyping corrupts copy). Instead:

- **Per-brand config = `scripts/blueprint_entries.<brand-slug>.js`** (slug = brand name lowercased, non-alphanumerics → `-`; e.g. `Kelle Skin → kelle-skin`). Exports `{ brandName?, dupTitles?, titleToId?, sortKey?, entries }`. The builder resolves `brand_id` from `--brand` against Supabase and loads this config by slug. Kelle Skin (`blueprint_entries.kelle-skin.js`) is the reference — copy it to start a new brand.
- **Source of truth = the `entries` array**: one JS object per element — `{ids, layer, start, end?, v, manual?, allMatch?, note?}`.
  - `v:true` = verbatim: `start` (and optional `end`) are short **anchors**; the builder extracts the exact transcript slice between them. You only type short anchors to *locate* the block — the stored text comes straight from the DB, so wording can't drift.
  - `v:false` = label text (angles, persona avatars).
  - `manual:true` = use the given `ids` as-is (for ~variant merges / concept rows whose wording differs across ads). `allMatch:true` verifies every listed id truly contains it.
- **Builder = `scripts/build_blueprint.js`**: pulls ALL of the brand's transcripts, and for each `v:true` entry **auto-computes coverage** — scans every transcript and lists every script that literally contains the block (curly-quote / whitespace / ellipsis tolerant). So each block is defined **once** and "which scripts tested it" stays exhaustive and correct automatically.
  - **Fidelity guard:** the build **fails loudly** and names any anchor that doesn't match a transcript. A clean build = every verbatim element verified against source.
  - **Dedup:** identical `(layer, element)` rows collapse to one (notes merged).
  - Writes `output/<brand>_blueprint.csv`.

### CSV columns
`layer, element, script_ids, coverage, status, verbatim, note`
- `coverage` = number of scripts containing that element (the "how widely tested" signal — the spine surfaces as the highest-coverage rows).
- `verbatim` = `yes` (exact text) or `label` (angle/persona).

### Script ID scheme
Derive a stable ID per script from its title: `Batch#22 → B#22`, `Cyperus Rotundus_#2.5 → CR#2.5`. Disambiguate collisions (two `#14`s) with a suffix (`B#14-WD`). Oddball titles get short names. Generic social domains are never brand landers.

---

## Runbook — apply to a NEW brand
1. **Confirm scripts exist** in `ads` under the brand's `brand_id` (with transcripts). Note the duplicate rows to skip.
2. **Create the config:** copy `scripts/blueprint_entries.kelle-skin.js` → `scripts/blueprint_entries.<slug>.js`. Fill in that brand's `dupTitles`, `titleToId` (its ID scheme), `sortKey`, and start an empty `entries` array.
3. **List titles**, design the ID scheme, and pick a diverse **pilot (~10 scripts)** to lock the taxonomy before doing all.
4. **Read every line** of each script (never automate-skip the reading). Batch the work (~15–20 scripts per pass) so quality holds.
5. Per script, add entries: all hooks, one angle label, the full-verbatim mechanism/CTA/problems/desires, avatars, and merge recurring blocks. Shared blocks defined once auto-cover across the brand.
6. **Run the builder** after each batch: `node scripts/build_blueprint.js --brand "<Brand>"`. Fix any anchor that fails verification (0 failures = done).
7. **Confirm completeness:** every script has an Angle (each script should appear in ≥1 Angle row).
8. Deliver `output/<slug>_blueprint.csv`.

*(The builder + rules are fully brand-agnostic; only the per-brand config file — ID scheme, dups, entries — is brand-specific. If a brand needs no custom ID scheme, omit `titleToId` and the raw title is used as the id.)*

---

## Optional layers on top

**A) Winning messaging (join to real performance).** If a Meta ad-account export is available (columns like Amount spent, Purchase ROAS, Results value, Hook rate, Hold rate, Impressions), join it to the blueprint on batch number (parse the script ID out of the messy ad names). Aggregate to script level (spend-weighted ROAS, impression-weighted hook/hold), then attribute performance back to each layer's elements to rank **what actually wins** — plus lead metrics: hook-rate → hook quality, hold-rate → body/mechanism quality. Flag ad-account batches with no messaging row (playbook gaps).

**B) Trends artifact.** A strategic dossier of the patterns across all scripts (templating lineages, messenger personas, mechanism science-ladder, sub-avatar testing, emotional escalation, objection-handlers, formats, offer/CTA architecture, brand/product evolution, and whitespace). Publish as an HTML artifact.

---

## File references
- `scripts/build_blueprint.js` — the deterministic, brand-agnostic builder (`--brand "<name>"`; auto-coverage, fidelity guard, dedup).
- `scripts/blueprint_entries.kelle-skin.js` — the reference per-brand config (copy this to start a new brand).
- `scripts/blueprint_entries.js` — Kelle's raw `entries` array (imported by the config above).
- `output/kelle-skin_blueprint.csv` — reference output (Kelle, 121 scripts / 602 elements).
- `docs/messaging-blueprint-methodology.md` — this file.
- Supabase: this methodology is stored in `brand_analyses` under **BRIGHT IDEAS (brand_id 32)**, `analysis_type = methodology`, `prompt_version = 8-layer-messaging-blueprint-v1`.
