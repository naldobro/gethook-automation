const fs=require('fs');
function parseCSV(f){const lines=fs.readFileSync(f,'utf8').split('\n').slice(1).filter(Boolean);
  function p(l){const o=[];let c='',q=false;for(let i=0;i<l.length;i++){const ch=l[i];if(q){if(ch=='"'){if(l[i+1]=='"'){c+='"';i++;}else q=false;}else c+=ch;}else{if(ch=='"')q=true;else if(ch==','){o.push(c);c='';}else c+=ch;}}o.push(c);return o;}
  return lines.map(p).map(r=>({layer:r[0],element:r[1],ids:r[2],cov:+r[3]}));}
const K=parseCSV('./output/kelle-skin_blueprint.csv');
const P=parseCSV('./output/primal-viking_blueprint.csv');
const minPV=ids=>Math.min(...ids.split(',').map(x=>parseInt(x.replace(/\D/g,''))||999));
function dump(name,rows,layer,byPri){
  let r=rows.filter(x=>x.layer===layer);
  if(byPri) r=r.map(x=>({...x,pri:minPV(x.ids)})).sort((a,b)=>a.pri-b.pri);
  else r=r.sort((a,b)=>b.cov-a.cov);
  console.log(`\n### ${name} · ${layer} (${r.length} rows) ###`);
  r.forEach(x=>console.log((byPri?('PV#'+x.pri).padEnd(7):('x'+x.cov).padEnd(5))+' '+x.element.slice(0,86)));
}
console.log('======== PRIMAL VIKING — by impression priority (PV#1=top) ========');
dump('PV',P,'Angle',true);
dump('PV',P,'CTA',true);
dump('PV',P,'Avatar',true);
dump('PV',P,'Repeated messaging',true);
console.log('\n\n======== KELLE — by coverage (how widely used) ========');
dump('K',K,'Angle',false);
dump('K',K,'CTA',false);
dump('K',K,'Avatar',false);
dump('K',K,'Repeated messaging',false);
