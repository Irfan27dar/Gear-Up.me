/**
 * Resolve the canonical site URL. Guards against an unset OR empty/whitespace
 * NEXT_PUBLIC_SITE_URL (Vercel treats a blank env var as "") and a missing
 * protocol, so `new URL(site.url)` in metadata never throws at build time.
 */
function resolveSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? '').trim();
  if (!raw) return 'https://gear-up.me';
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

/** Single source of truth for company / contact info (footer, contact, metadata). */
export const site = {
  name: 'Gear-Up.me',
  fullName: 'Gear-Up.me — Computer Components Store',
  legalEntity: 'Orynx General Trading LLC',
  tagline: 'Computer Components Store',
  founded: 2013,
  region: 'UAE & the Middle East',
  address: '2020 Building, Sheikh Zayed Road, Dubai, UAE',
  phone: '+971 4 223 1780',
  phoneHref: 'tel:+97142231780',
  email: 'sales@gear-up.me',
  currency: 'AED',
  url: resolveSiteUrl(),
  freeShippingThreshold: 500,
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    x: 'https://x.com',
    linkedin: 'https://linkedin.com',
  },
} as const;

export const announcements = [
  'Same-day shipping across the UAE on in-stock orders',
  `Free delivery on orders over ${site.currency} ${site.freeShippingThreshold}`,
  '100% genuine gear · 24-month warranty · easy returns',
  `Talk to a build expert: ${site.phone}`,
];
