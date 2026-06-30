import { z } from "zod";
import { DOWNLOAD_CATEGORIES } from "@/lib/types/database";

/**
 * Zod schema untuk validasi input pembuatan dokumen unduhan baru.
 * Digunakan di Server Action `createDownload`.
 */
export const downloadInsertSchema = z.object({
  title: z
    .string()
    .min(1, "Judul wajib diisi"),
  description: z
    .string()
    .min(1, "Deskripsi wajib diisi"),
  file_size: z
    .string()
    .min(1, "Ukuran file wajib diisi"),
  file_type: z
    .string()
    .min(1, "Tipe file wajib diisi")
    .default("PDF"),
  category: z.enum(DOWNLOAD_CATEGORIES, {
    message: "Pilih kategori yang valid",
  }),
  sort_order: z
    .number()
    .int("Urutan harus bilangan bulat")
    .min(0, "Urutan minimal 0")
    .default(0),
  is_published: z.boolean().default(true),
});

/**
 * Zod schema untuk validasi input update dokumen unduhan.
 * Semua field opsional.
 */
export const downloadUpdateSchema = downloadInsertSchema.partial();

export type DownloadInsertInput = z.infer<typeof downloadInsertSchema>;
export type DownloadUpdateInput = z.infer<typeof downloadUpdateSchema>;
