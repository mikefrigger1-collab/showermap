// src/app/lib/useCountry.ts
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Country,
  normalizeCountry,
  countryFromTimezone,
  readCachedCountry,
  writeCachedCountry,
  hasCachedCountryMarker,
  readCountryCookie,
} from './geo';

export interface UseCountryResult {
  country: Country;   // 'US' | 'UK' | 'AU' | null (null = unknown/default)
  resolved: boolean;  // false until detection finishes (false on SSR/first paint)
  source: 'cookie' | 'cache' | 'api' | 'timezone' | 'default' | null;
}

// Free, no-key geo-IP endpoint. Rate limit ~1,000 req/day per IP (ipapi.co).
// HTTPS, CORS-enabled, returns { country_code: "US", ... }.
// If it fails/throttles (429) we silently fall back to timezone → default.
const GEO_ENDPOINT = 'https://ipapi.co/json/';
const FETCH_TIMEOUT_MS = 2500;

/**
 * Resolve the visitor's country on the client, cache-safe and non-blocking.
 * Priority: edge cookie hint → localStorage cache → geo-IP API → timezone → default.
 * Always returns immediately with { resolved:false } on first render so the
 * caller can show a country-agnostic default (keeps static HTML identical for all).
 */
export function useCountry(): UseCountryResult {
  const [state, setState] = useState<UseCountryResult>({
    country: null,
    resolved: false,
    source: null,
  });
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    // (a) Edge hint cookie — instant, set only if middleware.ts is deployed.
    const cookieC = readCountryCookie();
    if (cookieC) {
      setState({ country: cookieC, resolved: true, source: 'cookie' });
      writeCachedCountry(cookieC, true);
      return;
    }

    // (b) localStorage cache — instant, avoids re-hitting the API.
    if (hasCachedCountryMarker()) {
      // readCachedCountry() may be null while still being a deliberate "resolved-as-other" marker.
      setState({ country: readCachedCountry(), resolved: true, source: 'cache' });
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    // (c) Free geo-IP lookup with timeout.
    fetch(GEO_ENDPOINT, { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { country_code?: string; country?: string }) => {
        if (cancelled) return;
        const raw = data.country_code || data.country || '';
        const c = normalizeCountry(raw);
        // We DID resolve a real country (even if it maps to default) → cache it.
        writeCachedCountry(c, raw.length > 0);
        setState({ country: c, resolved: true, source: 'api' });
      })
      .catch(() => {
        if (cancelled) return;
        // (d) Timezone fallback — no network.
        const tz = countryFromTimezone();
        if (tz) writeCachedCountry(tz, true);
        // (e) else default; don't cache a non-answer so we can retry later.
        setState({ country: tz, resolved: true, source: tz ? 'timezone' : 'default' });
      })
      .finally(() => clearTimeout(timer));

    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return state;
}
