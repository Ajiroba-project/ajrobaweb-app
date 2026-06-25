/**
 * Gift-merchant matching: a store line matches if it contains **any one** of the
 * user's geographic **anchors** — their state, LGA, or city. Street/area tokens are
 * **support** only and boost ranking when present but are never required. This keeps
 * matching resilient: catalogs that list only the city (no state) still match, and a
 * user is never shown an empty list just because the store line omits their state.
 * Anchors are matched whole-word ("port" ≠ "Airport"); FCT/Abuja are treated as
 * aliases; numbers and generic stopwords are ignored.
 *
 * Legacy raw-string input falls back to the older primary(last-segment)/secondary split.
 */

export type GiftMerchantEmptyKind =
  | "needs_address"
  | "empty_catalog"
  | "no_store_match"
  | "no_search_match";

export type ResolveGiftMerchantsResult = {
  merchants: any[];
  /** When list is empty, explains why; use with giftMerchantEmptyMessage */
  emptyKind: GiftMerchantEmptyKind | null;
};

/** Profile fields used to build a comma-separated location string for matching. */
export type UserLocationInput = {
  address?: string | null;
  state?: string | null;
  lga?: string | null;
  city?: string | null;
};

export type UserAddressInput = string | UserLocationInput | null | undefined;

/**
 * Words that appear in almost every formatted Nigerian address line in the
 * merchant API (e.g. "Nigeria", "State", "Road") and must not drive matching
 * — otherwise any store line containing "Nigeria" would match "Ibadan, Nigeria".
 */
const ADDRESS_MATCH_STOPWORDS = new Set(
  [
    "nigeria",
    "nigerian",
    "country",
    "state",
    "federal",
    "capital",
    "territory",
    "the",
    "and",
    "for",
    "are",
    "not",
    "off",
    "new",
    "old",
    "opp",
    "opposite",
    "beside",
    "before",
    "after",
    "along",
    "km",
    "ring",
    "line",
    "local",
    "government",
    "lga",
    "area",
    "zone",
    "road",
    "street",
    "avenue",
    "close",
    "crescent",
    "drive",
    "lane",
    "way",
    "boulevard",
    "highway",
    "expressway",
    "express",
    "plot",
    "block",
    "suite",
    "floor",
    "stall",
    "unit",
    "estate",
    "layout",
    "phase",
    "mall",
    "plaza",
    "park",
    "market",
    "shop",
    "center",
    "centre",
    "city",
    "town",
    "village",
    "building",
    "house",
    "number",
    "bus",
    "stop",
    "roundabout",
    "junction",
    "bridge",
  ].map((w) => w.toLowerCase()),
);

function cleanLocationPart(value: unknown): string {
  if (value == null) return "";
  // Only accept primitives. Objects/arrays would stringify to "[object Object]"
  // and poison matching if the API ever returns state/lga as nested objects.
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value).trim();
  }
  return "";
}

/**
 * Place names that are written differently in user profiles vs. merchant catalogs.
 * A user whose state is "FCT" must still match Abuja store lines, and vice versa.
 */
const LOCATION_ALIASES: Record<string, string[]> = {
  fct: ["abuja"],
  abuja: ["fct"],
};

/** Adds known alias tokens (e.g. fct→abuja) so spelling differences don't drop matches. */
function expandLocationAliases(tokens: string[]): string[] {
  const out = new Set(tokens);
  for (const t of tokens) {
    const aliases = LOCATION_ALIASES[t];
    if (aliases) for (const a of aliases) out.add(a);
  }
  return Array.from(out);
}

/**
 * Builds `"street, lga, state"` so the last segment is usually the state for matching.
 * Accepts a raw string (legacy) or profile fields when `address` omits state/LGA.
 */
export function composeUserLocationForMatch(
  input: UserAddressInput,
): string {
  if (input == null) return "";
  if (typeof input === "string") return input.trim();

  const address = cleanLocationPart(input.address);
  const state = cleanLocationPart(input.state);
  const lga = cleanLocationPart(input.lga) || cleanLocationPart(input.city);

  const parts = [address, lga, state].filter((part) => part.length > 0);
  return parts.join(", ");
}

/** Normalizes caller input to a single address string for token extraction. */
export function normalizeUserAddressInput(
  input: UserAddressInput,
): string {
  return composeUserLocationForMatch(input);
}

/**
 * Pulls letter-only tokens (length ≥ 3), drops generic stopwords, dedupes.
 * Works for comma-separated Nigerian addresses: numbers/punctuation are ignored;
 * repeated segments (e.g. street name twice) collapse to one token each.
 */
export function normalizeAddressTokens(text: string | undefined | null): string[] {
  if (text == null) return [];
  const str = typeof text === "string" ? text : String(text);
  const raw = (str.toLowerCase().match(/[a-z]+/g) || []).filter((t) => t.length >= 3);
  const filtered = raw.filter((t) => !ADDRESS_MATCH_STOPWORDS.has(t));
  return Array.from(new Set(filtered));
}

