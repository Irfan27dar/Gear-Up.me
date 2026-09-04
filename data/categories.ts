import type { Category } from '@/types';

/**
 * Main categories from the live catalogue (brief §7).
 * imageUrl is null → CategoryCard renders the branded placeholder until real
 * photography is uploaded to Supabase Storage.
 */
export const categories: Category[] = [
  {
    id: 'cat-pc-components',
    name: 'PC Components',
    slug: 'pc-components',
    parentId: null,
    imageUrl: null,
    blurb: 'Graphics cards, storage, processors, memory, cooling & motherboards.',
    sort: 1,
  },
  {
    id: 'cat-laptops',
    name: 'Laptops',
    slug: 'laptops',
    parentId: null,
    imageUrl: null,
    blurb: 'Gaming, business, ultrabooks, 2-in-1 & Chromebooks.',
    sort: 2,
  },
  {
    id: 'cat-monitors',
    name: 'Monitors & Video',
    slug: 'monitors',
    parentId: null,
    imageUrl: null,
    blurb: 'Gaming, curved, ultrawide, 4K & professional displays.',
    sort: 3,
  },
  {
    id: 'cat-networking',
    name: 'Networking',
    slug: 'networking',
    parentId: null,
    imageUrl: null,
    blurb: 'Wired, wireless, mesh, network storage & Ubiquiti gear.',
    sort: 4,
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    parentId: null,
    imageUrl: null,
    blurb: 'Keyboards, mice, headsets, webcams & wearables.',
    sort: 5,
  },
  {
    id: 'cat-mobiles',
    name: 'Mobiles & Electronics',
    slug: 'mobiles',
    parentId: null,
    imageUrl: null,
    blurb: 'Mobiles, tablets, smart devices & earbuds.',
    sort: 6,
  },
  {
    id: 'cat-printers',
    name: 'Printer Supplies',
    slug: 'printers',
    parentId: null,
    imageUrl: null,
    blurb: 'Printers, toner, scanners & projectors.',
    sort: 7,
  },
  {
    id: 'cat-custom-pcs',
    name: 'Custom PC Builds',
    slug: 'custom-pcs',
    parentId: null,
    imageUrl: null,
    blurb: 'Pre-built and build-to-order gaming & workstation rigs.',
    sort: 8,
  },
];

// Sub-categories (used by the mega-menu). Keyed by parent slug.
export const subCategories: Record<string, string[]> = {
  'pc-components': ['Graphics Cards', 'Storage', 'Processors', 'Memory', 'Cooling', 'Motherboards'],
  laptops: ['Gaming', 'Business', 'Ultrabooks', '2-in-1', 'Chromebooks'],
  monitors: ['Gaming', 'Curved', 'Ultrawide', '4K', 'Professional'],
  networking: ['Wired', 'Wireless', 'Mesh', 'Network Storage', 'Ubiquiti'],
  accessories: ['Keyboards', 'Mice', 'Headsets', 'Webcams', 'Wearables'],
  mobiles: ['Mobiles', 'Tablets', 'Smart Devices', 'Earbuds'],
  printers: ['Printers', 'Toner', 'Scanners', 'Projectors'],
  'custom-pcs': ['Gaming Rigs', 'Workstations', 'Build to Order'],
};
