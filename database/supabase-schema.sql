-- MayekAma Build 1 Supabase schema
-- Run inside Supabase SQL editor after creating a project.

create extension if not exists pgcrypto;

create table if not exists public.standard_words (
  id uuid primary key default gen_random_uuid(),
  canonical text not null unique,
  meaning_en text not null default '',
  part_of_speech text not null default 'unknown',
  example text not null default '',
  level text not null default 'chat' check (level in ('chat','formal','editorial')),
  frequency int not null default 0,
  approval_status text not null default 'draft' check (approval_status in ('draft','review','approved','rejected')),
  standard_version text not null default 'RMS-0.1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.word_aliases (
  id uuid primary key default gen_random_uuid(),
  word_id uuid not null references public.standard_words(id) on delete cascade,
  alias text not null,
  source text not null default 'manual',
  confidence numeric(4,3) not null default 0.800,
  created_at timestamptz not null default now(),
  unique(word_id, alias)
);

create table if not exists public.contributions (
  id uuid primary key default gen_random_uuid(),
  submitted_word text not null,
  suggested_standard text,
  meaning_en text,
  example text,
  contributor_name text,
  contributor_contact text,
  review_status text not null default 'pending' check (review_status in ('pending','approved','rejected','needs-info')),
  reviewer_notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.standard_releases (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  title text not null,
  notes text not null default '',
  language_pack_url text,
  checksum text,
  published_at timestamptz
);

create table if not exists public.api_customers (
  id uuid primary key default gen_random_uuid(),
  organization text not null,
  contact_email text not null,
  plan text not null default 'free' check (plan in ('free','developer','publisher','education','institution')),
  api_key_hash text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.standard_words enable row level security;
alter table public.word_aliases enable row level security;
alter table public.contributions enable row level security;
alter table public.standard_releases enable row level security;
alter table public.api_customers enable row level security;

create policy "Public can read approved words" on public.standard_words
  for select using (approval_status = 'approved');

create policy "Public can read aliases for approved words" on public.word_aliases
  for select using (exists (select 1 from public.standard_words w where w.id = word_aliases.word_id and w.approval_status = 'approved'));

create policy "Anyone can submit contributions" on public.contributions
  for insert with check (true);

create policy "Public can read published releases" on public.standard_releases
  for select using (published_at is not null);

-- Admin write policies should be added in Build 2 after auth roles are configured.

insert into public.standard_words (canonical, meaning_en, part_of_speech, example, level, frequency, approval_status)
values
('eina','I / me','pronoun','Eina lak-i.','chat',99,'approved'),
('eigi','my / mine','possessive pronoun','Eigi ming MayekAma ni.','chat',98,'approved'),
('nang','you','pronoun','Nang kadaida leiri?','chat',98,'approved'),
('nangbu','you / to you','pronoun','Eina nangbu nungshi.','chat',96,'approved'),
('nungshi','love','verb/noun','Eina nangbu nungshi.','chat',95,'approved')
on conflict (canonical) do nothing;
