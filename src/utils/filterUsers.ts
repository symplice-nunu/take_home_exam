import type { User, SortOrder } from "@/types/user";

export function filterUsers(
  users: User[],
  query: string,
  sort: SortOrder
): User[] {
  const trimmed = query.trim().toLowerCase();

  const filtered = trimmed
    ? users.filter((u) => u.name.toLowerCase().includes(trimmed))
    : users;

  if (sort === "original") return filtered;

  const sorted = [...filtered].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return sort === "asc" ? sorted : sorted.reverse();
}
