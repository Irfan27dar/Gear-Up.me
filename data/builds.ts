import type { CustomBuild } from '@/types';

/** Custom PC builds featured on the homepage + /build-pc (brief §7). */
export const builds: CustomBuild[] = [
  {
    id: 'build-hubris',
    name: 'HUBRIS Gaming PC',
    slug: 'hubris',
    cpu: 'Intel Core i7-14700KF',
    tagline: 'High-fps 1440p gaming, built and stress-tested in Dubai.',
    priceAed: 7174,
    discountPct: 0,
    specs: ['Core i7-14700KF', 'RTX 40-series GPU', '32GB DDR5', '1TB NVMe SSD', '360mm AIO cooling'],
    accent: 'green',
  },
  {
    id: 'build-legendary',
    name: 'LEGENDARY PC',
    slug: 'legendary',
    cpu: 'Intel Core i7-14700F',
    tagline: 'Serious performance for gaming and creation without compromise.',
    priceAed: 9689,
    discountPct: 0,
    specs: ['Core i7-14700F', 'RTX 40-series GPU', '32GB DDR5', '2TB NVMe SSD', 'Premium airflow case'],
    accent: 'teal',
  },
  {
    id: 'build-reaper-x',
    name: 'Reaper X PC',
    slug: 'reaper-x',
    cpu: 'AMD Ryzen 7 9700X',
    tagline: 'Next-gen Ryzen power at a headline price — while stock lasts.',
    priceAed: 10605,
    discountPct: 27,
    specs: ['Ryzen 7 9700X', 'RTX 50-series GPU', '32GB DDR5', '2TB NVMe SSD', 'Liquid cooled'],
    accent: 'orange',
  },
  {
    id: 'build-master-simulator',
    name: 'Master Simulator PC',
    slug: 'master-simulator',
    cpu: 'Intel Core i9-14900K',
    tagline: 'A no-limits flagship for 4K, sim rigs and heavy workstations.',
    priceAed: 39226,
    discountPct: 0,
    specs: ['Core i9-14900K', 'RTX 5090', '64GB DDR5', '4TB NVMe SSD', 'Custom loop cooling'],
    accent: 'teal',
  },
];

export const buildBySlug = (slug: string) => builds.find((b) => b.slug === slug);
