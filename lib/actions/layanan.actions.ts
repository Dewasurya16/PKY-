"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { logError } from "@/lib/utils/logger";
import { z } from "zod";
import type { ActionState } from "@/lib/types/database";
import { sendNotificationEmail } from "@/lib/actions/email.actions";

const ppidSchema = z.object({
  user_name: z.string().min(3, "Nama lengkap minimal 3 karakter").max(100, "Nama terlalu panjang (maks. 100)"),
  email: z.string().email("Format email tidak valid").max(150, "Email terlalu panjang (maks. 150)"),
  request_details: z.string().min(10, "Detail permohonan minimal 10 karakter").max(2000, "Detail terlalu panjang (maks. 2000)"),
});

const complaintSchema = z.object({
  reporter_name: z.string().max(100, "Nama terlalu panjang (maks. 100)").optional(),
  subject: z.string().min(5, "Subjek minimal 5 karakter").max(150, "Subjek terlalu panjang (maks. 150)"),
  message: z.string().min(10, "Pesan minimal 10 karakter").max(2000, "Pesan terlalu panjang (maks. 2000)"),
  is_anonymous: z.boolean().default(false),
});

/** Server Action: Submit PPID Request dari Publik */
export async function submitPpid(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  
  const rawInput = {
    user_name: formData.get("user_name"),
    email: formData.get("email"),
    request_details: formData.get("request_details"),
  };

  const parsed = ppidSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: "Validasi gagal", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { data: result, error } = await supabase.from("ppid_requests").insert(parsed.data).select("id").single();
  if (error) {
    await logError("submitPpid", error);
    return { success: false, error: "Gagal mengirim permohonan." };
  }

  // Send Notification Email asynchronously (don't await strictly to prevent hanging UI)
  sendNotificationEmail({
    to: parsed.data.email,
    type: "PPID",
    name: parsed.data.user_name,
    refNumber: result.id.substring(0, 8).toUpperCase(),
    details: "Permohonan: " + parsed.data.request_details.substring(0, 50) + "...",
  }).catch(e => logError("sendNotificationEmail_PPID", e));

  revalidatePath("/admin/layanan/ppid");
  return { success: true };
}

