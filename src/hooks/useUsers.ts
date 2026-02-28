"use client";

import { useState, useEffect } from "react";
import type { User } from "@/types/user";
import { API_BASE } from "@/lib/api";

interface UseUsersResult {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/users`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch users (${res.status})`);
        }
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message ?? "Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();

    return () => controller.abort();
  }, []);

  return { users, isLoading, error };
}
