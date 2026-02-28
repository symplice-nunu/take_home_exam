import { notFound } from "next/navigation";
import type { User } from "@/types/user";
import UserModal from "@/components/UserModal";
import UserDetailContent from "@/components/UserDetailContent";

async function getUser(id: string): Promise<User | null> {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.id) return null;
    return data as User;
  } catch {
    return null;
  }
}

export default async function ModalUserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);

  if (!user) notFound();

  return (
    <UserModal>
      <UserDetailContent user={user} />
    </UserModal>
  );
}
