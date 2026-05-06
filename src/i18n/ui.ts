import { routeSlugs, type Locale, type RouteKey } from "./config";

export type ServiceItem = {
  title: string;
  description: string;
  icon: string;
};

export type Translation = {
  localeName: string;
  brandSuffix: string;
  siteName: string;
  description: string;
  ogLocale: string;
  nav: { key: RouteKey; label: string }[];
  buttons: {
    whatsapp: string;
    callNow: string;
    viewServices: string;
    sendRequest: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    benefits: { title: string; copy: string }[];
    stats: { title: string; copy: string }[];
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  services: ServiceItem[];
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
  url: "https://www.cleangord.com",
  fullName: "CleanGo",
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

export const dictionaries: Record<Locale, Translation> = {
  en: {
    localeName: "English",
    brandSuffix: "Punta Cana",
    siteName: "CleanGo",
    description: "Professional cleaning services in Punta Cana for Airbnb, villas, apartments, and property care.",
    ogLocale: "en_US",
    nav: [
      { key: "home", label: "Home" },
      { key: "services", label: "Services" },
      { key: "coverage", label: "Coverage" },
      { key: "about", label: "About" },
      { key: "contact", label: "Contact" },
    ],
    buttons: {
      whatsapp: "Message us on WhatsApp",
      callNow: "Call now",
      viewServices: "View services",
      sendRequest: "Send request",
    },
    hero: {
      eyebrow: "Your property, our priority",
      title: "Professional cleaning for Airbnb, villas, and properties in Punta Cana",
      copy: "We help owners, hosts, and property managers keep every space spotless, guest-ready, and aligned with premium standards.",
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
      title: "Cleaning solutions built for property owners and hosts",
      copy: "From quick Airbnb turnovers to deep cleaning and scheduled care, every service is designed for consistency and peace of mind.",
    },
    services: [
      { title: "Airbnb Cleaning", description: "Fast and professional turnovers to welcome every guest with confidence.", icon: "🛏️" },
      { title: "Villa Cleaning", description: "Premium care for high-end villas that need spotless presentation.", icon: "🏡" },
      { title: "Apartment Cleaning", description: "Impeccable spaces for living, renting, or receiving guests.", icon: "🏢" },
      { title: "Deep Cleaning", description: "Detailed cleaning and disinfection for a full property reset.", icon: "✨" },
      { title: "Scheduled Cleaning", description: "Weekly, biweekly, or monthly cleaning plans tailored to your operation.", icon: "📅" },
      { title: "Light Maintenance", description: "Practical support to keep your property functional and cared for.", icon: "🛠️" },
    ],
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
      { question: "Do you work with Airbnb properties?", answer: "Yes. We focus on turnovers, between-booking cleanings, and preparing properties for incoming guests." },
      { question: "Do you service villas and apartments?", answer: "Yes. We work with villas, apartments, vacation rentals, and residential properties in Punta Cana and nearby areas." },
      { question: "Do you offer scheduled service?", answer: "Yes. We can arrange weekly, biweekly, or monthly visits based on your needs." },
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
      formCopy: "Use this form as a base. Later, you can connect it to Formspree, Basin, Resend, or your own backend.",
      directTitle: "Direct contact",
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
        title: "Services | CleanGo Punta Cana",
        description: "Explore Airbnb cleaning, villa cleaning, apartment cleaning, deep cleaning, and scheduled cleaning services in Punta Cana.",
        heroEyebrow: "Services",
        heroTitle: "Cleaning services tailored to Airbnb hosts, villas, and managed properties",
        heroCopy: "Every service is designed to improve presentation, save time, and keep your operation running smoothly.",
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
        description: "Contact CleanGo to schedule Airbnb cleaning, villa cleaning, apartment cleaning, or deep cleaning services in Punta Cana.",
        heroEyebrow: "Contact",
        heroTitle: "Tell us about your property",
        heroCopy: "Let us know what kind of cleaning support you need and we will help you coordinate the best next step.",
      },
    },
  },
  es: {
    localeName: "Español",
    brandSuffix: "Punta Cana",
    siteName: "CleanGo",
    description: "Servicios de limpieza profesional en Punta Cana para Airbnb, villas, apartamentos y cuidado general de propiedades.",
    ogLocale: "es_DO",
    nav: [
      { key: "home", label: "Inicio" },
      { key: "services", label: "Servicios" },
      { key: "coverage", label: "Cobertura" },
      { key: "about", label: "Nosotros" },
      { key: "contact", label: "Contacto" },
    ],
    buttons: {
      whatsapp: "Escríbenos por WhatsApp",
      callNow: "Llámanos ahora",
      viewServices: "Ver servicios",
      sendRequest: "Enviar solicitud",
    },
    hero: {
      eyebrow: "Tu propiedad, nuestra prioridad",
      title: "Limpieza profesional para Airbnb, villas y propiedades en Punta Cana",
      copy: "Ayudamos a propietarios, hosts y administradores a mantener cada espacio impecable, listo para recibir huéspedes y alineado con un estándar premium.",
      benefits: [
        { title: "Respuesta rápida", copy: "Coordinación clara y servicio puntual" },
        { title: "Equipos confiables", copy: "Atención cuidadosa al detalle" },
        { title: "Resultados para huéspedes", copy: "Espacios listos para impresionar" },
      ],
      stats: [
        { title: "Airbnb Ready", copy: "Turnovers consistentes entre reservas" },
        { title: "Locales en Punta Cana", copy: "Coordinación rápida y cobertura cercana" },
      ],
    },
    servicesSection: {
      eyebrow: "Nuestros servicios",
      title: "Soluciones de limpieza pensadas para propietarios y hosts",
      copy: "Desde turnovers rápidos para Airbnb hasta limpieza profunda y servicio programado, cada solución está diseñada para darte consistencia y tranquilidad.",
    },
    services: [
      { title: "Limpieza de Airbnb", description: "Turnovers rápidos y profesionales para recibir huéspedes con confianza.", icon: "🛏️" },
      { title: "Limpieza de Villas", description: "Cuidado premium para villas de alto nivel que necesitan una presentación impecable.", icon: "🏡" },
      { title: "Limpieza de Apartamentos", description: "Espacios impecables para vivir, alquilar o recibir visitas.", icon: "🏢" },
      { title: "Limpieza Profunda", description: "Limpieza detallada y desinfección para una renovación completa del espacio.", icon: "✨" },
      { title: "Servicios Programados", description: "Planes semanales, quincenales o mensuales adaptados a tu operación.", icon: "📅" },
      { title: "Mantenimiento Ligero", description: "Soporte práctico para mantener tu propiedad funcional y cuidada.", icon: "🛠️" },
    ],
    why: {
      eyebrow: "Por qué elegirnos",
      title: "Una propiedad más limpia, menos estrés y mejor experiencia para tus huéspedes",
      bullets: ["Servicio responsable enfocado en una presentación impecable.", "Ideal para Airbnb, villas y propiedades que necesitan verse listas en todo momento.", "Comunicación clara y coordinación rápida.", "Un enfoque práctico que te ayuda a ahorrar tiempo y proteger tu reputación."],
      stats: [
        { title: "Airbnb Ready", copy: "Preparación rápida entre reservas" },
        { title: "Respuesta ágil", copy: "Comunicación y coordinación a tiempo" },
        { title: "Before / After", copy: "Evidencia visual que genera confianza" },
        { title: "Punta Cana", copy: "Servicio local en zonas clave" },
      ],
    },
    coverage: {
      eyebrow: "Cobertura local",
      title: "Punta Cana y zonas cercanas",
      copy: "Nos enfocamos en una cobertura estratégica para responder más rápido, coordinarnos mejor y ofrecer un servicio más confiable.",
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
      { question: "¿Trabajan con propiedades Airbnb?", answer: "Sí. Nos enfocamos en turnovers, limpiezas entre reservas y preparación de la propiedad para la llegada de nuevos huéspedes." },
      { question: "¿Atienden villas y apartamentos?", answer: "Sí. Trabajamos con villas, apartamentos, alquileres vacacionales y propiedades residenciales en Punta Cana y zonas cercanas." },
      { question: "¿Ofrecen servicio programado?", answer: "Sí. Podemos coordinar visitas semanales, quincenales o mensuales según la necesidad de cada cliente." },
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
      formCopy: "Usa este formulario como base. Luego podrás conectarlo con Formspree, Basin, Resend o tu propio backend.",
      directTitle: "Contacto directo",
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
        title: "Servicios | CleanGo Punta Cana",
        description: "Conoce nuestros servicios de limpieza para Airbnb, villas, apartamentos, limpieza profunda y servicio programado en Punta Cana.",
        heroEyebrow: "Servicios",
        heroTitle: "Servicios de limpieza pensados para hosts de Airbnb, villas y propiedades administradas",
        heroCopy: "Cada servicio está diseñado para mejorar la presentación, ahorrarte tiempo y mantener tu operación bajo control.",
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
        description: "Contacta a CleanGo para coordinar limpieza de Airbnb, villas, apartamentos o limpieza profunda en Punta Cana.",
        heroEyebrow: "Contacto",
        heroTitle: "Cuéntanos sobre tu propiedad",
        heroCopy: "Déjanos saber qué tipo de apoyo necesitas y te ayudaremos a coordinar el siguiente paso ideal.",
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
