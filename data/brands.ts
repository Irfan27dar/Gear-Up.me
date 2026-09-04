import type { Brand } from '@/types';

/** logoUrl null → BrandStrip renders the name as a styled wordmark chip. */
const names = [
  'ASUS',
  'MSI',
  'Dell',
  'HP',
  'Lenovo',
  'Acer',
  'GIGABYTE',
  'Zotac',
  'Corsair',
  'Logitech',
  'Ubiquiti',
  'Samsung',
  'Wacom',
  'Noctua',
  'be quiet!',
  'HyperX',
  'SteelSeries',
  'Alienware',
  'Crucial',
  'Jabra',
  'QCY',
  'GENESIS',
  'EPSON',
  'BenQ',
  'Plustek',
  'IIYAMA',
];

export const brands: Brand[] = names.map((name) => ({
  id: `brand-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  logoUrl: null,
}));

export const brandBySlug = (slug: string) => brands.find((b) => b.slug === slug);
