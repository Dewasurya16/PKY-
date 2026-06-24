"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Clock, Stethoscope } from "lucide-react";
import { Button } from "./button";

interface SearchScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const dummyData = [
  {
    id: 1,
    hospital: "RSU Adhyaksa Ceger",
    location: "Jakarta Timur",
    doctor: "dr. Andi Wijaya, Sp.PD",
    poly: "Poliklinik Penyakit Dalam",
    date: "Besok, 25 Juni 2026",
    time: "09:00 - 12:00 WIB",
    available: true,
  },
  {
    id: 2,
    hospital: "RS Adhyaksa Banten",
    location: "Serang, Banten",
    doctor: "dr. Siti Aminah, Sp.A",
    poly: "Poliklinik Anak",
    date: "Lusa, 26 Juni 2026",
    time: "13:00 - 16:00 WIB",
    available: true,
  },
  {
    id: 3,
    hospital: "RSU Adhyaksa Ceger",
    location: "Jakarta Timur",
    doctor: "dr. Budi Santoso, Sp.J",
    poly: "Poliklinik Jantung",
    date: "Kamis, 27 Juni 2026",
    time: "08:00 - 11:00 WIB",
    available: false,
  },
];

export function SearchScheduleModal({ isOpen, onClose }: SearchScheduleModalProps) {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
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
            className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm transition-opacity dark:bg-navy-dark/90"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-navy dark:border dark:border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="border-b border-gray-100 bg-surface-soft px-6 py-6 dark:bg-white/5 dark:border-white/10">
                <button
                  onClick={onClose}
                  className="absolute right-6 top-6 rounded-full p-2 text-text-muted transition-colors hover:bg-white hover:text-navy dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy dark:text-white">
                      Hasil Pencarian Jadwal
                    </h3>
                    <p className="text-sm text-text-secondary dark:text-white/70">
                      Menampilkan jadwal dokter di jaringan RS Adhyaksa
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  {dummyData.map((item) => (
                    <div 
                      key={item.id} 
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-100 p-5 transition-all hover:border-primary hover:shadow-md dark:border-white/10 dark:hover:border-primary-light dark:bg-white/5"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            {item.hospital}
                          </span>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.available ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                            {item.available ? 'Tersedia' : 'Penuh'}
                          </span>
                        </div>
                        
                        <div>
                          <h4 className="font-display text-lg font-bold text-navy dark:text-white">
                            {item.doctor}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-sm text-text-secondary dark:text-white/60">
                            <Stethoscope size={14} />
                            <span>{item.poly}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary dark:text-white/60">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 sm:mt-0">
                        <Button 
                          variant={item.available ? "primary" : "outline"} 
                          size="md" 
                          className="w-full sm:w-auto"
                          disabled={!item.available}
                        >
                          {item.available ? "Pilih Jadwal" : "Jadwal Penuh"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Footer */}
              <div className="bg-surface-soft px-6 py-4 border-t border-gray-100 dark:bg-white/5 dark:border-white/10 text-center">
                <p className="text-xs text-text-muted dark:text-white/50">
                  Data di atas adalah simulasi pencarian ketersediaan jadwal dokter di rumah sakit mitra BPKY.
                </p>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
