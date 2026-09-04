'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock, Truck } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { Button } from '@/components/ui/Button';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { EmptyState } from '@/components/ui/EmptyState';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { formatAed } from '@/lib/utils';
import { site } from '@/lib/site';

const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const subtotal = items.reduce((sum, i) => sum + i.priceAed * i.qty, 0);
  const shipping = subtotal >= site.freeShippingThreshold ? 0 : 30;
  const total = subtotal + shipping;

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dubai',
    notes: '',
  });

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          address: {
            fullName: form.fullName,
            phone: form.phone,
            address: form.address,
            city: form.city,
            notes: form.notes,
          },
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            priceAed: i.priceAed,
            qty: i.qty,
          })),
          subtotal,
          shipping,
          total,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong');
      if (data.url) {
        window.location.href = data.url; // Stripe redirect (when enabled)
        return;
      }
      setOrderId(data.id);
      clear();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Order failed');
    } finally {
      setSubmitting(false);
    }
  }

  // Confirmation
  if (orderId) {
    return (
      <div className="shell py-16">
        <div className="mx-auto max-w-lg rounded-btn border border-cloud bg-white p-8 text-center shadow-card">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-tint text-green-700">
            <CheckCircle2 size={34} />
          </div>
          <h1 className="mt-4 text-heading font-black text-teal">Order placed!</h1>
          <p className="mt-2 text-body text-slate/80">
            Thanks for your order. Your reference is{' '}
            <span className="tnum font-bold text-ink">{orderId}</span>. We&apos;ll confirm by email
            and ship your genuine gear same day where possible.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/account" variant="green">
              View my orders
            </Button>
            <Button href="/" variant="outline">
              Back to home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="shell py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Checkout' }]} />
        <div className="mt-8">
          <EmptyState
            title="Nothing to check out"
            description="Add items to your cart first."
            action={{ href: '/category/deals', label: "Shop today's deals" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="mt-4 text-heading font-black text-teal sm:text-display">Checkout</h1>

      <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-8">
          <fieldset className="rounded-btn border border-cloud bg-white p-6">
            <legend className="px-2 text-subhead font-bold text-teal">Delivery details</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required value={form.fullName} onChange={(v) => update('fullName', v)} />
              <Field label="Email" type="email" required value={form.email} onChange={(v) => update('email', v)} />
              <Field label="Phone" type="tel" required value={form.phone} onChange={(v) => update('phone', v)} />
              <div className="flex flex-col gap-1.5">
                <label className="text-caption font-semibold text-ink">Emirate</label>
                <select
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  className="h-11 rounded-btn border border-cloud bg-white px-3 text-body text-ink outline-none focus:border-teal"
                >
                  {emirates.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Field label="Address" required value={form.address} onChange={(v) => update('address', v)} />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-caption font-semibold text-ink">Delivery notes (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  rows={2}
                  className="rounded-btn border border-cloud bg-white px-3 py-2 text-body text-ink outline-none focus:border-teal"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-btn border border-cloud bg-white p-6">
            <legend className="px-2 text-subhead font-bold text-teal">Payment</legend>
            <div className="flex items-start gap-3 rounded-btn bg-teal-tint/50 p-4">
              <Lock size={18} className="mt-0.5 shrink-0 text-teal" />
              <p className="text-caption text-slate">
                {process.env.NEXT_PUBLIC_ENABLE_STRIPE === 'true'
                  ? 'You’ll be redirected to our secure Stripe checkout to pay by card.'
                  : 'Cash / card on delivery, or bank transfer. Our team will confirm payment before dispatch. (Stripe test-mode card payment activates when configured.)'}
              </p>
            </div>
          </fieldset>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-40 lg:self-start">
          <div className="rounded-btn border border-cloud bg-white p-6">
            <h2 className="text-subhead font-bold text-teal">Your order</h2>
            <ul className="mt-4 space-y-3">
              {items.map((i) => (
                <li key={i.productId} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded border border-cloud bg-white p-1">
                    <ProductMedia src={i.imageUrl} alt={i.name} sizes="48px" />
                    <span className="tnum absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-teal px-1 text-[0.6rem] font-bold text-white">
                      {i.qty}
                    </span>
                  </div>
                  <span className="line-clamp-2 flex-1 text-caption text-slate">{i.name}</span>
                  <span className="tnum text-caption font-bold text-ink">
                    {formatAed(i.priceAed * i.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-cloud pt-4 text-body">
              <div className="flex justify-between">
                <dt className="text-slate">Subtotal</dt>
                <dd className="tnum font-semibold text-ink">AED {formatAed(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate">Shipping</dt>
                <dd className={`tnum font-semibold ${shipping === 0 ? 'text-green-700' : 'text-ink'}`}>
                  {shipping === 0 ? 'Free' : `AED ${formatAed(shipping)}`}
                </dd>
              </div>
              <div className="flex justify-between border-t border-cloud pt-2">
                <dt className="font-bold text-ink">Total</dt>
                <dd className="tnum text-subhead font-black text-teal">AED {formatAed(total)}</dd>
              </div>
            </dl>

            {error && <p className="mt-3 text-caption text-orange-600">{error}</p>}

            <Button type="submit" variant="green" size="lg" disabled={submitting} className="mt-5 w-full">
              {submitting ? 'Placing order…' : `Place order · AED ${formatAed(total)}`}
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-caption text-steel">
              <Truck size={14} className="text-green-700" /> Same-day dispatch on in-stock items
            </p>
          </div>
        </aside>
      </form>
    </div>
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
