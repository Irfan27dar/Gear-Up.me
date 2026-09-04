'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/types';

/** Horizontal, scroll-snapping rail of product cards with arrow controls. */
export function ProductRail({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  }

  return (
    <div className="relative">
      <div
        ref={ref}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2"
      >
        {products.map((p) => (
          <div
            key={p.slug}
            className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-[31%] lg:w-[23.5%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <RailNav label="Scroll left" onClick={() => scrollBy(-1)}>
          <ChevronLeft size={18} />
        </RailNav>
        <RailNav label="Scroll right" onClick={() => scrollBy(1)}>
          <ChevronRight size={18} />
        </RailNav>
      </div>
    </div>
  );
}

function RailNav({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-btn border border-cloud bg-white text-teal shadow-card transition-colors hover:border-teal hover:bg-teal-tint"
    >
      {children}
    </button>
  );
}
