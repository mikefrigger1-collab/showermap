'use client';

import { Droplets, Heart, Shield, Users, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

export default function AboutPage() {
  return (
    <>
      <GlobalHeader />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Droplets className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About ShowerMap
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe everyone deserves access to clean, safe hygiene facilities. 
              ShowerMap connects people with public showers worldwide, promoting dignity and health for all.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  ShowerMap was born from a simple belief: access to hygiene shouldn't depend on your circumstances. 
                  Whether you're a traveler exploring new places, living the van life, working long-haul trucking routes, 
                  or facing housing insecurity, everyone deserves clean facilities.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  We're building the world's most comprehensive directory of public shower facilities, 
                  verified and maintained by a community that cares about helping others stay clean, 
                  healthy, and dignified.
                </p>
                <div className="flex items-center space-x-2 text-blue-600">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Helping people, one shower at a time</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Values</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Safety First</h4>
                      <p className="text-gray-600 text-sm">We verify locations for safety and cleanliness standards.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Inclusive Community</h4>
                      <p className="text-gray-600 text-sm">We serve everyone with respect and dignity.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Star className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Quality Information</h4>
                      <p className="text-gray-600 text-sm">Accurate, up-to-date facility details you can trust.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Who We Serve
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                ShowerMap helps diverse communities find clean, accessible hygiene facilities 
                across different circumstances and lifestyles.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">🎒</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Travelers & Backpackers</h3>
                <p className="text-gray-600 text-sm">Finding clean facilities while exploring the world</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">🚐</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Van Lifers & RV Travelers</h3>
                <p className="text-gray-600 text-sm">Alternatives to RV park showers across the country</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold">🚛</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Professional Drivers</h3>
                <p className="text-gray-600 text-sm">Truck stops and travel centers along major routes</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">🏃</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Athletes & Outdoor Enthusiasts</h3>
                <p className="text-gray-600 text-sm">Post-workout facilities at gyms and recreation centers</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 font-bold">🏠</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Housing Insecure Individuals</h3>
                <p className="text-gray-600 text-sm">Free and low-cost hygiene facilities in communities</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 font-bold">📚</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Students & Budget Travelers</h3>
                <p className="text-gray-600 text-sm">Affordable options at universities and community centers</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How ShowerMap Works
              </h2>
              <p className="text-lg text-gray-600">
                Simple, reliable access to hygiene facilities worldwide
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Search & Discover</h3>
                <p className="text-gray-600">
                  Find shower facilities by location, amenities, or facility type. 
                  Use our interactive map or search by city.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Verify & Plan</h3>
                <p className="text-gray-600">
                  Get detailed information about hours, pricing, amenities, and access requirements. 
                  All locations are community-verified.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Visit & Review</h3>
                <p className="text-gray-600">
                  Use clean, safe facilities and help others by leaving reviews and 
                  updates to keep information current.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Help us build the world's most comprehensive directory of public shower facilities. 
              Together, we can ensure everyone has access to clean, dignified hygiene facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/map/"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Find Showers Near You
              </Link>
              <Link 
                href="/contact/"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <GlobalFooter />
    </>
  );
}