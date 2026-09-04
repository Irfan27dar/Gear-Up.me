import { Cpu, Laptop, Monitor, Wifi, Keyboard, Smartphone, Printer, Boxes } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconByCategory: Record<string, React.ElementType> = {
  'pc-components': Cpu,
  laptops: Laptop,
  monitors: Monitor,
  networking: Wifi,
  accessories: Keyboard,
  mobiles: Smartphone,
  printers: Printer,
  'custom-pcs': Boxes,
};

interface PlaceholderImageProps {
  category?: string;
  label?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

/**
 * Branded fallback for products/categories with no photo yet: cloud ground,
 * subtle cog watermark, teal outline. Ensures the grid never shows a broken image.
 */
export function PlaceholderImage({
  category = 'pc-components',
  label,
  className,
  variant = 'light',
}: PlaceholderImageProps) {
  const Icon = iconByCategory[category] ?? Boxes;
  const dark = variant === 'dark';
  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        dark ? 'bg-teal-700' : 'bg-cloud',
        className,
      )}
      aria-hidden={!label}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {/* cog watermark */}
      <svg
        viewBox="0 0 48 48"
        className={cn(
          'absolute -bottom-6 -right-6 h-40 w-40 rotate-12',
          dark ? 'text-white/5' : 'text-teal/5',
        )}
      >
        {Array.from({ length: 8 }, (_, i) => i * 45).map((deg) => (
          <rect
            key={deg}
            x="21.5"
            y="1.5"
            width="5"
            height="8"
            rx="2"
            fill="currentColor"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
        <circle cx="24" cy="24" r="15.5" fill="none" stroke="currentColor" strokeWidth="5" />
      </svg>
      <Icon
        strokeWidth={1.5}
        className={cn('relative h-1/3 w-1/3', dark ? 'text-white/70' : 'text-teal/60')}
      />
    </div>
  );
}
