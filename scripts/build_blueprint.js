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
  const titleToId = cfg.titleToId || ((t) => (dupTitles.has(t) ? null : t));
  const sortKey = cfg.sortKey || ((t) => t);
  console.log(`Brand: "${brand.name}" (id=${brand.id}) · config: blueprint_entries.${slug}.js`);

  const { data, error } = await supabase.from('ads').select('title,transcript').eq('brand_id', brand.id);
  if (error) { console.error(error); process.exit(1); }
  const arr = data
    .filter((r) => !dupTitles.has(r.title))
    .map((r) => ({ id: titleToId(r.title), title: r.title, tx: r.transcript || '' }))
    .filter((r) => r.id)
    .sort((a, b) => {
      const ka = sortKey(a.title), kb = sortKey(b.title);
      return ka < kb ? -1 : ka > kb ? 1 : a.title.localeCompare(b.title);
    });
  const order = arr.map((r) => r.id);
  const tx = Object.fromEntries(arr.map((r) => [r.id, r.tx]));

  const rows = []; const fails = [];
  for (const e of entries) {
    let element, ids;
    if (!e.v) { element = e.start; ids = e.ids || []; }
    else {
      const pat = e.end ? tol(e.start) + '[\\s\\S]*?' + tol(e.end) : tol(e.start);
      let re; try { re = new RegExp(pat); } catch (err) { fails.push([e.layer, 'BAD REGEX', e.start]); continue; }
      if (e.manual) {
        const list = e.ids || []; const missing = list.filter((id) => !(tx[id] && re.test(tx[id])));
        const rep = list.find((id) => tx[id] && re.test(tx[id]));
        if (!rep) { fails.push([e.layer, (e.ids || []).join(','), 'NOT FOUND', String(e.start).slice(0, 55)]); continue; }
        if (e.allMatch && missing.length) { fails.push([e.layer, list.join(','), 'allMatch miss: ' + missing.join(','), String(e.start).slice(0, 45)]); continue; }
        ids = list; element = tx[rep].match(re)[0].replace(/\s+/g, ' ').trim();
      } else {
        const hits = order.filter((id) => re.test(tx[id]));
        if (!hits.length) { fails.push([e.layer, '-', 'NOT FOUND', String(e.start).slice(0, 55)]); continue; }
        ids = hits; element = tx[hits[0]].match(re)[0].replace(/\s+/g, ' ').trim();
      }
    }
    rows.push({ layer: e.layer, element, ids: ids.join(', '), note: e.note || '', v: e.v, n: ids.length });
  }

  // dedupe: identical (layer, element) rows collapse to one. Merge notes.
  const seen = new Map(); const deduped = [];
  for (const r of rows) {
    const key = r.layer + '|' + r.element;
    if (seen.has(key)) { const prev = seen.get(key); if (r.note && !prev.note.includes(r.note)) prev.note = [prev.note, r.note].filter(Boolean).join(' / '); continue; }
    seen.set(key, r); deduped.push(r);
  }
  rows.length = 0; rows.push(...deduped);

  const esc = (v) => '"' + String(v).replace(/"/g, '""') + '"';
  let csv = ['layer', 'element', 'script_ids', 'coverage', 'status', 'verbatim', 'note'].map(esc).join(',') + '\n';
  for (const r of rows) csv += [r.layer, r.element, r.ids, r.n, 'tested', r.v ? 'yes' : 'label', r.note].map(esc).join(',') + '\n';
  const outPath = path.join(__dirname, '..', 'output', `${slug}_blueprint.csv`);
  fs.writeFileSync(outPath, csv);

  const counts = {}; for (const r of rows) counts[r.layer] = (counts[r.layer] || 0) + 1;
  console.log('scripts loaded (unique, dups excluded):', order.length);
  console.log('rows:', rows.length, '| verbatim:', rows.filter((r) => r.v).length, '| FAILURES:', fails.length);
  for (const f of fails) console.log('  ✗', f.join(' | '));
  console.log('by layer:', counts);
  console.log(`wrote output/${slug}_blueprint.csv`);
  if (fails.length) process.exit(2);
}
main().catch((err) => { console.error('ERROR:', err.message); process.exit(1); });
