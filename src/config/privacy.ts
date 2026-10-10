import { siteSettings } from '../i18n/ui';

export const privacyConfig = {
  tradeName: siteSettings.fullName,
  controllerName: 'Rosa M. Jimenez',
  website: siteSettings.url,
  phone: siteSettings.phoneDisplay,
  email: siteSettings.email,
  location: {
    en: 'Punta Cana, Dominican Republic',
    es: 'Punta Cana, República Dominicana'
  },
  analyticsRetention: {
    eventDataMonths: 2,
    userDataMonths: 14,
    resetOnNewActivity: true
  }
} as const;
