'use strict';

/**
 * src/analysis/adRepository.js
 *
 * Repository Layer for the Brand Analysis Engine: loads a brand and every
 * ad collected for it from Supabase, sorted consistently, as a clean
 * dataset ready for prompt building. Read-only and analysis-facing —
 * distinct from src/supabase/adsRepository.js, which is the scraper's
 * write side (upsertBrand/upsertAd).
 */

const { supabase } = require('../supabase/client');

async function getBrandByName(brandName) {
  const { data, error } = await supabase
    .from('brands')
    .select('id, name, created_at')
    .eq('name', brandName)
    .single();

  if (error || !data) {
    throw new Error(`Brand "${brandName}" not found in Supabase. Has it been scraped yet?`);
  }

  return { id: data.id, name: data.name, createdAt: data.created_at };
}

/**
 * Resolves the timestamp used to sort an ad: the parsed saved_date when
 * it's a real, parseable date (the UI's own scraped value, e.g.
 * "Feb 5, 2026"), falling back to created_at — always present, always a
 * real timestamp — when saved_date is missing or unparseable.
 */
function resolveSortTimestamp(row) {
  const parsed = row.saved_date ? Date.parse(row.saved_date) : NaN;
  if (!Number.isNaN(parsed)) return parsed;
  return new Date(row.created_at).getTime();
}

function toAd(row) {
  return {
    mediaId: row.media_id,
    title: row.title,
    duration: row.duration,
    savedDate: row.saved_date,
    activePeriod: row.active_period,
    landingPage: row.landing_page,
    transcript: row.transcript,
    shareUrl: row.share_url,
    createdAt: row.created_at,
  };
}

/**
 * Loads every ad belonging to `brandId`, sorted chronologically by
 * saved_date where parseable, falling back to created_at otherwise.
 */
async function getAdsForBrand(brandId) {
  const { data, error } = await supabase
    .from('ads')
    .select(
      'media_id, title, duration, saved_date, active_period, landing_page, transcript, share_url, created_at'
    )
    .eq('brand_id', brandId);

  if (error) {
    throw new Error(`Failed to load ads for brand_id=${brandId}: ${error.message}`);
  }

  return data
    .slice()
    .sort((a, b) => resolveSortTimestamp(a) - resolveSortTimestamp(b))
    .map(toAd);
}

module.exports = { getBrandByName, getAdsForBrand };
