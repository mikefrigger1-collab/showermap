// ========================================
// FILE: app/[country]/[region]/[location]/LocationPageClient.tsx (UPDATED)
// ========================================
'use client';

import { MapPin, Clock, Phone, Globe, DollarSign, Star, CheckCircle, BadgeCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

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
  showerReviews?: Array<{
    reviewerName: string;
    rating: string;
    reviewDate: string;
    reviewText: string;
    showerKeywords: string[];
  }>;
  businessType: string;
}

interface LocationPageClientProps {
  location: ShowerLocation;
  generatedContent: { 
    content: string; 
    seoTitle: string; 
    metaDescription: string;
  };
  params: { 
    country: string; 
    region: string; 
    location: string;
  };
  isVerified: boolean; // Now passed from server component
}




export default function LocationPageClient({ 
  location, 
  generatedContent, 
  params,
  isVerified // Receive verification status from server
}: LocationPageClientProps) {
  
  const formatPhone = (phone: string) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };
   
const formatAddress = (address: string) => {
  if (!address) return '';
  
  // Use a regex to remove any non-alphanumeric, non-space characters from the start
  const cleanedAddress = address.replace(/^[^a-zA-Z0-9\s]+/, '').trim();

  const parts = cleanedAddress.split(',').map(part => part.trim());
  return `${parts[0]}, ${parts[1]}`;
};



  // Check if reviews exist (different from verified)
  const hasReviews = location.showerReviews && location.showerReviews.length > 0;

  // In LocationPageClient.tsx, add this schema
const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: location.title,
  address: {
    "@type": "PostalAddress",
    streetAddress: location.address,
    addressRegion: location.state,
    postalCode: location.zip
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: location.lat,
    longitude: location.lng
  },
  telephone: location.phone,
  url: location.website,
  aggregateRating: location.rating > 0 ? {
    "@type": "AggregateRating",
    ratingValue: location.rating,
    reviewCount: location.reviewCount
  } : undefined
};

  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader />
      <main>
        {/* Breadcrumb */}
        <nav className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center space-x-2 text-sm">
              <li><Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li>
                <Link 
                  href={`/${params.country}/${params.region}/`} 
                  className="text-blue-600 hover:text-blue-800 capitalize"
                >
                  {params.region.replace(/-/g, ' ')}
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-600">{location.title}</li>
            </ol>
          </div>
        </nav>
        
{/* Hero Section */}
<section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center sm:flex-row sm:items-center gap-3 mb-3">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center sm:text-left">
        {location.title}
      </h1>
      {isVerified && (
        <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
          <BadgeCheck className="h-4 w-4" />
          <span className="text-sm font-semibold">Verified</span>
        </div>
      )}
    </div>
    
    <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 mb-2">
      <span className="flex items-center gap-1 text-center sm:text-left">
        <MapPin className="h-4 w-4 flex-shrink-0" />
        {formatAddress(location.address)}
      </span>
      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
        {location.categories.map((category, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {category}
          </span>
        ))}
      </div>
    </div>
    
    {location.rating > 0 && (
      <div className="flex items-center justify-center sm:justify-start gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(location.rating) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-gray-600">
          {location.rating} {location.reviewCount > 0 && `(${location.reviewCount} reviews)`}
        </span>
      </div>
    )}
    
    {/* Quick Info Cards */}
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto sm:mx-0">
      <div className="bg-white p-4 rounded-lg shadow-sm text-center sm:text-left">
        <DollarSign className="h-5 w-5 text-green-600 mb-1 mx-auto sm:mx-0" />
        <div className="text-sm text-gray-600">Cost</div>
        <div className="font-semibold">{location.cost}</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm text-center sm:text-left">
        <Clock className="h-5 w-5 text-blue-600 mb-1 mx-auto sm:mx-0" />
        <div className="text-sm text-gray-600">Access</div>
        <div className="font-semibold">{location.access}</div>
      </div>
    </div>
  </div>
