import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

interface OrderPayload {
  email: string;
  address: Record<string, string>;
  items: { productId: string; name: string; priceAed: number; qty: number }[];
  subtotal: number;
  shipping: number;
  total: number;
}

/**
 * Creates an order.
 * - If Supabase (service role) is configured, writes an `orders` + `order_items` rows.
 * - Otherwise returns a mock pending order so the flow works with zero backend.
 * Stripe: when NEXT_PUBLIC_ENABLE_STRIPE=true and keys exist, create a Checkout
 * Session here and return its URL instead (integration point marked below).
 */
export async function POST(req: Request) {
  let payload: OrderPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!payload.email || !payload.items?.length) {
    return NextResponse.json({ error: 'Missing email or items' }, { status: 400 });
  }

  const supabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;

  // ── Stripe (test mode) integration point ────────────────────────────────
  // if (process.env.NEXT_PUBLIC_ENABLE_STRIPE === 'true' && process.env.STRIPE_SECRET_KEY) {
  //   const session = await stripe.checkout.sessions.create({ ... });
  //   return NextResponse.json({ url: session.url });
  // }

  if (!supabaseConfigured) {
    // Mock fallback — no backend required.
    return NextResponse.json({
      id: `GU-${Date.now().toString().slice(-8)}`,
      status: 'pending',
      mock: true,
    });
  }

  try {
    const db = createAdminClient();
    const { data: order, error } = await db
      .from('orders')
      .insert({
        status: 'pending',
        email: payload.email,
        subtotal: payload.subtotal,
        shipping: payload.shipping,
        total: payload.total,
        address: payload.address,
      })
      .select('id, status')
      .single();
    if (error) throw error;

    const { error: itemsErr } = await db.from('order_items').insert(
      payload.items.map((i) => ({
        order_id: order.id,
        product_id: i.productId,
        name: i.name,
        price_aed: i.priceAed,
        qty: i.qty,
      })),
    );
    if (itemsErr) throw itemsErr;

    return NextResponse.json({ id: order.id, status: order.status });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Order failed' },
      { status: 500 },
    );
  }
}
