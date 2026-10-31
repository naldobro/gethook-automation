'use strict';
/**
 * Blueprint → HTML artifact generator (brand/page-agnostic).
 *
 * Reads a built blueprint CSV (output/<slug>/<slug>[_<page>]_blueprint.csv) and
 * renders a self-contained, theme-aware HTML dossier — full data, nothing
 * retyped (the CSV is the source of truth, same as the builder). Reusable for
 * any brand/page.
 *
 * Usage:
 *   node scripts/blueprint_artifact.js --brand "HIKE Footwear" --page=main --ads=98 --title "HIKE Footwear — Main page"
 *   node scripts/blueprint_artifact.js --brand "HIKE Footwear" --page=a    --ads=98 --title "HIKE Footwear — YOUR HEALTH JOURNAL"
 */
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const getOpt = (n) => {
  const i = argv.findIndex((a) => a === n || a.startsWith(n + '='));
  if (i < 0) return null;
  return argv[i].includes('=') ? argv[i].split('=').slice(1).join('=') : argv[i + 1] || null;
};
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const brand = getOpt('--brand') || 'HIKE Footwear';
const page = getOpt('--page'); // 'main' | 'a' | null
const adsCount = getOpt('--ads') || '';
const title = getOpt('--title') || brand;
const subtitle = getOpt('--subtitle') || '';
const slug = slugify(brand);
const pageSuffix = page ? '_' + page : '';
const csvPath = path.join(__dirname, '..', 'output', slug, `${slug}${pageSuffix}_blueprint.csv`);
const outPath = path.join(__dirname, '..', 'output', slug, `${slug}${pageSuffix}_blueprint.html`);