/** Server Action: Submit Pengaduan WBS dari Publik */
export async function submitComplaint(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  
  const rawInput = {
    reporter_name: formData.get("reporter_name"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    is_anonymous: formData.get("is_anonymous") === "true",
  };

  const parsed = complaintSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: "Validasi gagal", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const payload = {
    ...parsed.data,
    reporter_name: parsed.data.is_anonymous ? "Anonim" : parsed.data.reporter_name,
  };

  const { data: result, error } = await supabase.from("public_complaints").insert(payload).select("id").single();
  if (error) {
    await logError("submitComplaint", error);
    return { success: false, error: "Gagal mengirim pengaduan." };
  }

  // Extract email if exists in string (simplified check for WBS)
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const match = parsed.data.message.match(emailRegex); // Or we can use reporter_name if it looks like email
  let userEmail = match?.[0];
  if (!userEmail) {
    const nameMatch = parsed.data.reporter_name?.match(emailRegex);
    if (nameMatch) userEmail = nameMatch[0];
  }

  if (userEmail) {
    sendNotificationEmail({
      to: userEmail,
      type: "WBS",
      name: parsed.data.reporter_name || "Pelapor",
      refNumber: result.id.substring(0, 8).toUpperCase(),
      details: "Laporan: " + parsed.data.subject,
    }).catch(e => logError("sendNotificationEmail_WBS", e));
  }
  
  revalidatePath("/admin/layanan/pengaduan");
  return { success: true };
}

/** Server Action: Update Status Layanan (PPID / Pengaduan) */
export async function updateServiceStatus(
  table: "ppid_requests" | "public_complaints",
  id: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();
  
  const { error } = await supabase
    .from(table)
    .update({ status })
    .eq("id", id);

  if (error) {
    await logError(`updateServiceStatus - ${table}`, error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/admin/layanan/${table === "ppid_requests" ? "ppid" : "pengaduan"}`);
  return { success: true };
}

/** Server Action: Send Complaint Response (Email) */
export async function sendComplaintResponse(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  
  const rawInput = {
    complaint_id: formData.get("complaint_id"),
    email_to: formData.get("email_to"),
    response_message: formData.get("response_message"),
  };

  const schema = z.object({
    complaint_id: z.string().uuid(),
    email_to: z.string().email(),
    response_message: z.string().min(5, "Pesan minimal 5 karakter"),
  });

  const parsed = schema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: "Validasi gagal", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  let warningMsg = "";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY || "dummy");
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">Pusat Kesehatan Yustisial</h2>
          <p style="color: #cbd5e1; margin: 5px 0 0 0;">Kejaksaan Republik Indonesia</p>
        </div>
        <div style="padding: 30px;">
          <p>Yth. Pelapor,</p>
          <p>Berikut adalah tanggapan resmi dari tim kami terkait laporan pengaduan Anda:</p>
          <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <p style="margin: 0; white-space: pre-wrap;">${parsed.data.response_message}</p>
          </div>
          <p>Terima kasih atas partisipasi Anda dalam Whistleblowing System kami.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #64748b;">
            Ini adalah email otomatis. Mohon tidak membalas email ini.<br>
            © ${new Date().getFullYear()} PKY Kejaksaan RI.
          </p>
        </div>
      </div>
    `;

    const { error: resendError } = await resend.emails.send({
      from: "PKY Kejaksaan <onboarding@resend.dev>",
      to: [parsed.data.email_to],
      subject: "[PKY] Tanggapan Resmi Pengaduan (WBS)",
      html: htmlContent,
    });

    if (resendError) {
      if (resendError.message.includes("testing emails") || resendError.message.includes("verify a domain")) {
        await logError("sendComplaintResponse_SandboxLimit", resendError);
        warningMsg = "Data tanggapan berhasil disimpan, namun email notifikasi dilewati karena mode Sandbox server.";
      } else {
        throw new Error(resendError.message);
      }
    }

    // Update status to 'selesai'
    await supabase.from("public_complaints").update({ status: "selesai" }).eq("id", parsed.data.complaint_id);

  } catch (error: any) {
    await logError("sendComplaintResponse", error);
    return { success: false, error: "Gagal mengirim email tanggapan. " + (error?.message || "") };
  }

  revalidatePath("/admin/layanan/pengaduan");
  return { success: true, ...(warningMsg && { warning: warningMsg }) };
}

/** Server Action: Send PPID Response (Email) */
export async function sendPpidResponse(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = createAdminClient();
  
  const rawInput = {
    request_id: formData.get("request_id"),
    email_to: formData.get("email_to"),
    response_message: formData.get("response_message"),
  };

  const schema = z.object({
    request_id: z.string().uuid(),
    email_to: z.string().email(),
    response_message: z.string().min(5, "Pesan minimal 5 karakter"),
  });

  const parsed = schema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: "Validasi gagal", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  let warningMsg = "";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY || "dummy");
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">Pusat Kesehatan Yustisial</h2>
          <p style="color: #cbd5e1; margin: 5px 0 0 0;">Kejaksaan Republik Indonesia</p>
        </div>
        <div style="padding: 30px;">
          <p>Yth. Pemohon,</p>
          <p>Berikut adalah tanggapan resmi dari tim kami terkait permohonan informasi publik (PPID) Anda:</p>
          <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0;">
            <p style="margin: 0; white-space: pre-wrap;">${parsed.data.response_message}</p>
          </div>
          <p>Semoga informasi ini bermanfaat.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #64748b;">
            Ini adalah email otomatis. Mohon tidak membalas email ini.<br>
            © ${new Date().getFullYear()} PKY Kejaksaan RI.
          </p>
        </div>
      </div>
    `;

    const { error: resendError } = await resend.emails.send({
      from: "PKY Kejaksaan <onboarding@resend.dev>",
      to: [parsed.data.email_to],
      subject: "[PKY] Tanggapan Permohonan Informasi Publik (PPID)",
      html: htmlContent,
    });

    if (resendError) {
      if (resendError.message.includes("testing emails") || resendError.message.includes("verify a domain")) {
        await logError("sendPpidResponse_SandboxLimit", resendError);
        warningMsg = "Data tanggapan berhasil disimpan, namun email notifikasi dilewati karena mode Sandbox server.";
      } else {
        throw new Error(resendError.message);
      }
    }

    // Update status to 'selesai'
    await supabase.from("ppid_requests").update({ status: "selesai" }).eq("id", parsed.data.request_id);

  } catch (error: any) {
    await logError("sendPpidResponse", error);
    return { success: false, error: "Gagal mengirim email tanggapan. " + (error?.message || "") };
  }

  revalidatePath("/admin/layanan/ppid");
  return { success: true, ...(warningMsg && { warning: warningMsg }) };
}
