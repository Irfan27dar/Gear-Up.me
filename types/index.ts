// ─── Domain types (mirror the Supabase schema in supabase/migrations) ───────

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  imageUrl: string | null;
  blurb?: string;
  sort: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  brandSlug: string | null;
  description: string;
  specs: Record<string, string>;
  priceAed: number;
  /** Percentage off; original price = priceAed / (1 - discountPct/100). */
  discountPct: number;
  sku: string;
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  warrantyMonths: number;
  rating: number;
  reviewCount: number;
  imageUrl: string | null;
  /** Tags used for homepage tabs / spotlight selection, e.g. "laptop", "gpu". */
  tags: string[];
}

export interface Review {
  id: string;
  productSlug: string | null;
  authorName: string;
  rating: number;
  body: string;
  verified: boolean;
  location?: string;
  createdAt: string;
}

export interface CustomBuild {
  id: string;
  name: string;
  slug: string;
  cpu: string;
  tagline: string;
  priceAed: number;
  discountPct: number;
  specs: string[];
  accent: 'green' | 'teal' | 'orange';
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  priceAed: number;
  discountPct: number;
  imageUrl: string | null;
  qty: number;
  stock: number;
}
