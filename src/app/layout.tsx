// src/app/layout.tsx - ONLY TypeScript/React code
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_PRODUCTION_URL || 'https://www.showermap.com'),
  
  title: {
    template: '%s | ShowerMap - Find Public Showers Worldwide',
    default: 'ShowerMap - Find Public Showers & Hygiene Facilities Worldwide'
  },
  
  description: 'Find clean, safe public showers worldwide. Comprehensive directory of shower facilities for travelers, van lifers, truck drivers, and anyone needing hygiene access. Verified locations with hours, pricing, and amenities.',
  
  keywords: [
    'public showers',
    'shower facilities', 
    'hygiene facilities',
    'van life showers',
    'truck stop showers',
    'travel showers',
    'backpacker facilities',
    'homeless services',
    'shower locations',
    'public bathhouses'
  ],
  
  authors: [{ name: 'ShowerMap Team' }],
  creator: 'ShowerMap',
  publisher: 'ShowerMap',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.showermap.com/',
    title: 'ShowerMap - Find Public Showers & Hygiene Facilities Worldwide',
    description: 'Find clean, safe public showers worldwide. Comprehensive directory for travelers, van lifers, and anyone needing hygiene access.',
    siteName: 'ShowerMap',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'ShowerMap - Find Public Showers Worldwide'
    }]
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'ShowerMap - Find Public Showers Worldwide',
    description: 'Find clean, safe public showers for travelers, van lifers, and anyone needing hygiene access.',
    images: ['/images/og-image.jpg'],
  },
  
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code'
  },
  
  alternates: {
    canonical: 'https://www.showermap.com/',
    languages: {
      'en-US': 'https://www.showermap.com/',
      // 'es-ES': 'https://www.showermap.com/es/',
      // 'fr-FR': 'https://www.showermap.com/fr/',
    }
  },
  
  category: 'travel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme colors */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* Additional SEO meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ShowerMap",
              "url": "https://www.showermap.com",
              "logo": "https://www.showermap.com/images/logo.png",
              "description": "Find clean, safe public showers worldwide. Comprehensive directory of shower facilities for travelers and anyone needing hygiene access.",
              "sameAs": [
                // Add social media URLs when available
              ]
            })
          }}
        />
        
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ShowerMap",
              "url": "https://www.showermap.com",
              "description": "Find clean, safe public showers worldwide",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.showermap.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-white">
        {children}
        
        {/* Google Auto Ads - Add when ready */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}