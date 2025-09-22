// app/about/page.tsx
import type { Metadata } from 'next';
import AboutPage from './AboutPageComponent'; // You'll need to rename your current component

export const metadata: Metadata = {
  title: 'About | ShowerMap',
  description: 'Learn about ShowerMap\'s mission to connect people with public shower facilities worldwide. Supporting travelers, van lifers, truck drivers, and anyone needing access to clean, safe hygiene facilities.',
  openGraph: {
    title: 'About | ShowerMap',
    description: 'Learn about ShowerMap\'s mission to connect people with public shower facilities worldwide.',
    url: 'https://www.showermap.com/about/',
  },
  twitter: {
    title: 'About | ShowerMap',
    description: 'Learn about ShowerMap\'s mission to connect people with public shower facilities worldwide.',
  },
  alternates: {
    canonical: 'https://www.showermap.com/about/',
  },
};

export default function Page() {
  return <AboutPage />;
}