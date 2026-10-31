'use strict';
/* Generates a full-coverage HTML performance report from kelle_perf.json.
   Every batch is embedded (no summarizing); the big table is rendered client-side
   with sort/filter so it stays usable. */
const fs = require('fs');
const path = require('path');
const SP = '/private/tmp/claude-501/-Users-mohammedhussain-Desktop-Claude-Projects-gethook-automation/18b4d6e1-6f2d-49a3-ba34-4c9f94d6a607/scratchpad';
const J = JSON.parse(fs.readFileSync(path.join(SP, 'kelle_perf.json'), 'utf8'));
const W1 = 'W1 (Jul27-Aug2)', W2 = 'W2-3 (Aug4-Aug17)';

const batches = Object.entries(J.batches).map(([id, v]) => ({ id, ...v }))
  .sort((a, b) => b.spend - a.spend);
const t = J.totals;

// account weekly
let a1 = { s: 0, r: 0 }, a2 = { s: 0, r: 0 };
for (const b of batches) {
  const w1 = b.wk[W1] || { spend: 0, roas: 0 }, w2 = b.wk[W2] || { spend: 0, roas: 0 };
  a1.s += w1.spend; a1.r += w1.spend * w1.roas; a2.s += w2.spend; a2.r += w2.spend * w2.roas;
}
const wk1roas = a1.r / a1.s, wk2roas = a2.r / a2.s;

// angle themes
const themes = [
  ['Founder story', /founder story/i], ['Aesthetician scorecard / rates', /rates? (hair-removal )?methods|scorecard|ranks/i],
  ['Amazon / oil scam', /amazon|oil scam/i], ['DHT / enzyme mechanism', /dht|5-alpha|enzyme|hormonal/i],
  ['BOF small-biz / sale', /bof|small biz|sacrificing|sale/i], ['Aesthetician authority (broad)', /aesthetician|esthetician/i],
  ['Animation / claymation', /animation|claymation/i], ['White / grey hair', /white.?hair|grey.?hair|white\/light/i],
  ['Black-women segment', /black women/i], ['Daily plucker / shaver UGC', /daily (plucker|shaver)|put the tweezers|salon ugc/i],
  ['Body-hair expansion', /body.?hair|all-hair|underarm|legs|bikini/i], ['How-to / usage', /how-to|usage|routine/i],
];
const sum = (arr, k) => arr.reduce((s, b) => s + (b[k] || 0), 0);
const themeRows = themes.map(([name, re]) => {
  const g = batches.filter(b => re.test(b.angle || ''));
  if (!g.length) return null;
  return { name, n: g.length, spend: sum(g, 'spend'), roas: sum(g, 'rev') / sum(g, 'spend') };
}).filter(Boolean).sort((a, b) => b.roas - a.roas);

const actors = Object.entries(J.actors).map(([a, v]) => ({ a, ...v })).filter(x => x.spend >= 300).sort((x, y) => y.spend - x.spend);

// embed compact batch objects
const rows = batches.map(b => ({
  id: b.id, angle: b.angle || '', fmt: b.format, spend: b.spend, roas: b.roas, cpa: b.cpa, purch: b.purch,
  hook: b.hook, hold: b.hold, ctr: b.ctrLink, cpc: b.cpcLink, cvr: b.cvr, cpm: b.cpm,
  r25: b.r25, r50: b.r50, r75: b.r75, r100: b.r100,
  w1: (b.wk[W1] || { spend: 0, roas: 0 }), w2: (b.wk[W2] || { spend: 0, roas: 0 }),
}));

const money0 = x => '$' + Math.round(x).toLocaleString();
const DATA = JSON.stringify({ rows, totals: t, wk1roas, wk2roas, w1spend: a1.s, w2spend: a2.s }).replace(/</g, '\\u003c');

