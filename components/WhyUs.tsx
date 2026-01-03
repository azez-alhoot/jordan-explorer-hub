'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Users, Compass, HeartHandshake, Globe, Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Shield,
      titleKey: 'why.licensed.title',
      descKey: 'why.licensed.desc',
    },
    {
      icon: Users,
      titleKey: 'why.experts.title',
      descKey: 'why.experts.desc',
    },
    {
      icon: Compass,
      titleKey: 'why.authentic.title',
      descKey: 'why.authentic.desc',
    },
    {
      icon: HeartHandshake,
      titleKey: 'why.personalized.title',
      descKey: 'why.personalized.desc',
    },
    {
      icon: Globe,
      titleKey: 'why.sustainable.title',
      descKey: 'why.sustainable.desc',
    },
    {
      icon: Camera,
      titleKey: 'why.moments.title',
      descKey: 'why.moments.desc',
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-golden rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className="inline-block font-body text-accent uppercase tracking-[0.2em] text-xs sm:text-sm mb-3 sm:mb-4">
            {t('why.subtitle')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-sand-light mb-4 sm:mb-6">
            {t('why.title')}
          </h2>
          <p className={`font-body text-base sm:text-lg text-sand/80 max-w-2xl mx-auto px-4 ${isRTL ? 'leading-loose' : ''}`}>
            {t('why.description')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group p-6 sm:p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300 ${isRTL ? 'text-right' : ''}`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-accent/30 transition-colors ${isRTL ? 'mr-0 ml-auto' : ''}`}>
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
              </div>
              <h3 className="font-display text-lg sm:text-xl text-sand-light mb-2 sm:mb-3">{t(feature.titleKey)}</h3>
              <p className={`font-body text-sm sm:text-base text-sand/70 leading-relaxed ${isRTL ? 'leading-loose' : ''}`}>{t(feature.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

