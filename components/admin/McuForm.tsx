"use client";

import { useActionState, useEffect, useState } from "react";
import { createMcuSchedule } from "@/lib/actions/mcu.actions";
import { X, Plus, Calendar, Clock } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
    >
      {pending ? "Menyimpan..." : "Simpan Jadwal"}
    </button>
  );
}

export function McuForm({ facilities }: { facilities: { id: string, name: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useActionState(createMcuSchedule, { success: false, error: "" });

  useEffect(() => {
    if (state.success) {
      setIsOpen(false);
      alert("Jadwal MCU berhasil ditambahkan!");
    } else if (state.error) {
      alert(`Gagal: ${state.error}`);
    }
  }, [state]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
      >
        <Plus size={16} /> Tambah Jadwal
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6 dark:bg-navy-dark dark:border dark:border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-navy dark:text-white">Tambah Jadwal MCU</h3>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-navy dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form action={action} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-navy dark:text-white">Fasilitas</label>
                <select name="facility_id" required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary dark:bg-navy dark:border-white/10 dark:text-white">
                  <option value="">Pilih Fasilitas</option>
                  {facilities.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
                {state.fieldErrors?.facility_id && <p className="text-rose-500 text-xs">{state.fieldErrors.facility_id[0]}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-navy dark:text-white">Tanggal</label>
                <input name="schedule_date" type="date" required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary dark:bg-navy dark:border-white/10 dark:text-white" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-navy dark:text-white">Jam Mulai</label>
                  <input name="time_start" type="time" required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary dark:bg-navy dark:border-white/10 dark:text-white" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-navy dark:text-white">Jam Selesai</label>
                  <input name="time_end" type="time" required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary dark:bg-navy dark:border-white/10 dark:text-white" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-navy dark:text-white">Kuota Tersedia</label>
                <input name="quota" type="number" min="1" required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary dark:bg-navy dark:border-white/10 dark:text-white" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-navy dark:text-white">Deskripsi (Opsional)</label>
                <textarea name="description" rows={3} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary dark:bg-navy dark:border-white/10 dark:text-white" placeholder="Catatan tambahan..."></textarea>
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
