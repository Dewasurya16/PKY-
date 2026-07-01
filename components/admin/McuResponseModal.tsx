"use client";

import { useActionState, useEffect, useState } from "react";
import { sendMcuAdminResponse } from "@/lib/actions/mcu.actions";
import { X, Send, Mail, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import type { ActionState } from "@/lib/types/database";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
    >
      {pending ? <Loader2 size={16} className="animate-spin text-white" /> : null}
      {pending ? "Mengirim..." : "Kirim Pesan"} {!pending && <Send size={16} />}
    </button>
  );
}

interface McuResponseModalProps {
  registrationId: string;
  name: string;
  email: string;
  scheduleDate: string;
  facilityName: string;
}

export function McuResponseModal({ registrationId, name, email, scheduleDate, facilityName }: McuResponseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action, isPending] = useActionState<ActionState, FormData>(sendMcuAdminResponse, { success: false, error: "" });

  useEffect(() => {
    if (isPending) {
      toast.loading("Mengirim pesan...", { id: `mcu-${registrationId}` });
    } else {
      toast.dismiss(`mcu-${registrationId}`);
    }
  }, [isPending, registrationId]);

  useEffect(() => {
    if (state.success) {
      setIsOpen(false);
      toast.success("Email Berhasil Dikirim!", { id: `mcu-${registrationId}` });
    } else if (state.error && state.error !== "Validasi gagal") {
      toast.error("Gagal Mengirim", { description: state.error, id: `mcu-${registrationId}` });
    }
  }, [state, registrationId]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
        title="Kirim Email"
      >
        <Mail size={14} /> Hubungi
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 dark:bg-navy-dark dark:border dark:border-white/10 text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-navy dark:text-white">Hubungi Pendaftar MCU</h3>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-navy dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <p className="mb-4 text-sm text-text-secondary">
              Email akan dikirimkan ke: <span className="font-semibold text-navy dark:text-white">{email}</span>
            </p>

            <form action={action} className="space-y-4">
              <input type="hidden" name="nama_pegawai" value={name} />
              <input type="hidden" name="email_pegawai" value={email} />
              <input type="hidden" name="schedule_date" value={scheduleDate} />
              <input type="hidden" name="facility_name" value={facilityName} />
              
              <div>
                <label className="mb-1 block text-sm font-semibold text-navy dark:text-white">Pesan Khusus <span className="text-rose-500">*</span></label>
                <textarea name="custom_message" rows={6} required placeholder="Ketik instruksi puasa, pembatalan, atau pesan lainnya..." className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary dark:bg-navy dark:border-white/10 dark:text-white" />
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
