'use client';

import Link from 'next/link';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { Button } from '@/components/ui/Button';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { EmptyState } from '@/components/ui/EmptyState';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { formatAed } from '@/lib/utils';
import { site } from '@/lib/site';

export default function CartPage() {
  const { items, remove, setQty } = useCart();
  const subtotal = items.reduce((sum, i) => sum + i.priceAed * i.qty, 0);
  const shipping = subtotal >= site.freeShippingThreshold || subtotal === 0 ? 0 : 30;
  const total = subtotal + shipping;

  return (
    <div className="shell py-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      <h1 className="mt-4 text-heading font-black text-teal sm:text-display">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Browse our genuine gear and add something to get started."
            action={{ href: '/category/deals', label: "Shop today's deals" }}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Line items */}
          <ul className="divide-y divide-cloud overflow-hidden rounded-btn border border-cloud bg-white">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-4 p-4">
                <Link
                  href={`/product/${item.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded border border-cloud bg-white p-1.5"
                >
                  <ProductMedia src={item.imageUrl} alt={item.name} sizes="96px" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <Link
                    href={`/product/${item.slug}`}
                    className="text-body font-semibold text-ink hover:text-teal"
                  >
                    {item.name}
                  </Link>
                  <span className="tnum text-body font-bold text-teal">
                    AED {formatAed(item.priceAed)}
                  </span>
                  <div className="mt-auto flex items-center justify-between">
                    <QuantityStepper
                      value={item.qty}
                      max={item.stock}
                      onChange={(q) => setQty(item.productId, q)}
                    />
                    <div className="flex items-center gap-4">
                      <span className="tnum hidden text-body font-bold text-ink sm:block">
                        AED {formatAed(item.priceAed * item.qty)}
                      </span>
                      <button
                        onClick={() => remove(item.productId)}
                        aria-label={`Remove ${item.name}`}
                        className="p-1.5 text-steel hover:text-orange-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <aside className="lg:sticky lg:top-40 lg:self-start">
            <div className="rounded-btn border border-cloud bg-white p-6">
              <h2 className="text-subhead font-bold text-teal">Order summary</h2>
              <dl className="mt-4 space-y-2.5 text-body">
                <Row label="Subtotal" value={`AED ${formatAed(subtotal)}`} />
                <Row
                  label="Shipping"
                  value={shipping === 0 ? 'Free' : `AED ${formatAed(shipping)}`}
                  accent={shipping === 0}
                />
                <div className="border-t border-cloud pt-3">
                  <Row label="Total" value={`AED ${formatAed(total)}`} bold />
                </div>
              </dl>
              <Button href="/checkout" variant="green" size="lg" className="mt-5 w-full">
                Proceed to checkout <ArrowRight size={18} />
              </Button>
              <Link
                href="/category/pc-components"
                className="mt-3 block text-center text-caption font-semibold text-teal hover:text-green-700"
              >
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={bold ? 'font-bold text-ink' : 'text-slate'}>{label}</dt>
      <dd
        className={`tnum ${bold ? 'text-subhead font-black text-teal' : accent ? 'font-semibold text-green-700' : 'font-semibold text-ink'}`}
      >
        {value}
      </dd>
    </div>
  );
}
