-- Kevin Infant portfolio — schema, indexes, RLS.
-- Run in Supabase Studio → SQL Editor (or `supabase db push`).

-- ---------- Tables ----------
create table if not exists public.videos (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  category      text not null check (category in ('short_form','long_form')),
  video_url     text not null,
  thumbnail_url text,
  display_order integer not null default 0,
  is_featured   boolean not null default false,
  is_published  boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists videos_order_idx     on public.videos (display_order);
create index if not exists videos_published_idx  on public.videos (is_published);
create index if not exists videos_category_idx   on public.videos (category);

create table if not exists public.enquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  service    text,
  message    text not null,
  status     text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists enquiries_created_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx  on public.enquiries (status);

-- Server-side admin allowlist (the real authorization gate).
create table if not exists public.admins (
  email text primary key
);

-- ---------- Helper: is the current user an admin? ----------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ---------- updated_at trigger ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists videos_updated on public.videos;
create trigger videos_updated before update on public.videos
  for each row execute function public.set_updated_at();

drop trigger if exists enquiries_updated on public.enquiries;
create trigger enquiries_updated before update on public.enquiries
  for each row execute function public.set_updated_at();

-- ---------- Row Level Security ----------
alter table public.videos    enable row level security;
alter table public.enquiries enable row level security;
alter table public.admins    enable row level security;

-- videos: anyone reads published; admins do everything (incl. read drafts)
drop policy if exists "videos public read" on public.videos;
create policy "videos public read" on public.videos
  for select using (is_published = true);

drop policy if exists "videos admin all" on public.videos;
create policy "videos admin all" on public.videos
  for all using (public.is_admin()) with check (public.is_admin());

-- enquiries: anyone can submit; only admins can read/update/delete
drop policy if exists "enquiries public insert" on public.enquiries;
create policy "enquiries public insert" on public.enquiries
  for insert with check (true);

drop policy if exists "enquiries admin read" on public.enquiries;
create policy "enquiries admin read" on public.enquiries
  for select using (public.is_admin());

drop policy if exists "enquiries admin update" on public.enquiries;
create policy "enquiries admin update" on public.enquiries
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "enquiries admin delete" on public.enquiries;
create policy "enquiries admin delete" on public.enquiries
  for delete using (public.is_admin());

-- admins: readable only by admins (manage rows from the SQL editor)
drop policy if exists "admins admin read" on public.admins;
create policy "admins admin read" on public.admins
  for select using (public.is_admin());

-- ---------- Authorize your account ----------
-- Replace with the email you sign in with, then run:
-- insert into public.admins (email) values ('you@example.com')
--   on conflict (email) do nothing;
