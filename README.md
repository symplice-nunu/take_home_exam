# User Directory App

A Next.js 14 application for browsing and searching users from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users). Built with the App Router, React Server Components, and a Parallel Routes + Intercepting Routes modal pattern.

---

## Prerequisites

- Node.js ≥ 18.17
- npm ≥ 9

---

## Getting Started

```bash
git clone https://github.com/symplice-nunu/take_home_exam.git
cd take_home_exam
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run all tests (21) |
| `npm run test:watch` | Jest in watch mode |

---

## Architecture

```
src/
├── app/
│   ├── @modal/(.)users/[id]/   # Intercepting route → modal overlay on card click
│   ├── users/[id]/             # Canonical detail page (direct URL / refresh)
│   ├── layout.tsx              # Root layout — receives {children} + {modal} slots
│   └── page.tsx                # Directory page (Server Component + Suspense)
├── components/                 # UserDirectory [client], UserCard, UserModal, etc.
├── hooks/useUsers.ts           # Data-fetch hook with AbortController cleanup
├── lib/api.ts                  # Shared API base + getUser()
├── types/user.ts               # User interface + SortOrder type
└── utils/filterUsers.ts        # Pure filter + sort (no side effects)
```

**Key patterns:**
- Server Components fetch data; Client Components handle interactivity — minimal client bundle
- URL (`?search=&sort=`) is the single source of truth for UI state — shareable, refresh-safe
- `router.back()` closes the modal, replaying history so search state is never lost
- `UserDetailContent` is a shared Server Component used by both the modal and the full-page route

**Tests:** Jest 29 + React Testing Library — 14 tests on `filterUsers` (filter, sort, immutability) and 7 on `UserCard` (render, href construction, initials, animation delay).

---

## Assumptions

- The dataset is exactly 10 users — client-side filtering is sufficient; no pagination needed
- `revalidate: 60` is acceptable; no on-demand cache purging is required
- JSONPlaceholder is a public, unauthenticated API — no auth layer needed
- Tailwind CSS v3 (not v4)

---

## What I Would Improve With More Time

- **Debounce search** — each keystroke currently writes to the URL; 200–300 ms debounce would reduce noise
- **E2E tests (Playwright)** — unit tests don't cover the modal open/close flow or URL round-trips end-to-end
- **On-demand revalidation** — a `POST /api/revalidate` route via `revalidatePath` to avoid waiting out the 60 s TTL
- **Pagination / virtual scrolling** — required before scaling beyond the current 10-user dataset
- **Debounced `localStorage` sort** — persist sort preference across sessions with hydration-safe initialisation
