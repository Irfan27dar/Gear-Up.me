import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CatalogBrowser } from '@/components/product/CatalogBrowser';
import { BuildCard } from '@/components/product/BuildCard';
import { categories } from '@/data/categories';
import { productsByCategory, dealProducts } from '@/data/products';
import { builds } from '@/data/builds';
import { site } from '@/lib/site';

export const revalidate = 3600; // ISR

const DEALS = {
  slug: 'deals',
  name: 'Special Deals',
  blurb: 'Every discounted product in one place — genuine gear at their best UAE prices.',
};

function resolve(slug: string) {
  if (slug === DEALS.slug) return DEALS;
  return categories.find((c) => c.slug === slug) ?? null;
}

export function generateStaticParams() {
  return [...categories.map((c) => ({ slug: c.slug })), { slug: DEALS.slug }];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cat = resolve(params.slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.blurb,
    alternates: { canonical: `/category/${cat.slug}` },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = resolve(params.slug);
  if (!cat) notFound();

  const isDeals = cat.slug === DEALS.slug;
  const isBuilds = cat.slug === 'custom-pcs';
  const products = isDeals ? dealProducts() : productsByCategory(cat.slug);

  return (
    <div className="shell py-8 lg:py-10">
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: cat.name }]}
      />
      <header className="mt-4 max-w-prose">
        <h1 className="text-heading font-black text-teal sm:text-display">{cat.name}</h1>
        <p className="mt-2 text-body text-slate/80">{cat.blurb}</p>
      </header>

      <div className="mt-8">
        {isBuilds ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {builds.map((b) => (
              <BuildCard key={b.slug} build={b} />
            ))}
          </div>
        ) : (
          <CatalogBrowser products={products} />
        )}
      </div>
    </div>
  );
}