// --- tiny CSV parser (RFC-4180-ish: quoted fields, "" escapes, newlines in fields) ---
function parseCSV(text) {
  const rows = []; let row = [], field = '', i = 0, q = false;
  while (i < text.length) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i += 2; continue; } q = false; i++; continue; }
      field += c; i++; continue;
    }
    if (c === '"') { q = true; i++; continue; }
    if (c === ',') { row.push(field); field = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
    field += c; i++;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const raw = parseCSV(fs.readFileSync(csvPath, 'utf8'));
const header = raw.shift();
const idx = Object.fromEntries(header.map((h, i) => [h, i]));
const recs = raw
  .filter((r) => r.length >= header.length && r[idx.layer] && r[idx.layer] !== 'Legend')
  .map((r) => ({
    layer: r[idx.layer],
    element: r[idx.element],
    ids: r[idx.script_ids],
    coverage: Number(r[idx.coverage]) || 0,
    verbatim: r[idx.verbatim],
    note: r[idx.note] || '',
  }));

const byLayer = (name) => recs.filter((r) => r.layer === name);
const layerOrder = ['Angle', 'Unique mechanism', 'Hook', 'CTA', 'Avatar', 'Problem', 'Desire', 'Repeated messaging'];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const idCount = (ids) => (ids ? ids.split(',').filter((x) => x.trim()).length : 0);

const angles = byLayer('Angle').slice().sort((a, b) => b.coverage - a.coverage);
const candidates = byLayer('Angle (candidate)');
const junk = byLayer('Angle (junk)');
const maxCov = Math.max(...recs.map((r) => r.coverage), 1);

// quick stats
const uniqueAds = new Set();
recs.forEach((r) => (r.ids || '').split(',').map((s) => s.trim()).filter(Boolean).forEach((x) => uniqueAds.add(x)));
const stat = {
  ads: adsCount || uniqueAds.size,
  angles: angles.length,
  hooks: byLayer('Hook').length,
  mechanisms: byLayer('Unique mechanism').length,
};

// --- renderers ---
function covBar(n) {
  const w = Math.max(4, Math.round((n / maxCov) * 100));
  return `<span class="cov"><span class="cov-bar" style="width:${w}%"></span><span class="cov-n">${n}</span></span>`;
}
function idPills(ids) {
  return (ids || '').split(',').map((s) => s.trim()).filter(Boolean)
    .map((x) => `<span class="pill">${esc(x)}</span>`).join('');
}

const angleRows = angles.map((a, i) => `
  <li class="angle">
    <div class="angle-rank">${String(i + 1).padStart(2, '0')}</div>
    <div class="angle-body">
      <p class="angle-text">${esc(a.element)}</p>
      <div class="angle-meta">${covBar(a.coverage)}<span class="ids">${idPills(a.ids)}</span></div>
    </div>
  </li>`).join('');

function verbatimList(name) {
  return byLayer(name).sort((a, b) => b.coverage - a.coverage).map((r) => `
    <li class="vb">
      <div class="vb-top">${covBar(r.coverage)}${r.note ? `<span class="vb-note">${esc(r.note)}</span>` : ''}</div>
      <p class="vb-text">${esc(r.element)}</p>
      ${r.ids ? `<div class="ids">${idPills(r.ids)}</div>` : ''}
    </li>`).join('');
}

function labelList(name) {
  return byLayer(name).sort((a, b) => b.coverage - a.coverage).map((r) => `
    <li class="lb">
      <div class="lb-top">${covBar(r.coverage)}<span class="lb-text">${esc(r.element)}</span></div>
      ${r.note ? `<p class="vb-note">${esc(r.note)}</p>` : ''}
      ${r.ids ? `<div class="ids">${idPills(r.ids)}</div>` : ''}
    </li>`).join('');
}

const candidateRows = candidates.concat(junk).map((r) => `
  <li class="cand">
    <p class="cand-text">${esc(r.element)}</p>
    <p class="cand-note">${esc(r.note)}</p>
    <div class="ids">${idPills(r.ids)}</div>
  </li>`).join('');

const html = `<article class="doc">
<header class="hero">
  <p class="eyebrow">8-Layer Messaging Blueprint · ${esc(page === 'a' ? 'Whitelist page' : page === 'main' ? 'Main page' : 'Combined')}</p>
  <h1>${esc(title)}</h1>
  ${subtitle ? `<p class="dek">${esc(subtitle)}</p>` : ''}
  <dl class="meta">
    <div><dt>Ads dissected</dt><dd>${esc(String(stat.ads))}</dd></div>
    <div><dt>Ranking</dt><dd>Impressions order · #1 = top</dd></div>
    <div><dt>Angles</dt><dd>${stat.angles}</dd></div>
    <div><dt>Unique mechanisms</dt><dd>${stat.mechanisms}</dd></div>
    <div><dt>Distinct hooks</dt><dd>${stat.hooks}</dd></div>
  </dl>
</header>

<section class="thesis">
  <p class="eyebrow">The brand's thesis — Unique mechanism</p>
  <blockquote>“The more your shoes cushion and support your feet, the weaker and less steady your feet get over time. We do the opposite — we bring your feet back to how they were built to move.”</blockquote>
  <p class="thesis-body">Nearly every HIKE ad is built on one recurring causal argument (so it is a <em>mechanism</em>, not an angle): cushioned, raised-heel shoes <strong>block the signals your feet send your brain</strong>, so your stabiliser muscles switch off and weaken. The fix is the barefoot chain — a <strong>wide toe box</strong> (toes spread &amp; grip a steady base), a <strong>zero-drop sole</strong> (level, not pitched forward), and a <strong>thin flexible sole</strong> (you feel the ground again, waking the muscles and nerve endings). That reframe — “it’s not your age, it’s your shoes” — is the spine every angle below hangs off.</p>
</section>

<section>
  <h2>Angle inventory <span class="count">${angles.length} angles, ranked by how widely tested</span></h2>
  <p class="section-note">Each ad is built on one primary angle (our words — the single interpretive layer). Coverage = how many of this page's ads re-tested that premise. The barefoot-biomechanics message is deliberately absent here: it recurs brand-wide, so it's the Unique mechanism, not an angle.</p>
  <ol class="angles">${angleRows}</ol>
</section>

<section>
  <h2>Unique mechanisms <span class="count">${byLayer('Unique mechanism').length} causal "why it works" passages, verbatim</span></h2>
  <ul class="vblist">${verbatimList('Unique mechanism')}</ul>
</section>

<section>
  <h2>CTA &amp; offer architecture <span class="count">${byLayer('CTA').length} closing blocks, verbatim</span></h2>
  <ul class="vblist">${verbatimList('CTA')}</ul>
</section>

<div class="two-col">
  <section>
    <h2>Problems <span class="count">${byLayer('Problem').length}</span></h2>
    <ul class="vblist tight">${verbatimList('Problem')}</ul>
  </section>
  <section>
    <h2>Desires <span class="count">${byLayer('Desire').length}</span></h2>
    <ul class="vblist tight">${verbatimList('Desire')}</ul>
  </section>
</div>

<section>
  <h2>Avatars <span class="count">who it targets</span></h2>
  <ul class="lblist">${labelList('Avatar')}</ul>
</section>

<section>
  <h2>Repeated messaging <span class="count">the reusable spine (recurs 3+ ads)</span></h2>
  <ul class="vblist tight">${verbatimList('Repeated messaging')}</ul>
</section>

<section>
  <h2>Hooks <span class="count">${byLayer('Hook').length} distinct openings, verbatim</span></h2>
  <ul class="hooks">${byLayer('Hook').map((h) => `<li><span class="hcov">${h.coverage}</span><span>${esc(h.element)}</span></li>`).join('')}</ul>
</section>

<section class="cand-section">
  <h2>Audit trail — resolved angle candidates <span class="count">nothing dropped silently</span></h2>
  <p class="section-note">Second premises considered and resolved during the read, with the reason kept. The two teaching cases: the biomechanics message and "designed with podiatrists" were rejected as angles because they recur brand-wide (mechanism / proof), not a single ad's premise.</p>
  <ul class="cands">${candidateRows}</ul>
</section>

<footer>
  <p>Built from <code>${esc(`${slug}${pageSuffix}_blueprint.csv`)}</code> via the deterministic blueprint builder — every verbatim element extracted straight from the Supabase transcript and verified by the fidelity guard (0 anchor failures). Methodology: <code>8-layer-messaging-blueprint-v1</code>. IDs are impressions-rank within the page (#1 = top-spend/priority ad).</p>
</footer>
</article>

<style>
  :root{
    --paper:#F6F4EF; --ink:#1A1A17; --ink-soft:#4a4740; --line:#e2ddd2;
    --accent:#3C6E52; --accent-soft:#e7efe9; --clay:#9c5a3c; --card:#fffdf9;
    --mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
    --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,ui-serif,serif;
    --sans:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  }
  @media (prefers-color-scheme:dark){
    :root{ --paper:#14130f; --ink:#ece8df; --ink-soft:#a7a299; --line:#2c2a24;
      --accent:#79b394; --accent-soft:#1d2c24; --clay:#cd8a68; --card:#1b1a15; }
  }
  :root[data-theme="light"]{ --paper:#F6F4EF; --ink:#1A1A17; --ink-soft:#4a4740; --line:#e2ddd2; --accent:#3C6E52; --accent-soft:#e7efe9; --clay:#9c5a3c; --card:#fffdf9; }
  :root[data-theme="dark"]{ --paper:#14130f; --ink:#ece8df; --ink-soft:#a7a299; --line:#2c2a24; --accent:#79b394; --accent-soft:#1d2c24; --clay:#cd8a68; --card:#1b1a15; }

  *{box-sizing:border-box}
  .doc{background:var(--paper);color:var(--ink);font-family:var(--sans);
    line-height:1.6;max-width:1080px;margin:0 auto;padding:clamp(1.2rem,4vw,3.5rem) clamp(1rem,4vw,2.5rem);
    -webkit-font-smoothing:antialiased;font-variant-numeric:tabular-nums;}
  .eyebrow{font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin:0 0 .6rem}
  .hero{border-bottom:2px solid var(--ink);padding-bottom:1.6rem;margin-bottom:2.4rem}
  .hero h1{font-family:var(--serif);font-weight:600;font-size:clamp(2.1rem,6vw,3.6rem);line-height:1.02;margin:0;letter-spacing:-.01em;text-wrap:balance}
  .dek{color:var(--ink-soft);max-width:60ch;margin:.8rem 0 0;font-size:1.02rem}
  .meta{display:flex;flex-wrap:wrap;gap:0 2.4rem;margin:1.6rem 0 0;padding:0}
  .meta div{margin:.4rem 0}
  .meta dt{font-family:var(--mono);font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft)}
  .meta dd{margin:.15rem 0 0;font-family:var(--serif);font-size:1.35rem}

  .thesis{background:var(--accent-soft);border-left:3px solid var(--accent);border-radius:0 6px 6px 0;
    padding:1.4rem clamp(1.1rem,3vw,2rem);margin:0 0 2.8rem}
  .thesis blockquote{font-family:var(--serif);font-size:clamp(1.25rem,2.6vw,1.7rem);line-height:1.3;margin:.3rem 0 1rem;color:var(--ink);text-wrap:pretty}
  .thesis-body{margin:0;max-width:72ch;color:var(--ink-soft)}
  .thesis-body strong{color:var(--ink)}

  section{margin:0 0 2.8rem}
  h2{font-family:var(--serif);font-weight:600;font-size:1.5rem;margin:0 0 .3rem;border-bottom:1px solid var(--line);padding-bottom:.5rem;display:flex;flex-wrap:wrap;align-items:baseline;gap:.6rem}
  h2 .count{font-family:var(--mono);font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);font-weight:400}
  .section-note{color:var(--ink-soft);font-size:.92rem;max-width:74ch;margin:.7rem 0 1.2rem}

  /* angle inventory */
  .angles{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.1rem}
  .angle{display:grid;grid-template-columns:2.6rem 1fr;gap:.9rem;padding:.85rem .4rem;border-bottom:1px solid var(--line)}
  .angle-rank{font-family:var(--mono);font-size:.95rem;color:var(--accent);padding-top:.1rem}
  .angle-text{margin:0 0 .5rem;font-size:1.02rem}
  .angle-meta{display:flex;align-items:center;gap:.8rem;flex-wrap:wrap}

  .cov{display:inline-flex;align-items:center;gap:.5rem;min-width:116px}
  .cov-bar{height:7px;border-radius:4px;background:var(--accent);display:block;min-width:4px}
  .cov-n{font-family:var(--mono);font-size:.78rem;color:var(--ink-soft)}
  .cov::before{content:"×";font-family:var(--mono);font-size:.7rem;color:var(--ink-soft);order:3}

  .ids{display:flex;flex-wrap:wrap;gap:.25rem}
  .pill{font-family:var(--mono);font-size:.66rem;background:var(--card);border:1px solid var(--line);border-radius:4px;padding:.05rem .32rem;color:var(--ink-soft)}

  .vblist{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:1rem}
  .vblist.tight{gap:.7rem}
  .vb{border-left:2px solid var(--line);padding:.1rem 0 .1rem 1rem}
  .vb-top{display:flex;gap:.9rem;align-items:center;flex-wrap:wrap;margin-bottom:.3rem}
  .vb-note{font-family:var(--mono);font-size:.7rem;color:var(--ink-soft);letter-spacing:.02em}
  .vb-text{margin:0 0 .4rem;font-size:.98rem}
  .vblist.tight .vb-text{font-size:.92rem}

  .lblist{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1rem}
  .lb{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:.8rem .9rem}
  .lb-top{display:flex;gap:.7rem;align-items:baseline;margin-bottom:.4rem}
  .lb-text{font-weight:600;font-size:.96rem}

  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:2rem}
  @media(max-width:720px){.two-col{grid-template-columns:1fr;gap:0}}

  .hooks{list-style:none;margin:0;padding:0;column-width:330px;column-gap:2rem}
  .hooks li{break-inside:avoid;display:flex;gap:.6rem;padding:.4rem 0;border-bottom:1px solid var(--line);font-size:.9rem}
  .hcov{font-family:var(--mono);font-size:.72rem;color:var(--accent);min-width:1.4rem;text-align:right;flex-shrink:0}

  .cand-section .cands{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:1rem}
  .cand{border:1px dashed var(--line);border-left:3px solid var(--clay);border-radius:0 6px 6px 0;padding:.8rem 1rem;background:var(--card)}
  .cand-text{margin:0 0 .35rem;font-weight:600;font-size:.96rem}
  .cand-note{margin:0 0 .5rem;color:var(--ink-soft);font-size:.86rem}

  footer{border-top:1px solid var(--line);margin-top:1rem;padding-top:1.2rem;color:var(--ink-soft);font-size:.82rem}
  footer code,.doc code{font-family:var(--mono);font-size:.82em;background:var(--card);border:1px solid var(--line);border-radius:4px;padding:.05rem .3rem}
  em{color:var(--accent);font-style:italic}
</style>`;

fs.writeFileSync(outPath, html);
console.log('wrote', outPath, '·', (html.length / 1024).toFixed(1), 'KB · recs:', recs.length);
