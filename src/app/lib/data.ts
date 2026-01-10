import { ShowerData, ShowerLocation } from '@/app/types/shower';

export async function loadShowerData(): Promise<ShowerData> {
  const response = await fetch('/data/showers.json');
  if (!response.ok) {
    throw new Error('Failed to load shower data');
  }
  return response.json();
}

export function getLocationsByCountry(data: ShowerData, country: string): ShowerLocation[] {
  return data.locations.filter(location => 
    location.country.toLowerCase() === country.toLowerCase()
  );
}

export function getLocationsByCity(data: ShowerData, city: string, region?: string): ShowerLocation[] {
  return data.locations.filter(location => {
    const matchesCity = location.city.toLowerCase() === city.toLowerCase();
    const matchesRegion = region ? location.province.toLowerCase() === region.toLowerCase() : true;
    return matchesCity && matchesRegion;
  });
}

export function getLocationBySlug(data: ShowerData, slug: string): ShowerLocation | undefined {
  return data.locations.find(location => location.slug === slug);
}

// Generate slug from location data
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .trim();
}

// URL utilities for consistent trailing slash handling
export function ensureTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

export function generateLocationUrl(location: ShowerLocation): string {
  const country = location.country.toLowerCase().replace(/\s+/g, '-');
  const region = location.province.toLowerCase().replace(/\s+/g, '-');
  const city = location.city.toLowerCase().replace(/\s+/g, '-');
  
  return ensureTrailingSlash(`/${country}/${region}/${city}/${location.slug}`);
}

export function generateCityUrl(city: string, region: string, country: string): string {
  const countrySlug = country.toLowerCase().replace(/\s+/g, '-');
  const regionSlug = region.toLowerCase().replace(/\s+/g, '-');
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  
  return ensureTrailingSlash(`/${countrySlug}/${regionSlug}/${citySlug}`);
}