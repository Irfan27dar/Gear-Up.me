import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { site } from '@/lib/site';
import { categories } from '@/data/categories';

const helpLinks = [
  { label: 'Contact us', href: '/contact' },
  { label: 'Shipping guide', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Build your PC', href: '/build-pc' },
];

const companyLinks = [
  { label: 'About us', href: '/about' },
  { label: 'Terms & conditions', href: '/terms' },
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Special deals', href: '/category/deals' },
];

export function Footer() {
  return (
    <footer className="bg-dark-ground text-white/70">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo variant="reversed" />
          <p className="mt-4 max-w-xs text-caption leading-relaxed">
            Genuine computer components, laptops and custom PCs across the UAE since {site.founded}.
            {' '}
            {site.legalEntity}.
          </p>
          <ul className="mt-5 space-y-2.5 text-caption">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-green" /> {site.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0 text-green" />
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="shrink-0 text-green" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <FooterColumn title="Shop">
          {categories.slice(0, 6).map((c) => (
            <FooterLink key={c.slug} href={`/category/${c.slug}`}>
              {c.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Help">
          {helpLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          {companyLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
          <div className="mt-4 flex gap-3">
            <SocialIcon href={site.social.instagram} label="Instagram">
              <Instagram size={18} />
            </SocialIcon>
            <SocialIcon href={site.social.facebook} label="Facebook">
              <Facebook size={18} />
            </SocialIcon>
            <SocialIcon href={site.social.linkedin} label="LinkedIn">
              <Linkedin size={18} />
            </SocialIcon>
          </div>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <p className="text-caption text-white/50">
            © {new Date().getFullYear()} {site.fullName}. {site.legalEntity}. All rights reserved.
          </p>
          <div className="flex items-center gap-2" aria-label="Accepted payment methods">
            {['VISA', 'Mastercard', 'AMEX', 'Apple Pay', 'Tabby'].map((m) => (
              <span
                key={m}
                className="rounded border border-white/15 bg-white/5 px-2 py-1 text-[0.6rem] font-semibold text-white/60"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label mb-4 !text-white">{title}</h3>
      <ul className="space-y-2.5 text-caption">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-9 w-9 place-items-center rounded-btn border border-white/15 text-white/70 transition-colors hover:border-green hover:text-green"
    >
      {children}
    </a>
  );
}
