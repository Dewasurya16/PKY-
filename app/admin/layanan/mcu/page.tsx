import { getAllMcuSchedules } from "@/lib/queries/mcu.queries";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, Activity, Trash2 } from "lucide-react";
import { McuForm } from "@/components/admin/McuForm";
import { createAdminClient } from "@/lib/supabase/admin";
import { toggleMcuStatus, deleteMcuSchedule } from "@/lib/actions/mcu.actions";
import { DownloadPdfButton } from "@/components/admin/DownloadPdfButton";

export default async function AdminMcuPage() {
  const schedules = await getAllMcuSchedules();
  
  // Fetch facilities for the form dropdown
  const supabase = createAdminClient();
  const { data: facilities } = await supabase.from("facilities").select("id, name").order("name");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy dark:text-white">Jadwal MCU</h1>
          <p className="text-sm text-text-secondary">Monitoring jadwal Medical Check-Up aktif.</p>
        </div>
        <McuForm facilities={facilities || []} />
      </div>

      <div className="bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-white/5 text-navy dark:text-white">
            <tr>
              <th className="px-6 py-4 font-semibold">Tanggal & Waktu</th>
              <th className="px-6 py-4 font-semibold">Fasilitas</th>
              <th className="px-6 py-4 font-semibold">Detail</th>
              <th className="px-6 py-4 font-semibold">Kuota</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/10">
            {schedules?.map((mcu) => (
              <tr key={mcu.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-navy dark:text-white">
                    <Calendar size={14} className="inline mr-2 text-primary" />
                    {new Date(mcu.schedule_date).toLocaleDateString("id-ID")}
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    <Clock size={14} className="inline mr-2 text-primary" />
                    {mcu.time_start} - {mcu.time_end}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-navy dark:text-white">
                  {mcu.facility_name}
                </td>
                <td className="px-6 py-4 text-text-secondary">
                  {mcu.description || "-"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-primary" />
                    <span className="font-bold">{mcu.registered}</span> / {mcu.quota}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge tone={mcu.is_active ? "emerald" : "navy"}>
                    {mcu.is_active ? "Aktif" : "Selesai"}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <form action={async () => {
                      "use server";
                      await toggleMcuStatus(mcu.id, mcu.is_active);
                    }}>
                      <button className="text-xs font-semibold text-primary hover:underline">
                        Ubah Status
                      </button>
                    </form>
                    <form action={async () => {
                      "use server";
                      await deleteMcuSchedule(mcu.id);
                    }}>
                      <button className="text-rose-500 hover:text-rose-600 transition-colors" aria-label="Hapus Jadwal MCU" title="Hapus Jadwal MCU">
                        <Trash2 size={16} />
                      </button>
                    </form>
                    <DownloadPdfButton id={mcu.id} type="MCU" />
                  </div>
                </td>
              </tr>
            ))}
            {(!schedules || schedules.length === 0) && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                  Belum ada jadwal MCU (Atau tabel mcu_schedules belum dibuat).
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
