"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { newsInsertSchema, newsUpdateSchema } from "@/lib/validations/news.schema";
import { slugify } from "@/lib/utils/slugify";
import { logError } from "@/lib/utils/logger";
import type { ActionState } from "@/lib/types/database";
import { STORAGE_BUCKETS, MAX_FILE_SIZES, ACCEPTED_IMAGE_TYPES } from "@/lib/types/database";

/**
 * Server Action: Membuat berita baru.
 * Termasuk upload gambar thumbnail ke Supabase Storage.
 */
export async function createNews(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();

  // 1. Parse field dari FormData
  const rawInput = {
    title: formData.get("title") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    published_at: formData.get("published_at") as string || undefined,
    is_published: formData.get("is_published") === "true",
  };

  // 2. Validasi dengan Zod
  const parsed = newsInsertSchema.safeParse(rawInput);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path.join(".");
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    }
    await logError("createNews - Validation Failed", parsed.error.flatten());
    return { success: false, error: "Validasi gagal", fieldErrors };
  }

  // 3. Generate slug
  const slug = slugify(parsed.data.title);

  // 4. Upload gambar jika ada
  let imageUrl: string | null = null;
  const imageFile = formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    // Validasi file server-side
    if (imageFile.size > MAX_FILE_SIZES.IMAGE) {
      return { success: false, error: "Ukuran gambar maksimal 5 MB" };
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(imageFile.type as typeof ACCEPTED_IMAGE_TYPES[number])) {
      return { success: false, error: "Format gambar harus JPG, PNG, atau WebP" };
    }

    const ext = imageFile.name.split(".").pop() ?? "jpg";
    const fileName = `${slug}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.NEWS_IMAGES)
      .upload(fileName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return { success: false, error: `Gagal upload gambar: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS.NEWS_IMAGES)
      .getPublicUrl(fileName);

    imageUrl = urlData.publicUrl;
  }

  // 5. Insert ke database
  const insertPayload = {
    ...parsed.data,
    slug,
    image_url: imageUrl,
    published_at: parsed.data.published_at ?? new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("news")
    .insert(insertPayload)
    .select("id, slug")
    .single();

  if (error) {
    await logError("createNews - Supabase Insert Error", error);
    return { success: false, error: `Gagal menyimpan berita: ${error.message}` };
  }

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");

  return { success: true, data: { id: data.id, slug: data.slug } };
}

/**
 * Server Action: Mengupdate berita yang sudah ada.
 */
export async function updateNews(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  const id = formData.get("id") as string;

  if (!id) {
    return { success: false, error: "ID berita tidak ditemukan" };
  }

  // 1. Parse field
  const rawInput = {
    title: formData.get("title") as string || undefined,
    excerpt: formData.get("excerpt") as string || undefined,
    content: formData.get("content") as string || undefined,
    category: formData.get("category") as string || undefined,
    published_at: formData.get("published_at") as string || undefined,
    is_published: formData.has("is_published")
      ? formData.get("is_published") === "true"
      : undefined,
  };

  // Hapus field undefined agar partial validation bekerja
  const cleanedInput = Object.fromEntries(
    Object.entries(rawInput).filter(([, v]) => v !== undefined),
  );

  // 2. Validasi
  const parsed = newsUpdateSchema.safeParse(cleanedInput);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path.join(".");
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    }
    return { success: false, error: "Validasi gagal", fieldErrors };
  }

  // 3. Re-generate slug jika title berubah
  const updatePayload: Record<string, unknown> = { ...parsed.data };
  if (parsed.data.title) {
    updatePayload.slug = slugify(parsed.data.title);
  }

  // 4. Handle image upload/replace
  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    if (imageFile.size > MAX_FILE_SIZES.IMAGE) {
      return { success: false, error: "Ukuran gambar maksimal 5 MB" };
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(imageFile.type as typeof ACCEPTED_IMAGE_TYPES[number])) {
      return { success: false, error: "Format gambar harus JPG, PNG, atau WebP" };
    }

    // Hapus gambar lama jika ada
    const oldImagePath = formData.get("old_image_path") as string | null;
    if (oldImagePath) {
      await supabase.storage
        .from(STORAGE_BUCKETS.NEWS_IMAGES)
        .remove([oldImagePath]);
    }

    const slug = (updatePayload.slug as string) ?? id;
    const ext = imageFile.name.split(".").pop() ?? "jpg";
    const fileName = `${slug}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.NEWS_IMAGES)
      .upload(fileName, imageFile, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      return { success: false, error: `Gagal upload gambar: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS.NEWS_IMAGES)
      .getPublicUrl(fileName);

    updatePayload.image_url = urlData.publicUrl;
  }

  updatePayload.updated_at = new Date().toISOString();

  // 5. Update database
  const { error, data } = await supabase
    .from("news")
    .update(updatePayload)
    .eq("id", id)
    .select();

  if (error) {
    await logError("updateNews - Supabase Update Error", error);
    return { success: false, error: `Gagal update berita: ${error.message}` };
  }

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");

  return { success: true, data: { id } };
}

/**
 * Server Action: Menghapus berita berdasarkan ID.
 */
export async function deleteNews(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  const id = formData.get("id") as string;

  if (!id) {
    return { success: false, error: "ID berita tidak ditemukan" };
  }

  // Hapus gambar dari storage terlebih dahulu
  const imagePath = formData.get("image_path") as string | null;
  if (imagePath) {
    await supabase.storage
      .from(STORAGE_BUCKETS.NEWS_IMAGES)
      .remove([imagePath]);
  }

  const { error } = await supabase
    .from("news")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: `Gagal menghapus berita: ${error.message}` };
  }

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");

  return { success: true, data: { id } };
}
