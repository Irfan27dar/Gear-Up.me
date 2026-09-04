import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { DealsSection } from '@/components/home/DealsSection';
import { ProductSpotlight } from '@/components/home/ProductSpotlight';
import { BestSellers } from '@/components/home/BestSellers';
import { BuildBanner } from '@/components/home/BuildBanner';
import { BrandStrip } from '@/components/home/BrandStrip';
import { ReviewCarousel } from '@/components/home/ReviewCarousel';
import { NewsletterBand } from '@/components/home/NewsletterBand';
import {
  featuredProducts,
  productBySlug,
  productsByTag,
} from '@/data/products';
import { site } from '@/lib/site';

export default function HomePage() {
  const heroProducts = featuredProducts();
  const spotlight =
    productBySlug('asus-tuf-gaming-geforce-rtx-5090') ?? featuredProducts()[0];

  const bestSellerTabs = [
    { key: 'laptops', label: 'Laptops', href: '/category/laptops', products: productsByTag('laptop') },
    { key: 'gpus', label: 'GPUs', href: '/category/pc-components', products: productsByTag('gpu') },
    { key: 'monitors', label: 'Monitors', href: '/category/monitors', products: productsByTag('monitor') },
    {
      key: 'peripherals',
      label: 'Peripherals',
      href: '/category/accessories',
      products: productsByTag('peripheral'),
    },
  ];

  return (
    <>
      <Hero products={heroProducts} />
      <TrustStrip />
      <CategoryGrid />
      <DealsSection />
      {spotlight && <ProductSpotlight product={spotlight} />}
      <BestSellers tabs={bestSellerTabs} />
      <BuildBanner />
      <BrandStrip />
      <ReviewCarousel />
      <NewsletterBand />
      {/* Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Store',
            name: site.fullName,
            legalName: site.legalEntity,
            url: site.url,
            telephone: site.phone,
            foundingDate: String(site.founded),
            address: {
              '@type': 'PostalAddress',
              streetAddress: site.address,
              addressLocality: 'Dubai',
              addressCountry: 'AE',
            },
            currenciesAccepted: site.currency,
          }),
        }}
      />
    </>
  );
}
