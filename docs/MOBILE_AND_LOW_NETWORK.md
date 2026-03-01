# Mobile & Low-Network Readiness

This doc summarizes how the app behaves on **mobile phones** and **low/slow networks**, and what was improved or is recommended.

---

## What’s already in place

### Mobile

- **Viewport & metadata** (in `src/app/layout.tsx`):
  - `viewport`: `width=device-width`, `initialScale=1`, `maximumScale=5`, `userScalable=true`, `themeColor` for browser UI.
  - `metadata`: default title/description and `formatDetection` for phone/email.
- **Responsive layout**:
  - Tailwind breakpoints (`sm`, `md`, `lg`, `xl`) are used across Raffle draw, Recharge, Account/Profile, Wallet, Fund wallet, Community, My orders, etc.
  - `.content-container` in `globals.css` has responsive padding and max-width so content doesn’t overflow on small screens.
- **Header**:
  - Hamburger menu (FiMenu / IoClose) and mobile search; desktop nav is hidden on small screens via `hidden md:flex` (and similar).
- **Profile / Wallet / Recharge**:
  - Use responsive classes (e.g. `flex-col` on mobile, `lg:flex-row` on desktop, `xs:w-[15em]`, `md:w-[25em]` for cards).
- **Touch**:
  - `body` has `-webkit-overflow-scrolling: touch` and `overflow-x: hidden` for smoother scrolling and no horizontal overscroll on mobile.

So the app and the pages you mentioned (Raffle draw, Recharge, Account, Profile, Wallet, Fund wallet, etc.) are built to **run on mobile** and should layout correctly on phones; behavior is not desktop-only.

### Low network

- **Tawk chat**:
  - Script is loaded with `strategy="lazyOnload"` so it runs after the page is idle. This improves first paint and interactivity on slow connections.
- **Home page**:
  - Heavy sections (Banner, Community, ProductCardMain, CatFeatCard, AuctionComp) are loaded with `next/dynamic` and placeholders, which helps initial load and low-network users.
- **Fonts**:
  - Main UI fonts use `next/font` (Poppins, Inter, Nunito Sans) with `display: "swap"` so text appears even if font files are slow.

---

## Recommendations (optional improvements)

1. **Raffle draw / Recharge / Wallet**
   - Consider lazy-loading heavy below-the-fold sections with `next/dynamic` (similar to the home page) so first paint stays fast on slow networks.

2. **Images**
   - Keep using Next.js `<Image />` with sensible `sizes` so the browser fetches appropriately sized images on mobile and saves bandwidth.

3. **Duplicate font loading**
   - `globals.css` still has `@import url('https://fonts.googleapis.com/...')` for Inter/Poppins. The app already uses `next/font` for these in `layout.tsx`. Removing the Google Fonts `@import` (or limiting it to fonts not loaded by Next) can reduce requests on low network.

4. **Loading states**
   - Key flows (Fund wallet, Recharge, Raffle draw entry) already use loaders/skeletons in many places. Keep clear loading and error states so users on slow networks know the app is working.

5. **Testing**
   - Manually test on real devices (or Chrome DevTools device mode) for:
     - Raffle draw, Recharge, Account, Profile, Wallet, Fund wallet.
   - Use Chrome DevTools **Network** → “Slow 3G” (or similar) to confirm pages remain usable and that Tawk and other non-critical scripts don’t block the main experience.

---

## Summary

- **Mobile:** The app and the listed pages (Raffle draw, Recharge, Account, Profile, Wallet, Fund wallet, etc.) are built to run on phones with responsive layout, viewport, and touch-friendly behavior.
- **Low network:** Tawk is deferred, the home page uses dynamic imports, and fonts use `display: swap`. Further gains are possible by lazy-loading more sections and trimming duplicate font requests.
