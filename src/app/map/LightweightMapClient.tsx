'use client';

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  Clock, 
  DollarSign, 
  Phone, 
  ExternalLink,
  Navigation,
  Loader2,
  Grid,
  List,
  ChevronDown,
  Star,
  BadgeCheck,
  Map as MapIcon
} from 'lucide-react';
import Link from 'next/link';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import { loadStateLocations } from './mapDataLoader';
import type { MapLocation } from './mapDataLoader';

// Dynamically import the map component to avoid SSR issues
const InteractiveMapComponent = dynamic(() => import('./InteractiveMapComponent'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg border p-12 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
      <p className="text-gray-600">Loading interactive map...</p>
    </div>
  )
});

// ============================================================================
// CONSTANTS
// ============================================================================

const US_STATES = [
  { code: 'AL', name: 'Alabama', region: 'Southeast' },
  { code: 'AK', name: 'Alaska', region: 'West' },
  { code: 'AZ', name: 'Arizona', region: 'Southwest' },
  { code: 'AR', name: 'Arkansas', region: 'South' },
  { code: 'CA', name: 'California', region: 'West' },
  { code: 'CO', name: 'Colorado', region: 'West' },
  { code: 'CT', name: 'Connecticut', region: 'Northeast' },
  { code: 'DE', name: 'Delaware', region: 'Northeast' },
  { code: 'FL', name: 'Florida', region: 'Southeast' },
  { code: 'GA', name: 'Georgia', region: 'Southeast' },
  { code: 'HI', name: 'Hawaii', region: 'West' },
  { code: 'ID', name: 'Idaho', region: 'West' },
  { code: 'IL', name: 'Illinois', region: 'Midwest' },
  { code: 'IN', name: 'Indiana', region: 'Midwest' },
  { code: 'IA', name: 'Iowa', region: 'Midwest' },
  { code: 'KS', name: 'Kansas', region: 'Midwest' },
  { code: 'KY', name: 'Kentucky', region: 'South' },
  { code: 'LA', name: 'Louisiana', region: 'South' },
  { code: 'ME', name: 'Maine', region: 'Northeast' },
  { code: 'MD', name: 'Maryland', region: 'Northeast' },
  { code: 'MA', name: 'Massachusetts', region: 'Northeast' },
  { code: 'MI', name: 'Michigan', region: 'Midwest' },
  { code: 'MN', name: 'Minnesota', region: 'Midwest' },
  { code: 'MS', name: 'Mississippi', region: 'South' },
  { code: 'MO', name: 'Missouri', region: 'Midwest' },
  { code: 'MT', name: 'Montana', region: 'West' },
  { code: 'NE', name: 'Nebraska', region: 'Midwest' },
  { code: 'NV', name: 'Nevada', region: 'West' },
  { code: 'NH', name: 'New Hampshire', region: 'Northeast' },
  { code: 'NJ', name: 'New Jersey', region: 'Northeast' },
  { code: 'NM', name: 'New Mexico', region: 'Southwest' },
  { code: 'NY', name: 'New York', region: 'Northeast' },
  { code: 'NC', name: 'North Carolina', region: 'Southeast' },
  { code: 'ND', name: 'North Dakota', region: 'Midwest' },
  { code: 'OH', name: 'Ohio', region: 'Midwest' },
  { code: 'OK', name: 'Oklahoma', region: 'South' },
  { code: 'OR', name: 'Oregon', region: 'West' },
  { code: 'PA', name: 'Pennsylvania', region: 'Northeast' },
  { code: 'RI', name: 'Rhode Island', region: 'Northeast' },
  { code: 'SC', name: 'South Carolina', region: 'Southeast' },
  { code: 'SD', name: 'South Dakota', region: 'Midwest' },
  { code: 'TN', name: 'Tennessee', region: 'South' },
  { code: 'TX', name: 'Texas', region: 'South' },
  { code: 'UT', name: 'Utah', region: 'West' },
  { code: 'VT', name: 'Vermont', region: 'Northeast' },
  { code: 'VA', name: 'Virginia', region: 'Southeast' },
  { code: 'WA', name: 'Washington', region: 'West' },
  { code: 'WV', name: 'West Virginia', region: 'Southeast' },
  { code: 'WI', name: 'Wisconsin', region: 'Midwest' },
  { code: 'WY', name: 'Wyoming', region: 'West' }
];

