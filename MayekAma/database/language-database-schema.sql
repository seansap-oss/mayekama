-- MayekAma Build 7 language database schema
-- Purpose: support daily chat, article writing, book writing, API products, and keyboard language-pack releases.

create table if not exists public.language_sources (
  id text primary key,
  name text not null,
  source_type text not null,
  url text,
  licence_status text not null,
  import_policy text not null,
  created_at timestamptz default now()
);

create table if not exists public.lexicon_candidates (
  id uuid primary key default gen_random_uuid(),
  source_id text references public.language_sources(id),
  raw_word text not null,
  candidate_canonical text not null,
  aliases text[] default '{}',
  meaning_en text,
  part_of_speech text,
  domain text default 'general',
  register_level text default 'chat',
  example_roman text,
  meitei_mayek text,
  bengali_script text,
  confidence numeric default 0.25,
  review_status text default 'candidate',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.canonical_words (
  id uuid primary key default gen_random_uuid(),
  canonical text unique not null,
  meaning_en text,
  part_of_speech text,
  domain text default 'general',
  register_level text default 'chat',
  example_roman text,
  meitei_mayek text,
  bengali_script text,
  pronunciation_note text,
  frequency_score integer default 1,
  standard_version text not null default 'RMS-0.1',
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.word_aliases (
  id uuid primary key default gen_random_uuid(),
  canonical_id uuid references public.canonical_words(id) on delete cascade,
  alias text not null,
  alias_type text default 'community-spelling',
  visible_to_users boolean default false,
  created_at timestamptz default now(),
  unique(canonical_id, alias)
);

create table if not exists public.phrase_patterns (
  id uuid primary key default gen_random_uuid(),
  phrase text not null,
  domain text default 'daily',
  register_level text default 'chat',
  meaning_en text,
  frequency_score integer default 1,
  review_status text default 'candidate',
  created_at timestamptz default now()
);

create table if not exists public.book_terms (
  id uuid primary key default gen_random_uuid(),
  canonical_id uuid references public.canonical_words(id) on delete set null,
  topic text not null,
  term text not null,
  definition text,
  example_roman text,
  register_level text default 'formal',
  review_status text default 'candidate',
  created_at timestamptz default now()
);

create table if not exists public.standard_releases (
  id uuid primary key default gen_random_uuid(),
  version text unique not null,
  title text not null,
  release_notes text,
  word_count integer default 0,
  alias_count integer default 0,
  phrase_count integer default 0,
  pack_url text,
  checksum text,
  published_at timestamptz
);

alter table public.language_sources enable row level security;
alter table public.lexicon_candidates enable row level security;
alter table public.canonical_words enable row level security;
alter table public.word_aliases enable row level security;
alter table public.phrase_patterns enable row level security;
alter table public.book_terms enable row level security;
alter table public.standard_releases enable row level security;

create policy if not exists "Public can read approved canonical words" on public.canonical_words for select using (approved_at is not null);
create policy if not exists "Public can read visible aliases" on public.word_aliases for select using (visible_to_users = true);
create policy if not exists "Public can read published releases" on public.standard_releases for select using (published_at is not null);
