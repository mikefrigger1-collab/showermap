// ========================================
// FILE: app/lib/dataLoader.ts
// ========================================

import fs from 'fs';
import path from 'path';

export interface ShowerLocation {
  id: string;
  slug: string;
  title: string;
  street: string;
  address: string;
  city: string;
  province: string;
  state: string;
  zip: string;
  country: string;
  lat: number;
  lng: number;
  phone: string;
  email?: string;
  website: string;
  content: string;
  categories: string[];
  amenities: string[];
  cost: string;
  access: string;
  hours: Record<string, string>;
  rating: number;
  reviewCount: number;
  lastUpdated: string;
  showerReviews?: Array<{
    reviewerName: string;
    rating: string;
    reviewDate: string;
    reviewText: string;
    showerKeywords: string[];
  }>;
  showerReviewCount: number;
  businessType: string;
}

export interface StateData {
  state: string;
  stateName: string;
  locations: any[];
}

export interface RegionInfo {
  slug: string;
  name: string;
  country: string;
  countryName: string;
  stats: {
    totalLocations: number;
    freeLocations: number;
    cities: string[];
    verifiedCount?: number; // Add this field
  };
  featuredLocations: ShowerLocation[];
}

// Map state codes to URL-friendly slugs
const stateSlugMap: Record<string, string> = {
  'AL': 'alabama',
  'AK': 'alaska', 
  'AZ': 'arizona',
  'AR': 'arkansas',
  'CA': 'california',
  'CO': 'colorado',
  'CT': 'connecticut',
  'DE': 'delaware',
  'DC': 'district-of-columbia',
  'FL': 'florida',
  'GA': 'georgia',
  'HI': 'hawaii',
  'ID': 'idaho',
  'IL': 'illinois',
  'IN': 'indiana',
  'IA': 'iowa',
  'KS': 'kansas',
  'KY': 'kentucky',
  'LA': 'louisiana',
  'ME': 'maine',
  'MD': 'maryland',
  'MA': 'massachusetts',
  'MI': 'michigan',
  'MN': 'minnesota',
  'MS': 'mississippi',
  'MO': 'missouri',
  'MT': 'montana',
  'NE': 'nebraska',
  'NV': 'nevada',
  'NH': 'new-hampshire',
  'NJ': 'new-jersey',
  'NM': 'new-mexico',
  'NY': 'new-york',
  'NC': 'north-carolina',
  'ND': 'north-dakota',
  'OH': 'ohio',
  'OK': 'oklahoma',
  'OR': 'oregon',
  'PA': 'pennsylvania',
  'RI': 'rhode-island',
  'SC': 'south-carolina',
  'SD': 'south-dakota',
  'TN': 'tennessee',
  'TX': 'texas',
  'UT': 'utah',
  'VT': 'vermont',
  'VA': 'virginia',
  'WA': 'washington',
  'WV': 'west-virginia',
  'WI': 'wisconsin',
  'WY': 'wyoming'
};

