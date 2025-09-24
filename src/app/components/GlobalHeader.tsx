'use client';

import { Droplets, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const GlobalHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegionsDropdownOpen, setIsRegionsDropdownOpen] = useState(false);
  
  // Add delay to prevent dropdown from closing too quickly
  const handleMouseEnter = () => {
    setIsRegionsDropdownOpen(true);
  };
  
  const handleMouseLeave = () => {
    // Small delay to prevent flickering when moving between elements
    setTimeout(() => {
      setIsRegionsDropdownOpen(false);
    }, 100);
  };

const regions = {
  'United States': [
    { name: 'Alabama', slug: 'usa/alabama' },
    { name: 'Alaska', slug: 'usa/alaska' },
    { name: 'Arizona', slug: 'usa/arizona' },
    { name: 'Arkansas', slug: 'usa/arkansas' },
    { name: 'California', slug: 'usa/california' },
    { name: 'Colorado', slug: 'usa/colorado' },
    { name: 'Connecticut', slug: 'usa/connecticut' },
    { name: 'Delaware', slug: 'usa/delaware' },
    { name: 'District of Columbia', slug: 'usa/district-of-columbia' },
    { name: 'Florida', slug: 'usa/florida' },
    { name: 'Georgia', slug: 'usa/georgia' },
    { name: 'Hawaii', slug: 'usa/hawaii' },
    { name: 'Idaho', slug: 'usa/idaho' },
    { name: 'Illinois', slug: 'usa/illinois' },
    { name: 'Indiana', slug: 'usa/indiana' },
    { name: 'Iowa', slug: 'usa/iowa' },
    { name: 'Kansas', slug: 'usa/kansas' },
    { name: 'Kentucky', slug: 'usa/kentucky' },
    { name: 'Louisiana', slug: 'usa/louisiana' },
    { name: 'Maine', slug: 'usa/maine' },
    { name: 'Maryland', slug: 'usa/maryland' },
    { name: 'Massachusetts', slug: 'usa/massachusetts' },
    { name: 'Michigan', slug: 'usa/michigan' },
    { name: 'Minnesota', slug: 'usa/minnesota' },
    { name: 'Mississippi', slug: 'usa/mississippi' },
    { name: 'Missouri', slug: 'usa/missouri' },
    { name: 'Montana', slug: 'usa/montana' },
    { name: 'Nebraska', slug: 'usa/nebraska' },
    { name: 'Nevada', slug: 'usa/nevada' },
    { name: 'New Hampshire', slug: 'usa/new-hampshire' },
    { name: 'New Jersey', slug: 'usa/new-jersey' },
    { name: 'New Mexico', slug: 'usa/new-mexico' },
    { name: 'New York', slug: 'usa/new-york' },
    { name: 'North Carolina', slug: 'usa/north-carolina' },
    { name: 'North Dakota', slug: 'usa/north-dakota' },
    { name: 'Ohio', slug: 'usa/ohio' },
    { name: 'Oklahoma', slug: 'usa/oklahoma' },
    { name: 'Oregon', slug: 'usa/oregon' },
    { name: 'Pennsylvania', slug: 'usa/pennsylvania' },
    { name: 'Rhode Island', slug: 'usa/rhode-island' },
    { name: 'South Carolina', slug: 'usa/south-carolina' },
    { name: 'South Dakota', slug: 'usa/south-dakota' },
    { name: 'Tennessee', slug: 'usa/tennessee' },
    { name: 'Texas', slug: 'usa/texas' },
    { name: 'Utah', slug: 'usa/utah' },
    { name: 'Vermont', slug: 'usa/vermont' },
    { name: 'Virginia', slug: 'usa/virginia' },
    { name: 'Washington', slug: 'usa/washington' },
    { name: 'West Virginia', slug: 'usa/west-virginia' },
    { name: 'Wisconsin', slug: 'usa/wisconsin' },
    { name: 'Wyoming', slug: 'usa/wyoming' }
  ],
};

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ShowerMap</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/map/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Find Showers
            </Link>

            
            
            {/* Regions Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-1">
                Regions
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* Dropdown Menu - positioned to overlap slightly with button */}
{/* Dropdown Menu - smaller and scrollable */}
{isRegionsDropdownOpen && (
  <div className="absolute top-full left-0 -mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
    <div className="p-3">
      {Object.entries(regions).map(([country, regionList]) => (
        <div key={country}>
          <h3 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            {country}
          </h3>
          <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <ul className="space-y-0.5 pr-2">
              {regionList.map((region) => (
                <li key={region.slug}>
                  <Link
                    href={`/${region.slug}/`}
                    className="text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-2 py-1.5 rounded transition-colors"
                  >
                    {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <Link
          href="/map/"
          className="text-xs text-blue-600 hover:text-blue-800 font-medium block py-1.5"
        >
          View All on Map →
        </Link>
      </div>
    </div>
  </div>
)}
            </div>
            
            <Link 
              href="/about/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/guidelines/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Guidelines
            </Link>
            <Link 
              href="/contact/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-50 md:hidden max-h-screen overflow-y-auto">
            <div className="px-4 py-6 space-y-6">
              {/* Main Navigation Links */}
              <div className="space-y-4">
                <Link
                  href="/map/"
                  onClick={closeMobileMenu}
                  className="block text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Find Showers
                </Link>
                <Link
                  href="/about/"
                  onClick={closeMobileMenu}
                  className="block text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/guidelines/"
                  onClick={closeMobileMenu}
                  className="block text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Guidelines
                </Link>
                <Link
                  href="/contact/"
                  onClick={closeMobileMenu}
                  className="block text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </div>

              {/* Regions Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Showers by Region</h3>
                
                {Object.entries(regions).map(([country, regionList]) => (
                  <div key={country} className="mb-6">
                    <h4 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                      {country}
                    </h4>
                    <div className="grid grid-cols-1 gap-2 ml-4">
                      {regionList.map((region) => (
                        <Link
                          key={region.slug}
                          href={`/${region.slug}/`}
                          onClick={closeMobileMenu}
                          className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 py-2 px-3 rounded transition-colors"
                        >
                          {region.name} Showers
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Access Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
                <div className="space-y-3">
                  <Link
                    href="/map/?filter=free"
                    onClick={closeMobileMenu}
                    className="block bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-100 transition-colors"
                  >
                    🆓 Find Free Showers
                  </Link>
                  <Link
                    href="/map/?filter=24hour"
                    onClick={closeMobileMenu}
                    className="block bg-blue-50 text-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                  >
                    🕐 24-Hour Facilities
                  </Link>
                  <Link
                    href="/map/?filter=accessible"
                    onClick={closeMobileMenu}
                    className="block bg-purple-50 text-purple-700 px-4 py-3 rounded-lg font-medium hover:bg-purple-100 transition-colors"
                  >
                    ♿ Accessible Showers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default GlobalHeader;