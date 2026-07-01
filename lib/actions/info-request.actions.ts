"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendInfoRequestEmail } from "./email.actions";
import { logError } from "@/lib/utils/logger";
import type { ActionState } from "@/lib/types/database";

const infoRequestSchema = z.object({
  facility_name: z.string().min(1, "Nama fasilitas wajib diisi").max(150, "Nama fasilitas terlalu panjang"),
  user_name: z.string().min(2, "Nama lengkap harus minimal 2 karakter").max(100, "Nama terlalu panjang"),
  email_kejaksaan: z.string().email("Format email tidak valid").max(150, "Email terlalu panjang"),
});

export async function submitInfoRequest(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const rawData = {
      facility_name: formData.get("facility_name") as string,
      user_name: formData.get("user_name") as string,
      email_kejaksaan: formData.get("email_kejaksaan") as string,
    };

    const validatedFields = infoRequestSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { facility_name, user_name, email_kejaksaan } = validatedFields.data;

    const supabase = await createClient();
    const { error: insertError } = await supabase.from("info_requests").insert({
      facility_name,
      user_name,
      email_kejaksaan,
      status: "pending",
    });

    if (insertError) {
      throw new Error(`Insert failed: ${insertError.message}`);
    }

    const emailResult = await sendInfoRequestEmail({
      to: email_kejaksaan,
      name: user_name,
      facilityName: facility_name,
    });

    revalidatePath("/admin/layanan/info-requests");

    return {
      success: true,
      warning: emailResult.warning,
    };
  } catch (error: any) {
    await logError("submitInfoRequest", error);
    return {
      success: false,
      error: error.message || "Terjadi kesalahan saat memproses permintaan",
    };
  }
}

export async function updateInfoRequestStatus(
  id: string,
  status: "pending" | "selesai",
): Promise<ActionState> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("info_requests")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/admin/layanan/info-requests");

    return { success: true };
  } catch (error: any) {
    await logError("updateInfoRequestStatus", error);
    return { success: false, error: error.message };
  }
}