const css = `
:root{
  --bg:#f7f4f0; --panel:#fffdfb; --ink:#241f26; --muted:#6b6470; --line:#e7ded6;
  --accent:#6d4076; --accent-soft:#efe6f2;
  --good:#2f7d5b; --good-bg:#e3f2ea; --watch:#a8760f; --watch-bg:#f7edda; --bad:#b3453e; --bad-bg:#f7e3e1;
  --mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;
  --sans:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
@media (prefers-color-scheme:dark){:root{
  --bg:#17151a; --panel:#201d24; --ink:#ece7ef; --muted:#a49dab; --line:#332e38;
  --accent:#c79ad4; --accent-soft:#2c2333; --good:#5bbd8b; --good-bg:#16331f; --watch:#d7a53f; --watch-bg:#3a2f16;
  --bad:#e0827a; --bad-bg:#3a201e;}}
:root[data-theme="dark"]{--bg:#17151a;--panel:#201d24;--ink:#ece7ef;--muted:#a49dab;--line:#332e38;--accent:#c79ad4;--accent-soft:#2c2333;--good:#5bbd8b;--good-bg:#16331f;--watch:#d7a53f;--watch-bg:#3a2f16;--bad:#e0827a;--bad-bg:#3a201e;}
:root[data-theme="light"]{--bg:#f7f4f0;--panel:#fffdfb;--ink:#241f26;--muted:#6b6470;--line:#e7ded6;--accent:#6d4076;--accent-soft:#efe6f2;--good:#2f7d5b;--good-bg:#e3f2ea;--watch:#a8760f;--watch-bg:#f7edda;--bad:#b3453e;--bad-bg:#f7e3e1;}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.5;font-size:15px}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px 80px}
header.top{background:var(--accent);color:#fff;margin-bottom:28px}
:root[data-theme="dark"] header.top,@media (prefers-color-scheme:dark){}
header.top .inner{max-width:1120px;margin:0 auto;padding:26px 20px}
header.top .eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.8}
header.top h1{font-family:var(--serif);font-weight:600;font-size:30px;margin:.2em 0 .1em;text-wrap:balance}
header.top .sub{opacity:.85;font-size:14px}
.kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:20px}
.kpi{background:rgba(255,255,255,.12);border-radius:10px;padding:12px 14px}
.kpi .v{font-family:var(--mono);font-size:22px;font-variant-numeric:tabular-nums;font-weight:600}
.kpi .l{font-size:11px;letter-spacing:.06em;text-transform:uppercase;opacity:.82;margin-top:2px}
h2{font-family:var(--serif);font-weight:600;font-size:21px;margin:34px 0 6px;display:flex;align-items:baseline;gap:10px}
h2 .n{font-family:var(--mono);font-size:13px;color:var(--accent);font-weight:700}
.lead{color:var(--muted);margin:0 0 16px;max-width:70ch}
.panel{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:18px 20px;margin-bottom:14px}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:820px){.cols{grid-template-columns:1fr}.kpis{grid-template-columns:repeat(2,1fr)}}
.verdict{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.vcard{border-radius:12px;padding:16px 18px;border:1px solid var(--line)}
.vcard.more{background:var(--good-bg)} .vcard.less{background:var(--bad-bg)}
.vcard h3{margin:0 0 8px;font-size:15px;letter-spacing:.02em}
.vcard.more h3{color:var(--good)} .vcard.less h3{color:var(--bad)}
.vcard ul{margin:0;padding-left:18px} .vcard li{margin:5px 0}
.pill{display:inline-block;padding:1px 7px;border-radius:999px;font-family:var(--mono);font-size:12px;font-weight:600;font-variant-numeric:tabular-nums}
.p-good{background:var(--good-bg);color:var(--good)} .p-watch{background:var(--watch-bg);color:var(--watch)} .p-bad{background:var(--bad-bg);color:var(--bad)}
table{width:100%;border-collapse:collapse;font-size:13.5px}
.scroll{overflow-x:auto;border:1px solid var(--line);border-radius:12px;background:var(--panel)}
th,td{padding:7px 10px;text-align:right;white-space:nowrap;border-bottom:1px solid var(--line)}
th:first-child,td:first-child,th.l,td.l{text-align:left}
thead th{position:sticky;top:0;background:var(--panel);cursor:pointer;user-select:none;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}
thead th:hover{color:var(--accent)}
td.num{font-family:var(--mono);font-variant-numeric:tabular-nums}
tbody tr:hover{background:var(--accent-soft)}
.angle{color:var(--muted);font-size:12.5px;max-width:280px;overflow:hidden;text-overflow:ellipsis}
.controls{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:6px 0 12px}
.controls input[type=search]{flex:1;min-width:180px;padding:8px 12px;border:1px solid var(--line);border-radius:8px;background:var(--panel);color:var(--ink);font-size:14px}
.btn{padding:6px 12px;border:1px solid var(--line);border-radius:8px;background:var(--panel);color:var(--ink);cursor:pointer;font-size:13px}
.btn.on{background:var(--accent);color:#fff;border-color:var(--accent)}
.controls label{font-size:13px;color:var(--muted)}
.bar{height:8px;border-radius:4px;background:var(--line);overflow:hidden;min-width:60px;display:inline-block;vertical-align:middle}
.bar>span{display:block;height:100%;background:var(--accent)}
.mini{font-size:12px;color:var(--muted)}
.trend-up{color:var(--good);font-weight:600} .trend-dn{color:var(--bad);font-weight:600}
.note{font-size:12.5px;color:var(--muted);margin-top:8px}
.themebar{display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--line)}
.themebar .nm{flex:1} .themebar .track{width:160px;height:10px;border-radius:5px;background:var(--line);overflow:hidden}
.themebar .track>span{display:block;height:100%}
footer{color:var(--muted);font-size:12.5px;margin-top:30px;border-top:1px solid var(--line);padding-top:14px}
`;

