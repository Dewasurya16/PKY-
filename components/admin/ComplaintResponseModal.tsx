"use client";

import { useActionState, useEffect, useState } from "react";
import { sendComplaintResponse } from "@/lib/actions/layanan.actions";
import { X, Send, Mail } from "lucide-react";
import { useFormStatus } from "react-dom";
import { showToast } from "@/lib/utils/toast";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
    >
      {pending ? <LoadingSpinner size={16} className="text-white" /> : null}
      {pending ? "Mengirim..." : "Kirim Tanggapan"} {!pending && <Send size={16} />}
    </button>
  );
}

interface ComplaintResponseModalProps {
  complaintId: string;
  email: string | null;
}

export function ComplaintResponseModal({ complaintId, email }: ComplaintResponseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useActionState(sendComplaintResponse, { success: false, error: "" });

  useEffect(() => {
    if (state.success) {
      setIsOpen(false);
      if (state.warning) {
        showToast("Tanggapan Berhasil", state.warning, "info");
      } else {
        showToast("Tanggapan Berhasil", "Tanggapan berhasil dikirim via email.", "success");
      }
    } else if (state.error && state.error !== "Validasi gagal") {
      showToast("Gagal Mengirim", state.error, "error");
    }
  }, [state]);

  if (!email) {
    return (
      <button disabled className="flex items-center gap-2 text-xs font-semibold text-gray-400 cursor-not-allowed">
        <Mail size={14} /> Tanpa Email
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
      >
        <Mail size={14} /> Tanggapi (Email)
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 dark:bg-navy-dark dark:border dark:border-white/10 text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-navy dark:text-white">Balas Pengaduan</h3>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-navy dark:hover:text-white" aria-label="Tutup Modal" title="Tutup Modal">
                <X size={20} />
              </button>
            </div>
            
            <p className="mb-4 text-sm text-text-secondary">
              Email akan dikirimkan ke: <span className="font-semibold text-navy dark:text-white">{email}</span>
            </p>

            <form action={action} className="space-y-4">
              <input type="hidden" name="complaint_id" value={complaintId} />
              <input type="hidden" name="email_to" value={email} />
              
              <div>
                <label className="mb-1 block text-sm font-semibold text-navy dark:text-white">Pesan Tanggapan <span className="text-rose-500">*</span></label>
                <textarea name="response_message" rows={6} required placeholder="Ketik tanggapan resmi atau konfirmasi tindak lanjut..." className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary dark:bg-navy dark:border-white/10 dark:text-white" />
                {state.fieldErrors?.response_message && <p className="text-rose-500 text-xs mt-1">{state.fieldErrors.response_message[0]}</p>}
              </div>

              <div className="pt-4 flex justify-end">
                <SubmitBtn />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
