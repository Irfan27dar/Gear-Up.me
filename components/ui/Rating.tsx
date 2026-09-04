import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}

export function Rating({ value, count, size = 14, className }: RatingProps) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <div className={cn('flex items-center gap-1.5', className)} aria-label={`Rated ${value} out of 5`}>
      <div className="flex" style={{ gap: 1 }}>
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= Math.floor(rounded);
          const half = !filled && i - 0.5 === rounded;
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star size={size} className="absolute inset-0 text-cloud" fill="currentColor" />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden text-orange"
                  style={{ width: half ? size / 2 : size }}
                >
                  <Star size={size} fill="currentColor" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {typeof count === 'number' && (
        <span className="tnum text-caption text-steel">
          {value.toFixed(1)}
          {count > 0 && ` (${count})`}
        </span>
      )}
    </div>
  );
}
