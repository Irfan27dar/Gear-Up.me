# Gear-Up.me — Computer Components Store

A full storefront for **Gear-Up.me** (Orynx General Trading LLC, Dubai) — PCs, laptops, monitors,
components, networking, peripherals and custom PC builds, priced in AED.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase · Zustand**, following
the Gear-Up.me brand system (green = action, teal = trust, orange = deal).

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — the store runs with zero backend
npm run dev                  # http://localhost:3800
```

The catalogue in [`data/`](data) renders the entire site with **no backend required**
(`NEXT_PUBLIC_DATA_SOURCE=local`, the default). Cart, checkout (mock order), build requests and the
newsletter all work out of the box. Add Supabase + Stripe when you want real persistence and payments.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server on port 3800 |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint (Next core-web-vitals + Prettier) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier write |
| `npm run seed` | Seed Supabase from `data/*` (needs env, see below) |

---

## Environment variables

Copy `.env.example` → `.env.local`. Everything is optional; missing keys degrade gracefully.

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project (auth + reads) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only; used by the seed script & guest order/build writes |
| `NEXT_PUBLIC_DATA_SOURCE` | `local` (default) or `supabase` |
| `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `NEXT_PUBLIC_ENABLE_STRIPE` | Stripe test mode; leave blank for the mock order flow |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata / sitemap |

---

## Supabase setup (optional)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run the migrations in order:
   - [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) — schema + signup trigger
   - [`supabase/migrations/0002_rls.sql`](supabase/migrations/0002_rls.sql) — Row Level Security
3. Put the project URL, anon key and service-role key in `.env.local`.
4. Seed the catalogue:
   ```bash
   npm run seed
   ```
5. **Auth:** enable Email and (optionally) Google providers in Supabase → Authentication. The
   `/login`, `/register` and `/account` pages then work; a profile row is auto-created on signup.
6. **Storage & images:** create a public `product-images` bucket, upload photos, and set each
   product's `imageUrl` (or `product_images` rows). Until then the branded `PlaceholderImage`
   renders, so the grid is never broken. `next.config.mjs` already allow-lists the Supabase host.

> Guest checkout and guest build requests are written server-side with the service-role key
> (`lib/supabase/admin.ts`), which bypasses RLS by design.

---

## Payments

Checkout posts to `POST /api/orders`:

- **Stripe test mode** — set `NEXT_PUBLIC_ENABLE_STRIPE=true` + keys, then complete the marked
  integration point in [`app/api/orders/route.ts`](app/api/orders/route.ts) (create a Checkout
  Session and return its `url`). Add the `stripe` package.
- **No keys** — falls back to a mock “Place order” that writes a `pending` order (Supabase if
  configured, otherwise an in-memory reference). The build is never blocked on payment keys.

---

## Project structure

```
app/                 Routes (App Router)
  page.tsx           Homepage (brief §5 hierarchy)
  category/[slug]    Category + Special Deals + Custom PCs
  product/[slug]     Product detail (ISR + JSON-LD)
  brands/[slug]      Brand-filtered listing
  search             Search results
  cart, checkout     Cart + checkout (mock/Stripe)
  build-pc           Custom PC build request
  account, login, register
  about|contact|faqs|shipping|returns|terms|privacy
  api/orders, api/build-requests
  sitemap.ts, robots.ts, loading/error/not-found
components/
  ui/                Design-system primitives (Button, PriceTag, StatusBadge, Logo, …)
  layout/            Header, MegaMenu, AnnouncementBar, Footer, SearchBar
  home/              Homepage sections (Hero, DealsSection, ProductSpotlight, …)
  product/           ProductCard, CatalogBrowser (filters/sort), BuyBox, BuildCard
  cart/              CartDrawer
  account/           AuthForm
data/                Seed catalogue (categories, brands, products, reviews, builds)
lib/                 utils, fonts, site config, cart store, supabase clients
supabase/migrations  SQL schema + RLS
scripts/seed.ts      Supabase seeder (reads data/*)
types/               Domain types
```

## Brand system

Tokens live in [`tailwind.config.ts`](tailwind.config.ts) and [`app/globals.css`](app/globals.css) —
no component hardcodes a hex. Montserrat for everything, **JetBrains Mono (tabular) for all numbers**
(prices, specs, SKUs), 9px button radius, pill badges, and the ~60/23/12/5
neutral/teal/green/orange balance with orange reserved for deals.

## Quality

- Responsive & mobile-first (tested 360 / 768 / 1024 / 1440).
- Accessible: semantic HTML, keyboard nav, visible focus, labels, alt text, `prefers-reduced-motion`.
- Performance: `next/image`, RSC, ISR on product/category/brand pages, lazy carousels.
- SEO: per-page metadata, OpenGraph, `sitemap.xml`, `robots.txt`, JSON-LD (Store/Product/FAQ).
- `npm run typecheck` and `npm run lint` are clean; `npm run build` prerenders 100+ pages.

## Follow-ups

- Source real product photography → Supabase Storage (placeholders in place meanwhile).
- Complete the Stripe Checkout Session in the marked integration point.
- Sync the guest cart to the `carts` table on login; wishlist persistence.
- Wire the contact form to an email service / Supabase table.

## Deploy (Vercel)

Import the repo, set the env vars above, deploy. `output` is default (SSR + ISR ready).
