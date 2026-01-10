// app/map/mapDataLoader.ts

export interface MapLocation {
  id: string;
  title: string;
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  ukRegion?: string; // For UK locations
  country?: string;
  categories: string[];
  amenities: string[];
  cost: string;
  hours: Record<string, string>;
  phone?: string;
  website?: string;
  rating?: number;
  verified?: boolean;
  showerReviewCount?: number;
  businessType?: string;
  access?: string;
}

export interface StateData {
  state: string;
  stateName: string;
  locations: any[];
}

/**
 * Parse hours string into structured format
 */
function parseHoursString(hoursString: string): Record<string, string> {
  const hours: Record<string, string> = {};
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  if (!hoursString) {
    days.forEach(day => {
      hours[day.toLowerCase()] = 'Contact for hours';
    });
    return hours;
  }
  
  days.forEach(day => {
    const dayRegex = new RegExp(`${day}([^A-Z]+)`, 'i');
    const match = hoursString.match(dayRegex);
    
    if (match && match[1]) {
      let hourStr = match[1].trim();
      if (hourStr.toLowerCase() === 'closed') {
        hours[day.toLowerCase()] = 'Closed';
      } else if (hourStr.includes('–') || hourStr.includes('-')) {
        const timeMatch = hourStr.match(/(\d+(?::\d+)?\s*(?:am|pm)?)\s*[–-]\s*(\d+(?::\d+)?\s*(?:am|pm)?)/i);
        if (timeMatch) {
          hours[day.toLowerCase()] = `${timeMatch[1]} - ${timeMatch[2]}`;
        } else {
          hours[day.toLowerCase()] = hourStr;
        }
      } else {
        hours[day.toLowerCase()] = hourStr;
      }
    } else {
      hours[day.toLowerCase()] = 'Contact for hours';
    }
  });
  
  return hours;
}

/**
 * Clean up address field
 */
