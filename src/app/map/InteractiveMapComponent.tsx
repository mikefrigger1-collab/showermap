// app/map/InteractiveMapComponent.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Clock,
  DollarSign,
  Phone,
  BadgeCheck,
  Star,
  Users
} from 'lucide-react';
import Link from 'next/link';
import type { MapLocation } from './mapDataLoader';

// Fix Leaflet default marker icons
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

// ============================================================================
// TYPES
// ============================================================================

interface UserLocation {
  lat: number;
  lng: number;
  accuracy: number;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  userLocation?: UserLocation | null;
  height?: string;
  country?: 'usa' | 'uk' | 'australia' | '';
}

interface Cluster {
  id: string;
  lat: number;
  lng: number;
  count: number;
  locations: MapLocation[];
}

// ============================================================================
// CONSTANTS
// ============================================================================

const CATEGORY_COLORS: Record<string, string> = {
  'YMCA': '#dc2626',
  'Gym': '#7c3aed',
  'Public Pool': '#0891b2',
  'Swimming Pool': '#0891b2',
  'Truck Stop': '#ea580c',
  'Travel Center': '#ea580c',
  'Community Center': '#059669',
  'Community center': '#059669',
  'Recreation Center': '#059669',
  'Beach': '#0284c7',
  'Hostel': '#c026d3',
  'Club': '#a21caf',
  'State Park': '#16a34a',
  'Campground': '#15803d',
  'Public Facility': '#2563eb',
  'default': '#6b7280'
};

const CLUSTERING_ZOOM_THRESHOLD = 11;

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
// HELPER FUNCTIONS
// ============================================================================

/**
 * Create a custom marker icon with category-based colors
 */
