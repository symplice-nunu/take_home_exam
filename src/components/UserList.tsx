import type { User } from "@/types/user";
import UserCard from "./UserCard";

interface Props {
  users: User[];
  searchParams?: string;
}

export default function UserList({ users, searchParams }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user, index) => (
        <UserCard
          key={user.id}
          user={user}
          animationDelay={index * 50}
          searchParams={searchParams}
        />
      ))}
    </div>
  );
}