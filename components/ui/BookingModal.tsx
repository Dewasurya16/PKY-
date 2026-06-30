"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, ArrowRight, Building2, Hospital, Stethoscope, HeartPulse } from "lucide-react";
import { useRouter } from "next/navigation";
import { FACILITY_TYPES } from "@/lib/types/database";

interface BookingModalProps {
  /** Apakah modal terbuka. */
  isOpen: boolean;
  /** Callback saat modal ditutup. */
  onClose: () => void;
}

/** Mapping ikon per tipe fasilitas untuk tampilan kartu. */
const FACILITY_ICONS: Record<string, React.ElementType> = {
  "Rumah Sakit Umum": Hospital,
  "Rumah Sakit Khusus": Building2,
  "Klinik Pratama": Stethoscope,
  "Klinik Utama": HeartPulse,
};

/**
 * Modal pemilihan tipe fasilitas kesehatan.
 * Saat pengguna memilih tipe, langsung redirect ke halaman
 * pencarian fasilitas `/fasilitas?type=...` (alur dinamis).
 */
export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const router = useRouter();

  React.useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /**
   * Handler saat tipe fasilitas dipilih.
   * Menutup modal dan melakukan redirect ke halaman hasil pencarian.
   *
   * @param type - Tipe fasilitas yang dipilih
   */
  const handleSelectType = (type: string) => {
    onClose();
    router.push(`/fasilitas?type=${encodeURIComponent(type)}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm dark:bg-black/60"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] pointer-events-auto overflow-hidden dark:bg-navy-dark dark:border dark:border-white/10"
            >
              {/* Header */}
              <div className="bg-surface-muted px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:bg-navy dark:border-white/10">
                <h3 className="font-display font-bold text-navy dark:text-white flex items-center gap-2">
                  <Activity size={18} className="text-primary" />
                  Pilih Fasilitas
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 text-text-muted hover:text-navy dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                  aria-label="Tutup modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-display font-bold text-navy dark:text-white mb-2">
                    Kategori Fasilitas
                  </h4>
                  <p className="text-sm text-text-secondary dark:text-white/60">
                    Pilih kategori untuk menjelajahi daftar layanan kesehatan di jaringan PKY.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FACILITY_TYPES.map((item) => {
                    const Icon = FACILITY_ICONS[item] ?? Stethoscope;
                    return (
                      <button
                        key={item}
                        onClick={() => handleSelectType(item)}
                        className="group relative flex flex-col items-center p-6 text-center rounded-2xl border-2 border-gray-100 bg-white transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-white/5 dark:bg-navy dark:hover:border-primary/50 dark:hover:bg-navy-light"
                      >
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors dark:bg-primary/20 dark:text-primary-light">
                          <Icon size={28} strokeWidth={1.5} />
                        </div>
                        <span className="font-bold text-navy dark:text-white">
                          {item}
                        </span>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 opacity-0 transition-all group-hover:scale-x-100 group-hover:opacity-100 rounded-b-2xl" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
