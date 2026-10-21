import { routeSlugs, type Locale, type RouteKey } from "./config";

export type ServiceItem = {
  title: string;
  summary: string;
  description: string;
  imageAlt: string;
  icon: string;
};

export type Translation = {
  localeName: string;
  brandSuffix: string;
  siteName: string;
  description: string;
  ogLocale: string;
  accessibility: { skipToContent: string; menu: string; logo: string };
  footer: { navigation: string; coverage: string; contact: string; copyright: string; schedule: string; address: string };
  nav: { key: RouteKey; label: string }[];
  buttons: {
    whatsapp: string;
    callNow: string;
    viewServices: string;
    sendRequest: string;
    requestQuote: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    imageAlt: string;
    coverageLabel: string;
    benefits: { title: string; copy: string }[];
    stats: { title: string; copy: string }[];
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    copy: string;
    photoPending: string;
    detailsLabel: string;
  };
  services: ServiceItem[];
  complementaryServices: {
    eyebrow: string;
    title: string;
    copy: string;
    items: { title: string; description: string }[];
    note: string;
  };
  why: {
    eyebrow: string;
    title: string;
    bullets: string[];
    stats: { title: string; copy: string }[];
  };
  coverage: {
    eyebrow: string;
    title: string;
    copy: string;
    itemCopy: string;
  };
  beforeAfter: {
    eyebrow: string;
    title: string;
    copy: string;
    items: { label: string; before: string; after: string; description: string }[];
  };
  testimonialsSection: {
    eyebrow: string;
    title: string;
  };
  testimonials: { quote: string; author: string; role: string }[];
  faqSection: {
    eyebrow: string;
    title: string;
  };
  faqs: { question: string; answer: string }[];
  cta: {
    title: string;
    copy: string;
  };
  contact: {
    title: string;
    copy: string;
    formTitle: string;
    formCopy: string;
    directTitle: string;
    addressLabel: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      service: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      phone: string;
      message: string;
    };
  };
  pages: Record<RouteKey, { title: string; description: string; heroEyebrow: string; heroTitle: string; heroCopy: string }>;
};

export const siteSettings = {
  url: "https://www.cleangopuntacana.com",
  fullName: "Clean GO Punta Cana",
  phoneDisplay: "+1 (849) 381-5983",
  phoneHref: "tel:+18493815983",
  whatsappNumber: "+18493815983",
  email: "cleangodominicana@gmail.com",
  address: "Punta Cana, Dominican Republic",
  schedule: "Mon - Sun: 7:00 AM - 7:00 PM",
  areas: ["Punta Cana", "Bávaro", "Cap Cana", "Verón"],
  social: {
    facebook: "#",
    instagram: "#",
  },
} as const;

export const socialLinks = Object.entries(siteSettings.social).filter(([, url]) =>
  URL.canParse(url) && new URL(url).protocol === 'https:'
);

