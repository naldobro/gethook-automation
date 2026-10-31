'use strict';
/**
 * Messaging blueprint — deterministic, brand-agnostic builder.
 *
 * Loads a per-brand config (scripts/blueprint_entries.<slug>.js) for the brand
 * given via --brand, pulls ALL of that brand's transcripts from Supabase, and
 * for every verbatim entry AUTO-COMPUTES coverage: it lists every script whose
 * transcript literally contains that block (curly-quote / whitespace / ellipsis
 * tolerant). So each block is defined once and "which scripts tested it" stays
 * exhaustive + verified. Writes output/<slug>_blueprint.csv.
 *
 * Per-brand config exports: { brandName?, dupTitles?, titleToId?, sortKey?, entries }
 * Entry shape: {layer, start, end?, v, ids?, manual?, allMatch?, note?}
 *   v:true              verbatim → element is the exact transcript slice;
 *                       coverage auto-computed unless manual:true.
 *   v:true, manual:true use the given ids (for ~variant merges / concept rows
 *                       whose wording differs across ads). allMatch verifies
 *                       every id truly contains it.
 *   v:false             label text (angles / persona avatars); ids used as-is.
 *
 * Usage:
 *   node scripts/build_blueprint.js --brand "Kelle Skin"
 *   node scripts/build_blueprint.js "Primal Viking"     # positional also works
 *   (defaults to "Kelle Skin" if no brand given)
 */
const fs = require('fs');
const path = require('path');
const { supabase } = require(path.join(__dirname, '..', 'src', 'supabase', 'client.js'));

// ---- args ----
const argv = process.argv.slice(2);
function getOpt(name) {
  const i = argv.findIndex((a) => a === name || a.startsWith(name + '='));
  if (i < 0) return null;
  return argv[i].includes('=') ? argv[i].split('=').slice(1).join('=') : (argv[i + 1] || null);
}
const brandArg = getOpt('--brand') || argv.find((a) => !a.startsWith('--')) || 'Kelle Skin';
// Optional single-page scope (only meaningful for a page-aware config, i.e.
// one that exports `pageLetters`). Value is a page letter ('a', 'b', …), the
// literal 'main' (the number-only page), or a raw numeric page_id. When set,
// the build is restricted to that one page: IDs are still assigned across the
// WHOLE brand first (so an ad keeps the same id in every deliverable), then
// the ad set — and therefore coverage — is filtered to the chosen page, and
// the output filename gets a page suffix.
const pageFilter = getOpt('--page');
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// tolerant regex from a typed anchor (curly quotes / whitespace / ellipsis)
function tol(s) {
  s = s.replace(/\.\.\./g, '…');
  let out = '';
  for (const c of s) {
    if (/\s/.test(c)) out += '\\s+';
    else if (c === "'" || c === '’' || c === '‘') out += "['’‘]";
    else if (c === '"' || c === '“' || c === '”') out += '["“”]';
    else if (c === '…') out += '(?:\\.\\.\\.|…)';
    else if ('\\^$.|?*+()[]{}'.includes(c)) out += '\\' + c;
    else out += c;
  }
  return out.replace(/(\\s\+)+/g, '\\s+');
}

async function resolveBrand(name) {
  const { data, error } = await supabase.from('brands').select('id,name').ilike('name', `%${name}%`);
  if (error) throw new Error(error.message);
  if (!data || !data.length) throw new Error(`No brand in Supabase matching "${name}".`);
  return data[0]; // first fuzzy match
}

function loadConfig(slug) {
  const p = path.join(__dirname, `blueprint_entries.${slug}.js`);
  if (!fs.existsSync(p)) {
    throw new Error(
      `No entries file at scripts/blueprint_entries.${slug}.js — create one ` +
        `(copy scripts/blueprint_entries.kelle-skin.js; see docs/messaging-blueprint-methodology.md).`
    );
  }
  const cfg = require(p);
  return Array.isArray(cfg) ? { entries: cfg } : cfg;
}

