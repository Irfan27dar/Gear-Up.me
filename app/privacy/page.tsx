import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ContentSections } from '@/components/layout/ContentSections';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />
      <ContentSections
        sections={[
          {
            heading: 'What we collect',
            body: [
              'We collect the details you provide at checkout or when creating an account — your name, contact details and delivery address — plus basic usage data to run the store.',
            ],
          },
          {
            heading: 'How we use it',
            body: [
              'Your information is used only to process orders, provide support, honour warranties and, with your consent, send offers. We never sell your data.',
            ],
          },
          {
            heading: 'Payments',
            body: [
              'Card payments are handled by our PCI-compliant payment provider. We do not store full card details on our servers.',
            ],
          },
          {
            heading: 'Contact',
            body: [`For any privacy request, email ${site.email} or call ${site.phone}.`],
          },
        ]}
      />
    </>
  );
}
