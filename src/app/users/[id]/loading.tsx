export default function UserLoading() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 h-5 w-36 animate-pulse rounded bg-gray-200" />

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-5">
          <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-gray-200" />
          <div className="flex flex-col gap-2">
            <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-gray-50 px-4 py-3">
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
