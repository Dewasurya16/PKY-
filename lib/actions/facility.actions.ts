"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { facilityInsertSchema, facilityUpdateSchema } from "@/lib/validations/facility.schema";
import { slugify } from "@/lib/utils/slugify";
import { logError } from "@/lib/utils/logger";
import type { ActionState } from "@/lib/types/database";
import { STORAGE_BUCKETS, MAX_FILE_SIZES, ACCEPTED_IMAGE_TYPES } from "@/lib/types/database";

/**
 * Mem-parse array layanan dari string yang dipisah koma.
 */
function parseServices(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Server Action: Membuat fasilitas baru.
 * Termasuk upload foto fasilitas ke Supabase Storage.
 */
export async function createFacility(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();

  // 1. Parse field dari FormData
  const rawInput = {
    name: formData.get("name") as string,
    type: formData.get("type") as string,
    address: formData.get("address") as string,
    status: formData.get("status") as string,
    contact: (formData.get("contact") as string) || "-",
    is_available: formData.get("is_available") === "true",
    description: formData.get("description") as string,
    services: parseServices(formData.get("services") as string),
    latitude: formData.get("latitude")
      ? Number(formData.get("latitude"))
      : null,
    longitude: formData.get("longitude")
      ? Number(formData.get("longitude"))
      : null,
  };

  // 2. Validasi
  const parsed = facilityInsertSchema.safeParse(rawInput);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path.join(".");
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    }
    await logError("createFacility - Validation Failed", parsed.error.flatten());
    return { success: false, error: "Validasi gagal", fieldErrors };
  }

  // 3. Generate slug
  const slug = slugify(parsed.data.name);

  // 4. Upload gambar jika ada
  let imageUrl: string | null = null;
  const imageFile = formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    if (imageFile.size > MAX_FILE_SIZES.IMAGE) {
      return { success: false, error: "Ukuran gambar maksimal 5 MB" };
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(imageFile.type as typeof ACCEPTED_IMAGE_TYPES[number])) {
      return { success: false, error: "Format gambar harus JPG, PNG, atau WebP" };
    }

    const ext = imageFile.name.split(".").pop() ?? "jpg";
    const fileName = `${slug}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.FACILITY_IMAGES)
      .upload(fileName, imageFile, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      return { success: false, error: `Gagal upload gambar: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS.FACILITY_IMAGES)
      .getPublicUrl(fileName);

    imageUrl = urlData.publicUrl;
  }

  // 5. Insert ke database
  const { data, error } = await supabase
    .from("facilities")
    .insert({
      ...parsed.data,
      slug,
      image_url: imageUrl,
    })
    .select("id, slug")
    .single();

  if (error) {
    await logError("createFacility - Supabase Insert Error", error);
    return { success: false, error: `Gagal menyimpan fasilitas: ${error.message}` };
  }

  revalidatePath("/admin/rumah-sakit");
  revalidatePath("/fasilitas");
  revalidatePath("/");

  return { success: true, data: { id: data.id, slug: data.slug } };
}

/**
 * Server Action: Mengupdate fasilitas yang sudah ada.
 */
export async function updateFacility(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  const id = formData.get("id") as string;

  if (!id) {
    return { success: false, error: "ID fasilitas tidak ditemukan" };
  }

  // 1. Parse field
  const rawInput = {
    name: formData.get("name") as string || undefined,
    type: formData.get("type") as string || undefined,
    address: formData.get("address") as string || undefined,
    status: formData.get("status") as string || undefined,
    contact: formData.get("contact") as string || undefined,
    is_available: formData.has("is_available")
      ? formData.get("is_available") === "true"
      : undefined,
    description: formData.get("description") as string || undefined,
    services: formData.has("services")
      ? parseServices(formData.get("services") as string)
      : undefined,
    latitude: formData.has("latitude") && formData.get("latitude")
      ? Number(formData.get("latitude"))
      : undefined,
    longitude: formData.has("longitude") && formData.get("longitude")
      ? Number(formData.get("longitude"))
      : undefined,
  };

  const cleanedInput = Object.fromEntries(
    Object.entries(rawInput).filter(([, v]) => v !== undefined),
  );

  // 2. Validasi
  const parsed = facilityUpdateSchema.safeParse(cleanedInput);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path.join(".");
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    }
    await logError("updateFacility - Validation Failed", parsed.error.flatten());
    return { success: false, error: "Validasi gagal", fieldErrors };
  }

  const updatePayload: Record<string, unknown> = { ...parsed.data };

  // 3. Re-generate slug jika name berubah
  if (parsed.data.name) {
    updatePayload.slug = slugify(parsed.data.name);
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

    const oldImagePath = formData.get("old_image_path") as string | null;
    if (oldImagePath) {
      await supabase.storage
        .from(STORAGE_BUCKETS.FACILITY_IMAGES)
        .remove([oldImagePath]);
    }

    const slug = (updatePayload.slug as string) ?? id;
    const ext = imageFile.name.split(".").pop() ?? "jpg";
    const fileName = `${slug}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.FACILITY_IMAGES)
      .upload(fileName, imageFile, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      return { success: false, error: `Gagal upload gambar: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS.FACILITY_IMAGES)
      .getPublicUrl(fileName);

    updatePayload.image_url = urlData.publicUrl;
  }

  updatePayload.updated_at = new Date().toISOString();

  // 5. Update database
  const { error } = await supabase
    .from("facilities")
    .update(updatePayload)
    .eq("id", id)
    .select();

  if (error) {
    await logError("updateFacility - Supabase Update Error", error);
    return { success: false, error: `Gagal update fasilitas: ${error.message}` };
  }

  revalidatePath("/admin/rumah-sakit");
  revalidatePath("/fasilitas");
  revalidatePath("/");

  return { success: true, data: { id } };
}

/**
 * Server Action: Menghapus fasilitas berdasarkan ID.
 */
export async function deleteFacility(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  const id = formData.get("id") as string;

  if (!id) {
    return { success: false, error: "ID fasilitas tidak ditemukan" };
  }

  const imagePath = formData.get("image_path") as string | null;
  if (imagePath) {
    await supabase.storage
      .from(STORAGE_BUCKETS.FACILITY_IMAGES)
      .remove([imagePath]);
  }

  const { error } = await supabase
    .from("facilities")
    .delete()
    .eq("id", id);

  if (error) {
    await logError("deleteFacility - Supabase Delete Error", error);
    return { success: false, error: `Gagal menghapus fasilitas: ${error.message}` };
  }

  revalidatePath("/admin/rumah-sakit");
  revalidatePath("/fasilitas");
  revalidatePath("/");

  return { success: true, data: { id } };
}
