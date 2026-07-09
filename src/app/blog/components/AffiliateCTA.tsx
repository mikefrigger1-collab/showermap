// src/app/blog/components/AffiliateCTA.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { trackAffiliateClick } from '../../lib/analytics';

export interface AffiliateCTAProps {
  /** Affiliate program identifier, e.g. 'classpass'. Sent to GA4. */
  program: string;
  /** Merchant id, e.g. 'amazon'. */
  merchant?: string;
  href: string;
  /** Geo bucket this CTA targets ('us' | 'uk' | 'au' | 'default'). */
  geo?: string;
  /** Analytics placement id, e.g. 'inline' | 'offer_grid'. */
  placement?: string;
  heading: string;
  body?: string;
  cta: string;
}

export default function AffiliateCTA({
  program,
  merchant,
  href,
  geo = 'default',
  placement = 'inline',
  heading,
  body,
  cta,
}: AffiliateCTAProps) {
  const pathname = usePathname();

  const handleClick = () => {
    trackAffiliateClick({ program, merchant, page: pathname || '', placement, geo });
  };

  return (
    <div className="not-prose my-10 border-l-4 border-primary-500 bg-warm-50 p-6">
      <h3 className="font-display text-xl font-semibold uppercase leading-tight tracking-tight text-warm-900">
        {heading}
      </h3>
      {body ? <p className="mt-2 text-[0.95rem] leading-relaxed text-warm-600">{body}</p> : null}
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener"
        onClick={handleClick}
        className="font-display mt-5 inline-flex items-center gap-2 bg-primary-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors duration-200 hover:bg-primary-600"
      >
        {cta}
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}
