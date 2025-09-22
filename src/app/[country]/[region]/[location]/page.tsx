// ========================================
// FILE: app/[country]/[region]/[location]/page.tsx
// ========================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocationPageClient from './LocationPageClient';
import { getLocationBySlug, getStateCodeFromSlug } from '../../../lib/dataLoader';
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

export async function generateMetadata({ 
  params 
}: { 
  params: { country: string; region: string; location: string } 
}): Promise<Metadata> {
  if (params.country !== 'usa') {
    return {
      title: 'Location Not Found | ShowerMap',
      description: 'The requested location could not be found.',
    };
  }
  
  const stateCode = getStateCodeFromSlug(params.region);
  if (!stateCode) {
    return {
      title: 'Location Not Found | ShowerMap',
      description: 'The requested location could not be found.',
    };
  }
  
  const location = getLocationBySlug(stateCode, params.location);
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

export default function LocationPage({ 
  params 
}: { 
  params: { country: string; region: string; location: string } 
}) {
  if (params.country !== 'usa') {
    notFound();
  }
  
  const stateCode = getStateCodeFromSlug(params.region);
  if (!stateCode) {
    notFound();
  }
  
  const location = getLocationBySlug(stateCode, params.location);
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
        country: params.country,
        region: params.region,
        location: params.location
      }}
      isVerified={isVerified}
    />
  );
}