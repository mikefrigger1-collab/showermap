// src/app/blog/components/OfferList.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { OFFERS_BY_BUCKET, FRAMING } from '../../lib/offers';
import type { OfferBucket } from '../../lib/geo';
import { trackAffiliateClick } from '../../lib/analytics';

/**
 * Renders the affiliate programs valid for a given country bucket as a grid of
 * tracked cards. Used inside <GeoOffer> so each visitor sees only the offers
 * that are legal/available in their country.
 */
export default function OfferList({ bucket }: { bucket: OfferBucket }) {
  const pathname = usePathname();
  const programs = OFFERS_BY_BUCKET[bucket];

  return (
    <div className="not-prose my-10 border-t-2 border-warm-900 pt-5">
      <p className="font-display mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 before:h-[3px] before:w-5 before:bg-primary-500 before:content-['']">
        {FRAMING[bucket]}
      </p>
      <div className="grid gap-px overflow-hidden border border-warm-200 bg-warm-200 sm:grid-cols-2">
        {programs.map((p) => (
          <a
            key={p.id}
            href={p.href}
            target="_blank"
            rel="sponsored nofollow noopener"
            onClick={() =>
              trackAffiliateClick({
                program: p.id,
                merchant: p.merchant,
                page: pathname || '',
                placement: 'offer_grid',
                geo: bucket,
              })
            }
            className="group flex flex-col bg-white p-5 transition-colors duration-200 hover:bg-warm-50"
          >
            <span className="font-display flex items-center justify-between text-lg font-semibold uppercase tracking-tight text-warm-900">
              {p.name}
              <ExternalLink className="h-4 w-4 text-warm-400 group-hover:text-primary-500" />
            </span>
            <span className="mt-1.5 flex-1 text-sm leading-relaxed text-warm-600">{p.blurb}</span>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition-transform group-hover:translate-x-0.5">
              {p.cta} →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
