import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { getFacilitiesByType } from "@/lib/queries/facility-search.queries";
import { getAvailableFacilities } from "@/lib/queries/facility.queries";
import { FACILITY_TYPES } from "@/lib/types/database";
import type { FacilityType } from "@/lib/types/database";
import type { Metadata } from "next";
import { FacilitySearchResults } from "./FacilitySearchResults";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pencarian Fasilitas Kesehatan | PKY Kejaksaan RI",
  description:
    "Cari fasilitas kesehatan di jaringan Pusat Kesehatan Yustisial — Rumah Sakit Adhyaksa, Klinik Pratama, dan Klinik Utama.",
};

/**
 * Halaman hasil pencarian fasilitas kesehatan.
 * Menerima query parameter `type` untuk memfilter berdasarkan tipe fasilitas.
 * Jika tidak ada filter, menampilkan semua fasilitas yang tersedia.
 */
export default async function FacilitySearchPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const typeParam = resolvedParams.type ?? "";

  /** Validasi apakah tipe yang diberikan termasuk tipe yang dikenali. */
  const isValidType = FACILITY_TYPES.includes(typeParam as FacilityType);

  const facilities = isValidType
    ? await getFacilitiesByType(typeParam as FacilityType)
    : await getAvailableFacilities();

  return (
    <main className="flex min-h-screen flex-col bg-surface-soft dark:bg-navy-dark">
      <Navbar />

      <div className="flex-1 pb-24 pt-12 lg:pt-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
              <Search size={28} />
            </div>
            <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl dark:text-white mb-3">
              Hasil Pencarian Fasilitas
            </h1>
            <p className="text-lg text-text-secondary dark:text-white/70 max-w-2xl">
              {isValidType
                ? `Menampilkan fasilitas kesehatan bertipe "${typeParam}" di jaringan PKY.`
                : "Menampilkan semua fasilitas kesehatan di jaringan PKY Kejaksaan RI."}
            </p>
          </div>

          {/* Dynamic Results (Client Component) */}
          <FacilitySearchResults
            facilities={facilities}
            selectedType={isValidType ? typeParam : ""}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
