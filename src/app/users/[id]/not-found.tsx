import Link from "next/link";

export default function UserNotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <div className="mb-4 text-7xl font-black text-danger/20">404</div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900">User Not Found</h1>
      <p className="mb-8 text-gray-500">
        The user you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
      >
        Back to Directory
      </Link>
    </main>
  );
}