const CATEGORY_COLORS: Record<string, string> = {
  'YMCA': 'bg-red-100 text-red-800',
  'Gym': 'bg-purple-100 text-purple-800',
  'Public Pool': 'bg-blue-100 text-blue-800',
  'Swimming Pool': 'bg-blue-100 text-blue-800',
  'Truck Stop': 'bg-orange-100 text-orange-800',
  'Travel Center': 'bg-orange-100 text-orange-800',
  'Community Center': 'bg-green-100 text-green-800',
  'Community center': 'bg-green-100 text-green-800',
  'Recreation Center': 'bg-green-100 text-green-800',
  'Beach': 'bg-cyan-100 text-cyan-800',
  'Hostel': 'bg-pink-100 text-pink-800',
  'Club': 'bg-violet-100 text-violet-800',
  'State Park': 'bg-emerald-100 text-emerald-800',
  'Campground': 'bg-lime-100 text-lime-800',
  'Public Facility': 'bg-gray-100 text-gray-800',
  'default': 'bg-gray-100 text-gray-800'
};

// Add this helper function
const getStateSlug = (stateCode: string): string => {
  const stateSlugMap: Record<string, string> = {
    'AL': 'alabama', 'AK': 'alaska', 'AZ': 'arizona', 'AR': 'arkansas',
    'CA': 'california', 'CO': 'colorado', 'CT': 'connecticut', 'DE': 'delaware',
    'FL': 'florida', 'GA': 'georgia', 'HI': 'hawaii', 'ID': 'idaho',
    'IL': 'illinois', 'IN': 'indiana', 'IA': 'iowa', 'KS': 'kansas',
    'KY': 'kentucky', 'LA': 'louisiana', 'ME': 'maine', 'MD': 'maryland',
    'MA': 'massachusetts', 'MI': 'michigan', 'MN': 'minnesota', 'MS': 'mississippi',
    'MO': 'missouri', 'MT': 'montana', 'NE': 'nebraska', 'NV': 'nevada',
    'NH': 'new-hampshire', 'NJ': 'new-jersey', 'NM': 'new-mexico', 'NY': 'new-york',
    'NC': 'north-carolina', 'ND': 'north-dakota', 'OH': 'ohio', 'OK': 'oklahoma',
    'OR': 'oregon', 'PA': 'pennsylvania', 'RI': 'rhode-island', 'SC': 'south-carolina',
    'SD': 'south-dakota', 'TN': 'tennessee', 'TX': 'texas', 'UT': 'utah',
    'VT': 'vermont', 'VA': 'virginia', 'WA': 'washington', 'WV': 'west-virginia',
    'WI': 'wisconsin', 'WY': 'wyoming'
  };
  return stateSlugMap[stateCode] || stateCode.toLowerCase();
};

// Add this helper function to create URL slugs from titles
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

// ============================================================================
// TYPES
// ============================================================================

interface Filters {
  state: string;
  city: string;
  category: string;
  costType: 'all' | 'free' | 'paid';
  verifiedOnly: boolean;
  searchQuery: string;
}

type ViewMode = 'grid' | 'list' | 'map';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatHours(hours: Record<string, string>): string {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todayHours = hours[today];
  
  if (!todayHours) return 'Hours not available';
  if (todayHours.toLowerCase() === 'closed') return 'Closed today';
  
  return `Today: ${todayHours}`;
}

