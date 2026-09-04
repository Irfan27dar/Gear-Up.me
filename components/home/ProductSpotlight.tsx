import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { Reveal } from '@/components/ui/Reveal';
import { formatAed } from '@/lib/utils';
import type { Product } from '@/types';

export function ProductSpotlight({ product }: { product: Product }) {
  const specs = Object.entries(product.specs).slice(0, 4);
  return (
    <section className="relative overflow-hidden bg-teal-700">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-green/15 blur-[130px]" />
      </div>
      <div className="shell relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        {/* Visual */}
        <Reveal className="relative order-2 mx-auto aspect-square w-full max-w-lg lg:order-1">
          <div className="absolute inset-10 rounded-full bg-white/5 blur-2xl" />
          <div className="relative h-full w-full -rotate-6 drop-shadow-2xl">
            <ProductMedia
              src={product.imageUrl}
              alt={product.name}
              category={product.categorySlug}
              variant="dark"
              sizes="(max-width: 1024px) 90vw, 512px"
            />
          </div>
        </Reveal>

        {/* Story */}
        <Reveal className="order-1 lg:order-2" delay={100}>
          <p className="label mb-3 text-green">Product spotlight</p>
          <h2 className="text-display font-black text-white sm:text-[2.5rem]">
            Make your play. No compromise.
          </h2>
          <p className="mt-3 max-w-md text-subhead text-white/70">{product.description}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {specs.map(([key, value]) => (
              <li key={key} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/20 text-green">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-caption text-white/80">
                  <span className="font-semibold text-white">{key}:</span> {value}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={`/product/${product.slug}`} variant="green" size="lg">
              Explore {product.name.split(' ')[0]} <ArrowRight size={18} />
            </Button>
            <span className="tnum text-white">
              <span className="text-caption text-white/60">From </span>
              <span className="text-heading font-black">AED {formatAed(product.priceAed)}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
