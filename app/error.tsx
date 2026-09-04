'use client';

import { Button } from '@/components/ui/Button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <div>
        <h1 className="text-heading font-black text-ink">Something went wrong</h1>
        <p className="mt-2 max-w-sm text-body text-slate/70">
          An unexpected error occurred. Please try again — if it persists, contact our team.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="green" onClick={reset}>
          Try again
        </Button>
        <Button href="/" variant="outline">
          Back to home
        </Button>
      </div>
    </div>
  );
}
