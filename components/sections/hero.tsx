"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  MapPin,
  Calendar,
  Search,
  CheckCircle2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JusticeHeartbeatMark } from "@/components/ui/JusticeMark";
import { CountUp } from "@/components/ui/CountUp";
import { FloatingParticles } from "@/components/ui/ParticlesBg";

const BookingModal = dynamic(() => import("@/components/ui/BookingModal").then(mod => mod.BookingModal), { ssr: false });
const SearchScheduleModal = dynamic(() => import("@/components/ui/SearchScheduleModal").then(mod => mod.SearchScheduleModal), { ssr: false });
import { site } from "@/lib/site";

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [facilityType, setFacilityType] = useState("");

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-white pb-8 pt-8 lg:pb-16 lg:pt-12 dark:bg-navy-dark"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-hero-pattern dark:opacity-20" />
      <FloatingParticles count={15} />

      {/* Decorative gradient orbs */}
      <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
      <div className="absolute -bottom-32 -left-32 h-[350px] w-[350px] rounded-full bg-accent/5 blur-3xl dark:bg-accent/10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge tone="teal">
                <Star size={12} className="fill-primary" />
                Pusat Kesehatan Yustisial Kejaksaan RI
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-7 max-w-xl text-balance font-display text-4xl font-extrabold leading-[1.1] text-navy sm:text-5xl lg:text-[3.5rem] dark:text-white"
            >
              Pusat Pengendali{" "}
              <span className="gradient-text">Fasilitas Kesehatan</span>{" "}
              Aparatur Kejaksaan secara{" "}
              <span className="relative inline-block">
                Profesional
                <svg
                  className="absolute -bottom-1 left-0 w-full text-primary/30"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q50 2 100 6 T198 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg dark:text-white/70"
            >
              {site.fullName} ({site.shortName}) merupakan pusat yang membawahi,
              mengawasi, dan membina Klinik serta Rumah Sakit Adhyaksa di seluruh
              lingkungan {site.institution}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsModalOpen(true)}
              >
                Direktori Fasilitas <ArrowRight size={17} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document.getElementById("layanan")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Jelajahi Layanan
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4 text-sm font-semibold text-navy dark:text-white"
            >
              <div className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-100 transition-transform hover:-translate-y-1 dark:bg-navy-dark dark:border-white/10">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                  <CheckCircle2 size={14} />
                </div>
                <span>Independen</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-100 transition-transform hover:-translate-y-1 dark:bg-navy-dark dark:border-white/10">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400">
                  <ShieldCheck size={14} />
                </div>
                <span>Terpercaya</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-100 transition-transform hover:-translate-y-1 dark:bg-navy-dark dark:border-white/10">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <Stethoscope size={14} />
                </div>
                <span>Profesional</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <div className="relative flex items-end justify-center pt-8 lg:pt-0 min-h-[350px] sm:min-h-[450px]">
            {/* Glowing Backdrop behind the building */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[400px] rounded-full bg-primary-100/40 blur-[80px] dark:bg-primary-900/40" />
            </div>

            {/* Background Building */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-0 flex items-center justify-center"
            >
              {/* Using radial gradient mask for ultra-smooth edge fading */}
              <div 
                className="relative w-full max-w-[500px] aspect-square"
                style={{ 
                  maskImage: 'radial-gradient(circle, black 30%, rgba(0,0,0,0.8) 50%, transparent 72%)', 
                  WebkitMaskImage: 'radial-gradient(circle, black 30%, rgba(0,0,0,0.8) 50%, transparent 72%)' 
                }}
              >
                <Image 
                  src="/image/gedung.png" 
                  alt="Gedung Kejaksaan" 
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover opacity-60 mix-blend-multiply dark:mix-blend-lighten" 
                />
              </div>
            </motion.div>

            {/* Main Prosecutor Asset */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] flex justify-center"
            >
              <Image 
                src="/image/jaksa1.png" 
                alt="Jaksa Profesional"
                width={400}
                height={520}
                priority
                className="w-auto h-auto max-h-[520px] object-contain drop-shadow-[0_20px_40px_rgba(27,58,92,0.15)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" 
              />
            </motion.div>

            {/* Floating card — top right */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -right-2 top-8 z-20 animate-float sm:-right-8 lg:-right-4"
            >
              <div className="rounded-[1.75rem] px-7 py-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] bg-white/95 backdrop-blur-xl border border-white/50 dark:bg-navy-dark/95 dark:border-white/10 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]">
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-navy dark:text-white">
                  <CountUp target={98} suffix="+" />
                </p>
                <p className="mt-1 text-sm font-semibold text-text-secondary dark:text-white/60">
                  Aparatur Dilayani
                </p>
              </div>
            </motion.div>

            {/* Floating card — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="absolute -left-4 bottom-12 z-20 animate-float-delayed sm:-left-8 lg:-left-4"
            >
              <div className="rounded-[1.75rem] px-7 py-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] bg-white/95 backdrop-blur-xl border border-white/50 dark:bg-navy-dark/95 dark:border-white/10 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]">
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-primary-light">
                  <CountUp target={98} suffix="%" />
                </p>
                <p className="mt-1 text-sm font-semibold text-text-secondary dark:text-white/60">
                  Tingkat Kepuasan
                </p>
              </div>
            </motion.div>

            {/* Small badge — mid right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute right-4 bottom-24 z-20 animate-bounce-gentle sm:-right-4 lg:right-4"
            >
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#FCF8EC] shadow-[0_15px_30px_-5px_rgba(245,158,11,0.15)] ring-4 ring-white dark:ring-navy-dark dark:bg-amber-900/30">
                <Stethoscope size={26} className="text-amber-500 drop-shadow-sm" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-20 mx-auto mt-12 max-w-4xl lg:mt-16"
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-card-lg sm:flex-row sm:items-center sm:gap-2 lg:rounded-full lg:p-2 dark:bg-navy dark:border-white/10 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]">
            <div className="flex flex-1 items-center gap-2 rounded-xl px-4 py-2.5 transition-colors hover:bg-surface-soft text-left lg:rounded-full dark:hover:bg-white/5 relative">
              <MapPin size={18} className="flex-shrink-0 text-primary" />
              <div className="flex-1 w-full">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted dark:text-white/40">
                  Provinsi
                </p>
                <select 
                  className="w-full appearance-none bg-transparent text-sm text-text-secondary dark:text-white/80 focus:outline-none cursor-pointer"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <option value="">Semua Provinsi</option>
                  <option value="Jakarta">DKI Jakarta</option>
                  <option value="Banten">Banten</option>
                  <option value="Jawa Timur">Jawa Timur</option>
                </select>
              </div>
            </div>
            <span className="hidden h-8 w-px bg-gray-200 sm:block dark:bg-white/10" />
            
            <div className="flex flex-1 items-center gap-2 rounded-xl px-4 py-2.5 transition-colors hover:bg-surface-soft text-left lg:rounded-full dark:hover:bg-white/5 relative">
              <MapPin size={18} className="flex-shrink-0 text-primary" />
              <div className="flex-1 w-full">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted dark:text-white/40">
                  Kota / Kabupaten
                </p>
                <select 
                  className="w-full appearance-none bg-transparent text-sm text-text-secondary dark:text-white/80 focus:outline-none cursor-pointer"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Semua Kota/Kab</option>
                  <option value="Jakarta Timur">Jakarta Timur</option>
                  <option value="Serang">Serang</option>
                  <option value="Surabaya">Surabaya</option>
                </select>
              </div>
            </div>
            <span className="hidden h-8 w-px bg-gray-200 sm:block dark:bg-white/10" />
            
            <div className="flex flex-1 items-center gap-2 rounded-xl px-4 py-2.5 transition-colors hover:bg-surface-soft text-left lg:rounded-full dark:hover:bg-white/5 relative">
              <Stethoscope size={18} className="flex-shrink-0 text-primary" />
              <div className="flex-1 w-full">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted dark:text-white/40">
                  Fasilitas
                </p>
                <select 
                  className="w-full appearance-none bg-transparent text-sm text-text-secondary dark:text-white/80 focus:outline-none cursor-pointer"
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value)}
                >
                  <option value="">Semua Fasilitas</option>
                  <option value="Rumah Sakit Umum">Rumah Sakit Umum</option>
                  <option value="Rumah Sakit Khusus">Rumah Sakit Khusus</option>
                  <option value="Klinik Pratama">Klinik Pratama</option>
                  <option value="Klinik Utama">Klinik Utama</option>
                </select>
              </div>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsSearchModalOpen(true)}
              className="sm:aspect-square sm:px-0 lg:aspect-auto lg:px-7"
            >
              <Search size={18} />
              <span className="sm:hidden lg:inline">Cari Lokasi</span>
            </Button>
          </div>
        </motion.div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SearchScheduleModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
        filters={{ province, city, type: facilityType }}
      />

      {/* Bottom wave */}
      <div className="wave-bg">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="fill-surface-muted dark:fill-navy-dark">
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          />
        </svg>
      </div>
    </section>
  );
}
