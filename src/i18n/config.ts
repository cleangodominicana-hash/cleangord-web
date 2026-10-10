export const defaultLocale = 'en' as const;
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const routeSlugs = {
  home: { en: '', es: '' },
  services: { en: 'services', es: 'servicios' },
  coverage: { en: 'coverage', es: 'cobertura' },
  about: { en: 'about', es: 'nosotros' },
  contact: { en: 'contact', es: 'contacto' },
  privacy: { en: 'privacy', es: 'privacidad' }
} as const;

export type RouteKey = keyof typeof routeSlugs;
