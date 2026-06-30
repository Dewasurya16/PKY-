import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Download } from "@/lib/types/database";

/**
 * Mengambil semua dokumen unduhan yang dipublikasikan.
 * Digunakan oleh halaman publik (Server Component).
 */
export async function getPublishedDownloads(): Promise<Download[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("downloads")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch published downloads: ${error.message}`);
  }

  return data ?? [];
}

/**
 * Mengambil semua dokumen unduhan untuk halaman admin.
 * Termasuk yang belum dipublikasikan.
 */
export async function getAllDownloads(): Promise<Download[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("downloads")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch all downloads: ${error.message}`);
  }

  return data ?? [];
}

/**
 * Mengambil satu dokumen unduhan berdasarkan ID.
 * Digunakan oleh form edit di admin panel.
 */
export async function getDownloadById(id: string): Promise<Download | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("downloads")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch download by ID: ${error.message}`);
  }

  return data;
}
