'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart-store';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  product: Product;
  qty?: number;
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  qty = 1,
  size = 'sm',
  full,
  className,
}: AddToCartButtonProps) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  function handleAdd() {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  if (outOfStock) {
    return (
      <Button variant="outline" size={size} disabled className={cn(full && 'w-full', className)}>
        Out of stock
      </Button>
    );
  }

  return (
    <Button
      variant="green"
      size={size}
      onClick={handleAdd}
      className={cn(full && 'w-full', className)}
      aria-label={`Add ${product.name} to cart`}
    >
      {added ? (
        <>
          <Check size={16} /> Added
        </>
      ) : (
        <>
          <ShoppingCart size={16} /> Add to cart
        </>
      )}
    </Button>
  );
}
