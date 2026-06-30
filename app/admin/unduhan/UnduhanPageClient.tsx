"use client";

import { useActionState, useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { FormField } from "@/components/admin/FormField";
import { FileUpload } from "@/components/admin/FileUpload";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createDownload, updateDownload, deleteDownload } from "@/lib/actions/download.actions";
import type { Download, ActionState } from "@/lib/types/database";
import { DOWNLOAD_CATEGORIES } from "@/lib/types/database";

// ──────────────────────────── Form Input Styles ────────────────────────────

const INPUT_CLASS =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy dark:text-white dark:focus:border-primary-light";

const SELECT_CLASS = INPUT_CLASS;

const TEXTAREA_CLASS = `${INPUT_CLASS} resize-none`;

// ──────────────────────────── Download Form ────────────────────────────

type DownloadFormProps = {
  editItem?: Download | null;
  onClose: () => void;
  onSuccess?: () => void;
};

function DownloadForm({ editItem, onClose, onSuccess }: DownloadFormProps) {
  const isEditing = Boolean(editItem);

  const action = isEditing ? updateDownload : createDownload;
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    action,
    { success: false },
  );

  // Tutup form setelah sukses
  useEffect(() => {
    if (state.success && !isPending) {
      if (onSuccess) onSuccess();
      // Delay agar user melihat pesan sukses
      const timer = setTimeout(onClose, 500);
      return () => clearTimeout(timer);
    }
  }, [state.success, isPending, onSuccess, onClose]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-navy">
      <h3 className="mb-6 text-lg font-bold text-navy dark:text-white">
        {isEditing ? "Edit Dokumen" : "Tambah Dokumen Baru"}
      </h3>

      {state.error && (
        <div className="mb-4 rounded-xl bg-rose-soft p-3 text-sm font-medium text-rose-DEFAULT dark:bg-rose-DEFAULT/10">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          Dokumen berhasil {isEditing ? "diperbarui" : "ditambahkan"}!
        </div>
      )}

      <form action={formAction} className="space-y-5">
        {isEditing && <input type="hidden" name="id" value={editItem?.id} />}

        <FormField
          label="Judul Dokumen"
          name="title"
          isRequired
          error={state.fieldErrors?.title}
        >
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={editItem?.title ?? ""}
            placeholder="Contoh: Perja No. 12 Tahun 2023"
            className={INPUT_CLASS}
            required
          />
        </FormField>

        <FormField
          label="Deskripsi"
          name="description"
          isRequired
          error={state.fieldErrors?.description}
        >
          <textarea
            id="description"
            name="description"
            rows={2}
            defaultValue={editItem?.description ?? ""}
            placeholder="Deskripsi singkat tentang dokumen ini"
            className={TEXTAREA_CLASS}
            required
          />
        </FormField>

        <FormField
          label="Kategori"
          name="category"
          isRequired
          error={state.fieldErrors?.category}
        >
          <select
            id="category"
            name="category"
            defaultValue={editItem?.category ?? ""}
            className={SELECT_CLASS}
            required
          >
            <option value="">Pilih kategori</option>
            {DOWNLOAD_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="File Dokumen"
          name="file"
          isRequired={!isEditing}
          hint={isEditing ? "Kosongkan jika tidak ingin mengganti file" : undefined}
        >
          <FileUpload
            name="file"
            accept=".pdf,.doc,.docx"
            maxSizeMb={25}
            currentUrl={editItem?.file_url}
            variant="document"
          />
        </FormField>

        <FormField
          label="Urutan Tampil"
          name="sort_order"
          error={state.fieldErrors?.sort_order}
          hint="Angka lebih kecil tampil lebih atas"
        >
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            min={0}
            defaultValue={editItem?.sort_order ?? 0}
            className={INPUT_CLASS}
          />
        </FormField>

        <FormField label="Status" name="is_published">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="hidden"
              name="is_published"
              value={editItem?.is_published !== false ? "true" : "false"}
            />
            <input
              type="checkbox"
              defaultChecked={editItem?.is_published !== false}
              onChange={(e) => {
                const hidden = e.target.previousElementSibling as HTMLInputElement;
                hidden.value = e.target.checked ? "true" : "false";
              }}
              className="h-4 w-4 rounded border-gray-300 text-primary accent-primary"
            />
            <span className="text-sm text-text-secondary dark:text-white/70">
              Publikasikan langsung
            </span>
          </label>
        </FormField>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-muted dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
          >
            Batal
          </button>
          <SubmitButton
            label={isEditing ? "Perbarui Dokumen" : "Simpan Dokumen"}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          />
        </div>
      </form>
    </div>
  );
}

