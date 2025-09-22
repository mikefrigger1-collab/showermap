// app/guidelines/page.tsx
import type { Metadata } from 'next';
import GuidelinesPageComponent from './GuidelinesPageComponent'; // You'll need to rename your current component

export const metadata: Metadata = {
  title: 'Usage Guidelines | Safe & Respectful Access to Public Shower Facilities',
  description: 'Learn how to safely and respectfully use public shower facilities. Guidelines for travelers, van lifers, and anyone accessing community hygiene resources through ShowerMap.',
  openGraph: {
    title: 'Usage Guidelines | Safe & Respectful Access to Public Shower Facilities',
    description: 'Learn how to safely and respectfully use public shower facilities found through ShowerMap.',
    url: 'https://www.showermap.com/guidelines/',
  },
  twitter: {
    title: 'Usage Guidelines | Safe & Respectful Access to Public Shower Facilities',
    description: 'Learn how to safely and respectfully use public shower facilities found through ShowerMap.',
  },
  alternates: {
    canonical: 'https://www.showermap.com/guidelines/',
  },
};

export default function Page() {
  return <GuidelinesPageComponent />;
}