function cleanAddress(address: string): string {
  if (!address) return '';
  
  const cleaned = address
    .replace(/[^a-zA-Z0-9\s,-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  return cleaned;
}

/**
 * Clean up city field
 */
function cleanCity(city: string): string {
  if (!city) return '';
  
  const cleaned = city
    .replace(/['"]/g, '')
    .replace(/\ba\s+/g, '')
    .replace(/neighborhood gem.*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  if (cleaned.length < 2 || /[():]/.test(cleaned)) {
    return '';
  }
  
  return cleaned;
}

/**
 * Extract city from address if city field is invalid
 */
function extractCityFromAddress(address: string, state: string): string {
  if (!address) return '';
  
  const parts = address.split(',');
  if (parts.length >= 2) {
    const cityPart = parts[parts.length - 2]?.trim();
    if (cityPart && cityPart.length > 1) {
      return cityPart;
    }
  }
  
  return '';
}

/**
 * Consolidate similar categories into standard ones
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

/**
 * Transform raw location data to map format
 */
function transformToMapLocation(rawLocation: any, stateCode: string): MapLocation | null {
  // Skip if no valid coordinates
  const lat = parseFloat(rawLocation.lat);
  const lng = parseFloat(rawLocation.lng);
  
  if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
    return null;
  }
  
  // Create a unique ID
  const id = rawLocation.placeId || 
    (rawLocation.title || 'location').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + stateCode.toLowerCase();

  // FIXED: Clean category processing
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

  // Parse amenities
  const amenities = rawLocation.amenities 
    ? rawLocation.amenities.split(/[|,]/).map((a: string) => a.trim()).filter((a: string) => a)
    : ['Contact for amenities'];
  
  // Determine if verified (has shower reviews)
  const verified = (rawLocation.showerReviewCount && rawLocation.showerReviewCount > 0) || false;
  
  // Parse hours
  const hours = parseHoursString(rawLocation.hours || rawLocation.extractedHours || '');
  
  // Clean up address
  const cleanedAddress = cleanAddress(rawLocation.address || rawLocation.street || '');
  
  // Get city
  let city = cleanCity(rawLocation.city || '');
  if (!city || city.length < 2) {
    city = extractCityFromAddress(cleanedAddress, stateCode);
  }
  
  // Clean up cost
  let cost = rawLocation.cost || 'Contact for pricing';
  if (cost.toLowerCase().includes('contact')) {
    cost = 'Contact for pricing';
  }
  
  return {
    id,
    title: rawLocation.title || 'Unknown Facility',
    lat,
    lng,
    address: cleanedAddress,
    city,
    state: stateCode,
    categories: uniqueCategories,
    amenities,
    cost,
    hours,
    phone: rawLocation.phone || undefined,
    website: rawLocation.website || undefined,
    rating: parseFloat(rawLocation.rating) || undefined,
    verified,
    showerReviewCount: rawLocation.showerReviewCount || 0,
    businessType: rawLocation.businessType,
    access: rawLocation.access || 'Contact for access'
  };
}

/**
 * Load all location data from JSON files
 */
export async function loadAllLocations(): Promise<MapLocation[]> {
  const allLocations: MapLocation[] = [];
  
  const stateCodes = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  
  const loadPromises = stateCodes.map(async (stateCode) => {
    try {
      const response = await fetch(`/data/states/${stateCode}.json`);
      if (response.ok) {
        const stateData: StateData = await response.json();
        
        if (stateData.locations && Array.isArray(stateData.locations)) {
          const stateLocations = stateData.locations
            .map((loc: any) => transformToMapLocation(loc, stateCode))
            .filter((loc: MapLocation | null): loc is MapLocation => loc !== null);
          
          return stateLocations;
        }
      }
    } catch (error) {
      console.warn(`Could not load data for ${stateCode}:`, error);
    }
    return [];
  });
  
  const results = await Promise.all(loadPromises);
  
  results.forEach(stateLocations => {
    allLocations.push(...stateLocations);
  });
  
  console.log(`Loaded ${allLocations.length} total locations`);
  
  return allLocations;
}

/**
 * Load locations for a specific state
 */
export async function loadStateLocations(stateCode: string): Promise<MapLocation[]> {
  try {
    const response = await fetch(`/data/states/${stateCode}.json`);
    if (response.ok) {
      const stateData: StateData = await response.json();

      if (stateData.locations && Array.isArray(stateData.locations)) {
        const locations = stateData.locations
          .map((loc: any) => transformToMapLocation(loc, stateCode))
          .filter((loc: MapLocation | null): loc is MapLocation => loc !== null);

        console.log(`Loaded ${locations.length} locations for ${stateCode}`);
        return locations;
      }
    }
  } catch (error) {
    console.error(`Error loading data for ${stateCode}:`, error);
  }

  return [];
}

/**
 * Transform UK location data to map format
 */
function transformUKToMapLocation(rawLocation: any, regionSlug: string): MapLocation | null {
  const lat = parseFloat(rawLocation.lat);
  const lng = parseFloat(rawLocation.lng);

  if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
    return null;
  }

  const id = rawLocation.id ||
    (rawLocation.title || 'location').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + regionSlug;

  // Get categories
  const categories = Array.isArray(rawLocation.categories)
    ? rawLocation.categories
    : [rawLocation.businessType || 'Leisure Centre'];

  // Get amenities
  const amenities = Array.isArray(rawLocation.amenities)
    ? rawLocation.amenities
    : rawLocation.amenities?.split('|').filter((a: string) => a.trim()) || ['Contact for amenities'];

  // Determine if verified
  const verified = (rawLocation.showerReviewCount && rawLocation.showerReviewCount > 0) || false;

  return {
    id,
    title: rawLocation.title || 'Unknown Facility',
    lat,
    lng,
    address: rawLocation.address || 'Address not available',
    city: rawLocation.city || '',
    state: regionSlug, // Use region slug as state equivalent
    ukRegion: rawLocation.ukRegion || regionSlug,
    country: 'UK',
    categories,
    amenities,
    cost: rawLocation.cost || 'Contact for pricing',
    hours: rawLocation.hours || {},
    phone: rawLocation.phone || undefined,
    website: rawLocation.website || undefined,
    rating: parseFloat(rawLocation.rating) || undefined,
    verified,
    showerReviewCount: rawLocation.showerReviewCount || 0,
    businessType: rawLocation.businessType,
    access: rawLocation.access || 'Contact for access'
  };
}

/**
 * Load locations for a specific UK region
 */
export async function loadUKRegionLocations(regionSlug: string): Promise<MapLocation[]> {
  try {
    const response = await fetch(`/data/uk/${regionSlug}.json`);
    if (response.ok) {
      const regionData = await response.json();

      if (regionData.locations && Array.isArray(regionData.locations)) {
        const locations = regionData.locations
          .map((loc: any) => transformUKToMapLocation(loc, regionSlug))
          .filter((loc: MapLocation | null): loc is MapLocation => loc !== null);

        console.log(`Loaded ${locations.length} UK locations for ${regionSlug}`);
        return locations;
      }
    }
  } catch (error) {
    console.error(`Error loading UK data for ${regionSlug}:`, error);
  }

  return [];
}

/**
 * Get category-based pricing for Australia locations
 * Mirrors the logic in dataLoader.ts to ensure consistency between map and region pages
 */
function getAustraliaPricing(category: string): { cost: string; access: string } {
  const normalizedCategory = (category || '').toLowerCase();

  // FREE facilities
  if (
    normalizedCategory.includes('beach') ||
    normalizedCategory.includes('public shower') ||
    normalizedCategory.includes('surf club') ||
    normalizedCategory.includes('surf life saving') ||
    normalizedCategory.includes('surf lifesaving') ||
    normalizedCategory.includes('public bathroom') ||
    normalizedCategory.includes('public toilet') ||
    normalizedCategory.includes('promenade') ||
    normalizedCategory.includes('outdoor bath') ||
    normalizedCategory.includes('beach pavil') ||
    normalizedCategory.includes('homeless service') ||
    normalizedCategory.includes('homeless shelter') ||
    normalizedCategory.includes('park')
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
    normalizedCategory.includes('public pool') ||
    normalizedCategory.includes('lido')
  ) {
    return { cost: 'A$5-10', access: 'Casual Entry' };
  }

  // Gyms and fitness
  if (
    normalizedCategory.includes('gym') ||
    normalizedCategory.includes('fitness') ||
    normalizedCategory.includes('health club') ||
    normalizedCategory.includes('yoga') ||
    normalizedCategory.includes('pilates')
  ) {
    return { cost: 'A$15-25 day pass', access: 'Casual Visit' };
  }

  // YMCA
  if (normalizedCategory.includes('ymca')) {
    return { cost: 'A$10-20', access: 'Casual Visit' };
  }

  // Recreation/Sports centres
  if (
    normalizedCategory.includes('recreation') ||
    normalizedCategory.includes('sports centre') ||
    normalizedCategory.includes('sports center') ||
    normalizedCategory.includes('sports club') ||
    normalizedCategory.includes('stadium') ||
    normalizedCategory.includes('community center') ||
    normalizedCategory.includes('community centre')
  ) {
    return { cost: 'A$5-12', access: 'Casual Entry' };
  }

  // Hostels and Hotels
  if (
    normalizedCategory.includes('hostel') ||
    normalizedCategory.includes('backpacker') ||
    normalizedCategory.includes('hotel') ||
    normalizedCategory.includes('motel')
  ) {
    return { cost: 'A$5-10', access: 'Non-Guest Fee' };
  }

  // Caravan parks / Camping
  if (
    normalizedCategory.includes('caravan') ||
    normalizedCategory.includes('holiday park') ||
    normalizedCategory.includes('camping') ||
    normalizedCategory.includes('campsite') ||
    normalizedCategory.includes('campground')
  ) {
    return { cost: 'A$5-10', access: 'Day Visitor' };
  }

  // Truck stops / Rest stops
  if (
    normalizedCategory.includes('truck stop') ||
    normalizedCategory.includes('travel center') ||
    normalizedCategory.includes('travel centre') ||
    normalizedCategory.includes('rest area') ||
    normalizedCategory.includes('rest stop') ||
    normalizedCategory.includes('petrol station') ||
    normalizedCategory.includes('service station')
  ) {
    return { cost: 'A$5-10', access: 'Pay Per Use' };
  }

  // Day Spas / Wellness
  if (
    normalizedCategory.includes('day spa') ||
    normalizedCategory.includes('wellness') ||
    normalizedCategory.includes('massage spa') ||
    normalizedCategory.includes('massage therapist')
  ) {
    return { cost: 'A$30-60', access: 'Entry Fee' };
  }

  // Spas
  if (normalizedCategory.includes('spa') || normalizedCategory.includes('public bath')) {
    return { cost: 'A$20-50', access: 'Entry Fee' };
  }

  // Saunas
  if (normalizedCategory.includes('sauna')) {
    return { cost: 'A$15-30', access: 'Entry Fee' };
  }

  // Water parks
  if (normalizedCategory.includes('water park')) {
    return { cost: 'A$30-50', access: 'Entry Fee' };
  }

  // Swimming schools (lesson-based)
  if (
    normalizedCategory.includes('swimming school') ||
    normalizedCategory.includes('swim school') ||
    normalizedCategory.includes('swimming instructor')
  ) {
    return { cost: 'Lesson-based', access: 'Students Only' };
  }

  // Default
  return { cost: 'Contact for pricing', access: 'Contact for access' };
}

/**
 * Transform Australia location data to map format
 */
function transformAustraliaToMapLocation(rawLocation: any, stateSlug: string): MapLocation | null {
  const lat = parseFloat(rawLocation.lat);
  const lng = parseFloat(rawLocation.lng);

  if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
    return null;
  }

  const id = rawLocation.id ||
    (rawLocation.title || 'location').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + stateSlug;

  // Get categories
  const categories = Array.isArray(rawLocation.categories)
    ? rawLocation.categories
    : [rawLocation.businessType || 'Aquatic Centre'];

  // Get amenities
  const amenities = Array.isArray(rawLocation.amenities)
    ? rawLocation.amenities
    : rawLocation.amenities?.split('|').filter((a: string) => a.trim()) || ['Contact for amenities'];

  // Determine if verified
  const verified = (rawLocation.showerReviewCount && rawLocation.showerReviewCount > 0) || rawLocation.verified || false;

  // Apply category-based pricing if no specific pricing is set
  const currentCost = (rawLocation.cost || '').toLowerCase();
  let cost = rawLocation.cost || 'Contact for pricing';
  let access = rawLocation.access || 'Contact for access';

  if (!currentCost || currentCost.includes('contact') || currentCost === '') {
    // Get pricing based on businessType (most specific)
    const category = rawLocation.businessType || categories[0] || '';
    const pricing = getAustraliaPricing(category);
    cost = pricing.cost;
    access = pricing.access;
  }

  return {
    id,
    title: rawLocation.title || 'Unknown Facility',
    lat,
    lng,
    address: rawLocation.address || 'Address not available',
    city: rawLocation.city || '',
    state: stateSlug,
    country: 'Australia',
    categories,
    amenities,
    cost,
    hours: rawLocation.hours || {},
    phone: rawLocation.phone || undefined,
    website: rawLocation.website || undefined,
    rating: parseFloat(rawLocation.rating) || undefined,
    verified,
    showerReviewCount: rawLocation.showerReviewCount || 0,
    businessType: rawLocation.businessType,
    access
  };
}

/**
 * Load locations for a specific Australia state
 */
export async function loadAustraliaStateLocations(stateSlug: string): Promise<MapLocation[]> {
  try {
    const response = await fetch(`/data/australia/${stateSlug}.json`);
    if (response.ok) {
      const stateData = await response.json();

      if (stateData.locations && Array.isArray(stateData.locations)) {
        const locations = stateData.locations
          .map((loc: any) => transformAustraliaToMapLocation(loc, stateSlug))
          .filter((loc: MapLocation | null): loc is MapLocation => loc !== null);

        console.log(`Loaded ${locations.length} Australia locations for ${stateSlug}`);
        return locations;
      }
    }
  } catch (error) {
    console.error(`Error loading Australia data for ${stateSlug}:`, error);
  }

  return [];
}

/**
 * Search for locations near a coordinate
 */
export function findNearbyLocations(
  locations: MapLocation[], 
  lat: number, 
  lng: number, 
  radiusKm: number = 50
): MapLocation[] {
  return locations.filter(location => {
    const distance = calculateDistance(lat, lng, location.lat, location.lng);
    return distance <= radiusKm;
  }).sort((a, b) => {
    const distA = calculateDistance(lat, lng, a.lat, a.lng);
    const distB = calculateDistance(lat, lng, b.lat, b.lng);
    return distA - distB;
  });
}

/**
 * Calculate distance between two coordinates in kilometers
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Get bounds for a set of locations
 */
export function getLocationBounds(locations: MapLocation[]): [[number, number], [number, number]] | null {
  if (locations.length === 0) return null;
  
  let minLat = locations[0].lat;
  let maxLat = locations[0].lat;
  let minLng = locations[0].lng;
  let maxLng = locations[0].lng;
  
  locations.forEach(location => {
    minLat = Math.min(minLat, location.lat);
    maxLat = Math.max(maxLat, location.lat);
    minLng = Math.min(minLng, location.lng);
    maxLng = Math.max(maxLng, location.lng);
  });
  
  const latPadding = (maxLat - minLat) * 0.1;
  const lngPadding = (maxLng - minLng) * 0.1;
  
  return [
    [minLat - latPadding, minLng - lngPadding], 
    [maxLat + latPadding, maxLng + lngPadding]
  ];
}

/**
 * Get state name from code
 */
export function getStateName(stateCode: string): string {
  const stateNames: Record<string, string> = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
    'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
    'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
    'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
    'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
    'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
    'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
    'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
    'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
    'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
    'WI': 'Wisconsin', 'WY': 'Wyoming'
  };
  
  return stateNames[stateCode] || stateCode;
}