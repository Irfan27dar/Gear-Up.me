import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { ContactForm } from '@/components/layout/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact us',
  description: `Get in touch with ${site.fullName} in Dubai. Call ${site.phone} or send us a message.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        subtitle="Questions about a product, an order or a custom build? We're here to help."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      <div className="shell grid gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <ul className="space-y-4">
            <ContactRow icon={MapPin} label="Visit us" value={site.address} />
            <ContactRow icon={Phone} label="Call us" value={site.phone} href={site.phoneHref} />
            <ContactRow icon={Mail} label="Email us" value={site.email} href={`mailto:${site.email}`} />
            <ContactRow icon={Clock} label="Hours" value="Sat–Thu, 9:00–19:00 · Fri closed" />
          </ul>
          <div className="mt-6 overflow-hidden rounded-btn border border-cloud">
            <iframe
              title="Gear-Up.me location"
              src="https://www.google.com/maps?q=Sheikh+Zayed+Road+Dubai&output=embed"
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-subhead font-bold text-teal">Send us a message</h2>
          <ContactForm />
        </div>
      </div>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <li className="flex items-start gap-3 rounded-btn border border-cloud bg-white p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn bg-teal-tint text-teal">
        <Icon size={19} strokeWidth={1.7} />
      </span>
      <div>
        <p className="label text-steel">{label}</p>
        {href ? (
          <a href={href} className="text-body font-semibold text-ink hover:text-teal">
            {value}
          </a>
        ) : (
          <p className="text-body font-semibold text-ink">{value}</p>
        )}
      </div>
    </li>
  );
}