// Load state/region data from JSON files
export function loadStateData(stateCode: string): StateData | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'states', `${stateCode}.json`);
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error loading data for state ${stateCode}:`, error);
    return null;
  }
}

// Parse hours string into structured format
function parseHoursString(hoursString: string): Record<string, string> {
  if (!hoursString || hoursString === '') return {};
  
  // Remove "Closed ⋅ Opens" prefix and "Suggest new hours" suffix
  let cleanedHours = hoursString
    .replace(/^Closed ⋅ Opens \d+ [ap]m \w+/, '')
    .replace(/Suggest new hours$/, '')
    .trim();
  
  // Days of the week to look for
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hoursObj: Record<string, string> = {};
  
  // Split by days and extract hours
  days.forEach(day => {
    const dayIndex = cleanedHours.indexOf(day);
    if (dayIndex !== -1) {
      // Find the next day's index to know where this day's info ends
      let nextDayIndex = cleanedHours.length;
      for (const nextDay of days) {
        if (nextDay !== day) {
          const idx = cleanedHours.indexOf(nextDay, dayIndex + day.length);
          if (idx !== -1 && idx < nextDayIndex) {
            nextDayIndex = idx;
          }
        }
      }
      
      // Extract the hours for this day
      const dayInfo = cleanedHours.substring(dayIndex, nextDayIndex).trim();
      const hoursMatch = dayInfo.match(/^(\w+)(Closed|\d+.+?)(?=\s*$|\s*[A-Z])/);
      
      if (hoursMatch) {
        if (hoursMatch[2] === 'Closed') {
          hoursObj[day.toLowerCase()] = 'Closed';
        } else {
          // Clean up the hours format
          let hours = hoursMatch[2]
            .replace(/(\d+)\s*([ap]m)/gi, '$1$2')
            .replace(/–/g, '-')
            .trim();
          
          // Ensure proper formatting (e.g., "10am-6pm")
          if (hours && !hours.includes('Closed')) {
            hoursObj[day.toLowerCase()] = hours;
          } else {
            hoursObj[day.toLowerCase()] = 'Closed';
          }
        }
      }
    }
  });
  
  // If the string starts with "Closed ⋅ Opens", parse the opening time for today
  const opensMatch = hoursString.match(/^Closed ⋅ Opens (\d+ [ap]m) (\w+)/);
  if (opensMatch) {
    const openTime = opensMatch[1];
    const openDay = opensMatch[2];
    if (hoursObj[openDay.toLowerCase()]) {
      // Update the opening time for that day if it's not already set
      if (hoursObj[openDay.toLowerCase()] === 'Closed') {
        hoursObj[openDay.toLowerCase()] = `Opens ${openTime}`;
      }
    }
  }
  
  // Default Monday to standard hours if it's marked as closed
  // Most facilities are actually open on Monday
  if (hoursObj['monday'] === 'Closed') {
    // Use Tuesday's hours if available, otherwise use a standard time
    if (hoursObj['tuesday'] && hoursObj['tuesday'] !== 'Closed') {
      hoursObj['monday'] = hoursObj['tuesday'];
    } else if (hoursObj['wednesday'] && hoursObj['wednesday'] !== 'Closed') {
      hoursObj['monday'] = hoursObj['wednesday'];
    } else {
      hoursObj['monday'] = '9am-5pm'; // Default business hours
    }
  }
  
  return hoursObj;
}

/**
 * Consolidate similar categories into standard ones
 * This function is shared with mapDataLoader.ts for consistency
 */
function consolidateCategory(category: string): string | null {
  if (!category || typeof category !== 'string') return null;
  
  const normalizedCategory = category.toLowerCase().trim();
  
  // Remove unwanted categories
  if (normalizedCategory.includes('gay') && normalizedCategory.includes('lesbian')) {
    return null;
  }
  
  // Empty or very short categories
  if (normalizedCategory.length < 2) {
    return null;
  }
  
  // Precise consolidation mappings
  if (normalizedCategory.includes('ymca')) return 'YMCA';
  if (normalizedCategory.includes('gym') && !normalizedCategory.includes('ymca')) return 'Gym';
  if (normalizedCategory.includes('community center')) return 'Community Center';
  if (normalizedCategory.includes('recreation center')) return 'Recreation Center';
  if (normalizedCategory.includes('truck stop')) return 'Truck Stop';
  if (normalizedCategory.includes('pool') || normalizedCategory === 'aquatic center') return 'Swimming Pool';
  if (normalizedCategory === 'hostel') return 'Hostel';
  if (normalizedCategory.includes('state park') || (normalizedCategory === 'park' && !normalizedCategory.includes('water'))) return 'Park';
  if (normalizedCategory.includes('child care') || normalizedCategory === 'preschool') return 'Child Care';
  if (normalizedCategory.includes('gas station') || normalizedCategory === 'petrol station') return 'Gas Station';
  
  // Return cleaned original if no specific mapping found
  const cleaned = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase().trim();
  return cleaned.length > 1 ? cleaned : null;
}

// Update the transformLocation function to use the consolidated category function
export function transformLocation(rawLocation: any, index: number): ShowerLocation {
  const slug = createSlug(rawLocation.title);
  
  // Parse amenities from pipe-separated string
  const amenities = rawLocation.amenities 
    ? rawLocation.amenities.split('|').filter((a: string) => a.trim())
    : [];
  
  // Process categories using the same logic as mapDataLoader
  const categoriesSet = new Set<string>();

  // Process businessType first
  if (rawLocation.businessType) {
    const businessCategory = consolidateCategory(rawLocation.businessType.trim());
    if (businessCategory) {
      categoriesSet.add(businessCategory);
    }
  }

  // Process category field - split, clean, and deduplicate
  if (rawLocation.category) {
    const categoryValues = rawLocation.category
      .split(',')
      .map((cat: string) => cat.trim())
      .filter((cat: string) => cat.length > 0);
      
    categoryValues.forEach((cat: string) => {
      const consolidated = consolidateCategory(cat);
      if (consolidated) {
        categoriesSet.add(consolidated);
      }
    });
  }

  // Convert Set to array and ensure uniqueness
  let categories = Array.from(categoriesSet);
  
  // Additional deduplication for case-insensitive duplicates
  const uniqueCategories = categories.filter((category, index) => {
    return categories.findIndex(c => c.toLowerCase() === category.toLowerCase()) === index;
  });

  // Add default if no categories found
  if (uniqueCategories.length === 0) {
    uniqueCategories.push('Public Facility');
  }
  
  // Parse hours - use the new parser if hours is a string, otherwise use dailyHours
  let hours = {};
  if (rawLocation.hours && typeof rawLocation.hours === 'string') {
    hours = parseHoursString(rawLocation.hours);
  } else if (rawLocation.dailyHours) {
    hours = rawLocation.dailyHours;
  }
  
  return {
    id: rawLocation.placeId || `loc_${index}`,
    slug: slug,
    title: rawLocation.title || 'Unknown Facility',
    street: cleanAddress(rawLocation.address),
    city: cleanCity(rawLocation.city),
    province: rawLocation.state || rawLocation.province || '',
    state: rawLocation.state || '',
    zip: rawLocation.zip || '',
    country: rawLocation.country || 'USA',
    lat: parseFloat(rawLocation.lat) || 0,
    lng: parseFloat(rawLocation.lng) || 0,
    phone: rawLocation.phone || '',
    email: rawLocation.email,
    website: rawLocation.website || '',
    content: rawLocation.content || rawLocation.businessDescription || '',
    categories: uniqueCategories, // Now using the same consolidation logic as mapDataLoader
    amenities: amenities,
    cost: rawLocation.cost || 'Contact for pricing',
    access: rawLocation.access || 'Contact for access',
    hours: hours,
    rating: parseFloat(rawLocation.rating) || 0,
    reviewCount: parseInt(rawLocation.reviewCount) || 0,
    lastUpdated: rawLocation.timestamp || new Date().toISOString(),
    showerReviews: rawLocation.showerReviews || [],
    showerReviewCount: rawLocation.showerReviewCount || 0,
    businessType: rawLocation.businessType || 'Public Facility',
    address: cleanAddress(rawLocation.address)
  };
}

// Create URL-friendly slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const cleanAddress = (address: string) => {
  if (!address) return '';
  
  // Use a regex to remove any non-alphanumeric, non-space characters from the start
  const cleanedAddress = address.replace(/^[^a-zA-Z0-9\s]+/, '').trim();

  const parts = cleanedAddress.split(',').map(part => part.trim());
  return `${parts[0]}, ${parts[1]}`;
};

// Clean up city field
function cleanCity(city: string): string {
  if (!city) return '';
  // Remove numbers and parentheses that got mixed in
  return city.replace(/[\d()]/g, '').trim();
}

// Helper function to check if location has verified shower reviews
function hasVerifiedShowerReviews(location: any): boolean {
  return location && location.showerReviewCount > 0;
}

// Get region info for a state with verified locations prioritized
export function getRegionInfo(stateCode: string, stateSlug: string): RegionInfo | null {
  const stateData = loadStateData(stateCode);
  if (!stateData) return null;
  
  // Transform all locations
  const locations = stateData.locations.map((loc, idx) => transformLocation(loc, idx));
  
  // Calculate stats
  const cities = [...new Set(locations.map(loc => loc.city).filter(Boolean))];
  const freeLocations = locations.filter(loc => 
    loc.cost.toLowerCase().includes('free') || 
    loc.cost === '0' || 
    loc.cost === '$0'
  ).length;
  
  // Separate verified and non-verified locations
  const verifiedLocations = locations.filter(loc => hasVerifiedShowerReviews(loc));
  const nonVerifiedLocations = locations.filter(loc => !hasVerifiedShowerReviews(loc));
  
  // Sort each group by rating
  const sortedVerified = verifiedLocations.sort((a, b) => b.rating - a.rating);
  const sortedNonVerified = nonVerifiedLocations.sort((a, b) => b.rating - a.rating);
  
  // Create featured locations array with good mix
  let featuredLocations: any[] = [];
  const targetTotal = 50;
  
  if (sortedVerified.length >= 25) {
    // If we have enough verified locations, take 25-30 verified and fill rest with non-verified
    const verifiedCount = Math.min(30, sortedVerified.length);
    featuredLocations = [
      ...sortedVerified.slice(0, verifiedCount),
      ...sortedNonVerified.slice(0, targetTotal - verifiedCount)
    ];
  } else {
    // If we don't have 25 verified, take all verified and fill with non-verified
    featuredLocations = [
      ...sortedVerified,
      ...sortedNonVerified.slice(0, targetTotal - sortedVerified.length)
    ];
  }
  
  // Shuffle to mix verified and non-verified (but keep some clustering for better UX)
  // We'll interleave them: take 2 verified, 1 non-verified pattern when possible
  const mixedLocations: any[] = [];
  let vIndex = 0;
  let nvIndex = 0;
  
  // Separate the featured locations back into verified/non-verified for mixing
  const featuredVerified = featuredLocations.filter(loc => hasVerifiedShowerReviews(loc));
  const featuredNonVerified = featuredLocations.filter(loc => !hasVerifiedShowerReviews(loc));
  
  // Mix them with a pattern that ensures good distribution
  while (vIndex < featuredVerified.length || nvIndex < featuredNonVerified.length) {
    // Add up to 2 verified locations
    for (let i = 0; i < 2 && vIndex < featuredVerified.length; i++) {
      mixedLocations.push(featuredVerified[vIndex++]);
    }
    // Add 1 non-verified location
    if (nvIndex < featuredNonVerified.length) {
      mixedLocations.push(featuredNonVerified[nvIndex++]);
    }
  }
  
  // Ensure we don't exceed our target
  const finalFeaturedLocations = mixedLocations.slice(0, targetTotal);
  
  return {
    slug: stateSlug,
    name: stateData.stateName,
    country: 'usa',
    countryName: 'United States',
    stats: {
      totalLocations: locations.length,
      freeLocations: freeLocations,
      cities: cities.slice(0, 10),
      verifiedCount: verifiedLocations.length // Add verified count to stats
    },
    featuredLocations: finalFeaturedLocations
  };
}

// Get all locations for a state
export function getStateLocations(stateCode: string): ShowerLocation[] {
  const stateData = loadStateData(stateCode);
  if (!stateData) return [];
  
  return stateData.locations.map((loc, idx) => transformLocation(loc, idx));
}

// Get a single location by slug
export function getLocationBySlug(stateCode: string, locationSlug: string): ShowerLocation | null {
  const locations = getStateLocations(stateCode);
  return locations.find(loc => loc.slug === locationSlug) || null;
}

// Get state code from slug
export function getStateCodeFromSlug(slug: string): string | null {
  const entry = Object.entries(stateSlugMap).find(([_, stateSlug]) => stateSlug === slug);
  return entry ? entry[0] : null;
}

// Get all available states
export function getAllStates(): Array<{code: string, slug: string, name: string}> {
  const statesDir = path.join(process.cwd(), 'public', 'data', 'states');
  
  try {
    const files = fs.readdirSync(statesDir);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const code = file.replace('.json', '');
        const data = loadStateData(code);
        return {
          code: code,
          slug: stateSlugMap[code] || code.toLowerCase(),
          name: data?.stateName || code
        };
      })
      .filter(state => state.slug); // Only return states with valid slugs
  } catch (error) {
    console.error('Error reading states directory:', error);
    return [];
  }
}