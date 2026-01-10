// ========================================
// FILE: app/lib/dataLoader.ts
// Multi-country support: USA, UK, and Australia
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
  postcode?: string; // UK postcode
  ukRegion?: string; // UK region slug
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

export interface UKRegionData {
  region: string;
  regionName: string;
  country: string;
  locations: any[];
  totalLocations: number;
}

export interface AustraliaStateData {
  state: string;
  stateName: string;
  country: string;
  locations: any[];
  totalLocations: number;
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
    verifiedCount?: number;
  };
  featuredLocations: ShowerLocation[];
}

// ========================================
// CATEGORY-BASED PRICING DEFAULTS
// ========================================

interface PricingInfo {
  cost: string;
  access: string;
}

// Determine cost and access based on facility category/type
function getCategoryBasedPricing(category: string, country: string): PricingInfo {
  const normalizedCategory = (category || '').toLowerCase();

  // Currency symbol based on country
  const currency = country === 'UK' ? '£' : country === 'Australia' ? 'A$' : '$';

  // FREE facilities
  if (
    normalizedCategory.includes('beach') ||
    normalizedCategory.includes('public shower') ||
    normalizedCategory.includes('surf club') ||
    normalizedCategory.includes('surf life saving') ||
    normalizedCategory.includes('surf lifesaving') ||
    normalizedCategory.includes('public bathroom') ||
    normalizedCategory.includes('public toilet') ||
    normalizedCategory.includes('wheelchair-accessible bathroom') ||
    normalizedCategory.includes('promenade') ||
    normalizedCategory.includes('outdoor bath') ||
    normalizedCategory.includes('beach pavil') ||  // catches pavilion/pavillion
    normalizedCategory.includes('homeless service') ||
    normalizedCategory.includes('homeless shelter') ||
    normalizedCategory.includes('national reserve') ||
    normalizedCategory.includes('nature preserve') ||
    normalizedCategory.includes('hiking area')
  ) {
    return { cost: 'Free', access: 'Public Access' };
  }

  // Council/public pools and leisure centres
  if (
    normalizedCategory.includes('leisure centre') ||
    normalizedCategory.includes('leisure center') ||
    normalizedCategory.includes('aquatic centre') ||
    normalizedCategory.includes('aquatic center') ||
    normalizedCategory.includes('swimming pool') ||
    normalizedCategory.includes('swimming facility') ||
    normalizedCategory.includes('swim club') ||
    normalizedCategory.includes('swimming lake') ||
    normalizedCategory.includes('swimming basin') ||
    normalizedCategory.includes('public pool') ||
    normalizedCategory.includes('council pool') ||
    normalizedCategory.includes('lido')
  ) {
    if (country === 'UK') {
      return { cost: '£5-10', access: 'Pay & Play' };
    } else if (country === 'Australia') {
      return { cost: 'A$5-10', access: 'Casual Entry' };
    }
    return { cost: '$5-10', access: 'Day Pass' };
  }

  // Gyms and fitness studios
  if (
    normalizedCategory.includes('gym') ||
    normalizedCategory.includes('fitness') ||
    normalizedCategory.includes('health club') ||
    normalizedCategory.includes('yoga studio') ||
    normalizedCategory.includes('pilates') ||
    normalizedCategory.includes('boot camp') ||
    normalizedCategory.includes('personal trainer') ||
    normalizedCategory.includes('rock climbing') ||
    normalizedCategory.includes('martial arts') ||
    normalizedCategory.includes('jujitsu') ||
    normalizedCategory.includes('boxing gym')
  ) {
    if (country === 'UK') {
      return { cost: '£8-20 day pass', access: 'Day Pass Available' };
    } else if (country === 'Australia') {
      return { cost: 'A$15-25 day pass', access: 'Casual Visit' };
    }
    return { cost: '$10-25 day pass', access: 'Day Pass Available' };
  }

  // YMCA
  if (normalizedCategory.includes('ymca')) {
    if (country === 'UK') {
      return { cost: '£5-15', access: 'Day Pass Available' };
    } else if (country === 'Australia') {
      return { cost: 'A$10-20', access: 'Casual Visit' };
    }
    return { cost: '$10-20', access: 'Day Pass Available' };
  }

  // Recreation/Sports centres and clubs
  if (
    normalizedCategory.includes('recreation') ||
    normalizedCategory.includes('sports centre') ||
    normalizedCategory.includes('sports center') ||
    normalizedCategory.includes('sports club') ||
    normalizedCategory.includes('sports activity') ||
    normalizedCategory.includes('athletics centre') ||
    normalizedCategory.includes('athletics center') ||
    normalizedCategory.includes('stadium') ||
    normalizedCategory.includes('community center') ||
    normalizedCategory.includes('community centre') ||
    normalizedCategory.includes('tennis club') ||
    normalizedCategory.includes('soccer club') ||
    normalizedCategory.includes('basketball club') ||
    normalizedCategory.includes('bowling')
  ) {
    if (country === 'UK') {
      return { cost: '£3-8', access: 'Pay & Play' };
    } else if (country === 'Australia') {
      return { cost: 'A$5-12', access: 'Casual Entry' };
    }
    return { cost: '$5-15', access: 'Day Pass' };
  }

  // Hostels and Hotels
  if (
    normalizedCategory.includes('hostel') ||
    normalizedCategory.includes('yha') ||
    normalizedCategory.includes('backpacker') ||
    normalizedCategory.includes('hotel') ||
    normalizedCategory.includes('motel')
  ) {
    if (country === 'UK') {
      return { cost: '£3-8', access: 'Non-Guest Fee' };
    } else if (country === 'Australia') {
      return { cost: 'A$5-10', access: 'Non-Guest Fee' };
    }
    return { cost: '$5-10', access: 'Non-Guest Fee' };
  }

  // Caravan parks / Holiday parks / Campsites / Accommodation
  if (
    normalizedCategory.includes('caravan') ||
    normalizedCategory.includes('holiday park') ||
    normalizedCategory.includes('holiday home') ||
    normalizedCategory.includes('camping') ||
    normalizedCategory.includes('campsite') ||
    normalizedCategory.includes('campground') ||
    normalizedCategory.includes('accommodation')
  ) {
    if (country === 'UK') {
      return { cost: '£3-6', access: 'Day Visitor' };
    } else if (country === 'Australia') {
      return { cost: 'A$5-10', access: 'Day Visitor' };
    }
    return { cost: '$5-10', access: 'Day Visitor' };
  }

  // Motorway services / Truck stops / Rest stops
  if (
    normalizedCategory.includes('motorway') ||
    normalizedCategory.includes('service') ||
    normalizedCategory.includes('truck stop') ||
    normalizedCategory.includes('travel center') ||
    normalizedCategory.includes('travel centre') ||
    normalizedCategory.includes('rest area') ||
    normalizedCategory.includes('rest stop') ||
    normalizedCategory.includes('toll road')
  ) {
    if (country === 'UK') {
      return { cost: '£5-8', access: 'Pay Per Use' };
    } else if (country === 'Australia') {
      return { cost: 'A$5-10', access: 'Pay Per Use' };
    }
    return { cost: '$10-15', access: 'Pay Per Use' };
  }

  // Day Spas / Wellness centres / Massage (more expensive than basic spas)
  if (
    normalizedCategory.includes('day spa') ||
    normalizedCategory.includes('wellness') ||
    normalizedCategory.includes('massage spa') ||
    normalizedCategory.includes('massage therapist')
  ) {
    if (country === 'UK') {
      return { cost: '£30-60', access: 'Entry Fee' };
    } else if (country === 'Australia') {
      return { cost: 'A$30-60', access: 'Entry Fee' };
    }
    return { cost: '$30-60', access: 'Entry Fee' };
  }

  // Spas / Turkish baths (general spas)
  if (
    normalizedCategory.includes('spa') ||
    normalizedCategory.includes('turkish bath') ||
    normalizedCategory.includes('public bath')
  ) {
    if (country === 'UK') {
      return { cost: '£10-30', access: 'Entry Fee' };
    } else if (country === 'Australia') {
      return { cost: 'A$20-50', access: 'Entry Fee' };
    }
    return { cost: '$20-50', access: 'Entry Fee' };
  }

  // Saunas
  if (normalizedCategory.includes('sauna')) {
    if (country === 'UK') {
      return { cost: '£15-30', access: 'Entry Fee' };
    } else if (country === 'Australia') {
      return { cost: 'A$15-30', access: 'Entry Fee' };
    }
    return { cost: '$15-30', access: 'Entry Fee' };
  }

  // Water parks
  if (normalizedCategory.includes('water park')) {
    if (country === 'UK') {
      return { cost: '£20-40', access: 'Entry Fee' };
    } else if (country === 'Australia') {
      return { cost: 'A$30-50', access: 'Entry Fee' };
    }
    return { cost: '$30-50', access: 'Entry Fee' };
  }

  // Sports complexes
  if (normalizedCategory.includes('sports complex')) {
    if (country === 'UK') {
      return { cost: '£5-12', access: 'Pay & Play' };
    } else if (country === 'Australia') {
      return { cost: 'A$8-15', access: 'Casual Entry' };
    }
    return { cost: '$8-15', access: 'Day Pass' };
  }

  // Swimming/Surf schools (lesson-based, not for casual showers)
  if (
    normalizedCategory.includes('swimming school') ||
    normalizedCategory.includes('swim school') ||
    normalizedCategory.includes('swimming instructor') ||
    normalizedCategory.includes('surf school') ||
    normalizedCategory.includes('sports school')
  ) {
    return { cost: 'Lesson-based', access: 'Students Only' };
  }

  // Petrol/Service stations with showers
  if (
    normalizedCategory.includes('petrol station') ||
    normalizedCategory.includes('service station')
  ) {
    if (country === 'UK') {
      return { cost: '£5-10', access: 'Pay Per Use' };
    } else if (country === 'Australia') {
      return { cost: 'A$5-10', access: 'Pay Per Use' };
    }
    return { cost: '$5-15', access: 'Pay Per Use' };
  }

  // Parks (public parks with shower facilities)
  if (normalizedCategory.includes('park')) {
    return { cost: 'Free', access: 'Public Access' };
  }

  // Default - contact for pricing
  return { cost: 'Contact for pricing', access: 'Contact for access' };
}

