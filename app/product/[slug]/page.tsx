import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ShieldCheck, Truck, BadgeCheck, RotateCcw } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { PriceTag } from '@/components/ui/PriceTag';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Rating } from '@/components/ui/Rating';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductBuyBox } from '@/components/product/ProductBuyBox';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { products, productBySlug, relatedProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { brandBySlug } from '@/data/brands';
import { reviews as allReviews } from '@/data/reviews';
import { site } from '@/lib/site';
import { formatAed, originalPrice } from '@/lib/utils';

export const revalidate = 3600; // ISR

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = productBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { title: product.name, description: product.description },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productBySlug(params.slug);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.categorySlug);
  const brand = product.brandSlug ? brandBySlug(product.brandSlug) : null;
  const related = relatedProducts(product);
  const productReviews = allReviews.slice(0, 3); // demo: general reviews
  const inStock = product.stock > 0;

  return (
    <div className="shell py-8 lg:py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="lg:sticky lg:top-40 lg:self-start">
          <div className="relative aspect-square overflow-hidden rounded-btn border border-cloud bg-white p-8">
            <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
              {product.discountPct > 0 && (
                <StatusBadge tone="orange" mono>
                  −{product.discountPct}%
                </StatusBadge>
              )}
              {product.isNew && <StatusBadge tone="teal">New</StatusBadge>}
            </div>
            <ProductMedia
              src={product.imageUrl}
              alt={product.name}
              category={product.categorySlug}
              sizes="(max-width: 1024px) 90vw, 45vw"
              priority
            />
          </div>
        </div>

        {/* Details */}
        <div>
          {brand && <p className="label text-steel">{brand.name}</p>}
          <h1 className="mt-1 text-heading font-black text-teal sm:text-display">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} count={product.reviewCount} size={16} />
            <span className="tnum text-caption text-steel">SKU {product.sku}</span>
          </div>

          <div className="mt-5">
            <PriceTag price={product.priceAed} discountPct={product.discountPct} size="lg" />
            {product.discountPct > 0 && (
              <p className="tnum mt-1 text-caption text-green-700">
                You save AED {formatAed(originalPrice(product.priceAed, product.discountPct) - product.priceAed)}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {inStock ? (
              <StatusBadge tone="green">In stock · ships same day</StatusBadge>
            ) : (
              <StatusBadge tone="neutral">Out of stock</StatusBadge>
            )}
            <StatusBadge tone="neutral" mono>
              <ShieldCheck size={12} /> {product.warrantyMonths}-mo warranty
            </StatusBadge>
          </div>

          <p className="mt-5 max-w-prose text-body text-slate/85">{product.description}</p>

          <div className="mt-6">
            <ProductBuyBox product={product} />
          </div>

          {/* reassurance */}
          <ul className="mt-6 grid grid-cols-2 gap-3 rounded-btn border border-cloud bg-cloud/30 p-4">
            <Assurance icon={BadgeCheck} text="100% genuine, sealed stock" />
            <Assurance icon={Truck} text="Same-day UAE delivery" />
            <Assurance icon={ShieldCheck} text={`${product.warrantyMonths}-month warranty`} />
            <Assurance icon={RotateCcw} text="Easy returns" />
          </ul>

          {/* specs table */}
          <div className="mt-8">
            <h2 className="mb-3 text-subhead font-bold text-teal">Key specifications</h2>
            <dl className="overflow-hidden rounded-btn border border-cloud">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex justify-between gap-4 px-4 py-3 text-body ${i % 2 ? 'bg-white' : 'bg-cloud/30'}`}
                >
                  <dt className="text-slate/70">{key}</dt>
                  <dd className="tnum text-right font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <SectionHeading eyebrow="Customer reviews" title="What buyers say" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {productReviews.map((r) => (
            <figure key={r.id} className="rounded-btn border border-cloud bg-white p-5">
              <Rating value={r.rating} />
              <blockquote className="mt-2 text-caption text-slate">{r.body}</blockquote>
              <figcaption className="mt-3 flex items-center gap-1.5 text-caption font-semibold text-ink">
                {r.authorName}
                {r.verified && <BadgeCheck size={13} className="text-green-700" />}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading eyebrow="You might also like" title="Related products" />
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Product structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            sku: product.sku,
            brand: brand ? { '@type': 'Brand', name: brand.name } : undefined,
            description: product.description,
            aggregateRating:
              product.reviewCount > 0
                ? { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviewCount }
                : undefined,
            offers: {
              '@type': 'Offer',
              priceCurrency: site.currency,
              price: product.priceAed,
              availability: inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
              url: `${site.url}/product/${product.slug}`,
            },
          }),
        }}
      />
    </div>
  );
}

function Assurance({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <li className="flex items-center gap-2 text-caption text-slate">
      <Icon size={16} className="shrink-0 text-green-700" strokeWidth={1.7} /> {text}
    </li>
  );
}
