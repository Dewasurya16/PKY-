import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ArrowLeft, FileDown, Download, FileText } from "lucide-react";
import Link from "next/link";
import { getPublishedDownloads } from "@/lib/queries/download.queries";
import { DOWNLOAD_CATEGORIES } from "@/lib/types/database";
import type { Download as DownloadType } from "@/lib/types/database";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pusat Unduhan Dokumen & Regulasi | PKY Kejaksaan RI",
  description:
    "Unduh dokumen regulasi, SOP, panduan, dan formulir resmi Pusat Kesehatan Yustisial Kejaksaan RI.",
};

/**
 * Halaman katalog unduhan dokumen publik.
 * Menampilkan semua dokumen yang dipublikasikan, dikelompokkan berdasarkan kategori.
 */
export default async function DokumenPage() {
  const downloads = await getPublishedDownloads();

  /** Kelompokkan dokumen berdasarkan kategori. */
  const grouped = DOWNLOAD_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = downloads.filter((d) => d.category === cat);
      return acc;
    },
    {} as Record<string, DownloadType[]>,
  );

  return (
    <main className="flex min-h-screen flex-col bg-surface-soft dark:bg-navy-dark">
      <Navbar />

      <div className="flex-1 pb-24 pt-12 lg:pt-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          {/* Breadcrumb */}
          <Link
            href="/#transparansi"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
              <FileText size={28} />
            </div>
            <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl dark:text-white mb-3">
              Pusat Unduhan Dokumen
            </h1>
            <p className="text-lg text-text-secondary dark:text-white/70 max-w-2xl">
              Dokumen regulasi, standar operasional prosedur, panduan, dan
              formulir resmi Pusat Kesehatan Yustisial.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-10 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white px-5 py-3 border border-gray-100 dark:bg-navy dark:border-white/10">
              <p className="text-2xl font-extrabold text-primary">
                {downloads.length}
              </p>
              <p className="text-xs text-text-muted dark:text-white/50">
                Total Dokumen
              </p>
            </div>
            <div className="rounded-xl bg-white px-5 py-3 border border-gray-100 dark:bg-navy dark:border-white/10">
              <p className="text-2xl font-extrabold text-navy dark:text-white">
                {DOWNLOAD_CATEGORIES.filter((c) => grouped[c].length > 0).length}
              </p>
              <p className="text-xs text-text-muted dark:text-white/50">
                Kategori Aktif
              </p>
            </div>
          </div>

          {/* Category Sections */}
          {downloads.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white/50 text-center dark:border-white/10 dark:bg-navy/30">
              <FileDown
                size={48}
                className="mb-4 text-text-muted dark:text-white/20"
              />
              <h3 className="mb-2 text-xl font-bold text-navy dark:text-white">
                Belum ada dokumen
              </h3>
              <p className="text-sm text-text-secondary dark:text-white/60">
                Belum ada dokumen yang dipublikasikan saat ini.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {DOWNLOAD_CATEGORIES.map((category) => {
                const items = grouped[category];
                if (items.length === 0) return null;

                return (
                  <section key={category}>
                    <h2 className="font-display text-lg font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                        <FileDown size={16} />
                      </span>
                      {category}
                      <span className="ml-auto rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-text-muted dark:bg-white/10 dark:text-white/50">
                        {items.length} dokumen
                      </span>
                    </h2>

                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:border-primary/30 hover:shadow-sm dark:border-white/10 dark:bg-navy dark:hover:border-primary/50"
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary dark:bg-white/5 dark:text-white/50 dark:group-hover:bg-primary/20 dark:group-hover:text-primary-light transition-colors">
                              <FileDown size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-navy text-sm sm:text-base group-hover:text-primary transition-colors dark:text-white dark:group-hover:text-primary-light">
                                {item.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-text-secondary mt-1 dark:text-white/70">
                                {item.description}
                              </p>
                              <div className="mt-2 flex items-center gap-2 text-[11px] font-medium text-gray-400 dark:text-white/40">
                                <span className="rounded bg-gray-100 px-2 py-0.5 dark:bg-white/10">
                                  {item.file_type}
                                </span>
                                <span>•</span>
                                <span>{item.file_size}</span>
                              </div>
                            </div>
                          </div>

                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Unduh ${item.title}`}
                            className="flex h-10 items-center gap-2 rounded-xl bg-primary/10 px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white dark:bg-primary/20 dark:text-primary-light dark:hover:bg-primary dark:hover:text-white"
                          >
                            <Download size={16} />
                            Unduh
                          </a>
                        </div>
                      ))}
                    </div>
                  </section>
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
