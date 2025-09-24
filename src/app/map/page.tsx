// app/map/page.tsx
import type { Metadata } from 'next';
import LightweightMapClient from './LightweightMapClient';

export const metadata: Metadata = {
  title: 'Find Public Showers Near You | Interactive Shower Map | ShowerMap',
  description: 'Find public showers, truck stops, gyms, and community centers with shower facilities. Search by location, filter by amenities, and get directions to clean, safe shower options.',
  keywords: [
    'shower map',
    'public shower map',
    'find showers near me',
    'truck stop showers',
    'gym shower locations',
    'free shower map',
    'shower directory'
  ],
  openGraph: {
    title: 'Interactive Shower Map | Find Public Showers Near You',
    description: 'Search and filter thousands of shower locations worldwide. Find free showers, truck stops, gyms, and community centers.',
    url: 'https://www.showermap.com/map/',
  },
  alternates: {
    canonical: 'https://www.showermap.com/map/',
  },
};

export default function MapPage() {
  return <LightweightMapClient />;
}