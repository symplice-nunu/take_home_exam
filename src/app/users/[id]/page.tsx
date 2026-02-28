import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getUser } from "@/lib/api";
import BackButton from "@/components/BackButton";
import UserDetailContent from "@/components/UserDetailContent";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const user = await getUser(params.id);
  return {
    title: user ? `${user.name} — User Directory` : "User Not Found",
  };
}

export default async function UserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);

  if (!user) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BackButton />
      <UserDetailContent user={user} />
    </main>
  );
}
