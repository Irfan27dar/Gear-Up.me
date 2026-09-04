import { Flame } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductRail } from './ProductRail';
import { dealProducts } from '@/data/products';

export function DealsSection() {
  const deals = dealProducts().slice(0, 10);
  return (
    <section className="bg-cloud/40 py-16 lg:py-20">
      <div className="shell">
        <SectionHeading
          eyebrow="Limited time"
          title="Today's deals"
          description="Genuine gear at their best UAE prices — while stock lasts."
          link={{ href: '/category/deals', label: 'View all deals' }}
        />
        <div className="mt-8">
          <ProductRail products={deals} />
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-caption text-orange-600">
          <Flame size={14} /> Prices update daily. Same-day shipping on in-stock orders.
        </p>
      </div>
    </section>
  );
}
