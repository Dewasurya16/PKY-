"use client";

import { useActionState, useEffect, useState } from "react";
import { registerMcu } from "@/lib/actions/mcu.actions";
import { X, Send, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" /> Mendaftar...
        </>
      ) : (
        <>
          Daftar Sekarang <Send size={16} />
        </>
      )}
    </button>
  );
}

interface McuRegisterModalProps {
  scheduleId: string;
  facilityName: string;
  isFull: boolean;
}

export function McuRegisterModal({ scheduleId, facilityName, isFull }: McuRegisterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useActionState(registerMcu, { success: false, error: "" });

  useEffect(() => {
    if (state.success) {
      if (state.warning) {
        toast.warning("Pendaftaran Berhasil", { description: state.warning });
      } else {
        toast.success("Pendaftaran Berhasil", { description: "Bukti pendaftaran dikirim ke email Anda." });
      }
      setIsOpen(false);
    } else if (state.error && state.error !== "Validasi gagal") {
      toast.error("Pendaftaran Gagal", { description: state.error });
    }
  }, [state]);

  return (
    <>
      <button
        onClick={() => !isFull && setIsOpen(true)}
        disabled={isFull}
        className={`mt-4 w-full rounded-xl px-4 py-2 text-sm font-bold text-white transition-colors ${
          isFull ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"
        }`}
      >
        {isFull ? "Kuota Penuh" : "Daftar Sesi Ini"}
      </button>

      {isOpen && !isFull && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 dark:bg-navy-dark dark:border dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-navy dark:text-white">Form Registrasi MCU</h3>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-navy dark:hover:text-white" aria-label="Tutup Modal" title="Tutup Modal">
                <X size={20} />
              </button>
            </div>
            
            <p className="mb-6 text-sm text-text-secondary">
              Mendaftar untuk sesi MCU di <strong>{facilityName}</strong>.
            </p>

            <form action={action} className="space-y-4">
              <input type="hidden" name="schedule_id" value={scheduleId} />
              
              <div>
                <label className="mb-1 block text-sm font-semibold text-navy dark:text-white">Nama Pegawai <span className="text-rose-500">*</span></label>
                <input name="nama_pegawai" type="text" required placeholder="Nama lengkap" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary dark:bg-navy dark:border-white/10 dark:text-white" />
                {state.fieldErrors?.nama_pegawai && <p className="text-rose-500 text-xs mt-1">{state.fieldErrors.nama_pegawai[0]}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-navy dark:text-white">NIP / NRP <span className="text-rose-500">*</span></label>
                <input name="nip_nrp" type="text" required placeholder="NIP / NRP" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary dark:bg-navy dark:border-white/10 dark:text-white" />
                {state.fieldErrors?.nip_nrp && <p className="text-rose-500 text-xs mt-1">{state.fieldErrors.nip_nrp[0]}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-navy dark:text-white">Email <span className="text-rose-500">*</span></label>
                <input name="email_pegawai" type="email" required placeholder="Email kejaksaan/pribadi" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary dark:bg-navy dark:border-white/10 dark:text-white" />
                {state.fieldErrors?.email_pegawai && <p className="text-rose-500 text-xs mt-1">{state.fieldErrors.email_pegawai[0]}</p>}
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
