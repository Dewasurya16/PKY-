import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase Browser Client — untuk digunakan di Client Components.
 * Membuat instance baru setiap kali dipanggil (Supabase SDK melakukan
 * deduplication internal melalui singleton pattern berbasis URL).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
