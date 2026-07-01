import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { McuSchedule, McuRegistration } from "@/lib/types/database";

/**
 * Mengambil jadwal MCU hari ini dari tabel `mcu_schedules`.
 * Melakukan JOIN ke tabel `facilities` untuk mendapatkan nama fasilitas.
 * Digunakan sebagai konteks dinamis untuk chatbot AI PKY.
 *
 * @returns Array jadwal MCU hari ini, kosong jika tidak ada atau tabel belum dibuat
 */
export async function getMcuSchedulesToday(): Promise<McuSchedule[]> {
  const supabase = createAdminClient();

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const { data, error } = await supabase
    .from("mcu_schedules")
    .select(`
      *,
      facilities ( name )
    `)
    .eq("schedule_date", today)
    .eq("is_active", true)
    .order("time_start", { ascending: true });

  if (error) {
    // Jika tabel belum dibuat, return array kosong tanpa throw
    if (error.code === "42P01" || error.message.includes("does not exist")) {
      console.warn("[getMcuSchedulesToday] Table mcu_schedules does not exist yet. Returning empty.");
      return [];
    }
    console.error("[getMcuSchedulesToday] Supabase Error:", error);
    return [];
  }

  // Map hasil JOIN ke format flat McuSchedule
  return (data ?? []).map((row: Record<string, unknown>) => ({
    ...row,
    facility_name: (row.facilities as { name: string } | null)?.name ?? "Unknown",
  })) as McuSchedule[];
}

/**
 * Mengambil semua jadwal MCU aktif (untuk admin panel masa depan).
 *
 * @returns Array semua jadwal MCU aktif
 */
export async function getAllMcuSchedules(): Promise<McuSchedule[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("mcu_schedules")
    .select(`
      *,
      facilities ( name )
    `)
    .eq("is_active", true)
    .order("schedule_date", { ascending: true });

  if (error) {
    if (error.code === "42P01" || error.message.includes("does not exist")) {
      return [];
    }
    console.error("[getAllMcuSchedules] Supabase Error:", error);
    return [];
  }

  return (data ?? []).map((row: Record<string, unknown>) => ({
    ...row,
    facility_name: (row.facilities as { name: string } | null)?.name ?? "Unknown",
  })) as McuSchedule[];
}

/**
 * Mengambil semua data pendaftaran MCU beserta relasi jadwal dan fasilitas.
 */
export async function getAllMcuRegistrations() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("mcu_registrations")
    .select(`
      *,
      mcu_schedules (
        schedule_date,
        facilities ( name )
      )
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    if (error.code === "42P01" || error.message.includes("does not exist")) {
      return [];
    }
    console.error("[getAllMcuRegistrations] Supabase Error:", error);
    return [];
  }

  return (data ?? []).map((row: Record<string, any>) => ({
    ...row,
    schedule_date: row.mcu_schedules?.schedule_date ?? "Unknown",
    facility_name: row.mcu_schedules?.facilities?.name ?? "Unknown",
  })) as McuRegistration[];
}