function locationMatchesFilters(location: MapLocation, filters: Filters): boolean {
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    const matchesSearch = 
      location.title.toLowerCase().includes(query) ||
      location.city.toLowerCase().includes(query) ||
      location.address.toLowerCase().includes(query);
    
    if (!matchesSearch) return false;
  }
  
  if (filters.city && location.city.toLowerCase() !== filters.city.toLowerCase()) {
    return false;
  }
  
  if (filters.category && !location.categories.includes(filters.category)) {
    return false;
  }
  
  if (filters.costType === 'free') {
    const isFree = location.cost.toLowerCase().includes('free') || 
                   location.cost.toLowerCase().includes('no charge') ||
                   location.cost === '$0';
    if (!isFree) return false;
  } else if (filters.costType === 'paid') {
    const isFree = location.cost.toLowerCase().includes('free') || 
                   location.cost.toLowerCase().includes('no charge') ||
                   location.cost === '$0';
    if (isFree) return false;
  }
  
  if (filters.verifiedOnly && !location.verified) {
    return false;
  }
  
  return true;
}

// ============================================================================
// COMPONENTS
// ============================================================================

function StateSelector({ selectedState, onStateSelect, onGetLocation, locationLoading }: {
  selectedState: string;
  onStateSelect: (state: string) => void;
  onGetLocation: () => void;
  locationLoading: boolean;
}) {
  return (
<div className="bg-white rounded-lg border p-6 mb-6">
  <div className="flex flex-col items-center text-center mb-6">
    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
      Select a State to Browse Locations
    </h2>

      {/* State Dropdown */}
  <div className="max-w-md mx-auto">
    <select
      id="state-select"
      value={selectedState}
      onChange={(e) => onStateSelect(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
    >
      <option value="">Select a state...</option>
      {US_STATES.map(state => (
        <option key={state.code} value={state.code}>
          {state.name}
        </option>
      ))}
    </select>
  </div>

    {selectedState && (
    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200 max-w-md mx-auto">
      <p className="text-sm text-blue-800 text-center">
        <span className="font-semibold">
          {US_STATES.find(s => s.code === selectedState)?.name}
        </span> selected. Use the view toggle to switch between map and list views.
      </p>
    </div>
  )}
  
    
    {/* Geolocation Button */}
    <button
      onClick={onGetLocation}
      disabled={locationLoading}
      className="flex items-center justify-center gap-2 px-4 py-2 mt-8 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors mb-0"
    >
      {locationLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Navigation className="h-4 w-4" />
      )}
      {locationLoading ? 'Getting Location...' : 'Use My Location'}
    </button>
  </div>
  


</div>
  );
}

function LocationCard({ location, viewMode }: { 
  location: MapLocation; 
  viewMode: ViewMode;
}) {
  const categoryColor = CATEGORY_COLORS[location.categories[0]] || CATEGORY_COLORS.default;
  
  if (viewMode === 'list') {
    return (
      <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {location.title}
            </h3>
            {location.verified && (
              <div className="flex items-center gap-1 mb-2">
                <BadgeCheck className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Verified</span>
              </div>
            )}
          </div>
          {location.rating && (
            <div className="flex items-center ml-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{location.rating}</span>
            </div>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              {location.address || `${location.city}, ${location.state}`}
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
              {location.cost}
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              {formatHours(location.hours)}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {location.categories.slice(0, 2).map((category, idx) => (
                <span 
                  key={idx}
                  className={`text-xs px-2 py-1 rounded ${categoryColor}`}
                >
                  {category}
                </span>
              ))}
            </div>
            
            {location.phone && (
              <div className="flex items-center text-gray-600 text-sm">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <a href={`tel:${location.phone}`} className="text-blue-600 hover:text-blue-700">
                  {location.phone}
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 mt-4 pt-3 border-t">
<Link
  href={`/usa/${getStateSlug(location.state)}/${createSlug(location.title)}/`}
  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium text-center transition-colors"
>
  View Details
</Link>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-medium text-center transition-colors flex items-center justify-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            Directions
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-base text-gray-900 leading-tight">
          {location.title}
        </h3>
        {location.verified && (
          <BadgeCheck className="h-4 w-4 text-green-600 flex-shrink-0 ml-2" />
        )}
      </div>
      
      <div className="text-sm text-gray-600 mb-2 flex items-center">
        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
        <span className="truncate">{location.city}, {location.state}</span>
      </div>
      
      <div className="text-sm font-medium text-gray-900 mb-3">
        {location.cost}
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {location.categories.slice(0, 2).map((category, idx) => (
          <span 
            key={idx}
            className={`text-xs px-2 py-1 rounded ${categoryColor}`}
          >
            {category}
          </span>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
<Link
  href={`/usa/${getStateSlug(location.state)}/${createSlug(location.title)}/`}
  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium text-center transition-colors"
>
  View Details
</Link>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-xs font-medium text-center transition-colors flex items-center justify-center gap-1"
        >
          <ExternalLink className="h-3 w-3" />
          Go
        </a>
      </div>
    </div>
  );
}

function FilterSidebar({ 
  filters, 
  setFilters, 
  uniqueCities, 
  uniqueCategories,
  filtersOpen,
  setFiltersOpen,
  clearFilters 
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  uniqueCities: string[];
  uniqueCategories: string[];
  filtersOpen: boolean;
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clearFilters: () => void;
}) {
  return (
    <div className="lg:w-80 space-y-6">
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </h3>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className={`space-y-4 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({...prev, searchQuery: e.target.value}))}
                placeholder="Search locations..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* City Filter */}
          {uniqueCities.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters(prev => ({...prev, city: e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Cities</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          )}

          {/* Category Filter */}
          {uniqueCategories.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facility Type
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          )}

          {/* Cost Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost
            </label>
            <select
              value={filters.costType}
              onChange={(e) => setFilters(prev => ({...prev, costType: e.target.value as any}))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Options</option>
              <option value="free">Free Only</option>
              <option value="paid">Paid Only</option>
            </select>
          </div>

          {/* Verified Only */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="verified"
              checked={filters.verifiedOnly}
              onChange={(e) => setFilters(prev => ({...prev, verifiedOnly: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="verified" className="ml-2 text-sm text-gray-700 flex items-center gap-1">
              <BadgeCheck className="h-4 w-4 text-green-600" />
              Verified Only
            </label>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function LightweightMapClient() {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number; accuracy: number} | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    state: '',
    city: '',
    category: '',
    costType: 'all',
    verifiedOnly: false,
    searchQuery: ''
  });
  
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Geolocation function
  const getCurrentLocation = useCallback(() => {
    console.log('Getting location clicked...'); // Debug
    setLocationLoading(true);
    setError(null); // Clear any previous errors
    
    if (!navigator.geolocation) {
      const errorMsg = 'Geolocation is not supported by this browser';
      console.error(errorMsg);
      setError(errorMsg);
      setLocationLoading(false);
      return;
    }

    console.log('Requesting geolocation permission...'); // Debug
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location success:', position.coords); // Debug
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setUserLocation(newLocation);
        setLocationLoading(false);
        
        // Auto-select state based on location (optional enhancement)
        // You could add logic here to determine which state the user is in
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMsg = 'Unable to get your location. ';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMsg += 'Location access was denied. Please enable location permissions in your browser.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMsg += 'Location request timed out. Please try again.';
            break;
          default:
            errorMsg += 'An unknown error occurred.';
            break;
        }
        
        setError(errorMsg);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // 15 seconds
        maximumAge: 300000 // 5 minutes
      }
    );
  }, []);

  // Parse URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');
    const search = params.get('search');
    const category = params.get('category');
    
    if (state || search || category) {
      setFilters(prev => ({
        ...prev,
        state: state || '',
        searchQuery: search || '',
        category: category || ''
      }));
    }
  }, []);

  // Load locations when state filter changes
  useEffect(() => {
    if (!filters.state) {
      setLocations([]);
      return;
    }
    
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const stateLocations = await loadStateLocations(filters.state);
        setLocations(stateLocations);
        
        if (stateLocations.length === 0) {
          setError(`No locations found for ${filters.state}`);
        }
      } catch (err) {
        setError('Failed to load location data');
        console.error('Error loading locations:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [filters.state]);

  // Filter and sort locations
  const filteredLocations = useMemo(() => {
    let filtered = locations.filter(location => 
      locationMatchesFilters(location, filters)
    );
    
    // Sort by verified first, then rating, then alphabetically
    filtered.sort((a, b) => {
      if (a.verified && !b.verified) return -1;
      if (!a.verified && b.verified) return 1;
      
      if (a.rating && b.rating) {
        if (a.rating !== b.rating) return b.rating - a.rating;
      }
      
      return a.title.localeCompare(b.title);
    });
    
    return filtered;
  }, [locations, filters]);

  // Get unique cities and categories for filters
  const uniqueCities = useMemo(() => {
    const cities = [...new Set(locations.map(loc => loc.city).filter(Boolean))];
    return cities.sort();
  }, [locations]);

  const uniqueCategories = useMemo(() => {
    const categories = [...new Set(locations.flatMap(loc => loc.categories))];
    return categories.sort();
  }, [locations]);

  const handleStateSelect = (stateCode: string) => {
    setFilters(prev => ({
      ...prev,
      state: stateCode,
      city: '', // Reset city when changing state
      category: ''
    }));
  };

  const clearFilters = () => {
    setFilters(prev => ({
      ...prev,
      city: '',
      category: '',
      costType: 'all',
      verifiedOnly: false,
      searchQuery: ''
    }));
  };

  return (
    <>
      <GlobalHeader />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* State Selection */}
          <StateSelector 
            selectedState={filters.state} 
            onStateSelect={handleStateSelect}
            onGetLocation={getCurrentLocation}
            locationLoading={locationLoading}
          />

          {/* Content Area */}
          {filters.state && (
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Sidebar - Filters */}
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                uniqueCities={uniqueCities}
                uniqueCategories={uniqueCategories}
                filtersOpen={filtersOpen}
                setFiltersOpen={setFiltersOpen}
                clearFilters={clearFilters}
              />

              {/* Main Content */}
              <div className="flex-1">
                
                {/* Results Header */}
                <div className="bg-white rounded-lg border p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Shower Locations in {US_STATES.find(s => s.code === filters.state)?.name}
                      </h2>
                      <p className="text-gray-600 text-sm mt-1">
                        {loading ? 'Loading...' : `${filteredLocations.length} locations found`}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewMode('map')}
                        className={`p-2 rounded ${viewMode === 'map' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                        title="Map view"
                      >
                        <MapIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                        title="List view"
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="bg-white rounded-lg border p-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading shower locations...</p>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                {/* Map View */}
                {!loading && !error && filteredLocations.length > 0 && viewMode === 'map' && (
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="p-4 border-b bg-gray-50">
                      <h3 className="text-lg font-semibold text-gray-900">Interactive Map</h3>
                      <p className="text-sm text-gray-600">
                        Explore {filteredLocations.length} locations on the map. Click markers for details.
                      </p>
                    </div>
                    <Suspense fallback={
                      <div className="p-12 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-600">Loading interactive map...</p>
                      </div>
                    }>
                      <InteractiveMapComponent 
                        locations={filteredLocations}
                        userLocation={userLocation}
                        height="600px"
                      />
                    </Suspense>
                  </div>
                )}

                {/* Grid/List View */}
                {!loading && !error && filteredLocations.length > 0 && viewMode !== 'map' && (
                  <div className={
                    viewMode === 'grid' 
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                      : 'space-y-4'
                  }>
                    {filteredLocations.map(location => (
                      <LocationCard 
                        key={location.id} 
                        location={location} 
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                )}

                {/* No Results */}
                {!loading && !error && filteredLocations.length === 0 && locations.length > 0 && (
                  <div className="bg-white rounded-lg border p-12 text-center">
                    <p className="text-gray-600 mb-4">No locations match your current filters.</p>
                    <button
                      onClick={clearFilters}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear filters to see all locations
                    </button>
                  </div>
                )}

                {/* Empty State */}
                {!loading && !error && locations.length === 0 && filters.state && (
                  <div className="bg-white rounded-lg border p-12 text-center">
                    <MapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No locations available</h3>
                    <p className="text-gray-600 mb-4">
                      We don't have shower location data for {US_STATES.find(s => s.code === filters.state)?.name} yet.
                    </p>
                    <p className="text-sm text-gray-500">
                      Try selecting a different state or check back later.
                    </p>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </main>
      
      <GlobalFooter />
    </>
  );
}