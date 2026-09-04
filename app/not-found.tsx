import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <Logo variant="icon" className="opacity-60" />
      <div>
        <p className="tnum text-display font-black text-teal">404</p>
        <h1 className="mt-2 text-heading font-black text-ink">Page not found</h1>
        <p className="mt-2 max-w-sm text-body text-slate/70">
          The page you&apos;re looking for has moved or never existed. Let&apos;s get you back on track.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/" variant="green">
          Back to home
        </Button>
        <Button href="/category/deals" variant="outline">
          Shop deals
        </Button>
      </div>
    </div>
  );
}
