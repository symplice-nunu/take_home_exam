# User Directory App

A Next.js 14 application for browsing and searching users from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users).

---

## Features

- **Real-time search** — filter users by name as you type
- **3-state sort toggle** — cycle between Original / A→Z / Z→A
- **Shareable URLs** — search and sort state is reflected in the URL (`/?search=john&sort=asc`)
- **State restoration** — browser Back restores the exact search state
- **Modal detail view** — clicking a card opens a modal overlay (directory stays mounted behind it)
- **Full-page detail** — navigating directly to `/users/[id]` renders a full standalone page
- **Staggered animations** — cards fade in with cascading delays
- **Skeleton loading** — modal and detail page both show a placeholder while fetching
- **404 handling** — friendly not-found page for unknown user IDs
- **Unit tests** — Jest + React Testing Library (16 tests)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> If port 3000 is in use, Next.js will try 3001, 3002, etc. The exact URL is printed in the terminal.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm test` | Run all unit tests |
| `npm run test:watch` | Run tests in watch mode |

---

## How the Modal Works

This app uses **Next.js 14 Parallel Routes + Intercepting Routes** to show user details as a modal overlay without leaving the directory.

| How you arrive at `/users/[id]` | What you see |
|---|---|
| Click a card in the directory | Modal overlay — directory stays visible behind it |
| Type the URL directly / refresh | Full standalone detail page |
| Press Escape, click the backdrop, or click X | Modal closes — directory restores with search state intact |

**Why this pattern?**
- The directory never unmounts, so search input and sort state are preserved across modal open/close.
- `router.back()` closes the modal by replaying the previous history entry — no state reset.
- SSR / direct URL access bypasses the intercepting route and renders the full page as normal.

---

## Project Structure

```
src/
├── app/
│   ├── @modal/                        # Parallel route slot (modal)
│   │   ├── default.tsx                # Required null fallback
│   │   └── (.)users/[id]/
│   │       ├── page.tsx               # Intercepting route → renders UserModal
│   │       └── loading.tsx            # Skeleton overlay while fetching
│   ├── users/[id]/
│   │   ├── page.tsx                   # Full-page detail (direct URL access)
│   │   ├── loading.tsx                # Skeleton for full-page route
│   │   └── not-found.tsx
│   ├── layout.tsx                     # Root layout — receives {children} + {modal} slots
│   ├── page.tsx                       # Directory page (Server Component + Suspense)
│   └── globals.css
├── components/
│   ├── UserModal.tsx                  # 'use client' — backdrop, X button, Escape key, scroll lock
│   ├── UserDetailContent.tsx          # Shared detail card (Server Component)
│   ├── UserDirectory.tsx              # 'use client' — search, sort, URL sync
│   ├── UserCard.tsx                   # Link + staggered animation
│   ├── UserList.tsx                   # Grid layout
│   ├── SearchBar.tsx
│   ├── SortToggle.tsx                 # 3-state: original / asc / desc
│   ├── BackButton.tsx                 # 'use client' — router.back()
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx              # 'use client' — window.location.reload
├── hooks/
│   └── useUsers.ts                    # Fetch hook with AbortController
├── types/
│   └── user.ts                        # User interface + SortOrder type
└── utils/
    └── filterUsers.ts                 # Pure filter + sort function
```

---

## Architecture Overview

```
Server Components                  Client Components
─────────────────                  ─────────────────
app/layout.tsx                     UserDirectory     (search / sort / URL sync)
app/page.tsx                       UserModal         (backdrop, close handlers)
app/users/[id]/page.tsx            UserCard          (Link + animation)
@modal/(.)users/[id]/page.tsx      SearchBar
UserDetailContent                  SortToggle
                                   ErrorMessage      (window.location.reload)
                                   BackButton        (router.back)
```

Server Components fetch data on the server (with `revalidate: 60`). Client Components handle interactivity. `UserDetailContent` is a Server Component shared between the modal intercepting route and the full-page route.

---

## State Management

No external state library is used. State is split into two independent concerns:

1. **Async data** — `useUsers` hook (`useState` + `useEffect` + `AbortController` for cleanup)
2. **UI state** (search query, sort order) — `useState` in `UserDirectory`, synced to the URL via `router.replace()`

The URL is the single source of truth for UI state. On mount, `UserDirectory` reads `useSearchParams()` to initialize React state — so refreshing or sharing a URL restores the exact view.

---

## Assumptions

- JSONPlaceholder is available and responsive; no additional caching beyond `revalidate: 60`
- The 10-user dataset fits in memory — pagination is not required
- Tailwind CSS v3 (not v4)

---

## Possible Improvements

- Debounce the search input to reduce URL writes on every keystroke
- Add pagination or virtual scrolling for larger datasets
- Add more filter dimensions (by company, city, etc.)
- Persist sort preference to `localStorage`
- Add E2E tests with Playwright
