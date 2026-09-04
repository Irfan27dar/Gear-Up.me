import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'FAQs' };

const faqs = [
  {
    q: 'Are your products genuine?',
    a: 'Yes. We only sell 100% genuine, sealed stock backed by manufacturer or regional warranty.',
  },
  {
    q: 'Do you offer same-day delivery?',
    a: 'We dispatch in-stock orders the same day across the UAE where possible, subject to location and courier availability.',
  },
  {
    q: 'What warranty do products carry?',
    a: 'Most products carry a 24-month warranty; the exact coverage is shown on each product page.',
  },
  {
    q: 'Can you build a custom PC for me?',
    a: 'Absolutely — that’s our specialty. Head to “Build your PC”, tell us your budget and use case, and we’ll spec, assemble and stress-test a rig for you.',
  },
  {
    q: 'How do I pay?',
    a: 'We support secure card payment as well as cash/card on delivery and bank transfer. Our team confirms payment before dispatch.',
  },
  {
    q: 'How do I return something?',
    a: 'Unopened items can be returned within 7 days. See our Returns page for full details.',
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero
        title="Frequently asked questions"
        subtitle={`Still stuck? Call us on ${site.phone} or email ${site.email}.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQs' }]}
      />
      <div className="shell py-12 lg:py-16">
        <div className="mx-auto max-w-prose space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-btn border border-cloud bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-body font-semibold text-ink">
                {f.q}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-teal transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-body leading-relaxed text-slate/85">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
