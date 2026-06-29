import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center dark:bg-navy-dark">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-hero-pattern dark:opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl dark:bg-primary/10 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 h-[350px] w-[350px] rounded-full bg-accent/5 blur-3xl dark:bg-accent/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 dark:bg-primary/20">
          <ShieldAlert size={40} className="text-primary dark:text-primary-light" />
        </div>

        <p className="font-display text-sm font-bold uppercase tracking-widest text-primary dark:text-primary-light">
          Error 404
        </p>

        <h1 className="mt-4 font-display text-4xl font-extrabold text-navy sm:text-5xl lg:text-6xl dark:text-white">
          Halaman Tidak Ditemukan
        </h1>

        <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary dark:text-white/70">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan. Silakan kembali ke beranda Pusat Kesehatan Yustisial.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-display font-semibold text-white shadow-md transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 dark:bg-primary dark:hover:bg-primary-dark"
        >
          <ArrowLeft size={18} />
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
