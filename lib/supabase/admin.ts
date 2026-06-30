import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Admin Client — menggunakan Service Role Key.
 * HANYA untuk operasi server-side yang melewati RLS (Row Level Security).
 * JANGAN pernah mengekspos client ini di kode client-side.
 *
 * Ditandai dengan `import "server-only"` agar bundler error jika
 * file ini diimpor dari Client Component.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase admin credentials. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
