import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Utilitas untuk mencatat error (logging).
 * Menggunakan structured console.error dan mencoba menyimpan 
 * ke tabel `system_logs` di Supabase jika tersedia.
 * 
 * @param context - Lokasi atau aksi tempat error terjadi (misal: "POST /api/chat" atau "createNews")
 * @param error - Objek error yang ditangkap
 * @param additionalData - Data tambahan opsional untuk debugging
 */
export async function logError(context: string, error: unknown, additionalData?: Record<string, unknown>) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const stackTrace = error instanceof Error ? error.stack : undefined;

  // 1. Structured console logging (berguna untuk Vercel logs / DataDog / Sentry)
  console.error(JSON.stringify({
    level: "ERROR",
    context,
    message: errorMessage,
    stack: stackTrace,
    data: additionalData,
    timestamp: new Date().toISOString()
  }, null, 2));

  // 2. Simpan ke Supabase system_logs
  try {
    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from('system_logs').insert({
      context,
      message: errorMessage,
      stack: stackTrace,
      additional_data: additionalData,
      created_at: new Date().toISOString()
    });
    
    // Abaikan error 42P01 (relation "system_logs" does not exist) jika tabel belum dibuat
    if (dbError && dbError.code !== '42P01') {
      console.error("[Logger] Failed to save log to Supabase:", dbError.message);
    }
  } catch (e) {
    // Silent fail jika admin client gagal dibuat
  }
}