// Apply pricing to a location based on its category
function applyPricingDefaults(location: any, country: string): { cost: string; access: string } {
  // If already has specific pricing (not the default), keep it
  const currentCost = (location.cost || '').toLowerCase();
  if (
    currentCost &&
    !currentCost.includes('contact') &&
    currentCost !== ''
  ) {
    return { cost: location.cost, access: location.access || 'Contact for access' };
  }

  // Get category from businessType or categories array
  const category = location.businessType ||
    (Array.isArray(location.categories) ? location.categories[0] : location.categories) ||
    '';

  return getCategoryBasedPricing(category, country);
}

// UK Region mapping
const ukRegionSlugMap: Record<string, { code: string; name: string }> = {
  'london': { code: 'LON', name: 'London' },
  'south-east': { code: 'SE', name: 'South East' },
  'south-west': { code: 'SW', name: 'South West' },
  'east-of-england': { code: 'EE', name: 'East of England' },
  'east-midlands': { code: 'EM', name: 'East Midlands' },
  'west-midlands': { code: 'WM', name: 'West Midlands' },
  'yorkshire': { code: 'YH', name: 'Yorkshire and the Humber' },
  'north-west': { code: 'NW', name: 'North West' },
  'north-east': { code: 'NE', name: 'North East' },
  'scotland': { code: 'SC', name: 'Scotland' },
  'wales': { code: 'WA', name: 'Wales' },
  'northern-ireland': { code: 'NI', name: 'Northern Ireland' }
};

