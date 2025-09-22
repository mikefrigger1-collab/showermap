// app/terms/page.tsx
import type { Metadata } from 'next';
import TermsPageComponent from './TermsPageComponent'; // You'll need to rename your current component

export const metadata: Metadata = {
  title: 'Terms of Service | ShowerMap',
  description: 'Read ShowerMap\'s terms of service covering acceptable use, user-generated content, facility information accuracy, liability limitations, and community guidelines.',
  openGraph: {
  title: 'Terms of Service | ShowerMap',
    description: 'Read ShowerMap\'s terms of service covering usage, content guidelines, and community standards.',
    url: 'https://www.showermap.com/terms/',
  },
  twitter: {
  title: 'Terms of Service | ShowerMap',
    description: 'Read ShowerMap\'s terms of service covering usage, content guidelines, and community standards.',
  },
  alternates: {
    canonical: 'https://www.showermap.com/terms/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <TermsPageComponent />;
}