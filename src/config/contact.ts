export const serviceIds = [
  'airbnb-cleaning',
  'villa-cleaning',
  'apartment-cleaning',
  'deep-cleaning',
  'scheduled-cleaning',
  'light-maintenance'
] as const;

export type ServiceId = (typeof serviceIds)[number];

export const serviceLabels: Record<'en' | 'es', Record<ServiceId, string>> = {
  en: {
    'airbnb-cleaning': 'Airbnb Cleaning',
    'villa-cleaning': 'Villa Cleaning',
    'apartment-cleaning': 'Apartment Cleaning',
    'deep-cleaning': 'Deep Cleaning',
    'scheduled-cleaning': 'Scheduled Cleaning',
    'light-maintenance': 'Light Maintenance'
  },
  es: {
    'airbnb-cleaning': 'Limpieza de Airbnb',
    'villa-cleaning': 'Limpieza de Villas',
    'apartment-cleaning': 'Limpieza de Apartamentos',
    'deep-cleaning': 'Limpieza Profunda',
    'scheduled-cleaning': 'Servicios Programados',
    'light-maintenance': 'Mantenimiento Ligero'
  }
};
