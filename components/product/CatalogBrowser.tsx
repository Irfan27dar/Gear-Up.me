'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { brandBySlug } from '@/data/brands';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'discount' | 'rating';

const sortOptions: { value: Sort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'discount', label: 'Biggest discount' },
  { value: 'rating', label: 'Top rated' },
];

export function CatalogBrowser({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>('featured');
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const priceCeiling = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.priceAed), 0) / 1000) * 1000,
    [products],
  );
  const effectiveMax = maxPrice || priceCeiling;

  const availableBrands = useMemo(() => {
    const slugs = Array.from(new Set(products.map((p) => p.brandSlug).filter(Boolean))) as string[];
    return slugs.map((s) => ({ slug: s, name: brandBySlug(s)?.name ?? s })).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (brandFilter.length && !brandFilter.includes(p.brandSlug ?? '')) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (minRating && p.rating < minRating) return false;
      if (p.priceAed > effectiveMax) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.priceAed - b.priceAed;
        case 'price-desc':
          return b.priceAed - a.priceAed;
        case 'discount':
          return b.discountPct - a.discountPct;
        case 'rating':
          return b.rating - a.rating;
        default:
          return Number(b.isFeatured) - Number(a.isFeatured);
      }
    });
    return list;
  }, [products, brandFilter, inStockOnly, minRating, effectiveMax, sort]);

  function toggleBrand(slug: string) {
    setBrandFilter((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }
  function reset() {
    setBrandFilter([]);
    setInStockOnly(false);
    setMinRating(0);
    setMaxPrice(0);
  }
  const activeCount = brandFilter.length + (inStockOnly ? 1 : 0) + (minRating ? 1 : 0) + (maxPrice ? 1 : 0);

  const filters = (
    <div className="flex flex-col gap-6">
      <FilterGroup title="Brand">
        <div className="flex flex-col gap-2">
          {availableBrands.map((b) => (
            <label key={b.slug} className="flex cursor-pointer items-center gap-2 text-body text-slate">
              <input
                type="checkbox"
                checked={brandFilter.includes(b.slug)}
                onChange={() => toggleBrand(b.slug)}
                className="h-4 w-4 accent-green"
              />
              {b.name}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Max price">
        <input
          type="range"
          min={0}
          max={priceCeiling}
          step={100}
          value={effectiveMax}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-green"
          aria-label="Maximum price"
        />
        <p className="tnum mt-1 text-caption text-slate">Up to AED {effectiveMax.toLocaleString()}</p>
      </FilterGroup>

      <FilterGroup title="Rating">
        <div className="flex flex-col gap-2">
          {[4, 4.5].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2 text-body text-slate">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="h-4 w-4 accent-green"
              />
              {r}★ & up
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-2 text-body text-slate">
            <input
              type="radio"
              name="rating"
              checked={minRating === 0}
              onChange={() => setMinRating(0)}
              className="h-4 w-4 accent-green"
            />
            Any rating
          </label>
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <label className="flex cursor-pointer items-center gap-2 text-body text-slate">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 accent-green"
          />
          In stock only
        </label>
      </FilterGroup>

      {activeCount > 0 && (
        <button onClick={reset} className="self-start text-caption font-semibold text-orange-600 hover:text-orange">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-40">
          <h2 className="mb-4 text-subhead font-bold text-teal">Filters</h2>
          {filters}
        </div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-btn border border-cloud px-3 py-2 text-caption font-semibold text-teal lg:hidden"
          >
            <SlidersHorizontal size={16} /> Filters
            {activeCount > 0 && (
              <span className="tnum rounded-pill bg-green px-1.5 text-[0.65rem] text-ink">{activeCount}</span>
            )}
          </button>
          <p className="tnum hidden text-caption text-steel sm:block">
            {filtered.length} product{filtered.length === 1 ? '' : 's'}
          </p>
          <label className="ml-auto flex items-center gap-2 text-caption text-slate">
            <span className="hidden sm:inline">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-btn border border-cloud bg-white px-3 py-2 text-caption text-ink outline-none focus:border-teal"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No products match your filters"
            description="Try widening your price range or clearing a filter."
            action={{ href: '#', label: 'Clear filters' }}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white">
            <div className="flex items-center justify-between border-b border-cloud p-4">
              <h2 className="text-subhead font-bold text-teal">Filters</h2>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close filters" className="p-1 text-teal">
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{filters}</div>
            <div className="border-t border-cloud p-4">
              <Button variant="green" className="w-full" onClick={() => setDrawerOpen(false)}>
                Show {filtered.length} results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={cn('border-b border-cloud pb-5 last:border-0')}>
      <h3 className="label mb-3 text-ink">{title}</h3>
      {children}
    </div>
  );
}
