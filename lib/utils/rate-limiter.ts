/**
 * In-memory sliding window rate limiter.
 *
 * Dirancang untuk deployment single-instance (Vercel Serverless/Node).
 * Menggunakan pola sliding window agar pembatasan terasa adil —
 * pengguna tidak "terblokir mendadak" di awal window baru.
 *
 * Untuk deployment multi-instance (horizontal scaling), ganti
 * implementasi ini dengan Upstash Redis atau sejenis.
 *
 * @module lib/utils/rate-limiter
 */

/** Catatan timestamp request untuk satu identifier. */
type RequestLog = {
  /** Array timestamp (ms) dari request sebelumnya. */
  timestamps: number[];
};

/** Konfigurasi rate limiter. */
interface RateLimiterConfig {
  /** Jumlah maksimum request yang diizinkan dalam window. */
  maxRequests: number;
  /** Durasi window dalam milidetik. */
  windowMs: number;
}

/** Hasil pengecekan rate limit. */
interface RateLimitResult {
  /** Apakah request diizinkan. */
  allowed: boolean;
  /** Sisa request yang diizinkan dalam window aktif. */
  remaining: number;
  /** Waktu (detik) hingga window berikutnya — hanya set jika diblokir. */
  retryAfterSeconds: number;
}

/**
 * Membuat instance rate limiter dengan konfigurasi tertentu.
 *
 * @example
 * ```ts
 * const limiter = createRateLimiter({ maxRequests: 10, windowMs: 60_000 });
 * const result = limiter.check("user-ip-address");
 * if (!result.allowed) {
 *   return new Response("Too many requests", { status: 429 });
 * }
 * ```
 *
 * @param config - Konfigurasi limit dan window
 * @returns Object dengan method `check` untuk memvalidasi request
 */
export function createRateLimiter(config: RateLimiterConfig) {
  const store = new Map<string, RequestLog>();

  // Pembersihan otomatis setiap 5 menit untuk mencegah memory leak
  const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

  /**
   * Menghapus entry yang sudah kadaluarsa dari store.
   * Berjalan secara periodik untuk menjaga footprint memori tetap rendah.
   */
  function cleanup() {
    const now = Date.now();
    for (const [key, log] of store.entries()) {
      // Hapus timestamps yang sudah di luar window
      log.timestamps = log.timestamps.filter(
        (ts) => now - ts < config.windowMs,
      );
      // Hapus entry kosong
      if (log.timestamps.length === 0) {
        store.delete(key);
      }
    }
  }

  // Jalankan cleanup secara periodik (hanya di server runtime Node.js)
  if (typeof globalThis !== "undefined") {
    const interval = setInterval(cleanup, CLEANUP_INTERVAL_MS);
    // Pastikan interval tidak menahan process dari exit
    if (interval.unref) interval.unref();
  }

  return {
    /**
     * Memeriksa apakah identifier masih dalam batas rate limit.
     * Jika diizinkan, timestamp saat ini dicatat ke window.
     *
     * @param identifier - Kunci unik (biasanya IP address atau user ID)
     * @returns Hasil pengecekan: allowed, remaining, retryAfterSeconds
     */
    check(identifier: string): RateLimitResult {
      const now = Date.now();
      const windowStart = now - config.windowMs;

      // Ambil atau buat log untuk identifier ini
      let log = store.get(identifier);
      if (!log) {
        log = { timestamps: [] };
        store.set(identifier, log);
      }

      // Buang timestamps yang sudah kadaluarsa (di luar sliding window)
      log.timestamps = log.timestamps.filter((ts) => ts > windowStart);

      // Cek apakah masih dalam batas
      if (log.timestamps.length >= config.maxRequests) {
        // Hitung waktu hingga timestamp tertua keluar dari window
        const oldestInWindow = log.timestamps[0];
        const retryAfterMs = oldestInWindow + config.windowMs - now;
        const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);

        return {
          allowed: false,
          remaining: 0,
          retryAfterSeconds: Math.max(retryAfterSeconds, 1),
        };
      }

      // Izinkan dan catat timestamp
      log.timestamps.push(now);

      return {
        allowed: true,
        remaining: config.maxRequests - log.timestamps.length,
        retryAfterSeconds: 0,
      };
    },
  };
}

/**
 * Mengekstrak IP address dari NextRequest.
 * Prioritas: x-forwarded-for → x-real-ip → fallback "anonymous".
 *
 * @param headers - Headers dari incoming request
 * @returns IP address string
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for bisa berisi "client, proxy1, proxy2"
    return forwarded.split(",")[0].trim();
  }

  return headers.get("x-real-ip") ?? "anonymous";
}
