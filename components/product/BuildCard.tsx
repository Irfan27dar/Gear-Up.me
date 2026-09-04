import Link from 'next/link';
import { Cpu, ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatAed } from '@/lib/utils';
import type { CustomBuild } from '@/types';

export function BuildCard({ build }: { build: CustomBuild }) {
  return (
    <article className="group flex flex-col rounded-btn border border-cloud bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
      <div className="mb-4 flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-btn bg-teal-tint text-teal">
          <Cpu size={22} strokeWidth={1.7} />
        </span>
        {build.discountPct > 0 && (
          <StatusBadge tone="orange" mono>
            −{build.discountPct}%
          </StatusBadge>
        )}
      </div>
      <h3 className="text-subhead font-bold text-teal">{build.name}</h3>
      <p className="mt-1 text-caption text-steel">{build.cpu}</p>
      <p className="mt-2 text-caption text-slate/80">{build.tagline}</p>
      <ul className="mt-4 space-y-1.5">
        {build.specs.map((s) => (
          <li key={s} className="text-caption text-slate">
            • {s}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between border-t border-cloud pt-4">
        <span className="tnum">
          <span className="text-caption text-steel">From </span>
          <span className="text-subhead font-black text-teal">AED {formatAed(build.priceAed)}</span>
        </span>
        <Link
          href={`/build-pc?build=${build.slug}`}
          className="inline-flex items-center gap-1 text-caption font-semibold text-green-700 hover:text-green-600"
        >
          Configure <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
