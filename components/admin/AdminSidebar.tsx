"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  FileDown,
  Hospital,
  ArrowLeft,
  LogOut,
  FolderOpen,
  MessageSquareWarning,
  CalendarClock
} from "lucide-react";
import { logout } from "@/lib/actions/auth.actions";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/berita", label: "Berita", icon: Newspaper },
  { href: "/admin/unduhan", label: "Unduhan PPID", icon: FileDown },
  { href: "/admin/rumah-sakit", label: "Rumah Sakit", icon: Hospital },
  { href: "/admin/layanan/ppid", label: "PPID", icon: FolderOpen },
  { href: "/admin/layanan/pengaduan", label: "Pengaduan", icon: MessageSquareWarning },
  { href: "/admin/layanan/mcu", label: "Jadwal MCU", icon: CalendarClock },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-white/10 bg-navy-dark">
      {/* Logo / Branding */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
          <LayoutDashboard size={18} className="text-primary-light" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">PKY Admin</p>
          <p className="text-[10px] font-medium text-white/40">Panel Manajemen</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/20 text-primary-light shadow-sm"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-3 py-4 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft size={18} />
          <span>Kembali ke Situs</span>
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-rose-400/60 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
          >
            <LogOut size={18} />
            <span>Keluar Sesi</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
