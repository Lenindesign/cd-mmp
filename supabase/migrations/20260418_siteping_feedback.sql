-- =============================================================================
-- SitePing feedback widget — Supabase schema
-- =============================================================================
-- Run this SQL in your Supabase project (SQL Editor) to enable shared
-- stakeholder feedback across all reviewers.
--
-- Tables match the SitePing data model from @siteping/widget (v0.9.x).
-- Source of truth: node_modules/@siteping/widget/dist/schema.d.ts (SITEPING_MODELS)
--
-- After running this, set the following env vars (locally in .env and in
-- Netlify):
--   VITE_SUPABASE_URL      — your Supabase project URL
--   VITE_SUPABASE_ANON_KEY — your Supabase anonymous public key
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Tables
-- -----------------------------------------------------------------------------

create table if not exists public.siteping_feedback (
  id            uuid        primary key default gen_random_uuid(),
  project_name  text        not null,
  type          text        not null check (type in ('question', 'change', 'bug', 'other')),
  message       text        not null,
  status        text        not null default 'open' check (status in ('open', 'resolved')),
  url           text        not null,
  viewport      text        not null,
  user_agent    text        not null,
  author_name   text        not null default '',
  author_email  text        not null default '',
  client_id     text        not null unique,
  resolved_at   timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists siteping_feedback_project_idx
  on public.siteping_feedback (project_name);

create index if not exists siteping_feedback_project_status_created_idx
  on public.siteping_feedback (project_name, status, created_at desc);

create table if not exists public.siteping_annotations (
  id                  uuid             primary key default gen_random_uuid(),
  feedback_id         uuid             not null references public.siteping_feedback(id) on delete cascade,
  css_selector        text             not null,
  xpath               text             not null,
  text_snippet        text             not null default '',
  element_tag         text             not null,
  element_id          text,
  text_prefix         text             not null default '',
  text_suffix         text             not null default '',
  fingerprint         text             not null default '',
  neighbor_text       text             not null default '',
  x_pct               double precision not null,
  y_pct               double precision not null,
  w_pct               double precision not null,
  h_pct               double precision not null,
  scroll_x            double precision not null,
  scroll_y            double precision not null,
  viewport_w          integer          not null,
  viewport_h          integer          not null,
  device_pixel_ratio  double precision not null default 1,
  created_at          timestamptz      not null default now()
);

create index if not exists siteping_annotations_feedback_idx
  on public.siteping_annotations (feedback_id);

-- -----------------------------------------------------------------------------
-- 2. Auto-update updated_at on feedback row changes
-- -----------------------------------------------------------------------------

create or replace function public.siteping_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists siteping_feedback_touch_updated_at on public.siteping_feedback;
create trigger siteping_feedback_touch_updated_at
  before update on public.siteping_feedback
  for each row execute function public.siteping_touch_updated_at();

-- -----------------------------------------------------------------------------
-- 3. Row Level Security
-- -----------------------------------------------------------------------------
-- This is a prototype review tool behind an unlisted URL. The anon key is
-- already exposed in the client bundle (that's how Supabase anon works). We
-- therefore allow broad read/write for anon — anyone with the review URL can
-- comment. Tighten this later (auth.uid() checks, magic-link invites) if you
-- start using the tool for higher-stakes reviews.
-- -----------------------------------------------------------------------------

alter table public.siteping_feedback     enable row level security;
alter table public.siteping_annotations  enable row level security;

drop policy if exists "siteping_feedback_read"   on public.siteping_feedback;
drop policy if exists "siteping_feedback_insert" on public.siteping_feedback;
drop policy if exists "siteping_feedback_update" on public.siteping_feedback;
drop policy if exists "siteping_feedback_delete" on public.siteping_feedback;

create policy "siteping_feedback_read"
  on public.siteping_feedback for select
  using (true);

create policy "siteping_feedback_insert"
  on public.siteping_feedback for insert
  with check (true);

create policy "siteping_feedback_update"
  on public.siteping_feedback for update
  using (true) with check (true);

create policy "siteping_feedback_delete"
  on public.siteping_feedback for delete
  using (true);

drop policy if exists "siteping_annotations_read"   on public.siteping_annotations;
drop policy if exists "siteping_annotations_insert" on public.siteping_annotations;
drop policy if exists "siteping_annotations_delete" on public.siteping_annotations;

create policy "siteping_annotations_read"
  on public.siteping_annotations for select
  using (true);

create policy "siteping_annotations_insert"
  on public.siteping_annotations for insert
  with check (true);

create policy "siteping_annotations_delete"
  on public.siteping_annotations for delete
  using (true);

-- -----------------------------------------------------------------------------
-- 4. Realtime (optional — lets reviewers see each other's pins appear live)
-- -----------------------------------------------------------------------------

alter publication supabase_realtime add table public.siteping_feedback;
alter publication supabase_realtime add table public.siteping_annotations;
