# 8-Layer Messaging Blueprint — Reusable Methodology

**Version:** `8-layer-messaging-blueprint-v1`
**Purpose:** Turn any brand's scraped ad scripts into a deduplicated, fidelity-verified map of *every messaging building block it has tested* — split into 8 layers, each element tagged with the exact scripts (and coverage count) that used it. This is the canonical spec so the **exact** analysis can be re-run on any brand from a fresh session/terminal.

Validated on **Kelle Skin** (brand_id 23, 121 scripts → 602 elements, 0 fidelity failures).

---

## ⚠️ TRIGGER — read this ENTIRE document before any "8-part / 8-layer blueprint" request
When the user asks for an **8-part blueprint / 8-layer blueprint** (any wording), you MUST read THIS WHOLE document line by line BEFORE starting, and run the analysis on **these rules ONLY** — not generic marketing knowledge, not the web. First reply with either:
- **"I've read the whole methodology and will follow every line"**, or
- an explicit list of any rule you intend to skip or can't follow, so the user can approve or correct it.

Never start the analysis without this confirmation. Never skip a rule silently. The two most-violated rules: (1) **Angle is ad-specific, Unique mechanism is brand-specific** — if a message recurs across the brand's ads it is a UM, not 99 one-off angles; (2) **read every transcript line by line** — no shortcuts, no skimming.

---

## When to use
The user asks for a "messaging playbook / blueprint / mind-map" of a brand — what hooks/angles/mechanisms/CTAs/etc. it has tested, deduplicated, with source references. Not a themes summary; a **structured inventory of tested messaging**.

## Prerequisite
The brand's ads must already be in Supabase (`ads` rows under its `brand_id`) **with transcripts** (the copy). If not, scrape first (`node src/browser/launch.js "<Brand>"`). Exclude duplicate rows (byte-identical "Copy of …" / "Kopija …").

---

## The 8 layers

1. **Hook** — the opening **3–5 seconds** of the ad = roughly the **first 12–20 words (20 MAX)**, cut on a sentence boundary. Captured **verbatim**. If GetHook exposes labeled `Hook 1/2/3` variants, each distinct one = one entry; otherwise the opening words ARE the hook. Every ad has a hook.
2. **Angle** — the **single biggest reason/purpose THIS specific ad exists to sell**: the premise / story / argument this one ad is built on. **AD-SPECIFIC — this is the core test.** An angle belongs to one ad's premise; if the same message recurs across the brand's ads it is NOT an angle, it's the Unique Mechanism. Written in **our own words** (the only interpretive layer). Decide it only **after reading the WHOLE ad** — it's subjective, so think.
   - *Example (garlic ED brand):* angle = "Ancient Hebrew tradition knew garlic kept men sexually capable into old age; modern medicine forgot it" (built into THIS ad only). The "ED is hardened arterial walls, aged garlic softens them" science is NOT the angle — it recurs in every ad → that's the UM.
   - **One PRIMARY angle per ad.** A plausible second angle goes in a **separate `Angle (candidate)` row** — never crammed into the primary.
   - **Candidate angles must be reviewed and resolved.** Every candidate you drop STAYS in the CSV as an `Angle (candidate)` row with the **reason removed in the `note` column** (e.g. "this is the brand UM — recurs across ads", "duplicate of angle X", "weaker than primary"). Nothing deleted silently — clean + auditable.
   - **Merge** ads whose angle is ~85%+ the same into one row (list all IDs).
   - **Offer/sale ads:** don't lazily label every sale ad "discount". First dig for the real *reason the ad exists* — "we overproduced, selling the extras cheap", "editor misprinted 65%→75% off so we're honoring it", "warehouse overstock". That's the angle. Only when there's genuinely no premise beyond the deal is the angle the offer itself (then many such ads merge into one).
3. **Unique mechanism** — the brand's **unique/scientific explanation or reasoning** for why something happens or why the product works. **BRAND-SPECIFIC — it recurs across the brand's ads, and that recurrence is how you tell it from an Angle.** Full **verbatim** passage. **More than one UM per brand is normal** — they can be:
   - **solution-specific:** root cause + the science of how the product fixes it (e.g. "ED is hardened arterial walls; aged garlic's S-allylcysteine softens them");
   - **problem-specific:** the mechanism of the *problem* (e.g. "normal toothbrushes shed microplastics → what they do inside your body"; "fiber adds bulk to stool — fine normally, but when you're constipated it's like adding more cars to a traffic jam");
   - any brand-level reasoning/analogy that explains a cause or an effect.
   A bare **feature/spec list** ("wide toe box, fur lining, waterproof, grip") is **NOT a UM** — it names features without explaining a cause/effect. Test each passage: *does it explain WHY/HOW?* If no, it's not a UM.
