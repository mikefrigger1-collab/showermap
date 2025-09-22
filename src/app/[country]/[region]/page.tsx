// ========================================
// FILE: app/[country]/[region]/page.tsx
// ========================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RegionPageClient from './RegionPageClient';
import { getRegionInfo, getStateCodeFromSlug } from '../../lib/dataLoader';

// Fix: Make generateMetadata async and await params
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ country: string; region: string }> 
}): Promise<Metadata> {
  // Await params to resolve the promise
  const resolvedParams = await params;
  
  // For now, we only support USA
  if (resolvedParams.country !== 'usa') {
    return {
      title: 'Region Not Found | ShowerMap',
      description: 'The requested region could not be found.',
    };
  }
  
  const stateCode = getStateCodeFromSlug(resolvedParams.region);
  if (!stateCode) {
    return {
      title: 'Region Not Found | ShowerMap',
      description: 'The requested region could not be found.',
    };
  }
  
  const regionInfo = getRegionInfo(stateCode, resolvedParams.region);
  if (!regionInfo) {
    return {
      title: 'Region Not Found | ShowerMap',
      description: 'The requested region could not be found.',
    };
  }
  
  const title = `Public & Free Showers in ${regionInfo.name} | Find Showers Near Me | ShowerMap`;
  const description = `Find ${regionInfo.stats.totalLocations}+ public showers in ${regionInfo.name}. Free and paid shower facilities with verified hours, costs, and amenities. Perfect for travelers, van lifers, and anyone needing hygiene access.`;
  
  return {
    title,
    description,
    keywords: [
      `public showers ${regionInfo.name.toLowerCase()}`,
      `showers near me ${regionInfo.name.toLowerCase()}`,
      `shower near me ${regionInfo.name.toLowerCase()}`,
      `free showers ${regionInfo.name.toLowerCase()}`,
      `${regionInfo.name.toLowerCase()} shower facilities`,
      `van life showers ${regionInfo.name.toLowerCase()}`,
      `truck stop showers ${regionInfo.name.toLowerCase()}`
    ],
    openGraph: {
      title,
      description,
      url: `https://www.showermap.com/${resolvedParams.country}/${resolvedParams.region}/`,
    }
  };
}

// Fix: Make the page component async and await params
export default async function RegionPage({ 
  params 
}: { 
  params: Promise<{ country: string; region: string }> 
}) {
  // Await params to resolve the promise
  const resolvedParams = await params;
  
  if (resolvedParams.country !== 'usa') {
    notFound();
  }
  
  const stateCode = getStateCodeFromSlug(resolvedParams.region);
  if (!stateCode) {
    notFound();
  }
  
  const regionInfo = getRegionInfo(stateCode, resolvedParams.region);
  if (!regionInfo) {
    notFound();
  }
  
  return <RegionPageClient regionInfo={regionInfo} params={resolvedParams} />;
}