// Australian States/Territories mapping
const australiaStateSlugMap: Record<string, { code: string; name: string }> = {
  'new-south-wales': { code: 'NSW', name: 'New South Wales' },
  'victoria': { code: 'VIC', name: 'Victoria' },
  'queensland': { code: 'QLD', name: 'Queensland' },
  'western-australia': { code: 'WA', name: 'Western Australia' },
  'south-australia': { code: 'SA', name: 'South Australia' },
  'tasmania': { code: 'TAS', name: 'Tasmania' },
  'northern-territory': { code: 'NT', name: 'Northern Territory' },
  'australian-capital-territory': { code: 'ACT', name: 'Australian Capital Territory' }
};

// Get all UK region slugs
export function getAllUKRegionSlugs(): string[] {
  return Object.keys(ukRegionSlugMap);
}

// Check if a region slug is a valid UK region
export function isUKRegion(slug: string): boolean {
  return slug in ukRegionSlugMap;
}

// Get UK region name from slug
export function getUKRegionName(slug: string): string | null {
  return ukRegionSlugMap[slug]?.name || null;
}

// Get all Australia state slugs
export function getAllAustraliaStateSlugs(): string[] {
  return Object.keys(australiaStateSlugMap);
}

// Check if a region slug is a valid Australia state/territory
export function isAustraliaState(slug: string): boolean {
  return slug in australiaStateSlugMap;
}

