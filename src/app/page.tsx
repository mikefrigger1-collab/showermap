import type { Metadata } from 'next';
import HomePage from './components/HomePage';

export const metadata: Metadata = {
  title: 'ShowerMap | Find Public Showers & Hygiene Facilities Worldwide',
  description: 'Find clean, safe public showers worldwide. Comprehensive directory of shower facilities for travelers, van lifers, truck drivers, and anyone needing hygiene access.',
};

export default function Page() {
  return <HomePage />;
}