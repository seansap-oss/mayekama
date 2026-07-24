-- MayekAma Build 6 release/API extension

create table if not exists public.standard_releases (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  title text not null,
  release_notes text,
  language_pack_url text,
  checksum text,
  status text not null default 'draft' check (status in ('draft','published','retired')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.expert_reviews (
  id uuid primary key default gen_random_uuid(),
  word_id uuid,
  reviewer_name text,
  decision text not null check (decision in ('approved','rejected','needs_revision')),
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists public.api_customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'free' check (plan in ('free','developer','publisher','institution')),
  contact_email text,
  api_key_hash text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.api_usage_events (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.api_customers(id) on delete set null,
  endpoint text not null,
  request_count int not null default 1,
  created_at timestamptz not null default now()
);

alter table public.standard_releases enable row level security;
alter table public.expert_reviews enable row level security;
alter table public.api_customers enable row level security;
alter table public.api_usage_events enable row level security;

create policy if not exists "published releases are readable" on public.standard_releases
  for select using (status = 'published');
