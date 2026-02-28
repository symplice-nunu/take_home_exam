import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserDirectory from "@/components/UserDirectory";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            User Directory
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Browse, search, and sort users from JSONPlaceholder.
          </p>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <UserDirectory />
        </Suspense>
      </div>
    </main>
  );
}