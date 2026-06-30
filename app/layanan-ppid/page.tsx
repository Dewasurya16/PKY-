import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ArrowLeft, FileText, Shield, Clock, CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import { PpidForm } from "@/components/ui/PpidForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan PPID — Permohonan Informasi Publik | PKY Kejaksaan RI",
  description:
    "Ajukan permohonan informasi publik melalui PPID Pusat Kesehatan Yustisial Kejaksaan Republik Indonesia.",
};

/**
 * Halaman permohonan informasi publik melalui PPID.
 * Menampilkan panduan prosedur dan formulir pengajuan.
 */
export default function LayananPpidPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface-soft dark:bg-navy-dark">
      <Navbar />

      <div className="flex-1 pb-24 pt-12 lg:pt-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          {/* Breadcrumb */}
          <Link
            href="/#transparansi"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <FileText size={28} />
            </div>
            <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl dark:text-white mb-3">
              Layanan PPID
            </h1>
            <p className="text-lg text-text-secondary dark:text-white/70 max-w-2xl">
              Pejabat Pengelola Informasi dan Dokumentasi (PPID) Kejaksaan RI
              memfasilitasi permohonan informasi publik terkait kebijakan dan
              laporan kesehatan instansi.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid gap-4 sm:grid-cols-3 mb-12">
            {[
              {
                icon: Shield,
                title: "Transparan",
                desc: "Informasi terbuka sesuai UU KIP",
              },
              {
                icon: Clock,
                title: "Responsif",
                desc: "Diproses dalam 10 hari kerja",
              },
              {
                icon: CheckCircle2,
                title: "Terdokumentasi",
                desc: "Setiap permohonan tercatat resmi",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-white/10 dark:bg-navy"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-navy dark:text-white text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary dark:text-white/60 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 lg:p-10 shadow-sm dark:bg-navy dark:border-white/10">
            <h2 className="font-display text-xl font-bold text-navy dark:text-white mb-6">
              Formulir Permohonan Informasi
            </h2>
            <PpidForm />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
