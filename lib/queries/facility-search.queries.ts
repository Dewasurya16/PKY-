import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Facility, FacilityType } from "@/lib/types/database";

/**
 * Mengambil fasilitas berdasarkan tipe (Rumah Sakit Umum, Klinik Pratama, dll).
 * Hanya mengembalikan fasilitas yang tersedia (is_available = true).
 * Digunakan oleh halaman hasil pencarian fasilitas publik.
 *
 * @param type - Tipe fasilitas sesuai enum FACILITY_TYPES
 * @returns Array fasilitas yang sesuai filter
 */
export async function getFacilitiesByType(
  type: FacilityType,
): Promise<Facility[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .eq("type", type)
    .order("name", { ascending: true });

  if (error) {
    console.error("[getFacilitiesByType] Supabase Error:", error);
    throw new Error(`Failed to fetch facilities by type: ${error.message}`);
  }

  return data ?? [];
}
