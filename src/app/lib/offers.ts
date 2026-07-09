// src/app/lib/offers.ts
// Central catalog of affiliate programs + which countries each is valid in.
// Content authors compose offer sets here; blog posts just reference them.
//
// IMPORTANT (compliance): the RV programs (Harvest Hosts, RV LIFE Pro, The Dyrt)
// are US / North-America only, so they MUST NOT appear in UK/AU/default buckets.
// ClassPass, Hostelworld and gear are global and safe everywhere.
//
// Swap the placeholder hrefs for your real affiliate links once the programs
// are approved (FlexOffers for ClassPass, Refersion for RinseKit, direct for
// Harvest Hosts / RV LIFE, Amazon Associates tag for gear, etc.).

import type { OfferBucket } from './geo';

export interface AffiliateProgram {
  id: string;
  name: string;
  /** Your tracking/affiliate URL. Replace the {{PLACEHOLDER}} before launch. */
  href: string;
  /** Merchant id reported to GA4 on click. */
  merchant: string;
  blurb: string;
  cta: string;
  /** Buckets this program is allowed to appear in. */
  markets: OfferBucket[];
}

// --- Program catalog --------------------------------------------------------
export const PROGRAMS = {
  harvestHosts: {
    id: 'harvest-hosts',
    name: 'Harvest Hosts',
    href: '{{AFFILIATE_HARVEST_HOSTS}}',
    merchant: 'harvest-hosts',
    blurb: 'Overnight RV stays at wineries, farms & breweries, many with showers.',
    cta: 'See Harvest Hosts',
    markets: ['us'],
  },
  rvLifePro: {
    id: 'rv-life-pro',
    name: 'RV LIFE Pro',
    href: '{{AFFILIATE_RV_LIFE}}',
    merchant: 'rv-life',
    blurb: 'RV-safe GPS routing + campground reviews that flag shower quality.',
    cta: 'Try RV LIFE Pro',
    markets: ['us'],
  },
  theDyrt: {
    id: 'the-dyrt',
    name: 'The Dyrt PRO',
    href: '{{AFFILIATE_THE_DYRT}}',
    merchant: 'the-dyrt',
    blurb: 'Find campgrounds with showers + offline maps for the US.',
    cta: 'Get The Dyrt PRO',
    markets: ['us'],
  },
  classpass: {
    id: 'classpass',
    name: 'ClassPass',
    href: '{{AFFILIATE_CLASSPASS}}',
    merchant: 'classpass',
    blurb: 'Gym & studio day passes, hot showers at thousands of venues worldwide.',
    cta: 'Try ClassPass',
    markets: ['us', 'uk', 'au', 'default'],
  },
  hostelworld: {
    id: 'hostelworld',
    name: 'Hostelworld',
    href: '{{AFFILIATE_HOSTELWORLD}}',
    merchant: 'hostelworld',
    blurb: 'Book hostels worldwide, filter for showers, lockers & laundry.',
    cta: 'Browse hostels',
    markets: ['us', 'uk', 'au', 'default'],
  },
  rinsekit: {
    id: 'rinsekit',
    name: 'RinseKit',
    href: '{{AFFILIATE_RINSEKIT}}',
    merchant: 'rinsekit',
    blurb: 'Battery-pressurised portable shower, a real spray with no pumping.',
    cta: 'Shop RinseKit',
    markets: ['us', 'uk', 'au', 'default'],
  },
  // Amazon Associates is region-specific: each locale needs its own account +
  // tracking tag, so the "gear" offer is split per store. Each lands on a curated
  // search so it stays valid even as individual products go in/out of stock.
  gearUs: {
    id: 'portable-shower-gear-us',
    name: 'Portable Shower Gear',
    // Amazon US (amazon.com, tag: showermap-20). Also used for the default bucket.
    href: 'https://www.amazon.com/s?k=portable+camping+shower&tag=showermap-20',
    merchant: 'amazon',
    blurb: 'Solar shower bags, pumps, privacy tents & quick-dry towels.',
    cta: 'See the gear',
    markets: ['us', 'default'],
  },
  gearUk: {
    id: 'portable-shower-gear-uk',
    name: 'Portable Shower Gear',
    // Amazon UK (amazon.co.uk, tag: showermap-21).
    href: 'https://www.amazon.co.uk/s?k=portable+camping+shower&tag=showermap-21',
    merchant: 'amazon',
    blurb: 'Solar shower bags, pumps, privacy tents & quick-dry towels.',
    cta: 'See the gear',
    markets: ['uk'],
  },
  gearAu: {
    id: 'portable-shower-gear-au',
    name: 'Portable Shower Gear',
    // Amazon AU (amazon.com.au, tag: showermap-22).
    href: 'https://www.amazon.com.au/s?k=portable+camping+shower&tag=showermap-22',
    merchant: 'amazon',
    blurb: 'Solar shower bags, pumps, privacy tents & quick-dry towels.',
    cta: 'See the gear',
    markets: ['au'],
  },
} satisfies Record<string, AffiliateProgram>;

// --- Bucket → ordered list of programs --------------------------------------
// Authoritative mapping. Each list is pre-filtered to its market by design,
// but assertMarkets() below guards against mistakes at build/runtime.
export const OFFERS_BY_BUCKET: Record<OfferBucket, AffiliateProgram[]> = {
  us: [PROGRAMS.harvestHosts, PROGRAMS.rvLifePro, PROGRAMS.theDyrt, PROGRAMS.classpass, PROGRAMS.rinsekit, PROGRAMS.gearUs],
  uk: [PROGRAMS.classpass, PROGRAMS.hostelworld, PROGRAMS.rinsekit, PROGRAMS.gearUk],
  au: [PROGRAMS.classpass, PROGRAMS.hostelworld, PROGRAMS.rinsekit, PROGRAMS.gearAu],
  default: [PROGRAMS.classpass, PROGRAMS.hostelworld, PROGRAMS.gearUs],
};

/** Optional framing copy per bucket (e.g. UK "leisure centres", AU "aquatic centres"). */
export const FRAMING: Record<OfferBucket, string> = {
  us: 'On-the-road shower kit for the US: RV stays, gym passes & portable gear.',
  uk: 'Leisure centres, gym passes & hostels across the UK.',
  au: 'Aquatic & leisure centres, gym passes & hostels across Australia.',
  default: 'Shower solutions for travellers, wherever you are.',
};

/** Dev-time guard: ensure no program leaks into a market it isn't valid for. */
export function assertMarkets(): void {
  for (const [bucket, list] of Object.entries(OFFERS_BY_BUCKET) as [OfferBucket, AffiliateProgram[]][]) {
    for (const p of list) {
      if (!p.markets.includes(bucket)) {
        throw new Error(`Offer "${p.id}" is not valid in market "${bucket}"`);
      }
    }
  }
}
if (process.env.NODE_ENV !== 'production') assertMarkets();
