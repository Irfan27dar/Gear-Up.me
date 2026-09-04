import { createClient } from '@supabase/supabase-js';

/**
 * Service-role client — SERVER ONLY. Bypasses RLS.
 * Used for the seed script and guest checkout / build-request writes.
 * Never import this into a client component.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
