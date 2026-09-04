'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const isRegister = mode === 'register';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) {
      setMessage('Authentication needs Supabase configured. See README → Setup.');
      return;
    }
    setStatus('loading');
    setMessage(null);
    const supabase = createClient();
    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { name: form.name } },
        });
        if (error) throw error;
        setMessage('Check your email to confirm your account, then sign in.');
        setStatus('idle');
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;
      router.push('/account');
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('idle');
    }
  }

  async function google() {
    if (!configured) {
      setMessage('Authentication needs Supabase configured. See README → Setup.');
      return;
    }
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/account` },
    });
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-btn border border-cloud bg-white p-8 shadow-card">
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <Logo variant="icon" />
        <div>
          <h1 className="text-heading font-black text-teal">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-1 text-caption text-slate/70">
            {isRegister ? 'Join Gear-Up.me for faster checkout and order tracking.' : 'Sign in to your Gear-Up.me account.'}
          </p>
        </div>
      </div>

      {!configured && (
        <div className="mb-4 flex items-start gap-2 rounded-btn bg-orange-tint p-3 text-caption text-orange-text">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>Demo mode — connect Supabase (see README) to enable sign-in.</span>
        </div>
      )}

      <form onSubmit={submit} className="flex flex-col gap-4">
        {isRegister && (
          <IconField icon={User} label="Full name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
        )}
        <IconField
          icon={Mail}
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          required
        />
        <IconField
          icon={Lock}
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => setForm((f) => ({ ...f, password: v }))}
          required
        />
        {message && <p className="text-caption text-orange-600">{message}</p>}
        <Button type="submit" variant="green" size="lg" disabled={status === 'loading'} className="w-full">
          {status === 'loading' ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-3 text-caption text-steel">
        <span className="h-px flex-1 bg-cloud" /> or <span className="h-px flex-1 bg-cloud" />
      </div>

      <Button variant="outline" size="lg" className="w-full" onClick={google}>
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-caption text-slate/70">
        {isRegister ? (
          <>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-teal hover:text-green-700">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New to Gear-Up.me?{' '}
            <Link href="/register" className="font-semibold text-teal hover:text-green-700">
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

function IconField({
  icon: Icon,
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-caption font-semibold text-ink">{label}</span>
      <span className="relative">
        <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel" />
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-btn border border-cloud bg-white pl-10 pr-3 text-body text-ink outline-none focus:border-teal"
        />
      </span>
    </label>
  );
}
