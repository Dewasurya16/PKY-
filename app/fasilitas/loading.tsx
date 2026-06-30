export default function FacilitySearchLoading() {
  return (
    <main className="flex min-h-screen flex-col bg-surface-soft dark:bg-navy-dark">
      <div className="flex-1 pb-24 pt-20 lg:pt-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          {/* Header skeleton */}
          <div className="mb-10 space-y-3 animate-pulse">
            <div className="h-14 w-14 rounded-2xl bg-gray-200 dark:bg-white/10" />
            <div className="h-8 w-72 rounded-lg bg-gray-200 dark:bg-white/10" />
            <div className="h-5 w-96 rounded-lg bg-gray-100 dark:bg-white/5" />
          </div>

          {/* Card skeletons */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-navy"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                      <div className="h-5 w-24 rounded-full bg-gray-200 dark:bg-white/10" />
                      <div className="h-5 w-28 rounded-full bg-gray-200 dark:bg-white/10" />
                    </div>
                    <div className="h-6 w-64 rounded-lg bg-gray-200 dark:bg-white/10" />
                    <div className="h-4 w-full max-w-md rounded-lg bg-gray-100 dark:bg-white/5" />
                    <div className="h-4 w-48 rounded-lg bg-gray-100 dark:bg-white/5" />
                  </div>
                  <div className="h-10 w-48 rounded-xl bg-gray-200 dark:bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