function createMarkerIcon(category: string, verified: boolean = false): L.DivIcon {
  // Use category color, fallback to default gray
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS['default'];

  return L.divIcon({
    html: `
      <div style="
        position: relative;
        width: 28px;
        height: 36px;
      ">
        <div style="
          background-color: ${color};
          width: 28px;
          height: 28px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          position: absolute;
          top: 0;
          left: 0;
        "></div>
        ${verified ? `
          <div style="
            position: absolute;
            top: -4px;
            right: -4px;
            background-color: #10b981;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
          ">
            <span style="color: white; font-size: 9px; font-weight: bold;">✓</span>
          </div>
        ` : ''}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
}

/**
 * Create cluster icon
 */
function createClusterIcon(count: number): L.DivIcon {
  const size = count < 10 ? 30 : count < 50 ? 40 : 50;
  const color = count < 10 ? '#10b981' : count < 50 ? '#3b82f6' : '#ef4444';
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        color: white;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: ${size < 40 ? '12px' : '14px'};
        border: 2px solid white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      ">
        ${count}
      </div>
    `,
    className: 'cluster-div-icon',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

/**
 * Simple clustering algorithm without external dependencies
 */
function createClusters(locations: MapLocation[], zoom: number, bounds: L.LatLngBounds): (MapLocation | Cluster)[] {
  // Don't cluster at high zoom levels
  if (zoom >= CLUSTERING_ZOOM_THRESHOLD) {
    return locations.filter(loc => bounds.contains([loc.lat, loc.lng]));
  }
  
  // Filter locations within bounds
  const visibleLocations = locations.filter(loc =>
    bounds.contains([loc.lat, loc.lng])
  );

  // Simple grid-based clustering
  const clusters: Map<string, Cluster> = new Map();
  const processed = new Set<string>();

  // Grid size based on zoom level
  const gridSize = Math.max(0.01, 1 / Math.pow(2, zoom - 2));

  visibleLocations.forEach(location => {
    if (processed.has(location.id)) return;

    const gridX = Math.floor(location.lng / gridSize);
    const gridY = Math.floor(location.lat / gridSize);
    const gridKey = `${gridX},${gridY}`;

    if (!clusters.has(gridKey)) {
      // Find all nearby locations for this cluster
      const clusterLocations = visibleLocations.filter(loc => {
        const locGridX = Math.floor(loc.lng / gridSize);
        const locGridY = Math.floor(loc.lat / gridSize);
        return Math.abs(locGridX - gridX) <= 1 && Math.abs(locGridY - gridY) <= 1;
      });

      if (clusterLocations.length > 1) {
        // Create cluster
        const clusterLat = clusterLocations.reduce((sum, loc) => sum + loc.lat, 0) / clusterLocations.length;
        const clusterLng = clusterLocations.reduce((sum, loc) => sum + loc.lng, 0) / clusterLocations.length;

        const cluster: Cluster = {
          id: `cluster-${gridKey}`,
          lat: clusterLat,
          lng: clusterLng,
          count: clusterLocations.length,
          locations: clusterLocations
        };

        clusters.set(gridKey, cluster);
        clusterLocations.forEach(loc => processed.add(loc.id));
      }
    }
  });

  // Combine clusters and unclustered locations
  const result: (MapLocation | Cluster)[] = [];

  // Add clusters
  clusters.forEach(cluster => result.push(cluster));

  // Add unclustered locations
  visibleLocations.forEach(location => {
    if (!processed.has(location.id)) {
      result.push(location);
    }
  });

  return result;
}

/**
 * Check if item is a cluster
 */
function isCluster(item: MapLocation | Cluster): item is Cluster {
  return 'count' in item && 'locations' in item;
}

/**
 * Format operating hours for display
 */
function formatHours(hours: Record<string, string>): string {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todayHours = hours[today];

  if (!todayHours) return 'Hours vary';
  if (todayHours.toLowerCase() === 'closed') return 'Closed today';

  // Clean up hours display
  const cleaned = todayHours
    .replace(/&ndash;/g, '-')
    .replace(/&#8211;/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned || 'Hours vary';
}

/**
 * Get the correct URL path for a location based on its country
 */
function getLocationUrl(location: MapLocation): string {
  // Determine country slug
  const country = (location.country || 'USA').toLowerCase();
  let countrySlug = 'usa';

  if (country === 'uk' || country === 'united kingdom' || country.includes('britain')) {
    countrySlug = 'uk';
  } else if (country === 'australia' || country === 'au') {
    countrySlug = 'australia';
  }

  // Determine region slug based on country
  let regionSlug = '';

  if (countrySlug === 'usa') {
    // USA uses state codes
    regionSlug = getStateSlug(location.state);
  } else if (countrySlug === 'uk') {
    // UK uses ukRegion field or province
    regionSlug = (location as any).ukRegion || location.state?.toLowerCase().replace(/\s+/g, '-') || 'london';
  } else if (countrySlug === 'australia') {
    // Australia uses state names as slugs
    regionSlug = location.state?.toLowerCase().replace(/\s+/g, '-') || 'queensland';
  }

  // Use existing slug if available, otherwise create from title
  const locationSlug = location.slug || createSlug(location.title);

  return `/${countrySlug}/${regionSlug}/${locationSlug}/`;
}

/**
 * Get map bounds for locations
 */
function getLocationBounds(locations: MapLocation[]): L.LatLngBounds | null {
  if (locations.length === 0) return null;
  
  const bounds = new L.LatLngBounds([locations[0].lat, locations[0].lng], [locations[0].lat, locations[0].lng]);
  
  locations.forEach(location => {
    bounds.extend([location.lat, location.lng]);
  });
  
  return bounds;
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Map event handler to track zoom and bounds changes
 */
function MapEventHandler({ 
  onZoomChange,
  onBoundsChange 
}: { 
  onZoomChange: (zoom: number) => void;
  onBoundsChange: (bounds: L.LatLngBounds) => void;
}) {
  const map = useMap();
  
  useEffect(() => {
    const handleChange = () => {
      onZoomChange(map.getZoom());
      onBoundsChange(map.getBounds());
    };
    
    map.on('zoomend', handleChange);
    map.on('moveend', handleChange);
    
    // Initial values
    handleChange();
    
    return () => {
      map.off('zoomend', handleChange);
      map.off('moveend', handleChange);
    };
  }, [map, onZoomChange, onBoundsChange]);
  
  return null;
}

/**
 * Location popup content
 */
function LocationPopup({ location }: { location: MapLocation }) {
  if (!location || !location.title) {
    return <div className="p-2 text-gray-500">Location data unavailable</div>;
  }

  // Check if location is free
  const costLower = (location.cost || '').toLowerCase();
  const isFree = costLower === 'free' || costLower.includes('free');

  // Get category color for accent
  const categoryColor = CATEGORY_COLORS[location.categories[0]] || CATEGORY_COLORS['default'];

  return (
    <div className="min-w-[280px] max-w-[320px]">
      <div className="p-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-base leading-tight text-gray-900">{location.title}</h3>
          {location.verified && (
            <span title="Verified location" className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded-full">
              <BadgeCheck className="h-3 w-3" />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Address */}
        <div className="text-sm text-gray-600 mb-3">
          {location.address || `${location.city}, ${location.state}`}
        </div>

        {/* Cost - Prominent display */}
        <div className="mb-3">
          {isFree ? (
            <span className="inline-flex items-center gap-1 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              <DollarSign className="h-4 w-4" />
              FREE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              <DollarSign className="h-4 w-4 text-gray-500" />
              {location.cost || 'Contact for pricing'}
            </span>
          )}
        </div>

        {/* Quick info grid */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          {/* Hours */}
          <div className="flex items-center gap-1.5 text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{formatHours(location.hours)}</span>
          </div>

          {/* Rating */}
          {location.rating ? (
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{location.rating}</span>
            </div>
          ) : null}

          {/* Phone */}
          {location.phone && (
            <div className="flex items-center gap-1.5 col-span-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <a href={`tel:${location.phone}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                {location.phone}
              </a>
            </div>
          )}
        </div>

        {/* Categories */}
        {location.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {location.categories.slice(0, 3).map((category, idx) => {
              const catColor = CATEGORY_COLORS[category] || CATEGORY_COLORS['default'];
              return (
                <span
                  key={idx}
                  className="text-xs font-medium px-2 py-1 rounded"
                  style={{ backgroundColor: `${catColor}15`, color: catColor }}
                >
                  {category}
                </span>
              );
            })}
          </div>
        )}

        {/* Amenities */}
        {location.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {location.amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
              >
                {amenity}
              </span>
            ))}
            {location.amenities.length > 4 && (
              <span className="text-xs text-gray-500">
                +{location.amenities.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
          <Link
            href={getLocationUrl(location)}
            className="flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
            style={{ color: 'white' }}
          >
            Details
          </Link>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
            style={{ color: '#1f2937' }}
          >
            Directions
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Cluster popup content
 */
function ClusterPopup({ cluster, onZoomToCluster }: { 
  cluster: Cluster; 
  onZoomToCluster: () => void;
}) {
  return (
    <div className="p-2 min-w-[250px]">
      <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
        <Users className="h-4 w-4" />
        {cluster.count} Locations
      </h3>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {cluster.locations.slice(0, 5).map((loc, idx) => (
          <div key={idx} className="text-sm py-1 border-b last:border-0">
            <div className="font-medium">{loc.title}</div>
            <div className="text-xs text-gray-600">{loc.city}, {loc.state}</div>
          </div>
        ))}
        {cluster.count > 5 && (
          <div className="text-xs text-gray-500 pt-1">
            ...and {cluster.count - 5} more
          </div>
        )}
      </div>
      <button
        onClick={onZoomToCluster}
        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
      >
        Zoom In to See Individual Locations
      </button>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

// Default map centers for each country
const COUNTRY_CENTERS: Record<string, { center: [number, number]; zoom: number }> = {
  usa: { center: [39.8283, -98.5795], zoom: 4 },
  uk: { center: [54.5, -2.5], zoom: 6 },
  australia: { center: [-25.2744, 133.7751], zoom: 4 },
};

export default function InteractiveMapComponent({
  locations,
  userLocation,
  height = '500px',
  country = 'usa'
}: InteractiveMapProps) {
  // Get initial center based on country
  const countrySettings = COUNTRY_CENTERS[country] || COUNTRY_CENTERS.usa;
  const [mapCenter, setMapCenter] = useState<[number, number]>(countrySettings.center);
  const [mapZoom, setMapZoom] = useState<number>(countrySettings.zoom);
  const [currentZoom, setCurrentZoom] = useState<number>(4);
  const [currentBounds, setCurrentBounds] = useState<L.LatLngBounds | null>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  
  // Update map center when country changes
  useEffect(() => {
    const settings = COUNTRY_CENTERS[country] || COUNTRY_CENTERS.usa;
    if (mapInstance) {
      mapInstance.setView(settings.center, settings.zoom);
    }
  }, [country, mapInstance]);

  // Calculate map center and zoom based on locations and user location
  useEffect(() => {
    if (userLocation) {
      // Center on user location if available
      setMapCenter([userLocation.lat, userLocation.lng]);
      setMapZoom(12);
    } else if (locations.length > 0) {
      // Calculate bounds for all locations
      const bounds = getLocationBounds(locations);
      if (bounds) {
        const center = bounds.getCenter();
        setMapCenter([center.lat, center.lng]);
        
        // Set zoom based on bounds size
        const boundsSize = bounds.getNorthEast().distanceTo(bounds.getSouthWest());
        if (boundsSize < 50000) { // Less than 50km
          setMapZoom(12);
        } else if (boundsSize < 200000) { // Less than 200km
          setMapZoom(9);
        } else {
          setMapZoom(7);
        }
      }
    }
  }, [locations, userLocation]);
  
  // Create clusters based on current zoom and bounds
  const displayItems = useMemo(() => {
    if (!currentBounds || locations.length === 0) {
      return locations;
    }
    
    // Limit clustering for performance - only cluster if there are many locations
    if (locations.length < 20) {
      return locations.filter(loc => currentBounds.contains([loc.lat, loc.lng]));
    }
    
    return createClusters(locations, currentZoom, currentBounds);
  }, [locations, currentZoom, currentBounds]);
  
  // Handle cluster click to zoom in
  const handleClusterClick = (cluster: Cluster) => {
    if (mapInstance) {
      // Calculate bounds for cluster locations
      const bounds = getLocationBounds(cluster.locations);
      if (bounds) {
        mapInstance.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  };
  
  return (
    <div style={{ height, width: '100%', position: 'relative' }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        preferCanvas={false}
        ref={setMapInstance}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
          tileSize={256}
          updateWhenIdle={true}
          keepBuffer={2}
        />
        
        <MapEventHandler 
          onZoomChange={setCurrentZoom}
          onBoundsChange={setCurrentBounds}
        />
        
        // In your marker rendering, check if it's a cluster first:
{displayItems.map((item) => {
  if (isCluster(item)) {
    // Render cluster - remove the popup or fix it
    return (
      <Marker
        key={item.id}
        position={[item.lat, item.lng]}
        icon={createClusterIcon(item.count)}
        eventHandlers={{
          click: () => handleClusterClick(item)
        }}
      >
        {/* Remove this Popup entirely for clusters, or fix it: */}
        <Popup>
          <ClusterPopup 
            cluster={item} 
            onZoomToCluster={() => handleClusterClick(item)}
          />
        </Popup>
      </Marker>
    );
  } else {
    // Individual location popup (this one works)
    return (
      <Marker
        key={item.id}
        position={[item.lat, item.lng]}
        icon={createMarkerIcon(item.categories[0], item.verified)}
      >
        <Popup>
          <LocationPopup location={item} />
        </Popup>
      </Marker>
    );
  }
})}
        
        {/* User location marker */}
        {userLocation && (
          <CircleMarker
            center={[userLocation.lat, userLocation.lng]}
            radius={8}
            fillColor="#3B82F6"
            fillOpacity={1}
            color="white"
            weight={3}
          >
            <Tooltip permanent={false} direction="top">
              Your current location
            </Tooltip>
          </CircleMarker>
        )}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3 max-w-xs z-10">
        <h4 className="font-semibold text-sm mb-2">Map Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span>Public Facilities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>YMCA</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>Community Centers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
            <span>Truck Stops</span>
          </div>
          {userLocation && (
            <div className="flex items-center gap-2 pt-1 border-t">
              <div className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
              <span>Your Location</span>
            </div>
          )}
          <div className="flex items-center gap-2 pt-1 border-t">
            <div className="w-3 h-3 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">N</div>
            <span>Clustered locations (zoom to expand)</span>
          </div>
        </div>
      </div>
      
      {/* Performance info */}
      {displayItems.length < locations.length && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-2 text-xs text-gray-600">
          Showing {displayItems.length} of {locations.length} locations (zoom/pan to see more)
        </div>
      )}
    </div>
  );
}