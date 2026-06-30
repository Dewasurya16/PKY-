import { createAdminClient } from "@/lib/supabase/admin";
import { updateServiceStatus } from "@/lib/actions/layanan.actions";
import { Badge } from "@/components/ui/Badge";
import { Calendar } from "lucide-react";
import { ComplaintResponseModal } from "@/components/admin/ComplaintResponseModal";
import { DownloadPdfButton } from "@/components/admin/DownloadPdfButton";

export default async function AdminPengaduanPage() {
  const supabase = createAdminClient();
  const { data: complaints, error } = await supabase
    .from("public_complaints")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === "42P01") return <div>Tabel public_complaints belum dibuat. Silakan jalankan SQL.</div>;
    return <div>Error loading data.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy dark:text-white">Pengaduan (WBS)</h1>
          <p className="text-sm text-text-secondary">Kelola laporan pengaduan masyarakat.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-white/5 text-navy dark:text-white">
            <tr>
              <th className="px-6 py-4 font-semibold">Tanggal</th>
              <th className="px-6 py-4 font-semibold">Pelapor</th>
              <th className="px-6 py-4 font-semibold">Subjek & Pesan</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/10">
            {complaints?.map((comp) => (
              <tr key={comp.id}>
                <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                  <Calendar size={14} className="inline mr-2" />
                  {new Date(comp.created_at).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-navy dark:text-white">
                    {comp.is_anonymous ? "Anonim" : comp.reporter_name}
                  </div>
                  {comp.is_anonymous && <Badge tone="navy">Anonim</Badge>}
                </td>
                <td className="px-6 py-4 max-w-sm">
                  <div className="font-bold text-navy dark:text-white">{comp.subject}</div>
                  <div className="text-xs text-text-secondary truncate mt-1">{comp.message}</div>
                </td>
                <td className="px-6 py-4">
                  <Badge tone={comp.status === "pending" ? "amber" : "emerald"}>{comp.status}</Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <form action={async () => {
                      "use server";
                      await updateServiceStatus("public_complaints", comp.id, comp.status === "pending" ? "selesai" : "pending");
                    }}>
                      <button className="text-primary text-xs font-semibold hover:underline">Toggle Status</button>
                    </form>
                    
                    {/* Extract email if it exists to pass to modal */}
                    {(() => {
                      const match = (comp.message + " " + comp.reporter_name).match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
                      const email = match ? match[0] : null;
                      return <ComplaintResponseModal complaintId={comp.id} email={email} />;
                    })()}

                    <DownloadPdfButton id={comp.id} type="WBS" />
                  </div>
                </td>
              </tr>
            ))}
            {(!complaints || complaints.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-text-muted">
                  Belum ada pengaduan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
