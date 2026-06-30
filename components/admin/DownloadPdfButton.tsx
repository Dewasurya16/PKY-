"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { generateAdminPdf } from "@/lib/actions/pdf.actions";

interface Props {
  id: string;
  type: "PPID" | "WBS" | "MCU";
}

export function DownloadPdfButton({ id, type }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const res = await generateAdminPdf(type, id);
      if (!res.success || !res.data) {
        alert(res.error || "Gagal mengunduh PDF");
        return;
      }

      // Convert base64 to Blob
      const byteCharacters = atob(res.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `PKY_${type}_${id.substring(0, 8)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed mt-2"
    >
      {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
      {isLoading ? "Memproses..." : "Unduh PDF"}
    </button>
  );
}
