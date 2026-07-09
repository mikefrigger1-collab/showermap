// src/app/lib/geo.ts
// Geo-targeting primitives for country-specific affiliate offers.
// Pure, framework-agnostic, safe to import on server or client.

/** Countries we tailor offers for. `null` = unknown → use global default. */
export type Country = 'US' | 'UK' | 'AU' | null;

/** Buckets we actually render. `default` covers everyone else / unknown. */
export type OfferBucket = 'us' | 'uk' | 'au' | 'default';

const STORAGE_KEY = 'sm_country'; // value: "US" | "UK" | "AU" | "XX" (xx = resolved-but-other)
const STORAGE_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

/** Map an ISO-3166 alpha-2 code from any source to our Country union. */
export function normalizeCountry(code: string | null | undefined): Country {
  if (!code) return null;
  const c = code.trim().toUpperCase();
  if (c === 'US') return 'US';
  if (c === 'GB' || c === 'UK') return 'UK'; // ipapi/Cloudflare use GB
  if (c === 'AU') return 'AU';
  return null; // any other real country → global default
}

/** Convert a resolved Country into the bucket the <GeoOffer> renders. */
export function countryToBucket(country: Country): OfferBucket {
  switch (country) {
    case 'US': return 'us';
    case 'UK': return 'uk';
    case 'AU': return 'au';
    default:   return 'default';
  }
}

/**
 * No-network fallback: guess country from the browser's IANA timezone.
 * Deliberately conservative — only returns a value for high-confidence zones,
 * otherwise null so we fall through to the global default.
 */
export function countryFromTimezone(): Country {
  if (typeof Intl === 'undefined') return null;
  let tz = '';
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  } catch {
    return null;
  }
  if (!tz) return null;

  // UK
  if (tz === 'Europe/London') return 'UK';
  // Australia
  if (tz.startsWith('Australia/')) return 'AU';
  // United States (covers contiguous + AK/HI common zones)
  if (
    tz.startsWith('America/') &&
    /New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Indiana|Kentucky|Boise|Juneau/.test(tz)
  ) {
    return 'US';
  }
  if (tz === 'Pacific/Honolulu') return 'US';
  return null;
}

// --- localStorage cache (no PII: just a country code + timestamp) -----------

type CachedGeo = { code: string; t: number };

export function readCachedCountry(): Country {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedGeo;
    if (!parsed || typeof parsed.t !== 'number') return null;
    if (Date.now() - parsed.t > STORAGE_TTL_MS) return null;
    // "XX" means "we resolved a real country that isn't US/UK/AU" → keep as default, no re-fetch.
    return normalizeCountry(parsed.code);
  } catch {
    return null;
  }
}

/** Persist a resolved country. Pass the raw code; we store "XX" for non-target. */
export function writeCachedCountry(country: Country, resolvedRealCountry: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    const code = country ?? (resolvedRealCountry ? 'XX' : '');
    if (!code) return; // don't cache "we genuinely have no idea"
    const payload: CachedGeo = { code, t: Date.now() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* private mode / quota — ignore */
  }
}

/** True if we previously resolved *any* real country (incl. the "XX" other marker). */
export function hasCachedCountryMarker(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

/** Read a country hint cookie set by the OPTIONAL edge middleware (see middleware.ts). */
export function readCountryCookie(): Country {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(/(?:^|;\s*)sm_country=([^;]+)/);
  return m ? normalizeCountry(decodeURIComponent(m[1])) : null;
}
