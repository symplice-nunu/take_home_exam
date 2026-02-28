import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserDirectory from "@/components/UserDirectory";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">User Directory</h1>
      <p className="mb-8 text-gray-500">
        Browse, search, and sort users from JSONPlaceholder.
      </p>
      <Suspense fallback={<LoadingSpinner />}>
        <UserDirectory />
      </Suspense>
    </main>
  );
}
