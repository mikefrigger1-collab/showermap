// Enhanced types for ShowerMap.com

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type ShowerCategory = 
  | 'YMCA' 
  | 'Gym' 
  | 'Public Pool' 
  | 'Beach' 
  | 'Truck Stop' 
  | 'Community Center'
  | 'Recreation Center'
  | 'Hostel'
  | 'University'
  | 'Religious Organization'
  | 'Homeless Services'
  | 'State Park'
  | 'Campground'
  | 'Travel Center';

export type ShowerAmenity = 
  | 'Hot Water'
  | 'Towels'
  | 'Soap'
  | 'Shampoo'
  | 'Lockers'
  | 'Accessible'
  | 'Family Rooms'
  | 'Outdoor'
  | 'Private Stalls'
  | 'Hair Dryer'
  | 'Changing Area'
  | '24 Hour Access'
  | 'Security'
  | 'Parking';

export type AccessType = 
  | 'Public Access'
  | 'Day Pass'
  | 'Membership Required'
  | 'Guest Pass'
  | 'Student ID'
  | 'Fee Required'
  | 'Donation Suggested'
  | 'Emergency Only';

export interface OperatingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  // Optional fields for more detailed hours
  holidays?: string;
  notes?: string;
  seasonalHours?: {
    summer?: Partial<Record<DayOfWeek, string>>;
    winter?: Partial<Record<DayOfWeek, string>>;
  };
}

export interface ShowerLocation {
  id: string;
  title: string;
  street: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  website?: string;
  content: string;
  categories: ShowerCategory[];
  amenities: ShowerAmenity[];
  cost: string;
  access: AccessType;
  hours: OperatingHours;
  rating?: number;
  reviewCount?: number;
  lastUpdated: string;
  slug: string;
  // Additional useful fields
  verified?: boolean; // Has this location been verified recently?
  temporarilyClosed?: boolean;
  images?: string[]; // URLs to facility images
  safetyRating?: number; // 1-5 safety score
  cleanlinessRating?: number; // 1-5 cleanliness score
}

export interface ShowerData {
  locations: ShowerLocation[];
  lastUpdated: string;
  totalLocations: number;
  version?: string; // Data schema version
}

export interface LocationParams {
  country: string;
  region?: string;
  city?: string;
  location?: string;
}

// Enhanced filter types
export interface ShowerFilters {
  categories?: ShowerCategory[];
  amenities?: ShowerAmenity[];
  cost?: 'free' | 'paid' | 'all';
  access?: AccessType[];
  rating?: number;
  openNow?: boolean;
  verified?: boolean;
  accessible?: boolean;
  maxDistance?: number; // km radius
  priceRange?: {
    min?: number;
    max?: number;
  };
}

export interface SearchResult {
  location: ShowerLocation;
  distance?: number; // km from search point
  score?: number; // search relevance score
  matchedTerms?: string[]; // which search terms matched
}

// Utility types for grouping and aggregation
export interface CityGroup {
  city: string;
  region: string;
  country: string;
  locations: ShowerLocation[];
  count: number;
}

export interface RegionGroup {
  region: string;
  country: string;
  cities: CityGroup[];
  totalLocations: number;
}

export interface CountryGroup {
  country: string;
  regions: RegionGroup[];
  totalLocations: number;
}

// API response types (for when you add backend endpoints)
export interface ShowerLocationResponse {
  success: boolean;
  data: ShowerLocation;
  lastUpdated: string;
}

export interface ShowerSearchResponse {
  success: boolean;
  data: SearchResult[];
  total: number;
  page?: number;
  limit?: number;
  filters?: ShowerFilters;
}

// Form types for adding/editing locations
export interface ShowerLocationForm {
  title: string;
  street: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  website?: string;
  content: string;
  categories: ShowerCategory[];
  amenities: ShowerAmenity[];
  cost: string;
  access: AccessType;
  hours: OperatingHours;
}