// ──────────────────────────── Delete Button ────────────────────────────

function DeleteButton({ item }: { item: Download }) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    deleteDownload,
    { success: false },
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={item.id} />
      {item.file_url && (
        <input
          type="hidden"
          name="file_path"
          value={item.file_url.split("/").pop() ?? ""}
        />
      )}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-rose-soft hover:text-rose-DEFAULT dark:text-white/40 dark:hover:bg-rose-DEFAULT/10 disabled:opacity-50"
        title="Hapus"
      >
        <Trash2 size={16} />
      </button>
      {state.error && (
        <span className="text-xs text-rose-DEFAULT">{state.error}</span>
      )}
    </form>
  );
}

// ──────────────────────────── Main Page Client ────────────────────────────

type UnduhanPageClientProps = {
  initialData: Download[];
};

export function UnduhanPageClient({ initialData }: UnduhanPageClientProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Download | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    setIsRefetching(false);
  }, [initialData]);

  const handleEdit = (item: Download) => {
    setEditItem(item);
    setIsFormOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsFormOpen(false);
    setEditItem(null);
  }, []);

  const handleSuccess = useCallback(() => {
    setIsRefetching(true);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy dark:text-white">
            Pusat Unduhan PPID
          </h2>
          <p className="mt-1 text-sm text-text-secondary dark:text-white/60">
            Kelola dokumen regulasi dan pedoman publik
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <Plus size={18} />
            Tambah Dokumen
          </button>
        )}
      </div>

      {/* Form */}
      {isFormOpen && (
        <DownloadForm editItem={editItem} onClose={handleClose} onSuccess={handleSuccess} />
      )}

      {/* Table */}
      <DataTable<Download & Record<string, unknown>>
        isLoading={isRefetching}
        data={initialData as (Download & Record<string, unknown>)[]}
        searchKey="title"
        searchPlaceholder="Cari dokumen..."
        columns={[
          {
            key: "title",
            label: "Judul Dokumen",
            render: (item) => (
              <div className="max-w-xs">
                <p className="font-semibold text-navy dark:text-white line-clamp-1">
                  {item.title as string}
                </p>
                <p className="mt-0.5 text-xs text-text-muted dark:text-white/40 line-clamp-1">
                  {item.description as string}
                </p>
              </div>
            ),
          },
          {
            key: "category",
            label: "Kategori",
            render: (item) => (
              <span className="rounded-lg bg-navy/10 px-2.5 py-1 text-xs font-semibold text-navy dark:bg-white/10 dark:text-white/80">
                {item.category as string}
              </span>
            ),
          },
          {
            key: "file_type",
            label: "Tipe",
            render: (item) => (
              <span className="text-xs font-medium text-text-muted dark:text-white/50">
                {item.file_type as string} • {item.file_size as string}
              </span>
            ),
          },
          {
            key: "sort_order",
            label: "Urutan",
            render: (item) => (
              <span className="text-sm text-text-secondary dark:text-white/60">
                #{item.sort_order as number}
              </span>
            ),
          },
          {
            key: "is_published",
            label: "Status",
            render: (item) => (
              <StatusBadge
                isActive={item.is_published as boolean}
                activeLabel="Published"
                inactiveLabel="Draft"
              />
            ),
          },
        ]}
        onRowAction={(item) => (
          <div className="flex items-center gap-1">
            {item.file_url && (
              <a
                href={item.file_url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-primary/10 hover:text-primary dark:text-white/40 dark:hover:bg-primary/20"
                title="Buka file"
              >
                <ExternalLink size={16} />
              </a>
            )}
            <button
              onClick={() => handleEdit(item as unknown as Download)}
              className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-primary/10 hover:text-primary dark:text-white/40 dark:hover:bg-primary/20"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
            <DeleteButton item={item as unknown as Download} />
          </div>
        )}
      />
    </div>
  );
}