export const dictionaries: Record<Locale, Translation> = {
  en: {
    localeName: "English",
    brandSuffix: "Punta Cana",
    siteName: "Clean GO Punta Cana",
    description: "Professional cleaning services in Punta Cana for Airbnb, villas, apartments, and property care.",
    ogLocale: "en_US",
    accessibility: { skipToContent: "Skip to content", menu: "Toggle navigation menu", logo: "Clean GO Punta Cana logo" },
    footer: {
      navigation: "Navigation", coverage: "Coverage", contact: "Contact",
      copyright: "© 2026 CleanGo. All rights reserved.",
      schedule: siteSettings.schedule, address: siteSettings.address,
    },
    nav: [
      { key: "home", label: "Home" },
      { key: "services", label: "Services" },
      { key: "coverage", label: "Coverage" },
      { key: "about", label: "About" },
      { key: "contact", label: "Contact" },
    ],
    buttons: {
      whatsapp: "Contact us on WhatsApp",
      callNow: "Call now",
      viewServices: "View services",
      sendRequest: "Send request",
      requestQuote: "Request a quote",
    },
    hero: {
      eyebrow: "Your property, our priority",
      title: "Professional cleaning for Airbnb, villas, and properties in Punta Cana",
      copy: "We help owners, hosts, and property managers keep every space spotless, guest-ready, and aligned with premium standards.",
      imageAlt: "Bright and spotless property in Punta Cana",
      coverageLabel: "Coverage",
      benefits: [
        { title: "Fast response", copy: "Clear coordination and punctual service" },
        { title: "Trusted teams", copy: "Careful attention to detail" },
        { title: "Guest-ready results", copy: "Spaces prepared to impress" },
      ],
      stats: [
        { title: "Airbnb Ready", copy: "Reliable turnovers between bookings" },
        { title: "Local in Punta Cana", copy: "Fast coordination and nearby coverage" },
      ],
    },
    servicesSection: {
      eyebrow: "Our services",
      title: "Cleaning services for homes, rentals, and managed properties",
      copy: "Choose the support that fits your property and request a quote based on its spaces, condition, and cleaning needs.",
      photoPending: "Approved photo pending",
      detailsLabel: "Service details",
    },
    services: [
      { title: "Airbnb & Vacation Rental Cleaning", summary: "Professional cleaning and careful presentation for vacation rentals, including hotel-style beds, property condition updates, and supply or laundry coordination when requested.", description: "Complete cleaning of bedrooms, bathrooms, kitchens, floors, and windows, with hotel-style bed presentation and careful property organization. When requested, we can document the property's condition, report issues, restock supplies, and coordinate laundry.", imageAlt: "Clean and prepared vacation rental bedroom with a hotel-style bed", icon: "🛏️" },
      { title: "Villa & Apartment Cleaning", summary: "One-time or recurring cleaning for villas, apartments, and private homes, with optional ventilation, visual inspections, and photo updates during longer absences.", description: "One-time or recurring cleaning for owners, residents, and property managers, covering bathrooms, kitchens, bedrooms, floors, windows, and surfaces. Visits during longer absences can also include ventilation, a basic visual inspection, and photo updates.", imageAlt: "Clean and well-presented interior of a modern villa or apartment", icon: "🏡" },
      { title: "Post-Construction Cleaning", summary: "Detailed cleaning after construction or renovation, focused on dust, floors, windows, bathrooms, surfaces, and light residue to prepare the property for use.", description: "Cleaning for newly built or renovated properties, focused on construction dust, floors, windows, bathrooms, surfaces, and light debris so the space is ready to occupy. Cement residue treatment and floor polishing are evaluated according to each surface.", imageAlt: "Professional cleaning of a property after construction or renovation", icon: "✨" },
      { title: "Common Area Cleaning", summary: "Cleaning for hallways, stairs, elevators, parking areas, and shared spaces in residential communities, condominiums, and buildings, with recurring visits available.", description: "Cleaning for residential communities, condominiums, and buildings, including hallways, stairs, elevators, parking areas, circulation spaces, and shared areas around pools. Recurring visits can be arranged according to the property's needs.", imageAlt: "Clean common area in a residential building", icon: "🏢" },
      { title: "Office Cleaning", summary: "Cleaning options for offices and shared workspaces, covering surfaces, floors, bathrooms, windows, and common areas according to the needs of each space.", description: "Cleaning support available for evaluation for offices and shared workspaces, including surfaces, floors, bathrooms, windows, and common areas. Contact us to discuss the space, preferred schedule, and service requirements.", imageAlt: "Clean, organized, and professional office workspace", icon: "🧹" },
    ],
    complementaryServices: {
      eyebrow: "Additional options",
      title: "Coordinated solutions for your property",
      copy: "Tell us what your property needs. We will confirm the scope and coordinate specialized support when required.",
      items: [
        { title: "Deep cleaning", description: "Detailed cleaning for properties that need more extensive attention." },
        { title: "Mattresses, furniture & upholstery", description: "Cleaning of mattresses, upholstered furniture, and fabrics, including stain treatment when appropriate for the material." },
        { title: "Laundry & supplies", description: "Laundry coordination plus restocking and management of property supplies." },
        { title: "Specialized property care", description: "Preventive air-conditioning cleaning and maintenance, pool cleaning and maintenance, gardening, and floor polishing." },
      ],
      note: "Some specialized services are coordinated with specialist collaborators and are confirmed after evaluating the request.",
    },
    why: {
      eyebrow: "Why choose us",
      title: "A cleaner property. Less stress. Better guest experience.",
      bullets: ["Responsible service focused on spotless presentation.", "Great fit for Airbnb, villas, and properties that need to stay guest-ready.", "Clear communication and quick coordination.", "A practical approach that helps you save time and protect your reputation."],
      stats: [
        { title: "Airbnb Ready", copy: "Fast preparation between reservations" },
        { title: "Quick response", copy: "Timely communication and scheduling" },
        { title: "Before / After", copy: "Visual proof that builds trust" },
        { title: "Punta Cana", copy: "Local service in key areas" },
      ],
    },
    coverage: {
      eyebrow: "Local coverage",
      title: "Punta Cana and nearby areas",
      copy: "We focus on strategic local coverage to respond faster, coordinate better, and deliver a more reliable service.",
      itemCopy: "Local property care and cleaning",
    },
    beforeAfter: {
      eyebrow: "Results that speak",
      title: "Before and after",
      copy: "A visible difference helps communicate trust, quality, and professional care from the first look.",
      items: [
        { label: "Bedroom", before: "Before", after: "After", description: "Neat beds, fresh feel, and a stronger first impression." },
        { label: "Kitchen", before: "Before", after: "After", description: "Cleaner surfaces and a sharper presentation for guests and owners." },
        { label: "Bathroom", before: "Before", after: "After", description: "A more polished, sanitary, and guest-ready finish." },
      ],
    },
    testimonialsSection: {
      eyebrow: "What clients say",
      title: "Trust built through consistent results",
    },
    testimonials: [
      { quote: "Excellent service. They always leave the property ready for my guests.", author: "Michael T.", role: "Airbnb host" },
      { quote: "They helped us keep our villa spotless during the entire season. Highly recommended.", author: "Laura R.", role: "Villa manager" },
      { quote: "The best part is peace of mind. They respond fast and work with real attention to detail.", author: "Carlos M.", role: "Property owner" },
    ],
    faqSection: {
      eyebrow: "Frequently asked questions",
      title: "Everything clear before you hire us",
    },
    faqs: [
      { question: "Do you work with Airbnb properties?", answer: "Yes. We clean and prepare vacation rentals, including bedrooms, bathrooms, kitchens, floors, windows, beds, and the overall presentation of the property." },
      { question: "Do you service villas and apartments?", answer: "Yes. We work with villas, apartments, vacation rentals, and residential properties in Punta Cana and nearby areas." },
      { question: "Can I arrange recurring cleaning visits?", answer: "Yes. We can coordinate recurring visits according to how the property is used and the cleaning support it needs." },
      { question: "How can I request a quote?", answer: "You can message us on WhatsApp or fill out the contact form. We will get back to you as soon as possible." },
    ],
    cta: {
      title: "Ready to keep your property spotless?",
      copy: "Send us a message today and get fast help coordinating your cleaning service.",
    },
    contact: {
      title: "Let’s talk about your property",
      copy: "Message us to schedule a cleaning, ask about availability, or request information about scheduled services in Punta Cana.",
      formTitle: "Request information",
      formCopy: "Tell us what you need and we will contact you to coordinate the next step.",
      directTitle: "Direct contact",
      addressLabel: "Address",
      fields: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        service: "Service",
        message: "Message",
      },
      placeholders: {
        name: "Your name",
        email: "you@email.com",
        phone: "+1 (809) 000-0000",
        message: "Tell us what you need",
      },
    },
    pages: {
      home: {
        title: "CleanGo | Professional Cleaning Services in Punta Cana",
        description: "Professional cleaning services in Punta Cana for Airbnb, villas, apartments, and property care.",
        heroEyebrow: "Punta Cana cleaning services",
        heroTitle: "Professional cleaning services for Airbnb, villas, and apartments in Punta Cana",
        heroCopy: "A conversion-focused local cleaning brand built to help you attract guests, protect your reviews, and keep your property ready.",
      },
      services: {
        title: "Cleaning Services in Punta Cana | Clean GO",
        description: "Cleaning services in Punta Cana for Airbnb rentals, villas, apartments, post-construction spaces, common areas, and offices.",
        heroEyebrow: "Services",
        heroTitle: "Cleaning services for vacation rentals, homes, and managed properties",
        heroCopy: "From property presentation to recurring care, we tailor each quote to the space and the cleaning support you need.",
      },
      coverage: {
        title: "Coverage in Punta Cana | CleanGo",
        description: "Local cleaning coverage in Punta Cana, Bávaro, Cap Cana, and Verón for Airbnb, villas, apartments, and property care.",
        heroEyebrow: "Coverage",
        heroTitle: "Local cleaning coverage in Punta Cana and nearby areas",
        heroCopy: "We focus on strategic areas to offer faster response times, easier scheduling, and a better client experience.",
      },
      about: {
        title: "About CleanGo | Punta Cana Cleaning Company",
        description: "Learn about CleanGo and our approach to trusted cleaning services for Airbnb, villas, apartments, and property care in Punta Cana.",
        heroEyebrow: "About us",
        heroTitle: "A local brand built to give owners and hosts peace of mind",
        heroCopy: "CleanGo was created to help every property look cleaner, feel cared for, and project confidence from the first impression.",
      },
      contact: {
        title: "Contact CleanGo | Punta Cana Cleaning Services",
        description: "Contact Clean GO to request a tailored quote for residential, vacation rental, or property cleaning services in Punta Cana.",
        heroEyebrow: "Contact",
        heroTitle: "Tell us about your property",
        heroCopy: "Let us know what kind of cleaning support you need and we will help you coordinate the best next step.",
      },
      privacy: {
        title: "Privacy Policy | Clean GO Punta Cana",
        description: "Learn how Clean GO Punta Cana uses contact and analytics data and how visitors can manage consent and privacy requests.",
        heroEyebrow: "Privacy",
        heroTitle: "Privacy policy",
        heroCopy: "Learn what information we use, why we use it, and how to manage your analytics consent or contact us about privacy.",
      },
    },
  },
  es: {
    localeName: "Español",
    brandSuffix: "Punta Cana",
    siteName: "Clean GO Punta Cana",
    description: "Servicios de limpieza profesional en Punta Cana para Airbnb, villas, apartamentos y cuidado general de propiedades.",
    ogLocale: "es_DO",
    accessibility: { skipToContent: "Saltar al contenido", menu: "Abrir o cerrar el menú de navegación", logo: "Logotipo de Clean GO Punta Cana" },
    footer: {
      navigation: "Navegación", coverage: "Cobertura", contact: "Contacto",
      copyright: "© 2026 CleanGo. Todos los derechos reservados.",
      schedule: "Lun - Dom: 7:00 a. m. - 7:00 p. m.", address: "Punta Cana, República Dominicana",
    },
    nav: [
      { key: "home", label: "Inicio" },
      { key: "services", label: "Servicios" },
      { key: "coverage", label: "Cobertura" },
      { key: "about", label: "Nosotros" },
      { key: "contact", label: "Contacto" },
    ],
    buttons: {
      whatsapp: "Contactar por WhatsApp",
      callNow: "Llámanos ahora",
      viewServices: "Ver servicios",
      sendRequest: "Enviar solicitud",
      requestQuote: "Solicitar cotización",
    },
    hero: {
      eyebrow: "Tu propiedad, nuestra prioridad",
      title: "Limpieza profesional para Airbnb, villas y propiedades en Punta Cana",
      copy: "Ayudamos a propietarios, anfitriones y administradores a mantener cada espacio impecable, listo para recibir huéspedes y alineado con un estándar premium.",
      imageAlt: "Propiedad luminosa e impecable en Punta Cana",
      coverageLabel: "Cobertura",
      benefits: [
        { title: "Respuesta rápida", copy: "Coordinación clara y servicio puntual" },
        { title: "Equipos confiables", copy: "Atención cuidadosa al detalle" },
        { title: "Resultados para huéspedes", copy: "Espacios listos para impresionar" },
      ],
      stats: [
        { title: "Lista para Airbnb", copy: "Limpiezas consistentes entre reservas" },
        { title: "Locales en Punta Cana", copy: "Coordinación rápida y cobertura cercana" },
      ],
    },
    servicesSection: {
      eyebrow: "Nuestros servicios",
      title: "Servicios de limpieza para viviendas, alojamientos y propiedades administradas",
      copy: "Elige el apoyo que necesita tu propiedad y solicita una cotización según sus espacios, condiciones y necesidades de limpieza.",
      photoPending: "Fotografía aprobada pendiente",
      detailsLabel: "Detalles del servicio",
    },
    services: [
      { title: "Limpieza de Airbnb y Alquileres Vacacionales", summary: "Limpieza profesional y presentación cuidada de alojamientos vacacionales, incluyendo camas estilo hotelero, documentación del inmueble y coordinación de insumos o lavandería cuando se solicite.", description: "Limpieza completa de habitaciones, baños, cocina, pisos y cristales, con preparación de camas estilo hotelero y cuidado de la presentación. Cuando se solicita, podemos documentar el estado de la propiedad, comunicar incidencias, reponer insumos y coordinar la lavandería.", imageAlt: "Habitación limpia y preparada para alquiler vacacional con cama estilo hotelero", icon: "🛏️" },
      { title: "Limpieza de Villas y Apartamentos", summary: "Limpiezas puntuales o recurrentes para villas, apartamentos y viviendas particulares, con ventilación, inspección visual y documentación fotográfica opcionales durante ausencias prolongadas.", description: "Limpiezas puntuales o recurrentes para propietarios, residentes y administradores, incluyendo baños, cocina, habitaciones, pisos, cristales y superficies. Durante ausencias prolongadas, las visitas también pueden incluir ventilación, inspección visual básica y documentación fotográfica.", imageAlt: "Interior limpio y bien presentado de una villa o apartamento moderno", icon: "🏡" },
      { title: "Limpieza Postobra", summary: "Limpieza detallada después de construcciones o remodelaciones, enfocada en polvo, pisos, cristales, baños, superficies y residuos ligeros para preparar la propiedad.", description: "Limpieza para propiedades recién construidas o remodeladas, enfocada en polvo de construcción, pisos, cristales, baños, superficies y residuos ligeros para dejar el espacio preparado para habitar. Los restos de cemento y el pulido se evalúan según cada superficie.", imageAlt: "Limpieza profesional de una propiedad después de construcción o remodelación", icon: "✨" },
      { title: "Limpieza de Áreas Comunes", summary: "Limpieza de pasillos, escaleras, ascensores, parqueos y espacios compartidos en residenciales, condominios y edificios, con posibilidad de coordinar visitas periódicas.", description: "Limpieza para residenciales, condominios y edificios, incluyendo pasillos, escaleras, ascensores, parqueos, zonas de circulación y espacios compartidos alrededor de piscinas. Las visitas periódicas se coordinan según las necesidades del inmueble.", imageAlt: "Área común limpia en un edificio residencial", icon: "🏢" },
      { title: "Limpieza de Oficinas", summary: "Opciones de limpieza para oficinas y espacios de trabajo, incluyendo superficies, pisos, baños, cristales y áreas comunes según las necesidades de cada espacio.", description: "Servicio disponible para evaluación en oficinas y espacios de trabajo compartidos, con limpieza de superficies, pisos, baños, cristales y áreas comunes. Contáctanos para conversar sobre el espacio, el horario preferido y los requisitos del servicio.", imageAlt: "Espacio de oficina limpio, organizado y profesional", icon: "🧹" },
    ],
    complementaryServices: {
      eyebrow: "Opciones adicionales",
      title: "Soluciones coordinadas para tu propiedad",
      copy: "Cuéntanos qué necesita tu propiedad. Confirmaremos el alcance y coordinaremos apoyo especializado cuando sea necesario.",
      items: [
        { title: "Limpieza profunda", description: "Limpieza detallada para propiedades que requieren una atención más amplia." },
        { title: "Colchones, muebles y tapicerías", description: "Limpieza de colchones, muebles tapizados y textiles, con tratamiento de manchas cuando sea adecuado para el material." },
        { title: "Lavandería e insumos", description: "Coordinación de lavandería, reposición y gestión de insumos para la propiedad." },
        { title: "Cuidado especializado", description: "Limpieza y mantenimiento preventivo de aires acondicionados, limpieza y mantenimiento de piscinas, jardinería y pulido de pisos." },
      ],
      note: "Algunos servicios especializados se coordinan con colaboradores y se confirman después de evaluar la solicitud.",
    },
    why: {
      eyebrow: "Por qué elegirnos",
      title: "Una propiedad más limpia, menos estrés y mejor experiencia para tus huéspedes",
      bullets: ["Servicio responsable enfocado en una presentación impecable.", "Ideal para Airbnb, villas y propiedades que necesitan verse listas en todo momento.", "Comunicación clara y coordinación rápida.", "Un enfoque práctico que te ayuda a ahorrar tiempo y proteger tu reputación."],
      stats: [
        { title: "Lista para Airbnb", copy: "Preparación rápida entre reservas" },
        { title: "Respuesta ágil", copy: "Comunicación y coordinación a tiempo" },
        { title: "Antes / después", copy: "Evidencia visual que genera confianza" },
        { title: "Punta Cana", copy: "Servicio local en zonas clave" },
      ],
    },
    coverage: {
      eyebrow: "Cobertura local",
      title: "Punta Cana y zonas cercanas",
      copy: "Nos enfocamos en una cobertura estratégica para responder más rápido, coordinarnos mejor y ofrecer un servicio más confiable.",
      itemCopy: "Cuidado y limpieza de propiedades en la zona",
    },
    beforeAfter: {
      eyebrow: "Resultados que hablan",
      title: "Antes y después",
      copy: "Una diferencia visible ayuda a comunicar confianza, calidad y cuidado profesional desde el primer vistazo.",
      items: [
        { label: "Habitación", before: "Antes", after: "Después", description: "Camas ordenadas, sensación de frescura y mejor primera impresión." },
        { label: "Cocina", before: "Antes", after: "Después", description: "Superficies más limpias y una presentación superior para huéspedes y propietarios." },
        { label: "Baño", before: "Antes", after: "Después", description: "Un acabado más pulido, higiénico y listo para recibir." },
      ],
    },
    testimonialsSection: {
      eyebrow: "Lo que dicen nuestros clientes",
      title: "La confianza se construye con resultados consistentes",
    },
    testimonials: [
      { quote: "Excelente servicio. Siempre dejan la propiedad lista para mis huéspedes.", author: "Michael T.", role: "Anfitrión de Airbnb" },
      { quote: "Nos ayudaron a mantener la villa impecable durante toda la temporada. Muy recomendados.", author: "Laura R.", role: "Administradora de villa" },
      { quote: "Lo mejor es la tranquilidad. Responden rápido y trabajan con atención real al detalle.", author: "Carlos M.", role: "Propietario" },
    ],
    faqSection: {
      eyebrow: "Preguntas frecuentes",
      title: "Todo claro antes de contratarnos",
    },
    faqs: [
      { question: "¿Trabajan con propiedades Airbnb?", answer: "Sí. Limpiamos y preparamos alojamientos vacacionales, incluyendo habitaciones, baños, cocina, pisos, cristales, camas y la presentación general de la propiedad." },
      { question: "¿Atienden villas y apartamentos?", answer: "Sí. Trabajamos con villas, apartamentos, alquileres vacacionales y propiedades residenciales en Punta Cana y zonas cercanas." },
      { question: "¿Puedo coordinar visitas de limpieza recurrentes?", answer: "Sí. Podemos coordinar visitas recurrentes según el uso de la propiedad y el apoyo de limpieza que necesite." },
      { question: "¿Cómo solicito una cotización?", answer: "Puedes escribirnos por WhatsApp o completar el formulario de contacto. Te responderemos lo antes posible." },
    ],
    cta: {
      title: "¿Listo para tener tu propiedad impecable?",
      copy: "Escríbenos hoy mismo y recibe ayuda rápida para coordinar tu servicio de limpieza.",
    },
    contact: {
      title: "Hablemos de tu propiedad",
      copy: "Escríbenos para coordinar una limpieza, consultar disponibilidad o solicitar información sobre servicios programados en Punta Cana.",
      formTitle: "Solicita información",
      formCopy: "Cuéntanos qué necesitas y te contactaremos para coordinar el siguiente paso.",
      directTitle: "Contacto directo",
      addressLabel: "Dirección",
      fields: {
        name: "Nombre",
        email: "Correo",
        phone: "Teléfono",
        service: "Servicio",
        message: "Mensaje",
      },
      placeholders: {
        name: "Tu nombre",
        email: "tu@email.com",
        phone: "+1 (809) 000-0000",
        message: "Cuéntanos qué necesitas",
      },
    },
    pages: {
      home: {
        title: "CleanGo | Limpieza profesional en Punta Cana",
        description: "Servicios de limpieza profesional en Punta Cana para Airbnb, villas, apartamentos y cuidado general de propiedades.",
        heroEyebrow: "Servicios de limpieza en Punta Cana",
        heroTitle: "Limpieza profesional para Airbnb, villas y apartamentos en Punta Cana",
        heroCopy: "Una marca local creada para atraer clientes, dar confianza y mantener tu propiedad lista para impresionar.",
      },
      services: {
        title: "Servicios de limpieza en Punta Cana | Clean GO",
        description: "Servicios de limpieza en Punta Cana para Airbnb, villas, apartamentos, propiedades postobra, áreas comunes y oficinas.",
        heroEyebrow: "Servicios",
        heroTitle: "Servicios de limpieza para alojamientos, viviendas y propiedades administradas",
        heroCopy: "Desde la presentación de la propiedad hasta su cuidado recurrente, adaptamos cada cotización al espacio y al apoyo que necesitas.",
      },
      coverage: {
        title: "Cobertura en Punta Cana | CleanGo",
        description: "Cobertura local de limpieza en Punta Cana, Bávaro, Cap Cana y Verón para Airbnb, villas, apartamentos y propiedades.",
        heroEyebrow: "Cobertura",
        heroTitle: "Cobertura local de limpieza en Punta Cana y zonas cercanas",
        heroCopy: "Nos enfocamos en zonas estratégicas para ofrecer mejor tiempo de respuesta, coordinación sencilla y una experiencia superior.",
      },
      about: {
        title: "Sobre CleanGo | Empresa de limpieza en Punta Cana",
        description: "Conoce CleanGo y nuestro enfoque de limpieza confiable para Airbnb, villas, apartamentos y cuidado de propiedades en Punta Cana.",
        heroEyebrow: "Nosotros",
        heroTitle: "Una marca local creada para dar tranquilidad a propietarios y anfitriones",
        heroCopy: "CleanGo nace para ayudar a que cada propiedad se vea más limpia, mejor cuidada y más confiable desde la primera impresión.",
      },
      contact: {
        title: "Contacto CleanGo | Limpieza en Punta Cana",
        description: "Contacta a Clean GO para solicitar una cotización personalizada de limpieza residencial, vacacional o de propiedades en Punta Cana.",
        heroEyebrow: "Contacto",
        heroTitle: "Cuéntanos sobre tu propiedad",
        heroCopy: "Déjanos saber qué tipo de apoyo necesitas y te ayudaremos a coordinar el siguiente paso ideal.",
      },
      privacy: {
        title: "Política de privacidad | Clean GO Punta Cana",
        description: "Conoce cómo Clean GO Punta Cana utiliza datos de contacto y analítica y cómo gestionar el consentimiento y las solicitudes de privacidad.",
        heroEyebrow: "Privacidad",
        heroTitle: "Política de privacidad",
        heroCopy: "Conoce qué información utilizamos, para qué la usamos y cómo gestionar tu consentimiento de analítica o contactarnos sobre privacidad.",
      },
    },
  },
};

export function t(locale: Locale) {
  return dictionaries[locale];
}

export function getWhatsappUrl(locale: Locale) {
  const message = locale === "es" ? "Hola CleanGo, quiero información sobre sus servicios." : "Hi CleanGo, I would like information about your services.";
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getPath(locale: Locale, route: RouteKey) {
  const slug = routeSlugs[route][locale];
  if (locale === "en") return slug ? `/${slug}/` : "/";
  return slug ? `/es/${slug}/` : "/es/";
}

export function localeAlternates(route: RouteKey) {
  return {
    en: `${siteSettings.url}${getPath("en", route)}`,
    es: `${siteSettings.url}${getPath("es", route)}`,
  };
}
