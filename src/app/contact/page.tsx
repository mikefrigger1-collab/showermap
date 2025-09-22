// app/contact/page.tsx
import type { Metadata } from 'next';
import ContactPageComponent from './ContactPageComponent'; // You'll need to rename your current component

export const metadata: Metadata = {
  title: 'Contact | ShowerMap',
  description: 'Contact ShowerMap to report new shower facilities, get help finding hygiene access, or join our community. Quick response times for safety concerns and location updates.',
  keywords: [
    'contact showermap',
    'report shower facility',
    'shower location help',
    'community support',
    'facility updates',
    'safety concerns'
  ],
  openGraph: {
  title: 'Contact | ShowerMap',
    description: 'Contact ShowerMap to report new shower facilities, get help finding hygiene access, or join our community.',
    url: 'https://www.showermap.com/contact/',
  },
  twitter: {
  title: 'Contact | ShowerMap',
    description: 'Contact ShowerMap to report new shower facilities, get help finding hygiene access, or join our community.',
  },
  alternates: {
    canonical: 'https://www.showermap.com/contact/',
  },
};

export default function Page() {
  return <ContactPageComponent />;
}