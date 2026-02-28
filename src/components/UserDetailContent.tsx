import type { User } from "@/types/user";

export default function UserDetailContent({ user }: { user: User }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-2xl font-bold">
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Phone" value={user.phone} />
        <InfoRow label="Website" value={user.website} />
        <InfoRow label="Company" value={user.company.name} />
        <InfoRow
          label="Address"
          value={`${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`}
        />
        <InfoRow
          label="Catchphrase"
          value={`"${user.company.catchPhrase}"`}
        />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 px-4 py-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-gray-800">{value}</dd>
    </div>
  );
}
