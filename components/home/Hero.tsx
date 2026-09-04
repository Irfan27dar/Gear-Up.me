'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { formatAed, originalPrice } from '@/lib/utils';
import type { Product } from '@/types';

const HEADLINES: Record<string, { eyebrow: string; headline: string; support: string }> = {
  default: {
    eyebrow: 'Featured this week',
    headline: 'Gear that means business.',
    support: 'Genuine hardware, real warranty, and same-day delivery across the UAE.',
  },
};

export function Hero({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = products.slice(0, 5);
  const active = slides[index];

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  if (!active) return null;
  const copy = HEADLINES.default;
  const specs = Object.entries(active.specs).slice(0, 3);

  return (
    <section
      className="relative overflow-hidden bg-dark-ground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured products"
    >
      {/* ambient glow + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[8%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-green/20 blur-[120px]" />
        <div className="absolute -left-20 top-0 h-[380px] w-[380px] rounded-full bg-teal/40 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="shell relative grid min-h-[520px] items-center gap-8 py-14 lg:grid-cols-2 lg:py-20">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="label mb-4 inline-flex items-center gap-2 rounded-pill bg-white/10 px-3 py-1.5 text-green">
            <Zap size={13} className="fill-green" /> {copy.eyebrow}
          </p>
          <h1 className="text-display font-black leading-[1.02] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
            {active.name.split(' ').slice(0, 4).join(' ')}
          </h1>
          <p className="mt-4 max-w-md text-subhead text-white/70">{copy.support}</p>

          {/* price badge — the single orange accent */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="tnum inline-flex items-baseline gap-2 rounded-btn bg-orange px-4 py-2 text-orange-text">
              <span className="text-caption font-semibold">AED</span>
              <span className="text-heading font-black">{formatAed(active.priceAed)}</span>
              {active.discountPct > 0 && (
                <span className="text-caption font-semibold line-through opacity-70">
                  {formatAed(originalPrice(active.priceAed, active.discountPct))}
                </span>
              )}
            </span>
            {active.discountPct > 0 && (
              <span className="tnum rounded-pill bg-white/10 px-3 py-1.5 text-caption font-bold text-green">
                Save {active.discountPct}%
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={`/product/${active.slug}`} variant="green" size="lg">
              Shop now <ArrowRight size={18} />
            </Button>
            <Button
              href="/category/deals"
              variant="outline"
              size="lg"
              className="border-white/20 !bg-white/5 !text-white hover:!bg-white/10"
            >
              View all deals
            </Button>
          </div>
        </div>

        {/* Product visual + floating callouts */}
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-8 rounded-full bg-green/10 blur-2xl" />
          <div className="relative h-full w-full drop-shadow-2xl">
            <ProductMedia
              src={active.imageUrl}
              alt={active.name}
              category={active.categorySlug}
              variant="dark"
              sizes="(max-width: 1024px) 90vw, 450px"
              priority
            />
          </div>

          {/* floating spec callouts with connector lines */}
          {specs[0] && <Callout className="left-0 top-6" label={specs[0][0]} value={specs[0][1]} side="left" />}
          {specs[1] && (
            <Callout className="right-0 top-1/3" label={specs[1][0]} value={specs[1][1]} side="right" />
          )}
          {specs[2] && (
            <Callout className="bottom-8 left-6" label={specs[2][0]} value={specs[2][1]} side="left" />
          )}
        </div>
      </div>

      {/* controls */}
      {slides.length > 1 && (
        <div className="shell relative flex items-center justify-between pb-8">
          <div className="flex items-center gap-3">
            <span className="tnum text-caption font-bold text-white">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-px w-16 bg-white/20">
              <div
                className="h-full bg-green transition-all duration-500"
                style={{ width: `${((index + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span className="tnum text-caption text-white/50">
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>
          <div className="flex gap-2">
            <HeroNav label="Previous" onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}>
              <ChevronLeft size={18} />
            </HeroNav>
            <HeroNav label="Next" onClick={() => setIndex((i) => (i + 1) % slides.length)}>
              <ChevronRight size={18} />
            </HeroNav>
          </div>
        </div>
      )}
    </section>
  );
}

function Callout({
  label,
  value,
  side,
  className,
}: {
  label: string;
  value: string;
  side: 'left' | 'right';
  className?: string;
}) {
  return (
    <div className={`absolute z-10 animate-fade-up ${className}`}>
      <div className="flex items-center gap-2 rounded-btn border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-green" />
        <div className="leading-tight">
          <p className="text-[0.6rem] font-semibold uppercase tracking-label text-white/50">{label}</p>
          <p className="text-caption font-bold text-white">{value}</p>
        </div>
      </div>
      <span
        className={`absolute top-1/2 h-px w-8 bg-gradient-to-r from-green/80 to-transparent ${
          side === 'left' ? 'left-full' : 'right-full rotate-180'
        }`}
      />
    </div>
  );
}

function HeroNav({
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
      className="grid h-10 w-10 place-items-center rounded-btn border border-white/15 text-white transition-colors hover:border-green hover:bg-green hover:text-ink"
    >
      {children}
    </button>
  );
}
