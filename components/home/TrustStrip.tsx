import { BadgeCheck, ShieldCheck, Truck, Lock } from 'lucide-react';

const items = [
  { icon: BadgeCheck, title: '100% Genuine', copy: 'Authentic, sealed stock only' },
  { icon: ShieldCheck, title: '24-Month Warranty', copy: 'Real regional coverage' },
  { icon: Truck, title: 'Same-Day Delivery', copy: 'Across the UAE on in-stock items' },
  { icon: Lock, title: 'Secure Payment', copy: 'Encrypted checkout' },
];

export function TrustStrip() {
  return (
    <section className="border-y border-cloud bg-white" aria-label="Why shop with Gear-Up.me">
      <div className="shell grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
        {items.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-center gap-3 py-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-teal-tint text-teal">
              <Icon size={20} strokeWidth={1.7} />
            </span>
            <div className="min-w-0">
              <p className="text-body font-bold text-ink">{title}</p>
              <p className="truncate text-caption text-slate/70">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
