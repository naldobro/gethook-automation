'use strict';
/**
 * Per-brand blueprint config — Kelle Skin (the reference implementation).
 *
 * To blueprint a NEW brand, copy this file to
 * scripts/blueprint_entries.<brand-slug>.js (slug = the brand's name
 * lowercased with non-alphanumerics -> "-", e.g. "Primal Viking" ->
 * "primal-viking"), then supply that brand's own titleToId / dupTitles /
 * entries. The builder (build_blueprint.js) loads this by slug from --brand.
 *
 * Exports:
 *   brandName  – used only for reference/docs (the builder resolves brand_id
 *                from the --brand argument against Supabase).
 *   dupTitles  – titles of byte-identical duplicate rows to exclude.
 *   titleToId  – (title) => stable short id, or null to skip the row.
 *   sortKey    – (title) => number|string used to order scripts (optional).
 *   entries    – the anchors/labels array (see build_blueprint.js for shape).
 */
const entries = require('./blueprint_entries.js');

const dupTitles = [
  'Copy of Batch#14_What Would Happen',
  'Kopija datoteke Batch#101_AI Animation (Chin Face)',
  'Copy of Cyperus Rotundus_#12.2_Animation_Cyperus Rotundus Focus',
  'Copy of Cyperus Rotundus_#12_Animation',
  'Copy of Cyperus Rotundus_#10_Nut Grass',
];

function titleToId(t) {
  if (t === 'Batch#14_Women_s Day_BOF') return 'B#14-WD';
  if (t === '15-sec VSL') return '15sec-VSL';
  if (t === 'VSL- Brightener (Upsell)') return 'VSL-Brightener';
  if (t === 'Untitled document') return 'Untitled-doc';
  if (t === 'Makeupangle') return 'Makeupangle';
  let m = t.match(/^Batch#([\d.]+)/i); if (m) return 'B#' + m[1];
  m = t.match(/^Cyperus Rotundus_#([\d.]+)/i); if (m) return 'CR#' + m[1];
  return null; // unrecognised title -> skip
}

const sortKey = (t) => {
  const m = (t || '').match(/(?:batch#?|cyperus rotundus_#)\s*([\d.]+)/i);
  return m ? parseFloat(m[1]) : 9999;
};

module.exports = { brandName: 'Kelle Skin', dupTitles, titleToId, sortKey, entries };
