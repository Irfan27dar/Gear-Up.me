import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-caption text-steel">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {c.href && !last ? (
              <Link href={c.href} className="hover:text-teal">
                {c.label}
              </Link>
            ) : (
              <span className={last ? 'font-medium text-slate' : ''}>{c.label}</span>
            )}
            {!last && <ChevronRight size={13} className="text-cloud" />}
          </span>
        );
      })}
    </nav>
  );
}
