-- MayekAma Supabase schema starter
-- Run in Supabase SQL editor or migration workflow.

create extension if not exists pgcrypto;

create table if not exists public.standard_releases (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  title text not null,
  status text not null default 'draft' check (status in ('draft','published','recalled')),
  notes text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.standard_words (
  id uuid primary key default gen_random_uuid(),
  canonical text not null unique,
  meaning_en text,
  meaning_rm text,
  meitei_mayek text,
  part_of_speech text,
  formality text default 'chat',
  frequency_score int default 0,
  approval_status text not null default 'draft' check (approval_status in ('draft','review','approved','retired')),
  release_id uuid references public.standard_releases(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.word_aliases (
  id uuid primary key default gen_random_uuid(),
  word_id uuid not null references public.standard_words(id) on delete cascade,
  alias text not null,
  source text default 'manual',
  confidence numeric(4,3) default 0.800,
  created_at timestamptz not null default now(),
  unique(word_id, alias)
);

create table if not exists public.example_sentences (
  id uuid primary key default gen_random_uuid(),
  word_id uuid references public.standard_words(id) on delete cascade,
  roman_text text not null,
  english_translation text,
  status text default 'draft' check (status in ('draft','approved','retired')),
  created_at timestamptz not null default now()
);

create table if not exists public.user_contributions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  submitted_word text not null,
  suggested_canonical text,
  example_sentence text,
  contributor_note text,
  review_status text default 'pending' check (review_status in ('pending','accepted','rejected','needs_info')),
  reviewer_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.api_customers (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid,
  name text not null,
  plan text default 'free' check (plan in ('free','creator','publisher','school','institution')),
  api_key_hash text,
  monthly_quota int default 1000,
  is_active boolean default true,
  created_at timestamptz not null default now()
);

alter table public.standard_releases enable row level security;
alter table public.standard_words enable row level security;
alter table public.word_aliases enable row level security;
alter table public.example_sentences enable row level security;
alter table public.user_contributions enable row level security;
alter table public.api_customers enable row level security;

create policy "published releases are public" on public.standard_releases for select using (status = 'published');
create policy "approved words are public" on public.standard_words for select using (approval_status = 'approved');
create policy "aliases for approved words are public" on public.word_aliases for select using (
  exists (select 1 from public.standard_words w where w.id = word_id and w.approval_status = 'approved')
);
create policy "approved examples are public" on public.example_sentences for select using (status = 'approved');
create policy "anyone can submit contributions" on public.user_contributions for insert with check (true);

insert into public.standard_releases(version, title, status, notes, published_at)
values ('0.1.0', 'MayekAma Roman Manipuri Standard Seed', 'published', 'Initial seed release for MVP testing.', now())
on conflict (version) do nothing;
