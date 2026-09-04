import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ContentSections } from '@/components/layout/ContentSections';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Shipping Guide' };

export default function ShippingPage() {
  return (
    <>
      <PageHero
        title="Shipping Guide"
        subtitle="Fast, tracked delivery across the UAE."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Shipping' }]}
      />
      <ContentSections
        sections={[
          {
            heading: 'Same-day delivery',
            body: [
              'Orders for in-stock items placed before our daily cut-off are dispatched the same day across the UAE, subject to location and courier availability.',
            ],
          },
          {
            heading: 'Free shipping',
            body: [
              `Enjoy free delivery on orders over AED ${site.freeShippingThreshold}. A flat AED 30 fee applies to smaller orders.`,
            ],
          },
          {
            heading: 'Tracking',
            body: ['You will receive tracking details by email or SMS as soon as your order ships.'],
          },
          {
            heading: 'Large & custom items',
            body: [
              'Custom PC builds and large-format displays are carefully packed and may take 1–3 additional days for assembly and testing before dispatch.',
            ],
          },
        ]}
      />
    </>
  );
}
