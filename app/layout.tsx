import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display, Lato, Noto_Sans_Arabic } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import StructuredData from '@/components/StructuredData';
import './globals.css';

// Font loading optimized for LCP: defer font loading to not block hero image
// Hero image is LCP element, fonts load after but use swap to prevent FOIT
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap', // Prevents FOIT, shows fallback immediately
  preload: false, // Defer font - hero image is LCP, not text
  fallback: ['serif'],
  adjustFontFallback: true, // Reduces layout shift
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'], // Removed 300 weight to reduce font file size
  variable: '--font-body',
  display: 'swap', // Prevents FOIT
  preload: false, // Defer body font - not critical for LCP
  fallback: ['sans-serif'],
  adjustFontFallback: true,
});

// Arabic font - only load when RTL is active (lazy loaded)
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '700'], // Removed 300 weight to reduce font file size
  variable: '--font-arabic',
  display: 'swap',
  preload: false, // Only load when needed (RTL)
  fallback: ['sans-serif'],
});

export const metadata: Metadata = {
  title: {
    default: 'Northern Badia Travel & Tourism | Discover Jordan | البادية الشمالية للسياحة',
    template: '%s | Northern Badia Travel & Tourism',
  },
  description: 'Explore the wonders of Jordan with Northern Badia Travel & Tourism. Discover Petra, Wadi Rum, the Dead Sea, Jerash, and Amman. Licensed tour operator offering authentic Jordanian experiences, guided tours, and custom travel packages.',
  keywords: [
    'Jordan travel',
    'Petra tours',
    'Wadi Rum tours',
    'Dead Sea Jordan',
    'Jordan tourism',
    'Northern Badia Travel',
    'Amman tours',
    'Jerash tours',
    'Jordan travel agency',
    'Petra by night',
    'Jordan tour operator',
    'Jordan vacation',
    'Jordan travel packages',
    'Jordan guided tours',
    'Hashemite Kingdom of Jordan',
    'Jordan destinations',
    'Jordan sightseeing',
  ],
  authors: [{ name: 'Northern Badia Travel & Tourism' }],
  creator: 'Northern Badia Travel & Tourism',
  publisher: 'Northern Badia Travel & Tourism',
  metadataBase: new URL('https://northernbadiatours.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': 'https://northernbadiatours.com/en',
      'ar': 'https://northernbadiatours.com/ar',
      'x-default': 'https://northernbadiatours.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_JO'],
    url: 'https://northernbadiatours.com',
    siteName: 'Northern Badia Travel & Tourism',
    title: 'Northern Badia Travel & Tourism | Discover Jordan\'s Ancient Wonders',
    description: 'Experience the timeless beauty of Jordan\'s legendary landscapes with Northern Badia Travel & Tourism. Licensed tour operator offering authentic experiences to Petra, Wadi Rum, Dead Sea, and more.',
    images: [
      {
        url: '/assets/hero-petra.webp',
        width: 1200,
        height: 630,
        alt: 'Petra Treasury - Ancient Nabataean City in Jordan',
      },
      {
        url: '/assets/wadi-rum.webp',
        width: 1200,
        height: 630,
        alt: 'Wadi Rum Desert - Valley of the Moon in Jordan',
      },
      {
        url: '/assets/dead-sea.webp',
        width: 1200,
        height: 630,
        alt: 'Dead Sea - Lowest Point on Earth in Jordan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@NorthernBadia',
    creator: '@NorthernBadia',
    title: 'Northern Badia Travel & Tourism | Discover Jordan',
    description: 'Experience the timeless beauty of Jordan\'s legendary landscapes with Northern Badia Travel & Tourism.',
    images: ['/assets/hero-petra.webp'],
  },
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
  verification: {
    google: 'G-WPKEF8V77G',
  },
  category: 'travel',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/assets/badia-logo.webp',
  },
  other: {
    'geo.region': 'JO',
    'geo.placename': 'Amman',
    'geo.position': '31.9539;35.9106',
    'ICBM': '31.9539, 35.9106',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* CRITICAL: Preload hero images FIRST - must be first network request for LCP */}
        {/* Mobile hero - 27KB, highest priority */}
        <link 
          rel="preload" 
          as="image" 
          href="/assets/hero-petra-mobile.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        {/* Desktop hero - <200KB, highest priority */}
        <link 
          rel="preload" 
          as="image" 
          href="/assets/hero-petra.webp"
          media="(min-width: 769px)"
          fetchPriority="high"
        />
        {/* Font preconnects - after image preloads */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Analytics - lowest priority, non-blocking */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${lato.variable} ${notoSansArabic.variable} antialiased`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WPKEF8V77G"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WPKEF8V77G', {
              page_path: window.location.pathname,
            });
            
            // Suppress errors from old Universal Analytics endpoints
            if (typeof window !== 'undefined') {
              const originalError = window.onerror;
              window.onerror = function(msg, url, line, col, error) {
                // Suppress errors from old analytics.google.com endpoints
                if (msg && typeof msg === 'string' && msg.includes('analytics.google.com')) {
                  return true; // Suppress the error
                }
                // Call original error handler if it exists
                if (originalError) {
                  return originalError.apply(this, arguments);
                }
                return false;
              };
            }
          `}
        </Script>
        <LanguageProvider>
          <TooltipProvider>
            {/* StructuredData is critical for SEO - keep synchronous */}
            <StructuredData />
            {/* Toaster components are non-critical - can be deferred but keeping for UX */}
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

