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
import Image from 'next/image';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import { loadStateLocations, loadUKRegionLocations, loadAustraliaStateLocations } from './mapDataLoader';
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

const UK_REGIONS = [
  { code: 'london', name: 'London', region: 'England' },
  { code: 'south-east', name: 'South East', region: 'England' },
  { code: 'south-west', name: 'South West', region: 'England' },
  { code: 'east-of-england', name: 'East of England', region: 'England' },
  { code: 'east-midlands', name: 'East Midlands', region: 'England' },
  { code: 'west-midlands', name: 'West Midlands', region: 'England' },
  { code: 'yorkshire', name: 'Yorkshire', region: 'England' },
  { code: 'north-west', name: 'North West', region: 'England' },
  { code: 'north-east', name: 'North East', region: 'England' },
  { code: 'scotland', name: 'Scotland', region: 'Scotland' },
  { code: 'wales', name: 'Wales', region: 'Wales' },
  { code: 'northern-ireland', name: 'Northern Ireland', region: 'Northern Ireland' }
];

const AUSTRALIA_STATES = [
  { code: 'new-south-wales', name: 'New South Wales', region: 'Eastern' },
  { code: 'victoria', name: 'Victoria', region: 'Eastern' },
  { code: 'queensland', name: 'Queensland', region: 'Eastern' },
  { code: 'western-australia', name: 'Western Australia', region: 'Western' },
  { code: 'south-australia', name: 'South Australia', region: 'Central' },
  { code: 'tasmania', name: 'Tasmania', region: 'Eastern' },
  { code: 'northern-territory', name: 'Northern Territory', region: 'Northern' },
  { code: 'australian-capital-territory', name: 'ACT', region: 'Eastern' }
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
  country: 'usa' | 'uk' | 'australia' | '';
  state: string; // US state code, UK region slug, or Australia state slug
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

function RegionSelector({
  selectedCountry,
  selectedRegion,
  onCountrySelect,
  onRegionSelect,
  onGetLocation,
  locationLoading
}: {
  selectedCountry: string;
  selectedRegion: string;
  onCountrySelect: (country: 'usa' | 'uk' | 'australia') => void;
  onRegionSelect: (region: string) => void;
  onGetLocation: () => void;
  locationLoading: boolean;
}) {
  const getSelectedName = () => {
    if (selectedCountry === 'usa') {
      return US_STATES.find(s => s.code === selectedRegion)?.name;
    } else if (selectedCountry === 'uk') {
      return UK_REGIONS.find(r => r.code === selectedRegion)?.name;
    } else if (selectedCountry === 'australia') {
      return AUSTRALIA_STATES.find(s => s.code === selectedRegion)?.name;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border p-6 mb-6">
      <div className="flex flex-col items-center text-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          Select a Location to Browse
        </h2>

        {/* Country Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => onCountrySelect('usa')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCountry === 'usa'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🇺🇸 USA
          </button>
          <button
            onClick={() => onCountrySelect('uk')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCountry === 'uk'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🇬🇧 UK
          </button>
          <button
            onClick={() => onCountrySelect('australia')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCountry === 'australia'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🇦🇺 Australia
          </button>
        </div>

        {/* Region Dropdown */}
        <div className="max-w-md mx-auto w-full">
          <select
            id="region-select"
            value={selectedRegion}
            onChange={(e) => onRegionSelect(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {selectedCountry === 'usa' ? (
              <>
                <option value="">Select a state...</option>
                {US_STATES.map(state => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </>
            ) : selectedCountry === 'uk' ? (
              <>
                <option value="">Select a region...</option>
                {UK_REGIONS.map(region => (
                  <option key={region.code} value={region.code}>
                    {region.name}
                  </option>
                ))}
              </>
            ) : selectedCountry === 'australia' ? (
              <>
                <option value="">Select a state or territory...</option>
                {AUSTRALIA_STATES.map(state => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="">Select a country first...</option>
            )}
          </select>
        </div>

        {selectedRegion && (
          <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200 max-w-md mx-auto">
            <p className="text-sm text-blue-800 text-center">
              <span className="font-semibold">{getSelectedName()}</span> selected.
              Use the view toggle to switch between map and list views.
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

function LocationCard({ location, viewMode, country }: {
  location: MapLocation;
  viewMode: ViewMode;
  country: 'usa' | 'uk' | 'australia';
}) {
  const categoryColor = CATEGORY_COLORS[location.categories[0]] || CATEGORY_COLORS.default;

  // Build the correct URL based on country
  const getLocationUrl = () => {
    if (country === 'uk') {
      return `/uk/${location.ukRegion || location.state}/${createSlug(location.title)}/`;
    } else if (country === 'australia') {
      return `/australia/${location.state}/${createSlug(location.title)}/`;
    }
    return `/usa/${getStateSlug(location.state)}/${createSlug(location.title)}/`;
  };

  const locationLabel = country === 'uk'
    ? `${location.city}, ${location.ukRegion || location.state}`
    : country === 'australia'
    ? `${location.city}, ${location.state}`
    : `${location.city}, ${location.state}`;

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
              {location.address || locationLabel}
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
            href={getLocationUrl()}
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
        <span className="truncate">{locationLabel}</span>
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
          href={getLocationUrl()}
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
    country: 'usa',
    state: '',
    city: '',
    category: '',
    costType: 'all',
    verifiedOnly: false,
    searchQuery: ''
  });
  
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Reverse geocode to find user's region
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=5`,
        {
          headers: {
            'User-Agent': 'ShowerMap/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Geocoding failed');
      }

      const data = await response.json();
      const address = data.address || {};
      const countryCode = address.country_code?.toLowerCase();

      // Determine country and region
      if (countryCode === 'us') {
        const stateCode = address.state ? getStateCodeFromName(address.state) : null;
        if (stateCode) {
          setFilters(prev => ({ ...prev, country: 'usa', state: stateCode }));
        }
      } else if (countryCode === 'gb') {
        const ukRegion = getUKRegionFromAddress(address);
        if (ukRegion) {
          setFilters(prev => ({ ...prev, country: 'uk', state: ukRegion }));
        }
      } else if (countryCode === 'au') {
        const auState = getAustraliaStateFromAddress(address);
        if (auState) {
          setFilters(prev => ({ ...prev, country: 'australia', state: auState }));
        }
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      // Still set user location even if geocoding fails
    }
  };

  // Helper to get US state code from state name
  const getStateCodeFromName = (stateName: string): string | null => {
    const state = US_STATES.find(s =>
      s.name.toLowerCase() === stateName.toLowerCase()
    );
    return state?.code || null;
  };

  // Helper to determine UK region from address
  const getUKRegionFromAddress = (address: Record<string, string>): string | null => {
    const region = address.state || address.county || address.city || '';
    const regionLower = region.toLowerCase();

    // Map common regions
    if (regionLower.includes('london') || regionLower.includes('greater london')) return 'london';
    if (regionLower.includes('scotland')) return 'scotland';
    if (regionLower.includes('wales')) return 'wales';
    if (regionLower.includes('northern ireland')) return 'northern-ireland';
    if (regionLower.includes('yorkshire')) return 'yorkshire';
    if (regionLower.includes('manchester') || regionLower.includes('liverpool') || regionLower.includes('lancashire')) return 'north-west';
    if (regionLower.includes('birmingham') || regionLower.includes('west midlands')) return 'west-midlands';
    if (regionLower.includes('nottingham') || regionLower.includes('leicester') || regionLower.includes('derby')) return 'east-midlands';
    if (regionLower.includes('cambridge') || regionLower.includes('norfolk') || regionLower.includes('suffolk')) return 'east-of-england';
    if (regionLower.includes('newcastle') || regionLower.includes('durham') || regionLower.includes('tyne')) return 'north-east';
    if (regionLower.includes('brighton') || regionLower.includes('kent') || regionLower.includes('surrey') || regionLower.includes('sussex')) return 'south-east';
    if (regionLower.includes('bristol') || regionLower.includes('devon') || regionLower.includes('cornwall') || regionLower.includes('somerset')) return 'south-west';

    return 'london'; // Default to London
  };

  // Helper to determine Australia state from address
  const getAustraliaStateFromAddress = (address: Record<string, string>): string | null => {
    const state = address.state || '';
    const stateLower = state.toLowerCase();

    if (stateLower.includes('new south wales') || stateLower === 'nsw') return 'new-south-wales';
    if (stateLower.includes('victoria') || stateLower === 'vic') return 'victoria';
    if (stateLower.includes('queensland') || stateLower === 'qld') return 'queensland';
    if (stateLower.includes('western australia') || stateLower === 'wa') return 'western-australia';
    if (stateLower.includes('south australia') || stateLower === 'sa') return 'south-australia';
    if (stateLower.includes('tasmania') || stateLower === 'tas') return 'tasmania';
    if (stateLower.includes('northern territory') || stateLower === 'nt') return 'northern-territory';
    if (stateLower.includes('australian capital territory') || stateLower === 'act') return 'australian-capital-territory';

    return 'new-south-wales'; // Default
  };

  // Geolocation function
  const getCurrentLocation = useCallback(() => {
    setLocationLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setUserLocation(newLocation);

        // Reverse geocode to find the user's region
        await reverseGeocode(newLocation.lat, newLocation.lng);

        setLocationLoading(false);
      },
      (error) => {
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
        timeout: 15000,
        maximumAge: 300000
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

  // Load locations when country or region changes
  useEffect(() => {
    if (!filters.state || !filters.country) {
      setLocations([]);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        let loadedLocations: MapLocation[] = [];

        if (filters.country === 'usa') {
          loadedLocations = await loadStateLocations(filters.state);
        } else if (filters.country === 'uk') {
          loadedLocations = await loadUKRegionLocations(filters.state);
        } else if (filters.country === 'australia') {
          loadedLocations = await loadAustraliaStateLocations(filters.state);
        }

        setLocations(loadedLocations);

        if (loadedLocations.length === 0) {
          let regionName: string | undefined;
          if (filters.country === 'usa') {
            regionName = US_STATES.find(s => s.code === filters.state)?.name;
          } else if (filters.country === 'uk') {
            regionName = UK_REGIONS.find(r => r.code === filters.state)?.name;
          } else if (filters.country === 'australia') {
            regionName = AUSTRALIA_STATES.find(s => s.code === filters.state)?.name;
          }
          setError(`No locations found for ${regionName || filters.state}`);
        }
      } catch (err) {
        setError('Failed to load location data');
        console.error('Error loading locations:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters.state, filters.country]);

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

  const handleCountrySelect = (country: 'usa' | 'uk' | 'australia') => {
    setFilters(prev => ({
      ...prev,
      country,
      state: '', // Reset region when changing country
      city: '',
      category: ''
    }));
  };

  const handleRegionSelect = (regionCode: string) => {
    setFilters(prev => ({
      ...prev,
      state: regionCode,
      city: '',
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

      {/* Hero Banner */}
      <section className="relative h-32 md:h-40 overflow-hidden">
        <Image
          src="/images/william-rudolph-FwbSDeJm4hI-unsplash.jpg"
          alt="Find public showers worldwide"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-3">
              <MapIcon className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Interactive Shower Map</h1>
                <p className="text-blue-100 text-sm md:text-base">Find public showers across the USA, UK, and Australia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          {/* Country & Region Selection */}
          <RegionSelector
            selectedCountry={filters.country}
            selectedRegion={filters.state}
            onCountrySelect={handleCountrySelect}
            onRegionSelect={handleRegionSelect}
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
                        Shower Locations in {
                          filters.country === 'usa'
                            ? US_STATES.find(s => s.code === filters.state)?.name
                            : filters.country === 'uk'
                            ? UK_REGIONS.find(r => r.code === filters.state)?.name
                            : AUSTRALIA_STATES.find(s => s.code === filters.state)?.name
                        }
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
                        country={filters.country}
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
                        country={filters.country as 'usa' | 'uk' | 'australia'}
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
                      We don't have shower location data for {
                        filters.country === 'usa'
                          ? US_STATES.find(s => s.code === filters.state)?.name
                          : filters.country === 'uk'
                          ? UK_REGIONS.find(r => r.code === filters.state)?.name
                          : AUSTRALIA_STATES.find(s => s.code === filters.state)?.name
                      } yet.
                    </p>
                    <p className="text-sm text-gray-500">
                      Try selecting a different {filters.country === 'usa' ? 'state' : 'region'} or check back later.
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