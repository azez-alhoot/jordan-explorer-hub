'use client';

import { useRef, useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

// Defer Framer Motion - load after initial render to avoid blocking LCP
let motion: any = null;
let useInView: any = null;

interface Destination {
  id: string;
  image: string;
  durationKey: string;
}

const destinationsData: Destination[] = [
  {
    id: 'petra',
    image: '/assets/hero-petra.webp',
    durationKey: 'dest.fullDay',
  },
  {
    id: 'wadirum',
    image: '/assets/wadi-rum.webp',
    durationKey: 'dest.halfFullDay',
  },
  {
    id: 'deadsea',
    image: '/assets/dead-sea.webp',
    durationKey: 'dest.halfDay',
  },
  {
    id: 'jerash',
    image: '/assets/jerash.webp',
    durationKey: 'dest.halfDay',
  },
  {
    id: 'amman',
    image: '/assets/amman.webp',
    durationKey: 'dest.halfDay',
  },
  {
    id: 'petranight',
    image: '/assets/petra-monastery.webp',
    durationKey: 'dest.evening',
  },
];

const DestinationCard = ({ destination, index }: { destination: Destination; index: number }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { t, isRTL } = useLanguage();

  // Set up intersection observer for lazy animation
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '-50px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const name = t(`dest.${destination.id}.name`);
  const subtitle = t(`dest.${destination.id}.subtitle`);
  const description = t(`dest.${destination.id}.description`);
  const highlights = [
    t(`dest.${destination.id}.h1`),
    t(`dest.${destination.id}.h2`),
    t(`dest.${destination.id}.h3`),
  ];
  const duration = t(destination.durationKey);
  
  // Enhanced alt text for SEO
  const altText = `${name} - ${subtitle} | ${description.substring(0, 100)} | Northern Badia Travel & Tourism`;

  // Render without animation initially - animation loads after Framer Motion
  return (
    <div
      ref={ref}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500"
      style={{ opacity: isInView ? 1 : 0.8 }}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        {/* Lazy load below-the-fold images - no priority for faster initial load */}
        <Image
          src={destination.image}
          alt={altText}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

        {/* Title overlay */}
        <div className={`absolute bottom-3 sm:bottom-4 ${isRTL ? 'right-3 sm:right-4 text-right' : 'left-3 sm:left-4'} ${isRTL ? 'left-3 sm:left-4' : 'right-3 sm:right-4'}`}>
          <h3 className="font-display text-lg sm:text-2xl text-sand-light mb-1">{name}</h3>
          <p className="font-body text-sand/80 text-xs sm:text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 sm:p-6 ${isRTL ? 'text-right' : ''}`}>
        <p className="font-body text-muted-foreground mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base">
          {description}
        </p>

        {/* Highlights */}
        <div className={`flex flex-wrap gap-2 mb-3 sm:mb-4 ${isRTL ? 'justify-end' : ''}`}>
          {highlights.map((highlight) => (
            <span
              key={highlight}
              className={`inline-flex items-center px-2 sm:px-3 py-1 bg-secondary text-secondary-foreground text-xs font-body rounded-full ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <MapPin className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
              {highlight}
            </span>
          ))}
        </div>

        {/* Duration */}
        <div className={`flex items-center justify-between pt-3 sm:pt-4 border-t border-border ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-body text-xs sm:text-sm">{duration}</span>
          </div>
          <a
            href="#contact"
            className="font-body font-semibold text-accent hover:text-terracotta-dark transition-colors text-xs sm:text-sm"
          >
            {t('dest.learnMore')} {isRTL ? '←' : '→'}
          </a>
        </div>
      </div>
    </div>
  );
};

const Destinations = () => {
  const headerRef = useRef(null);
  const [isHeaderInView, setIsHeaderInView] = useState(false);
  const { t, isRTL } = useLanguage();

  // Set up intersection observer
  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeaderInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '-100px' }
    );
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="destinations" className="py-16 sm:py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header - render without animation initially */}
        <div
          ref={headerRef}
          className="text-center mb-10 sm:mb-12 md:mb-16"
          style={{ opacity: isHeaderInView ? 1 : 0.9 }}
        >
          <span className="inline-block font-body text-accent uppercase tracking-[0.2em] text-xs sm:text-sm mb-3 sm:mb-4">
            {t('dest.subtitle')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">
            {t('dest.title')}
          </h2>
          <p className={`font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 ${isRTL ? 'leading-loose' : ''}`}>
            {t('dest.description')}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {destinationsData.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;