export type PrimarySecondaryTokens = {
  /** Last meaningful geographic segment (typically state); all must match a store line. */
  primaryTokens: string[];
  /** Text before that segment (area, street); optional for a match; used for sorting. */
  secondaryTokens: string[];
};

/**
 * **Primary** tokens come from the **last** comma-separated segment (e.g. `Ogun`).
 * If that segment normalizes to nothing (e.g. only “Nigeria”), uses the **last two**
 * segments together (`Lagos, Nigeria` → `lagos`). **Secondary** is everything before
 * the segment(s) used for primary so `AREPO` still ranks lines higher when the catalog
 * lists it, without requiring street-level tokens on every API row.
 */
export function splitPrimarySecondaryTokens(
  text: string | null | undefined,
): PrimarySecondaryTokens {
  if (text == null || String(text).trim() === "") {
    return { primaryTokens: [], secondaryTokens: [] };
  }
  const str = String(text).trim();
  const segments = str
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (segments.length < 2) {
    return {
      primaryTokens: normalizeAddressTokens(str),
      secondaryTokens: [],
    };
  }

  let primaryTokens = normalizeAddressTokens(segments[segments.length - 1]!);
  let firstPrimaryIndex = segments.length - 1;

  if (primaryTokens.length === 0) {
    primaryTokens = normalizeAddressTokens(
      `${segments[segments.length - 2]!}, ${segments[segments.length - 1]!}`,
    );
    firstPrimaryIndex = segments.length - 2;
  }

  if (primaryTokens.length === 0) {
    const fallback = normalizeAddressTokens(str);
    return { primaryTokens: fallback, secondaryTokens: [] };
  }

  const secondaryTokens = normalizeAddressTokens(
    segments.slice(0, firstPrimaryIndex).join(", "),
  );

  return { primaryTokens, secondaryTokens };
}

export type MatchTokens = {
  /**
   * Anchors taken from the user's typed **address**: the last meaningful segment
   * (e.g. "43, akewukewe street, surulere" → "surulere"). A store matches if it
   * contains any of these.
   */
  specificTokens: string[];
  /**
   * Broad fallback (state, then LGA/city). Used ONLY when the address matches no store,
   * so an address whose area isn't in the catalog (e.g. "…, Arepo") still resolves to
   * the user's state instead of showing nothing. Never widens results when the address
   * already matched.
   */
  broadTokens: string[];
  /** Earlier address tokens (street/area) — never required; used only to rank matches. */
  supportTokens: string[];
};

/**
 * Builds match tokens primarily from the user's **typed address**. The structured
 * state/LGA fields are kept as a broad fallback only — applied when the address matches
 * no store — so matching stays address-driven without leaving the user empty when their
 * area name isn't present in the merchant catalog.
 */
export function buildMatchTokens(input: UserAddressInput): MatchTokens {
  let addressText =
    input == null
      ? ""
      : typeof input === "string"
        ? input
        : cleanLocationPart(input.address);

  // Address field blank → fall back to whatever location the profile does have.
  if (addressText === "" && input != null && typeof input !== "string") {
    addressText = composeUserLocationForMatch({
      state: input.state,
      lga: input.lga,
      city: input.city,
    });
  }

  const { primaryTokens, secondaryTokens } =
    splitPrimarySecondaryTokens(addressText);

  // Broad fallback = state (then LGA/city) from a structured profile, if available.
  const broadTokens =
    input != null && typeof input !== "string"
      ? expandLocationAliases(
          normalizeAddressTokens(
            [
              cleanLocationPart(input.state),
              cleanLocationPart(input.lga),
              cleanLocationPart(input.city),
            ]
              .filter((p) => p.length > 0)
              .join(", "),
          ),
        )
      : [];

  return {
    specificTokens: expandLocationAliases(primaryTokens),
    broadTokens,
    supportTokens: secondaryTokens,
  };
}

/** Safe display when the merchant list is empty */
export function giftMerchantEmptyMessage(kind: GiftMerchantEmptyKind | null): string {
  switch (kind) {
    case "needs_address":
      return "Add your address in your profile to see merchants near you.";
    case "empty_catalog":
      return "No merchants are available at the moment.";
    case "no_store_match":
      return "No merchant store locations match your profile address. Kindly update your address to include your state. Thanks";
    case "no_search_match":
      return "No merchants match your search.";
    default:
      return "No merchants found.";
  }
}

/** Whole-word match so "port" does not match "Airport", "off" not "Office". */
function textContainsTokenAsWord(lowerText: string, token: string): boolean {
  if (!token || !lowerText) return false;
  try {
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i").test(lowerText);
  } catch {
    return false;
  }
}

