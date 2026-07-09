// src/app/components/GuideCTA.tsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Caravan, ArrowRight } from 'lucide-react';
import { trackGuideCtaImpression, trackGuideCtaClick } from '../lib/analytics';

const GUIDE_SLUG = 'how-van-lifers-shower';
const GUIDE_HREF = `/blog/${GUIDE_SLUG}/`;

type Variant = 'banner' | 'inline' | 'card' | 'subtle';

interface GuideCTAProps {
  placement: string; // analytics id, e.g. 'map_results_header'
  country?: string;
  region?: string;
  variant?: Variant;
  headline?: string;
  sub?: string;
  cta?: string;
}

export default function GuideCTA({
  placement,
  country,
  region,
  variant = 'banner',
  headline = 'New to van life? Here’s how to shower on the road',
  sub = 'Gym memberships, truck stops, portable showers — the full playbook.',
  cta = 'Read the guide',
}: GuideCTAProps) {
  const seen = useRef(false);

  useEffect(() => {
    if (seen.current) return;
    seen.current = true;
    trackGuideCtaImpression(GUIDE_SLUG, placement, { country, region });
  }, [placement, country, region]);

  const onClick = () => trackGuideCtaClick(GUIDE_SLUG, placement, { country, region });

  if (variant === 'subtle') {
    return (
      <Link
        href={GUIDE_HREF}
        onClick={onClick}
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        {cta} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="my-6 flex items-start gap-3 rounded-lg border border-primary-200 bg-primary-50 p-4">
        <Caravan className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
        <div>
          <p className="font-semibold text-warm-900">{headline}</p>
          <p className="mb-2 text-sm text-warm-600">{sub}</p>
          <Link
            href={GUIDE_HREF}
            onClick={onClick}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            {cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <Link
        href={GUIDE_HREF}
        onClick={onClick}
        className="group block rounded-2xl border border-warm-200 bg-white p-6 shadow-card hover-lift"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 transition-transform duration-200 group-hover:scale-110">
          <Caravan className="h-6 w-6 text-primary-600" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-warm-900">{headline}</h3>
        <p className="mb-3 text-warm-600">{sub}</p>
        <span className="inline-flex items-center gap-1 font-medium text-primary-600 transition-transform group-hover:translate-x-1">
          {cta} <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    );
  }

  // banner (default)
  return (
    <div className="flex flex-col justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        <Caravan className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
        <div>
          <p className="font-semibold text-gray-900">{headline}</p>
          <p className="text-sm text-gray-600">{sub}</p>
        </div>
      </div>
      <Link
        href={GUIDE_HREF}
        onClick={onClick}
        className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
