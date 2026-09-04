'use client';

import { useEffect, useState } from 'react';
import { X, Truck } from 'lucide-react';
import { announcements } from '@/lib/site';

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % announcements.length), 4200);
    return () => clearInterval(t);
  }, []);

  if (dismissed) return null;

  return (
    <div className="relative bg-teal text-white">
      <div className="shell flex h-9 items-center justify-center gap-2 text-caption font-medium">
        <Truck size={14} className="shrink-0 text-green" aria-hidden />
        <p key={index} className="animate-fade-in truncate text-center">
          {announcements[index]}
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/70 hover:bg-white/10 hover:text-white"
      >
        <X size={14} />
      </button>
    </div>
  );
}
