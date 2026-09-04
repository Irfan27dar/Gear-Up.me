-- ─────────────────────────────────────────────────────────────────────────
-- Gear-Up.me — initial schema (brief §9)
-- Postgres / Supabase. Run in the Supabase SQL editor or via `supabase db push`.
-- ─────────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- ─── Catalog ───────────────────────────────────────────────────────────────
create table if not exists categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text not null unique,
  parent_id  uuid references categories (id) on delete set null,
  image_url  text,
  blurb      text,
  sort       int  not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists brands (
  id       uuid primary key default gen_random_uuid(),
  name     text not null,
  slug     text not null unique,
  logo_url text
);

create table if not exists products (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  slug            text not null unique,
  category_id     uuid references categories (id) on delete set null,
  brand_id        uuid references brands (id) on delete set null,
  description     text not null default '',
  specs           jsonb not null default '{}'::jsonb,
  price_aed       numeric(12,2) not null,
  discount_pct    int not null default 0,
  sku             text unique,
  stock           int not null default 0,
  is_featured     boolean not null default false,
  is_new          boolean not null default false,
  warranty_months int not null default 24,
  rating          numeric(2,1) not null default 0,
  review_count    int not null default 0,
  tags            text[] not null default '{}',
  created_at      timestamptz not null default now()
);
create index if not exists products_category_idx on products (category_id);
create index if not exists products_brand_idx on products (brand_id);
create index if not exists products_tags_idx on products using gin (tags);

create table if not exists product_images (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  url        text not null,
  alt        text,
  sort       int not null default 0
);

create table if not exists reviews (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid references products (id) on delete cascade,
  author_name text not null,
  rating      int not null check (rating between 1 and 5),
  body        text not null,
  verified    boolean not null default false,
  location    text,
  created_at  timestamptz not null default now()
);

-- ─── Users / profiles ────────────────────────────────────────────────────
create table if not exists profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  name       text,
  phone      text,
  addresses  jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- ─── Cart (server copy for logged-in users) ──────────────────────────────
create table if not exists carts (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists cart_items (
  id         uuid primary key default gen_random_uuid(),
  cart_id    uuid not null references carts (id) on delete cascade,
  product_id uuid not null references products (id) on delete cascade,
  qty        int not null default 1 check (qty > 0),
  unique (cart_id, product_id)
);

-- ─── Orders ──────────────────────────────────────────────────────────────
create table if not exists orders (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users (id) on delete set null,
  status     text not null default 'pending'
             check (status in ('pending','paid','shipped','delivered','cancelled')),
  subtotal   numeric(12,2) not null default 0,
  shipping   numeric(12,2) not null default 0,
  total      numeric(12,2) not null default 0,
  email      text,
  address    jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references orders (id) on delete cascade,
  product_id   uuid references products (id) on delete set null,
  name         text not null,
  price_aed    numeric(12,2) not null,
  qty          int not null default 1
);

-- ─── Custom PC build requests ────────────────────────────────────────────
create table if not exists build_requests (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users (id) on delete set null,
  name       text not null,
  email      text not null,
  phone      text,
  use_case   text,
  budget_aed numeric(12,2),
  notes      text,
  created_at timestamptz not null default now()
);

-- ─── Auto-create a profile row on signup ─────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
