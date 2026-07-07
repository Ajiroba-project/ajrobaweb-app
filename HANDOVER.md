# Ajiroba Web App — Handover

The customer-facing web app for **Ajiroba**, a consumer raffle / e-commerce platform for Nigerians and the diaspora. Users buy raffle tickets, bid in auctions, recharge airtime/data/electricity/cable, manage a wallet, buy gift cards, and interact in a community feed.

It is a **frontend + thin API layer**. The real business logic lives in a separate backend (`staging.ajiroba.ng/v1`). This app talks to that backend, either directly from the browser or through its own proxy routes.

---

## 1. Tech Stack

| Area | Choice |
|------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript + some JS |
| UI | Tailwind CSS, NextUI, MUI, Ant Design, DaisyUI |
| Animation | Framer Motion, Swiper |
| Data fetching | TanStack React Query (`@tanstack/react-query`) |
| Client state | Zustand (`src/store/store.js`) |
| Auth storage | Cookies via `js-cookie` |
| HTTP | native `fetch` (and `axios` in places) |
| PDF / export | `@react-pdf/renderer`, `jspdf`, `xlsx` |
| Live chat | Tawk.to (embedded in `layout.tsx`) |
| Node | 18+ (dev machine uses v24) |

---

## 2. Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # run production build
npm run lint       # eslint
```

---

## 3. Environment Variables

Create a `.env` (it is **gitignored** — not committed). Current values point at staging:

```env
# Base URL of the backend API (used by browser code and API proxy routes)
NEXT_PUBLIC_BASE_URL=https://staging.ajiroba.ng/v1
BASE_URL=https://staging.ajiroba.ng/v1

# Base URL for serving images from the backend
NEXT_PUBLIC_BASE_URL_IMG=https://staging.ajiroba.ng/
```

Optional / referenced in code:

| Variable | Where | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SITE_URL` | `layout.tsx` | Canonical site URL for SEO/OG tags. Defaults to `https://ajiroba.ng`. |
| `VERCEL_URL` | `utils/getBaseUrl.ts` | Auto-set on Vercel; used as a server-side fallback. |

**To switch to production**, change the three base URLs to the live backend (`https://ajiroba.ng/v1` etc.).

---

## 4. Project Structure

```
src/
├── app/                    # App Router — each folder is a route
│   ├── layout.tsx          # Root layout: fonts, providers, ToastContainer, Tawk chat
│   ├── page.tsx            # Homepage
│   ├── providers.tsx       # NextUI provider
│   ├── static-data.tsx     # Hardcoded demo/seed data
│   │
│   ├── component/          # ~46 shared UI components (Header, Footer, Card, Modal, Button...)
│   ├── api/                # Backend-for-frontend proxy routes (see §6)
│   │
│   └── <feature folders>/  # One folder per page/route (see §5)
│
├── components/ui/          # shadcn-style primitives (select.tsx)
├── hooks/                  # Data + auth hooks (see §7)
├── store/store.js          # Zustand global store (auth, cart, user)
├── lib/                    # utils.ts, networkErrorHandler.ts
└── utils/                  # getBaseUrl, formatCurrency, provider (React Query), helpers
```

> Note: `src/app/component/` (singular, feature components) is different from `src/components/` (UI primitives). Most components live in the former.

---

## 5. Main Routes / Features

Each folder under `src/app/` is a page. Key ones:

- **Auth**: `signin`, `signup`, `otpverification`, `verification`, `forgot-password` / `forgotpassword`, `setnewpass`, `reset-pin`, `resendotp`
- **Shopping**: `categories`, `search`, `cart`, `my-order`, `purchaseorder`, `paymentpage`, `transaction-receipt`
- **Raffle**: `raffle`, `raffledraw`, `raffledraw-wins` / `raffledrawwins`, `raffleended`, `rafflevideos`
- **Auction**: `auction`, `auction-wins` / `auctionwins`
- **Wallet & bills**: `wallet`, `recharge` (airtime/data/electricity/cable)
- **Other**: `community`, `referral` / `aff`, `profile`, `faq`, `contactUs`, `livechat`, `aboutUs`, `privacy-policy`

> ⚠️ Several features have duplicate/near-duplicate folders (e.g. `auction-wins` vs `auctionwins`, `forgot-password` vs `forgotpassword`, `transreceipt` vs `transaction-receipt`). Confirm which is live before editing — the routing is confusing here and is a good cleanup target.

