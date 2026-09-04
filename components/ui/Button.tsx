import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'green' | 'teal' | 'orange' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const variants: Record<Variant, string> = {
  // ink text on green = the click color
  green: 'bg-green text-ink hover:bg-green-600 shadow-[0_6px_16px_-6px_rgba(123,193,0,0.6)]',
  // white text on teal = calm secondary
  teal: 'bg-teal text-white hover:bg-teal-600',
  // deep-brown text on orange = deals only
  orange: 'bg-orange text-orange-text hover:bg-orange-600',
  outline: 'border border-cloud bg-white text-teal hover:border-teal hover:bg-teal-tint',
  ghost: 'text-teal hover:bg-teal-tint',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-caption',
  md: 'h-11 px-6 text-body',
  lg: 'h-12 px-8 text-subhead',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href'
  >;

export const Button = forwardRef<HTMLButtonElement, ButtonAsButton | ButtonAsLink>(
  function Button({ variant = 'green', size = 'md', className, children, ...props }, ref) {
    const classes = cn(base, variants[variant], sizes[size], className);
    if ('href' in props && props.href) {
      const { href, ...rest } = props as ButtonAsLink;
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref} className={classes} {...(props as ButtonAsButton)}>
        {children}
      </button>
    );
  },
);
