import type { User } from "@/types/user";

export default function UserDetailContent({ user }: { user: User }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      {/* Header with user initials and basic info */}
      <div className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white px-8 py-6">
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-md">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-3xl font-bold text-gray-900">
              {user.name}
            </h1>
            <div className="mt-1 flex items-center gap-3 text-gray-500">
              <span className="text-lg">@{user.username}</span>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span className="text-sm">{user.company.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="px-8 py-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Contact Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <ContactCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            label="Email"
            value={user.email}
            href={`mailto:${user.email}`}
          />
          
          <ContactCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            label="Phone"
            value={user.phone}
            href={`tel:${user.phone}`}
          />
          
          <ContactCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
              </svg>
            }
            label="Website"
            value={user.website}
            href={`https://${user.website}`}
            external
          />
          
          <ContactCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l14-4" />
              </svg>
            }
            label="Company"
            value={user.company.name}
          />
        </div>
      </div>

      {/* Address Section */}
      <div className="border-t border-gray-100 bg-gray-50 px-8 py-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Address</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <AddressCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            label="Street Address"
            value={`${user.address.street} ${user.address.suite}`}
          />
          
          <AddressCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l14-4" />
              </svg>
            }
            label="City & ZIP"
            value={`${user.address.city}, ${user.address.zipcode}`}
          />
        </div>

        {/* Company Info Section */}
        <div className="mt-6 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
            Company Catchphrase
          </h3>
          <p className="mt-2 text-lg italic text-gray-700">
            "{user.company.catchPhrase}"
          </p>
          <p className="mt-1 text-sm text-gray-500">{user.company.bs}</p>
        </div>
      </div>

    </div>
  );
}

function ContactCard({ 
  icon, 
  label, 
  value, 
  href, 
  external 
}: { 
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 transition-all hover:bg-white hover:shadow-sm">
      <div className="shrink-0 text-gray-400">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-medium text-gray-900">
          {value}
        </p>
      </div>
      {href && (
        <div className="shrink-0 text-gray-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block no-underline"
      >
        {content}
      </a>
    );
  }

  return content;
}

function AddressCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
      <div className="shrink-0 text-gray-400">{icon}</div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}