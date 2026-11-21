'use strict';

/**
 * scripts/rescrape_all.js
 *
 * Rescrapes every brand page that has a working GetHook link, one after the
 * other, so each page gets a fresh rank snapshot (rank history) and any new
 * ads are collected. Ads already stored are ranked, not re-processed.
 *
 *   main page        -> node src/browser/launch.js "<brand>" --url=<brands.url> --max-ads=N
 *   3rd-party page   -> node src/adlibrary/scrapePages.js "<brand>" --url=<page_url> --page="<name>" --type=<type> --max-ads=N
 *
 * Targets come from Supabase: pages that have ads (letter set), aren't marked
 * skip_rescrape, and have a https://app.gethookd.ai link. Depth (max): main
 * page = config.maxAds (100); 3rd-party pages = config.thirdPartyMaxAds (50).
 *
 * Usage:
 *   node scripts/rescrape_all.js [--dry-run] [--only="brand1,brand2"] [--skip="brand"] [--from="brand"]
 *
 * Per-target logs: output/rescrape/<YYYY-MM-DD>/<brand>[--<page>].log
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { supabase } = require('../src/supabase/client');

const ROOT = path.resolve(__dirname, '..');
const GH = 'https://app.gethookd.ai/';
const { maxAds: MAIN_MIN_DEPTH, thirdPartyMaxAds: THIRD_PARTY_MAX } = require('../src/config');

const args = process.argv.slice(2);
const opt = (n) => { const a = args.find((x) => x.startsWith(`--${n}=`)); return a ? a.slice(n.length + 3) : null; };
const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const list = (s) => (s || '').split(',').map(norm).filter(Boolean);
const dryRun = args.includes('--dry-run');
const only = list(opt('only'));
const skip = list(opt('skip'));
const from = norm(opt('from'));
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

async function all(table, sel) {
  const out = [];
  for (let f = 0; ; f += 1000) {
    const { data, error } = await supabase.from(table).select(sel).order('id').range(f, f + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    out.push(...data);
    if (data.length < 1000) return out;
  }
}

async function buildTargets() {
  const brands = await all('brands', 'id,name,url');
  const pages = await all('pages', 'id,brand_id,name,type,page_url,letter,skip_rescrape');
  const ads = await all('ads', 'id,page_id');
  const countByPage = new Map();
  for (const a of ads) countByPage.set(a.page_id, (countByPage.get(a.page_id) || 0) + 1);

  const targets = [];
  for (const b of brands) {
    const bp = pages.filter((p) => p.brand_id === b.id && p.letter !== null && !p.skip_rescrape);
    // main first, then a, b, c…
    bp.sort((x, y) => (x.letter || '').length - (y.letter || '').length || (x.letter || '').localeCompare(y.letter || ''));
    for (const p of bp) {
      const url = p.type === 'main' ? b.url : p.page_url;
      if (!url || !url.startsWith(GH)) continue;
      const depth = p.type === 'main' ? MAIN_MIN_DEPTH : THIRD_PARTY_MAX;
      const cmd = p.type === 'main'
        ? ['src/browser/launch.js', b.name, `--url=${url}`, `--max-ads=${depth}`]
        : ['src/adlibrary/scrapePages.js', b.name, `--url=${url}`, `--page=${p.name}`, `--type=${p.type}`, `--max-ads=${depth}`];
      targets.push({ brand: b.name, page: p.name, label: p.letter ? `(${p.letter})` : '(main)', stored: countByPage.get(p.id) || 0, depth, cmd });
    }
  }
  let t = targets;
  if (only.length) t = t.filter((x) => only.some((o) => norm(x.brand).includes(o)));
  if (skip.length) t = t.filter((x) => !skip.some((o) => norm(x.brand).includes(o)));
  if (from) { const i = t.findIndex((x) => norm(x.brand).includes(from)); if (i > 0) t = t.slice(i); }
  return t;
}

function runOne(t, logDir) {
  return new Promise((resolve) => {
    const file = path.join(logDir, `${slug(t.brand)}${t.label === '(main)' ? '' : '--' + slug(t.page)}.log`);
    const out = fs.createWriteStream(file);
    const child = spawn(process.execPath, t.cmd, { cwd: ROOT });
    const tee = (chunk) => { out.write(chunk); process.stdout.write(chunk); };
    child.stdout.on('data', tee);
    child.stderr.on('data', tee);
    child.on('close', (code) => { out.end(); resolve({ code, file }); });
  });
}

(async () => {
  const targets = await buildTargets();
  console.log(`Rescrape targets: ${targets.length}`);
  for (const t of targets) console.log(`  ${t.brand} ${t.label} ${t.page} — ${t.stored} stored, depth ${t.depth}`);
  if (dryRun) return;

  const day = new Date().toISOString().slice(0, 10);
  const logDir = path.join(ROOT, 'output', 'rescrape', day);
  fs.mkdirSync(logDir, { recursive: true });

  const results = [];
  for (const [i, t] of targets.entries()) {
    console.log(`\n===== [${i + 1}/${targets.length}] ${t.brand} ${t.label} ${t.page} =====`);
    const started = Date.now();
    const r = await runOne(t, logDir);
    results.push({ ...t, ...r, mins: ((Date.now() - started) / 60000).toFixed(1) });
    console.log(`===== done: exit ${r.code} in ${results.at(-1).mins} min — log ${r.file} =====`);
  }

  console.log('\n===== RESCRAPE SUMMARY =====');
  for (const r of results) console.log(`${r.code === 0 ? 'OK  ' : 'FAIL'} ${r.brand} ${r.label} ${r.page} (${r.mins} min)`);
  console.log(`${results.filter((r) => r.code === 0).length}/${results.length} succeeded.`);
})().catch((e) => { console.error(e); process.exit(1); });
