'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  count: () => number;
  subtotal: () => number;
}

/**
 * Guest cart persisted to localStorage. For logged-in users this is synced to
 * the Supabase `carts` table by the account layer (see README §Auth).
 */
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);
          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((i) =>
                i.productId === product.id
                  ? { ...i, qty: Math.min(i.qty + qty, product.stock) }
                  : i,
              ),
            };
          }
          const item: CartItem = {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            priceAed: product.priceAed,
            discountPct: product.discountPct,
            imageUrl: product.imageUrl,
            qty: Math.min(qty, product.stock),
            stock: product.stock,
          };
          return { isOpen: true, items: [...state.items, item] };
        }),
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      setQty: (productId, qty) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId ? { ...i, qty: Math.max(0, Math.min(qty, i.stock)) } : i,
            )
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.priceAed * i.qty, 0),
    }),
    { name: 'gearup-cart' },
  ),
);
