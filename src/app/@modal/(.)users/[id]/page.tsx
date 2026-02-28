import { notFound } from "next/navigation";
import { getUser } from "@/lib/api";
import UserModal from "@/components/UserModal";
import UserDetailContent from "@/components/UserDetailContent";

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