// Get Australia state name from slug
export function getAustraliaStateName(slug: string): string | null {
  return australiaStateSlugMap[slug]?.name || null;
}

// Get Australia state code from slug
export function getAustraliaStateCode(slug: string): string | null {
  return australiaStateSlugMap[slug]?.code || null;
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

  // Apply category-based pricing defaults for USA
  const pricing = applyPricingDefaults({
    ...rawLocation,
    categories: uniqueCategories,
    businessType: rawLocation.businessType || uniqueCategories[0] || 'Public Facility'
  }, 'USA');

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
    cost: pricing.cost,
    access: pricing.access,
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

// ========================================
// UK-SPECIFIC FUNCTIONS
// ========================================

// Load UK region data from JSON file
export function loadUKRegionData(regionSlug: string): UKRegionData | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'uk', `${regionSlug}.json`);
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error loading UK region data for ${regionSlug}:`, error);
    return null;
  }
}

// Transform UK location to ShowerLocation format
export function transformUKLocation(rawLocation: any, index: number): ShowerLocation {
  const slug = rawLocation.slug || createSlug(rawLocation.title);

  // Parse amenities if it's a string
  const amenities = Array.isArray(rawLocation.amenities)
    ? rawLocation.amenities
    : rawLocation.amenities?.split('|').filter((a: string) => a.trim()) || [];

  // Parse categories
  const categories = Array.isArray(rawLocation.categories)
    ? rawLocation.categories
    : [rawLocation.businessType || 'Leisure Centre'];

  // Apply category-based pricing defaults
  const pricing = applyPricingDefaults({
    ...rawLocation,
    categories,
    businessType: rawLocation.businessType || 'Leisure Centre'
  }, 'UK');

  return {
    id: rawLocation.id || `uk_loc_${index}`,
    slug: slug,
    title: rawLocation.title || 'Unknown Facility',
    street: rawLocation.address || '',
    address: rawLocation.address || '',
    city: rawLocation.city || '',
    province: rawLocation.ukRegion || '',
    state: '', // UK doesn't use states
    zip: '', // Use postcode instead
    postcode: rawLocation.postcode || '',
    ukRegion: rawLocation.ukRegion || '',
    country: 'UK',
    lat: parseFloat(rawLocation.lat) || 0,
    lng: parseFloat(rawLocation.lng) || 0,
    phone: rawLocation.phone || '',
    email: rawLocation.email,
    website: rawLocation.website || '',
    content: rawLocation.content || '',
    categories: categories,
    amenities: amenities,
    cost: pricing.cost,
    access: pricing.access,
    hours: rawLocation.hours || {},
    rating: parseFloat(rawLocation.rating) || 0,
    reviewCount: parseInt(rawLocation.reviewCount) || 0,
    lastUpdated: rawLocation.timestamp || new Date().toISOString(),
    showerReviews: rawLocation.showerReviews || [],
    showerReviewCount: rawLocation.showerReviewCount || 0,
    businessType: rawLocation.businessType || 'Leisure Centre'
  };
}

// Get UK region info
export function getUKRegionInfo(regionSlug: string): RegionInfo | null {
  const regionData = loadUKRegionData(regionSlug);
  if (!regionData) return null;

  // Transform all locations
  const locations = regionData.locations.map((loc, idx) => transformUKLocation(loc, idx));

  // Calculate stats
  const cities = [...new Set(locations.map(loc => loc.city).filter(Boolean))];
  const freeLocations = locations.filter(loc =>
    loc.cost.toLowerCase().includes('free') ||
    loc.cost === '0' ||
    loc.cost === '£0'
  ).length;

  // Separate verified and non-verified locations
  const verifiedLocations = locations.filter(loc => loc.showerReviewCount > 0);
  const nonVerifiedLocations = locations.filter(loc => loc.showerReviewCount === 0);

  // Sort each group by rating
  const sortedVerified = verifiedLocations.sort((a, b) => b.rating - a.rating);
  const sortedNonVerified = nonVerifiedLocations.sort((a, b) => b.rating - a.rating);

  // Create featured locations array
  const targetTotal = 50;
  let featuredLocations: ShowerLocation[] = [];

  if (sortedVerified.length >= 25) {
    const verifiedCount = Math.min(30, sortedVerified.length);
    featuredLocations = [
      ...sortedVerified.slice(0, verifiedCount),
      ...sortedNonVerified.slice(0, targetTotal - verifiedCount)
    ];
  } else {
    featuredLocations = [
      ...sortedVerified,
      ...sortedNonVerified.slice(0, targetTotal - sortedVerified.length)
    ];
  }

  // Mix verified and non-verified
  const mixedLocations: ShowerLocation[] = [];
  const featuredVerified = featuredLocations.filter(loc => loc.showerReviewCount > 0);
  const featuredNonVerified = featuredLocations.filter(loc => loc.showerReviewCount === 0);

  let vIndex = 0;
  let nvIndex = 0;

  while (vIndex < featuredVerified.length || nvIndex < featuredNonVerified.length) {
    for (let i = 0; i < 2 && vIndex < featuredVerified.length; i++) {
      mixedLocations.push(featuredVerified[vIndex++]);
    }
    if (nvIndex < featuredNonVerified.length) {
      mixedLocations.push(featuredNonVerified[nvIndex++]);
    }
  }

  const finalFeaturedLocations = mixedLocations.slice(0, targetTotal);

  const regionName = ukRegionSlugMap[regionSlug]?.name || regionData.regionName;

  return {
    slug: regionSlug,
    name: regionName,
    country: 'uk',
    countryName: 'United Kingdom',
    stats: {
      totalLocations: locations.length,
      freeLocations: freeLocations,
      cities: cities.slice(0, 10),
      verifiedCount: verifiedLocations.length
    },
    featuredLocations: finalFeaturedLocations
  };
}

// Get all UK locations for a region
export function getUKRegionLocations(regionSlug: string): ShowerLocation[] {
  const regionData = loadUKRegionData(regionSlug);
  if (!regionData) return [];

  return regionData.locations.map((loc, idx) => transformUKLocation(loc, idx));
}

// Get a single UK location by slug
export function getUKLocationBySlug(regionSlug: string, locationSlug: string): ShowerLocation | null {
  const locations = getUKRegionLocations(regionSlug);
  return locations.find(loc => loc.slug === locationSlug) || null;
}

// Get all available UK regions
export function getAllUKRegions(): Array<{code: string, slug: string, name: string}> {
  return Object.entries(ukRegionSlugMap).map(([slug, info]) => ({
    code: info.code,
    slug: slug,
    name: info.name
  }));
}

// ========================================
// AUSTRALIA DATA FUNCTIONS
// ========================================

// Load Australia state data from JSON file
export function loadAustraliaStateData(stateSlug: string): AustraliaStateData | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'australia', `${stateSlug}.json`);
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error loading Australia state data for ${stateSlug}:`, error);
    return null;
  }
}

