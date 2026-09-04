'use client';

import { useState } from 'react';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { AddToCartButton } from './AddToCartButton';
import type { Product } from '@/types';

export function ProductBuyBox({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const outOfStock = product.stock <= 0;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {!outOfStock && (
        <QuantityStepper value={qty} onChange={setQty} max={Math.min(product.stock, 10)} />
      )}
      <AddToCartButton product={product} qty={qty} size="lg" className="flex-1" />
    </div>
  );
}
