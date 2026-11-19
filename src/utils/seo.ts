import { siteSettings, socialLinks } from '../i18n/ui';
import { getPath } from '../i18n/ui';
import type { Locale } from '../i18n/config';

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteSettings.url).toString();
}

export function pageImage(pathname: string) {
  return absoluteUrl(pathname === '/' ? '/og-image.jpg' : '/og-image.jpg');
}

export function organizationSchema(locale: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${siteSettings.url}#business`,
        name: siteSettings.fullName,
        description,
        image: pageImage('/'),
        url: siteSettings.url,
        telephone: siteSettings.phoneDisplay,
        email: siteSettings.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Punta Cana',
          addressRegion: 'La Altagracia',
          addressCountry: 'DO'
        },
        areaServed: siteSettings.areas,
        availableLanguage: locale === 'es' ? ['Spanish', 'English'] : ['English', 'Spanish'],
        // Mirrors the schedule published in the footer (siteSettings.schedule).
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: siteSettings.openingHours.dayOfWeek,
          opens: siteSettings.openingHours.opens,
          closes: siteSettings.openingHours.closes
        },
        sameAs: socialLinks.map(([, url]) => url)
      },
      {
        '@type': 'WebSite',
        '@id': `${siteSettings.url}#website`,
        url: siteSettings.url,
        name: siteSettings.fullName,
        inLanguage: locale,
        potentialAction: {
          '@type': 'ContactAction',
          target: `${siteSettings.url}${getPath(locale, 'contact')}`
        }
      }
    ]
  };
}

// Built exclusively from the FAQ entries rendered on the page (dict.faqs).
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
