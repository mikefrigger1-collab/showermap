// app/map/mapDataLoader.ts

export interface MapLocation {
  id: string;
  title: string;
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
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
  
  // Parse hours string like "Open ⋅ Closes 5:30 pm Thursday8 am–5:30 pmFriday8 am–5:30 pm..."
  days.forEach(day => {
    const dayRegex = new RegExp(`${day}([^A-Z]+)`, 'i');
    const match = hoursString.match(dayRegex);
    
    if (match && match[1]) {
      let hourStr = match[1].trim();
      // Clean up common patterns
      if (hourStr.toLowerCase() === 'closed') {
        hours[day.toLowerCase()] = 'Closed';
      } else if (hourStr.includes('–') || hourStr.includes('-')) {
        // Extract time range
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
  
  // Remove non-alphanumeric characters except spaces, commas, and hyphens
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
  
  // Remove quotes and clean up artifacts
  const cleaned = city
    .replace(/['"]/g, '')
    .replace(/\ba\s+/g, '') // Remove leading "a"
    .replace(/neighborhood gem.*$/i, '') // Remove descriptive text
    .replace(/\s+/g, ' ')
    .trim();
  
  // If city looks invalid (too short or contains odd characters), return empty
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
  
  // Split by comma and get the part before the state
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

/**
 * Consolidate similar categories into standard ones
 */
function consolidateCategory(category: string): string | null {
  const normalizedCategory = category.toLowerCase().trim();
  
  // Remove unwanted categories
  if (normalizedCategory.includes('gay') && normalizedCategory.includes('lesbian')) {
    return null;
  }
  
  // Consolidation mappings
  if (normalizedCategory.includes('ymca')) return 'YMCA';
  if (normalizedCategory.includes('gym') || normalizedCategory === 'fitness center' || normalizedCategory === 'boxing gym' || normalizedCategory === 'rock climbing gym') return 'Gym';
  if (normalizedCategory.includes('community center')) return 'Community Center';
  if (normalizedCategory.includes('recreation center')) return 'Recreation Center';
  if (normalizedCategory.includes('truck stop')) return 'Truck Stop';
  if (normalizedCategory.includes('pool') || normalizedCategory === 'aquatic center' || normalizedCategory === 'swimming facility') return 'Swimming Pool';
  if (normalizedCategory === 'hostel') return 'Hostel';
  if (normalizedCategory === 'state park' || normalizedCategory === 'park') return 'Park';
  if (normalizedCategory.includes('child care') || normalizedCategory === 'preschool' || normalizedCategory === 'children\'s camp') return 'Child Care';
  if (normalizedCategory === 'non-profit organization' || normalizedCategory === 'social services organization' || normalizedCategory === 'youth organization') return 'Community Services';
  if (normalizedCategory === 'petrol station') return 'Gas Station';
  
  // Default mappings
  return 'Public Facility';
}
  
// Parse categories - split comma-separated values and consolidate
const categoriesSet = new Set<string>();

// Add businessType
if (rawLocation.businessType) {
  const consolidated = consolidateCategory(rawLocation.businessType);
  if (consolidated) categoriesSet.add(consolidated);
}

// Split and add category field
if (rawLocation.category) {
  const categoryValues = rawLocation.category.split(',');
  categoryValues.forEach((cat: string) => {
    const consolidated = consolidateCategory(cat);
    if (consolidated && consolidated !== consolidateCategory(rawLocation.businessType)) {
      categoriesSet.add(consolidated);
    }
  });
}

// Convert Set to array
let categories = Array.from(categoriesSet);

// Add default if no categories found
if (categories.length === 0) {
  categories.push('Public Facility');
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
  
  // Get city - try to clean the city field first, then extract from address
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
    categories,
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
  
  // List of state codes to load (based on your file structure)
  const stateCodes = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  
  // Try to load each state's data
  const loadPromises = stateCodes.map(async (stateCode) => {
    try {
      const response = await fetch(`/data/states/${stateCode}.json`);
      if (response.ok) {
        const stateData: StateData = await response.json();
        
        if (stateData.locations && Array.isArray(stateData.locations)) {
          // Transform each location to our map format
          const stateLocations = stateData.locations
            .map((loc: any) => transformToMapLocation(loc, stateCode))
            .filter((loc): loc is MapLocation => loc !== null); // Filter out null values
          
          return stateLocations;
        }
      }
    } catch (error) {
      console.warn(`Could not load data for ${stateCode}:`, error);
    }
    return [];
  });
  
  // Wait for all states to load
  const results = await Promise.all(loadPromises);
  
  // Flatten all results into a single array
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
          .filter((loc): loc is MapLocation => loc !== null);
        
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
  const R = 6371; // Earth's radius in km
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
  
  // Add some padding
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