</section>
        
        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Generated Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  {/* Amenities */}
                  {location.amenities.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Available Amenities
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {location.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Reviews - Show only if they exist and mention showers */}
                  {hasReviews && (
                    <div className="mt-8 pt-8 border-t">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {isVerified ? 'Verified Shower Reviews' : 'User Reviews'}
                      </h3>
                      {location.showerReviews!.slice(0, 3).map((review, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold">{review.reviewerName}</span>
                            {review.reviewDate !== 'No date' && (
                              <span className="text-sm text-gray-500">{review.reviewDate}</span>
                            )}
                          </div>
                          <p className="text-gray-700">{review.reviewText}</p>
                          {review.showerKeywords && review.showerKeywords.length > 0 && (
                            <div className="mt-2 flex gap-2 flex-wrap">
                              {review.showerKeywords.map((keyword, idx) => (
                                <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right Column - Contact Info */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Facility Information
                  </h3>
                  
                  {/* Address */}
                  <div className="mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Address</div>
                        <div className="text-gray-600 text-sm">
                          {formatAddress(location.address)}
                        </div>
                        <a 
                          href={`https://maps.google.com/?q=${encodeURIComponent(
                            `${formatAddress(location.address)}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1 mt-1"
                        >
                          Get Directions →
                        </a>
                      </div>
                    </div>
                  </div>

{/* Hours */}
{location.hours && Object.keys(location.hours).length > 0 && (
  <div className="mb-6">
    <div className="flex items-start gap-3">
      <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
      <div className="w-full">
        <div className="font-medium text-gray-900 mb-2">Hours</div>
        <div className="space-y-1">
          {(() => {
            // Function to clean HTML entities and special characters from hours string
            const cleanHours = (hoursString: string) => {
              if (!hoursString) return 'Closed';

              // Decode HTML entities without using document (works on server and client)
              let decoded = hoursString
                .replace(/&nbsp;/g, ' ')
                .replace(/&ndash;/g, '-')
                .replace(/&mdash;/g, '-')
                .replace(/&#8211;/g, '-')
                .replace(/&#8212;/g, '-')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace(/&#x27;/g, "'")
                .replace(/\*/g, '')  // Remove asterisks
                .replace(/[^\w\s:,-]/gi, '')  // Remove any other special characters except word chars, spaces, colons, commas, and dashes
                .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
                .trim();

              // If after cleaning we have an empty string, return 'Closed'
              return decoded || 'Closed';
            };

            const daySchedule = [
              { day: 'Monday', hours: location.hours.monday },
              { day: 'Tuesday', hours: location.hours.tuesday },
              { day: 'Wednesday', hours: location.hours.wednesday },
              { day: 'Thursday', hours: location.hours.thursday },
              { day: 'Friday', hours: location.hours.friday },
              { day: 'Saturday', hours: location.hours.saturday },
              { day: 'Sunday', hours: location.hours.sunday }
            ];

            return daySchedule.map(({ day, hours }) => (
              <div key={day} className="flex justify-between items-center py-1">
                <span className="text-gray-600 text-sm">{day}</span>
                <span className="text-gray-800 text-sm font-medium">
                  {cleanHours(hours)}
                </span>
              </div>
            ));
          })()}
        </div>
        {/* Show if currently open/closed */}
        {(() => {
          const now = new Date();
          const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
          const currentDay = days[now.getDay()];
          const todayHours = location.hours[currentDay];
          
          // Clean the today hours as well (without using document for SSR compatibility)
          const cleanHours = (hoursString: string) => {
            if (!hoursString) return null;

            // Decode HTML entities without using document
            const decoded = hoursString
              .replace(/&nbsp;/g, ' ')
              .replace(/&ndash;/g, '-')
              .replace(/&mdash;/g, '-')
              .replace(/&#8211;/g, '-')
              .replace(/&#8212;/g, '-')
              .replace(/&amp;/g, '&')
              .replace(/\*/g, '')  // Remove asterisks
              .replace(/[^\w\s:,-]/gi, '')  // Remove special characters
              .replace(/\s+/g, ' ')  // Normalize spaces
              .trim();

            return decoded || null;
          };
          
          const cleanedTodayHours = cleanHours(todayHours);
          
          if (cleanedTodayHours && cleanedTodayHours !== 'Closed') {
            return (
              <div className="mt-2 pt-2 border-t">
                <span className="text-xs text-green-600 font-medium">
                  Today: {cleanedTodayHours}
                </span>
              </div>
            );
          } else if (cleanedTodayHours === 'Closed') {
            return (
              <div className="mt-2 pt-2 border-t">
                <span className="text-xs text-red-600 font-medium">
                  Closed Today
                </span>
              </div>
            );
          }
          return null;
        })()}
      </div>
    </div>
  </div>
)}
                  
                  {/* Phone */}
                  {location.phone && (
                    <div className="mb-6">
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">Phone</div>
                          <a 
                            href={`tel:${location.phone}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {formatPhone(location.phone)}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Website */}
                  {location.website && (
                    <div className="mb-6">
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">Website</div>
                          <a 
                            href={location.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Visit Website →
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Call to Action */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900 mb-1">
                            {isVerified ? 'Verified Shower Facility' : 'Before You Visit'}
                          </p>
                          <p className="text-gray-600">
                            {isVerified 
                              ? 'User reviews have confirmed this facility has shower facilities available.'
                              : 'We recommend calling ahead to confirm current hours, pricing, and shower availability.'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {location.phone && (
                      <a 
                        href={`tel:${location.phone}`}
                        className="mt-4 block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors"
                      >
                        Call {formatPhone(location.phone)}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
}