// Transform Australia location to ShowerLocation format
export function transformAustraliaLocation(rawLocation: any, index: number): ShowerLocation {
  const slug = rawLocation.slug || createSlug(rawLocation.title);

  // Parse amenities if it's a string
  const amenities = Array.isArray(rawLocation.amenities)
    ? rawLocation.amenities
    : rawLocation.amenities?.split('|').filter((a: string) => a.trim()) || [];

  // Parse categories
  const categories = Array.isArray(rawLocation.categories)
    ? rawLocation.categories
    : [rawLocation.businessType || 'Leisure Centre'];

  // Apply category-based pricing defaults
  const pricing = applyPricingDefaults({
    ...rawLocation,
    categories,
    businessType: rawLocation.businessType || categories[0] || 'Facility'
  }, 'Australia');

  return {
    id: rawLocation.id || `au-${index}`,
    slug: slug,
    title: rawLocation.title || 'Unknown Facility',
    street: rawLocation.street || rawLocation.address?.split(',')[0] || '',
    address: rawLocation.address || 'Address not available',
    city: rawLocation.city || '',
    province: rawLocation.state || '',
    state: rawLocation.state || '',
    zip: rawLocation.postcode || '',
    postcode: rawLocation.postcode,
    country: 'Australia',
    lat: parseFloat(rawLocation.lat) || 0,
    lng: parseFloat(rawLocation.lng) || 0,
    phone: rawLocation.phone || '',
    email: rawLocation.email || '',
    website: rawLocation.website || '',
    content: rawLocation.content || `${rawLocation.title} is a shower facility located in ${rawLocation.city}, ${rawLocation.state}.`,
    categories: categories,
    amenities: amenities,
    cost: pricing.cost,
    access: pricing.access,
    hours: rawLocation.hours || {},
    rating: parseFloat(rawLocation.rating) || 0,
    reviewCount: rawLocation.reviewCount || 0,
    lastUpdated: rawLocation.lastUpdated || new Date().toISOString(),
    showerReviews: rawLocation.showerReviews || [],
    showerReviewCount: rawLocation.showerReviewCount || 0,
    businessType: rawLocation.businessType || categories[0] || 'Facility'
  };
}

