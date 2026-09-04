import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an AED price with tabular mono figures in mind (no currency symbol drift). */
export function formatAed(value: number): string {
  return new Intl.NumberFormat('en-AE', {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/** Original price before the discount was applied. */
export function originalPrice(price: number, discountPct: number): number {
  if (!discountPct) return price;
  return price / (1 - discountPct / 100);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
