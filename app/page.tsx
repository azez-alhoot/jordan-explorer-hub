import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
// Dynamic imports for below-the-fold components to reduce initial JS bundle
// These load after initial render, reducing TTI and improving LCP
const About = dynamic(() => import('@/components/About'), { 
  loading: () => <div className="min-h-[400px]" />, // Placeholder to prevent layout shift
});
const Destinations = dynamic(() => import('@/components/Destinations'), {
  loading: () => <div className="min-h-[400px]" />,
});
const WhyUs = dynamic(() => import('@/components/WhyUs'), {
  loading: () => <div className="min-h-[400px]" />,
});
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="min-h-[400px]" />,
});
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Discover Jordan | Northern Badia Travel & Tourism',
  description: 'Explore the wonders of Jordan with Northern Badia Travel & Tourism. Discover Petra (UNESCO World Heritage), Wadi Rum desert, Dead Sea, ancient Jerash, and vibrant Amman. Licensed tour operator offering authentic Jordanian experiences, guided tours, and custom travel packages.',
  keywords: [
    'Jordan travel',
    'Petra tours',
    'Wadi Rum desert tours',
    'Dead Sea Jordan',
    'Jerash ancient city',
    'Amman tours',
    'Jordan travel agency',
    'Jordan tour packages',
  ],
  openGraph: {
    title: 'Discover Jordan\'s Ancient Wonders | Northern Badia Travel & Tourism',
    description: 'Experience the timeless beauty of Jordan\'s legendary landscapes. Visit Petra, Wadi Rum, Dead Sea, Jerash, and Amman with licensed tour operators.',
    images: [
      {
        url: '/assets/hero-petra.webp',
        width: 1200,
        height: 630,
        alt: 'Petra Treasury - Ancient Nabataean City carved into rose-colored cliffs',
      },
      {
        url: '/assets/wadi-rum.webp',
        width: 1200,
        height: 630,
        alt: 'Wadi Rum Desert - Dramatic sandstone mountains and red sands',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discover Jordan\'s Ancient Wonders | Northern Badia Travel & Tourism',
    description: 'Experience the timeless beauty of Jordan\'s legendary landscapes with Northern Badia Travel & Tourism.',
    images: ['/assets/hero-petra.webp'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Destinations />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

