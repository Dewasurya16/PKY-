"use client";

import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-navy-dark/80">
      <Loader2 size={48} className="animate-spin text-primary mb-6" />
      <h2 className="text-xl font-display font-bold text-navy dark:text-white">Memuat Dashboard Admin...</h2>
      <p className="text-sm text-text-secondary dark:text-white/60 mt-2">Menyiapkan data yang diperlukan.</p>
    </div>
  );
}
