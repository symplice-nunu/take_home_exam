import type { SortOrder } from "@/types/user";

interface Props {
  sort: SortOrder;
  onToggle: (sort: SortOrder) => void;
}

const NEXT_SORT: Record<SortOrder, SortOrder> = {
  original: "asc",
  asc: "desc",
  desc: "original",
};

const LABELS: Record<SortOrder, string> = {
  original: "Default order",
  asc: "Name (A to Z)",
  desc: "Name (Z to A)",
};

export default function SortToggle({ sort, onToggle }: Props) {
  return (
    <button
      onClick={() => onToggle(NEXT_SORT[sort])}
      className="inline-flex w-full items-center justify-between gap-3 rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-primary/5 hover:ring-primary/40 transition-colors sm:w-auto sm:min-w-[180px] sm:justify-center"
    >
      <span className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18M7 12h10M11 18h2" />
        </svg>
        {LABELS[sort]}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
      </svg>
    </button>
  );
}