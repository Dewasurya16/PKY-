"use client";

import { useActionState, useEffect } from "react";
import { submitPpid } from "@/lib/actions/layanan.actions";
import { Send } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Mengirim..." : "Ajukan Permohonan"} <Send size={16} />
    </button>
  );
}

export function PpidForm() {
  const [state, action] = useActionState(submitPpid, { success: false, error: "" });

  useEffect(() => {
    if (state.success) {
      alert("Permohonan berhasil dikirim! Silakan tunggu tindak lanjut dari tim kami.");
      // In a real app, you might use a toast library like Sonner or react-hot-toast
    } else if (state.error && state.error !== "Validasi gagal") {
      alert(`Gagal: ${state.error}`);
    }
  }, [state]);

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="ppid-name"
            className="mb-1.5 block text-sm font-semibold text-navy dark:text-white/90"
          >
            Nama Lengkap <span className="text-rose-500">*</span>
          </label>
          <input
            id="ppid-name"
            name="user_name"
            type="text"
            required
            placeholder="Masukkan nama lengkap"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy-dark dark:text-white dark:focus:border-primary-light"
          />
          {state.fieldErrors?.user_name && <p className="text-rose-500 text-xs mt-1">{state.fieldErrors.user_name[0]}</p>}
        </div>
        <div>
          <label
            htmlFor="ppid-nip"
            className="mb-1.5 block text-sm font-semibold text-navy dark:text-white/90"
          >
            NIP / NIK
          </label>
          <input
            id="ppid-nip"
            type="text"
            placeholder="Opsional"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy-dark dark:text-white dark:focus:border-primary-light"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="ppid-email"
          className="mb-1.5 block text-sm font-semibold text-navy dark:text-white/90"
        >
          Email <span className="text-rose-500">*</span>
        </label>
        <input
          id="ppid-email"
          name="email"
          type="email"
          required
          placeholder="email@kejaksaan.go.id"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy-dark dark:text-white dark:focus:border-primary-light"
        />
        {state.fieldErrors?.email && <p className="text-rose-500 text-xs mt-1">{state.fieldErrors.email[0]}</p>}
      </div>

      <div>
        <label
          htmlFor="ppid-subject"
          className="mb-1.5 block text-sm font-semibold text-navy dark:text-white/90"
        >
          Subjek Informasi <span className="text-rose-500">*</span>
        </label>
        <select
          id="ppid-subject"
          name="subject"
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy-dark dark:text-white dark:focus:border-primary-light"
        >
          <option value="">Pilih subjek</option>
          <option value="regulasi">Regulasi & Kebijakan Kesehatan</option>
          <option value="anggaran">Laporan Anggaran & Keuangan</option>
          <option value="sdm">Data SDM Kesehatan</option>
          <option value="faskes">Informasi Fasilitas Kesehatan</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="ppid-detail"
          className="mb-1.5 block text-sm font-semibold text-navy dark:text-white/90"
        >
          Rincian Informasi yang Diminta <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="ppid-detail"
          name="request_details"
          rows={5}
          required
          placeholder="Jelaskan secara detail informasi yang Anda butuhkan..."
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy-dark dark:text-white dark:focus:border-primary-light"
        />
        {state.fieldErrors?.request_details && <p className="text-rose-500 text-xs mt-1">{state.fieldErrors.request_details[0]}</p>}
      </div>

      {state.success && (
        <div className="p-4 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-xl text-sm font-medium">
          Permohonan berhasil dikirim! Silakan tunggu tindak lanjut dari tim kami.
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-white/10">
        <SubmitButton />
      </div>
    </form>
  );
}
