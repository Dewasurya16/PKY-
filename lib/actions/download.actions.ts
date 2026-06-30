"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { downloadInsertSchema, downloadUpdateSchema } from "@/lib/validations/download.schema";
import type { ActionState } from "@/lib/types/database";
import { STORAGE_BUCKETS, MAX_FILE_SIZES, ACCEPTED_DOCUMENT_TYPES } from "@/lib/types/database";

/**
 * Menghitung ukuran file dalam format human-readable.
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Server Action: Membuat dokumen unduhan baru.
 * Termasuk upload file PDF/DOCX ke Supabase Storage.
 */
export async function createDownload(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();

  // 1. Upload file terlebih dahulu (wajib untuk dokumen baru)
  const docFile = formData.get("file") as File | null;
  if (!docFile || docFile.size === 0) {
    return { success: false, error: "File dokumen wajib diunggah" };
  }

  if (docFile.size > MAX_FILE_SIZES.DOCUMENT) {
    return { success: false, error: "Ukuran dokumen maksimal 25 MB" };
  }

  if (!ACCEPTED_DOCUMENT_TYPES.includes(docFile.type as typeof ACCEPTED_DOCUMENT_TYPES[number])) {
    return { success: false, error: "Format file harus PDF atau DOCX" };
  }

  // 2. Parse dan validasi metadata
  const ext = docFile.name.split(".").pop()?.toUpperCase() ?? "PDF";
  const rawInput = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    file_size: formatFileSize(docFile.size),
    file_type: ext,
    category: formData.get("category") as string,
    sort_order: Number(formData.get("sort_order") ?? 0),
    is_published: formData.get("is_published") === "true",
  };

  const parsed = downloadInsertSchema.safeParse(rawInput);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path.join(".");
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    }
    return { success: false, error: "Validasi gagal", fieldErrors };
  }

  // 3. Upload file ke storage
  const fileName = `${Date.now()}-${docFile.name.replace(/\s+/g, "-")}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKETS.DOCUMENTS)
    .upload(fileName, docFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return { success: false, error: `Gagal upload dokumen: ${uploadError.message}` };
  }

  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKETS.DOCUMENTS)
    .getPublicUrl(fileName);

  // 4. Insert ke database
  const { data, error } = await supabase
    .from("downloads")
    .insert({
      ...parsed.data,
      file_url: urlData.publicUrl,
    })
    .select("id")
    .single();

  if (error) {
    return { success: false, error: `Gagal menyimpan dokumen: ${error.message}` };
  }

  revalidatePath("/admin/unduhan");
  revalidatePath("/");

  return { success: true, data: { id: data.id } };
}

/**
 * Server Action: Mengupdate dokumen unduhan yang sudah ada.
 */
export async function updateDownload(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  const id = formData.get("id") as string;

  if (!id) {
    return { success: false, error: "ID dokumen tidak ditemukan" };
  }

  // 1. Parse metadata
  const rawInput = {
    title: formData.get("title") as string || undefined,
    description: formData.get("description") as string || undefined,
    category: formData.get("category") as string || undefined,
    sort_order: formData.has("sort_order")
      ? Number(formData.get("sort_order"))
      : undefined,
    is_published: formData.has("is_published")
      ? formData.get("is_published") === "true"
      : undefined,
  };

  const cleanedInput = Object.fromEntries(
    Object.entries(rawInput).filter(([, v]) => v !== undefined),
  );

  const parsed = downloadUpdateSchema.safeParse(cleanedInput);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path.join(".");
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    }
    return { success: false, error: "Validasi gagal", fieldErrors };
  }

  const updatePayload: Record<string, unknown> = { ...parsed.data };

  // 2. Handle file replacement
  const docFile = formData.get("file") as File | null;
  if (docFile && docFile.size > 0) {
    if (docFile.size > MAX_FILE_SIZES.DOCUMENT) {
      return { success: false, error: "Ukuran dokumen maksimal 25 MB" };
    }

    // Hapus file lama
    const oldFilePath = formData.get("old_file_path") as string | null;
    if (oldFilePath) {
      await supabase.storage
        .from(STORAGE_BUCKETS.DOCUMENTS)
        .remove([oldFilePath]);
    }

    const fileName = `${Date.now()}-${docFile.name.replace(/\s+/g, "-")}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.DOCUMENTS)
      .upload(fileName, docFile, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      return { success: false, error: `Gagal upload dokumen: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS.DOCUMENTS)
      .getPublicUrl(fileName);

    const ext = docFile.name.split(".").pop()?.toUpperCase() ?? "PDF";
    updatePayload.file_url = urlData.publicUrl;
    updatePayload.file_size = formatFileSize(docFile.size);
    updatePayload.file_type = ext;
  }

  updatePayload.updated_at = new Date().toISOString();

  // 3. Update database
  const { error } = await supabase
    .from("downloads")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    return { success: false, error: `Gagal update dokumen: ${error.message}` };
  }

  revalidatePath("/admin/unduhan");
  revalidatePath("/");

  return { success: true, data: { id } };
}

/**
 * Server Action: Menghapus dokumen unduhan berdasarkan ID.
 */
export async function deleteDownload(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  const id = formData.get("id") as string;

  if (!id) {
    return { success: false, error: "ID dokumen tidak ditemukan" };
  }

  // Hapus file dari storage
  const filePath = formData.get("file_path") as string | null;
  if (filePath) {
    await supabase.storage
      .from(STORAGE_BUCKETS.DOCUMENTS)
      .remove([filePath]);
  }

  const { error } = await supabase
    .from("downloads")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: `Gagal menghapus dokumen: ${error.message}` };
  }

  revalidatePath("/admin/unduhan");
  revalidatePath("/");

  return { success: true, data: { id } };
}
