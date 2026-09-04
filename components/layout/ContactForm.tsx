'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Demo handler — wire to an email service or Supabase table in production.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-btn border border-cloud bg-white p-8 text-center shadow-card">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-tint text-green-700">
          <CheckCircle2 size={30} />
        </div>
        <p className="mt-3 text-subhead font-bold text-teal">Message sent</p>
        <p className="mt-1 text-body text-slate/70">We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-btn border border-cloud bg-white p-6 shadow-card">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-caption font-semibold text-ink">Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="h-11 rounded-btn border border-cloud bg-white px-3 text-body text-ink outline-none focus:border-teal"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-caption font-semibold text-ink">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="h-11 rounded-btn border border-cloud bg-white px-3 text-body text-ink outline-none focus:border-teal"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-caption font-semibold text-ink">Message</span>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="rounded-btn border border-cloud bg-white px-3 py-2 text-body text-ink outline-none focus:border-teal"
          />
        </label>
        <Button type="submit" variant="green" size="lg" className="w-full sm:w-auto">
          Send message
        </Button>
      </div>
    </form>
  );
}
