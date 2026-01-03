'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [motionLoaded, setMotionLoaded] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();

  // Load Framer Motion after mount to avoid blocking LCP
  useEffect(() => {
    import('framer-motion').then(() => {
      setMotionLoaded(true);
    });
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.destinations'), href: '#destinations' },
    { name: t('nav.whyUs'), href: '#why-us' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  // Render nav without animation initially - animation loads after mount
  const NavComponent = motionLoaded ? require('framer-motion').motion.nav : 'nav';
  const MotionDiv = motionLoaded ? require('framer-motion').motion.div : 'div';

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="tel:+962786613160" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline" dir="ltr">+962 78 661 3160</span>
              <span className="sm:hidden" dir="ltr">+962 78 661</span>
            </a>
            <a href="mailto:info@northernbadiatours.com" className="hidden lg:flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs">info@northernbadiatours.com</span>
            </a>
          </div>
          <span className="font-body hidden lg:inline-block">{t('nav.tagline')}</span>
        </div>
      </div>

      {/* Main navbar - no animation initially to avoid blocking LCP */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-soft'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <Link href="#home" className="flex items-center gap-2 sm:gap-3 z-10">
              <Image 
                src="/assets/logo-header.webp" 
                alt="Northern Badia Travel & Tourism - Discover Jordan" 
                height={64} 
                width={200} 
                className="h-12 w-auto sm:h-16" 
                priority
                quality={80}
                sizes="(max-width: 640px) 150px, 200px"
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-body font-medium text-foreground hover:text-accent transition-colors relative group text-sm xl:text-base"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
              
            {/* Language Toggle - Fixed Right */}
            <div className="hidden lg:block z-10">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 xl:px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors font-body font-medium text-sm xl:text-base"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? 'العربية' : 'English'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleLanguage}
                className="p-2 bg-secondary rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Toggle language"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground hover:text-accent transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - no animation to avoid blocking */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3 sm:gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-body font-medium text-foreground hover:text-accent transition-colors py-2 text-base text-left"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-2 text-sm items-start">
                <a href="tel:+962786613160" className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">+962 78 661 3160</span>
                </a>
                <a href="mailto:info@northernbadiatours.com" className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  info@northernbadiatours.com
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
