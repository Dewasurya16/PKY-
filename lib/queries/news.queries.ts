import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { News } from "@/lib/types/database";

/**
 * Mengambil semua berita yang dipublikasikan, diurutkan berdasarkan tanggal.
 * Digunakan oleh halaman publik (Server Component).
 */
export async function getPublishedNews(): Promise<News[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch published news: ${error.message}`);
  }

  return data ?? [];
}

/**
 * Mengambil satu berita berdasarkan slug.
 * Digunakan oleh halaman detail berita (Server Component).
 */
export async function getNewsBySlug(slug: string): Promise<News | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    throw new Error(`Failed to fetch news by slug: ${error.message}`);
  }

  return data;
}

/**
 * Mengambil semua berita (termasuk draft) untuk halaman admin.
 * Diurutkan berdasarkan waktu pembuatan terbaru.
 */
export async function getAllNews(): Promise<News[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch all news: ${error.message}`);
  }

  return data ?? [];
}

/**
 * Mengambil satu berita berdasarkan ID.
 * Digunakan oleh form edit di admin panel.
 */
export async function getNewsById(id: string): Promise<News | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch news by ID: ${error.message}`);
  }

  return data;
}
