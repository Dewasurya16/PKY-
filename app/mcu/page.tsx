import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { getAllMcuSchedules } from "@/lib/queries/mcu.queries";
import { Calendar, Clock, Activity, MapPin } from "lucide-react";
import { McuRegisterModal } from "@/components/ui/McuRegisterModal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal Medical Check-Up (MCU) | PKY Kejaksaan RI",
  description: "Daftar jadwal Medical Check-Up aktif pada fasilitas kesehatan Kejaksaan RI.",
};

export default async function McuPublicPage() {
  const schedules = await getAllMcuSchedules();
  const activeSchedules = schedules?.filter(s => s.is_active) || [];

  return (
    <main className="flex min-h-screen flex-col bg-surface-soft dark:bg-navy-dark">
      <Navbar />

      <div className="flex-1 pb-24 pt-12 lg:pt-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl font-extrabold text-navy sm:text-5xl dark:text-white mb-4">
              Jadwal Medical Check-Up
            </h1>
            <p className="text-lg text-text-secondary dark:text-white/70 max-w-2xl mx-auto">
              Pantau jadwal MCU rutin yang diselenggarakan di fasilitas kesehatan jajaran Kejaksaan RI.
            </p>
          </div>

          {/* Grid */}
          {activeSchedules.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeSchedules.map(mcu => {
                const sisaKuota = mcu.quota - mcu.registered;
                return (
                  <div key={mcu.id} className="group flex flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-navy dark:hover:border-primary-light">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary dark:bg-primary/20 dark:text-primary-light">
                        <Activity size={14} /> MCU Rutin
                      </div>
                      {sisaKuota > 0 ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          Sisa {sisaKuota} Kuota
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-rose-500">Penuh</span>
                      )}
                    </div>
                    
                    <h3 className="mb-2 font-display text-xl font-bold text-navy dark:text-white">
                      {mcu.facility_name}
                    </h3>
                    {mcu.description && (
                      <p className="mb-6 text-sm text-text-secondary line-clamp-2">
                        {mcu.description}
                      </p>
                    )}

                    <div className="mt-auto space-y-3 pt-4 border-t border-gray-100 dark:border-white/10 text-sm">
                      <div className="flex items-center gap-3 text-text-secondary dark:text-white/70">
                        <Calendar size={16} className="text-primary" />
                        <span className="font-medium">{new Date(mcu.schedule_date).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-3 text-text-secondary dark:text-white/70">
                        <Clock size={16} className="text-primary" />
                        <span className="font-medium">{mcu.time_start} - {mcu.time_end} WIB</span>
                      </div>
                      <div className="flex items-center gap-3 text-text-secondary dark:text-white/70">
                        <MapPin size={16} className="text-primary" />
                        <span className="font-medium truncate">{mcu.facility_name}</span>
                      </div>
                    </div>
                    
                    <McuRegisterModal 
                      scheduleId={mcu.id}
                      facilityName={mcu.facility_name || "Fasilitas"}
                      isFull={sisaKuota <= 0}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white/50 p-12 text-center dark:border-white/10 dark:bg-navy/50">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                <Calendar size={32} />
              </div>
              <h3 className="font-display text-xl font-bold text-navy dark:text-white mb-2">Belum Ada Jadwal Aktif</h3>
              <p className="text-text-secondary dark:text-white/70">Saat ini tidak ada jadwal MCU yang sedang dibuka.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
