'use strict';
/**
 * Resolve a blueprint script ID back to the real ad.
 * Mirrors build_blueprint.js's ordering (row id asc = scrape/impressions order)
 * so PV#N here == PV#N in the blueprint. Prints the ad's share URL + details.
 *
 * Usage:
 *   node scripts/blueprint_lookup.js --brand "Primal Viking" PV#42
 *   node scripts/blueprint_lookup.js --brand "Primal Viking" 42        # bare number ok
 *   node scripts/blueprint_lookup.js --brand "Primal Viking" --list    # first 15
 */
const path = require('path');
const { supabase } = require(path.join(__dirname, '..', 'src', 'supabase', 'client.js'));

const argv = process.argv.slice(2);
const getOpt = (n) => { const i = argv.findIndex((a) => a === n || a.startsWith(n + '=')); if (i < 0) return null; return argv[i].includes('=') ? argv[i].split('=').slice(1).join('=') : (argv[i + 1] || null); };
const brandArg = getOpt('--brand') || 'Primal Viking';
const wantList = argv.includes('--list');
const idArg = argv.find((a) => !a.startsWith('--') && a !== brandArg);

async function main() {
  const { data: brands } = await supabase.from('brands').select('id,name').ilike('name', `%${brandArg}%`);
  if (!brands || !brands.length) { console.error(`No brand matching "${brandArg}".`); process.exit(1); }
  const brand = brands[0];
  // load per-brand config for the idPrefix (defaults to no prefix)
  const slug = brand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  let cfg = {}; try { cfg = require(path.join(__dirname, `blueprint_entries.${slug}.js`)); } catch {}
  const prefix = cfg.idPrefix || '';

  const { data } = await supabase.from('ads').select('id,media_id,title,share_url,landing_page,active_period')
    .eq('brand_id', brand.id).order('id', { ascending: true });
  const rows = data.map((r, i) => ({ ...r, n: i + 1, id: prefix + (i + 1) }));

  if (wantList) {
    console.log(`${brand.name} — first 15 by priority (PV#1 = top impressions):`);
    rows.slice(0, 15).forEach((r) => console.log(`  ${r.id.padEnd(7)} ${(r.title || '(null)').slice(0, 50).padEnd(52)} ${r.active_period || ''}`));
    return;
  }
  if (!idArg) { console.error('Give an ID, e.g. PV#42  (or --list)'); process.exit(1); }
  const num = parseInt(String(idArg).replace(/\D/g, ''), 10);
  const r = rows.find((x) => x.n === num);
  if (!r) { console.error(`No ad #${num} for ${brand.name} (has ${rows.length}).`); process.exit(1); }
  console.log(`${prefix}${num}  ·  ${brand.name}`);
  console.log(`  title:   ${r.title || '(null)'}`);
  console.log(`  active:  ${r.active_period || ''}`);
  console.log(`  landing: ${r.landing_page || ''}`);
  console.log(`  URL:     ${r.share_url || '(none)'}`);
}
main().catch((e) => { console.error(e.message); process.exit(1); });
