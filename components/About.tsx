'use client';

import { useRef, useState, useEffect } from 'react';
import { MapPin, Users, Award, Heart } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

// Defer Framer Motion - load after initial render to avoid blocking LCP
let motion: any = null;
let useInView: any = null;

const About = () => {
  const ref = useRef(null);
  const [motionLoaded, setMotionLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { t, isRTL } = useLanguage();

  // Load Framer Motion after mount to avoid blocking LCP
  useEffect(() => {
    import('framer-motion').then((mod) => {
      motion = mod.motion;
      useInView = mod.useInView;
      setMotionLoaded(true);
      // Set up intersection observer after motion loads
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => setIsInView(entry.isIntersecting),
          { threshold: 0.1, rootMargin: '-100px' }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
      }
    });
  }, []);

  const stats = [
    { icon: MapPin, value: '15+', label: t('about.destinations') },
    { icon: Users, value: '1000+', label: t('about.travelers') },
    { icon: Award, value: '10+', label: t('about.experience') },
    { icon: Heart, value: '100%', label: t('about.satisfaction') },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={ref} className={`grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          {/* Image - render without animation initially */}
          <div
            className={`relative ${isRTL ? 'lg:col-start-2' : ''}`}
            style={{ opacity: motionLoaded && isInView ? 1 : 1 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              {/* Lazy load below-the-fold image */}
              <Image
                src="/assets/petra-monastery.webp"
                alt="Petra Monastery (Ad-Deir) - Ancient Nabataean monument in Petra, Jordan"
                width={600}
                height={500}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className={`absolute -bottom-4 sm:-bottom-6 ${isRTL ? '-left-4 sm:-left-6' : '-right-4 sm:-right-6'} w-24 h-24 sm:w-32 sm:h-32 bg-accent rounded-2xl -z-10`} />
          </div>

          {/* Content - render without animation initially */}
          <div
            className={isRTL ? 'lg:col-start-1 text-right' : ''}
            style={{ opacity: motionLoaded && isInView ? 1 : 1 }}
          >
            <span className="inline-block font-body text-accent uppercase tracking-[0.2em] text-xs sm:text-sm mb-3 sm:mb-4">
              {t('about.subtitle')}
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6 leading-tight ${isRTL ? 'leading-relaxed' : ''}`}>
              {t('about.title1')}
              <span className="text-accent">{t('about.title2')}</span>
            </h2>
            <p className={`font-body text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed ${isRTL ? 'leading-loose' : ''}`}>
              {t('about.p1')}
            </p>
            <p className={`font-body text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed ${isRTL ? 'leading-loose' : ''}`}>
              {t('about.p2')}
            </p>

            {/* Stats - render without animation initially */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-2" />
                  <div className="font-display text-2xl sm:text-3xl text-foreground mb-1" dir="ltr">{stat.value}</div>
                  <div className="font-body text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

