import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

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
      subvalue: 'bookings@northernbadia.com',
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
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-body text-accent uppercase tracking-[0.2em] text-sm mb-4">
            {t('contact.subtitle')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            {t('contact.title')}
          </h2>
          <p className={`font-body text-lg text-muted-foreground max-w-2xl mx-auto ${isRTL ? 'leading-loose' : ''}`}>
            {t('contact.description')}
          </p>
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-12 ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={isRTL ? 'lg:col-start-2' : ''}
          >
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={`p-6 bg-card rounded-xl shadow-soft ${isRTL ? 'text-right' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 ${isRTL ? 'mr-0 ml-auto' : ''}`}>
                    <info.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">{t(info.labelKey)}</h3>
                  <p className="font-body text-foreground">{info.valueKey ? t(info.valueKey) : info.value}</p>
                  <p className="font-body text-muted-foreground text-sm">{info.subvalueKey ? t(info.subvalueKey) : info.subvalue}</p>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="font-body text-muted-foreground">{t('contact.followUs')}</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Map Placeholder / CTA */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`relative rounded-2xl overflow-hidden shadow-elevated bg-gradient-desert p-8 flex flex-col justify-center items-center text-center min-h-[400px] ${isRTL ? 'lg:col-start-1' : ''}`}
          >
            <div className="absolute inset-0 bg-primary/30" />
            <div className="relative z-10">
              <h3 className="font-display text-3xl text-sand-light mb-4">
                {t('contact.ready')}
              </h3>
              <p className={`font-body text-lg text-sand/90 mb-8 max-w-md ${isRTL ? 'leading-loose' : ''}`}>
                {t('contact.readyDesc')}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <a
                  href="tel:+962786613160"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-sand-light text-primary font-body font-semibold rounded-lg hover:bg-sand transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Phone className="w-5 h-5" />
                  {t('contact.callNow')}
                </a>
                <a
                  href="mailto:info@northernbadiatours.com"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-sand-light text-sand-light font-body font-semibold rounded-lg hover:bg-sand-light/10 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Mail className="w-5 h-5" />
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
