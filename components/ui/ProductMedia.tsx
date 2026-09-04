import Image from 'next/image';
import { PlaceholderImage } from './PlaceholderImage';
import { cn } from '@/lib/utils';

interface ProductMediaProps {
  src: string | null;
  alt: string;
  category?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  variant?: 'light' | 'dark';
}

/** Renders next/image when a photo exists, else the branded placeholder. */
export function ProductMedia({
  src,
  alt,
  category,
  className,
  sizes = '(max-width: 768px) 50vw, 25vw',
  priority,
  variant = 'light',
}: ProductMediaProps) {
  if (!src) {
    return (
      <div className={cn('relative h-full w-full', className)}>
        <PlaceholderImage category={category} label={alt} variant={variant} />
      </div>
    );
  }
  return (
    <div className={cn('relative h-full w-full', className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-contain" />
    </div>
  );
}
