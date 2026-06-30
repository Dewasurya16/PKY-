import { z } from "zod";
import { FACILITY_TYPES, FACILITY_STATUSES } from "@/lib/types/database";

/**
 * Zod schema untuk validasi input pembuatan fasilitas baru.
 * Digunakan di Server Action `createFacility`.
 */
export const facilityInsertSchema = z.object({
  name: z
    .string()
    .min(1, "Nama fasilitas wajib diisi"),
  type: z.enum(FACILITY_TYPES, {
    message: "Pilih tipe fasilitas yang valid",
  }),
  address: z
    .string()
    .min(1, "Alamat wajib diisi"),
  status: z.enum(FACILITY_STATUSES, {
    message: "Pilih status yang valid",
  }),
  contact: z
    .string()
    .default("-"),
  is_available: z.boolean().default(true),
  description: z
    .string()
    .min(1, "Deskripsi wajib diisi"),
  services: z
    .array(z.string().min(1, "Nama layanan tidak boleh kosong"))
    .default([]),
  latitude: z
    .number()
    .min(-90, "Latitude tidak valid")
    .max(90, "Latitude tidak valid")
    .nullable()
    .default(null),
  longitude: z
    .number()
    .min(-180, "Longitude tidak valid")
    .max(180, "Longitude tidak valid")
    .nullable()
    .default(null),
});

/**
 * Zod schema untuk validasi input update fasilitas.
 * Semua field opsional.
 */
export const facilityUpdateSchema = facilityInsertSchema.partial();

export type FacilityInsertInput = z.infer<typeof facilityInsertSchema>;
export type FacilityUpdateInput = z.infer<typeof facilityUpdateSchema>;
