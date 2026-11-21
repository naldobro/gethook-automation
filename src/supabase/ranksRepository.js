'use strict';

/**
 * src/supabase/ranksRepository.js
 *
 * Rank history (migration 20261120130000). Every scrape run of one page
 * records the order GetHook listed its ads in (impressions order), so an ad's
 * rank label (#1, #3a …) can change between scrapes while its history and its
 * permanent id (ads.ad_code, e.g. HK-0042) stay intact.
 *
 * Used by both the normal scraper (collect.js) and the page scraper
 * (scrapePages.js). This only RECORDS list positions — it never decides what
 * is "winning"; that stays in the analysis body.
 */

const { supabase } = require('./client');

async function startRun({ brandId, pageId, source, listUrl = null, depth = null }) {
  const { data, error } = await supabase
    .from('scrape_runs')
    .insert({ brand_id: brandId, page_id: pageId, source, list_url: listUrl, depth })
    .select('id')
    .single();
  if (error) throw new Error(`Failed to start scrape run: ${error.message}`);
  return data.id;
}

async function pageLetter(pageId) {
  const { data, error } = await supabase.rpc('ensure_page_letter', { pid: pageId });
  if (error) throw new Error(`Failed to resolve page letter: ${error.message}`);
  return data ?? '';
}

/**
 * Records one run's ranking. `orderedMediaIds` is every ad in the order the
 * list showed it (rank = index + 1), including ads skipped because they were
 * already stored. Ads not in the DB (e.g. failed transcription) keep their
 * slot in the numbering but get no snapshot — rank mirrors GetHook's list.
 *
 * `reachedEnd` = the run saw the whole list; only then are this page's ads
 * that didn't appear marked 'dropped' (a partial run proves nothing).
 */
async function recordRun(runId, { brandId, pageId, orderedMediaIds, reachedEnd }) {
  const letter = await pageLetter(pageId);
  const now = new Date().toISOString();

  // Look up DB ids for the listed media ids (chunked to keep URLs short).
  const byMedia = new Map();
  for (let i = 0; i < orderedMediaIds.length; i += 200) {
    const chunk = orderedMediaIds.slice(i, i + 200);
    const { data, error } = await supabase
      .from('ads')
      .select('id, media_id, page_id')
      .eq('brand_id', brandId)
      .in('media_id', chunk);
    if (error) throw new Error(`Failed to look up ads for ranking: ${error.message}`);
    for (const r of data) byMedia.set(r.media_id, r);
  }

  const snapshots = [];
  const ownAds = []; // ads that live on this page -> their current rank moves
  orderedMediaIds.forEach((mediaId, idx) => {
    const ad = byMedia.get(mediaId);
    if (!ad) return;
    const rank = idx + 1;
    const label = `#${rank}${letter}`;
    snapshots.push({ run_id: runId, ad_id: ad.id, page_id: pageId, rank, label, captured_at: now });
    if (ad.page_id === pageId) ownAds.push({ id: ad.id, rank, label });
  });

  for (let i = 0; i < snapshots.length; i += 500) {
    const { error } = await supabase
      .from('ad_rank_snapshots')
      .upsert(snapshots.slice(i, i + 500), { onConflict: 'run_id,ad_id' });
    if (error) throw new Error(`Failed to save rank snapshots: ${error.message}`);
  }

  for (const a of ownAds) {
    const { error } = await supabase
      .from('ads')
      .update({ current_rank: a.rank, current_label: a.label, rank_updated_at: now, last_seen_at: now, status: 'active' })
      .eq('id', a.id);
    if (error) throw new Error(`Failed to update current rank for ad ${a.id}: ${error.message}`);
  }

  let dropped = 0;
  if (reachedEnd) {
    const seen = new Set(ownAds.map((a) => a.id));
    const { data, error } = await supabase.from('ads').select('id').eq('page_id', pageId).eq('status', 'active');
    if (error) throw new Error(`Failed to load page ads: ${error.message}`);
    const gone = data.map((r) => r.id).filter((id) => !seen.has(id));
    for (let i = 0; i < gone.length; i += 200) {
      const { error: upErr } = await supabase.from('ads').update({ status: 'dropped' }).in('id', gone.slice(i, i + 200));
      if (upErr) throw new Error(`Failed to mark dropped ads: ${upErr.message}`);
    }
    dropped = gone.length;
  }

  const { error: finErr } = await supabase
    .from('scrape_runs')
    .update({ finished_at: now, reached_end: !!reachedEnd, ads_ranked: snapshots.length })
    .eq('id', runId);
  if (finErr) throw new Error(`Failed to finish scrape run: ${finErr.message}`);

  return { ranked: snapshots.length, listed: orderedMediaIds.length, dropped, letter };
}

module.exports = { startRun, recordRun };
