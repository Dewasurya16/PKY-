"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { generateOfficialPDF } from "@/lib/utils/pdf";
import { logError } from "@/lib/utils/logger";

export async function generateAdminPdf(type: "PPID" | "WBS" | "MCU", id: string): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const supabase = createAdminClient();
    let pdfTitle = "";
    let refNumber = id.substring(0, 8).toUpperCase();
    let name = "";
    let details = "";
    let date = "";

    if (type === "PPID") {
      const { data } = await supabase.from("ppid_requests").select("*").eq("id", id).single();
      if (!data) return { success: false, error: "Data tidak ditemukan" };
      pdfTitle = "Permohonan Informasi Publik (PPID)";
      name = data.user_name;
      details = data.request_details;
      date = new Date(data.created_at).toLocaleDateString("id-ID");
    } else if (type === "WBS") {
      const { data } = await supabase.from("public_complaints").select("*").eq("id", id).single();
      if (!data) return { success: false, error: "Data tidak ditemukan" };
      pdfTitle = "Laporan Pengaduan Masyarakat (WBS)";
      name = data.reporter_name || "Anonim";
      details = data.message;
      date = new Date(data.created_at).toLocaleDateString("id-ID");
    } else if (type === "MCU") {
      const { data } = await supabase.from("mcu_schedules").select("*, facilities(name)").eq("id", id).single();
      if (!data) return { success: false, error: "Data tidak ditemukan" };
      pdfTitle = "Laporan Jadwal Medical Check-Up (MCU)";
      name = data.facilities?.name || "Fasilitas MCU";
      details = `Tanggal: ${data.schedule_date} | Jam: ${data.time_start}-${data.time_end} | Terisi: ${data.registered}/${data.quota}`;
      date = new Date().toLocaleDateString("id-ID");
    }

    const pdfBuffer = await generateOfficialPDF({
      title: pdfTitle,
      refNumber,
      name,
      details,
      date,
      type
    });

    return { success: true, data: pdfBuffer.toString("base64") };
  } catch (error: any) {
    await logError("generateAdminPdf", error);
    return { success: false, error: error?.message || "Gagal membuat PDF" };
  }
}