async function main() {
  const brand = await resolveBrand(brandArg);
  const slug = slugify(brand.name);
  const cfg = loadConfig(slug);
  const entries = cfg.entries;
  const dupTitles = new Set(cfg.dupTitles || []);
  // sortKey / rowToId receive the FULL ad row {id, media_id, title, tx}.
  // Default order = row `id` ascending = scrape/insert order = GetHook impressions
  // order, so idPrefix IDs (PV#1..) rank by spend/priority (PV#1 = top ad).
  const sortKey = cfg.sortKey || ((r) => (Number(r.id) || 0));
  const rowToId = cfg.rowToId || (cfg.titleToId ? (r) => cfg.titleToId(r.title) : (r) => (dupTitles.has(r.title) ? null : r.title));
  console.log(`Brand: "${brand.name}" (id=${brand.id}) · config: blueprint_entries.${slug}.js`);

  const { data, error } = await supabase.from('ads').select('id,media_id,page_id,title,transcript').eq('brand_id', brand.id);
  if (error) { console.error(error); process.exit(1); }
  let arr = data
    .filter((r) => !dupTitles.has(r.title))
    .map((r) => ({ id: r.id, media_id: String(r.media_id), page_id: r.page_id, title: r.title, tx: r.transcript || '' }));
  if (cfg.pageLetters) {
    // Page-aware IDs: a brand runs ads across several pages (main + 3rd-party
    // accounts). `pageLetters` maps each page_id to a letter — '' for the main
    // page (bare number) and 'a','b',… for 3rd-party pages. Within each page,
    // ads are ranked by row `id` asc (= scrape/impressions order = priority),
    // so the main page gets "1","2",… and a 3rd-party page gets "1(a)","2(a)",…
    // The letter travels with the id, so an id always reveals which page ran it
    // and the id is identical in the per-page and combined builds.
    const groups = {};
    for (const r of arr) { (groups[r.page_id] = groups[r.page_id] || []).push(r); }
    for (const pid of Object.keys(groups)) {
      groups[pid].sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0));
      groups[pid].forEach((r, i) => {
        const L = cfg.pageLetters[r.page_id];
        if (L === undefined) throw new Error(`page_id ${r.page_id} missing from cfg.pageLetters`);
        r.id = L === '' ? String(i + 1) : `${i + 1}(${L})`;
      });
    }
    // Keep a stable overall order: main page first (letter ''), then a, b, …;
    // within a page by rank. This drives the combined build's row order.
    const letterRank = (r) => { const L = cfg.pageLetters[r.page_id]; return L === '' ? '' : L; };
    arr.sort((a, b) => {
      const la = letterRank(a), lb = letterRank(b);
      if (la !== lb) return la < lb ? -1 : 1;
      // same page: by numeric rank embedded in id
      const na = parseInt(a.id, 10), nb = parseInt(b.id, 10);
      return na - nb;
    });
    if (pageFilter) {
      const isNum = /^\d+$/.test(pageFilter);
      arr = arr.filter((r) => {
        const L = cfg.pageLetters[r.page_id];
        if (isNum) return Number(r.page_id) === Number(pageFilter);
        if (pageFilter === 'main') return L === '';
        return L === pageFilter;
      });
      if (!arr.length) throw new Error(`--page=${pageFilter} matched no ads for this brand.`);
    }
  } else if (cfg.idPrefix) {
    // brands with no batch numbering: stable sequential IDs by sortKey (default media_id)
    arr.sort((a, b) => { const ka = sortKey(a), kb = sortKey(b); return ka < kb ? -1 : ka > kb ? 1 : 0; });
    arr.forEach((r, i) => { r.id = cfg.idPrefix + (i + 1); });
  } else {
    arr = arr
      .map((r) => ({ ...r, id: rowToId(r) }))
      .filter((r) => r.id)
      .sort((a, b) => { const ka = sortKey(a), kb = sortKey(b); return ka < kb ? -1 : ka > kb ? 1 : String(a.title).localeCompare(String(b.title)); });
  }
  const order = arr.map((r) => r.id);
  const tx = Object.fromEntries(arr.map((r) => [r.id, r.tx]));

  const rows = []; const fails = [];
  for (const e of entries) {
    // Under a --page scope, an entry's explicitly-listed ids are restricted to
    // the page in scope; an entry whose ids all belong to another page is simply
    // absent here (silent skip, NOT a fidelity failure — the block is real, just
    // not on this page). Without --page this is a no-op (tx holds every ad).
    let eids = e.ids ? e.ids.slice() : null;
    if (pageFilter && eids) {
      eids = eids.filter((id) => tx[id] !== undefined);
      if (!eids.length) continue;
    }
    let element, ids;
    if (!e.v) { element = e.start; ids = eids || []; }
    else {
      const pat = e.end ? tol(e.start) + '[\\s\\S]*?' + tol(e.end) : tol(e.start);
      let re; try { re = new RegExp(pat); } catch (err) { fails.push([e.layer, 'BAD REGEX', e.start]); continue; }
      if (e.manual) {
        const list = eids || []; const missing = list.filter((id) => !(tx[id] && re.test(tx[id])));
        const rep = list.find((id) => tx[id] && re.test(tx[id]));
        if (!rep) { if (pageFilter) continue; fails.push([e.layer, (e.ids || []).join(','), 'NOT FOUND', String(e.start).slice(0, 55)]); continue; }
        if (e.allMatch && missing.length) { fails.push([e.layer, list.join(','), 'allMatch miss: ' + missing.join(','), String(e.start).slice(0, 45)]); continue; }
        ids = list; element = tx[rep].match(re)[0].replace(/\s+/g, ' ').trim();
      } else {
        const hits = order.filter((id) => re.test(tx[id]));
        // Auto-coverage found this block on no in-scope transcript. Under --page
        // that just means it isn't used on this page → skip quietly; in a full
        // (combined) build it's a real anchor-vs-source failure → report it.
        if (!hits.length) { if (pageFilter) continue; fails.push([e.layer, '-', 'NOT FOUND', String(e.start).slice(0, 55)]); continue; }
        ids = hits; element = tx[hits[0]].match(re)[0].replace(/\s+/g, ' ').trim();
      }
    }
    rows.push({ layer: e.layer, element, ids: ids.join(', '), note: e.note || '', v: e.v, n: ids.length });
  }

  // dedupe: identical (layer, element) rows collapse to one. Merge notes.
  const seen = new Map(); const deduped = [];
  for (const r of rows) {
    const key = r.layer + '|' + r.element;
    if (seen.has(key)) {
      const prev = seen.get(key);
      // same (layer, element) → merge ids (union), don't drop coverage
      const union = [...new Set([...prev.ids.split(', ').filter(Boolean), ...r.ids.split(', ').filter(Boolean)])];
      prev.ids = union.join(', '); prev.n = union.length;
      if (r.note && !prev.note.includes(r.note)) prev.note = [prev.note, r.note].filter(Boolean).join(' / ');
      continue;
    }
    seen.set(key, r); deduped.push(r);
  }
  rows.length = 0; rows.push(...deduped);

  const esc = (v) => '"' + String(v).replace(/"/g, '""') + '"';
  let csv = ['layer', 'element', 'script_ids', 'coverage', 'status', 'verbatim', 'note'].map(esc).join(',') + '\n';
  // Legend row documenting the page-encoded ID scheme (brands with cfg.pageLetters),
  // so the numbering is self-explanatory inside the CSV and survives every rebuild.
  if (cfg.pageLetters) {
    const letters = [...new Set(Object.values(cfg.pageLetters))];
    const bare = letters.includes('') ? 'plain number (e.g. 17) = main page / page 1' : null;
    const suffixed = letters.filter((l) => l !== '').sort()
      .map((l) => `number + (${l}) (e.g. 17(${l})) = ${l === 'a' ? '2nd' : l === 'b' ? '3rd' : `"${l}"`} page`);
    const legend = [bare, ...suffixed].filter(Boolean).join('; ') +
      '. Within a page the number = priority (impressions) rank, so #1 = top ad.';
    csv += [`Legend`, legend, '', '', '', '', 'script_ids page-encoding — auto-generated from cfg.pageLetters'].map(esc).join(',') + '\n';
  }
  for (const r of rows) csv += [r.layer, r.element, r.ids, r.n, 'tested', r.v ? 'yes' : 'label', r.note].map(esc).join(',') + '\n';
  // one folder per brand under output/ so files don't pool into one big list
  const outDir = path.join(__dirname, '..', 'output', slug);
  fs.mkdirSync(outDir, { recursive: true });
  const pageSuffix = pageFilter ? '_' + (pageFilter === 'main' ? 'main' : pageFilter) : '';
  const outName = `${slug}${pageSuffix}_blueprint.csv`;
  const outPath = path.join(outDir, outName);
  fs.writeFileSync(outPath, csv);

  const counts = {}; for (const r of rows) counts[r.layer] = (counts[r.layer] || 0) + 1;
  console.log(`scope: ${pageFilter ? `page "${pageFilter}"` : 'whole brand (combined)'}`);
  console.log('scripts loaded (unique, dups excluded):', order.length);
  console.log('rows:', rows.length, '| verbatim:', rows.filter((r) => r.v).length, '| FAILURES:', fails.length);
  for (const f of fails) console.log('  ✗', f.join(' | '));
  console.log('by layer:', counts);
  console.log(`wrote output/${slug}/${outName}`);
  if (fails.length) process.exit(2);
}
main().catch((err) => { console.error('ERROR:', err.message); process.exit(1); });
