import type { CSSProperties } from "react";
import Link from "next/link";
import type { User } from "@/types/user";
import { getInitials } from "@/utils/formatUser";

interface Props {
  user: User;
  animationDelay: number;
  searchParams?: string;
}

export default function UserCard({ user, animationDelay, searchParams }: Props) {
  const href =
    searchParams
      ? `/users/${user.id}?${searchParams}`
      : `/users/${user.id}`;

  return (
    <Link
      href={href}
      className="animate-fade-in-up group relative block rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md hover:ring-primary/40"
      style={{ "--delay": `${animationDelay}ms` } as CSSProperties}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white group-hover:bg-primary/90 transition-colors">
          {getInitials(user.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {user.name}
          </h3>
          <p className="truncate text-sm text-gray-500 mt-0.5">{user.email}</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
            <svg
              className="h-3.5 w-3.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{user.address.city}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 w-0 rounded-b-xl bg-gold transition-all group-hover:w-full" />
    </Link>
  );
}