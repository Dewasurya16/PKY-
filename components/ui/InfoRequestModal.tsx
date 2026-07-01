"use client";

import * as React from "react";
import { useState, useActionState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitInfoRequest } from "@/lib/actions/info-request.actions";
import { toast } from "sonner";
import type { ActionState } from "@/lib/types/database";

interface InfoRequestModalProps {
  /** Apakah modal terbuka. */
  isOpen: boolean;
  /** Callback saat modal ditutup. */
  onClose: () => void;
  /** Nama fasilitas yang dimintai informasi. */
  facilityName: string;
}

const initialState: ActionState = {
  success: false,
};

/**
 * Modal "Minta Informasi Detail" yang muncul setelah
 * pengguna mengeklik "Minta Informasi Detail" di halaman hasil pencarian.
 */
export function InfoRequestModal({
  isOpen,
  onClose,
  facilityName,
}: InfoRequestModalProps) {
  const [state, formAction, isPending] = useActionState(submitInfoRequest, initialState);

  useEffect(() => {
    if (state.success && !isPending) {
      toast.success("Permintaan Terkirim!", {
        description: "Tim PKY akan segera menghubungi Anda.",
      });
      if (state.warning) {
        toast.warning(state.warning);
      }
      onClose();
    } else if (state.error && !isPending) {
      toast.error("Gagal Mengirim", {
        description: state.error || "Terjadi kesalahan jaringan, silakan coba lagi.",
      });
    }
  }, [state, isPending, onClose]);

  // Reset body overflow when opened/closed
  useEffect(() => {
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

  const handleClose = () => {
    onClose();
  };

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
            onClick={handleClose}
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
                  onClick={handleClose}
                  className="p-1.5 text-text-muted hover:text-navy dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                  aria-label="Tutup"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-8 pb-8">
                <h3 className="font-display text-2xl font-bold text-navy dark:text-white mb-2">
                  Minta Informasi Detail
                </h3>
                <p className="text-sm text-text-secondary dark:text-white/60 mb-6 leading-relaxed">
                  Silakan isi form di bawah untuk meminta informasi detail mengenai{" "}
                  <strong className="text-navy dark:text-white">
                    {facilityName}
                  </strong>
                  .
                </p>

                <form action={formAction} className="space-y-4">
                  <input type="hidden" name="facility_name" value={facilityName} />
                  
                  <div className="space-y-1.5">
                    <label htmlFor="user_name" className="text-sm font-medium text-navy dark:text-white">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      placeholder="Contoh: Budi Santoso"
                      required
                      disabled={isPending}
                    />
                    {state?.fieldErrors?.user_name && (
                      <p className="text-xs text-rose-500 mt-1">{state.fieldErrors.user_name[0]}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email_kejaksaan" className="text-sm font-medium text-navy dark:text-white">
                      Email Kejaksaan
                    </label>
                    <input
                      type="email"
                      id="email_kejaksaan"
                      name="email_kejaksaan"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      placeholder="budi@kejaksaan.go.id"
                      required
                      disabled={isPending}
                    />
                    {state?.fieldErrors?.email_kejaksaan && (
                      <p className="text-xs text-rose-500 mt-1">{state.fieldErrors.email_kejaksaan[0]}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full gap-2"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Kirim Permintaan
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
