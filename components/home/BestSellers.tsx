'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface Tab {
  key: string;
  label: string;
  href: string;
  products: Product[];
}

export function BestSellers({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <section className="shell py-16 lg:py-20">
      <SectionHeading
        eyebrow="Most wanted"
        title="Best sellers"
        description="The gear our UAE customers keep coming back for."
      />

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Best seller categories">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              'rounded-pill px-4 py-2 text-caption font-semibold transition-colors',
              active === tab.key
                ? 'bg-teal text-white'
                : 'bg-cloud text-slate hover:bg-teal-tint hover:text-teal',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {current.products.slice(0, 4).map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button href={current.href} variant="outline">
          See all {current.label.toLowerCase()}
        </Button>
      </div>
    </section>
  );
}
