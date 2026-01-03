'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, isRTL } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      labelKey: 'contact.address',
      value: 'Amman, Jordan',
      subvalue: 'Northern Badia Travel & Tourism',
    },
    {
      icon: Phone,
      labelKey: 'contact.phone',
      value: '+962 78 661 3160',
    },
    {
      icon: Mail,
      labelKey: 'contact.email',
      value: 'info@northernbadiatours.com',
    },
    {
      icon: Clock,
      labelKey: 'contact.hours',
      valueKey: 'contact.weekdays',
      subvalueKey: 'contact.weekends',
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: MessageCircle, href: 'https://wa.me/962786613160', label: 'WhatsApp', isWhatsApp: true },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          
          <span className="inline-block font-body text-accent uppercase tracking-[0.2em] text-xs sm:text-sm mb-3 sm:mb-4">
            {t('contact.subtitle')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">
            {t('contact.title')}
          </h2>
          <p className={`font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 ${isRTL ? 'leading-loose' : ''}`}>
            {t('contact.description')}
          </p>
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={isRTL ? 'lg:col-start-2' : ''}
          >
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={`p-4 sm:p-6 bg-card rounded-xl shadow-soft ${isRTL ? 'text-right' : ''}`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3 sm:mb-4 ${isRTL ? 'mr-0 ml-auto' : ''}`}>
                    <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg text-foreground mb-1 sm:mb-2">{t(info.labelKey)}</h3>
                  <p className="font-body text-sm sm:text-base text-foreground" dir={info.valueKey ? undefined : 'ltr'}>{info.valueKey ? t(info.valueKey) : info.value}</p>
                  <p className="font-body text-muted-foreground text-xs sm:text-sm" dir={info.subvalueKey ? undefined : 'ltr'}>{info.subvalueKey ? t(info.subvalueKey) : info.subvalue}</p>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className={`flex items-center gap-3 sm:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="font-body text-sm sm:text-base text-muted-foreground">{t('contact.followUs')}</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.isWhatsApp ? "_blank" : undefined}
                  rel={social.isWhatsApp ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {social.isWhatsApp ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  ) : (
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Map Placeholder / CTA */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`relative rounded-2xl overflow-hidden shadow-elevated bg-gradient-desert p-6 sm:p-8 flex flex-col justify-center items-center text-center min-h-[350px] sm:min-h-[400px] ${isRTL ? 'lg:col-start-1' : ''}`}
          >
            <div className="absolute inset-0 bg-primary/30" />
            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-3xl text-sand-light mb-3 sm:mb-4">
                {t('contact.ready')}
              </h3>
              <p className={`font-body text-base sm:text-lg text-sand/90 mb-6 sm:mb-8 max-w-md px-4 ${isRTL ? 'leading-loose' : ''}`}>
                {t('contact.readyDesc')}
              </p>
              <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <a
                  href="tel:+962786613160"
                  className={`inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-sand-light text-primary font-body font-semibold text-sm sm:text-base rounded-lg hover:bg-sand transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t('contact.callNow')}
                </a>
                <a
                  href="mailto:info@northernbadiatours.com"
                  className={`inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-sand-light text-sand-light font-body font-semibold text-sm sm:text-base rounded-lg hover:bg-sand-light/10 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t('contact.emailUs')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

