/**
 * Seed Supabase with the catalogue from data/* (brief §7).
 * Usage:  npm run seed
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env(.local).
 *
 * Idempotent: upserts by slug/sku so it can be re-run safely.
 */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { categories } from '../data/categories';
import { brands } from '../data/brands';
import { products } from '../data/products';
import { reviews } from '../data/reviews';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('✖ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. See .env.example.');
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });

async function main() {
  console.log('→ Seeding categories…');
  const { data: catRows, error: catErr } = await db
    .from('categories')
    .upsert(
      categories.map((c) => ({
        name: c.name,
        slug: c.slug,
        image_url: c.imageUrl,
        blurb: c.blurb,
        sort: c.sort,
      })),
      { onConflict: 'slug' },
    )
    .select('id, slug');
  if (catErr) throw catErr;
  const catId = new Map(catRows!.map((r) => [r.slug, r.id]));

  console.log('→ Seeding brands…');
  const { data: brandRows, error: brandErr } = await db
    .from('brands')
    .upsert(
      brands.map((b) => ({ name: b.name, slug: b.slug, logo_url: b.logoUrl })),
      { onConflict: 'slug' },
    )
    .select('id, slug');
  if (brandErr) throw brandErr;
  const brandId = new Map(brandRows!.map((r) => [r.slug, r.id]));

  console.log(`→ Seeding ${products.length} products…`);
  const { data: prodRows, error: prodErr } = await db
    .from('products')
    .upsert(
      products.map((p) => ({
        name: p.name,
        slug: p.slug,
        category_id: catId.get(p.categorySlug) ?? null,
        brand_id: p.brandSlug ? (brandId.get(p.brandSlug) ?? null) : null,
        description: p.description,
        specs: p.specs,
        price_aed: p.priceAed,
        discount_pct: p.discountPct,
        sku: p.sku,
        stock: p.stock,
        is_featured: p.isFeatured,
        is_new: p.isNew,
        warranty_months: p.warrantyMonths,
        rating: p.rating,
        review_count: p.reviewCount,
        tags: p.tags,
      })),
      { onConflict: 'slug' },
    )
    .select('id, slug');
  if (prodErr) throw prodErr;

  console.log('→ Seeding reviews…');
  // Clear then insert (reviews have no natural unique key here).
  await db.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: revErr } = await db.from('reviews').insert(
    reviews.map((r) => ({
      product_id: null,
      author_name: r.authorName,
      rating: r.rating,
      body: r.body,
      verified: r.verified,
      location: r.location,
    })),
  );
  if (revErr) throw revErr;

  console.log(`✓ Seed complete — ${prodRows!.length} products, ${catRows!.length} categories, ${brandRows!.length} brands, ${reviews.length} reviews.`);
}

main().catch((err) => {
  console.error('✖ Seed failed:', err.message ?? err);
  process.exit(1);
});
