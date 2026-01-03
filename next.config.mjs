/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Required for static export - images must be unoptimized
    // Static hosting doesn't support Next.js Image Optimization API
    unoptimized: true,
  },
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      'lucide-react', // Icon library - tree shake unused icons
      'framer-motion', // Animation library - only import used functions
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-tooltip',
    ],
  },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Static export for Hostinger shared hosting
  output: 'export',
  // Target modern browsers only - disable legacy JS transpilation
  // Reduces bundle size significantly by not transpiling modern features
  swcMinify: true, // Use SWC minifier (faster, smaller output)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Modern browser targets - no IE11, no legacy polyfills
  // This dramatically reduces bundle size
  transpilePackages: [],
  // Skip type checking during build (types are checked separately)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Webpack config to reduce bundle size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Tree shake unused exports
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }
    return config;
  },
};

export default nextConfig;

