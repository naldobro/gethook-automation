'use strict';
/**
 * Kelle (Cyperglow / koslovro) Meta ad-performance analyzer.
 * Reads the two weekly CSV exports, parses the BATCH NUMBER out of each ad
 * name, joins to the 8-layer blueprint angle labels, and aggregates every
 * metric CORRECTLY (sum raw numerators/denominators, then divide — never
 * average pre-computed rates). Ignores rows with 0 spend.
 *
 * Outputs a per-batch JSON (scratchpad) that the analysis + artifact use.
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'output', 'kelle csv files');
const FILES = [
  { f: 'CLG_0475---koslovro---Platinum-REP-Ads-Jul-27-2026-Aug-2-2026.csv', wk: 'W1 (Jul27-Aug2)' },
  { f: 'CLG_0475---koslovro---Platinum-REP-Ads-Aug-4-2026-Aug-17-2026.csv', wk: 'W2-3 (Aug4-Aug17)' },
];

function parseCSV(s) {
  const rows = []; let f = [], cur = '', q = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === '"') { if (s[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else { if (c === '"') q = true; else if (c === ',') { f.push(cur); cur = ''; }
      else if (c === '\n') { f.push(cur); rows.push(f); f = []; cur = ''; } else if (c === '\r') {} else cur += c; }
  }
  if (cur.length || f.length) { f.push(cur); rows.push(f); }
  return rows;
}
const num = (v) => { const x = parseFloat(String(v).replace(/[^0-9.\-]/g, '')); return isNaN(x) ? 0 : x; };

// ---- batch id parser ----
function parseBatch(name) {
  const n = name || '';
  let m = n.match(/cyperus\s*rotundus[\s\-]*#\s*([0-9][0-9.,_]*)/i);
  if (m) return { id: 'CR#' + m[1].replace(/,/g, '.'), fam: 'CR#' + m[1].match(/^\d+/)[0], series: 'CR' };
  m = n.match(/batch\s*#\s*([0-9][0-9.,_]*)/i);
  if (m) return { id: 'B#' + m[1].replace(/,/g, '.'), fam: 'B#' + m[1].match(/^\d+/)[0], series: 'B' };
  m = n.match(/#\s*([0-9][0-9.,_]*)/);
  if (m) return { id: 'B#' + m[1].replace(/,/g, '.'), fam: 'B#' + m[1].match(/^\d+/)[0], series: 'B' };
  return { id: '(none)', fam: '(none)', series: '?' };
}
function parseActor(name) {
  const m = (name || '').match(/-\s*([A-Za-z][A-Za-z]+)\s*-\s*V\d/i);
  return m ? m[1] : '';
}
function parseVariant(name) { const m = (name || '').match(/\bV(\d)\b/); return m ? 'V' + m[1] : ''; }

// ---- blueprint angle map (batch id -> angle label) ----
function loadAngles() {
  const p = path.join(__dirname, '..', 'output', 'kelle-skin', 'kelle-skin_blueprint.csv');
  const rows = parseCSV(fs.readFileSync(p, 'utf8'));
  const map = {};
  for (const r of rows) {
    if (r[0] !== 'Angle') continue;
    const el = r[1];
    (r[2].match(/(?:B|CR)#[0-9.]+(?:-[A-Za-z]+)?/g) || []).forEach((id) => { if (!map[id]) map[id] = el; });
  }
  return map;
}

const COLS = {}; // filled per file
function C(r, name) { return r[COLS[name]]; }

function blank() {
  return { spend: 0, impr: 0, reach: 0, purch: 0, rev: 0, linkClicks: 0, allClicks: 0,
    p3: 0, p2: 0, thru: 0, vp: 0, v25: 0, v50: 0, v75: 0, v95: 0, v100: 0,
    rows: 0, names: new Set(), actors: {}, variants: {}, wk: {} };
}
function wkAcc(agg, wk) { return (agg.wk[wk] = agg.wk[wk] || { spend: 0, rev: 0, purch: 0, impr: 0 }); }
function add(agg, r, wk) {
  agg.spend += num(C(r, 'Amount spent (USD)'));
  agg.impr += num(C(r, 'Impressions'));
  agg.reach += num(C(r, 'Reach'));
  agg.purch += num(C(r, 'Purchases'));
  agg.rev += num(C(r, 'Purchase ROAS (return on ad spend)')) * num(C(r, 'Amount spent (USD)'));
  agg.linkClicks += num(C(r, 'Link clicks'));
  agg.allClicks += num(C(r, 'Clicks (all)'));
  agg.p3 += num(C(r, '3-second video plays'));
  agg.p2 += num(C(r, '2-second continuous video plays'));
  agg.thru += num(C(r, 'ThruPlays'));
  agg.vp += num(C(r, 'Video plays'));
  agg.v25 += num(C(r, 'Video plays at 25%'));
  agg.v50 += num(C(r, 'Video plays at 50%'));
  agg.v75 += num(C(r, 'Video plays at 75%'));
  agg.v95 += num(C(r, 'Video plays at 95%'));
  agg.v100 += num(C(r, 'Video plays at 100%'));
  agg.rows++;
  agg.names.add(C(r, 'Ad name'));
  const a = parseActor(C(r, 'Ad name')); if (a) agg.actors[a] = (agg.actors[a] || 0) + num(C(r, 'Amount spent (USD)'));
  const v = parseVariant(C(r, 'Ad name')); if (v) agg.variants[v] = (agg.variants[v] || 0) + num(C(r, 'Amount spent (USD)'));
  const w = wkAcc(agg, wk);
  w.spend += num(C(r, 'Amount spent (USD)'));
  w.rev += num(C(r, 'Purchase ROAS (return on ad spend)')) * num(C(r, 'Amount spent (USD)'));
  w.purch += num(C(r, 'Purchases'));
  w.impr += num(C(r, 'Impressions'));
}

const angles = loadAngles();
const batches = {};   // id -> agg
const fams = {};      // family -> agg
const actorAgg = {};  // actor -> agg
let totalRows = 0, totalSpendRows = 0, grandSpend = 0, grandRev = 0, grandPurch = 0, grandImpr = 0;

for (const { f, wk } of FILES) {
  const rows = parseCSV(fs.readFileSync(path.join(DIR, f), 'utf8'));
  const H = rows[0];
  H.forEach((h, i) => { COLS[h] = i; });
  const D = rows.slice(1).filter((r) => r.length > 5);
  for (const r of D) {
    totalRows++;
    const spend = num(C(r, 'Amount spent (USD)'));
    if (spend <= 0) continue;
    totalSpendRows++;
    grandSpend += spend; grandRev += num(C(r, 'Purchase ROAS (return on ad spend)')) * spend;
    grandPurch += num(C(r, 'Purchases')); grandImpr += num(C(r, 'Impressions'));
    const b = parseBatch(C(r, 'Ad name'));
    (batches[b.id] = batches[b.id] || blank()); add(batches[b.id], r, wk);
    (fams[b.fam] = fams[b.fam] || blank()); add(fams[b.fam], r, wk);
    const ac = parseActor(C(r, 'Ad name')) || '(unknown)';
    (actorAgg[ac] = actorAgg[ac] || blank()); add(actorAgg[ac], r, wk);
  }
}

function derive(a) {
  return {
    spend: a.spend, impr: a.impr, purch: a.purch, rev: a.rev, rows: a.rows, ads: a.names.size,
    roas: a.spend ? a.rev / a.spend : 0,
    cpa: a.purch ? a.spend / a.purch : 0,
    cpm: a.impr ? a.spend / a.impr * 1000 : 0,
    ctrLink: a.impr ? a.linkClicks / a.impr * 100 : 0,
    cpcLink: a.linkClicks ? a.spend / a.linkClicks : 0,
    cvr: a.linkClicks ? a.purch / a.linkClicks * 100 : 0,
    hook: a.impr ? a.p3 / a.impr * 100 : 0,          // hook rate = 3s plays / impressions
    hold: a.impr ? a.thru / a.impr * 100 : 0,         // hold rate = ThruPlays / impressions
    // retention curve as % of 3-sec plays (people who actually started)
    r25: a.p3 ? a.v25 / a.p3 * 100 : 0,
    r50: a.p3 ? a.v50 / a.p3 * 100 : 0,
    r75: a.p3 ? a.v75 / a.p3 * 100 : 0,
    r95: a.p3 ? a.v95 / a.p3 * 100 : 0,
    r100: a.p3 ? a.v100 / a.p3 * 100 : 0,
    isVideo: a.p3 > 0,
    format: a.p3 > 0 ? 'video' : 'static',
    wk: Object.fromEntries(Object.entries(a.wk).map(([k, w]) => [k,
      { spend: w.spend, roas: w.spend ? w.rev / w.spend : 0, purch: w.purch, cpa: w.purch ? w.spend / w.purch : 0 }])),
    actors: a.actors, variants: a.variants,
  };
}

const out = { generatedAt: new Date().toISOString(),
  totals: { totalRows, totalSpendRows, grandSpend, grandRev, grandPurch, grandImpr,
    blendedRoas: grandRev / grandSpend, blendedCpa: grandPurch ? grandSpend / grandPurch : 0 },
  batches: Object.fromEntries(Object.entries(batches).map(([k, a]) => [k, { ...derive(a), angle: angles[k] || '' }])),
  families: Object.fromEntries(Object.entries(fams).map(([k, a]) => [k, { ...derive(a), angle: angles[k] || '' }])),
  actors: Object.fromEntries(Object.entries(actorAgg).map(([k, a]) => [k, derive(a)])),
};
const OUT = path.join('/private/tmp/claude-501/-Users-mohammedhussain-Desktop-Claude-Projects-gethook-automation/18b4d6e1-6f2d-49a3-ba34-4c9f94d6a607/scratchpad', 'kelle_perf.json');
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));

// ---- console summary ----
const money = (x) => '$' + Math.round(x).toLocaleString();
console.log('=== COVERAGE ===');
console.log('total ad rows (both files):', totalRows, '| rows with spend>0:', totalSpendRows);
console.log('grand spend:', money(grandSpend), '| est revenue:', money(grandRev),
  '| blended ROAS:', out.totals.blendedRoas.toFixed(2), '| purchases:', Math.round(grandPurch),
  '| blended CPA:', money(out.totals.blendedCpa));
console.log('distinct batches:', Object.keys(batches).length, '| distinct families:', Object.keys(fams).length);
console.log('wrote', OUT);
