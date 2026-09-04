import { cn } from '@/lib/utils';
import { formatAed, originalPrice } from '@/lib/utils';

interface PriceTagProps {
  price: number;
  discountPct?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  currency?: string;
}

const sizeMap = {
  sm: 'text-body',
  md: 'text-subhead',
  lg: 'text-heading',
};

/** Mono price with optional strikethrough original + orange discount badge. */
export function PriceTag({
  price,
  discountPct = 0,
  size = 'md',
  className,
  currency = 'AED',
}: PriceTagProps) {
  const wasPrice = discountPct ? originalPrice(price, discountPct) : 0;
  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-1', className)}>
      <span className={cn('tnum font-bold text-teal', sizeMap[size])}>
        <span className="mr-1 text-[0.7em] font-semibold text-steel">{currency}</span>
        {formatAed(price)}
      </span>
      {discountPct > 0 && (
        <>
          <span className="tnum text-caption text-steel line-through">{formatAed(wasPrice)}</span>
          <span className="tnum rounded-pill bg-orange px-2 py-0.5 text-caption font-bold leading-none text-orange-text">
            −{discountPct}%
          </span>
        </>
      )}
    </div>
  );
}
