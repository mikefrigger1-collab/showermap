// src/app/components/HomePage.tsx
import {
  MapPin, Clock, DollarSign, Shield, Star, Users,
  Caravan, Truck, PersonStanding, Home, GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';

const HomePage = () => {
  return (
    <>
      <GlobalHeader />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/outdoor-shower-on-the-beach.jpg"
              alt="Beach shower facilities"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-warm-900/80 via-warm-900/60 to-warm-900/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                Find Public Showers
                <span className="block text-primary-300 mt-2">Anywhere in the World</span>
              </h1>
              <p className="text-lg md:text-xl text-warm-200 mb-10 animate-fade-in-up animate-delay-100">
                Discover clean, accessible shower facilities for travelers, van lifers, truck drivers,
                and anyone in need of hygiene facilities. Safe, verified locations worldwide.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-fade-in-up animate-delay-200">
                <Link
                  href="/map/"
                  className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Explore the Map
                </Link>
                <Link
                  href="/usa/"
                  className="inline-flex items-center justify-center bg-white/95 backdrop-blur-sm hover:bg-white text-warm-800 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
                >
                  Browse by Region
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animate-delay-300">
                <Link href="/usa/" className="text-white/80 hover:text-white transition-colors">
                  🇺🇸 USA
                </Link>
                <span className="text-white/40">|</span>
                <Link href="/uk/" className="text-white/80 hover:text-white transition-colors">
                  🇬🇧 United Kingdom
                </Link>
                <span className="text-white/40">|</span>
                <Link href="/australia/" className="text-white/80 hover:text-white transition-colors">
                  🇦🇺 Australia
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-4">
                Why Choose ShowerMap?
              </h2>
              <p className="text-lg text-warm-600 max-w-2xl mx-auto">
                We help you find safe, clean shower facilities with detailed information
                about access, costs, and amenities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group hover-lift p-6 rounded-2xl">
                <div className="bg-secondary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4
                              transition-transform duration-200 group-hover:scale-110">
                  <Shield className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-2">Verified Safe</h3>
                <p className="text-warm-600">All locations are verified for safety and cleanliness standards.</p>
              </div>

              <div className="text-center group hover-lift p-6 rounded-2xl">
                <div className="bg-accent-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4
                              transition-transform duration-200 group-hover:scale-110">
                  <Clock className="h-8 w-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-2">Current Hours</h3>
                <p className="text-warm-600">Up-to-date operating hours and seasonal schedule information.</p>
              </div>

              <div className="text-center group hover-lift p-6 rounded-2xl">
                <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4
                              transition-transform duration-200 group-hover:scale-110">
                  <DollarSign className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-2">Clear Pricing</h3>
                <p className="text-warm-600">Know exactly what you'll pay - from free facilities to day pass rates.</p>
              </div>

              <div className="text-center group hover-lift p-6 rounded-2xl">
                <div className="bg-secondary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4
                              transition-transform duration-200 group-hover:scale-110">
                  <Star className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-2">User Rated</h3>
                <p className="text-warm-600">Real reviews and ratings from travelers and local users.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-20 bg-warm-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-4">
                Serving Everyone Who Needs Clean Facilities
              </h2>
              <p className="text-lg text-warm-600 max-w-2xl mx-auto">
                ShowerMap helps diverse communities find dignity and cleanliness,
                no matter their circumstances or travel style.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-card hover-lift group">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4
                              transition-transform duration-200 group-hover:scale-110">
                  <Users className="h-6 w-6 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-2">Travelers & Backpackers</h3>
                <p className="text-warm-600">Find clean shower facilities in hostels, community centers, and public facilities while exploring new destinations.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-card hover-lift group">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4
                              transition-transform duration-200 group-hover:scale-110">
                  <Caravan className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-2">Van Lifers & RV Travelers</h3>
                <p className="text-warm-600">Discover alternatives to RV park showers, including gyms, beaches, and recreation centers.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-card hover-lift group">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-4
                              transition-transform duration-200 group-hover:scale-110">
                  <Truck className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-2">Truck Drivers</h3>
                <p className="text-warm-600">Locate truck stops and travel centers with shower facilities along your route.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-card hover-lift group">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4
                              transition-transform duration-200 group-hover:scale-110">
                  <PersonStanding className="h-6 w-6 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-2">Athletes & Cyclists</h3>
                <p className="text-warm-600">Find post-workout shower facilities at gyms, rec centers, and public pools.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-card hover-lift group">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4
                              transition-transform duration-200 group-hover:scale-110">
                  <Home className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-2">Housing Insecurity</h3>
                <p className="text-warm-600">Access to free and low-cost hygiene facilities through community services and day centers.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-card hover-lift group">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-4
                              transition-transform duration-200 group-hover:scale-110">
                  <GraduationCap className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-2">Students</h3>
                <p className="text-warm-600">Budget-friendly shower options at universities, community centers, and student facilities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Browse by Country Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-4">
                Browse by Country
              </h2>
              <p className="text-lg text-warm-600 max-w-2xl mx-auto">
                Select your country to explore public shower facilities near you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <Link
                href="/usa/"
                className="group bg-white border-2 border-warm-200 rounded-2xl p-8 text-center hover-lift
                         hover:border-primary-300 transition-all duration-200"
              >
                <span className="text-5xl mb-4 block">🇺🇸</span>
                <h3 className="text-2xl font-bold text-warm-900 mb-2 group-hover:text-primary-600 transition-colors">
                  United States
                </h3>
                <p className="text-warm-600">
                  50 states with 8,500+ verified locations
                </p>
                <span className="inline-block mt-4 text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                  Browse states →
                </span>
              </Link>

              <Link
                href="/uk/"
                className="group bg-white border-2 border-warm-200 rounded-2xl p-8 text-center hover-lift
                         hover:border-primary-300 transition-all duration-200"
              >
                <span className="text-5xl mb-4 block">🇬🇧</span>
                <h3 className="text-2xl font-bold text-warm-900 mb-2 group-hover:text-primary-600 transition-colors">
                  United Kingdom
                </h3>
                <p className="text-warm-600">
                  12 regions including England, Scotland, Wales & NI
                </p>
                <span className="inline-block mt-4 text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                  Browse regions →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-20 bg-warm-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-4">
                Shower Facilities Worldwide
              </h2>
              <p className="text-lg text-warm-600 max-w-2xl mx-auto">
                From beach rinse stations to modern leisure centre facilities,
                find the perfect shower for your needs.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <Image
                  src="/images/surfer-taking-shower-beach.jpg"
                  alt="Surfer using beach shower"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-3 left-3 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Beach Showers</span>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <Image
                  src="/images/outdoor-showers-cubicle.jpg"
                  alt="Outdoor shower cubicle"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-3 left-3 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Private Cubicles</span>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <Image
                  src="/images/steel-shower-outside.jpg"
                  alt="Steel outdoor shower"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-3 left-3 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Modern Facilities</span>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <Image
                  src="/images/two-public-showers-on-beach.jpg"
                  alt="Public showers on beach"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-3 left-3 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Coastal Locations</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 md:p-12 text-center shadow-warm">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Finding Clean Showers Today
              </h2>
              <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Join thousands of travelers, nomads, and locals who trust ShowerMap
                to find safe, clean shower facilities worldwide.
              </p>
              <Link
                href="/map/"
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold
                         hover:bg-primary-50 transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
              >
                Explore Interactive Map
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </>
  );
};

export default HomePage;
