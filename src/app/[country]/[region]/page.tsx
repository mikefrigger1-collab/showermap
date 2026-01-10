// ========================================
// FILE: app/[country]/[region]/page.tsx
// Multi-country support: USA, UK, and Australia
// ========================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RegionPageClient from './RegionPageClient';
import {
  isSupportedCountry,
  isValidRegionForCountry,
  getRegionInfoByCountry,
  getCountryDisplayName
} from '../../lib/dataLoader';

// US states list
const US_STATES = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california',
  'colorado', 'connecticut', 'delaware', 'district-of-columbia', 'florida',
  'georgia', 'hawaii', 'idaho', 'illinois', 'indiana',
  'iowa', 'kansas', 'kentucky', 'louisiana', 'maine',
  'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi',
  'missouri', 'montana', 'nebraska', 'nevada', 'new-hampshire',
  'new-jersey', 'new-mexico', 'new-york', 'north-carolina', 'north-dakota',
  'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode-island',
  'south-carolina', 'south-dakota', 'tennessee', 'texas', 'utah',
  'vermont', 'virginia', 'washington', 'west-virginia', 'wisconsin',
  'wyoming'
];

// UK regions list
const UK_REGIONS = [
  'london', 'south-east', 'south-west', 'east-of-england',
  'east-midlands', 'west-midlands', 'yorkshire', 'north-west',
  'north-east', 'scotland', 'wales', 'northern-ireland'
];

// Australia states/territories list
const AUSTRALIA_STATES = [
  'new-south-wales', 'victoria', 'queensland', 'western-australia',
  'south-australia', 'tasmania', 'northern-territory', 'australian-capital-territory'
];

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string; region: string }>
}): Promise<Metadata> {
  const resolvedParams = await params;

  if (!isSupportedCountry(resolvedParams.country)) {
    return {
      title: 'Region Not Found | ShowerMap',
      description: 'The requested region could not be found.',
    };
  }

  const regionInfo = getRegionInfoByCountry(resolvedParams.country, resolvedParams.region);
  if (!regionInfo) {
    return {
      title: 'Region Not Found | ShowerMap',
      description: 'The requested region could not be found.',
    };
  }

  const countryName = getCountryDisplayName(resolvedParams.country);
  const title = `Public & Free Showers in ${regionInfo.name} | Find Showers Near Me | ShowerMap`;

  // Country-specific keywords
  const baseKeywords = [
    `public showers ${regionInfo.name.toLowerCase()}`,
    `showers near me ${regionInfo.name.toLowerCase()}`,
    `shower near me ${regionInfo.name.toLowerCase()}`,
    `free showers ${regionInfo.name.toLowerCase()}`,
    `${regionInfo.name.toLowerCase()} shower facilities`
  ];

  const countryKeywords: Record<string, string[]> = {
    uk: ['leisure centre showers', 'gym showers'],
    usa: ['van life showers', 'truck stop showers'],
    australia: ['caravan park showers', 'beach showers', 'aquatic centre showers']
  };

  const keywords = [
    ...baseKeywords,
    ...(countryKeywords[resolvedParams.country] || countryKeywords.usa).map(
      k => `${k} ${regionInfo.name.toLowerCase()}`
    )
  ];

  const description = `Find ${regionInfo.stats.totalLocations}+ public showers in ${regionInfo.name}, ${countryName}. Free and paid shower facilities with verified hours, costs, and amenities. Perfect for travelers and anyone needing hygiene access.`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://www.showermap.com/${resolvedParams.country}/${resolvedParams.region}/`,
    }
  };
}

export async function generateStaticParams() {
  // Generate params for USA states
  const usaParams = US_STATES.map((region) => ({
    country: 'usa',
    region: region,
  }));

  // Generate params for UK regions
  const ukParams = UK_REGIONS.map((region) => ({
    country: 'uk',
    region: region,
  }));

  // Generate params for Australia states
  const australiaParams = AUSTRALIA_STATES.map((region) => ({
    country: 'australia',
    region: region,
  }));

  return [...usaParams, ...ukParams, ...australiaParams];
}

export default async function RegionPage({
  params
}: {
  params: Promise<{ country: string; region: string }>
}) {
  const resolvedParams = await params;

  if (!isSupportedCountry(resolvedParams.country)) {
    notFound();
  }

  // Validate region exists for the country
  if (!isValidRegionForCountry(resolvedParams.country, resolvedParams.region)) {
    notFound();
  }

  const regionInfo = getRegionInfoByCountry(resolvedParams.country, resolvedParams.region);
  if (!regionInfo) {
    notFound();
  }

  return <RegionPageClient regionInfo={regionInfo} params={resolvedParams} />;
}