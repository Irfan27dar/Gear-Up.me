import type { Metadata } from 'next';
import { Search } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CatalogBrowser } from '@/components/product/CatalogBrowser';
import { EmptyState } from '@/components/ui/EmptyState';
import { searchProducts } from '@/data/products';

export const metadata: Metadata = { title: 'Search', robots: { index: false } };

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? '').trim();
  const results = q ? searchProducts(q) : [];

  return (
    <div className="shell py-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      <header className="mt-4">
        <h1 className="text-heading font-black text-teal sm:text-display">
          {q ? `Results for “${q}”` : 'Search'}
        </h1>
        {q && (
          <p className="tnum mt-1 text-body text-slate/70">
            {results.length} product{results.length === 1 ? '' : 's'} found
          </p>
        )}
      </header>

      <div className="mt-8">
        {!q ? (
          <EmptyState
            icon={Search}
            title="Search the store"
            description="Find laptops, GPUs, monitors, peripherals and more."
            action={{ href: '/category/pc-components', label: 'Browse components' }}
          />
        ) : results.length === 0 ? (
          <EmptyState
            icon={Search}
            title={`No results for “${q}”`}
            description="Check the spelling or try a broader term like ‘laptop’ or ‘GPU’."
            action={{ href: '/category/deals', label: "See today's deals" }}
          />
        ) : (
          <CatalogBrowser products={results} />
        )}
      </div>
    </div>
  );
}
