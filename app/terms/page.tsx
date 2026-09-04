import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ContentSections } from '@/components/layout/ContentSections';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Terms & Conditions' };

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
      <ContentSections
        sections={[
          {
            heading: 'Agreement',
            body: [
              `By using ${site.url} and placing an order you agree to these terms. ${site.fullName} is operated by ${site.legalEntity}, Dubai, UAE.`,
            ],
          },
          {
            heading: 'Orders & pricing',
            body: [
              'All prices are shown in AED and may change without notice. We reserve the right to cancel any order in the event of a pricing or stock error, in which case you will be refunded in full.',
            ],
          },
          {
            heading: 'Warranty',
            body: [
              'Products carry the manufacturer or regional warranty stated on the product page. Warranty covers manufacturing defects and excludes accidental or misuse-related damage.',
            ],
          },
          {
            heading: 'Liability',
            body: [
              'Our liability is limited to the value of the products purchased. We are not liable for indirect or consequential loss to the fullest extent permitted by UAE law.',
            ],
          },
        ]}
      />
    </>
  );
}
