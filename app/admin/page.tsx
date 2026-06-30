import { Newspaper, FileDown, Hospital } from "lucide-react";
import { getAllNews } from "@/lib/queries/news.queries";
import { getAllDownloads } from "@/lib/queries/download.queries";
import { getAllFacilities } from "@/lib/queries/facility.queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

type StatCardProps = {
  icon: React.ElementType;
  label: string;
  count: number;
  href: string;
  gradient: string;
};

function StatCard({ icon: Icon, label, count, href, gradient }: StatCardProps) {
  return (
    <Link href={href} className="group">
      <div className={`relative overflow-hidden rounded-2xl p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${gradient}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-extrabold">{count}</p>
            <p className="mt-1 text-sm font-medium text-white/80">{label}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <Icon size={24} />
          </div>
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />
      </div>
    </Link>
  );
}

/**
 * Dashboard admin: ringkasan jumlah data untuk setiap entitas.
 * Server Component — fetch data langsung di server.
 */
export default async function AdminDashboardPage() {
  const [news, downloads, facilities] = await Promise.all([
    getAllNews(),
    getAllDownloads(),
    getAllFacilities(),
  ]);

  const statCards: StatCardProps[] = [
    {
      icon: Newspaper,
      label: "Total Berita",
      count: news.length,
      href: "/admin/berita",
      gradient: "bg-gradient-to-br from-primary to-primary-dark",
    },
    {
      icon: FileDown,
      label: "Dokumen Unduhan",
      count: downloads.length,
      href: "/admin/unduhan",
      gradient: "bg-gradient-to-br from-navy to-navy-light",
    },
    {
      icon: Hospital,
      label: "Fasilitas Kesehatan",
      count: facilities.length,
      href: "/admin/rumah-sakit",
      gradient: "bg-gradient-to-br from-accent-dark to-accent",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy dark:text-white">
          Selamat Datang, Admin
        </h2>
        <p className="mt-1 text-text-secondary dark:text-white/60">
          Ringkasan data konten Pusat Kesehatan Yustisial
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <StatCard key={card.href} {...card} />
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-navy">
        <h3 className="text-lg font-bold text-navy dark:text-white mb-4">
          Panduan Singkat
        </h3>
        <ul className="space-y-3 text-sm text-text-secondary dark:text-white/70">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">1</span>
            <span>Klik menu di sidebar kiri untuk mengelola <strong>Berita</strong>, <strong>Unduhan PPID</strong>, atau <strong>Fasilitas Kesehatan</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">2</span>
            <span>Gunakan tombol <strong>&quot;Tambah Baru&quot;</strong> di setiap halaman untuk menambahkan data baru.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">3</span>
            <span>Data yang statusnya <strong>&quot;Published&quot;</strong> akan langsung tampil di halaman publik.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
