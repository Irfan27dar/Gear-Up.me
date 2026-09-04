import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

/** Records a custom PC build request. Falls back to a no-op success with no backend. */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, phone, useCase, budgetAed, notes } = body as Record<string, string>;
  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  const configured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!configured) {
    return NextResponse.json({ ok: true, mock: true });
  }

  try {
    const db = createAdminClient();
    const { error } = await db.from('build_requests').insert({
      name,
      email,
      phone: phone ?? null,
      use_case: useCase ?? null,
      budget_aed: budgetAed ? Number(budgetAed) : null,
      notes: notes ?? null,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Request failed' },
      { status: 500 },
    );
  }
}
