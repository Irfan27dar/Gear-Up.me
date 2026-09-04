-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security (brief §9)
-- Public read on catalog; user-scoped access on carts, orders, profiles, builds.
-- ─────────────────────────────────────────────────────────────────────────

alter table categories     enable row level security;
alter table brands         enable row level security;
alter table products       enable row level security;
alter table product_images enable row level security;
alter table reviews        enable row level security;
alter table profiles       enable row level security;
alter table carts          enable row level security;
alter table cart_items     enable row level security;
alter table orders         enable row level security;
alter table order_items    enable row level security;
alter table build_requests enable row level security;

-- ── Public read on catalog tables ────────────────────────────────────────
create policy "catalog read: categories"     on categories     for select using (true);
create policy "catalog read: brands"         on brands         for select using (true);
create policy "catalog read: products"       on products       for select using (true);
create policy "catalog read: product_images" on product_images for select using (true);
create policy "catalog read: reviews"        on reviews        for select using (true);

-- Authenticated users may post reviews (author bound to nothing sensitive here).
create policy "reviews insert: authenticated"
  on reviews for insert to authenticated with check (true);

-- ── Profiles: a user sees/edits only their own row ───────────────────────
create policy "profiles: own row select" on profiles for select using (auth.uid() = id);
create policy "profiles: own row upsert" on profiles for insert with check (auth.uid() = id);
create policy "profiles: own row update" on profiles for update using (auth.uid() = id);

-- ── Carts + items: scoped to the owner ───────────────────────────────────
create policy "carts: owner all"
  on carts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "cart_items: owner all"
  on cart_items for all
  using (exists (select 1 from carts c where c.id = cart_items.cart_id and c.user_id = auth.uid()))
  with check (exists (select 1 from carts c where c.id = cart_items.cart_id and c.user_id = auth.uid()));

-- ── Orders: a user reads their own; guests create via server/service role ─
create policy "orders: owner select"
  on orders for select using (auth.uid() = user_id);
create policy "orders: owner insert"
  on orders for insert to authenticated with check (auth.uid() = user_id);

create policy "order_items: owner select"
  on order_items for select
  using (exists (select 1 from orders o where o.id = order_items.order_id and o.user_id = auth.uid()));
create policy "order_items: owner insert"
  on order_items for insert to authenticated
  with check (exists (select 1 from orders o where o.id = order_items.order_id and o.user_id = auth.uid()));

-- ── Build requests: a user reads their own; anyone may submit one ─────────
create policy "build_requests: insert anyone"
  on build_requests for insert with check (true);
create policy "build_requests: owner select"
  on build_requests for select using (auth.uid() = user_id);

-- NOTE: guest checkout and guest build requests are written server-side with
-- the service-role key (see lib/supabase/admin.ts), which bypasses RLS.
