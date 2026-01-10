// src/app/components/GlobalHeader.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Droplets, X, Menu, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const US_STATES = [
  { name: 'Alabama', slug: 'alabama' },
  { name: 'Alaska', slug: 'alaska' },
  { name: 'Arizona', slug: 'arizona' },
  { name: 'Arkansas', slug: 'arkansas' },
  { name: 'California', slug: 'california' },
  { name: 'Colorado', slug: 'colorado' },
  { name: 'Connecticut', slug: 'connecticut' },
  { name: 'Delaware', slug: 'delaware' },
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
  { name: 'Yorkshire', slug: 'yorkshire' },
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
  { name: 'ACT', slug: 'australian-capital-territory' },
];

const GlobalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileStatesOpen, setIsMobileStatesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsMobileStatesOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-white border-b border-warm-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <Droplets className="h-8 w-8 text-primary-500 transition-transform duration-200 group-hover:scale-110" />
                <span className="text-xl font-bold text-warm-900">ShowerMap</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* Find Showers Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-warm-600 hover:text-primary-500 font-medium transition-colors duration-200 py-2"
                >
                  Find Showers
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-card-hover border border-warm-200 py-2 animate-fade-in">
                    {/* USA Section */}
                    <div className="px-4 py-2 border-b border-warm-100">
                      <span className="text-xs font-semibold text-warm-500 uppercase tracking-wider">USA</span>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {US_STATES.map((state) => (
                        <Link
                          key={state.slug}
                          href={`/usa/${state.slug}/`}
                          className="block px-4 py-2 text-sm text-warm-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {state.name}
                        </Link>
                      ))}
                    </div>
                    {/* UK Section */}
                    <div className="px-4 py-2 border-b border-warm-100 border-t mt-2">
                      <span className="text-xs font-semibold text-warm-500 uppercase tracking-wider">UK</span>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {UK_REGIONS.map((region) => (
                        <Link
                          key={region.slug}
                          href={`/uk/${region.slug}/`}
                          className="block px-4 py-2 text-sm text-warm-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {region.name}
                        </Link>
                      ))}
                    </div>
                    {/* Australia Section */}
                    <div className="px-4 py-2 border-b border-warm-100 border-t mt-2">
                      <span className="text-xs font-semibold text-warm-500 uppercase tracking-wider">Australia</span>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {AUSTRALIA_STATES.map((state) => (
                        <Link
                          key={state.slug}
                          href={`/australia/${state.slug}/`}
                          className="block px-4 py-2 text-sm text-warm-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {state.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/map/"
                className="text-warm-600 hover:text-primary-500 font-medium transition-colors duration-200 py-2"
              >
                Map
              </Link>

              <Link
                href="/about/"
                className="text-warm-600 hover:text-primary-500 font-medium transition-colors duration-200 py-2"
              >
                About
              </Link>

              <Link
                href="/guidelines/"
                className="text-warm-600 hover:text-primary-500 font-medium transition-colors duration-200 py-2"
              >
                Guidelines
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-warm-600 hover:text-primary-500 p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-warm-900/50 z-40 md:hidden animate-fade-in"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden transform transition-transform duration-300 ease-out shadow-xl ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-warm-200">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <Droplets className="h-7 w-7 text-primary-500" />
              <span className="text-lg font-bold text-warm-900">ShowerMap</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-warm-500 hover:text-warm-700 p-2 rounded-lg hover:bg-warm-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {/* Find Showers Accordion */}
            <div>
              <button
                onClick={() => setIsMobileStatesOpen(!isMobileStatesOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-warm-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-colors duration-200"
              >
                Find Showers
                <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${isMobileStatesOpen ? 'rotate-90' : ''}`} />
              </button>

              {isMobileStatesOpen && (
                <div className="mt-2 ml-4 pl-4 border-l-2 border-warm-200 space-y-1 max-h-60 overflow-y-auto">
                  {/* USA */}
                  <div className="px-3 py-1">
                    <span className="text-xs font-semibold text-warm-500 uppercase tracking-wider">USA</span>
                  </div>
                  {US_STATES.map((state) => (
                    <Link
                      key={state.slug}
                      href={`/usa/${state.slug}/`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-warm-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      {state.name}
                    </Link>
                  ))}
                  {/* UK */}
                  <div className="px-3 py-1 mt-4">
                    <span className="text-xs font-semibold text-warm-500 uppercase tracking-wider">UK</span>
                  </div>
                  {UK_REGIONS.map((region) => (
                    <Link
                      key={region.slug}
                      href={`/uk/${region.slug}/`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-warm-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      {region.name}
                    </Link>
                  ))}
                  {/* Australia */}
                  <div className="px-3 py-1 mt-4">
                    <span className="text-xs font-semibold text-warm-500 uppercase tracking-wider">Australia</span>
                  </div>
                  {AUSTRALIA_STATES.map((state) => (
                    <Link
                      key={state.slug}
                      href={`/australia/${state.slug}/`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-warm-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      {state.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/map/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-warm-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-colors duration-200"
            >
              Map
            </Link>

            <Link
              href="/about/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-warm-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-colors duration-200"
            >
              About
            </Link>

            <Link
              href="/guidelines/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-warm-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-colors duration-200"
            >
              Guidelines
            </Link>
          </nav>

          <div className="p-4 border-t border-warm-200">
            <Link
              href="/contact/"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center btn-primary"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalHeader;
