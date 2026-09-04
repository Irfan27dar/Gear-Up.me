import Image from 'next/image';
import { cn } from '@/lib/utils';

type Variant = 'full' | 'reversed' | 'icon';

interface LogoProps {
  variant?: Variant;
  className?: string;
}

/**
 * Official Gear-Up.me logo (extracted from the brand guidelines).
 * - full: colour lockup for light grounds
 * - reversed: same lockup rendered 1-colour white for dark grounds
 * - icon: cog + G mark for favicon / compact placements
 * Assets live in /public/brand.
 */
const LOCKUP = { src: '/brand/gearup-logo.png', width: 1247, height: 379 };
const ICON = { src: '/brand/gearup-icon.png', width: 503, height: 487 };

export function Logo({ variant = 'full', className }: LogoProps) {
  if (variant === 'icon') {
    return (
      <Image
        src={ICON.src}
        width={ICON.width}
        height={ICON.height}
        alt="Gear-Up.me"
        priority
        className={cn('h-9 w-auto', className)}
      />
    );
  }

  return (
    <Image
      src={LOCKUP.src}
      width={LOCKUP.width}
      height={LOCKUP.height}
      alt="Gear-Up.me — Computer Components Store"
      priority
      className={cn(
        'h-8 w-auto sm:h-9',
        // Reversed: flatten to pure white for dark grounds (footer, dark drawer).
        variant === 'reversed' && '[filter:brightness(0)_invert(1)]',
        className,
      )}
    />
  );
}
