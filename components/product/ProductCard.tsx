import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { PriceTag } from '@/components/ui/PriceTag';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Rating } from '@/components/ui/Rating';
import { AddToCartButton } from './AddToCartButton';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const inStock = product.stock > 0;
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-btn border border-cloud bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover',
        className,
      )}
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-white p-4"
      >
        {/* top-left badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {product.discountPct > 0 && (
            <StatusBadge tone="orange" mono>
              −{product.discountPct}%
            </StatusBadge>
          )}
          {product.isNew && <StatusBadge tone="teal">New</StatusBadge>}
        </div>
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <ProductMedia
            src={product.imageUrl}
            alt={product.name}
            category={product.categorySlug}
            priority={priority}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 border-t border-cloud p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="label text-steel">{product.brandSlug?.toUpperCase() ?? 'GEAR-UP'}</span>
          <Rating value={product.rating} count={product.reviewCount} size={12} />
        </div>

        <h3 className="line-clamp-2 min-h-[2.5rem] text-body font-semibold leading-snug text-ink">
          <Link href={`/product/${product.slug}`} className="hover:text-teal">
            {product.name}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center gap-1.5">
          {inStock ? (
            <StatusBadge tone="green">In stock</StatusBadge>
          ) : (
            <StatusBadge tone="neutral">Out of stock</StatusBadge>
          )}
          <StatusBadge tone="neutral" mono>
            <ShieldCheck size={12} /> {product.warrantyMonths}-mo
          </StatusBadge>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-1">
          <PriceTag price={product.priceAed} discountPct={product.discountPct} size="sm" />
          <AddToCartButton product={product} full />
        </div>
      </div>
    </article>
  );
}
