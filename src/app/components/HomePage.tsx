// src/app/components/HomePage.tsx
import { Search, MapPin, Clock, DollarSign, Shield, Star, Users } from 'lucide-react';
import Link from 'next/link';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';

const HomePage = () => {
  return (
    <>
      <GlobalHeader />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Find Public Showers
                <span className="block text-blue-600">Anywhere in the World</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover clean, accessible shower facilities for travelers, van lifers, truck drivers, 
                and anyone in need of hygiene facilities. Safe, verified locations worldwide.
              </p>
              
              {/* Search CTA */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Enter city or location..."
                      className="w-full pl-10 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                    Search Showers
                  </button>
                </div>
              </div>
              
              <Link 
                href="/map/" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
              >
                <MapPin className="h-5 w-5 mr-2" />
                View Interactive Map
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose ShowerMap?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We help you find safe, clean shower facilities with detailed information 
                about access, costs, and amenities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Safe</h3>
                <p className="text-gray-600">All locations are verified for safety and cleanliness standards.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Current Hours</h3>
                <p className="text-gray-600">Up-to-date operating hours and seasonal schedule information.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Clear Pricing</h3>
                <p className="text-gray-600">Know exactly what you&apos;ll pay - from free facilities to day pass rates.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">User Rated</h3>
                <p className="text-gray-600">Real reviews and ratings from travelers and local users.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Serving Everyone Who Needs Clean Facilities
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                ShowerMap helps diverse communities find dignity and cleanliness, 
                no matter their circumstances or travel style.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Travelers & Backpackers</h3>
                <p className="text-gray-600">Find clean shower facilities in hostels, community centers, and public facilities while exploring new destinations.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-8 w-8 bg-green-600 rounded mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RV</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Van Lifers & RV Travelers</h3>
                <p className="text-gray-600">Discover alternatives to RV park showers, including gyms, beaches, and recreation centers.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-8 w-8 bg-orange-600 rounded mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🚛</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Truck Drivers</h3>
                <p className="text-gray-600">Locate truck stops and travel centers with shower facilities along your route.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-8 w-8 bg-purple-600 rounded mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🏃</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Athletes & Cyclists</h3>
                <p className="text-gray-600">Find post-workout shower facilities at gyms, rec centers, and public pools.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-8 w-8 bg-red-600 rounded mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🏠</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Housing Insecurity</h3>
                <p className="text-gray-600">Access to free and low-cost hygiene facilities through community services and day centers.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-8 w-8 bg-indigo-600 rounded mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📚</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Students</h3>
                <p className="text-gray-600">Budget-friendly shower options at universities, community centers, and student facilities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Finding Clean Showers Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of travelers, nomads, and locals who trust ShowerMap 
              to find safe, clean shower facilities worldwide.
            </p>
            <Link 
              href="/map/"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Explore Interactive Map
            </Link>
          </div>
        </section>
      </main>
      
      <GlobalFooter />
    </>
  );
};

export default HomePage;