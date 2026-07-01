import { z } from "zod";

export const mcuInsertSchema = z.object({
  facility_id: z.string().uuid("Pilih fasilitas yang valid"),
  schedule_date: z.string().min(1, "Tanggal jadwal wajib diisi"),
  time_start: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format jam mulai tidak valid (HH:MM)"),
  time_end: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format jam selesai tidak valid (HH:MM)"),
  quota: z.coerce.number().min(1, "Kuota minimal 1"),
  description: z.string().max(2000, "Deskripsi terlalu panjang").optional(),
});

export const mcuUpdateSchema = mcuInsertSchema.partial();
