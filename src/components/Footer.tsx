import { Facebook, Instagram, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.jpg';

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
      <div className="container mx-auto px-6 py-16">
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-12 ${isRTL ? 'text-right' : ''}`}>
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Northern Badia" className={`h-20 w-auto mb-6 rounded-lg ${isRTL ? 'mr-0 ml-auto' : ''}`} />
            <p className={`font-body text-sand/80 mb-6 leading-relaxed ${isRTL ? 'leading-loose' : ''}`}>
              {t('footer.description')}
            </p>
            <div className={`flex items-center gap-4 ${isRTL ? 'justify-end' : ''}`}>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl text-sand-light mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.nameKey}>
                  <a
                    href={link.href}
                    className="font-body text-sand/70 hover:text-accent transition-colors"
                  >
                    {t(link.nameKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display text-xl text-sand-light mb-6">{t('footer.destinations')}</h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.nameKey}>
                  <a
                    href={dest.href}
                    className="font-body text-sand/70 hover:text-accent transition-colors"
                  >
                    {t(dest.nameKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-xl text-sand-light mb-6">{t('footer.contactInfo')}</h4>
            <ul className="space-y-4">
              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="font-body text-sand/70">Amman, Jordan</span>
              </li>
              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="font-body text-sand/70">+962 79 123 4567</span>
              </li>
              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="font-body text-sand/70">info@northernbadiatours.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 py-6">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="font-body text-sm text-sand/60">
              © {currentYear} Northern Badia Travel & Tourism. {t('footer.rights')}
            </p>
            <p className="font-body text-sm text-sand/60">
              {t('footer.licensed')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
