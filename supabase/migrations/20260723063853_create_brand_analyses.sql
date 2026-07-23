-- Milestone 3: brand_analyses table for the Brand Analysis Engine.
--
-- Insert-only from the application side (src/analysis/analysisRepository.js)
-- — every generated analysis is a new row, never an overwrite, so history
-- is preserved as prompt_version/model/instructions evolve over time.
-- analysis_type and prompt_version are plain text (no CHECK/enum) so new
-- analyzer types and prompt versions never require a migration.

create table if not exists public.brand_analyses (
  id bigint generated always as identity primary key,
  brand_id bigint not null references public.brands (id) on delete cascade,

  analysis_type text not null,
  prompt_version text not null,
  model text not null,
  markdown text not null,
  url text,

  created_at timestamptz not null default now()
);

create index if not exists brand_analyses_brand_id_type_idx
  on public.brand_analyses (brand_id, analysis_type, created_at desc);
