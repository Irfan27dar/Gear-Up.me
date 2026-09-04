import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ContentSections } from '@/components/layout/ContentSections';

export const metadata: Metadata = { title: 'Returns' };

export default function ReturnsPage() {
  return (
    <>
      <PageHero
        title="Returns & Refunds"
        subtitle="Not quite right? Here's how returns work."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Returns' }]}
      />
      <ContentSections
        sections={[
          {
            heading: '7-day returns',
            body: [
              'Unopened items in original packaging can be returned within 7 days of delivery for a full refund or exchange. Contact us first to arrange a pickup or drop-off.',
            ],
          },
          {
            heading: 'Faulty items',
            body: [
              'If a product arrives faulty or develops a fault within warranty, we will repair, replace or refund it per the manufacturer warranty terms.',
            ],
          },
          {
            heading: 'Non-returnable',
            body: [
              'Custom-built PCs, opened software and consumables (e.g. toner) are non-returnable unless faulty.',
            ],
          },
          {
            heading: 'Refund timing',
            body: ['Approved refunds are processed to the original payment method within 5–10 business days.'],
          },
        ]}
      />
    </>
  );
}
