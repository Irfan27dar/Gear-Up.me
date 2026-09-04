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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gear-up.me',
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
