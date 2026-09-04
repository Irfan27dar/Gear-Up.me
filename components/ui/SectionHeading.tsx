import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  align = 'left',
  dark,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center sm:text-center',
        className,
      )}
    >
      <div className={cn('max-w-prose', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p className={cn('label mb-2', dark ? 'text-green' : 'text-green-700')}>{eyebrow}</p>
        )}
        <h2 className={cn('text-heading sm:text-display', dark && '!text-white')}>{title}</h2>
        {description && (
          <p className={cn('mt-2 text-body', dark ? 'text-white/70' : 'text-slate/80')}>
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className={cn(
            'group inline-flex shrink-0 items-center gap-1.5 text-body font-semibold transition-colors',
            dark ? 'text-green hover:text-white' : 'text-teal hover:text-green-700',
          )}
        >
          {link.label}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
