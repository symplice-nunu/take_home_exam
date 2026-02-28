import Link from "next/link";
import type { User } from "@/types/user";

interface Props {
  user: User;
  animationDelay: number;
  searchParams?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UserCard({ user, animationDelay, searchParams }: Props) {
  const href =
    searchParams
      ? `/users/${user.id}?${searchParams}`
      : `/users/${user.id}`;

  return (
    <Link
      href={href}
      className="animate-fade-in-up block rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
      style={{ "--delay": `${animationDelay}ms` } as React.CSSProperties}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-lg">
          {getInitials(user.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-900">{user.name}</p>
          <p className="truncate text-sm text-gray-500">{user.email}</p>
          <p className="truncate text-xs text-gray-400 mt-0.5">
            {user.address.city}
          </p>
        </div>
      </div>
    </Link>
  );
}
