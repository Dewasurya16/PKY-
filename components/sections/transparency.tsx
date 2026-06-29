"use client";

import { SectionTag } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { FileText, Download, ShieldAlert, MessageSquare, ExternalLink, FileDown } from "lucide-react";
import Link from "next/link";

type DownloadItem = {
  title: string;
  desc: string;
  size: string;
  type: string;
};

const downloads: DownloadItem[] = [
  {
    title: "Perja No. 12 Tahun 2023",
    desc: "Tentang Pedoman Pelayanan Kesehatan di Lingkungan Kejaksaan",
    size: "2.4 MB",
    type: "PDF",
  },
  {
    title: "Standar Operasional Prosedur (SOP)",
    desc: "SOP Pelayanan Medis Klinik Pratama Adhyaksa",
    size: "1.8 MB",
    type: "PDF",
  },
  {
    title: "Buku Saku MCU 2026",
    desc: "Panduan lengkap Medical Check-Up bagi Aparatur",
    size: "5.1 MB",
    type: "PDF",
  },
  {
    title: "Formulir Rujukan Pasien",
    desc: "Form standar rujukan ke Rumah Sakit Adhyaksa",
    size: "800 KB",
    type: "PDF",
  },
];

function TransparencyServiceCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  desc,
  actionText,
  ActionIcon,
  variant = "light",
  href,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
  actionText: string;
  ActionIcon: React.ElementType;
  variant?: "light" | "dark";
  href: string;
}) {
  return (
    <Reveal className={`rounded-3xl p-8 border ${
      variant === "light" 
        ? "bg-surface-muted border-gray-100 dark:bg-navy/50 dark:border-white/10" 
        : "bg-gradient-to-br from-navy to-navy-light text-white dark:border-white/10"
    }`}>
      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
        <Icon size={24} aria-hidden="true" />
      </div>
      <h3 className={`font-display text-xl font-bold mb-3 ${variant === "light" ? "text-navy dark:text-white" : ""}`}>{title}</h3>
      <p className={`text-sm mb-6 leading-relaxed ${variant === "light" ? "text-text-secondary dark:text-white/70" : "text-white/70"}`}>
        {desc}
      </p>
      <Link href={href} aria-label={`${actionText} untuk ${title}`} className="block w-full">
        <Button 
          variant={variant === "light" ? "primary" : "outline"} 
          className={`w-full gap-2 ${variant === "dark" ? "border-white/20 bg-white/10 hover:bg-white/20 text-white" : ""}`}
        >
          {actionText} <ActionIcon size={16} aria-hidden="true" />
        </Button>
      </Link>
    </Reveal>
  );
}

function DownloadListItem({ item }: { item: DownloadItem }) {
  return (
    <StaggerItem>
      <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-100 p-4 transition-all hover:border-primary/30 hover:bg-primary-50/50 hover:shadow-sm dark:border-white/10 dark:bg-navy/30 dark:hover:bg-navy/50 dark:hover:border-primary/50">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-primary dark:bg-white/5 dark:text-white/50 dark:group-hover:bg-primary/20 dark:group-hover:text-primary-light transition-colors">
            <FileDown size={20} aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-bold text-navy text-sm sm:text-base group-hover:text-primary transition-colors dark:text-white dark:group-hover:text-primary-light">
              {item.title}
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 dark:text-white/70">
              {item.desc}
            </p>
            <div className="mt-2 flex items-center gap-2 text-[11px] font-medium text-gray-400 dark:text-white/40">
              <span className="rounded bg-gray-100 px-2 py-0.5 dark:bg-white/10">{item.type}</span>
              <span>•</span>
              <span>{item.size}</span>
            </div>
          </div>
        </div>
        <a 
          href={`/document/${item.title.replace(/\s+/g, '-').toLowerCase()}.pdf`}
          download={`${item.title}.pdf`}
          aria-label={`Unduh ${item.title}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors dark:text-white/40 dark:hover:text-primary-light dark:hover:bg-primary/20"
        >
          <Download size={18} aria-hidden="true" />
        </a>
      </div>
    </StaggerItem>
  );
}

export function Transparency() {
  return (
    <section 
      id="transparansi" 
      aria-labelledby="transparency-heading"
      className="bg-white py-24 lg:py-28 border-t border-gray-100 dark:bg-navy-dark dark:border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center mb-16">
          <SectionTag align="center">Transparansi & Informasi</SectionTag>
          <h2 
            id="transparency-heading"
            className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-navy sm:text-4xl dark:text-white"
          >
            Layanan Informasi Publik & Regulasi
          </h2>
          <p className="mt-4 text-base text-text-secondary dark:text-white/70">
            Berkomitmen mewujudkan pelayanan kesehatan yang transparan, akuntabel, dan berintegritas.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* PPID & Pengaduan (Left Column - takes 2/5) */}
          <div className="lg:col-span-2 space-y-6">
            <TransparencyServiceCard
              icon={FileText}
              iconBg="bg-blue-100 dark:bg-blue-500/20"
              iconColor="text-blue-600 dark:text-blue-400"
              title="Layanan PPID"
              desc="Pejabat Pengelola Informasi dan Dokumentasi (PPID) Kejaksaan RI memfasilitasi permohonan informasi publik terkait kebijakan dan laporan kesehatan instansi."
              actionText="Ajukan Permohonan"
              ActionIcon={ExternalLink}
              href="/layanan-ppid"
            />
            <TransparencyServiceCard
              icon={ShieldAlert}
              iconBg="bg-white/10"
              iconColor="text-amber-400"
              title="Pengaduan Masyarakat (WBS)"
              desc="Laporkan indikasi pelanggaran, gratifikasi, atau keluhan layanan di fasilitas kesehatan melalui Whistleblowing System."
              actionText="Buat Laporan"
              ActionIcon={MessageSquare}
              variant="dark"
              href="/pengaduan"
            />
          </div>

          {/* Pusat Unduhan (Right Column - takes 3/5) */}
          <div className="lg:col-span-3">
            <Reveal delay={0.3} className="h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:bg-navy dark:border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-display text-xl font-bold text-navy dark:text-white">Pusat Unduhan Regulasi</h3>
                  <p className="text-sm text-text-secondary mt-1 dark:text-white/70">Dokumen, pedoman, dan standar operasional</p>
                </div>
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-light dark:bg-primary/20">
                  <Download size={24} aria-hidden="true" />
                </div>
              </div>

              <Stagger className="space-y-4">
                {downloads.map((item, i) => (
                  <DownloadListItem key={i} item={item} />
                ))}
              </Stagger>
              
              <div className="mt-8 text-center">
                <Link href="/dokumen" className="inline-block w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto dark:border-white/20 dark:text-white dark:hover:bg-white/10">
                    Lihat Semua Dokumen
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
