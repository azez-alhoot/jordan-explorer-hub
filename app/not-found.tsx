import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="font-display text-6xl md:text-8xl text-foreground mb-4">404</h1>
        <h2 className="font-display text-2xl md:text-4xl text-foreground mb-4">Page Not Found</h2>
        <p className="font-body text-lg text-muted-foreground mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-body font-semibold text-lg rounded-lg hover:bg-terracotta-dark transition-colors shadow-elevated"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

