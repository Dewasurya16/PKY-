import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase Server Client — untuk digunakan di Server Components dan Server Actions.
 * Menggunakan cookies untuk mengelola session pengguna pada server.
 * Harus dipanggil di dalam request context (RSC, Server Action, Route Handler).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // `setAll` dipanggil dari Server Component —
            // bisa diabaikan karena middleware akan menangani refresh.
          }
        },
      },
    },
  );
}
