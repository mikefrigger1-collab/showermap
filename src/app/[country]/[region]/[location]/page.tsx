// ========================================
// FILE: app/[country]/[region]/[location]/page.tsx
// Multi-country support: USA, UK, and Australia
// ========================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocationPageClient from './LocationPageClient';
import {
  getLocationBySlugAndCountry,
  isSupportedCountry,
  isValidRegionForCountry
} from '../../../lib/dataLoader';
import { ContentWriter } from '../../../lib/contentWriter';

// Helper function to check if location has verified shower reviews
function hasVerifiedShowerReviews(location: any): boolean {
  if (!location || !location.showerReviews || location.showerReviews.length === 0) {
    return false;
  }
  
  return location.showerReviews.some((review: any) => {
    const reviewText = (review.reviewText || '').toLowerCase();
    const showerKeywords = [
      'shower', 'showers', 'locker room', 'changing room', 
      'hot water', 'water pressure', 'towel', 'clean', 
      'hygiene', 'wash', 'bathroom', 'facilities'
    ];
    return showerKeywords.some(keyword => reviewText.includes(keyword));
  });
}

// Transform location data for ContentWriter
function transformForContentWriter(location: any) {
  if (!location) return null;
  
  const hoursArray = Object.entries(location.hours || {}).map(([day, time]) => 
    `${day.charAt(0).toUpperCase() + day.slice(1)}: ${time}`
  );
  
  return {
    title: location.title || '',
    category: (location.categories && location.categories[0]) || 'Facility',
    city: location.city || '',
    state: location.state || location.province || '',
    country: location.country || 'USA',
    amenities: (location.amenities || []).join('|'),
    cost: location.cost || 'Contact for pricing',
    access: location.access || 'Contact for access',
    rating: (location.rating || 0).toString(),
    hours: hoursArray.join(', ') || 'Contact for hours',
    phone: location.phone || '',
    website: location.website || '',
    description: location.content || '',
    showerReviews: location.showerReviews || [],
    businessType: location.businessType || '',
    address: location.address
  };
}

// Generate static params for all locations across all countries
export async function generateStaticParams() {
  const {
    getAllStates,
    getStateLocations,
    getAllUKRegions,
    getUKRegionLocations,
    getAllAustraliaStates,
    getAustraliaStateLocations
  } = await import('../../../lib/dataLoader');

  const params: Array<{ country: string; region: string; location: string }> = [];

  // USA locations
  try {
    const usStates = getAllStates();
    for (const state of usStates) {
      const locations = getStateLocations(state.code);
      for (const loc of locations) {
        params.push({
          country: 'usa',
          region: state.slug,
          location: loc.slug
        });
      }
    }
  } catch (e) {
    console.error('Error generating USA params:', e);
  }

  // UK locations
  try {
    const ukRegions = getAllUKRegions();
    for (const region of ukRegions) {
      const locations = getUKRegionLocations(region.slug);
      for (const loc of locations) {
        params.push({
          country: 'uk',
          region: region.slug,
          location: loc.slug
        });
      }
    }
  } catch (e) {
    console.error('Error generating UK params:', e);
  }

  // Australia locations
  try {
    const ausStates = getAllAustraliaStates();
    for (const state of ausStates) {
      const locations = getAustraliaStateLocations(state.slug);
      for (const loc of locations) {
        params.push({
          country: 'australia',
          region: state.slug,
          location: loc.slug
        });
      }
    }
  } catch (e) {
    console.error('Error generating Australia params:', e);
  }

  return params;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string; region: string; location: string }>
}): Promise<Metadata> {
  // Await the params promise
  const resolvedParams = await params;

  // Validate country
  if (!isSupportedCountry(resolvedParams.country)) {
    return {
      title: 'Location Not Found | ShowerMap',
      description: 'The requested location could not be found.',
    };
  }

  // Validate region for the country
  if (!isValidRegionForCountry(resolvedParams.country, resolvedParams.region)) {
    return {
      title: 'Location Not Found | ShowerMap',
      description: 'The requested location could not be found.',
    };
  }

  // Get location using multi-country function
  const location = getLocationBySlugAndCountry(
    resolvedParams.country,
    resolvedParams.region,
    resolvedParams.location
  );
  if (!location) {
    return {
      title: 'Location Not Found | ShowerMap',
      description: 'The requested location could not be found.',
    };
  }
  
  const transformedData = transformForContentWriter(location);
  if (!transformedData) {
    return {
      title: 'Location Not Found | ShowerMap',
      description: 'The requested location could not be found.',
    };
  }
  
  const contentPackage = ContentWriter.writeContentPackage(transformedData);
  const isVerified = hasVerifiedShowerReviews(location);
  
  return {
    title: `${contentPackage.seoTitle}${isVerified ? ' ✓ Verified' : ''}`,
    description: `${contentPackage.metaDescription}${isVerified ? ' Verified shower facilities with user reviews.' : ''}`,
    keywords: [
      `${location.title} showers`,
      `public showers ${location.city}`,
      `shower facilities ${location.city} ${location.state}`,
      `shower near me ${location.city}`,
      ...(isVerified ? ['verified shower facility'] : [])
    ]
  };
}

export default async function LocationPage({
  params
}: {
  params: Promise<{ country: string; region: string; location: string }>
}) {
  // Await the params promise
  const resolvedParams = await params;

  // Validate country
  if (!isSupportedCountry(resolvedParams.country)) {
    notFound();
  }

  // Validate region for the country
  if (!isValidRegionForCountry(resolvedParams.country, resolvedParams.region)) {
    notFound();
  }

  // Get location using multi-country function
  const location = getLocationBySlugAndCountry(
    resolvedParams.country,
    resolvedParams.region,
    resolvedParams.location
  );
  if (!location) {
    notFound();
  }
  
  const transformedData = transformForContentWriter(location);
  if (!transformedData) {
    notFound();
  }
  
  const contentPackage = ContentWriter.writeContentPackage(transformedData);
  const isVerified = hasVerifiedShowerReviews(location);
  
  // Ensure location has all required fields with defaults
  const safeLocation = {
    id: location.id || '',
    slug: location.slug || '',
    title: location.title || '',
    street: location.street || '',
    city: location.city || '',
    province: location.province || location.state || '',
    state: location.state || location.province || '',
    zip: location.zip || '',
    country: location.country || 'USA',
    lat: location.lat || 0,
    lng: location.lng || 0,
    phone: location.phone || '',
    email: location.email || undefined,
    website: location.website || '',
    content: location.content || '',
    categories: location.categories || [],
    amenities: location.amenities || [],
    cost: location.cost || 'Contact for pricing',
    access: location.access || 'Contact for access',
    hours: location.hours || {},
    rating: location.rating || 0,
    reviewCount: location.reviewCount || 0,
    lastUpdated: location.lastUpdated || new Date().toISOString(),
    showerReviews: location.showerReviews || [],
    businessType: location.businessType || '',
    address: location.address
  };
  
  return (
    <LocationPageClient 
      location={safeLocation} 
      generatedContent={contentPackage}
      params={{
        country: resolvedParams.country,
        region: resolvedParams.region,
        location: resolvedParams.location
      }}
      isVerified={isVerified}
    />
  );
}