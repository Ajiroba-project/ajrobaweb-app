/**
 * Gift-merchant list: **Primary** = last comma-separated segment (usually state), so
 * `"…, AREPO, Ogun"` matches any store line containing **Ogun**; area & street tokens
 * live in **secondary** and boost ranking when present. If the last segment is only
 * stopwords (e.g. “Nigeria”), primary is taken from the last two segments. Single-part
 * addresses require every token on the line. Numbers are ignored.
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
  return String(value).trim();
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

/** Every primary token must appear; secondary is not required (catalog omits streets). */
function storeMatchesAddressTokens(
  storeLine: string,
  primaryTokens: string[],
  _secondaryTokens: string[],
): boolean {
  if (primaryTokens.length === 0) return false;
  const text = storeLine?.toString().toLowerCase() || "";
  return countTokenMatchesOnLine(text, primaryTokens) === primaryTokens.length;
}

function scoreMatchedStores(
  stores: string[],
  primaryTokens: string[],
  secondaryTokens: string[],
): number {
  let best = 0;
  for (const store of stores) {
    const text = store?.toString().toLowerCase() || "";
    let s = countTokenMatchesOnLine(text, primaryTokens);
    s += countTokenMatchesOnLine(text, secondaryTokens);
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
  const addressText = normalizeUserAddressInput(userAddress);
  const { primaryTokens, secondaryTokens } =
    splitPrimarySecondaryTokens(addressText);
  if (primaryTokens.length === 0) return [];

  const withStores = list.map((m: any) => {
    const raw = Array.isArray(m?.stores) ? m.stores : [];
    const matchedStores = raw.filter((s: string) =>
      storeMatchesAddressTokens(
        s?.toString() ?? "",
        primaryTokens,
        secondaryTokens,
      ),
    );
    const __score = scoreMatchedStores(
      matchedStores,
      primaryTokens,
      secondaryTokens,
    );
    return { ...m, stores: matchedStores, __score };
  });

  return withStores
    .filter((m: any) => m.stores.length > 0 && m.__score > 0)
    .sort((a: any, b: any) => b.__score - a.__score)
    .map(({ __score, ...rest }: any) => rest);
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
  const addressText = normalizeUserAddressInput(userAddress);
  const { primaryTokens } = splitPrimarySecondaryTokens(addressText);

  if (primaryTokens.length === 0) {
    return { merchants: [], emptyKind: "needs_address" };
  }

  if (merchants.length === 0) {
    return { merchants: [], emptyKind: "empty_catalog" };
  }

  const addressFiltered = filterMerchantsByUserAddress(merchants, addressText);
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