// Get Australia state info
export function getAustraliaStateInfo(stateSlug: string): RegionInfo | null {
  const stateData = loadAustraliaStateData(stateSlug);
  if (!stateData) return null;

  // Transform all locations
  const locations = stateData.locations.map((loc, idx) => transformAustraliaLocation(loc, idx));

  // Calculate stats
  const cities = [...new Set(locations.map(loc => loc.city).filter(Boolean))];
  const freeLocations = locations.filter(loc =>
    loc.cost.toLowerCase().includes('free') ||
    loc.cost === '0' ||
    loc.cost === '$0' ||
    loc.cost === 'A$0'
  ).length;

  // Separate verified and non-verified locations
  const verifiedLocations = locations.filter(loc => loc.showerReviewCount > 0);
  const nonVerifiedLocations = locations.filter(loc => loc.showerReviewCount === 0);

  // Sort each group by rating
  const sortedVerified = verifiedLocations.sort((a, b) => b.rating - a.rating);
  const sortedNonVerified = nonVerifiedLocations.sort((a, b) => b.rating - a.rating);

  // Create featured locations array
  const targetTotal = 50;
  let featuredLocations: ShowerLocation[] = [];

  // First, add all verified locations (up to targetTotal)
  featuredLocations = sortedVerified.slice(0, targetTotal);

  // If we need more, fill with non-verified
  if (featuredLocations.length < targetTotal) {
    const remaining = targetTotal - featuredLocations.length;
    featuredLocations = [...featuredLocations, ...sortedNonVerified.slice(0, remaining)];
  }

  const stateName = getAustraliaStateName(stateSlug) || stateSlug;

  return {
    slug: stateSlug,
    name: stateName,
    country: 'australia',
    countryName: 'Australia',
    stats: {
      totalLocations: locations.length,
      freeLocations,
      cities: cities.slice(0, 20),
      verifiedCount: verifiedLocations.length
    },
    featuredLocations
  };
}

