"use server";

import { Resend } from "resend";
import { generateOfficialPDF } from "@/lib/utils/pdf";
import { logError } from "@/lib/utils/logger";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key");

interface EmailPayload {
  to: string;
  type: "PPID" | "WBS" | "MCU";
  name: string;
  refNumber: string;
  details: string;
}

export async function sendNotificationEmail(payload: EmailPayload) {
  try {
    // Generate PDF buffer
    let title = "";
    if (payload.type === "PPID") title = "Tanda Terima Permohonan Informasi Publik";
    if (payload.type === "WBS") title = "Bukti Registrasi Whistleblowing System";
    if (payload.type === "MCU") title = "Bukti Pendaftaran Medical Check-Up";

    const pdfBuffer = await generateOfficialPDF({
      title,
      type: payload.type,
      refNumber: payload.refNumber,
      name: payload.name,
      date: new Date().toLocaleDateString("id-ID"),
      details: payload.details,
    });

    // Email HTML Template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">Pusat Kesehatan Yustisial</h2>
          <p style="color: #cbd5e1; margin: 5px 0 0 0;">Kejaksaan Republik Indonesia</p>
        </div>
        <div style="padding: 30px;">
          <p>Yth. <strong>${payload.name}</strong>,</p>
          <p>Terima kasih telah menggunakan layanan Pusat Kesehatan Yustisial. Kami telah menerima data Anda untuk kategori <strong>${payload.type}</strong> dengan nomor registrasi <strong>${payload.refNumber}</strong>.</p>
          <p>Bersama email ini, kami lampirkan dokumen resmi sebagai bukti registrasi yang sah. Mohon simpan dokumen ini untuk keperluan tindak lanjut.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #64748b;">
            Ini adalah email otomatis. Mohon tidak membalas email ini.<br>
            © ${new Date().getFullYear()} PKY Kejaksaan RI.
          </p>
        </div>
      </div>
    `;

    // Send via Resend
    const { data, error } = await resend.emails.send({
      from: "PKY Kejaksaan <onboarding@resend.dev>", // Gunakan domain verified jika di production
      to: [payload.to],
      subject: `[PKY] ${title} - ${payload.refNumber}`,
      html: htmlContent,
      attachments: [
        {
          filename: `PKY_${payload.type}_${payload.refNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      // Handle Resend specific errors (like unverified domain in sandbox mode)
      if (error.message.includes("testing emails") || error.message.includes("verify a domain")) {
         await logError("sendNotificationEmail_SandboxLimit", error);
         return { success: true, warning: "Data berhasil disimpan, namun email notifikasi dilewati karena limitasi mode Sandbox." };
      }
      throw new Error(`Resend Error: ${error.message}`);
    }

    return { success: true, data };
  } catch (error: any) {
    await logError("sendNotificationEmail", error);
    return { success: false, error: "Gagal mengirim email notifikasi. " + (error?.message || "") };
  }
}

export async function sendInfoRequestEmail(payload: { to: string; name: string; facilityName: string }) {
  try {
    const title = "Permintaan Informasi Detail Fasilitas";
    const refNumber = `INFO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">Pusat Kesehatan Yustisial</h2>
          <p style="color: #cbd5e1; margin: 5px 0 0 0;">Kejaksaan Republik Indonesia</p>
        </div>
        <div style="padding: 30px;">
          <p>Yth. <strong>${payload.name}</strong>,</p>
          <p>Terima kasih telah menggunakan layanan portal Pusat Kesehatan Yustisial. Kami telah menerima permohonan informasi detail Anda mengenai fasilitas kesehatan <strong>${payload.facilityName}</strong>.</p>
          <p>Nomor referensi tiket Anda adalah: <strong>${refNumber}</strong>.</p>
          <p>Tim admin kami akan segera menindaklanjuti permintaan ini dan menghubungi Anda kembali dengan informasi lengkap mengenai fasilitas tersebut dalam waktu 1x24 jam kerja.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #64748b;">
            Ini adalah email otomatis. Mohon tidak membalas email ini.<br>
            © ${new Date().getFullYear()} PKY Kejaksaan RI.
          </p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "PKY Kejaksaan <onboarding@resend.dev>", 
      to: [payload.to],
      subject: `[PKY] ${title} - ${payload.facilityName}`,
      html: htmlContent,
    });

    if (error) {
      if (error.message.includes("testing emails") || error.message.includes("verify a domain")) {
         await logError("sendInfoRequestEmail_SandboxLimit", error);
         return { success: true, warning: "Data berhasil disimpan, namun email notifikasi dilewati karena limitasi mode Sandbox." };
      }
      throw new Error(`Resend Error: ${error.message}`);
    }

    return { success: true, data };
  } catch (error: any) {
    await logError("sendInfoRequestEmail", error);
    return { success: false, error: "Gagal mengirim email konfirmasi. " + (error?.message || "") };
  }
}

export async function sendMcuCustomEmail(payload: { to: string; name: string; scheduleDate: string; facilityName: string; customMessage: string }) {
  try {
    const title = "Informasi Penting: Jadwal Medical Check-Up";
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">Pusat Kesehatan Yustisial</h2>
          <p style="color: #cbd5e1; margin: 5px 0 0 0;">Kejaksaan Republik Indonesia</p>
        </div>
        <div style="padding: 30px;">
          <p>Yth. <strong>${payload.name}</strong>,</p>
          <p>Berikut adalah informasi terkait pendaftaran Medical Check-Up (MCU) Anda di <strong>${payload.facilityName}</strong> pada tanggal <strong>${payload.scheduleDate}</strong>.</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${payload.customMessage}</p>
          </div>
          <p>Harap jadikan perhatian dan persiapkan diri Anda sesuai arahan di atas.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #64748b;">
            Ini adalah pesan resmi dari Tim Admin PKY Kejaksaan RI.<br>
            © ${new Date().getFullYear()} PKY Kejaksaan RI.
          </p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "PKY Kejaksaan <onboarding@resend.dev>",
      to: [payload.to],
      subject: `[PKY] ${title}`,
      html: htmlContent,
    });

    if (error) {
      if (error.message.includes("testing emails") || error.message.includes("verify a domain")) {
         await logError("sendMcuCustomEmail_SandboxLimit", error);
         return { success: true, warning: "Data berhasil disimpan, namun email notifikasi dilewati karena limitasi mode Sandbox." };
      }
      throw new Error(`Resend Error: ${error.message}`);
    }

    return { success: true, data };
  } catch (error: any) {
    await logError("sendMcuCustomEmail", error);
    return { success: false, error: "Gagal mengirim pesan kustom. " + (error?.message || "") };
  }
}

