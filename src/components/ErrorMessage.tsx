"use client";

interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
        <span className="text-4xl">⚠️</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">Something went wrong</h3>
      <p className="mb-6 text-gray-500 max-w-md">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Try Again
      </button>
    </div>
  );
}