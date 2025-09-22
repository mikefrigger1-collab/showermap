// app/privacy/page.tsx
import type { Metadata } from 'next';
import PrivacyPageComponent from './PrivacyPageComponent'; // You'll need to rename your current component

export const metadata: Metadata = {
  title: 'Privacy Policy | Shower Map',
  description: 'Learn how ShowerMap collects, uses, and protects your personal information. Our privacy policy covers data collection, user reviews, cookies, and your privacy rights.',

  openGraph: {
    title: 'Privacy Policy - How ShowerMap Protects Your Personal Information',
    description: 'Learn how ShowerMap collects, uses, and protects your personal information and privacy rights.',
    url: 'https://www.showermap.com/privacy/',
  },
  twitter: {
    title: 'Privacy Policy - How ShowerMap Protects Your Personal Information',
    description: 'Learn how ShowerMap collects, uses, and protects your personal information and privacy rights.',
  },
  alternates: {
    canonical: 'https://www.showermap.com/privacy/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PrivacyPageComponent />;
}