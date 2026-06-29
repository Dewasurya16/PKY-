"use client";

import { SectionTag } from "@/components/ui/Badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";
import { FileText, Download, ShieldAlert, MessageSquare, ExternalLink, FileDown } from "lucide-react";

const downloads = [
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

export function Transparency() {
  return (
    <section id="transparansi" className="bg-white py-24 lg:py-28 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center mb-16">
          <SectionTag align="center">Transparansi & Informasi</SectionTag>
          <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Layanan Informasi Publik & Regulasi
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Berkomitmen mewujudkan pelayanan kesehatan yang transparan, akuntabel, dan berintegritas.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* PPID & Pengaduan (Left Column - takes 2/5) */}
          <div className="lg:col-span-2 space-y-6">
            <Reveal delay={0.1} className="rounded-3xl bg-surface-muted p-8 border border-gray-100">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FileText size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-3">Layanan PPID</h3>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                Pejabat Pengelola Informasi dan Dokumentasi (PPID) Kejaksaan RI memfasilitasi permohonan informasi publik terkait kebijakan dan laporan kesehatan instansi.
              </p>
              <Button className="w-full gap-2">
                Ajukan Permohonan <ExternalLink size={16} />
              </Button>
            </Reveal>

            <Reveal delay={0.2} className="rounded-3xl bg-gradient-to-br from-navy to-navy-light p-8 text-white">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <ShieldAlert size={24} className="text-amber-400" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Pengaduan Masyarakat (WBS)</h3>
              <p className="text-sm text-white/70 mb-6 leading-relaxed">
                Laporkan indikasi pelanggaran, gratifikasi, atau keluhan layanan di fasilitas kesehatan melalui Whistleblowing System.
              </p>
              <Button variant="outline" className="w-full gap-2 border-white/20 bg-white/10 hover:bg-white/20 text-white">
                Buat Laporan <MessageSquare size={16} />
              </Button>
            </Reveal>
          </div>

          {/* Pusat Unduhan (Right Column - takes 3/5) */}
          <div className="lg:col-span-3">
            <Reveal delay={0.3} className="h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-display text-xl font-bold text-navy">Pusat Unduhan Regulasi</h3>
                  <p className="text-sm text-text-secondary mt-1">Dokumen, pedoman, dan standar operasional</p>
                </div>
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Download size={24} />
                </div>
              </div>

              <Stagger className="space-y-4">
                {downloads.map((item, i) => (
                  <StaggerItem key={i}>
                    <div className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-100 p-4 transition-all hover:border-primary/30 hover:bg-primary-50/50 hover:shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-primary">
                          <FileDown size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-navy text-sm sm:text-base group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-text-secondary mt-1">
                            {item.desc}
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-[11px] font-medium text-gray-400">
                            <span className="rounded bg-gray-100 px-2 py-0.5">{item.type}</span>
                            <span>•</span>
                            <span>{item.size}</span>
                          </div>
                        </div>
                      </div>
                      <a href="/document/dokumen-pky.pdf" download={`${item.title}.pdf`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors">
                        <Download size={18} />
                      </a>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              
              <div className="mt-8 text-center">
                <Button variant="outline" className="w-full sm:w-auto">
                  Lihat Semua Dokumen
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
