'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

export default function StructuredData() {
  const { language } = useLanguage();
  const baseUrl = 'https://northernbadiatours.com';

  useEffect(() => {
    // LocalBusiness/TravelAgency structured data
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      '@id': `${baseUrl}#organization`,
      name: 'Northern Badia Travel & Tourism',
      alternateName: 'البادية الشمالية للسياحة والسفر',
      url: baseUrl,
      logo: `${baseUrl}/assets/logo-header.webp`,
      image: [
        `${baseUrl}/assets/hero-petra.webp`,
        `${baseUrl}/assets/wadi-rum.webp`,
        `${baseUrl}/assets/dead-sea.webp`,
      ],
      description: language === 'en' 
        ? 'Premier Jordanian travel company offering authentic experiences to Petra, Wadi Rum, Dead Sea, and more destinations in Jordan.'
        : 'شركة سياحية أردنية رائدة تقدم تجارب أصيلة إلى البتراء ووادي رم والبحر الميت والمزيد من الوجهات في الأردن.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amman',
        addressCountry: 'JO',
        addressRegion: 'Amman',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+962-78-661-3160',
        contactType: 'customer service',
        email: 'info@northernbadiatours.com',
        availableLanguage: ['en', 'ar'],
        areaServed: 'JO',
      },
      sameAs: [
        'https://www.facebook.com/northernbadiatours',
        'https://www.instagram.com/northernbadiatours',
      ],
      priceRange: '$$',
      currenciesAccepted: 'JOD, USD, EUR',
      paymentAccepted: 'Cash, Credit Card',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Friday', 'Saturday'],
          opens: '10:00',
          closes: '16:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1000',
        bestRating: '5',
        worstRating: '1',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Jordan',
      },
    };

    // Website schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      url: baseUrl,
      name: 'Northern Badia Travel & Tourism',
      alternateName: 'البادية الشمالية للسياحة والسفر',
      description: language === 'en'
        ? 'Discover the wonders of Jordan with Northern Badia Travel & Tourism. Explore Petra, Wadi Rum, Dead Sea, and more.'
        : 'اكتشف عجائب الأردن مع البادية الشمالية للسياحة والسفر. استكشف البتراء ووادي رم والبحر الميت والمزيد.',
      inLanguage: [language === 'en' ? 'en-US' : 'ar-JO'],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };

    // Breadcrumb schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: language === 'en' ? 'Home' : 'الرئيسية',
          item: baseUrl,
        },
      ],
    };

    // Tourist destinations schema
    const destinationsSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: language === 'en' ? 'Popular Destinations in Jordan' : 'الوجهات الشهيرة في الأردن',
      description: language === 'en'
        ? 'Discover the most popular tourist destinations in Jordan including Petra, Wadi Rum, Dead Sea, Jerash, and Amman.'
        : 'اكتشف أشهر الوجهات السياحية في الأردن بما في ذلك البتراء ووادي رم والبحر الميت وجرش وعمان.',
      itemListElement: [
        {
          '@type': 'TouristDestination',
          position: 1,
          name: language === 'en' ? 'Petra' : 'البتراء',
          description: language === 'en'
            ? 'Ancient Nabataean city carved into rose-colored cliffs, UNESCO World Heritage Site'
            : 'مدينة نبطية قديمة منحوتة في صخور وردية اللون، موقع تراث عالمي لليونسكو',
          image: `${baseUrl}/assets/hero-petra.webp`,
        },
        {
          '@type': 'TouristDestination',
          position: 2,
          name: language === 'en' ? 'Wadi Rum' : 'وادي رم',
          description: language === 'en'
            ? 'Dramatic desert landscape with towering sandstone mountains and endless red sands'
            : 'منظر صحراوي مذهل مع جبال الحجر الرملي الشاهقة والرمال الحمراء اللامتناهية',
          image: `${baseUrl}/assets/wadi-rum.webp`,
        },
        {
          '@type': 'TouristDestination',
          position: 3,
          name: language === 'en' ? 'Dead Sea' : 'البحر الميت',
          description: language === 'en'
            ? 'The lowest point on Earth with hypersaline waters perfect for floating and mud therapy'
            : 'أخفض نقطة على الأرض مع مياه شديدة الملوحة مثالية للطفو وعلاج الطين',
          image: `${baseUrl}/assets/dead-sea.webp`,
        },
        {
          '@type': 'TouristDestination',
          position: 4,
          name: language === 'en' ? 'Jerash' : 'جرش',
          description: language === 'en'
            ? 'One of the best-preserved Roman cities outside Italy with colonnaded streets and magnificent temples'
            : 'واحدة من أفضل المدن الرومانية المحفوظة خارج إيطاليا مع شوارع أعمدة ومعابد رائعة',
          image: `${baseUrl}/assets/jerash.webp`,
        },
        {
          '@type': 'TouristDestination',
          position: 5,
          name: language === 'en' ? 'Amman' : 'عمّان',
          description: language === 'en'
            ? 'Jordan\'s vibrant capital blending ancient history with modern culture'
            : 'عاصمة الأردن النابضة بالحياة التي تمزج بين التاريخ القديم والثقافة الحديثة',
          image: `${baseUrl}/assets/amman.webp`,
        },
      ],
    };

    // FAQ schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: language === 'en' 
            ? 'What destinations does Northern Badia Travel & Tourism offer?'
            : 'ما هي الوجهات التي تقدمها البادية الشمالية للسياحة والسفر؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: language === 'en'
              ? 'We offer tours to Petra, Wadi Rum, Dead Sea, Jerash, Amman, and many other destinations throughout Jordan. Our tours range from half-day excursions to multi-day adventures.'
              : 'نقدم جولات إلى البتراء ووادي رم والبحر الميت وجرش وعمان والعديد من الوجهات الأخرى في جميع أنحاء الأردن. تتراوح جولاتنا من رحلات نصف يوم إلى مغامرات متعددة الأيام.',
          },
        },
        {
          '@type': 'Question',
          name: language === 'en'
            ? 'Is Northern Badia Travel & Tourism licensed?'
            : 'هل البادية الشمالية للسياحة والسفر مرخصة؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: language === 'en'
              ? 'Yes, we are officially licensed by the Jordanian Ministry of Tourism and have been providing trusted travel services for over 10 years.'
              : 'نعم، نحن مرخصون رسمياً من وزارة السياحة الأردنية وقد قدمنا خدمات سفر موثوقة لأكثر من 10 سنوات.',
          },
        },
        {
          '@type': 'Question',
          name: language === 'en'
            ? 'What languages do your guides speak?'
            : 'ما هي اللغات التي يتحدث بها مرشدوكم؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: language === 'en'
              ? 'Our guides are fluent in English and Arabic, and many also speak other languages. We ensure clear communication throughout your journey.'
              : 'مرشدونا يتحدثون بطلاقة الإنجليزية والعربية، والعديد منهم يتحدثون لغات أخرى أيضاً. نضمن التواصل الواضح طوال رحلتك.',
          },
        },
        {
          '@type': 'Question',
          name: language === 'en'
            ? 'How do I book a tour with Northern Badia Travel & Tourism?'
            : 'كيف أحجز جولة مع البادية الشمالية للسياحة والسفر؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: language === 'en'
              ? 'You can contact us by phone at +962 78 661 3160, email at info@northernbadiatours.com, or through our contact form. We\'ll help you plan your perfect Jordanian adventure.'
              : 'يمكنك الاتصال بنا عبر الهاتف على +962 78 661 3160 أو البريد الإلكتروني على info@northernbadiatours.com أو من خلال نموذج الاتصال الخاص بنا. سنساعدك في التخطيط لمغامرتك الأردنية المثالية.',
          },
        },
      ],
    };

    // Add all schemas to the page
    const scripts = [
      { id: 'organization-schema', schema: organizationSchema },
      { id: 'website-schema', schema: websiteSchema },
      { id: 'breadcrumb-schema', schema: breadcrumbSchema },
      { id: 'destinations-schema', schema: destinationsSchema },
      { id: 'faq-schema', schema: faqSchema },
    ];

    scripts.forEach(({ id, schema }) => {
      // Remove existing script if present
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }

      // Add new script
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      scripts.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script) {
          script.remove();
        }
      });
    };
  }, [language]);

  return null;
}

