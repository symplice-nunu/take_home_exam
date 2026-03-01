# User Directory App

A Next.js 14 application that fetches users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) and exposes them through a searchable, sortable directory with a URL-driven state model and a Parallel Routes modal pattern.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Rendering Strategy](#rendering-strategy)
- [State Management](#state-management)
- [Modal Pattern](#modal-pattern)
- [Testing](#testing)
- [Design Decisions](#design-decisions)
- [Assumptions](#assumptions)
- [Potential Improvements](#potential-improvements)

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18.17 (Next.js 14 minimum) |
| npm | ≥ 9 |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is occupied, Next.js increments automatically — the bound address is printed to stdout.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Produce an optimized production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint via `next lint` |
| `npm test` | Run the full Jest suite (21 tests) |
| `npm run test:watch` | Jest in interactive watch mode |

---

## Architecture

```
src/
├── app/
│   ├── @modal/                        # Parallel route slot
│   │   ├── default.tsx                # Required null fallback (slot must always resolve)
│   │   └── (.)users/[id]/
│   │       ├── page.tsx               # Intercepting route → mounts UserModal
│   │       └── loading.tsx            # Skeleton overlay while fetching
│   ├── users/[id]/
│   │   ├── page.tsx                   # Canonical detail page (direct URL / refresh)
│   │   ├── loading.tsx                # Skeleton for full-page route
│   │   └── not-found.tsx
│   ├── layout.tsx                     # Root layout — receives {children} + {modal} slots
│   ├── page.tsx                       # Directory (Server Component + Suspense boundary)
│   └── globals.css
├── components/
│   ├── UserModal.tsx                  # Backdrop, Escape handler, scroll lock  [client]
│   ├── UserDetailContent.tsx          # Detail card shared by modal + full page [server]
│   ├── UserDirectory.tsx              # Search, sort, URL sync                 [client]
│   ├── UserCard.tsx                   # Link + staggered CSS animation          [server]
│   ├── UserList.tsx                   # Responsive grid layout
│   ├── SearchBar.tsx
│   ├── SortToggle.tsx                 # 3-state cycle: original → asc → desc
│   ├── BackButton.tsx                 # router.back()                          [client]
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx              # window.location.reload fallback         [client]
├── hooks/
│   └── useUsers.ts                    # Data-fetching hook with AbortController
├── lib/
│   └── api.ts                         # API_BASE constant + shared getUser()
├── types/
│   └── user.ts                        # User interface + SortOrder union type
└── utils/
    ├── filterUsers.ts                 # Pure filter + sort — no side effects
    └── formatUser.ts                  # getInitials() and other display helpers
```

---

## Rendering Strategy

The app applies the React Server Components model deliberately:

| Component | Strategy | Reason |
|-----------|----------|--------|
| `app/page.tsx` | Server Component + `Suspense` | Streams shell immediately; data loads concurrently |
| `app/users/[id]/page.tsx` | Async Server Component | Fetches on the server with `revalidate: 60`; renders HTML before delivery |
| `UserDetailContent` | Server Component | Shared between the modal intercepting route and the full-page route — no duplication |
| `UserDirectory` | Client Component | Owns interactive state (search input, sort toggle) and drives `router.replace()` |
| `UserModal` | Client Component | Needs `useEffect` for `keydown` listener, scroll lock, and `router.back()` |
| `UserCard` | Server Component | Purely presentational; animation delay injected via a CSS custom property (`--delay`) |

Server Components fetch data directly — no client-side waterfall, no `useEffect` on initial load for detail pages.

---

## State Management

No external state library is used. State is cleanly separated by concern:

**Async data** — `useUsers` hook
`useState` + `useEffect` + `AbortController`. The controller is cancelled in the effect cleanup, preventing stale responses from updating state after unmount or query change.

**UI state** (search query, sort order) — `UserDirectory`
`useState`, synchronized to the URL via `router.replace()`. The URL is the single source of truth: on mount, `UserDirectory` initializes from `useSearchParams()`, so a shared URL or hard refresh restores the exact view without any persistence layer.

**Modal close** — `router.back()`
Because the modal is opened by a client-side navigation push, `router.back()` replays the previous history entry. The directory never unmounts and retains its React state across open/close.

---

## Modal Pattern

This app uses **Next.js 14 Parallel Routes + Intercepting Routes** to present user detail as a modal overlay while keeping the directory mounted behind it.

```
Client-side click (/users/7)
  └─ @modal/(.)users/[id]/page.tsx intercepts → renders UserModal over the directory

Direct URL or refresh (/users/7)
  └─ Intercepting route is bypassed → app/users/[id]/page.tsx renders full-page
```

| Entry point | Rendered output |
|-------------|----------------|
| Card click (client navigation) | Modal overlay — directory visible + interactive behind it |
| Direct URL / page refresh | Full standalone detail page |
| Escape, backdrop click, or X button | `router.back()` — modal dismissed, directory state preserved |

The `@modal/default.tsx` fallback is required: without it, Next.js cannot render the root layout on routes where the modal slot has no match.

---

## Testing

**Framework:** Jest 29 + React Testing Library + `jest-environment-jsdom`

**Coverage: 21 tests across 2 suites**

### `filterUsers` (14 tests)

Tests the core pure function in isolation. Covers:

- Filter by name (case-insensitive, partial match, whitespace trim)
- Filter by email, username, city, phone, and company name
- Empty query returns all users; no-match query returns empty array
- Sort ascending (A → Z), descending (Z → A), and original insertion order
- **Immutability** — input array is not mutated by the sort path

### `UserCard` (7 tests)

Tests the presentational card component with `next/navigation` mocked. Covers:

- Renders name, email, and city from the `User` object
- `href` is `/users/[id]` with no trailing `?` when no search params are present
- `href` appends `?search=...&sort=...` when search params are passed
- Avatar renders initials derived from the name (`"John Doe"` → `"JD"`)
- Animation delay is applied as a CSS custom property (`--delay: 240ms`)

**Run tests:**
```bash
npm test
```

---

## Design Decisions

**Why no global state library?**
The state surface is small and orthogonal: async data lives in a single hook, UI state lives in a single component, and the URL mediates both persistence and shareability. Adding Redux or Zustand would introduce indirection without benefit at this scale.

**Why is `UserDetailContent` a Server Component?**
It is consumed by two routes: the intercepting modal route and the canonical full-page route. Keeping it a Server Component means data fetching and rendering happen on the server in both cases, and there is no code duplication or prop-drilling needed to share it.

**Why CSS custom properties for animation delays?**
`UserCard` is a Server Component — it cannot receive runtime JS-driven props from a client context for CSS animations. A CSS custom property (`style={{ "--delay": "${n}ms" }}`) passes the value at the HTML attribute level, allowing the `@keyframes` rule in `globals.css` to consume it without any client-side JavaScript.

**Why `router.back()` instead of `router.push("/")`?**
`router.push("/")` would lose the search and sort state from the URL (it navigates to `/?` not `/?search=john&sort=asc`). `router.back()` replays the exact prior history entry, restoring the full URL — and because the directory never unmounts, React state is also preserved.

**Why `AbortController` in `useUsers`?**
React's strict mode mounts effects twice in development. Without cleanup, the first (discarded) fetch would still resolve and `setState` on an unmounted or re-mounted component. The `AbortController` cancels the in-flight request on cleanup, eliminating race conditions and the "can't update state on unmounted component" warning.

---

## Assumptions

- **Dataset size** — JSONPlaceholder returns exactly 10 users. No pagination is implemented; the full list is held in memory on the client. This is appropriate for the dataset; it is a deliberate scope decision, not an oversight.
- **Cache TTL** — Server-side fetches use `revalidate: 60`. Stale data can be served for up to 60 seconds. An on-demand revalidation endpoint is not implemented.
- **Search scope** — Filtering runs entirely on the pre-fetched client-side list. There is no server-side search or debounce, which is fine at 10 records but would not scale.
- **No authentication** — JSONPlaceholder is a public read-only API; auth is out of scope.

---

## Potential Improvements

| Improvement | Rationale |
|-------------|-----------|
| Debounce search input | Each keystroke currently calls `router.replace()`. A 200–300 ms debounce reduces URL history noise and is essential before adding server-side search. |
| E2E tests (Playwright) | Unit tests cover logic and rendering in isolation. An E2E suite would cover the modal open/close flow, URL round-trips, and the intercepting route behaviour — things JSDOM cannot reliably test. |
| On-demand cache revalidation | A `POST /api/revalidate` route using Next.js `revalidatePath` would allow cache purging without a 60-second wait, useful if the upstream data changes. |
| Pagination or virtual scrolling | Required before deploying against a real, large dataset. React Virtual (`@tanstack/react-virtual`) integrates well with the existing list architecture. |
| Multi-field filtering UI | The `filterUsers` utility already matches against email, city, phone, and company. Surfacing these as dedicated filter controls (rather than a single search box) would improve discoverability. |
| `localStorage` sort preference | Persist the user's last-used sort order across sessions. Requires careful hydration handling to avoid a SSR/CSR mismatch on the `SortToggle`. |
