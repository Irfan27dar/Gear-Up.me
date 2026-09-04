import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Wrench, Cpu, ShieldCheck, Truck } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BuildCard } from '@/components/product/BuildCard';
import { BuildRequestForm } from '@/components/product/BuildRequestForm';
import { builds } from '@/data/builds';

export const metadata: Metadata = {
  title: 'Build your PC',
  description:
    'Custom PC builds designed, assembled and stress-tested in Dubai. Tell us your budget and use case for a tailored quote.',
  alternates: { canonical: '/build-pc' },
};

const steps = [
  { icon: Wrench, title: 'Tell us your needs', copy: 'Budget, use case and any part preferences.' },
  { icon: Cpu, title: 'We spec & quote', copy: 'A balanced, no-bottleneck build tailored to you.' },
  { icon: ShieldCheck, title: 'Assembled & tested', copy: 'Cable-managed and stress-tested before dispatch.' },
  { icon: Truck, title: 'Delivered', copy: 'Shipped across the UAE with warranty.' },
];

export default function BuildPcPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dark-ground py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full bg-green/10 blur-[120px]" />
        </div>
        <div className="shell relative">
          <div className="[&_*]:!text-white/60">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Build your PC' }]} />
          </div>
          <div className="mt-4 max-w-2xl">
            <p className="label mb-3 inline-flex items-center gap-2 text-green">
              <Wrench size={14} /> Custom PC builds
            </p>
            <h1 className="text-display font-black text-white sm:text-[2.75rem]">
              Your rig, built to order in Dubai.
            </h1>
            <p className="mt-3 max-w-lg text-subhead text-white/70">
              From a first gaming PC to a no-limits workstation — we design, assemble and stress-test
              every build before it reaches you.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="shell py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-btn border border-cloud bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="tnum grid h-8 w-8 place-items-center rounded-full bg-teal text-caption font-bold text-white">
                  {i + 1}
                </span>
                <s.icon size={20} className="text-green-700" strokeWidth={1.7} />
              </div>
              <h3 className="mt-3 text-body font-bold text-ink">{s.title}</h3>
              <p className="mt-1 text-caption text-slate/70">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Presets */}
      <section className="shell pb-4">
        <h2 className="text-heading font-black text-teal">Popular configurations</h2>
        <p className="mt-1 text-body text-slate/70">Start from a proven build, or request something fully custom below.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {builds.map((b) => (
            <BuildCard key={b.slug} build={b} />
          ))}
        </div>
      </section>

      {/* Request form */}
      <section className="shell py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-btn bg-cloud" />}>
            <BuildRequestForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
