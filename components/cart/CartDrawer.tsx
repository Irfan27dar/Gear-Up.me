'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { X, ShoppingCart, Trash2, Truck } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { Button } from '@/components/ui/Button';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { formatAed } from '@/lib/utils';
import { site } from '@/lib/site';

export function CartDrawer() {
  const { items, isOpen, close, remove, setQty } = useCart();
  const subtotal = items.reduce((sum, i) => sum + i.priceAed * i.qty, 0);
  const remaining = Math.max(0, site.freeShippingThreshold - subtotal);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="absolute inset-0 animate-fade-in bg-ink/50" onClick={close} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md animate-fade-in flex-col bg-white shadow-card-hover">
        <div className="flex items-center justify-between border-b border-cloud p-4">
          <h2 className="flex items-center gap-2 text-subhead font-bold text-teal">
            <ShoppingCart size={20} /> Your cart
            <span className="tnum text-caption font-medium text-steel">({items.length})</span>
          </h2>
          <button onClick={close} aria-label="Close cart" className="p-1 text-teal hover:text-green-700">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-cloud text-steel">
              <ShoppingCart size={28} />
            </div>
            <div>
              <p className="text-subhead font-semibold text-ink">Your cart is empty</p>
              <p className="mt-1 text-body text-slate/70">Add some genuine gear to get started.</p>
            </div>
            <Button href="/category/deals" variant="green" onClick={close}>
              Shop today&apos;s deals
            </Button>
          </div>
        ) : (
          <>
            {/* free shipping progress */}
            <div className="border-b border-cloud bg-teal-tint/50 px-4 py-3">
              {remaining > 0 ? (
                <p className="flex items-center gap-2 text-caption text-teal">
                  <Truck size={15} className="text-green-700" />
                  <span>
                    Add <span className="tnum font-bold">AED {formatAed(remaining)}</span> more for
                    free delivery
                  </span>
                </p>
              ) : (
                <p className="flex items-center gap-2 text-caption font-semibold text-green-700">
                  <Truck size={15} /> You&apos;ve unlocked free delivery!
                </p>
              )}
            </div>

            <ul className="flex-1 divide-y divide-cloud overflow-y-auto">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-3 p-4">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={close}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded border border-cloud bg-white p-1"
                  >
                    <ProductMedia src={item.imageUrl} alt={item.name} sizes="80px" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={close}
                      className="line-clamp-2 text-caption font-semibold text-ink hover:text-teal"
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
                      <button
                        onClick={() => remove(item.productId)}
                        aria-label={`Remove ${item.name}`}
                        className="p-1.5 text-steel hover:text-orange-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-cloud p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-body text-slate">Subtotal</span>
                <span className="tnum text-subhead font-bold text-teal">
                  AED {formatAed(subtotal)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Button href="/checkout" variant="green" size="lg" onClick={close} className="w-full">
                  Checkout
                </Button>
                <Button href="/cart" variant="outline" onClick={close} className="w-full">
                  View cart
                </Button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