function themeBar(r) {
  const w = Math.min(100, r.roas / 2 * 100);
  const col = r.roas >= 1.31 ? 'var(--good)' : r.roas >= 1 ? 'var(--watch)' : 'var(--bad)';
  return `<div class="themebar"><div class="nm">${r.name} <span class="mini">· ${r.n} batch${r.n > 1 ? 'es' : ''} · ${money0(r.spend)}</span></div>
    <div class="track"><span style="width:${w}%;background:${col}"></span></div>
    <div class="num" style="width:52px;font-family:var(--mono);font-weight:700;color:${col}">${r.roas.toFixed(2)}</div></div>`;
}

const html = `<div class="wrap-outer">
<header class="top"><div class="inner">
  <div class="eyebrow">Kelle — Meta Ads · account CLG_0475 / koslovro</div>
  <h1>What's working &amp; what's not — 3 weeks of ad performance</h1>
  <div class="sub">Jul 27 – Aug 17 2026 · every batch with spend analysed (${t.totalSpendRows.toLocaleString()} ad rows → ${Object.keys(J.batches).length} batches) · 0-spend rows excluded</div>
  <div class="kpis">
    <div class="kpi"><div class="v">${money0(t.grandSpend)}</div><div class="l">Spend</div></div>
    <div class="kpi"><div class="v">${money0(t.grandRev)}</div><div class="l">Est. revenue</div></div>
    <div class="kpi"><div class="v">${t.blendedRoas.toFixed(2)}</div><div class="l">Blended ROAS</div></div>
    <div class="kpi"><div class="v">${Math.round(t.grandPurch).toLocaleString()}</div><div class="l">Purchases</div></div>
    <div class="kpi"><div class="v">${money0(t.blendedCpa)}</div><div class="l">Blended CPA</div></div>
  </div>
</div></header>
<div class="wrap">

  <div class="panel" style="border-left:4px solid var(--watch)">
    <strong>Headline:</strong> the account <b>cooled off</b> across the window — Week 1 ROAS <span class="pill p-good">${wk1roas.toFixed(2)}</span> fell to
    <span class="pill p-bad">${wk2roas.toFixed(2)}</span> in Weeks 2–3. The cause is concentrated: the hero ad <b>CR#7 (Founder story)</b> fatigued
    (2.45 → 1.09) while most fresh Week 2–3 budget went into <b>losing body-hair angles</b>. The rising control is <b>B#55 (Aesthetician scorecard)</b>, up 1.56 → 1.77 and scaling.
  </div>

  <h2><span class="n">01</span> The verdict — do more / do less</h2>
  <div class="verdict">
    <div class="vcard more"><h3>▲ Scale (proven, above 1.31 blended)</h3><ul>
      <li><b>B#55 — Aesthetician scorecard</b> (rates methods 1–10): 1.68 ROAS, $9.9k, <b>still improving</b> (1.77 in W2-3). The new hero.</li>
      <li><b>CR#7 — Founder story (Mia &amp; mum)</b>: 1.90 lifetime, but <b>fatiguing</b> — refresh with new hooks/edits, don't just keep scaling the same cut.</li>
      <li><b>B#88 — Amazon oil-scam education</b>: 1.59 on low hook rate — it pre-sells, high CVR.</li>
      <li><b>DHT / enzyme mechanism</b> (B#78/78.1): 1.33–1.57, best hook rates in the account.</li>
      <li><b>B#90 static concept</b> (image): B#90_2.1 = 2.71, B#90_3.2 = 1.72 — cheap clicks, high CVR. Under-scaled.</li>
    </ul></div>
    <div class="vcard less"><h3>▼ Cut / stop feeding (below 1.0)</h3><ul>
      <li><b>Body-hair expansion</b> (B#106, B#82.1, B#107): 0.68 theme ROAS — most of the wasted W2-3 test budget.</li>
      <li><b>Black-women segment</b> (B#79, B#81): 0.88 — high CTR, low CVR (wrong-intent clicks).</li>
      <li><b>Daily plucker / shaver UGC</b> (B#28, B#27.1, B#2.6): 0.68 — good hooks, weak conversion.</li>
      <li><b>White/grey-hair angle</b> (CR#2.3, B#27.1): 0.81 — niche, doesn't convert at scale.</li>
      <li><b>B#2.9</b> (unlabeled aesthetician variant): $4.1k spent in W2-3 at 0.90 — biggest single leak.</li>
    </ul></div>
  </div>

  <h2><span class="n">02</span> What angle actually works <span class="mini" style="font-size:12px;font-weight:400">(spend-weighted ROAS by theme)</span></h2>
  <p class="lead">Blended line = 1.31. Bars above it earn; below it bleed. The pattern is blunt: <b>authority &amp; education win, segment &amp; body-hair expansion lose.</b></p>
  <div class="panel">${themeRows.map(themeBar).join('')}</div>

  <h2><span class="n">03</span> The real driver isn't the hook — it's the click quality (CVR)</h2>
  <div class="cols">
    <div class="panel"><p style="margin:0 0 8px"><b>Hook rate is table stakes.</b> Almost every video clears 40–56% (3-sec/impressions). It does <em>not</em> predict ROAS: the best-retaining ad in the account, <b>B#2.9</b> (55% hook, holds to 6% completion), still loses at 0.90.</p>
    <p style="margin:0"><b>High CTR can be a trap.</b> <b>B#79</b> has the highest link-CTR (4.94%) but 0.88 ROAS — curiosity/outrage clicks that don't buy.</p></div>
    <div class="panel"><p style="margin:0 0 8px"><b>CVR (purchase ÷ link click) is the separator.</b> Winners convert <b>3.3–4.6%</b> of clicks; losers <b>1.2–2.0%</b>.</p>
    <p style="margin:0">B#55 <span class="pill p-good">4.6%</span> · CR#7 <span class="pill p-good">3.3%</span> · B#88 <span class="pill p-good">3.3%</span> &nbsp;vs&nbsp; B#28 <span class="pill p-bad">1.2%</span> · B#27.1 <span class="pill p-bad">1.4%</span> · B#79 <span class="pill p-bad">1.5%</span>. Angle quality shows up at the checkout, not the thumbnail.</p></div>
  </div>

  <h2><span class="n">04</span> Every batch — sortable, filterable <span class="mini" style="font-size:12px;font-weight:400">(all ${rows.length}, click a header to sort)</span></h2>
  <div class="controls">
    <input type="search" id="q" placeholder="Search batch # or angle…">
    <button class="btn on" data-fmt="all">All</button>
    <button class="btn" data-fmt="video">Video</button>
    <button class="btn" data-fmt="static">Static</button>
    <label>min spend $<input id="minspend" type="number" value="0" style="width:70px;padding:5px;border:1px solid var(--line);border-radius:6px;background:var(--panel);color:var(--ink)"></label>
    <span class="mini" id="count"></span>
  </div>
  <div class="scroll"><table id="tbl"><thead><tr>
    <th class="l" data-k="id">Batch</th><th class="l" data-k="angle">Angle / name</th><th data-k="fmt">Fmt</th>
    <th data-k="spend">Spend</th><th data-k="roas">ROAS</th><th data-k="cpa">CPA</th><th data-k="purch">Purch</th>
    <th data-k="hook">Hook%</th><th data-k="hold">Hold%</th><th data-k="ctr">CTR%</th><th data-k="cpc">CPC</th><th data-k="cvr">CVR%</th>
    <th data-k="r50">→50%</th><th data-k="r100">→100%</th><th data-k="w1roas">W1</th><th data-k="w2roas">W2-3</th>
  </tr></thead><tbody id="tb"></tbody></table></div>
  <p class="note">ROAS colour: <span class="pill p-good">≥1.31</span> (beats blended) · <span class="pill p-watch">1.00–1.31</span> · <span class="pill p-bad">&lt;1.00</span>. Hook = 3-sec plays ÷ impressions. Hold = ThruPlays ÷ impressions. →50 / →100 = share of 3-sec viewers reaching that mark. CVR = purchases ÷ link clicks. Static ads have no video metrics (shown as —).</p>

  <h2><span class="n">05</span> Format &amp; presenter</h2>
  <div class="cols">
    <div class="panel"><h3 style="margin:0 0 8px;font-size:15px">Video vs static</h3>
      <p style="margin:0 0 6px"><b>Video</b> = $62.9k spend, ROAS <b>1.34</b> — 83% of budget, the workhorse.</p>
      <p style="margin:0 0 6px"><b>Static</b> = $12.4k, ROAS 1.16, but <b>bimodal</b>: the B#90 image concept converts (2.71 / 1.72) on low CTR + high CVR, while B#113 (0.83) and stray tests drag the average. Scale B#90, kill B#113.</p>
      <p class="mini" style="margin:0">Static's low CTR + high CVR = fewer, higher-intent clicks — a cheaper path worth its own budget line.</p></div>
    <div class="panel"><h3 style="margin:0 0 8px;font-size:15px">Presenter (spend-weighted ROAS)</h3>
      <table style="font-size:13px"><thead><tr><th class="l">Actor</th><th>Spend</th><th>ROAS</th><th>CPA</th><th>Hook</th><th>CVR</th></tr></thead><tbody>
      ${actors.map(x => `<tr><td class="l">${x.a}</td><td class="num">${money0(x.spend)}</td><td class="num" style="color:${x.roas >= 1.31 ? 'var(--good)' : x.roas >= 1 ? 'var(--watch)' : 'var(--bad)'};font-weight:700">${x.roas.toFixed(2)}</td><td class="num">$${Math.round(x.cpa)}</td><td class="num">${x.hook.toFixed(0)}%</td><td class="num">${x.cvr.toFixed(1)}%</td></tr>`).join('')}
      </tbody></table>
      <p class="mini" style="margin:8px 0 0"><b>Petra</b> carries 61% of spend at 1.41 — the proven face. <b>Hamid</b>'s cuts underperform (1.06); shift his volume to Petra or Matej.</p></div>
  </div>

  <footer>
    Method: both weekly exports parsed in full (RFC-4180, quoted transcripts handled); metrics aggregated by summing raw numerators/denominators then dividing (never averaging pre-computed rates). Est. revenue = Purchase ROAS × spend per row. Window mixes a 7-day (W1) and 14-day (W2-3) file — weekly ROAS is comparable, weekly spend is not. Batch angles joined from the Kelle 8-layer blueprint; batches newer than the blueprint (e.g. B#2.9, B#90 family) show no angle label. Generated from ${t.totalSpendRows.toLocaleString()} spending ad-rows.
  </footer>
</div></div>

<script>
const D=JSON.parse(document.getElementById('data').textContent);
const R=D.rows.map(r=>({...r,w1roas:r.w1.roas,w2roas:r.w2.roas,w1s:r.w1.spend,w2s:r.w2.spend}));
const tb=document.getElementById('tb'); let fmt='all',sortK='spend',sortDir=-1;
const m0=x=>'$'+Math.round(x).toLocaleString();
const roasCol=v=>v>=1.31?'var(--good)':v>=1?'var(--watch)':'var(--bad)';
function vnum(v,suf='',dp=1){return (v||v===0)?v.toFixed(dp)+suf:'—';}
function render(){
  const q=document.getElementById('q').value.toLowerCase();
  const ms=parseFloat(document.getElementById('minspend').value)||0;
  let rows=R.filter(r=>(fmt==='all'||r.fmt===fmt)&&r.spend>=ms&&((r.id+' '+r.angle).toLowerCase().includes(q)));
  rows.sort((a,b)=>{let x=a[sortK],y=b[sortK];if(typeof x==='string'){x=x||'';y=y||'';return sortDir*x.localeCompare(y);}return sortDir*((x||0)-(y||0));});
  document.getElementById('count').textContent=rows.length+' batches · '+m0(rows.reduce((s,r)=>s+r.spend,0))+' spend';
  tb.innerHTML=rows.map(r=>{
    const vid=r.fmt==='video';
    const wtrend=(r.w1s>50&&r.w2s>50)?(r.w2roas>=r.w1roas?'<span class="trend-up">▲</span>':'<span class="trend-dn">▼</span>'):(r.w2s>r.w1s?'<span class="mini">new</span>':'');
    return '<tr>'+
    '<td class="l num" style="font-weight:700">'+r.id+'</td>'+
    '<td class="l angle" title="'+r.angle.replace(/"/g,'&quot;')+'">'+(r.angle||'<span class=mini>—</span>')+'</td>'+
    '<td class="mini">'+(vid?'▶':'▦')+'</td>'+
    '<td class="num">'+m0(r.spend)+'</td>'+
    '<td class="num" style="font-weight:700;color:'+roasCol(r.roas)+'">'+r.roas.toFixed(2)+'</td>'+
    '<td class="num">$'+Math.round(r.cpa)+'</td>'+
    '<td class="num">'+Math.round(r.purch)+'</td>'+
    '<td class="num">'+(vid?vnum(r.hook,'%',0):'—')+'</td>'+
    '<td class="num">'+(vid?vnum(r.hold,'%',0):'—')+'</td>'+
    '<td class="num">'+vnum(r.ctr,'%',2)+'</td>'+
    '<td class="num">$'+ (r.cpc?r.cpc.toFixed(2):'—') +'</td>'+
    '<td class="num" style="color:'+(r.cvr>=3?'var(--good)':r.cvr>=2?'var(--watch)':'var(--bad)')+'">'+vnum(r.cvr,'%',1)+'</td>'+
    '<td class="num">'+(vid?vnum(r.r50,'',0):'—')+'</td>'+
    '<td class="num">'+(vid?vnum(r.r100,'',0):'—')+'</td>'+
    '<td class="num">'+(r.w1s>0?r.w1roas.toFixed(2):'—')+'</td>'+
    '<td class="num">'+(r.w2s>0?r.w2roas.toFixed(2)+' '+wtrend:'—')+'</td>'+
    '</tr>';
  }).join('');
}
document.querySelectorAll('thead th').forEach(th=>th.onclick=()=>{const k=th.dataset.k;if(sortK===k)sortDir*=-1;else{sortK=k;sortDir=(k==='id'||k==='angle')?1:-1;}render();});
document.querySelectorAll('[data-fmt]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-fmt]').forEach(x=>x.classList.remove('on'));b.classList.add('on');fmt=b.dataset.fmt;render();});
document.getElementById('q').oninput=render; document.getElementById('minspend').oninput=render;
render();
</script>`;

const doc = `<title>Kelle Ads — 3-Week Performance Teardown</title>\n<style>${css}</style>\n<script type="application/json" id="data">${DATA}</script>\n${html}`;
const OUT = path.join(__dirname, '..', 'output', 'kelle csv files', 'kelle_perf_report.html');
fs.writeFileSync(OUT, doc);
console.log('wrote', OUT, '(' + (doc.length / 1024).toFixed(0) + ' KB)');
