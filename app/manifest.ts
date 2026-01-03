import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Northern Badia Travel & Tourism | Discover Jordan',
    short_name: 'Northern Badia',
    description: 'Explore the wonders of Jordan with Northern Badia Travel & Tourism. Discover Petra, Wadi Rum, Dead Sea, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1a',
    theme_color: '#c9a961',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
      },
      {
        src: '/assets/badia-logo.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/assets/badia-logo.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
    categories: ['travel', 'tourism'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait-primary',
  };
}

