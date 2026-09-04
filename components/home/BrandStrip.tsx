import Link from 'next/link';
import { brands } from '@/data/brands';

export function BrandStrip() {
  const list = brands.slice(0, 14);
  return (
    <section className="border-y border-cloud bg-white py-12">
      <div className="shell">
        <p className="label mb-6 text-center text-steel">Trusted brands we stock</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {list.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="rounded-btn border border-cloud bg-white px-4 py-2.5 text-body font-bold text-steel transition-all hover:border-teal hover:text-teal"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
