"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/ui/BookingModal";

export function CtaChannels() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <section id="kontak" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background with mesh gradient */}
      <div className="absolute inset-0 bg-navy-dark" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-60" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      
      {/* Animated abstract shapes */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-80 h-80 bg-accent rounded-full blur-[100px] opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10 mt-16 lg:mt-24">
        <div className="relative glass-card-dark rounded-3xl p-8 lg:p-12 xl:p-16 border border-white/10 shadow-2xl overflow-visible flex flex-col md:flex-row items-center">
          
          {/* Content (Kiri) */}
          <div className="relative z-10 w-full md:w-3/5 text-center md:text-left">
            <Reveal>
              <h2 className="text-balance font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Temukan informasi fasilitas kesehatan Kejaksaan
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-blue-100/80 mx-auto md:mx-0">
                Akses pusat informasi Klinik dan Rumah Sakit Adhyaksa, pengawasan, serta program kesehatan bagi aparatur Kejaksaan RI.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-8 flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-sm text-blue-50/90 font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-primary-light" /> Jaringan RS Adhyaksa
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-primary-light" /> Klinik di 34 Provinsi
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-primary-light" /> Standar Mutu Terjamin
              </span>
            </Reveal>

            <Reveal delay={0.3} className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
              <Button 
                variant="accent" 
                size="xl" 
                className="w-full sm:w-auto text-navy-dark shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                onClick={() => setIsModalOpen(true)}
              >
                Cari Fasilitas Kesehatan
              </Button>
              <Button variant="outline" size="xl" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 dark:text-white dark:border-white/20 dark:hover:bg-white/10">
                Hubungi Bantuan
              </Button>
            </Reveal>
          </div>

          {/* Image (Kanan) - Fixed Size & Pop-out Effect */}
          <div className="absolute bottom-0 right-0 w-full md:w-2/5 h-full pointer-events-none flex justify-center md:justify-end items-end md:pr-10 opacity-30 md:opacity-100 z-0">
            <img 
              src="/image/jaksa2.png" 
              alt="Jaksa PKY" 
              className="h-[80%] md:h-[120%] w-auto max-w-none object-contain object-bottom drop-shadow-2xl" 
            />
          </div>
        </div>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
