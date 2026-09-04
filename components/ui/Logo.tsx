import { cn } from '@/lib/utils';

type Variant = 'full' | 'reversed' | 'icon';

interface LogoProps {
  variant?: Variant;
  className?: string;
  /** Hide the "Computer Components Store" sub-line (auto-hidden on icon). */
  showSubline?: boolean;
}

/**
 * Gear-Up.me mark: a green cog wrapping a teal "G", with the wordmark.
 * Inline SVG so it stays crisp and can flip colour for dark grounds.
 */
export function Logo({ variant = 'full', className, showSubline = true }: LogoProps) {
  const reversed = variant === 'reversed';
  const cogColor = reversed ? '#FFFFFF' : '#7BC100';
  const gColor = reversed ? '#FFFFFF' : '#175266';
  const wordColor = reversed ? '#FFFFFF' : '#175266';
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45);

  const cog = (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9 shrink-0"
      role="img"
      aria-label="Gear-Up.me"
      focusable="false"
    >
      {teeth.map((deg) => (
        <rect
          key={deg}
          x="21.5"
          y="1.5"
          width="5"
          height="8"
          rx="2"
          fill={cogColor}
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="15.5" fill="none" stroke={cogColor} strokeWidth="5" />
      <text
        x="24"
        y="25"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-montserrat), system-ui, sans-serif"
        fontWeight="900"
        fontSize="20"
        fill={gColor}
      >
        G
      </text>
    </svg>
  );

  if (variant === 'icon') {
    return <span className={cn('inline-flex', className)}>{cog}</span>;
  }

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      {cog}
      <span className="flex flex-col leading-none">
        <span
          className="font-sans text-[1.05rem] font-black tracking-tight"
          style={{ color: wordColor }}
        >
          GEAR-UP<span style={{ color: '#7BC100' }}>.ME</span>
        </span>
        {showSubline && (
          <span
            className="mt-0.5 hidden text-[0.5rem] font-semibold uppercase tracking-label sm:block"
            style={{ color: reversed ? 'rgba(255,255,255,0.7)' : '#9CA3AF' }}
          >
            Computer Components Store
          </span>
        )}
      </span>
    </span>
  );
}
