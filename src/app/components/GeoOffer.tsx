// src/app/components/GeoOffer.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCountry } from '../lib/useCountry';
import { countryToBucket, OfferBucket } from '../lib/geo';
import { trackEvent } from '../lib/analytics';

export interface GeoOfferProps {
  /** Provide a ReactNode per bucket. `default` is required (the safe fallback). */
  offers: {
    us?: React.ReactNode;
    uk?: React.ReactNode;
    au?: React.ReactNode;
    default: React.ReactNode;
  };
  /**
   * Reserve a minimum height so the SSR-default → localized swap doesn't shift
   * surrounding content. Match it to your tallest offer block.
   */
  minHeight?: number | string;
  className?: string;
}

/**
 * Renders the global `default` offer during SSR / first paint (so the statically
 * cached HTML is identical for everyone — cache-safe), then swaps to the
 * country-specific offer after useCountry() resolves on the client.
 * Fires GA4 `geo_offer_shown` once per (bucket, page).
 */
export default function GeoOffer({ offers, minHeight = 320, className }: GeoOfferProps) {
  const { country, resolved } = useCountry();
  const pathname = usePathname();
  const trackedFor = useRef<string | null>(null);

  // Until resolved, always show the default (matches server render → no hydration mismatch).
  const bucket: OfferBucket = resolved ? countryToBucket(country) : 'default';
  const node = offers[bucket] ?? offers.default;

  useEffect(() => {
    if (!resolved) return;
    const key = `${bucket}|${pathname}`;
    if (trackedFor.current === key) return; // fire once per (bucket,page)
    trackedFor.current = key;
    trackEvent('geo_offer_shown', {
      country: country ?? 'default',
      bucket,
      page: pathname || '',
    });
  }, [resolved, bucket, country, pathname]);

  return (
    <div
      className={className}
      data-geo-bucket={bucket}
      style={{ minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }}
      aria-busy={!resolved}
    >
      {node}
    </div>
  );
}
