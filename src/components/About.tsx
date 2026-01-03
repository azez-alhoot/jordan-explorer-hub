import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Users, Award, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import petraImage from '@/assets/petra-monastery.jpg';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, isRTL } = useLanguage();

  const stats = [
    { icon: MapPin, value: '15+', label: t('about.destinations') },
    { icon: Users, value: '1000+', label: t('about.travelers') },
    { icon: Award, value: '10+', label: t('about.experience') },
    { icon: Heart, value: '100%', label: t('about.satisfaction') },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`relative ${isRTL ? 'lg:col-start-2' : ''}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={petraImage}
                alt="Petra Monastery"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className={`absolute -bottom-6 ${isRTL ? '-left-6' : '-right-6'} w-32 h-32 bg-accent rounded-2xl -z-10`} />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={isRTL ? 'lg:col-start-1 text-right' : ''}
          >
            <span className="inline-block font-body text-accent uppercase tracking-[0.2em] text-sm mb-4">
              {t('about.subtitle')}
            </span>
            <h2 className={`font-display text-4xl md:text-5xl text-foreground mb-6 leading-tight ${isRTL ? 'leading-relaxed' : ''}`}>
              {t('about.title1')}
              <span className="text-accent">{t('about.title2')}</span>
            </h2>
            <p className={`font-body text-lg text-muted-foreground mb-6 leading-relaxed ${isRTL ? 'leading-loose' : ''}`}>
              {t('about.p1')}
            </p>
            <p className={`font-body text-lg text-muted-foreground mb-8 leading-relaxed ${isRTL ? 'leading-loose' : ''}`}>
              {t('about.p2')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="font-display text-3xl text-foreground mb-1">{stat.value}</div>
                  <div className="font-body text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