// Get all Australia locations for a state
export function getAustraliaStateLocations(stateSlug: string): ShowerLocation[] {
  const stateData = loadAustraliaStateData(stateSlug);
  if (!stateData) return [];

  return stateData.locations.map((loc, idx) => transformAustraliaLocation(loc, idx));
}

// Get a single Australia location by slug
export function getAustraliaLocationBySlug(stateSlug: string, locationSlug: string): ShowerLocation | null {
  const locations = getAustraliaStateLocations(stateSlug);
  return locations.find(loc => loc.slug === locationSlug) || null;
}

// Get all available Australia states
export function getAllAustraliaStates(): Array<{code: string, slug: string, name: string}> {
  return Object.entries(australiaStateSlugMap).map(([slug, info]) => ({
    code: info.code,
    slug: slug,
    name: info.name
  }));
}

// ========================================
// MULTI-COUNTRY HELPER FUNCTIONS
// ========================================

// Get region info for any country
export function getRegionInfoByCountry(country: string, regionSlug: string): RegionInfo | null {
  if (country === 'usa') {
    const stateCode = getStateCodeFromSlug(regionSlug);
    if (!stateCode) return null;
    return getRegionInfo(stateCode, regionSlug);
  } else if (country === 'uk') {
    return getUKRegionInfo(regionSlug);
  } else if (country === 'australia') {
    return getAustraliaStateInfo(regionSlug);
  }
  return null;
}

// Get location by slug for any country
export function getLocationBySlugAndCountry(
  country: string,
  regionSlug: string,
  locationSlug: string
): ShowerLocation | null {
  if (country === 'usa') {
    const stateCode = getStateCodeFromSlug(regionSlug);
    if (!stateCode) return null;
    return getLocationBySlug(stateCode, locationSlug);
  } else if (country === 'uk') {
    return getUKLocationBySlug(regionSlug, locationSlug);
  } else if (country === 'australia') {
    return getAustraliaLocationBySlug(regionSlug, locationSlug);
  }
  return null;
}

// Check if a country is supported
export function isSupportedCountry(country: string): boolean {
  return ['usa', 'uk', 'australia'].includes(country);
}

// Check if a region is valid for a country
export function isValidRegionForCountry(country: string, regionSlug: string): boolean {
  if (country === 'usa') {
    return getStateCodeFromSlug(regionSlug) !== null;
  } else if (country === 'uk') {
    return isUKRegion(regionSlug);
  } else if (country === 'australia') {
    return isAustraliaState(regionSlug);
  }
  return false;
}

// Get country display name
export function getCountryDisplayName(country: string): string {
  const countryNames: Record<string, string> = {
    'usa': 'United States',
    'uk': 'United Kingdom',
    'australia': 'Australia'
  };
  return countryNames[country] || country.toUpperCase();
}