function countTokenMatchesOnLine(lowerText: string, userTokens: string[]): number {
  let n = 0;
  for (const tok of userTokens) {
    if (textContainsTokenAsWord(lowerText, tok)) n += 1;
  }
  return n;
}

/** Matches if the store line contains AT LEAST ONE anchor (state/LGA/city). */
function storeMatchesAddressTokens(
  storeLine: string,
  anchorTokens: string[],
): boolean {
  if (anchorTokens.length === 0) return false;
  const text = storeLine?.toString().toLowerCase() || "";
  return countTokenMatchesOnLine(text, anchorTokens) > 0;
}

function scoreMatchedStores(
  stores: string[],
  anchorTokens: string[],
  supportTokens: string[],
): number {
  let best = 0;
  for (const store of stores) {
    const text = store?.toString().toLowerCase() || "";
    // Weight anchors above support so the most location-specific stores rank first.
    let s = countTokenMatchesOnLine(text, anchorTokens) * 2;
    s += countTokenMatchesOnLine(text, supportTokens);
    if (s > best) best = s;
  }
  return best;
}

/**
 * API payloads may be null or non-array; merchant rows may omit stores.
 */
export function sanitizeMerchantsInput(raw: unknown): any[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((m) => m != null && typeof m === "object")
    .map((m: any) => ({
      ...m,
      stores: Array.isArray(m.stores)
        ? m.stores.map((s: unknown) => (s == null ? "" : String(s)))
        : [],
    }));
}

/**
 * Returns merchants with `stores` filtered by primary (and optional secondary for scoring).
 */
export function filterMerchantsByUserAddress(
  merchants: any[],
  userAddress: UserAddressInput,
): any[] {
  const list = Array.isArray(merchants) ? merchants : [];
  const { specificTokens, broadTokens, supportTokens } =
    buildMatchTokens(userAddress);
  if (specificTokens.length === 0 && broadTokens.length === 0) return [];

  const filterWith = (anchorTokens: string[]): any[] => {
    if (anchorTokens.length === 0) return [];
    const withStores = list.map((m: any) => {
      const raw = Array.isArray(m?.stores) ? m.stores : [];
      const matchedStores = raw.filter((s: string) =>
        storeMatchesAddressTokens(s?.toString() ?? "", anchorTokens),
      );
      const __score = scoreMatchedStores(
        matchedStores,
        anchorTokens,
        supportTokens,
      );
      return { ...m, stores: matchedStores, __score };
    });
    return withStores
      .filter((m: any) => m.stores.length > 0 && m.__score > 0)
      .sort((a: any, b: any) => b.__score - a.__score)
      .map(({ __score, ...rest }: any) => rest);
  };

  // Most-specific first (LGA/area). Only widen to the state if nothing matched,
  // so the user sees stores near them rather than the whole state by default.
  const specific = filterWith(specificTokens);
  if (specific.length > 0) return specific;
  return filterWith(broadTokens);
}

/**
 * Full pipeline: sanitize → address match → optional search.
 * Never returns merchants whose stores don't match the user's address (when address tokens exist).
 */
export function resolveGiftMerchants(
  rawMerchants: unknown,
  userAddress: UserAddressInput,
  searchQuery: unknown,
): ResolveGiftMerchantsResult {
  const merchants = sanitizeMerchantsInput(rawMerchants);
  const { specificTokens, broadTokens } = buildMatchTokens(userAddress);

  if (specificTokens.length === 0 && broadTokens.length === 0) {
    return { merchants: [], emptyKind: "needs_address" };
  }

  if (merchants.length === 0) {
    return { merchants: [], emptyKind: "empty_catalog" };
  }

  const addressFiltered = filterMerchantsByUserAddress(merchants, userAddress);
  const q =
    typeof searchQuery === "string" ? searchQuery.trim().toLowerCase() : "";

  if (!q) {
    if (addressFiltered.length === 0) {
      return { merchants: [], emptyKind: "no_store_match" };
    }
    return { merchants: addressFiltered, emptyKind: null };
  }

  const searched = addressFiltered.filter((merchant: any) => {
    const nameMatch = merchant.name?.toString().toLowerCase().includes(q);
    const storesMatch = Array.isArray(merchant.stores)
      ? merchant.stores.some((s: string) =>
          s.toString().toLowerCase().includes(q),
        )
      : false;
    return nameMatch || storesMatch;
  });

  if (searched.length === 0) {
    return {
      merchants: [],
      emptyKind:
        addressFiltered.length === 0 ? "no_store_match" : "no_search_match",
    };
  }

  return { merchants: searched, emptyKind: null };
}

/** @deprecated Prefer resolveGiftMerchants when you need empty-state messaging */
export function getFilteredGiftMerchants(
  rawMerchants: unknown,
  userAddress: UserAddressInput,
  searchQuery: unknown,
): any[] {
  return resolveGiftMerchants(rawMerchants, userAddress, searchQuery).merchants;
}
