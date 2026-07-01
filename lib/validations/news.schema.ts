import { z } from "zod";
import { NEWS_CATEGORIES } from "@/lib/types/database";

/**
 * Zod schema untuk validasi input pembuatan berita baru.
 * Digunakan di Server Action `createNews`.
 */
export const newsInsertSchema = z.object({
  title: z
    .string()
    .min(1, "Judul wajib diisi")
    .max(255, "Judul terlalu panjang (maks. 255)"),
  excerpt: z
    .string()
    .min(1, "Ringkasan wajib diisi")
    .max(500, "Ringkasan terlalu panjang (maks. 500)"),
  content: z
    .string()
    .min(1, "Konten wajib diisi")
    .max(50000, "Konten terlalu panjang"),
  category: z.enum(NEWS_CATEGORIES, {
    message: "Pilih kategori yang valid",
  }),
  published_at: z
    .string()
    .optional(),
  is_published: z.boolean().default(false),
});

/**
 * Zod schema untuk validasi input update berita.
 * Semua field opsional — hanya field yang dikirim yang divalidasi.
 */
export const newsUpdateSchema = newsInsertSchema.partial();

export type NewsInsertInput = z.infer<typeof newsInsertSchema>;
export type NewsUpdateInput = z.infer<typeof newsUpdateSchema>;
