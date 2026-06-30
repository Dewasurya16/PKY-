"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <>
      {/* Top bar */}
      <div className="relative z-50 hidden bg-navy text-white/80 lg:block dark:bg-navy-dark dark:border-b dark:border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 lg:px-10">
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <Phone size={12} /> {site.phone}
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span>{site.email}</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 animate-pulse-slow rounded-full bg-green-400" />
              Layanan Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className="sticky top-0 z-40">
        <motion.div
          animate={{
            y: 0,
            boxShadow: scrolled
              ? "0 1px 0 rgba(0,0,0,0.04), 0 4px 16px -4px rgba(0,0,0,0.08)"
              : "0 1px 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.3 }}
          className={cn(
            "backdrop-blur-md border-b transition-colors duration-300",
            scrolled 
              ? "bg-white/95 border-gray-100 dark:bg-navy-dark/95 dark:border-white/10" 
              : "bg-white border-transparent dark:bg-navy-dark dark:border-transparent",
            "dark:shadow-none"
          )}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
            {/* Logo */}
            <Link href="/#beranda" className="flex items-center gap-3 group">
              <div className="flex items-center gap-2">
                <Image src="/image/logo.png" alt="Logo PKY" width={40} height={40} priority className="h-10 w-auto object-contain drop-shadow-sm" />
                <Image src="/image/logo-klinik.png" alt="Logo Klinik Adhyaksa" width={40} height={40} priority className="h-10 w-auto object-contain drop-shadow-sm" />
              </div>
              <span className="hidden sm:flex flex-col pl-3 gap-[2px] border-l-2 border-primary/40 dark:border-primary/60">
                <span className="font-display text-[15px] font-extrabold leading-none tracking-tight text-primary dark:text-white">
                  {site.shortName}
                </span>
                <span className="text-[9.5px] font-bold leading-none tracking-[0.08em] uppercase text-navy/80 dark:text-primary-light">
                  {site.fullName}
                </span>
                <span className="text-[8px] font-medium leading-none tracking-[0.12em] uppercase text-navy/40 dark:text-white/40 mt-[1px]">
                  {site.institution}
                </span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-primary dark:text-white/70 dark:hover:text-primary-light"
                >
                  {link.label}
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100 dark:bg-primary-light" />
                </Link>
              ))}
              <div className="ml-2 pl-2 border-l border-gray-200 dark:border-white/10">
                <ThemeToggle />
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-3 lg:flex">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Layanan Kesehatan <ArrowRight size={14} />
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-soft text-text lg:hidden"
              aria-label="Buka menu navigasi"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </motion.div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
            >
              <div className="flex flex-col gap-1 px-6 pb-6 pt-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-50 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant="primary"
                  size="md"
                  className="mt-3 w-full"
                  onClick={() => {
                    setOpen(false);
                    document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Layanan Kesehatan <ArrowRight size={14} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
