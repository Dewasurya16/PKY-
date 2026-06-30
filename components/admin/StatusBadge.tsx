type StatusBadgeProps = {
  isActive: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
};

/**
 * Badge status visual untuk menampilkan state aktif/tidak aktif.
 * Digunakan di DataTable untuk kolom Published/Draft, Available/Unavailable.
 */
export function StatusBadge({
  isActive,
  activeLabel = "Aktif",
  inactiveLabel = "Draft",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        isActive
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
          : "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-white/50"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-gray-400 dark:bg-white/40"
        }`}
      />
      {isActive ? activeLabel : inactiveLabel}
    </span>
  );
}