---

## 6. API Layer (`src/app/api/`)

These are Next.js route handlers acting as a **Backend-for-Frontend (BFF) proxy**. They forward requests to `NEXT_PUBLIC_BASE_URL` (the real backend) and return `{ data, status }`.

Typical pattern (see `api/signin/route.js`):

```js
export async function POST(request) {
  const body = await request.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json({ data, status: res.status });
}
```

Covers: auth, payments (`makepayment`, `orderpayment`, `bidpayment`, `cashout`), bills (`purchaseairtime`, `purchasedata`, `purchaseelectricity`, `purchasecable`), wallet PIN ops, cart, orders, community (posts/likes/comments), gift cards (`suregifts/*`), banks, etc.

> Not every backend call goes through these proxies — some hooks call the backend directly using `NEXT_PUBLIC_BASE_URL`. Both patterns exist.

`next.config.mjs` also has a rewrite: `/api/cable_tv_packages` → backend `pay/nomba/cable_tv_packages`.

---

## 7. State, Data & Auth

**Global store** — `src/store/store.js` (Zustand):
- `isLoggedIn`, `user`, `token` — hydrated from cookies on load
- Cart state: `cartCount`, `isAddingToCart`, `cartRefreshTrigger`
- Actions: `setUser`, `setLoggedIn`, `setAddingToCart`, etc.

**Auth model**: On login, a **token** and the **user** object are stored in cookies (`js-cookie`). There is no server-side session/middleware — auth is checked client-side. `hooks/useAuth.tsx` redirects based on the cookie/store state.

**Data hooks** (`src/hooks/`):
- `useQueryData` / `useGetData` — GET (wraps React Query `useQuery`)
- `useMutateData` / `useMutateNewData` / `usePutMutateData` / `useMutateDataBid` — POST/PUT (wraps `useMutation`). Sends `Authorization: Token <token>`, handles FormData, normalizes error messages.
- Feature-scoped auth hooks: `useAuthCart`, `useAuthWallet`, `useAuthOrders`, `useAuthRaffle`, `useAuthCommunity`, `useAuthAuctionwins`, `useAuthmyorder`
- Utility: `useDebounce`, `useExcludeHeader`, `usePathname`, `useSaveBeneficiary`

React Query is provided app-wide via `src/utils/provider.tsx` (`RQProviders`) in `layout.tsx`.

---

## 8. Images

- Configured remote hosts in `next.config.mjs`: `staging.ajiroba.ng`, `ajiroba.ng`, `ajiroba.onrender.com`, `youtu.be`, `via.placeholder.com`, `img.daisyui.com`.
- When adding a new image source domain, add it to `images.remotePatterns` or `next/image` will error.

---

## 9. Existing Docs (read these too)

- `README.md` — basic intro
- `SECURITY.md` — security notes
- `NETWORK_ERROR_HANDLING.md` — how network errors are handled (`lib/networkErrorHandler.ts`)
- `docs/MOBILE_AND_LOW_NETWORK.md` — mobile / low-network optimizations

---

## 10. Deployment

- Designed for **Vercel** (code has `VERCEL_URL` fallback), but any Node host running `next build` + `next start` works.
- Set the env vars from §3 in the host dashboard.
- No database in this repo — all data comes from the backend API.

---

## 11. Things to Know / Watch Out For

1. **Duplicate route folders** (see §5) — confusing, verify the live one before editing.
2. **Two ways to reach the backend** — via `/api/*` proxies and via direct `fetch` in hooks. Check both when changing endpoints.
3. **Auth is cookie-based and client-side only** — no server middleware guarding routes.
4. **`.env` is not committed** — new devs must create it (values in §3).
5. **Mixed UI libraries** (NextUI + MUI + Ant Design + DaisyUI) — pick the one already used in the component you're editing to stay consistent.
6. **Tawk.to live chat** is hardcoded in `layout.tsx` (script id `691531b9...`).
7. Lots of commented-out code throughout — safe to ignore/clean up.

---

## 12. Contacts

- Lead Frontend: **Femi Akinyemi** ([@femakin](https://github.com/femakin))
- Frontend: **Peter Samuel** ([@petsamuel](https://github.com/petsamuel))
- Repo: `github.com/Ajiroba-project/ajrobaweb`
