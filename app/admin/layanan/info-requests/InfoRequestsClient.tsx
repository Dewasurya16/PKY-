"use client";

import { useActionState, useState, useEffect } from "react";
import { CheckCircle2, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { updateInfoRequestStatus } from "@/lib/actions/info-request.actions";
import type { InfoRequest, ActionState } from "@/lib/types/database";

// ──────────────────────────── Action Button ────────────────────────────

function TindakLanjutiButton({ item }: { item: InfoRequest }) {
  const actionWithId = updateInfoRequestStatus.bind(null, item.id, "selesai");
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    (prevState, formData) => actionWithId(),
    { success: false }
  );

  useEffect(() => {
    if (isPending) {
      toast.loading("Memproses pembaruan status...", { id: `status-${item.id}` });
    } else {
      toast.dismiss(`status-${item.id}`);
    }
  }, [isPending, item.id]);

  useEffect(() => {
    if (state.success) {
      toast.success("Status Berhasil Diperbarui!", { 
        description: "Permintaan informasi telah ditandai selesai.",
        id: `status-${item.id}`
      });
    } else if (state.error) {
      toast.error("Gagal Memperbarui", { 
        description: state.error,
        id: `status-${item.id}` 
      });
    }
  }, [state, item.id]);

  if (item.status === "selesai") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 size={14} /> Selesai
      </span>
    );
  }

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white disabled:opacity-50 dark:bg-primary/20 dark:hover:bg-primary"
      >
        {isPending ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Memproses...
          </>
        ) : (
          "Tindak Lanjuti"
        )}
      </button>
    </form>
  );
}

// ──────────────────────────── Main Page Client ────────────────────────────

type InfoRequestsClientProps = {
  initialData: InfoRequest[];
};

export function InfoRequestsClient({ initialData }: InfoRequestsClientProps) {
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    setIsRefetching(false);
  }, [initialData]);

  return (
    <div className="space-y-8">
      {/* Table */}
      <DataTable<InfoRequest & Record<string, unknown>>
        isLoading={isRefetching}
        data={initialData as (InfoRequest & Record<string, unknown>)[]}
        searchKey="facility_name"
        searchPlaceholder="Cari nama fasilitas..."
        columns={[
          {
            key: "facility_name",
            label: "Fasilitas",
            render: (item) => (
              <span className="font-semibold text-navy dark:text-white line-clamp-1">
                {item.facility_name as string}
              </span>
            ),
          },
          {
            key: "user_name",
            label: "Pemohon",
            render: (item) => (
              <div className="max-w-[200px]">
                <p className="font-semibold text-navy dark:text-white line-clamp-1">
                  {item.user_name as string}
                </p>
                <p className="mt-0.5 text-xs text-text-muted dark:text-white/40 line-clamp-1">
                  {item.email_kejaksaan as string}
                </p>
              </div>
            ),
          },
          {
            key: "created_at",
            label: "Tanggal",
            render: (item) => (
              <span className="text-sm text-text-secondary dark:text-white/60">
                {new Date(item.created_at as string).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (item) => (
              <StatusBadge
                isActive={item.status === "selesai"}
                activeLabel="Selesai"
                inactiveLabel="Pending"
              />
            ),
          },
        ]}
        onRowAction={(item) => (
          <div className="flex items-center justify-end">
            <TindakLanjutiButton item={item as unknown as InfoRequest} />
          </div>
        )}
      />
    </div>
  );
}
