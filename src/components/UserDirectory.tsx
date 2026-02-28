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
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar value={search} onChange={handleSearch} />
        </div>
        <div className="sm:w-auto">
          <SortToggle sort={sort} onToggle={handleSort} />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-500">
              Showing {filtered.length} {filtered.length === 1 ? 'user' : 'users'}
            </div>
            <UserList users={filtered} searchParams={currentParams} />
          </>
        )}
      </div>
    </div>
  );
}