import { Cpu, ArrowRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { builds } from '@/data/builds';

export function BuildBanner() {
  const featured = builds.slice(0, 3);
  return (
    <section className="relative overflow-hidden bg-dark-ground py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-[80%] -translate-x-1/2 rounded-full bg-green/10 blur-[120px]" />
      </div>
      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label mb-3 inline-flex items-center gap-2 text-green">
            <Wrench size={14} /> Custom PC builds
          </p>
          <h2 className="text-display font-black text-white sm:text-[2.5rem]">
            Built to order, tested in Dubai.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-subhead text-white/70">
            Pick a proven configuration or tell us your budget and use case — we&apos;ll build,
            cable-manage and stress-test it before it ships.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featured.map((build, i) => (
            <Reveal key={build.slug} as="article" delay={i * 80}>
              <div className="group flex h-full flex-col rounded-btn border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-green/40">
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-btn bg-green/15 text-green">
                    <Cpu size={22} strokeWidth={1.7} />
                  </span>
                  {build.discountPct > 0 && (
                    <span className="tnum rounded-pill bg-orange px-2.5 py-1 text-caption font-bold text-orange-text">
                      −{build.discountPct}%
                    </span>
                  )}
                </div>
                <h3 className="text-subhead font-bold text-white">{build.name}</h3>
                <p className="mt-1 text-caption text-white/60">{build.cpu}</p>
                <ul className="mt-4 space-y-1.5">
                  {build.specs.slice(0, 4).map((s) => (
                    <li key={s} className="text-caption text-white/70">
                      • {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="tnum">
                    <span className="text-caption text-white/50">From </span>
                    <span className="text-subhead font-black text-white">
                      AED {new Intl.NumberFormat('en-AE').format(build.priceAed)}
                    </span>
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-green transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/build-pc" variant="green" size="lg">
            Build your PC <ArrowRight size={18} />
          </Button>
          <Button
            href="/category/custom-pcs"
            variant="outline"
            size="lg"
            className="border-white/20 !bg-white/5 !text-white hover:!bg-white/10"
          >
            Browse pre-built rigs
          </Button>
        </div>
      </div>
    </section>
  );
}
