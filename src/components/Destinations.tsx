import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Clock, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import petraImage from '@/assets/hero-petra.jpg';
import wadiRumImage from '@/assets/wadi-rum.jpg';
import deadSeaImage from '@/assets/dead-sea.jpg';
import jerashImage from '@/assets/jerash.jpg';
import ammanImage from '@/assets/amman.jpg';
import monasteryImage from '@/assets/petra-monastery.jpg';

interface Destination {
  id: string;
  image: string;
  rating: number;
  durationKey: string;
}

const destinationsData: Destination[] = [
  {
    id: 'petra',
    image: petraImage,
    rating: 5.0,
    durationKey: 'dest.fullDay',
  },
  {
    id: 'wadirum',
    image: wadiRumImage,
    rating: 4.9,
    durationKey: 'dest.halfFullDay',
  },
  {
    id: 'deadsea',
    image: deadSeaImage,
    rating: 4.8,
    durationKey: 'dest.halfDay',
  },
  {
    id: 'jerash',
    image: jerashImage,
    rating: 4.7,
    durationKey: 'dest.halfDay',
  },
  {
    id: 'amman',
    image: ammanImage,
    rating: 4.6,
    durationKey: 'dest.halfDay',
  },
  {
    id: 'petranight',
    image: monasteryImage,
    rating: 4.9,
    durationKey: 'dest.evening',
  },
];

const DestinationCard = ({ destination, index }: { destination: Destination; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t, isRTL } = useLanguage();

  const name = t(`dest.${destination.id}.name`);
  const subtitle = t(`dest.${destination.id}.subtitle`);
  const description = t(`dest.${destination.id}.description`);
  const highlights = [
    t(`dest.${destination.id}.h1`),
    t(`dest.${destination.id}.h2`),
    t(`dest.${destination.id}.h3`),
  ];
  const duration = t(destination.durationKey);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
        
        {/* Rating Badge */}
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex items-center gap-1 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full`}>
          <Star className="w-4 h-4 text-golden fill-golden" />
          <span className="font-body font-semibold text-sm">{destination.rating}</span>
        </div>

        {/* Title overlay */}
        <div className={`absolute bottom-4 ${isRTL ? 'right-4 text-right' : 'left-4'} ${isRTL ? 'left-4' : 'right-4'}`}>
          <h3 className="font-display text-2xl text-sand-light mb-1">{name}</h3>
          <p className="font-body text-sand/80 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${isRTL ? 'text-right' : ''}`}>
        <p className="font-body text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Highlights */}
        <div className={`flex flex-wrap gap-2 mb-4 ${isRTL ? 'justify-end' : ''}`}>
          {highlights.map((highlight) => (
            <span
              key={highlight}
              className={`inline-flex items-center px-3 py-1 bg-secondary text-secondary-foreground text-xs font-body rounded-full ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <MapPin className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
              {highlight}
            </span>
          ))}
        </div>

        {/* Duration */}
        <div className={`flex items-center justify-between pt-4 border-t border-border ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Clock className="w-4 h-4" />
            <span className="font-body text-sm">{duration}</span>
          </div>
          <a
            href="#contact"
            className="font-body font-semibold text-accent hover:text-terracotta-dark transition-colors"
          >
            {t('dest.learnMore')} {isRTL ? '←' : '→'}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Destinations = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });
  const { t, isRTL } = useLanguage();

  return (
    <section id="destinations" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-body text-accent uppercase tracking-[0.2em] text-sm mb-4">
            {t('dest.subtitle')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            {t('dest.title')}
          </h2>
          <p className={`font-body text-lg text-muted-foreground max-w-2xl mx-auto ${isRTL ? 'leading-loose' : ''}`}>
            {t('dest.description')}
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinationsData.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
