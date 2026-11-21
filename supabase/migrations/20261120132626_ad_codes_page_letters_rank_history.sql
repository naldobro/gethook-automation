-- Ad numbering with history.
--
-- Two identifiers per ad:
--   * ads.ad_code  — PERMANENT id, never changes: <brand code>-<4-digit seq>
--                    in first-seen order (e.g. HK-0042). Use this to refer to
--                    an ad in blueprints/notes.
--   * rank label   — '#<rank><page letter>' (e.g. #1, #3a), the ad's GetHook
--                    impressions position WITHIN its page on a given scrape.
--                    Changes every rescrape; every scrape's ranks are kept in
--                    ad_rank_snapshots, the latest copied onto ads.current_*.
--
-- Page letters: main page = '' (number only), 3rd-party/whitelist/secondary
-- pages get a, b, c… in the order they first got ads (fixed forever).
--
-- Codes and letters are assigned by triggers, so every scraper (normal,
-- scrapePages) gets them without code changes.

-- ---------------------------------------------------------------- columns
alter table public.brands add column if not exists code text;
create unique index if not exists brands_code_key on public.brands (code);

alter table public.pages add column if not exists letter text;  -- '' = main, null = no ads yet
create unique index if not exists pages_brand_letter_key on public.pages (brand_id, letter);

alter table public.ads add column if not exists ad_seq int;
alter table public.ads add column if not exists ad_code text;
alter table public.ads add column if not exists current_rank int;
alter table public.ads add column if not exists current_label text;
alter table public.ads add column if not exists rank_updated_at timestamptz;
alter table public.ads add column if not exists last_seen_at timestamptz;
alter table public.ads add column if not exists status text not null default 'active'; -- active | dropped
create unique index if not exists ads_ad_code_key on public.ads (ad_code);
create unique index if not exists ads_brand_seq_key on public.ads (brand_id, ad_seq);

-- ---------------------------------------------------------------- history tables
create table if not exists public.scrape_runs (
  id bigint generated always as identity primary key,
  brand_id bigint not null references public.brands (id) on delete cascade,
  page_id bigint references public.pages (id) on delete cascade,
  source text not null,              -- backfill | scraper | scrapePages
  list_url text,
  depth int,                         -- how far down GetHook's list this run looked
  reached_end boolean not null default false, -- true = saw the whole list (ads not seen are really gone)
  ads_ranked int,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  notes text
);
create index if not exists scrape_runs_page_idx on public.scrape_runs (page_id, started_at desc);

create table if not exists public.ad_rank_snapshots (
  id bigint generated always as identity primary key,
  run_id bigint not null references public.scrape_runs (id) on delete cascade,
  ad_id bigint not null references public.ads (id) on delete cascade,
  page_id bigint references public.pages (id) on delete cascade,
  rank int not null,
  label text not null,
  captured_at timestamptz not null default now(),
  unique (run_id, ad_id)
);
create index if not exists ad_rank_snapshots_ad_idx on public.ad_rank_snapshots (ad_id, captured_at);

-- ---------------------------------------------------------------- helpers
-- 1 -> a, 26 -> z, 27 -> aa, 28 -> ab …
create or replace function public.page_letter_for(n int) returns text
language plpgsql immutable as $$
declare s text := ''; k int := n;
begin
  while k > 0 loop
    s := chr(97 + ((k - 1) % 26)) || s;
    k := (k - 1) / 26;
  end loop;
  return s;
end $$;

-- Short uppercase code from a brand name: initials of 2+ words, else first
-- two letters; a digit is appended if it's taken.
create or replace function public.make_brand_code(brand_name text) returns text
language plpgsql as $$
declare
  words text[];
  base text;
  candidate text;
  i int := 2;
begin
  words := regexp_split_to_array(upper(regexp_replace(brand_name, '[^A-Za-z0-9 ]', '', 'g')), '\s+');
  words := array_remove(words, '');
  if array_length(words, 1) >= 2 then
    base := left(words[1], 1) || left(words[2], 1);
  elsif array_length(words, 1) = 1 then
    base := left(words[1], 2);
  else
    base := 'BR';
  end if;
  candidate := base;
  while exists (select 1 from public.brands where code = candidate) loop
    candidate := base || i;
    i := i + 1;
  end loop;
  return candidate;
end $$;

-- Ensures a brand has a code, returns it.
create or replace function public.ensure_brand_code(bid bigint) returns text
language plpgsql as $$
declare c text; nm text;
begin
  select code, name into c, nm from public.brands where id = bid for update;
  if c is null then
    c := public.make_brand_code(nm);
    update public.brands set code = c where id = bid;
  end if;
  return c;
end $$;

-- Ensures a page has a letter ('' for main), returns it.
create or replace function public.ensure_page_letter(pid bigint) returns text
language plpgsql as $$
declare l text; t text; bid bigint; n int;
begin
  select letter, type, brand_id into l, t, bid from public.pages where id = pid;
  if l is not null then return l; end if;
  perform pg_advisory_xact_lock(hashtext('page_letter'), bid::int);
  select letter into l from public.pages where id = pid;  -- re-check under lock
  if l is not null then return l; end if;
  if t = 'main' then
    l := '';
  else
    select count(*) into n from public.pages where brand_id = bid and letter is not null and letter <> '';
    l := public.page_letter_for(n + 1);
  end if;
  update public.pages set letter = l where id = pid;
  return l;
end $$;

-- ---------------------------------------------------------------- trigger
create or replace function public.ads_assign_codes() returns trigger
language plpgsql as $$
declare c text;
begin
  if new.ad_code is null then
    perform pg_advisory_xact_lock(hashtext('ad_seq'), new.brand_id::int);
    c := public.ensure_brand_code(new.brand_id);
    select coalesce(max(ad_seq), 0) + 1 into new.ad_seq from public.ads where brand_id = new.brand_id;
    new.ad_code := c || '-' || lpad(new.ad_seq::text, 4, '0');
  end if;
  if new.page_id is not null then
    perform public.ensure_page_letter(new.page_id);
  end if;
  if new.last_seen_at is null then new.last_seen_at := now(); end if;
  return new;
end $$;

drop trigger if exists ads_assign_codes on public.ads;
create trigger ads_assign_codes
  before insert or update of page_id on public.ads
  for each row execute function public.ads_assign_codes();

-- ---------------------------------------------------------------- backfill
-- Brand codes: keep the prefixes already used in blueprints (BR, CN, DN, LY,
-- PV, ED, MM, SM, and HK/PK for the page-lettered builds).
update public.brands b set code = v.code
from (values
  ('ryze','RY'), ('Javvy','JV'), ('Miami MD','MI'), ('Kelle Skin','KS'),
  ('IM8 Health','IM'), ('gruns','GR'), ('cyperglow','CG'),
  ('Michael Todd Beauty','MT'), ('Frøya Organics','FO'), ('Seranova Beauty','SN'),
  ('AuraMalibu','AM'), ('LUXERESEARCHLAB.COM','LX'), ('Ziella','ZI'),
  ('Primal Viking','PV'), ('Bioroot Labs','BR'), ('Clean Nutraceuticals','CN'),
  ('MarsMen','MM'), ('Everyday Dose','ED'), ('Smooche','SM'), ('Drink Nectar','DN'),
  ('Lymphoria','LY'), ('UndrDog Hemp','UD'), ('primals','PR'),
  ('Peak Footwear','PK'), ('HIKE Footwear','HK')
) as v(name, code)
where b.name = v.name and b.code is null;

-- Any other brand that already has ads gets a generated code.
do $$
declare r record;
begin
  for r in select distinct b.id from public.brands b join public.ads a on a.brand_id = b.id where b.code is null order by b.id loop
    perform public.ensure_brand_code(r.id);
  end loop;
end $$;

-- Page letters: main = '', other pages that have ads get a, b, c… by page id
-- (= the order they were added).
update public.pages set letter = '' where type = 'main' and letter is null
  and exists (select 1 from public.ads a where a.page_id = pages.id);

with ranked as (
  select p.id, row_number() over (partition by p.brand_id order by p.id) as n
  from public.pages p
  where p.type <> 'main' and p.letter is null
    and exists (select 1 from public.ads a where a.page_id = p.id)
)
update public.pages p set letter = public.page_letter_for(r.n::int)
from ranked r where r.id = p.id;

-- Permanent ids: per brand, in first-seen (row id) order.
with seq as (
  select a.id, row_number() over (partition by a.brand_id order by a.id) as n
  from public.ads a where a.ad_code is null
)
update public.ads a
set ad_seq = s.n,
    ad_code = b.code || '-' || lpad(s.n::text, 4, '0'),
    last_seen_at = coalesce(a.last_seen_at, a.updated_at)
from seq s, public.brands b
where s.id = a.id and b.id = a.brand_id;

-- First rank snapshot: one 'backfill' run per page, rank = scrape order
-- within the page (scrape order = GetHook impressions order at the time).
insert into public.scrape_runs (brand_id, page_id, source, depth, reached_end, ads_ranked, started_at, finished_at, notes)
select p.brand_id, p.id, 'backfill', count(a.id), false, count(a.id), min(a.created_at), max(a.created_at),
       'Initial ranks from original scrape (insert) order.'
from public.pages p join public.ads a on a.page_id = p.id
where not exists (select 1 from public.scrape_runs r where r.page_id = p.id and r.source = 'backfill')
group by p.brand_id, p.id;

insert into public.ad_rank_snapshots (run_id, ad_id, page_id, rank, label, captured_at)
select r.id, a.id, a.page_id,
       row_number() over (partition by a.page_id order by a.id),
       '#' || row_number() over (partition by a.page_id order by a.id) || coalesce(p.letter, ''),
       a.created_at
from public.ads a
join public.pages p on p.id = a.page_id
join public.scrape_runs r on r.page_id = a.page_id and r.source = 'backfill'
where not exists (select 1 from public.ad_rank_snapshots s where s.run_id = r.id and s.ad_id = a.id);

update public.ads a
set current_rank = s.rank, current_label = s.label, rank_updated_at = s.captured_at
from public.ad_rank_snapshots s
join public.scrape_runs r on r.id = s.run_id and r.source = 'backfill'
where s.ad_id = a.id and a.current_rank is null;

-- ---------------------------------------------------------------- history view
create or replace view public.ad_rank_history as
select a.ad_code, a.media_id, b.name as brand, p.name as page, p.letter,
       s.rank, s.label, s.captured_at, r.source, r.id as run_id
from public.ad_rank_snapshots s
join public.ads a on a.id = s.ad_id
join public.brands b on b.id = a.brand_id
left join public.pages p on p.id = s.page_id
join public.scrape_runs r on r.id = s.run_id
order by a.ad_code, s.captured_at;
