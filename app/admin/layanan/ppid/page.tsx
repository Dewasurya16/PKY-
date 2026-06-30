import { createAdminClient } from "@/lib/supabase/admin";
import { updateServiceStatus } from "@/lib/actions/layanan.actions";
import { Badge } from "@/components/ui/Badge";
import { Calendar } from "lucide-react";
import { PpidResponseModal } from "@/components/admin/PpidResponseModal";
import { DownloadPdfButton } from "@/components/admin/DownloadPdfButton";

export default async function AdminPpidPage() {
  const supabase = createAdminClient();
  const { data: requests, error } = await supabase
    .from("ppid_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === "42P01") return <div>Tabel ppid_requests belum dibuat. Silakan jalankan SQL.</div>;
    return <div>Error loading data.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy dark:text-white">Layanan PPID</h1>
          <p className="text-sm text-text-secondary">Kelola permohonan informasi publik.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-navy rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-white/5 text-navy dark:text-white">
            <tr>
              <th className="px-6 py-4 font-semibold">Tanggal</th>
              <th className="px-6 py-4 font-semibold">Pemohon</th>
              <th className="px-6 py-4 font-semibold">Detail</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/10">
            {requests?.map((req) => (
              <tr key={req.id}>
                <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                  <Calendar size={14} className="inline mr-2" />
                  {new Date(req.created_at).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-navy dark:text-white">{req.user_name}</div>
                  <div className="text-xs text-text-muted">{req.email}</div>
                </td>
                <td className="px-6 py-4 max-w-xs truncate text-text-secondary">
                  {req.request_details}
                </td>
                <td className="px-6 py-4">
                  <Badge tone={req.status === "pending" ? "amber" : "emerald"}>{req.status}</Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <form action={async () => {
                      "use server";
                      await updateServiceStatus("ppid_requests", req.id, req.status === "pending" ? "selesai" : "pending");
                    }}>
                      <button className="text-primary text-xs font-semibold hover:underline">Toggle Status</button>
                    </form>
                    
                    <PpidResponseModal requestId={req.id} email={req.email} />
                    <DownloadPdfButton id={req.id} type="PPID" />
                  </div>
                </td>
              </tr>
            ))}
            {(!requests || requests.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-text-muted">
                  Belum ada permohonan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
