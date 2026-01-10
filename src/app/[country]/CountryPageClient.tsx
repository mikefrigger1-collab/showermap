// ========================================
// FILE: app/[country]/CountryPageClient.tsx
// Multi-country support: USA, UK, and Australia
// ========================================
'use client';

import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

const US_STATES = [
  { name: 'Alabama', slug: 'alabama' },
  { name: 'Alaska', slug: 'alaska' },
  { name: 'Arizona', slug: 'arizona' },
  { name: 'Arkansas', slug: 'arkansas' },
  { name: 'California', slug: 'california' },
  { name: 'Colorado', slug: 'colorado' },
  { name: 'Connecticut', slug: 'connecticut' },
  { name: 'Delaware', slug: 'delaware' },
  { name: 'District of Columbia', slug: 'district-of-columbia' },
  { name: 'Florida', slug: 'florida' },
  { name: 'Georgia', slug: 'georgia' },
  { name: 'Hawaii', slug: 'hawaii' },
  { name: 'Idaho', slug: 'idaho' },
  { name: 'Illinois', slug: 'illinois' },
  { name: 'Indiana', slug: 'indiana' },
  { name: 'Iowa', slug: 'iowa' },
  { name: 'Kansas', slug: 'kansas' },
  { name: 'Kentucky', slug: 'kentucky' },
  { name: 'Louisiana', slug: 'louisiana' },
  { name: 'Maine', slug: 'maine' },
  { name: 'Maryland', slug: 'maryland' },
  { name: 'Massachusetts', slug: 'massachusetts' },
  { name: 'Michigan', slug: 'michigan' },
  { name: 'Minnesota', slug: 'minnesota' },
  { name: 'Mississippi', slug: 'mississippi' },
  { name: 'Missouri', slug: 'missouri' },
  { name: 'Montana', slug: 'montana' },
  { name: 'Nebraska', slug: 'nebraska' },
  { name: 'Nevada', slug: 'nevada' },
  { name: 'New Hampshire', slug: 'new-hampshire' },
  { name: 'New Jersey', slug: 'new-jersey' },
  { name: 'New Mexico', slug: 'new-mexico' },
  { name: 'New York', slug: 'new-york' },
  { name: 'North Carolina', slug: 'north-carolina' },
  { name: 'North Dakota', slug: 'north-dakota' },
  { name: 'Ohio', slug: 'ohio' },
  { name: 'Oklahoma', slug: 'oklahoma' },
  { name: 'Oregon', slug: 'oregon' },
  { name: 'Pennsylvania', slug: 'pennsylvania' },
  { name: 'Rhode Island', slug: 'rhode-island' },
  { name: 'South Carolina', slug: 'south-carolina' },
  { name: 'South Dakota', slug: 'south-dakota' },
  { name: 'Tennessee', slug: 'tennessee' },
  { name: 'Texas', slug: 'texas' },
  { name: 'Utah', slug: 'utah' },
  { name: 'Vermont', slug: 'vermont' },
  { name: 'Virginia', slug: 'virginia' },
  { name: 'Washington', slug: 'washington' },
  { name: 'West Virginia', slug: 'west-virginia' },
  { name: 'Wisconsin', slug: 'wisconsin' },
  { name: 'Wyoming', slug: 'wyoming' },
];

const UK_REGIONS = [
  { name: 'London', slug: 'london' },
  { name: 'South East', slug: 'south-east' },
  { name: 'South West', slug: 'south-west' },
  { name: 'East of England', slug: 'east-of-england' },
  { name: 'East Midlands', slug: 'east-midlands' },
  { name: 'West Midlands', slug: 'west-midlands' },
  { name: 'Yorkshire and the Humber', slug: 'yorkshire' },
  { name: 'North West', slug: 'north-west' },
  { name: 'North East', slug: 'north-east' },
  { name: 'Scotland', slug: 'scotland' },
  { name: 'Wales', slug: 'wales' },
  { name: 'Northern Ireland', slug: 'northern-ireland' },
];

const AUSTRALIA_STATES = [
  { name: 'New South Wales', slug: 'new-south-wales' },
  { name: 'Victoria', slug: 'victoria' },
  { name: 'Queensland', slug: 'queensland' },
  { name: 'Western Australia', slug: 'western-australia' },
  { name: 'South Australia', slug: 'south-australia' },
  { name: 'Tasmania', slug: 'tasmania' },
  { name: 'Northern Territory', slug: 'northern-territory' },
  { name: 'Australian Capital Territory', slug: 'australian-capital-territory' },
];

const COUNTRY_CONFIG: Record<string, {
  name: string;
  regionLabel: string;
  regionLabelPlural: string;
  selectPlaceholder: string;
  regions: typeof US_STATES;
  description: string;
}> = {
  'usa': {
    name: 'USA',
    regionLabel: 'state',
    regionLabelPlural: 'states',
    selectPlaceholder: 'Select a state...',
    regions: US_STATES,
    description: 'Select your state to browse verified shower locations near you. We have thousands of facilities across all 50 states.'
  },
  'uk': {
    name: 'UK',
    regionLabel: 'region',
    regionLabelPlural: 'regions',
    selectPlaceholder: 'Select a region...',
    regions: UK_REGIONS,
    description: 'Select your region to browse public shower facilities near you. We cover leisure centres, gyms, hostels, and more across all of the UK.'
  },
  'australia': {
    name: 'Australia',
    regionLabel: 'state',
    regionLabelPlural: 'states',
    selectPlaceholder: 'Select a state or territory...',
    regions: AUSTRALIA_STATES,
    description: 'Select your state or territory to browse public shower facilities near you. We cover aquatic centres, caravan parks, beaches, and more across Australia.'
  }
};

interface CountryPageClientProps {
  country: string;
}

export default function CountryPageClient({ country }: CountryPageClientProps) {
  const [selectedRegion, setSelectedRegion] = useState('');
  const router = useRouter();

  const config = COUNTRY_CONFIG[country] || COUNTRY_CONFIG['usa'];

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionSlug = e.target.value;
    setSelectedRegion(regionSlug);
    if (regionSlug) {
      router.push(`/${country}/${regionSlug}/`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-warm-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MapPin className="h-16 w-16 text-primary-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-6">
              Find Public Showers in the {config.name}
            </h1>
            <p className="text-xl text-warm-600 mb-10 max-w-2xl mx-auto">
              {config.description}
            </p>

            {/* Region Dropdown */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className="w-full appearance-none bg-white border-2 border-warm-200 rounded-xl
                           px-6 py-4 text-lg text-warm-900
                           focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                           transition-all duration-200 cursor-pointer"
                >
                  <option value="">{config.selectPlaceholder}</option>
                  {config.regions.map((region) => (
                    <option key={region.slug} value={region.slug}>
                      {region.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-warm-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-warm-900 mb-8 text-center">
              Browse by {config.regionLabel.charAt(0).toUpperCase() + config.regionLabel.slice(1)}
            </h2>

            <div className={`grid gap-3 ${
              country === 'uk'
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
            }`}>
              {config.regions.map((region) => (
                <a
                  key={region.slug}
                  href={`/${country}/${region.slug}/`}
                  className="block p-4 bg-warm-50 hover:bg-primary-50 rounded-xl
                           text-warm-700 hover:text-primary-600 text-sm font-medium
                           transition-colors duration-200 text-center"
                >
                  {region.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
