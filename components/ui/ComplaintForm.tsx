"use client";

import { useActionState, useEffect } from "react";
import { submitComplaint } from "@/lib/actions/layanan.actions";
import { Send, EyeOff, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" /> Mengirim...
        </>
      ) : (
        <>
          Kirim Laporan <Send size={16} />
        </>
      )}
    </button>
  );
}

export function ComplaintForm() {
  const [state, action] = useActionState(submitComplaint, { success: false, error: "" });

  useEffect(() => {
    if (state.success) {
      toast.success("Pengaduan Terkirim!", {
        description: "Laporan Anda telah tersimpan dengan aman."
      });
    } else if (state.error && state.error !== "Validasi gagal") {
      toast.error("Gagal Mengirim", {
        description: state.error || "Terjadi kesalahan, silakan coba lagi."
      });
    }
  }, [state]);

  return (
    <form action={action} className="space-y-5">
      {/* Anonymity Toggle */}
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-surface-muted p-4 dark:border-white/10 dark:bg-navy-dark">
        <EyeOff size={18} className="text-primary shrink-0" />
        <label className="flex items-center gap-3 cursor-pointer flex-1">
          <input
            type="checkbox"
            name="is_anonymous"
            value="true"
            className="h-4 w-4 rounded border-gray-300 text-primary accent-primary"
          />
          <span className="text-sm font-medium text-navy dark:text-white">
            Laporkan secara anonim
          </span>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="wbs-name"
            className="mb-1.5 block text-sm font-semibold text-navy dark:text-white/90"
          >
            Nama Pelapor
          </label>
          <input
            id="wbs-name"
            name="reporter_name"
            type="text"
            placeholder="Opsional jika anonim"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy-dark dark:text-white dark:focus:border-primary-light"
          />
        </div>
        <div>
          <label
            htmlFor="wbs-contact"
            className="mb-1.5 block text-sm font-semibold text-navy dark:text-white/90"
          >
            Email / No. HP
          </label>
          <input
            id="wbs-contact"
            type="text"
            placeholder="Untuk tindak lanjut (opsional)"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy-dark dark:text-white dark:focus:border-primary-light"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="wbs-category"
          className="mb-1.5 block text-sm font-semibold text-navy dark:text-white/90"
        >
          Kategori Pengaduan <span className="text-rose-500">*</span>
        </label>
        <select
          id="wbs-category"
          name="subject"
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy-dark dark:text-white dark:focus:border-primary-light"
        >
          <option value="">Pilih kategori</option>
          <option value="pelanggaran">Indikasi Pelanggaran</option>
          <option value="gratifikasi">Gratifikasi</option>
          <option value="pelayanan">Keluhan Pelayanan</option>
          <option value="fasilitas">Keluhan Fasilitas</option>
          <option value="sdm">Keluhan SDM / Tenaga Medis</option>
          <option value="lainnya">Lainnya</option>
        </select>
        {state.fieldErrors?.subject && <p className="text-rose-500 text-xs mt-1">{state.fieldErrors.subject[0]}</p>}
      </div>

      <div>
        <label
          htmlFor="wbs-location"
          className="mb-1.5 block text-sm font-semibold text-navy dark:text-white/90"
        >
          Lokasi Kejadian <span className="text-rose-500">*</span>
        </label>
        <input
          id="wbs-location"
          type="text"
          required
          placeholder="Nama faskes atau unit kerja terkait"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy-dark dark:text-white dark:focus:border-primary-light"
        />
      </div>

      <div>
        <label
          htmlFor="wbs-detail"
          className="mb-1.5 block text-sm font-semibold text-navy dark:text-white/90"
        >
          Uraian Kronologi <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="wbs-detail"
          name="message"
          rows={6}
          required
          placeholder="Jelaskan kronologi kejadian secara detail, termasuk waktu, tempat, dan pihak-pihak terkait..."
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy-dark dark:text-white dark:focus:border-primary-light"
        />
        {state.fieldErrors?.message && <p className="text-rose-500 text-xs mt-1">{state.fieldErrors.message[0]}</p>}
      </div>

      {state.success && (
        <div className="p-4 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-xl text-sm font-medium">
          Pengaduan berhasil dikirim! Laporan Anda telah tersimpan dengan aman.
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-white/10">
        <SubmitButton />
      </div>
    </form>
  );
}
