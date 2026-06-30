"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface InfoRequestModalProps {
  /** Apakah modal terbuka. */
  isOpen: boolean;
  /** Callback saat modal ditutup. */
  onClose: () => void;
  /** Nama fasilitas yang dimintai informasi. */
  facilityName: string;
}

/**
 * Modal sukses "Permintaan Informasi Terkirim" yang muncul setelah
 * pengguna mengeklik "Minta Informasi Detail" di halaman hasil pencarian.
 */
export function InfoRequestModal({
  isOpen,
  onClose,
  facilityName,
}: InfoRequestModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
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
              className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] pointer-events-auto dark:bg-navy-dark dark:border dark:border-white/10"
            >
              {/* Header */}
              <div className="flex justify-end p-4">
                <button
                  onClick={onClose}
                  className="p-1.5 text-text-muted hover:text-navy dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                  aria-label="Tutup"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-8 pb-8 text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckCircle2
                    size={40}
                    className="text-emerald-600 dark:text-emerald-400"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold text-navy dark:text-white mb-3">
                  Permintaan Informasi Terkirim!
                </h3>
                <p className="text-sm text-text-secondary dark:text-white/60 mb-2 leading-relaxed">
                  Permintaan informasi detail mengenai{" "}
                  <strong className="text-navy dark:text-white">
                    {facilityName}
                  </strong>{" "}
                  telah berhasil dikirim.
                </p>
                <p className="text-xs text-text-muted dark:text-white/40 mb-8">
                  Tim PKY akan menghubungi Anda melalui email kejaksaan dalam
                  1×24 jam kerja.
                </p>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={onClose}
                >
                  Selesai
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
