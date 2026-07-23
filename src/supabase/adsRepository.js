'use strict';

/**
 * src/supabase/adsRepository.js
 *
 * Persists collected ads to Supabase (schema: supabase/migrations/), as a
 * side channel alongside the existing JSON export — it does not replace
 * or affect it. Uses the service_role client from src/supabase/client.js.
 *
 * Two upserts, matching the schema's unique constraints:
 *   - brands.name is unique, so upsertBrand is idempotent and safe to
 *     call once per brand per run rather than once per ad.
 *   - ads.media_id is unique, so upsertAd is how re-scraping the same ad
 *     later updates its row instead of creating a duplicate.
 */

const { supabase } = require('./client');

/**
 * Resolves a brand's id, inserting the brand row if it doesn't exist yet.
 * Intended to be called once per collection run (brand name is constant
 * across all ads in that run), not once per ad.
 */
async function upsertBrand(brandName, brandUrl = null) {
  const row = { name: brandName };
  if (brandUrl) row.url = brandUrl;
  const { data, error } = await supabase
    .from('brands')
    .upsert(row, { onConflict: 'name' })
    .select('id')
    .single();

  if (error) {
    throw new Error(`Failed to upsert brand "${brandName}": ${error.message}`);
  }

  return data.id;
}

async function getExistingMediaIds(brandId) {
  const { data, error } = await supabase
    .from('ads')
    .select('media_id')
    .eq('brand_id', brandId);

  if (error) {
    throw new Error(`Failed to fetch existing media IDs: ${error.message}`);
  }

  return data.map((row) => row.media_id);
}

async function upsertAd(ad, brandId) {
  const { error } = await supabase.from('ads').upsert(
    {
      media_id: ad.mediaId,
      brand_id: brandId,
      saved_date: ad.savedDate,
      active_period: ad.activePeriod,
      landing_page: ad.landingPage,
      title: ad.title,
      duration: ad.duration,
      transcript: ad.transcript,
      share_url: ad.shareUrl,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'media_id' }
  );

  if (error) {
    throw new Error(`Failed to upsert ad mediaId=${ad.mediaId}: ${error.message}`);
  }
}

module.exports = { upsertBrand, upsertAd, getExistingMediaIds };
