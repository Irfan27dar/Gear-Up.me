import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Reveal } from '@/components/ui/Reveal';
import { categories } from '@/data/categories';
import { productsByCategory } from '@/data/products';

export function CategoryGrid() {
  const shown = categories.slice(0, 6);
  return (
    <section className="shell py-16 lg:py-20">
      <SectionHeading
        eyebrow="Browse the range"
        title="Shop by category"
        description="From single components to a full custom rig — find what you need, fast."
        link={{ href: '/category/pc-components', label: 'All categories' }}
      />
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {shown.map((cat, i) => {
          const count = productsByCategory(cat.slug).length;
          return (
            <Reveal key={cat.slug} as="article" delay={i * 60}>
              <Link
                href={`/category/${cat.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-btn border border-cloud bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <PlaceholderImage category={cat.slug} />
                  </div>
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-btn bg-white/90 text-teal opacity-0 shadow-card transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-subhead font-bold text-teal">{cat.name}</h3>
                    {count > 0 && (
                      <span className="tnum text-caption text-steel">{count}</span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-caption text-slate/70">{cat.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-caption font-semibold text-green-700">
                    Shop
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
