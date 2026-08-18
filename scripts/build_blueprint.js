'use strict';
/**
 * Kelle Skin messaging blueprint — deterministic builder.
 *
 * Source of truth = scripts/blueprint_entries.js (anchors + labels).
 * The builder pulls ALL brand-23 transcripts, and for every verbatim entry it
 * AUTO-COMPUTES coverage: it lists every script whose transcript literally
 * contains that block (curly-quote / whitespace tolerant). So each block is
 * defined once and "which scripts tested it" stays exhaustive + verified.
 *
 * Entry shape: {layer, start, end?, v, ids?, manual?, allMatch?, note?}
 *   v:true              verbatim → element is the exact transcript slice.
 *                       coverage auto-computed unless manual:true.
 *   v:true, manual:true use the given ids (for ~variant merges / concept rows
 *                       whose wording differs across ads). allMatch verifies
 *                       every id truly contains it.
 *   v:false             label text (angles / persona avatars); ids used as-is.
 *
 * Re-run:  node scripts/build_blueprint.js
 */
const fs = require('fs');
const path = require('path');
const { supabase } = require(path.join(__dirname, '..', 'src', 'supabase', 'client.js'));

// duplicate rows (byte-identical copies) — excluded from the blueprint
const DUPS = new Set([
  "Copy of Batch#14_What Would Happen",
  "Kopija datoteke Batch#101_AI Animation (Chin Face)",
  "Copy of Cyperus Rotundus_#12.2_Animation_Cyperus Rotundus Focus",
  "Copy of Cyperus Rotundus_#12_Animation",
  "Copy of Cyperus Rotundus_#10_Nut Grass",
]);

function titleToId(t){
  if(DUPS.has(t)) return null;
  if(t==="Batch#14_Women_s Day_BOF") return "B#14-WD";
  if(t==="15-sec VSL") return "15sec-VSL";
  if(t==="VSL- Brightener (Upsell)") return "VSL-Brightener";
  if(t==="Untitled document") return "Untitled-doc";
  if(t==="Makeupangle") return "Makeupangle";
  let m=t.match(/^Batch#([\d.]+)/i); if(m) return "B#"+m[1];
  m=t.match(/^Cyperus Rotundus_#([\d.]+)/i); if(m) return "CR#"+m[1];
  return null;
}
const parseNum = t => { const m=(t||'').match(/(?:batch#?|cyperus rotundus_#)\s*([\d.]+)/i); return m?parseFloat(m[1]):9999; };

// tolerant regex from a typed anchor (curly quotes / whitespace / ellipsis)
function tol(s){
  s = s.replace(/\.\.\./g,'…');
  let out='';
  for(const c of s){
    if(/\s/.test(c)) out+='\\s+';
    else if(c==="'"||c==='’'||c==='‘') out+="['’‘]";
    else if(c==='"'||c==='“'||c==='”') out+='["“”]';
    else if(c==='…') out+='(?:\\.\\.\\.|…)';
    else if('\\^$.|?*+()[]{}'.includes(c)) out+='\\'+c;
    else out+=c;
  }
  return out.replace(/(\\s\+)+/g,'\\s+');
}

const E = require(path.join(__dirname, 'blueprint_entries.js'));

async function main(){
  const { data, error } = await supabase.from('ads').select('title,transcript').eq('brand_id',23);
  if(error){ console.error(error); process.exit(1); }
  const arr = data.map(r=>({id:titleToId(r.title), title:r.title, tx:r.transcript||''}))
                  .filter(r=>r.id)
                  .sort((a,b)=> parseNum(a.title)-parseNum(b.title) || a.title.localeCompare(b.title));
  const order = arr.map(r=>r.id);
  const tx = Object.fromEntries(arr.map(r=>[r.id, r.tx]));

  const rows=[]; const fails=[];
  for(const e of E){
    let element, ids;
    if(!e.v){ element=e.start; ids=e.ids||[]; }
    else {
      const pat = e.end ? tol(e.start)+'[\\s\\S]*?'+tol(e.end) : tol(e.start);
      let re; try{ re=new RegExp(pat);}catch(err){ fails.push([e.layer,'BAD REGEX',e.start]); continue; }
      if(e.manual){
        const list = e.ids||[]; const missing = list.filter(id=>!(tx[id]&&re.test(tx[id])));
        const rep = list.find(id=>tx[id]&&re.test(tx[id]));
        if(!rep){ fails.push([e.layer,(e.ids||[]).join(','),'NOT FOUND',String(e.start).slice(0,55)]); continue; }
        if(e.allMatch && missing.length){ fails.push([e.layer,list.join(','),'allMatch miss: '+missing.join(','),String(e.start).slice(0,45)]); continue; }
        ids = list; element = tx[rep].match(re)[0].replace(/\s+/g,' ').trim();
      } else {
        const hits = order.filter(id=>re.test(tx[id]));
        if(!hits.length){ fails.push([e.layer,'-','NOT FOUND',String(e.start).slice(0,55)]); continue; }
        ids = hits; element = tx[hits[0]].match(re)[0].replace(/\s+/g,' ').trim();
      }
    }
    rows.push({layer:e.layer, element, ids:ids.join(', '), note:e.note||'', v:e.v, n:ids.length});
  }

  // dedupe: identical (layer, element) rows collapse to one (auto-coverage can
  // produce the same block from two anchors). Merge notes.
  const seen=new Map(); const deduped=[];
  for(const r of rows){
    const key=r.layer+'|'+r.element;
    if(seen.has(key)){ const prev=seen.get(key); if(r.note && !prev.note.includes(r.note)) prev.note=[prev.note,r.note].filter(Boolean).join(' / '); continue; }
    seen.set(key,r); deduped.push(r);
  }
  rows.length=0; rows.push(...deduped);

  const esc=v=>'"'+String(v).replace(/"/g,'""')+'"';
  let csv=['layer','element','script_ids','coverage','status','verbatim','note'].map(esc).join(',')+'\n';
  for(const r of rows) csv+=[r.layer,r.element,r.ids,r.n,'tested',r.v?'yes':'label',r.note].map(esc).join(',')+'\n';
  fs.writeFileSync(path.join(__dirname,'..','output','kelle_blueprint.csv'), csv);

  const counts={}; for(const r of rows) counts[r.layer]=(counts[r.layer]||0)+1;
  console.log('scripts loaded (unique, dups excluded):', order.length);
  console.log('rows:', rows.length, '| verbatim:', rows.filter(r=>r.v).length, '| FAILURES:', fails.length);
  for(const f of fails) console.log('  ✗', f.join(' | '));
  console.log('by layer:', counts);
  console.log('wrote output/kelle_blueprint.csv');
  if(fails.length) process.exit(2);
}
main();
