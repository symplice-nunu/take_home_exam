import type { User } from "@/types/user";

export const API_BASE = "https://jsonplaceholder.typicode.com";

export async function getUser(id: string): Promise<User | null> {
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.id) return null;
    return data as User;
  } catch {
    return null;
  }
}
