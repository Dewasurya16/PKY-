import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ArrowLeft, ShieldAlert, Lock, Eye, EyeOff, Send } from "lucide-react";
import Link from "next/link";
import { ComplaintForm } from "@/components/ui/ComplaintForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaduan Masyarakat (WBS) — Whistleblowing System | PKY Kejaksaan RI",
  description:
    "Laporkan indikasi pelanggaran atau keluhan layanan di fasilitas kesehatan melalui Whistleblowing System PKY.",
};

/**
 * Halaman Whistleblowing System (WBS) untuk pengaduan masyarakat.
 * Menyediakan formulir pelaporan dengan opsi anonim.
 */
export default function PengaduanPage() {
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
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
              <ShieldAlert size={28} />
            </div>
            <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl dark:text-white mb-3">
              Pengaduan Masyarakat (WBS)
            </h1>
            <p className="text-lg text-text-secondary dark:text-white/70 max-w-2xl">
              Whistleblowing System — Laporkan indikasi pelanggaran,
              gratifikasi, atau keluhan layanan di fasilitas kesehatan Kejaksaan
              secara rahasia dan terlindungi.
            </p>
          </div>

          {/* Security Assurance */}
          <div className="mb-12 rounded-2xl bg-gradient-to-r from-navy to-navy-light p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg mb-1">
                  Kerahasiaan Terjamin
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Identitas pelapor dilindungi sesuai dengan PP No. 71 Tahun
                  2000 dan Perja terkait perlindungan pelapor. Anda dapat
                  memilih untuk melaporkan secara anonim.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 lg:p-10 shadow-sm dark:bg-navy dark:border-white/10">
            <h2 className="font-display text-xl font-bold text-navy dark:text-white mb-6">
              Formulir Pengaduan
            </h2>
            <ComplaintForm />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
