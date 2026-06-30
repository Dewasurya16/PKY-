import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAvailableFacilities } from "@/lib/queries/facility.queries";
import { Stethoscope, HeartPulse, Pill, Activity, ClipboardCheck, Ambulance } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  HeartPulse,
  Pill,
  Activity,
  ClipboardCheck,
  Ambulance,
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const facilities = await getAvailableFacilities();

  return (
    <main className="flex min-h-screen flex-col bg-surface-soft dark:bg-navy-dark">
      <Navbar />
      
      <div className="flex-1 pb-24 pt-12 lg:pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <Link 
              href="/#layanan" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft size={16} /> Kembali ke Beranda
            </Link>
            <h1 className="font-display text-4xl font-extrabold text-navy sm:text-5xl dark:text-white mb-4">
              Layanan & Program PKY
            </h1>
            <p className="text-lg text-text-secondary dark:text-white/70">
              Berikut adalah daftar layanan kesehatan dan program pembinaan komprehensif yang disediakan oleh Pusat Kesehatan Yustisial.
            </p>
          </div>

          {(!facilities || facilities.length === 0) ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white/50 text-center dark:border-white/10 dark:bg-navy/30">
              <Stethoscope size={48} className="mb-4 text-text-muted dark:text-white/20" />
              <h3 className="mb-2 text-xl font-bold text-navy dark:text-white">Data belum tersedia</h3>
              <p className="text-sm text-text-secondary dark:text-white/60">
                Belum ada data fasilitas/layanan yang dipublikasikan saat ini.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {facilities.map((service) => {
                // Try to infer an icon from the facility type or services, fallback to Stethoscope
                const iconName = service.type === "Klinik Utama" ? "HeartPulse" : (service.type === "Apotek" ? "Pill" : "Stethoscope");
                const Icon = iconMap[iconName] || Stethoscope;
                return (
                  <div key={service.id} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 dark:bg-navy dark:border-white/10 border border-transparent">
                    <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl icon-container bg-primary/10 text-primary dark:bg-primary/20`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-navy dark:text-white mb-4">
                      {service.name}
                    </h3>
                    <p className="flex-1 text-base leading-relaxed text-text-secondary dark:text-white/70">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
