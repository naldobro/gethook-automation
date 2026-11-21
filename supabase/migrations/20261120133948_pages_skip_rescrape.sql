-- Pages the rescrape can't reach: scraped earlier via GetHook name search,
-- which no longer opens pages after GetHook's Oct-2026 rework, and no GetHook
-- link was ever saved. Marked so the rescrape skips them until a link is added
-- (set page_url / brands.url, then clear skip_rescrape).
alter table public.pages add column if not exists skip_rescrape boolean not null default false;
alter table public.pages add column if not exists skip_reason text;

update public.pages p
set skip_rescrape = true,
    skip_reason = 'No GetHook link saved (originally reached via search, which no longer opens pages). Add the link to rescrape.'
where p.letter is not null
  and (
    (p.type = 'main' and not exists (
      select 1 from public.brands b where b.id = p.brand_id and b.url like 'https://app.gethookd.ai/%'))
    or
    (p.type <> 'main' and coalesce(p.page_url, '') not like 'https://app.gethookd.ai/%')
  );
