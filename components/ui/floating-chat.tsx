"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"

export function FloatingChat() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-4 w-[320px] sm:w-[350px] overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-12px_rgba(27,58,92,0.2)] border border-gray-100 dark:bg-navy-dark dark:border-white/10 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="bg-primary px-5 py-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold">Bantuan Cepat PKY</h3>
                  <p className="text-xs text-primary-50">Layanan Aktif 24/7</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-white/10 p-1.5 hover:bg-white/20 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="h-64 overflow-y-auto bg-surface-muted/50 dark:bg-navy p-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-end gap-2">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                    CS
                  </div>
                  <div className="rounded-2xl rounded-bl-none bg-white p-3 text-sm text-text-secondary shadow-sm dark:bg-navy-dark dark:text-white/80">
                    Halo! Ada yang bisa kami bantu terkait informasi fasilitas kesehatan, Klinik Adhyaksa, RS Adhyaksa, atau jadwal MCU hari ini?
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 dark:bg-navy-dark">
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-surface-muted px-4 py-2 dark:border-white/10 dark:bg-navy">
                <input 
                  type="text" 
                  placeholder="Ketik pesan Anda..." 
                  className="w-full bg-transparent text-sm outline-none dark:text-white dark:placeholder-white/40"
                />
                <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105 active:scale-95">
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-4 text-white shadow-lg transition-colors hover:bg-primary-dark"
      >
        <MessageCircle size={24} />
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="whitespace-nowrap font-medium text-sm pr-2"
            >
              Butuh Bantuan?
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
