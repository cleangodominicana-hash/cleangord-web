import { siteSettings } from '../i18n/ui';
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
        sameAs: [siteSettings.social.facebook, siteSettings.social.instagram].filter(Boolean)
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
