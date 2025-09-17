// src/app/components/GlobalHeader.tsx
'use client';

import { Droplets } from 'lucide-react';
import Link from 'next/link';

const GlobalHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ShowerMap</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/map/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Find Showers
            </Link>
            <Link href="/about/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/guidelines/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Guidelines
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;