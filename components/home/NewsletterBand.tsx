'use client';

import { useState } from 'react';
import { Send, Truck, Check } from 'lucide-react';

export function NewsletterBand() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // Client-only demo: a real build posts to a newsletter route / Supabase table.
    setDone(true);
    setEmail('');
  }

  return (
    <section className="relative overflow-hidden bg-teal">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-green/20 blur-3xl" />
      </div>
      <div className="shell relative grid items-center gap-8 py-14 lg:grid-cols-2">
        <div>
          <p className="label mb-2 inline-flex items-center gap-2 text-green">
            <Truck size={14} /> Same-day shipping across the UAE
          </p>
          <h2 className="text-heading font-black !text-white sm:text-display">
            Deals, drops & build tips — straight to your inbox.
          </h2>
          <p className="mt-2 max-w-md text-body text-white/70">
            Join the Gear-Up.me list for early access to price drops and new stock. No spam.
          </p>
        </div>

        <form onSubmit={submit} className="w-full">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="h-12 flex-1 rounded-btn border border-white/20 bg-white/10 px-4 text-body text-white outline-none placeholder:text-white/50 focus:border-green focus:bg-white/15"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-btn bg-green px-6 text-body font-semibold text-ink transition-colors hover:bg-green-600"
            >
              {done ? (
                <>
                  <Check size={18} /> Subscribed
                </>
              ) : (
                <>
                  Subscribe <Send size={16} />
                </>
              )}
            </button>
          </div>
          {done && (
            <p className="mt-2 text-caption text-green">Thanks — you&apos;re on the list.</p>
          )}
        </form>
      </div>
    </section>
  );
}
