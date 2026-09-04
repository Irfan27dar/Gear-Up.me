import { cn } from '@/lib/utils';

type Tone = 'green' | 'teal' | 'orange' | 'neutral';

const tones: Record<Tone, string> = {
  green: 'bg-green-tint text-green-700',
  teal: 'bg-teal-tint text-teal',
  orange: 'bg-orange text-orange-text',
  neutral: 'bg-cloud text-slate',
};

interface StatusBadgeProps {
  tone?: Tone;
  /** Numeric content (discounts, warranty months) renders in tabular mono. */
  mono?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** Pill-shaped status badge — one accent each. Repeats on every product card. */
export function StatusBadge({ tone = 'neutral', mono, className, children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-caption font-semibold leading-none',
        mono && 'tnum',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
