// src/app/components/GlobalFooter.tsx
'use client';

import { Droplets } from 'lucide-react';
import Link from 'next/link';

const GlobalFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Droplets className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">ShowerMap</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Find clean, accessible public showers worldwide. Helping travelers, van lifers, 
              and anyone in need of hygiene facilities discover safe shower locations.
            </p>
            <div className="flex space-x-4">
              <span className="text-sm text-gray-400">© {currentYear} ShowerMap</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/map/" className="text-gray-300 hover:text-blue-400 transition-colors">Find Showers</Link></li>
              <li><Link href="/about/" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/guidelines/" className="text-gray-300 hover:text-blue-400 transition-colors">Usage Guidelines</Link></li>
              <li><Link href="/contact/" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Popular Regions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/usa/" className="text-gray-300 hover:text-blue-400 transition-colors">United States</Link></li>
              <li><Link href="/canada/" className="text-gray-300 hover:text-blue-400 transition-colors">Canada</Link></li>
              <li><Link href="/uk/" className="text-gray-300 hover:text-blue-400 transition-colors">United Kingdom</Link></li>
              <li><Link href="/australia/" className="text-gray-300 hover:text-blue-400 transition-colors">Australia</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>Helping people stay clean and dignified, wherever they are.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy/" className="hover:text-blue-400 transition-colors">Privacy</Link>
              <Link href="/terms/" className="hover:text-blue-400 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;