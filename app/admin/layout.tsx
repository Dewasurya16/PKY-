import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Panel — PKY Kejaksaan RI",
  description: "Panel manajemen konten Pusat Kesehatan Yustisial",
};

/**
 * Layout admin: sidebar tetap di kiri, konten di kanan.
 * Proteksi akses akan ditambahkan di fase berikutnya (Supabase Auth middleware).
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface-soft dark:bg-navy-dark">
      <AdminSidebar />
      <div className="flex flex-1 flex-col pl-64">
        <AdminHeader />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
