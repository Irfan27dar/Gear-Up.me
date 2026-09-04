import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { brands } from '@/data/brands';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const staticPaths = [
    '',
    '/build-pc',
    '/about',
    '/contact',
    '/faqs',
    '/shipping',
    '/returns',
    '/terms',
    '/privacy',
    '/category/deals',
  ];

  return [
    ...staticPaths.map((p) => ({ url: `${base}${p}`, lastModified: new Date() })),
    ...categories.map((c) => ({ url: `${base}/category/${c.slug}`, lastModified: new Date() })),
    ...brands.map((b) => ({ url: `${base}/brands/${b.slug}`, lastModified: new Date() })),
    ...products.map((p) => ({ url: `${base}/product/${p.slug}`, lastModified: new Date() })),
  ];
}
