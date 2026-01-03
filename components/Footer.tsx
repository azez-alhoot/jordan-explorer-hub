'use client';

import { Facebook, Instagram, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, isRTL } = useLanguage();

  const quickLinks = [
    { nameKey: 'nav.home', href: '#home' },
    { nameKey: 'nav.about', href: '#about' },
    { nameKey: 'nav.destinations', href: '#destinations' },
    { nameKey: 'nav.whyUs', href: '#why-us' },
    { nameKey: 'nav.contact', href: '#contact' },
  ];

  const destinations = [
    { nameKey: 'dest.petra.name', href: '#destinations' },
    { nameKey: 'dest.wadirum.name', href: '#destinations' },
    { nameKey: 'dest.deadsea.name', href: '#destinations' },
    { nameKey: 'dest.jerash.name', href: '#destinations' },
    { nameKey: 'dest.amman.name', href: '#destinations' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 ${isRTL ? 'text-right' : ''}`}>
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-display text-lg sm:text-xl text-sand-light mb-3 sm:mb-4">Northern Badia Travel & Tourism</h3>
            <p className={`font-body text-sm sm:text-base text-sand/80 mb-4 sm:mb-6 leading-relaxed ${isRTL ? 'leading-loose' : ''}`}>
              {t('footer.description')}
            </p>
            <div className={`flex items-center gap-3 sm:gap-4 ${isRTL ? 'justify-end' : ''}`}>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://wa.me/962786613160"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg sm:text-xl text-sand-light mb-4 sm:mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="font-body text-sm sm:text-base text-sand/70 hover:text-accent transition-colors"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display text-lg sm:text-xl text-sand-light mb-4 sm:mb-6">{t('footer.destinations')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {destinations.map((dest) => (
                <li key={dest.nameKey}>
                  <Link
                    href={dest.href}
                    className="font-body text-sm sm:text-base text-sand/70 hover:text-accent transition-colors"
                  >
                    {t(dest.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg sm:text-xl text-sand-light mb-4 sm:mb-6">{t('footer.contactInfo')}</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className={`flex items-start gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1 flex-shrink-0" />
                <span className="font-body text-sm sm:text-base text-sand/70">Amman, Jordan</span>
              </li>
              <li className={`flex items-start gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1 flex-shrink-0" />
                <span className="font-body text-sm sm:text-base text-sand/70" dir="ltr">+962 79 123 4567</span>
              </li>
              <li className={`flex items-start gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1 flex-shrink-0" />
                <span className="font-body text-sm sm:text-base text-sand/70 break-all">info@northernbadiatours.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className={`flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <p className="font-body text-xs sm:text-sm text-sand/75 text-center sm:text-left">
              © {currentYear} Northern Badia Travel & Tourism. {t('footer.rights')}
            </p>
            <p className="font-body text-xs sm:text-sm text-sand/75 text-center sm:text-right">
              {t('footer.licensed')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

