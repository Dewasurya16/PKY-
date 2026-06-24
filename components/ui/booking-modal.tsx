"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Activity, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = React.useState(1)

  // Reset step when closed
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep(1), 300)
    }
  }, [isOpen])

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
                  Pendaftaran Layanan
                </h3>
                <button 
                  onClick={onClose}
                  className="p-1.5 text-text-muted hover:text-navy dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Progress */}
                <div className="flex gap-2 mb-8">
                  <div className="h-1.5 flex-1 rounded-full bg-primary" />
                  <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-gray-200 dark:bg-white/10'}`} />
                  <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-gray-200 dark:bg-white/10'}`} />
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-lg font-bold text-navy dark:text-white mb-4">Pilih Jenis Layanan</h4>
                      <div className="grid gap-3">
                        {["Medical Check Up (MCU)", "Konsultasi Umum", "Pemeriksaan Gigi", "Konsultasi Psikologi"].map((item) => (
                          <button
                            key={item}
                            onClick={() => setStep(2)}
                            className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary-50 transition-colors text-left dark:border-white/10 dark:hover:bg-primary/20 dark:hover:border-primary-light"
                          >
                            <span className="font-medium text-text-secondary dark:text-white/80">{item}</span>
                            <ArrowRight size={16} className="text-text-muted" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-lg font-bold text-navy dark:text-white mb-4">Pilih Tanggal</h4>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {["Hari Ini", "Besok", "Lusa", "Pilih Kalender"].map((item, i) => (
                          <button
                            key={item}
                            onClick={() => setStep(3)}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-colors ${i === 3 ? 'border-dashed border-gray-300 hover:border-primary text-text-muted dark:border-white/20' : 'border-gray-200 hover:border-primary hover:bg-primary-50 text-text-secondary dark:border-white/10 dark:hover:bg-primary/20 dark:text-white/80'}`}
                          >
                            {i === 3 && <Calendar size={18} />}
                            <span className="font-medium text-sm">{item}</span>
                          </button>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
                        Kembali
                      </Button>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 dark:bg-green-900/30">
                        <CheckCircle2 size={32} className="text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="text-xl font-bold text-navy dark:text-white mb-2">Jadwal Dikonfirmasi!</h4>
                      <p className="text-sm text-text-secondary dark:text-white/60 mb-8">
                        Silakan periksa email kejaksaan Anda untuk detail pendaftaran dan antrean.
                      </p>
                      <Button variant="primary" className="w-full" onClick={onClose}>
                        Selesai
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
