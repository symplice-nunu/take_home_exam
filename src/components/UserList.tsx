import type { User } from "@/types/user";
import UserCard from "./UserCard";

interface Props {
  users: User[];
  searchParams?: string;
}

export default function UserList({ users, searchParams }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user, index) => (
        <UserCard
          key={user.id}
          user={user}
          animationDelay={Math.min(index * 60, 500)}
          searchParams={searchParams}
        />
      ))}
    </div>
  );
}
