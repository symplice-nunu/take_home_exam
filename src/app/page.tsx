import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserDirectory from "@/components/UserDirectory";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Branded header */}
      <div className="bg-primary">
        <div className="h-1 bg-danger" />
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            User Directory
          </h1>
          <p className="mt-3 text-lg text-white/70">
            Browse, search, and sort users from JSONPlaceholder.
          </p>
        </div>
        <div className="h-1 bg-gold" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingSpinner />}>
          <UserDirectory />
        </Suspense>
      </div>
    </main>
  );
}