import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Facility } from "@/lib/types/database";

/**
 * Mengambil semua fasilitas yang tersedia.
 * Digunakan oleh halaman publik (Server Component).
 */
export async function getAvailableFacilities(): Promise<Facility[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch available facilities: ${error.message}`);
  }

  return data ?? [];
}

/**
 * Mengambil satu fasilitas berdasarkan slug.
 * Digunakan oleh halaman detail fasilitas (Server Component).
 */
export async function getFacilityBySlug(slug: string): Promise<Facility | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch facility by slug: ${error.message}`);
  }

  return data;
}

/**
 * Mengambil semua fasilitas untuk halaman admin.
 * Termasuk fasilitas yang tidak tersedia.
 */
export async function getAllFacilities(): Promise<Facility[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch all facilities: ${error.message}`);
  }

  return data ?? [];
}

/**
 * Mengambil satu fasilitas berdasarkan ID.
 * Digunakan oleh form edit di admin panel.
 */
export async function getFacilityById(id: string): Promise<Facility | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch facility by ID: ${error.message}`);
  }

  return data;
}
