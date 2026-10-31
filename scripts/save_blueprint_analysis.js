'use strict';
/**
 * Save a messaging-blueprint run to brand_analyses (full HTML + artifact URL).
 * Usage:
 *   node scripts/save_blueprint_analysis.js --brand "HIKE Footwear" --scope main \
 *     --html output/hike-footwear/hike-footwear_main_blueprint.html \
 *     --url https://claude.ai/code/artifact/xxxx
 */
const fs = require('fs');
const path = require('path');
const { supabase } = require(path.join(__dirname, '..', 'src', 'supabase', 'client.js'));

const argv = process.argv.slice(2);
const getOpt = (n) => { const i = argv.findIndex((a) => a === n || a.startsWith(n + '=')); if (i < 0) return null; return argv[i].includes('=') ? argv[i].split('=').slice(1).join('=') : argv[i + 1] || null; };

(async () => {
  const brandName = getOpt('--brand');
  const scope = getOpt('--scope') || 'full';
  const htmlPath = getOpt('--html');
  const url = getOpt('--url');
  const model = getOpt('--model') || 'claude-opus-4-8';
  const { data: brands, error: be } = await supabase.from('brands').select('id,name').ilike('name', `%${brandName}%`);
  if (be) throw new Error(be.message);
  if (!brands.length) throw new Error(`no brand matching ${brandName}`);
  const brand = brands[0];
  const markdown = fs.readFileSync(path.join(__dirname, '..', htmlPath), 'utf8');
  const row = {
    brand_id: brand.id,
    analysis_type: `messaging_blueprint:${scope}`,
    prompt_version: '8-layer-messaging-blueprint-v1',
    model,
    markdown,
    url,
  };
  const { data, error } = await supabase.from('brand_analyses').insert(row).select('id').single();
  if (error) throw new Error(error.message);
  console.log(`saved brand_analyses id=${data.id} · brand ${brand.name} (id=${brand.id}) · scope=${scope} · ${(markdown.length / 1024).toFixed(1)}KB html · url=${url}`);
})().then(() => process.exit(0)).catch((e) => { console.error('ERR:', e.message); process.exit(1); });
