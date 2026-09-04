import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';

export function PageHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="border-b border-cloud bg-cloud/30">
      <div className="shell py-10 lg:py-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-3 text-heading font-black text-teal sm:text-display">{title}</h1>
        {subtitle && <p className="mt-2 max-w-prose text-body text-slate/80">{subtitle}</p>}
      </div>
    </section>
  );
}
