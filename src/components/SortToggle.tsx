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
  original: "Original",
  asc: "A → Z",
  desc: "Z → A",
};

export default function SortToggle({ sort, onToggle }: Props) {
  return (
    <button
      onClick={() => onToggle(NEXT_SORT[sort])}
      className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18M7 12h10M11 18h2" />
      </svg>
      Sort: {LABELS[sort]}
    </button>
  );
}
