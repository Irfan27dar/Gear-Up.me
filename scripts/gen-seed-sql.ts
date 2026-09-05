/**
 * Emit idempotent SQL to seed the catalogue (categories, brands, products,
 * reviews) into Supabase. Output is applied via the Supabase MCP so no
 * service-role key is needed. Run: tsx scripts/gen-seed-sql.ts > out.sql
 */
import { categories } from '../data/categories';
import { brands } from '../data/brands';
import { products } from '../data/products';
import { reviews } from '../data/reviews';

const q = (v: string | null | undefined) =>
  v == null ? 'null' : `'${v.replace(/'/g, "''")}'`;
const num = (v: number) => String(v);
const bool = (v: boolean) => (v ? 'true' : 'false');
const arr = (v: string[]) =>
  v.length ? `ARRAY[${v.map((s) => q(s)).join(',')}]::text[]` : `'{}'::text[]`;
const jsonb = (o: Record<string, string>) =>
  `'${JSON.stringify(o).replace(/'/g, "''")}'::jsonb`;

const lines: string[] = [];

lines.push('-- categories');
for (const c of categories) {
  lines.push(
    `insert into categories (name, slug, image_url, blurb, sort) values (${q(c.name)}, ${q(c.slug)}, ${q(c.imageUrl)}, ${q(c.blurb)}, ${num(c.sort)}) on conflict (slug) do update set name=excluded.name, image_url=excluded.image_url, blurb=excluded.blurb, sort=excluded.sort;`,
  );
}

lines.push('-- brands');
for (const b of brands) {
  lines.push(
    `insert into brands (name, slug, logo_url) values (${q(b.name)}, ${q(b.slug)}, ${q(b.logoUrl)}) on conflict (slug) do update set name=excluded.name, logo_url=excluded.logo_url;`,
  );
}

lines.push('-- products');
for (const p of products) {
  const catId = `(select id from categories where slug=${q(p.categorySlug)})`;
  const brandId = p.brandSlug ? `(select id from brands where slug=${q(p.brandSlug)})` : 'null';
  lines.push(
    `insert into products (name, slug, category_id, brand_id, description, specs, price_aed, discount_pct, sku, stock, is_featured, is_new, warranty_months, rating, review_count, tags) values (${q(p.name)}, ${q(p.slug)}, ${catId}, ${brandId}, ${q(p.description)}, ${jsonb(p.specs)}, ${num(p.priceAed)}, ${num(p.discountPct)}, ${q(p.sku)}, ${num(p.stock)}, ${bool(p.isFeatured)}, ${bool(p.isNew)}, ${num(p.warrantyMonths)}, ${num(p.rating)}, ${num(p.reviewCount)}, ${arr(p.tags)}) on conflict (slug) do update set name=excluded.name, category_id=excluded.category_id, brand_id=excluded.brand_id, description=excluded.description, specs=excluded.specs, price_aed=excluded.price_aed, discount_pct=excluded.discount_pct, sku=excluded.sku, stock=excluded.stock, is_featured=excluded.is_featured, is_new=excluded.is_new, warranty_months=excluded.warranty_months, rating=excluded.rating, review_count=excluded.review_count, tags=excluded.tags;`,
  );
}

lines.push('-- reviews (replace all)');
lines.push(`delete from reviews;`);
for (const r of reviews) {
  lines.push(
    `insert into reviews (product_id, author_name, rating, body, verified, location) values (null, ${q(r.authorName)}, ${num(r.rating)}, ${q(r.body)}, ${bool(r.verified)}, ${q(r.location)});`,
  );
}

console.log(lines.join('\n'));