4. **CTA** — the actual close / call-to-action / risk-reversal, **full verbatim**. (A bare guarantee mention is a data point, not the CTA — capture the whole closing block.)
5. **Avatar** — who's targeted (persona/segment). Mix of verbatim descriptors + short persona labels.
6. **Problem** — every ICP problem/roadblock called out, **verbatim** (words or full sentences).
7. **Desire** — every dream-state / want, **verbatim**.
8. **Repeated messaging** — blocks that recur across 3+ ads (near-verbatim), representing the reusable "spine."

## Extraction rules (hard-won — follow exactly)
- **Verbatim everywhere except Angle.** Every non-angle element is exact transcript text. Angle (and `Angle (candidate)`) is the only interpretive layer. "One wrong word is costly."
- **Full messaging, not topic names.** Mechanism/CTA/problem/desire = complete passages, not compacted summaries. (Do NOT reduce "During menopause estrogen drops and testosterone converts to DHT…" to "estrogen→DHT".)
- **Read every line of every transcript — never automate-skip the reading.** The Angle-vs-UM call (ad-specific vs brand-recurring) is made DURING this read, not as a later pass. Think per ad.
- **Angle = ad-specific; Unique mechanism = brand-specific.** If a message recurs across the brand's ads it's a UM, not an angle. A feature/spec list is never a UM.
- **Merge rule:** if two elements are ~85%+ identical, merge into one row (list all script IDs, note the variant). Under that threshold, keep separate. **Applies to angles too** — don't spin up a bespoke label per ad when the premise is shared.
- **One PRIMARY angle per ad**; extra candidates go in `Angle (candidate)` rows, and any dropped candidate keeps its removal reason in `note`.
- **Every ad must appear in ≥1 Hook row AND ≥1 Angle row** (CTA is NOT compulsory). An ad missing from both means its hook/angle was missed — fix it.
- **Coverage:** each verbatim element lists *every* script that contains it (auto-computed; see below). It's the "how widely tested" signal; it does NOT apply to Angle labels.

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
Two modes:
- **Title-derived** (batch-numbered brands, e.g. Kelle): config `titleToId(title)` → `Batch#22 → B#22`, `Cyperus Rotundus_#2.5 → CR#2.5`; disambiguate collisions with a suffix (`B#14-WD`).
- **`idPrefix`** (brands with editorial/duplicate/null titles, e.g. Primal Viking): the builder assigns sequential IDs `PREFIX1..N` sorted by `sortKey` (default = row `id` = **scrape order = GetHook impressions order**), so **PV#1 = the top-spend/priority ad** and the number encodes weightage.

### Look up an ad by ID
`node scripts/blueprint_lookup.js --brand "<Brand>" PV#42` resolves any numbered ID back to its GetHook **share URL** + title/landing/active-period (same ordering as the builder). `--list` shows the top ads by priority.

---

## Runbook — apply to a NEW brand
1. **Confirm scripts exist** in `ads` under the brand's `brand_id` (with transcripts). Note the duplicate rows to skip.
2. **Create the config:** copy `scripts/blueprint_entries.kelle-skin.js` → `scripts/blueprint_entries.<slug>.js`. Fill in that brand's `dupTitles`, `titleToId` (its ID scheme), `sortKey`, and start an empty `entries` array.
3. **List titles**, design the ID scheme, and pick a diverse **pilot (~10 scripts)** to lock the taxonomy before doing all.
4. **Read every line** of each script (never automate-skip the reading). Batch the work (~15–20 scripts per pass) so quality holds.
5. Per script, add entries: the opening-words hook, the ONE primary ad-specific angle (+ any `Angle (candidate)` rows with removal reasons), the full-verbatim brand-level mechanism(s)/CTA/problems/desires, avatars, and merge recurring blocks. While reading each ad, consciously ask "is this message unique to this ad (→ Angle) or does it recur across the brand (→ UM)?" Shared blocks defined once auto-cover across the brand.
6. **Run the builder** after each batch: `node scripts/build_blueprint.js --brand "<Brand>"`. Fix any anchor that fails verification (0 failures = done).
7. **Confirm completeness:** every script appears in **≥1 Hook row AND ≥1 Angle row** (both compulsory; CTA is not). Any script missing from either = a missed hook/angle to fix.
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
