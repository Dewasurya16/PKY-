"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { mcuInsertSchema } from "@/lib/validations/mcu.schema";
import { logError } from "@/lib/utils/logger";
import { sendNotificationEmail } from "@/lib/actions/email.actions";
import { z } from "zod";
import type { ActionState } from "@/lib/types/database";

const mcuRegistrationSchema = z.object({
  schedule_id: z.string().uuid("Jadwal tidak valid"),
  nama_pegawai: z.string().min(3, "Nama minimal 3 karakter"),
  nip_nrp: z.string().min(5, "NIP/NRP minimal 5 karakter"),
  email_pegawai: z.string().email("Email tidak valid"),
});

/** Server Action: Create MCU Schedule */
export async function createMcuSchedule(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  
  const rawInput = {
    facility_id: formData.get("facility_id"),
    schedule_date: formData.get("schedule_date"),
    time_start: formData.get("time_start"),
    time_end: formData.get("time_end"),
    quota: formData.get("quota"),
    description: formData.get("description") || null,
  };

  const parsed = mcuInsertSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: "Validasi gagal", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { error } = await supabase.from("mcu_schedules").insert(parsed.data);
  if (error) {
    await logError("createMcuSchedule", error);
    return { success: false, error: "Gagal menyimpan jadwal MCU." };
  }

  revalidatePath("/admin/layanan/mcu");
  revalidatePath("/mcu");
  return { success: true };
}

/** Server Action: Toggle Status MCU */
export async function toggleMcuStatus(id: string, currentStatus: boolean): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("mcu_schedules")
    .update({ is_active: !currentStatus })
    .eq("id", id);

  if (error) {
    await logError("toggleMcuStatus", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/layanan/mcu");
  revalidatePath("/mcu");
  return { success: true };
}

/** Server Action: Delete MCU Schedule */
export async function deleteMcuSchedule(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("mcu_schedules")
    .delete()
    .eq("id", id);

  if (error) {
    await logError("deleteMcuSchedule", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/layanan/mcu");
  revalidatePath("/mcu");
  return { success: true };
}

/** Server Action: Register MCU for Public/Pegawai */
export async function registerMcu(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  
  const rawInput = {
    schedule_id: formData.get("schedule_id"),
    nama_pegawai: formData.get("nama_pegawai"),
    nip_nrp: formData.get("nip_nrp"),
    email_pegawai: formData.get("email_pegawai"),
  };

  const parsed = mcuRegistrationSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: "Validasi gagal", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  // Check quota
  const { data: schedule, error: schedError } = await supabase
    .from("mcu_schedules")
    .select("quota, registered")
    .eq("id", parsed.data.schedule_id)
    .single();

  if (schedError || !schedule) {
    return { success: false, error: "Jadwal tidak ditemukan." };
  }

  if (schedule.registered >= schedule.quota) {
    return { success: false, error: "Mohon maaf, kuota jadwal ini sudah penuh." };
  }

  // Insert registration
  const { data: result, error } = await supabase.from("mcu_registrations").insert(parsed.data).select("id").single();
  if (error) {
    await logError("registerMcu", error);
    return { success: false, error: "Gagal mendaftar. Silakan coba lagi." };
  }

  // Increment registered count
  await supabase
    .from("mcu_schedules")
    .update({ registered: schedule.registered + 1 })
    .eq("id", parsed.data.schedule_id);

  let warningMsg = "";

  // Send Notification Email
  const emailRes = await sendNotificationEmail({
    to: parsed.data.email_pegawai,
    type: "MCU",
    name: parsed.data.nama_pegawai,
    refNumber: result.id.substring(0, 8).toUpperCase(),
    details: "Registrasi Medical Check-Up. NIP/NRP: " + parsed.data.nip_nrp,
  });

  if (emailRes.warning) {
    warningMsg = emailRes.warning;
  }

  revalidatePath("/mcu");
  revalidatePath("/admin/layanan/mcu");
  return { success: true, ...(warningMsg && { warning: warningMsg }) };
}
