'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SearchBar({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (term) router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <form onSubmit={submit} className={cn('relative w-full', className)} role="search">
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <Search
        size={18}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-steel"
        aria-hidden
      />
      <input
        id="site-search"
        type="search"
        autoFocus={autoFocus}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search laptops, GPUs, monitors…"
        className="h-11 w-full rounded-btn border border-cloud bg-cloud/60 pl-11 pr-24 text-body text-ink outline-none transition-colors placeholder:text-steel focus:border-teal focus:bg-white"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 rounded-btn bg-green px-4 text-caption font-semibold text-ink transition-colors hover:bg-green-600"
      >
        Search
      </button>
    </form>
  );
}
