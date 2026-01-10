// ========================================
// FILE: app/[country]/page.tsx
// Multi-country support: USA, UK, and Australia
// ========================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CountryPageClient from './CountryPageClient';

const SUPPORTED_COUNTRIES = ['usa', 'uk', 'australia'];

const COUNTRY_META: Record<string, { title: string; description: string }> = {
  'usa': {
    title: 'Find Public Showers in USA | ShowerMap',
    description: 'Select a state to find public shower facilities across the United States.'
  },
  'uk': {
    title: 'Find Public Showers in UK | ShowerMap',
    description: 'Select a region to find public shower facilities across the United Kingdom.'
  },
  'australia': {
    title: 'Find Public Showers in Australia | ShowerMap',
    description: 'Select a state or territory to find public shower facilities across Australia.'
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const resolvedParams = await params;

  if (!SUPPORTED_COUNTRIES.includes(resolvedParams.country)) {
    return {
      title: 'Country Not Found | ShowerMap',
      description: 'The requested country could not be found.',
    };
  }

  const meta = COUNTRY_META[resolvedParams.country];

  return {
    title: meta.title,
    description: meta.description,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  return SUPPORTED_COUNTRIES.map(country => ({ country }));
}

export default async function CountryPage({
  params
}: {
  params: Promise<{ country: string }>
}) {
  const resolvedParams = await params;

  if (!SUPPORTED_COUNTRIES.includes(resolvedParams.country)) {
    notFound();
  }

  return <CountryPageClient country={resolvedParams.country} />;
}
