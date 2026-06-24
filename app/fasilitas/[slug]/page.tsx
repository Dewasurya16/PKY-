import { notFound } from "next/navigation";
import { facilitiesData } from "@/lib/site";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { MapPin, Phone, ArrowLeft, Stethoscope } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function FacilityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const facility = facilitiesData.find((f) => f.slug === resolvedParams.slug);

  if (!facility) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-surface-soft dark:bg-navy-dark">
      <Navbar />
      
      <div className="flex-1 pb-24 pt-12 lg:pt-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 dark:bg-navy dark:border-white/10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge tone="blue">{facility.type}</Badge>
              <Badge tone={facility.available ? "emerald" : "amber"}>{facility.status}</Badge>
            </div>

            <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl lg:text-5xl dark:text-white mb-6">
              {facility.name}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-text-secondary dark:text-white/70 mb-10 border-b border-gray-100 pb-10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin size={18} />
                </div>
                <span className="font-medium">{facility.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone size={18} />
                </div>
                <span className="font-medium">{facility.contact}</span>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold text-navy dark:text-white mb-4">Tentang Fasilitas</h2>
              <p className="text-lg leading-relaxed text-text-secondary dark:text-white/80">
                {facility.description}
              </p>
            </div>

            {facility.services.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-navy dark:text-white mb-6">Layanan Tersedia</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {facility.services.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-surface-muted dark:bg-white/5 border border-gray-100 dark:border-white/5">
                      <Stethoscope size={18} className="text-primary dark:text-primary-light" />
                      <span className="font-medium text-navy dark:text-white/90">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
