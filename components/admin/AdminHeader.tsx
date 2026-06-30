"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/berita": "Manajemen Berita",
  "/admin/unduhan": "Manajemen Unduhan PPID",
  "/admin/rumah-sakit": "Manajemen Fasilitas Kesehatan",
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Admin Panel";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-8 backdrop-blur-md dark:border-white/10 dark:bg-navy-dark/80">
      <div>
        <h1 className="text-lg font-bold text-navy dark:text-white">{title}</h1>
        <p className="text-xs text-text-muted dark:text-white/40">
          Pusat Kesehatan Yustisial — Kejaksaan RI
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-bold text-primary-light">A</span>
        </div>
      </div>
    </header>
  );
}
