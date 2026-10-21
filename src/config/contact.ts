export const serviceIds = [
  'airbnb-cleaning',
  'villa-apartment-cleaning',
  'post-construction-cleaning',
  'common-area-cleaning',
  'office-cleaning',
  'other-service'
] as const;

export type ServiceId = (typeof serviceIds)[number];

export const serviceLabels: Record<'en' | 'es', Record<ServiceId, string>> = {
  en: {
    'airbnb-cleaning': 'Airbnb Cleaning',
    'villa-apartment-cleaning': 'Villa & Apartment Cleaning',
    'post-construction-cleaning': 'Post-Construction Cleaning',
    'common-area-cleaning': 'Common Area Cleaning',
    'office-cleaning': 'Office Cleaning',
    'other-service': 'Other Service or Inquiry'
  },
  es: {
    'airbnb-cleaning': 'Limpieza de Airbnb',
    'villa-apartment-cleaning': 'Limpieza de Villas y Apartamentos',
    'post-construction-cleaning': 'Limpieza Postobra',
    'common-area-cleaning': 'Limpieza de Áreas Comunes',
    'office-cleaning': 'Limpieza de Oficinas',
    'other-service': 'Otro Servicio o Consulta'
  }
};
