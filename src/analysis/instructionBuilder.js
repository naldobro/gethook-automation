'use strict';

/**
 * src/analysis/instructionBuilder.js
 *
 * Builds the full prompt sent to the LLM for a given analyzer: a common
 * dataset section (brand info, dataset metadata, every ad) shared by all
 * analyzers, followed by that analyzer's own instructions
 * (src/analysis/analyzers/). Named "instruction builder" rather than
 * "prompt builder" since this may grow beyond plain string assembly
 * later (e.g. per-analyzer output schemas) without a rename.
 *
 * Keeping dataset serialization here once — instead of duplicated per
 * analyzer file — is what lets a new analyzer be just its own
 * instructions text; see src/analysis/analyzers/.
 */

function formatAd(ad, index) {
  return [
    `### Ad ${index + 1} (mediaId: ${ad.mediaId})`,
    `- Title: ${ad.title ?? 'n/a'}`,
    `- Duration: ${ad.duration ?? 'n/a'}`,
    `- Saved: ${ad.savedDate ?? 'n/a'}`,
    `- Active period: ${ad.activePeriod ?? 'n/a'}`,
    `- Landing page: ${ad.landingPage ?? 'n/a'}`,
    `- Share URL: ${ad.shareUrl ?? 'n/a'}`,
    `- Transcript:`,
    '```',
    ad.transcript ?? '(no transcript)',
    '```',
  ].join('\n');
}

function buildDatasetSection(brand, ads, meta) {
  return [
    '## Brand',
    `Name: ${brand.name}`,
    '',
    '## Dataset',
    `Total ads: ${meta.totalAds}`,
    '',
    '## Ads',
    ...ads.map((ad, i) => formatAd(ad, i)),
  ].join('\n');
}

/**
 * Builds the full prompt for `analyzer` (see src/analysis/analyzers/) —
 * the shared dataset section followed by that analyzer's own
 * instructions.
 */
function buildAnalysisPrompt({ brand, ads, meta, analyzer }) {
  const dataset = buildDatasetSection(brand, ads, meta);
  return `${dataset}\n\n${analyzer.instructions}`;
}

module.exports = { buildAnalysisPrompt };
