// ========================================
// FILE: app/[country]/[region]/RegionPageClient.tsx
// Multi-country support: USA and UK
// ========================================
'use client';

import { MapPin, DollarSign, Star, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';
import { StateContentGenerator } from '../../lib/stateContent';
import { UKContentGenerator } from '../../lib/ukContent';
import { AustraliaContentGenerator } from '../../lib/australiaContent';


const formatAddress = (address: string) => {
  if (!address) return '';

  // Use a regex to remove any non-alphanumeric, non-space characters from the start
  const cleanedAddress = address.replace(/^[^a-zA-Z0-9\s]+/, '').trim();

  const parts = cleanedAddress.split(',').map(part => part.trim());
  return `${parts[0]}, ${parts[1]}`;
};

// Helper function to check if location has verified shower reviews
function hasVerifiedShowerReviews(location: ShowerLocation): boolean {
  if (!location.showerReviews || location.showerReviews.length === 0) {
    return false;
  }

  return location.showerReviews.some((review: { reviewText?: string }) => {
    const reviewText = (review.reviewText || '').toLowerCase();
    const showerKeywords = [
      'shower', 'showers', 'locker room', 'changing room',
      'hot water', 'water pressure', 'towel', 'clean',
      'hygiene', 'wash', 'bathroom', 'facilities'
    ];
    return showerKeywords.some(keyword => reviewText.includes(keyword));
  });
}

interface ShowerLocation {
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
  showerReviews?: Array<{ reviewText?: string }>;
  showerReviewCount: number;
  businessType: string;
}

interface RegionInfo {
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

interface RegionPageClientProps {
  regionInfo: RegionInfo;
  params: { country: string; region: string };
}

export default function RegionPageClient({ regionInfo }: RegionPageClientProps) {
  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader />
      <main>
        {/* Breadcrumb Navigation */}
        <nav className="bg-warm-50 py-3 border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li><Link href="/" className="text-primary-600 hover:text-primary-700">Home</Link></li>
              <li className="text-warm-400">/</li>
              <li><Link href={`/${regionInfo.country}/`} className="text-primary-600 hover:text-primary-700">{regionInfo.country.toUpperCase()}</Link></li>
              <li className="text-warm-400">/</li>
              <li className="text-warm-900 font-medium">{regionInfo.name}</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-warm-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-6">
                Public Showers in {regionInfo.name}
              </h1>
              <p className="text-xl text-warm-600 mb-8 max-w-3xl mx-auto">
                Browse {regionInfo.stats.totalLocations}+ verified shower locations across {regionInfo.name}.
                Find free and paid public shower facilities with detailed information about hours, costs, and amenities.
              </p>

              {/* Map Link Button */}
              <Link
                href={`/map/?region=${regionInfo.slug}`}
                className="inline-flex items-center btn-primary px-8 py-4 text-lg"
              >
                <MapPin className="h-6 w-6 mr-2" />
                View Map
              </Link>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
                <div className="bg-white p-6 rounded-2xl shadow-card">
                  <div className="text-3xl font-bold text-primary-500 mb-2">{regionInfo.stats.totalLocations}+</div>
                  <div className="text-warm-600">Total Locations</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-card">
                  <div className="text-3xl font-bold text-secondary-500 mb-2">
                    {regionInfo.stats.freeLocations}
                  </div>
                  <div className="text-warm-600">Free Locations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Locations */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-warm-900 mb-4">
                All Shower Locations in {regionInfo.name}
              </h2>
              <p className="text-lg text-warm-600">
                Showing {regionInfo.featuredLocations.length} of {regionInfo.stats.totalLocations} locations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionInfo.featuredLocations.map((location, index) => {
                const isVerified = hasVerifiedShowerReviews(location);

                return (
                  <div
                    key={`${location.slug}-${index}`}
                    className="bg-white rounded-2xl shadow-card overflow-hidden border border-warm-200 hover-lift group"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-warm-900 leading-tight group-hover:text-primary-600 transition-colors">
                            {location.title}
                          </h3>
                          {isVerified && (
                            <div className="flex items-center gap-1 mt-1">
                              <BadgeCheck className="h-4 w-4 text-green-600" />
                              <span className="text-xs text-green-600 font-medium">Verified Showers</span>
                            </div>
                          )}
                        </div>
                        {location.rating > 0 && (
                          <div className="flex items-center ml-2 bg-accent-100 px-2 py-1 rounded-lg">
                            <Star className="h-4 w-4 text-accent-500 fill-current" />
                            <span className="ml-1 text-sm font-medium text-warm-700">{location.rating}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center text-warm-600 mb-2">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-warm-400" />
                        <span className="text-sm truncate">{formatAddress(location.address)}</span>
                      </div>

                      <div className="flex items-center text-warm-600 mb-4">
                        <DollarSign className="h-4 w-4 mr-2 flex-shrink-0 text-warm-400" />
                        <span className="text-sm font-medium truncate">{location.cost}</span>
                      </div>

                      {location.categories && location.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {location.categories.slice(0, 2).map((category, catIndex) => (
                            <span
                              key={`${category}-${catIndex}`}
                              className="bg-warm-100 text-warm-700 text-xs px-3 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/${regionInfo.country}/${regionInfo.slug}/${location.slug}/`}
                        className="block w-full btn-primary py-2.5 text-center text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More on Map */}
            <div className="text-center mt-12">
              <Link
                href={`/map/?region=${regionInfo.slug}`}
                className="inline-flex items-center btn-primary px-8 py-4 text-lg"
              >
                <MapPin className="h-6 w-6 mr-2" />
                View All {regionInfo.stats.totalLocations} Locations on Map
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-warm-900 prose-p:text-warm-600 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{
                __html: regionInfo.country === 'uk'
                  ? UKContentGenerator.generateRegionContent(regionInfo.slug, regionInfo.stats)
                  : regionInfo.country === 'australia'
                  ? AustraliaContentGenerator.generateStateContent(regionInfo.slug, regionInfo.stats)
                  : StateContentGenerator.generateStateSpecificContent(regionInfo.slug, regionInfo.stats)
              }}
            />
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
}
