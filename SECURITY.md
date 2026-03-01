# Security Report (Pre-Launch)

This document summarizes the security review performed before the app went public and the fixes applied.

---

## Fixes Applied

### 1. Token logging removed
- **File:** `src/app/api/getcartitems/route.js`
- **Issue:** The auth token was being logged with `console.log(token_, 'token_')`, which could expose tokens in server logs or browser consoles.
- **Fix:** Removed the `console.log` call. Tokens and other sensitive data must never be logged.

### 2. Cookie security (HTTPS)
- **File:** `src/store/store.js`
- **Issue:** Auth cookies (`token`, `user`) were set with `sameSite: 'strict'` but without the `secure` flag. On HTTPS, cookies should be marked `secure` so they are not sent over plain HTTP.
- **Fix:** When setting the token and user cookies, we now set `secure: true` when the page is loaded over HTTPS (`window?.location?.protocol === 'https:'`). On HTTP (e.g. local dev), `secure` remains false so cookies still work.

### 3. Voucher innerHTML XSS risk
- **Issue:** Multiple components build voucher HTML with `voucherContent.innerHTML` using template literals that inject API/user-driven data (e.g. `orderNumber`, `reference`, `status`, `pin`, `code`, `serial`). If that data ever contained HTML/script, it could lead to XSS.
- **Fix:**
  - Added **`src/utils/escapeHtml.ts`**: a small utility that escapes `&`, `<`, `>`, `"`, `'` so that dynamic text is safe when inserted into HTML.
  - Updated all voucher download flows to pass every dynamic value through `escapeHtml` before interpolating into the voucher HTML.
- **Components updated:**  
  `auction-wins`: `AuctionCard.tsx`, `AuctionCardOpen.tsx`, `PastAuctionCard.tsx`, `AuctionWinCard.tsx`  
  `raffledraw-wins`: same four components  
  `community`, `profile`, `my-order`, `wallet`: `AuctionCard.tsx`, `AuctionCardOpen.tsx` (where voucher innerHTML was used).

---

## Findings (No Code Change / Recommendations)

- **API routes:** Many routes accept `body.token` from the client and forward it to the backend. The real security boundary is backend validation; ensure the backend always validates the token and never trusts the client for authorization decisions.
- **Environment variables:** Only `NEXT_PUBLIC_*` and `BASE_URL`–style variables were seen in the scanned usage. Ensure no secrets are committed; keep API keys and secrets in env vars that are not prefixed with `NEXT_PUBLIC_`.
- **Redirects:** Checked redirect usage; no open-redirect patterns were identified in the reviewed code. Continue to validate any user-controlled redirect URLs.

---

## Recommendations for the Team

1. **Never log tokens or secrets**  
   Avoid `console.log` (or any logging) of auth tokens, API keys, or PII in both client and server code.

2. **Cookie hardening**  
   - Use `secure: true` for auth cookies in production (already done when on HTTPS).  
   - Where possible, consider moving the auth token to an **httpOnly** cookie so it is not readable by JavaScript (reduces impact of XSS). This may require backend and auth flow changes.

3. **Sanitize before innerHTML**  
   Any time you set `innerHTML` (or use `dangerouslySetInnerHTML`) with data from the API or user input, escape or sanitize it. Use `src/utils/escapeHtml.ts` for plain text, or a well-maintained sanitization library if you need to allow limited HTML.

4. **Dependency audit**  
   Run `npm audit` regularly and address critical/high vulnerabilities. Consider `npm audit fix` (or targeted updates) after reviewing breaking changes.

5. **Ongoing checks**  
   - Before each release, grep for `console.log` in API routes and remove or redact sensitive data.  
   - Review any new uses of `innerHTML` or `dangerouslySetInnerHTML` for proper escaping/sanitization.

---

*Report generated as part of pre-public launch security review.*
