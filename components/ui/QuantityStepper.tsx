'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantityStepperProps) {
  return (
    <div className={cn('inline-flex items-center rounded-btn border border-cloud', className)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="grid h-9 w-9 place-items-center text-teal transition-colors hover:bg-teal-tint disabled:opacity-40"
      >
        <Minus size={15} />
      </button>
      <span className="tnum w-9 text-center text-body font-semibold text-ink" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="grid h-9 w-9 place-items-center text-teal transition-colors hover:bg-teal-tint disabled:opacity-40"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
