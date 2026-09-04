import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CatalogBrowser } from '@/components/product/CatalogBrowser';
import { EmptyState } from '@/components/ui/EmptyState';
import { brands, brandBySlug } from '@/data/brands';
import { productsByBrand } from '@/data/products';

export const revalidate = 3600;

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const brand = brandBySlug(params.slug);
  if (!brand) return {};
  return {
    title: `${brand.name} products`,
    description: `Shop genuine ${brand.name} products at Gear-Up.me with UAE warranty and same-day delivery.`,
    alternates: { canonical: `/brands/${brand.slug}` },
  };
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = brandBySlug(params.slug);
  if (!brand) notFound();
  const products = productsByBrand(brand.slug);

  return (
    <div className="shell py-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Brands' }, { label: brand.name }]} />
      <header className="mt-4">
        <h1 className="text-heading font-black text-teal sm:text-display">{brand.name}</h1>
        <p className="mt-2 text-body text-slate/80">
          Genuine {brand.name} gear with regional warranty and same-day UAE delivery.
        </p>
      </header>
      <div className="mt-8">
        {products.length === 0 ? (
          <EmptyState
            title={`No ${brand.name} products listed yet`}
            description="Check back soon or browse our full catalogue."
            action={{ href: '/category/pc-components', label: 'Browse all products' }}
          />
        ) : (
          <CatalogBrowser products={products} />
        )}
      </div>
    </div>
  );
}
