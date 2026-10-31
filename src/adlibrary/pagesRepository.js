'use strict';

/**
 * src/adlibrary/pagesRepository.js
 *
 * Supabase reads/writes for the Meta Ad Library page finder. Completely
 * separate from the GetHook scraper's adsRepository — this only touches
 * the `brands` (read) and `pages` (read + insert) tables.
 *
 * A discovered page is stored under the REAL brand (never a new brand):
 * a whitelist/3rd-party page is just another row in `pages` with the
 * brand's brand_id. The main page is never re-inserted here.
 */

const { supabase } = require('../supabase/client');

/** Fuzzy-find brands by name (same flexible match the scraper/fix tools use). */
async function findBrands(name) {
  const { data, error } = await supabase.from('brands').select('id, name').ilike('name', `%${name}%`);
  if (error) throw new Error(`Failed to query brands: ${error.message}`);
  return data || [];
}

/**
 * Generic social / platform domains that are never a brand-owned lander.
 * Ads occasionally point at these (e.g. an Instagram profile link), but
 * pivoting Ad Library on them would surface every advertiser on the platform
 * — pure noise — so they're excluded from the domain pivot set.
 */
const GENERIC_DOMAINS = new Set([
  'instagram.com', 'facebook.com', 'fb.com', 'fb.me', 'm.me',
  'youtube.com', 'youtu.be', 'tiktok.com', 'twitter.com', 'x.com',
  'linkedin.com', 'pinterest.com', 'snapchat.com', 'threads.net',
  'linktr.ee', 't.me', 'wa.me', 'whatsapp.com', 'reddit.com',
]);

/** Normalize a landing_page value to a bare hostname (drops scheme/path/www). */
function toDomain(url) {
  if (!url) return null;
  let s = String(url).trim();
  if (!s || s.toLowerCase() === 'n/a') return null;
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  try {
    const host = new URL(s).hostname.replace(/^www\./i, '').toLowerCase();
    if (GENERIC_DOMAINS.has(host)) return null;
    return host;
  } catch {
    return null;
  }
}

/** Distinct landing-page domains this brand's existing ads point to. */
async function getBrandLanderDomains(brandId) {
  const { data, error } = await supabase.from('ads').select('landing_page').eq('brand_id', brandId);
  if (error) throw new Error(`Failed to query ads: ${error.message}`);
  const domains = new Set();
  for (const ad of data || []) {
    const d = toDomain(ad.landing_page);
    if (d) domains.add(d);
  }
  return [...domains];
}

/** Lowercased set of page names already stored for this brand (any type). */
async function getExistingPageNames(brandId) {
  const { data, error } = await supabase.from('pages').select('name').eq('brand_id', brandId);
  if (error) throw new Error(`Failed to query pages: ${error.message}`);
  return new Set((data || []).map((p) => p.name.toLowerCase()));
}

/** A brand's discovered pages (whitelist/secondary — i.e. not the main page). */
async function getDiscoveredPages(brandId) {
  const { data, error } = await supabase
    .from('pages')
    .select('id, name, type')
    .eq('brand_id', brandId)
    .neq('type', 'main')
    .order('type');
  if (error) throw new Error(`Failed to query pages: ${error.message}`);
  return data || [];
}

/** Insert one discovered page. Assumes the caller already deduped by name. */
async function insertPage(brandId, name, type, foundViaDomain) {
  const { error } = await supabase
    .from('pages')
    .insert({ brand_id: brandId, name, type, page_url: foundViaDomain ? `found-via:${foundViaDomain}` : null });
  if (error) throw new Error(`Failed to insert page "${name}": ${error.message}`);
}

/**
 * Find-or-create a page row by (brand_id, name) and return its id. Used by the
 * direct-URL page scrape (user pastes a GetHook page link rather than relying on
 * Ad Library discovery): records the real page_url + type, and if the row
 * already exists, backfills a missing page_url/type rather than duplicating it
 * (the table's unique (brand_id, name) would reject a second insert anyway).
 */
async function ensurePage(brandId, name, { type = 'whitelist', pageUrl = null } = {}) {
  const { data: existing, error: selErr } = await supabase
    .from('pages')
    .select('id, page_url, type')
    .eq('brand_id', brandId)
    .eq('name', name)
    .maybeSingle();
  if (selErr) throw new Error(`Failed to look up page "${name}": ${selErr.message}`);

  if (existing) {
    const patch = {};
    if (pageUrl && !existing.page_url) patch.page_url = pageUrl;
    if (type && existing.type === 'main' && type !== 'main') patch.type = type; // don't silently demote
    if (Object.keys(patch).length) {
      const { error: updErr } = await supabase.from('pages').update(patch).eq('id', existing.id);
      if (updErr) throw new Error(`Failed to update page "${name}": ${updErr.message}`);
    }
    return existing.id;
  }

  const { data: inserted, error: insErr } = await supabase
    .from('pages')
    .insert({ brand_id: brandId, name, type, page_url: pageUrl })
    .select('id')
    .single();
  if (insErr) throw new Error(`Failed to insert page "${name}": ${insErr.message}`);
  return inserted.id;
}

module.exports = {
  findBrands,
  getBrandLanderDomains,
  getExistingPageNames,
  getDiscoveredPages,
  insertPage,
  ensurePage,
  toDomain,
};
