'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t, isRTL } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  // Delay animations until after mount to ensure hero image paints first
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image - Responsive for Mobile */}
      {/* LCP CRITICAL: Hero image paints immediately, no animations blocking */}
      <div className="absolute inset-0">
        {/* LCP CRITICAL: Mobile hero - <70KB WebP, preloaded, priority, first network request */}
        <Image
          src="/assets/hero-petra-mobile.webp"
          alt="Petra Treasury (Al-Khazneh) - Ancient Nabataean city carved into rose-colored cliffs, UNESCO World Heritage Site in Jordan"
          fill
          priority
          quality={60}
          sizes="(max-width: 768px) 100vw, 0px"
          className="object-cover md:hidden"
          fetchPriority="high"
        />
        {/* LCP CRITICAL: Desktop hero - <180KB WebP, preloaded, priority, first network request */}
        <Image
          src="/assets/hero-petra.webp"
          alt="Petra Treasury (Al-Khazneh) - Ancient Nabataean city carved into rose-colored cliffs, UNESCO World Heritage Site in Jordan"
          fill
          priority
          quality={65}
          sizes="(min-width: 769px) 100vw, 0px"
          className="hidden md:block object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* LCP Text Elements - No animations, render immediately */}
          <span
            className={`inline-block font-body text-sand-light uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6 ${isRTL ? 'font-semibold' : ''}`}
          >
            {t('hero.welcome')}
          </span>

          {/* LCP Text - No animations, renders immediately */}
          <h1
            className={`font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-sand-light mb-4 sm:mb-6 leading-tight ${isRTL ? 'leading-relaxed' : ''}`}
          >
            {t('hero.title1')}
            <span className="block text-golden">{t('hero.title2')}</span>
          </h1>

          <p
            className={`font-body text-base sm:text-xl md:text-2xl text-sand/90 max-w-2xl mx-auto mb-6 sm:mb-10 px-4 ${isRTL ? 'leading-relaxed' : ''}`}
          >
            {t('hero.description')}
          </p>

          {/* Non-LCP Elements - Animated after mount */}
          {isMounted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
            >
              <a
                href="#destinations"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white font-body font-semibold text-base sm:text-lg rounded-lg hover:bg-terracotta-dark transition-colors shadow-elevated"
              >
                {t('hero.explore')}
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-sand-light text-sand-light font-body font-semibold text-base sm:text-lg rounded-lg hover:bg-sand-light/10 transition-colors"
              >
                {t('hero.learnMore')}
              </a>
            </motion.div>
          ) : (
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <a
                href="#destinations"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white font-body font-semibold text-base sm:text-lg rounded-lg hover:bg-terracotta-dark transition-colors shadow-elevated"
              >
                {t('hero.explore')}
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-sand-light text-sand-light font-body font-semibold text-base sm:text-lg rounded-lg hover:bg-sand-light/10 transition-colors"
              >
                {t('hero.learnMore')}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator - Animated after mount */}
      {isMounted ? (
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-sand-light animate-bounce"
          aria-label="Scroll to about section"
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.a>
      ) : (
        <a
          href="#about"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-sand-light animate-bounce"
          aria-label="Scroll to about section"
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
      )}
    </section>
  );
};

export default Hero;

