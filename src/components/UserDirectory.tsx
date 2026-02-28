"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { SortOrder } from "@/types/user";
import { useUsers } from "@/hooks/useUsers";
import { filterUsers } from "@/utils/filterUsers";
import SearchBar from "./SearchBar";
import SortToggle from "./SortToggle";
import UserList from "./UserList";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";

export default function UserDirectory() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    () => searchParams.get("search") ?? ""
  );
  const [sort, setSort] = useState<SortOrder>(
    () => (searchParams.get("sort") as SortOrder) ?? "original"
  );

  const { users, isLoading, error } = useUsers();

  const filtered = useMemo(
    () => filterUsers(users, search, sort),
    [users, search, sort]
  );

  function updateURL(newSearch: string, newSort: SortOrder) {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newSort !== "original") params.set("sort", newSort);
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : "/");
  }

  function handleSearch(value: string) {
    setSearch(value);
    updateURL(value, sort);
  }

  function handleSort(value: SortOrder) {
    setSort(value);
    updateURL(search, value);
  }

  const currentParams = searchParams.toString();

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <SearchBar value={search} onChange={handleSearch} />
        <SortToggle sort={sort} onToggle={handleSort} />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <UserList users={filtered} searchParams={currentParams} />
      )}
    </div>
  );
}
