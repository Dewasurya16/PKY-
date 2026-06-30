"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  /** Label standar saat form siap (tidak loading) */
  label: string;
  /** Label khusus saat form dalam status pending/loading */
  loadingLabel?: string;
  /** Warna/Style tombol, disesuaikan dengan tema Navy/Teal */
  className?: string;
}

export function SubmitButton({
  label,
  loadingLabel = "Memproses...",
  className = "w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-navy-dark",
}: SubmitButtonProps) {
  // Mendeteksi status submit form tempat tombol ini berada
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={`flex items-center justify-center gap-2 ${className} disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none`}
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin text-white/80" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
