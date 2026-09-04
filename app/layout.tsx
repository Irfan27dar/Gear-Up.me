import type { Metadata } from 'next';
import { montserrat, jetbrainsMono } from '@/lib/fonts';
import { site } from '@/lib/site';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | PCs, Components & Custom Builds in the UAE`,
    template: `%s | ${site.name}`,
  },
  description:
    'Buy genuine PCs, laptops, monitors, graphics cards, components, networking and peripherals in the UAE. Same-day delivery, 24-month warranty and custom PC builds from Gear-Up.me, Dubai.',
  keywords: [
    'computer components Dubai',
    'gaming PC UAE',
    'graphics cards Dubai',
    'custom PC build UAE',
    'laptops Dubai',
    'Gear-Up.me',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: site.url,
    siteName: site.name,
    title: `${site.fullName}`,
    description:
      'Genuine PCs, components and custom builds with same-day UAE delivery and 24-month warranty.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
