import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.destinations': 'Destinations',
    'nav.whyUs': 'Why Us',
    'nav.contact': 'Contact',
    'nav.tagline': 'Your Gateway to Jordan\'s Wonders',

    // Hero
    'hero.welcome': 'Welcome to Jordan',
    'hero.title1': 'Discover the',
    'hero.title2': 'Ancient Kingdom',
    'hero.description': 'Experience the timeless beauty of Jordan\'s legendary landscapes, from the rose-red city of Petra to the endless deserts of Wadi Rum.',
    'hero.explore': 'Explore Destinations',
    'hero.learnMore': 'Learn More',

    // About
    'about.subtitle': 'About Northern Badia',
    'about.title1': 'Your Trusted Partner for',
    'about.title2': ' Jordan Adventures',
    'about.p1': 'Northern Badia Travel & Tourism is a premier Jordanian travel company dedicated to showcasing the rich heritage, stunning landscapes, and warm hospitality of the Hashemite Kingdom of Jordan.',
    'about.p2': 'With deep roots in the Jordanian tourism industry, we offer authentic experiences that take you beyond the typical tourist trails. From the ancient Nabataean city of Petra to the Martian landscapes of Wadi Rum, we help you discover Jordan\'s treasures with passion and expertise.',
    'about.destinations': 'Destinations',
    'about.travelers': 'Happy Travelers',
    'about.experience': 'Years Experience',
    'about.satisfaction': 'Satisfaction',

    // Destinations
    'dest.subtitle': 'Explore Jordan',
    'dest.title': 'Popular Destinations',
    'dest.description': 'Discover the wonders of Jordan through our carefully curated destinations, each offering unique experiences and unforgettable memories.',
    'dest.learnMore': 'Learn More',
    'dest.petra.name': 'Petra',
    'dest.petra.subtitle': 'The Rose-Red City',
    'dest.petra.description': 'A UNESCO World Heritage Site, Petra is an ancient Nabataean city carved into rose-colored cliffs over 2,000 years ago.',
    'dest.petra.h1': 'Treasury (Al-Khazneh)',
    'dest.petra.h2': 'Monastery (Ad-Deir)',
    'dest.petra.h3': 'Royal Tombs',
    'dest.wadirum.name': 'Wadi Rum',
    'dest.wadirum.subtitle': 'Valley of the Moon',
    'dest.wadirum.description': 'A dramatic desert landscape of towering sandstone mountains, endless red sands, and ancient rock art.',
    'dest.wadirum.h1': 'Jeep Tours',
    'dest.wadirum.h2': 'Bedouin Camps',
    'dest.wadirum.h3': 'Stargazing',
    'dest.deadsea.name': 'Dead Sea',
    'dest.deadsea.subtitle': 'The Lowest Point on Earth',
    'dest.deadsea.description': 'Float effortlessly in the hypersaline waters and rejuvenate with mineral-rich mud treatments.',
    'dest.deadsea.h1': 'Floating Experience',
    'dest.deadsea.h2': 'Mud Therapy',
    'dest.deadsea.h3': 'Sunset Views',
    'dest.jerash.name': 'Jerash',
    'dest.jerash.subtitle': 'Ancient Roman City',
    'dest.jerash.description': 'One of the best-preserved Roman cities outside Italy, featuring colonnaded streets and magnificent temples.',
    'dest.jerash.h1': 'Oval Plaza',
    'dest.jerash.h2': 'Roman Columns',
    'dest.jerash.h3': 'Ancient Theaters',
    'dest.amman.name': 'Amman',
    'dest.amman.subtitle': 'The White City',
    'dest.amman.description': 'Jordan\'s vibrant capital, blending ancient history with modern culture, markets, and cuisine.',
    'dest.amman.h1': 'Citadel',
    'dest.amman.h2': 'Roman Theater',
    'dest.amman.h3': 'Rainbow Street',
    'dest.petranight.name': 'Petra by Night',
    'dest.petranight.subtitle': 'Magical Experience',
    'dest.petranight.description': 'Walk through the Siq illuminated by 1,800 candles to witness the Treasury glowing under the stars.',
    'dest.petranight.h1': 'Candlelit Siq',
    'dest.petranight.h2': 'Bedouin Music',
    'dest.petranight.h3': 'Treasury Views',
    'dest.fullDay': 'Full Day',
    'dest.halfDay': 'Half Day',
    'dest.halfFullDay': 'Half/Full Day',
    'dest.evening': 'Evening',

    // Why Us
    'why.subtitle': 'Why Choose Us',
    'why.title': 'The Northern Badia Difference',
    'why.description': 'We\'re not just a travel company – we\'re your gateway to authentic Jordanian experiences, backed by expertise, passion, and genuine hospitality.',
    'why.licensed.title': 'Licensed & Trusted',
    'why.licensed.desc': 'Officially licensed by the Jordanian Ministry of Tourism with years of trusted service.',
    'why.experts.title': 'Local Experts',
    'why.experts.desc': 'Our team consists of passionate Jordanians with deep knowledge of every destination.',
    'why.authentic.title': 'Authentic Experiences',
    'why.authentic.desc': 'Go beyond typical tours with genuine cultural immersion and hidden gems.',
    'why.personalized.title': 'Personalized Service',
    'why.personalized.desc': 'We tailor every journey to match your interests, pace, and preferences.',
    'why.sustainable.title': 'Sustainable Tourism',
    'why.sustainable.desc': 'We practice responsible tourism that benefits local communities and preserves heritage.',
    'why.moments.title': 'Unforgettable Moments',
    'why.moments.desc': 'Create memories that last a lifetime with our thoughtfully designed experiences.',

    // Contact
    'contact.subtitle': 'Get In Touch',
    'contact.title': 'Contact Us',
    'contact.description': 'Ready to explore Jordan? Have questions about our destinations? We\'d love to hear from you and help plan your perfect trip.',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Working Hours',
    'contact.weekdays': 'Sun - Thu: 9:00 AM - 6:00 PM',
    'contact.weekends': 'Fri - Sat: 10:00 AM - 4:00 PM',
    'contact.followUs': 'Follow us:',
    'contact.ready': 'Ready to Explore Jordan?',
    'contact.readyDesc': 'Contact us today to start planning your unforgettable journey through the wonders of the Hashemite Kingdom.',
    'contact.callNow': 'Call Now',
    'contact.emailUs': 'Email Us',

    // Footer
    'footer.description': 'Your trusted partner for authentic Jordanian travel experiences. Discover the wonders of the Hashemite Kingdom with us.',
    'footer.quickLinks': 'Quick Links',
    'footer.destinations': 'Destinations',
    'footer.contactInfo': 'Contact Info',
    'footer.rights': 'All rights reserved.',
    'footer.licensed': 'Licensed by the Jordanian Ministry of Tourism',
  },
  ar: {
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.destinations': 'الوجهات',
    'nav.whyUs': 'لماذا نحن',
    'nav.contact': 'اتصل بنا',
    'nav.tagline': 'بوابتك لعجائب الأردن',

    // Hero
    'hero.welcome': 'مرحباً بكم في الأردن',
    'hero.title1': 'اكتشف',
    'hero.title2': 'المملكة العريقة',
    'hero.description': 'استمتع بجمال المناظر الطبيعية الأسطورية في الأردن، من مدينة البتراء الوردية إلى صحراء وادي رم اللامتناهية.',
    'hero.explore': 'استكشف الوجهات',
    'hero.learnMore': 'اعرف المزيد',

    // About
    'about.subtitle': 'عن البادية الشمالية',
    'about.title1': 'شريكك الموثوق في',
    'about.title2': ' مغامرات الأردن',
    'about.p1': 'البادية الشمالية للسياحة والسفر هي شركة سياحية أردنية رائدة مكرسة لإبراز التراث الغني والمناظر الطبيعية الخلابة وكرم الضيافة في المملكة الأردنية الهاشمية.',
    'about.p2': 'بجذور عميقة في صناعة السياحة الأردنية، نقدم تجارب أصيلة تأخذك إلى ما هو أبعد من المسارات السياحية التقليدية. من مدينة البتراء النبطية القديمة إلى مناظر وادي رم الصحراوية، نساعدك على اكتشاف كنوز الأردن بشغف وخبرة.',
    'about.destinations': 'وجهة',
    'about.travelers': 'مسافر سعيد',
    'about.experience': 'سنوات خبرة',
    'about.satisfaction': 'رضا العملاء',

    // Destinations
    'dest.subtitle': 'استكشف الأردن',
    'dest.title': 'الوجهات الشهيرة',
    'dest.description': 'اكتشف عجائب الأردن من خلال وجهاتنا المختارة بعناية، كل منها يقدم تجارب فريدة وذكريات لا تُنسى.',
    'dest.learnMore': 'اعرف المزيد',
    'dest.petra.name': 'البتراء',
    'dest.petra.subtitle': 'المدينة الوردية',
    'dest.petra.description': 'موقع تراث عالمي لليونسكو، البتراء مدينة نبطية قديمة منحوتة في صخور وردية اللون منذ أكثر من 2000 عام.',
    'dest.petra.h1': 'الخزنة',
    'dest.petra.h2': 'الدير',
    'dest.petra.h3': 'المقابر الملكية',
    'dest.wadirum.name': 'وادي رم',
    'dest.wadirum.subtitle': 'وادي القمر',
    'dest.wadirum.description': 'منظر صحراوي مذهل من جبال الحجر الرملي الشاهقة والرمال الحمراء اللامتناهية والنقوش الصخرية القديمة.',
    'dest.wadirum.h1': 'جولات الجيب',
    'dest.wadirum.h2': 'مخيمات البدو',
    'dest.wadirum.h3': 'مراقبة النجوم',
    'dest.deadsea.name': 'البحر الميت',
    'dest.deadsea.subtitle': 'أخفض نقطة على الأرض',
    'dest.deadsea.description': 'اطفو بسهولة في المياه شديدة الملوحة وجدد نشاطك مع علاجات الطين الغنية بالمعادن.',
    'dest.deadsea.h1': 'تجربة الطفو',
    'dest.deadsea.h2': 'علاج الطين',
    'dest.deadsea.h3': 'مناظر غروب الشمس',
    'dest.jerash.name': 'جرش',
    'dest.jerash.subtitle': 'المدينة الرومانية القديمة',
    'dest.jerash.description': 'واحدة من أفضل المدن الرومانية المحفوظة خارج إيطاليا، تتميز بشوارع أعمدة ومعابد رائعة.',
    'dest.jerash.h1': 'الساحة البيضاوية',
    'dest.jerash.h2': 'الأعمدة الرومانية',
    'dest.jerash.h3': 'المسارح القديمة',
    'dest.amman.name': 'عمّان',
    'dest.amman.subtitle': 'المدينة البيضاء',
    'dest.amman.description': 'عاصمة الأردن النابضة بالحياة، تمزج بين التاريخ القديم والثقافة الحديثة والأسواق والمأكولات.',
    'dest.amman.h1': 'جبل القلعة',
    'dest.amman.h2': 'المدرج الروماني',
    'dest.amman.h3': 'شارع الرينبو',
    'dest.petranight.name': 'البتراء ليلاً',
    'dest.petranight.subtitle': 'تجربة ساحرة',
    'dest.petranight.description': 'امشِ عبر السيق المضاء بـ 1800 شمعة لتشهد الخزنة متوهجة تحت النجوم.',
    'dest.petranight.h1': 'السيق المضيء بالشموع',
    'dest.petranight.h2': 'موسيقى بدوية',
    'dest.petranight.h3': 'مناظر الخزنة',
    'dest.fullDay': 'يوم كامل',
    'dest.halfDay': 'نصف يوم',
    'dest.halfFullDay': 'نصف/يوم كامل',
    'dest.evening': 'مساءً',

    // Why Us
    'why.subtitle': 'لماذا تختارنا',
    'why.title': 'تميز البادية الشمالية',
    'why.description': 'نحن لسنا مجرد شركة سياحة – نحن بوابتك لتجارب أردنية أصيلة، مدعومة بالخبرة والشغف والضيافة الحقيقية.',
    'why.licensed.title': 'مرخصون وموثوقون',
    'why.licensed.desc': 'مرخصون رسمياً من وزارة السياحة الأردنية مع سنوات من الخدمة الموثوقة.',
    'why.experts.title': 'خبراء محليون',
    'why.experts.desc': 'فريقنا يتكون من أردنيين شغوفين بمعرفة عميقة بكل وجهة.',
    'why.authentic.title': 'تجارب أصيلة',
    'why.authentic.desc': 'تجاوز الجولات التقليدية مع انغماس ثقافي حقيقي وجواهر مخفية.',
    'why.personalized.title': 'خدمة شخصية',
    'why.personalized.desc': 'نصمم كل رحلة لتناسب اهتماماتك وإيقاعك وتفضيلاتك.',
    'why.sustainable.title': 'سياحة مستدامة',
    'why.sustainable.desc': 'نمارس السياحة المسؤولة التي تفيد المجتمعات المحلية وتحافظ على التراث.',
    'why.moments.title': 'لحظات لا تُنسى',
    'why.moments.desc': 'اصنع ذكريات تدوم مدى الحياة مع تجاربنا المصممة بعناية.',

    // Contact
    'contact.subtitle': 'تواصل معنا',
    'contact.title': 'اتصل بنا',
    'contact.description': 'مستعد لاستكشاف الأردن؟ لديك أسئلة عن وجهاتنا؟ نحب أن نسمع منك ونساعدك في التخطيط لرحلتك المثالية.',
    'contact.address': 'العنوان',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.hours': 'ساعات العمل',
    'contact.weekdays': 'الأحد - الخميس: 9:00 ص - 6:00 م',
    'contact.weekends': 'الجمعة - السبت: 10:00 ص - 4:00 م',
    'contact.followUs': 'تابعنا:',
    'contact.ready': 'مستعد لاستكشاف الأردن؟',
    'contact.readyDesc': 'تواصل معنا اليوم لبدء التخطيط لرحلتك التي لا تُنسى عبر عجائب المملكة الهاشمية.',
    'contact.callNow': 'اتصل الآن',
    'contact.emailUs': 'راسلنا',

    // Footer
    'footer.description': 'شريكك الموثوق لتجارب السفر الأردنية الأصيلة. اكتشف عجائب المملكة الهاشمية معنا.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.destinations': 'الوجهات',
    'footer.contactInfo': 'معلومات الاتصال',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.licensed': 'مرخصة من وزارة السياحة الأردنية',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
