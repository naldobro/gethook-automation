'use strict';
/* Rigorous head-to-head of Kelle vs FluffCo Meta accounts.
   - Robust RFC-4180 parse (quoted transcripts w/ embedded newlines handled).
   - Every row with spend>0 counted; coverage proven (raw lines vs true records).
   - CANONICAL formulas:
       Hook rate = 3-sec plays / impressions
       Hold rate = ThruPlays / 3-sec plays          <-- corrected
       CTR(link) = link clicks / impressions
       CVR       = purchases / link clicks
   - Rates aggregated by summing raw numerators/denominators, never averaging. */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'output', 'kelle csv files');

function parseCSV(s) {
  const rows = []; let f = [], cur = '', q = false;
  for (let i = 0; i < s.length; i++) { const c = s[i];
    if (q) { if (c === '"') { if (s[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else { if (c === '"') q = true; else if (c === ',') { f.push(cur); cur = ''; }
      else if (c === '\n') { f.push(cur); rows.push(f); f = []; cur = ''; } else if (c === '\r') {} else cur += c; } }
  if (cur.length || f.length) { f.push(cur); rows.push(f); }
  return rows;
}
const num = (v) => { const x = parseFloat(String(v).replace(/[^0-9.\-]/g, '')); return isNaN(x) ? 0 : x; };

const ACCOUNTS = {
  Kelle: ['CLG_0475---koslovro---Platinum-REP-Ads-Jul-27-2026-Aug-2-2026.csv',
          'CLG_0475---koslovro---Platinum-REP-Ads-Aug-4-2026-Aug-17-2026.csv'],
  FluffCo: ['FluffCo-Ads-21-Jul-2026-19-Aug-2026.csv'],
};

function blank() { return { rows:0, spend:0, rev:0, impr:0, reach:0, purch:0, link:0, lpv:0,
  p3:0, thru:0, v25:0, v50:0, v75:0, v95:0, v100:0 }; }
function addRow(T, C, r) {
  T.rows++;
  T.spend += num(C(r,'Amount spent (USD)'));
  T.rev  += num(C(r,'Purchase ROAS (return on ad spend)')) * num(C(r,'Amount spent (USD)'));
  T.impr += num(C(r,'Impressions'));
  T.reach += num(C(r,'Reach'));
  T.purch += num(C(r,'Purchases'));
  T.link += num(C(r,'Link clicks'));
  T.lpv  += num(C(r,'Landing page views'));   // FluffCo only; Kelle lacks -> 0
  T.p3   += num(C(r,'3-second video plays'));
  T.thru += num(C(r,'ThruPlays'));
  T.v25  += num(C(r,'Video plays at 25%'));
  T.v50  += num(C(r,'Video plays at 50%'));
  T.v75  += num(C(r,'Video plays at 75%'));
  T.v95  += num(C(r,'Video plays at 95%'));
  T.v100 += num(C(r,'Video plays at 100%'));
}
function derive(T) {
  return {
    ...T,
    roas: T.spend ? T.rev / T.spend : 0,
    cpa: T.purch ? T.spend / T.purch : 0,
    aov: T.purch ? T.rev / T.purch : 0,
    cpm: T.impr ? T.spend / T.impr * 1000 : 0,
    cpc: T.link ? T.spend / T.link : 0,
    freq: T.reach ? T.impr / T.reach : 0,
    hook: T.impr ? T.p3 / T.impr * 100 : 0,
    hold: T.p3 ? T.thru / T.p3 * 100 : 0,      // corrected
    ctr:  T.impr ? T.link / T.impr * 100 : 0,
    cvr:  T.link ? T.purch / T.link * 100 : 0,
    lpvRate: T.link ? T.lpv / T.link * 100 : 0,
    r25: T.p3 ? T.v25 / T.p3 * 100 : 0,
    r50: T.p3 ? T.v50 / T.p3 * 100 : 0,
    r75: T.p3 ? T.v75 / T.p3 * 100 : 0,
    r95: T.p3 ? T.v95 / T.p3 * 100 : 0,
    r100: T.p3 ? T.v100 / T.p3 * 100 : 0,
  };
}

const report = {};
for (const [acct, files] of Object.entries(ACCOUNTS)) {
  const all = blank(), vid = blank(), stat = blank();
  let totalRows = 0, spendRows = 0, rawLines = 0;
  for (const f of files) {
    const raw = fs.readFileSync(path.join(DIR, f), 'utf8');
    rawLines += raw.split('\n').length - 1;
    const rows = parseCSV(raw);
    const H = rows[0]; const idx = Object.fromEntries(H.map((h, i) => [h, i]));
    const C = (r, n) => (n in idx ? r[idx[n]] : '');
    const D = rows.slice(1).filter((r) => r.length > 5);
    for (const r of D) {
      totalRows++;
      if (num(C(r, 'Amount spent (USD)')) <= 0) continue;
      spendRows++;
      addRow(all, C, r);
      if (num(C(r, '3-second video plays')) > 0) addRow(vid, C, r); else addRow(stat, C, r);
    }
  }
  report[acct] = { cov: { rawLines, totalRows, spendRows }, all: derive(all), vid: derive(vid), stat: derive(stat) };
}

// ---- print ----
const m = (x) => '$' + Math.round(x).toLocaleString();
const k = (x) => Math.round(x).toLocaleString();
const pc = (x) => x.toFixed(1) + '%';
function block(name, R) {
  console.log(`\n================= ${name} =================`);
  console.log(`coverage: raw file lines ${R.cov.rawLines.toLocaleString()} | true ad records ${R.cov.totalRows.toLocaleString()} | with spend>0 ${R.cov.spendRows.toLocaleString()}`);
  const a = R.all;
  console.log(`ACCOUNT (all formats): spend ${m(a.spend)} | est.rev ${m(a.rev)} | ROAS ${a.roas.toFixed(2)} | purch ${k(a.purch)} | CPA ${m(a.cpa)} | AOV ${m(a.aov)} | freq ${a.freq.toFixed(2)} | CPM $${a.cpm.toFixed(2)}`);
  const fmt = (lbl, x) => console.log(`  ${lbl.padEnd(7)} spend ${m(x.spend).padStart(9)} (${pc(100*x.spend/a.spend).padStart(5)}) ROAS ${x.roas.toFixed(2)} | hook ${pc(x.hook).padStart(6)} hold ${pc(x.hold).padStart(6)} | CTR ${pc(x.ctr).padStart(5)} CVR ${pc(x.cvr).padStart(5)} | CPA ${m(x.cpa)} AOV ${m(x.aov)}`);
  fmt('VIDEO', R.vid); fmt('STATIC', R.stat);
  const v = R.vid;
  console.log(`  video retention of 3-sec:  25% ${pc(v.r25)} | 50% ${pc(v.r50)} | 75% ${pc(v.r75)} | 95% ${pc(v.r95)} | 100% ${pc(v.r100)}`);
  if (a.lpv > 0) console.log(`  landing-page-view rate (LPV/clicks): ${pc(a.lpvRate)}`);
}
block('KELLE (koslovro / CLG_0475) — Jul 27–Aug 17', report.Kelle);
block('FLUFFCO — Jul 21–Aug 19', report.FluffCo);

// ---- side-by-side ----
console.log('\n================= HEAD-TO-HEAD (ALL FORMATS) =================');
const K = report.Kelle.all, F = report.FluffCo.all;
const KV = report.Kelle.vid, FV = report.FluffCo.vid;
const rowc = (lbl, kv, fv, better) => console.log(`  ${lbl.padEnd(22)} Kelle ${String(kv).padStart(9)}   FluffCo ${String(fv).padStart(9)}   ${better}`);
rowc('Spend', m(K.spend), m(F.spend), '');
rowc('Blended ROAS', K.roas.toFixed(2), F.roas.toFixed(2), F.roas>K.roas?'FluffCo':'Kelle');
rowc('AOV', m(K.aov), m(F.aov), F.aov>K.aov?'FluffCo':'Kelle');
rowc('CPA', m(K.cpa), m(F.cpa), K.cpa<F.cpa?'Kelle':'FluffCo');
rowc('Frequency', K.freq.toFixed(2), F.freq.toFixed(2), '');
rowc('CPM', '$'+K.cpm.toFixed(2), '$'+F.cpm.toFixed(2), K.cpm<F.cpm?'Kelle':'FluffCo');
rowc('Static % of spend', pc(100*report.Kelle.stat.spend/K.spend), pc(100*report.FluffCo.stat.spend/F.spend), '');
console.log('  --- VIDEO ONLY ---');
rowc('Video hook rate', pc(KV.hook), pc(FV.hook), KV.hook>FV.hook?'Kelle':'FluffCo');
rowc('Video hold rate', pc(KV.hold), pc(FV.hold), KV.hold>FV.hold?'Kelle':'FluffCo');
rowc('Video CTR (link)', pc(KV.ctr), pc(FV.ctr), KV.ctr>FV.ctr?'Kelle':'FluffCo');
rowc('Video CVR', pc(KV.cvr), pc(FV.cvr), KV.cvr>FV.cvr?'Kelle':'FluffCo');
rowc('Video ROAS', KV.roas.toFixed(2), FV.roas.toFixed(2), KV.roas>FV.roas?'Kelle':'FluffCo');

fs.writeFileSync(path.join('/private/tmp/claude-501/-Users-mohammedhussain-Desktop-Claude-Projects-gethook-automation/18b4d6e1-6f2d-49a3-ba34-4c9f94d6a607/scratchpad','compare_accounts.json'), JSON.stringify(report,null,2));
