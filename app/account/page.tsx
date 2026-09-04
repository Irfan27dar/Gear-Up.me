'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, LogOut, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

type Tab = 'profile' | 'orders' | 'addresses' | 'wishlist';
interface OrderRow {
  id: string;
  status: string;
  total: number;
  created_at: string;
}

export default function AccountPage() {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [tab, setTab] = useState<Tab>('profile');

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        setEmail(data.user.email ?? null);
        setName((data.user.user_metadata?.name as string) ?? '');
        const { data: orderRows } = await supabase
          .from('orders')
          .select('id, status, total, created_at')
          .order('created_at', { ascending: false });
        setOrders(orderRows ?? []);
      }
      setLoading(false);
    });
  }, [configured]);

  async function signOut() {
    if (!configured) return;
    await createClient().auth.signOut();
    router.push('/');
    router.refresh();
  }

  if (loading) {
    return (
      <div className="shell py-16">
        <div className="mx-auto h-64 max-w-2xl animate-pulse rounded-btn bg-cloud" />
      </div>
    );
  }

  if (!email) {
    return (
      <div className="shell py-12">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />
        <div className="mt-8">
          <EmptyState
            icon={User}
            title="Sign in to your account"
            description={
              configured
                ? 'Access your orders, saved addresses and wishlist.'
                : 'Accounts activate once Supabase is connected (see README). You can still shop as a guest.'
            }
            action={{ href: '/login', label: 'Sign in' }}
          />
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'orders', label: 'Orders', icon: Package },
    { key: 'addresses', label: 'Addresses', icon: MapPin },
    { key: 'wishlist', label: 'Wishlist', icon: Heart },
  ];

  return (
    <div className="shell py-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />
      <h1 className="mt-4 text-heading font-black text-teal sm:text-display">My account</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside>
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  'flex items-center gap-2 rounded-btn px-4 py-2.5 text-body font-medium transition-colors',
                  tab === t.key ? 'bg-teal text-white' : 'text-slate hover:bg-teal-tint hover:text-teal',
                )}
              >
                <t.icon size={17} /> {t.label}
              </button>
            ))}
            <button
              onClick={signOut}
              className="flex items-center gap-2 rounded-btn px-4 py-2.5 text-body font-medium text-orange-600 hover:bg-orange-tint"
            >
              <LogOut size={17} /> Sign out
            </button>
          </nav>
        </aside>

        <div className="rounded-btn border border-cloud bg-white p-6">
          {tab === 'profile' && (
            <div>
              <h2 className="text-subhead font-bold text-teal">Profile</h2>
              <dl className="mt-4 space-y-3 text-body">
                <div>
                  <dt className="text-caption text-steel">Name</dt>
                  <dd className="font-semibold text-ink">{name || '—'}</dd>
                </div>
                <div>
                  <dt className="text-caption text-steel">Email</dt>
                  <dd className="font-semibold text-ink">{email}</dd>
                </div>
              </dl>
            </div>
          )}
          {tab === 'orders' && (
            <div>
              <h2 className="mb-4 text-subhead font-bold text-teal">Order history</h2>
              {orders.length === 0 ? (
                <EmptyState
                  icon={Package}
                  title="No orders yet"
                  description="When you place an order it'll show up here."
                  action={{ href: '/category/deals', label: 'Start shopping' }}
                />
              ) : (
                <ul className="divide-y divide-cloud">
                  {orders.map((o) => (
                    <li key={o.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="tnum text-body font-semibold text-ink">#{o.id.slice(0, 8)}</p>
                        <p className="text-caption text-steel">
                          {new Date(o.created_at).toLocaleDateString('en-AE')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="tnum font-bold text-teal">AED {o.total.toLocaleString()}</p>
                        <p className="text-caption capitalize text-green-700">{o.status}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {tab === 'addresses' && (
            <EmptyState icon={MapPin} title="No saved addresses" description="Add an address at checkout to reuse it later." />
          )}
          {tab === 'wishlist' && (
            <EmptyState
              icon={Heart}
              title="Your wishlist is empty"
              description="Save products you love to find them again fast."
              action={{ href: '/', label: 'Browse products' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
