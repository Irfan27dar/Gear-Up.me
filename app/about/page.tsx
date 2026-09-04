import type { Metadata } from 'next';
import { BadgeCheck, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About us',
  description: `${site.fullName} — genuine computer components and custom PCs in the UAE since ${site.founded}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Gear-Up.me"
        subtitle={`Genuine gear, honest advice and same-day delivery across the UAE since ${site.founded}.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />
      <div className="shell grid gap-10 py-12 lg:grid-cols-[1.5fr_1fr] lg:py-16">
        <div className="max-w-prose space-y-4 text-body text-slate/85">
          <p>
            Gear-Up.me is the online store of {site.legalEntity}, a Dubai-based technology retailer
            founded in {site.founded}. We supply PCs, laptops, monitors, components, networking gear
            and peripherals to gamers, creators and businesses across the UAE and the wider Middle
            East.
          </p>
          <p>
            Everything we sell is 100% genuine, sealed stock backed by real regional warranty. Our
            team builds and stress-tests every custom PC in-house before it ships, and we deliver
            same-day on in-stock orders wherever possible.
          </p>
          <p>
            Whether you need a single graphics card, a fleet of business laptops or a no-compromise
            custom rig, we&apos;re here to help you gear up the right way.
          </p>
        </div>
        <div className="space-y-3">
          {[
            { icon: BadgeCheck, title: '100% Genuine', copy: 'Authentic, sealed stock only.' },
            { icon: ShieldCheck, title: '24-Month Warranty', copy: 'Real regional coverage.' },
            { icon: Truck, title: 'Same-Day Delivery', copy: 'Across the UAE on in-stock items.' },
            { icon: MapPin, title: 'Based in Dubai', copy: site.address },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3 rounded-btn border border-cloud bg-white p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn bg-teal-tint text-teal">
                <f.icon size={19} strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-body font-bold text-ink">{f.title}</p>
                <p className="text-caption text-slate/70">{f.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
