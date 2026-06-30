"use client";

import { Search } from "lucide-react";
import { useState } from "react";

type Column<T> = {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  searchKey?: string;
  searchPlaceholder?: string;
  onRowAction?: (item: T) => React.ReactNode;
  isLoading?: boolean;
};

/**
 * Komponen tabel data reusable untuk admin panel.
 * Mendukung pencarian teks sederhana berdasarkan searchKey.
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Cari...",
  onRowAction,
  isLoading = false,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");

  const filteredData = searchKey
    ? data.filter((item) => {
        const value = String(item[searchKey] ?? "").toLowerCase();
        return value.includes(query.toLowerCase());
      })
    : data;

  return (
    <div>
      {/* Search Bar */}
      {searchKey && (
        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-white/40"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy dark:text-white dark:focus:border-primary-light"
          />
        </div>
      )}

      {/* Table */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm dark:bg-navy/50">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-surface-muted dark:border-white/10 dark:bg-navy-dark">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-white/50"
                  >
                    {col.label}
                  </th>
                ))}
                {onRowAction && (
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-white/50">
                    Aksi
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (onRowAction ? 1 : 0)}
                    className="px-6 py-12 text-center text-text-muted dark:text-white/40"
                  >
                    {query ? "Tidak ada data yang cocok" : "Belum ada data"}
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr
                    key={String(item.id ?? index)}
                    className="bg-white transition-colors hover:bg-surface-muted dark:bg-navy dark:hover:bg-navy-dark/50"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4">
                        {col.render(item)}
                      </td>
                    ))}
                    {onRowAction && (
                      <td className="px-6 py-4">{onRowAction(item)}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Count */}
      <p className="mt-3 text-right text-xs text-text-muted dark:text-white/40">
        Menampilkan {filteredData.length} dari {data.length} data
      </p>
    </div>
  );
}
