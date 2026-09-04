'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, User, Heart, ShoppingCart, ChevronDown, Phone } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { SearchBar } from './SearchBar';
import { categories, subCategories } from '@/data/categories';
import { useCart } from '@/lib/cart-store';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const openCart = useCart((s) => s.open);

  return (
    <header className="sticky top-0 z-40 border-b border-cloud bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Top row */}
      <div className="shell flex h-16 items-center gap-4 lg:h-20">
        <button
          className="-ml-2 rounded p-2 text-teal lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <Link href="/" aria-label="Gear-Up.me home" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden flex-1 lg:block">
          <SearchBar className="mx-auto max-w-xl" />
        </div>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Account and cart">
          <Link
            href="/account"
            className="hidden flex-col items-center rounded px-2 py-1 text-caption text-teal hover:text-green-700 sm:flex"
          >
            <User size={20} />
            <span className="mt-0.5 hidden md:block">Account</span>
          </Link>
          <Link
            href="/account?tab=wishlist"
            className="hidden flex-col items-center rounded px-2 py-1 text-caption text-teal hover:text-green-700 sm:flex"
          >
            <Heart size={20} />
            <span className="mt-0.5 hidden md:block">Wishlist</span>
          </Link>
          <button
            onClick={openCart}
            className="relative flex flex-col items-center rounded px-2 py-1 text-caption text-teal hover:text-green-700"
            aria-label={`Cart, ${count} items`}
          >
            <span className="relative">
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="tnum absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-pill bg-green px-1 text-[0.6rem] font-bold text-ink">
                  {count}
                </span>
              )}
            </span>
            <span className="mt-0.5 hidden md:block">Cart</span>
          </button>
        </nav>
      </div>

      {/* Mobile search */}
      <div className="shell pb-3 lg:hidden">
        <SearchBar />
      </div>

      {/* Category nav w/ mega-menu (desktop) */}
      <nav className="hidden border-t border-cloud lg:block" aria-label="Product categories">
        <div className="shell flex items-center gap-1">
          {categories.map((cat) => (
            <div key={cat.slug} className="group relative">
              <Link
                href={`/category/${cat.slug}`}
                className="flex items-center gap-1 px-3 py-3 text-body font-medium text-teal transition-colors hover:text-green-700 group-hover:text-green-700"
              >
                {cat.name}
                {subCategories[cat.slug] && (
                  <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                )}
              </Link>
              {/* underline on hover */}
              <span className="absolute inset-x-3 bottom-0 h-0.5 origin-left scale-x-0 bg-green transition-transform duration-200 group-hover:scale-x-100" />
              {subCategories[cat.slug] && (
                <div className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-1 rounded-btn border border-cloud bg-white p-2 opacity-0 shadow-card-hover transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {subCategories[cat.slug].map((sub) => (
                    <Link
                      key={sub}
                      href={`/category/${cat.slug}?filter=${encodeURIComponent(sub)}`}
                      className="block rounded px-3 py-2 text-body text-slate hover:bg-teal-tint hover:text-teal"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/category/deals"
            className="ml-auto flex items-center gap-1 px-3 py-3 text-body font-semibold text-orange-600 hover:text-orange"
          >
            Special Deals
          </Link>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-[86%] max-w-sm animate-fade-in flex-col bg-white shadow-card-hover">
            <div className="flex items-center justify-between border-b border-cloud p-4">
              <Logo />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-1 text-teal">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded px-3 py-3 text-subhead font-semibold text-teal hover:bg-teal-tint"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/category/deals"
                onClick={() => setMobileOpen(false)}
                className="block rounded px-3 py-3 text-subhead font-semibold text-orange-600 hover:bg-orange-tint"
              >
                Special Deals
              </Link>
              <Link
                href="/build-pc"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-btn bg-green px-3 py-3 text-center text-body font-semibold text-ink"
              >
                Build your PC
              </Link>
            </div>
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 border-t border-cloud p-4 text-body font-medium text-teal"
            >
              <Phone size={18} className="text-green-700" /> {site.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
