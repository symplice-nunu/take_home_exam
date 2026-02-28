"use client";

interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <div className="text-5xl">⚠️</div>
      <p className="text-lg font-medium text-gray-800">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
