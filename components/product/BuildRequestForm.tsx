'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { buildBySlug } from '@/data/builds';

const useCases = ['Gaming', 'Content creation', 'Workstation / 3D', 'Streaming', 'Office / general', 'Simulation'];
const budgets = ['Under AED 5,000', 'AED 5,000–10,000', 'AED 10,000–20,000', 'AED 20,000+'];

export function BuildRequestForm() {
  const params = useSearchParams();
  const preset = params.get('build') ? buildBySlug(params.get('build')!) : null;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    useCase: 'Gaming',
    budgetAed: budgets[1],
    notes: preset ? `Interested in the ${preset.name} (${preset.cpu}).` : '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/build-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Request failed');
      setStatus('done');
    } catch (err) {
      setStatus('idle');
      setError(err instanceof Error ? err.message : 'Request failed');
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-btn border border-cloud bg-white p-8 text-center shadow-card">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-tint text-green-700">
          <CheckCircle2 size={34} />
        </div>
        <h3 className="mt-4 text-subhead font-bold text-teal">Request received!</h3>
        <p className="mt-2 text-body text-slate/80">
          Thanks — a Gear-Up.me build expert will reach out with a tailored quote shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-btn border border-cloud bg-white p-6 shadow-card">
      <h3 className="flex items-center gap-2 text-subhead font-bold text-teal">
        <Cpu size={20} /> Tell us about your build
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required value={form.name} onChange={(v) => update('name', v)} />
        <Field label="Email" type="email" required value={form.email} onChange={(v) => update('email', v)} />
        <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update('phone', v)} />
        <Select label="Primary use" value={form.useCase} options={useCases} onChange={(v) => update('useCase', v)} />
        <Select label="Budget" value={form.budgetAed} options={budgets} onChange={(v) => update('budgetAed', v)} />
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-caption font-semibold text-ink">Parts preferences & notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            rows={4}
            placeholder="e.g. prefer NVIDIA GPU, quiet cooling, white case, RGB…"
            className="rounded-btn border border-cloud bg-white px-3 py-2 text-body text-ink outline-none focus:border-teal"
          />
        </div>
      </div>
      {error && <p className="mt-3 text-caption text-orange-600">{error}</p>}
      <Button type="submit" variant="green" size="lg" disabled={status === 'sending'} className="mt-5 w-full sm:w-auto">
        {status === 'sending' ? 'Sending…' : 'Request a build quote'}
      </Button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-caption font-semibold text-ink">
        {label} {required && <span className="text-orange-600">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-btn border border-cloud bg-white px-3 text-body text-ink outline-none focus:border-teal"
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-caption font-semibold text-ink">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-btn border border-cloud bg-white px-3 text-body text-ink outline-none focus:border-teal"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
