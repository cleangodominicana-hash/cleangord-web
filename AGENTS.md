# Clean GO Punta Cana — instrucciones para agentes

## Propósito y prioridades

Sitio web comercial de **Clean GO Punta Cana**, empresa de servicios de limpieza en Punta Cana/Bávaro, República Dominicana. Objetivo: conseguir solicitudes de cotización y clientes recurrentes, especialmente propietarios y administradores de Airbnb, villas y apartamentos; preparar la captación para la temporada alta de diciembre y enero. Priorizar **confianza, conversión móvil, WhatsApp, formularios, SEO local y rendimiento** sobre efectos visuales o funcionalidades innecesarias.

Communicate with the project owner **in English**, clearly and briefly. Do not invent business details, reviews, completed work, availability, pricing, photo permissions, metrics, or test results.

## Stack y entorno

- **Astro 6**, **Tailwind CSS**, **TypeScript** y Node.js.
- Web bilingüe: inglés (`/`) y español (`/es/`); páginas de servicios `/services/` y `/es/servicios/`.
- Sitio estático con **API de contacto** en `api/contact.ts`; correo mediante Resend. Analytics con **GA4** y consentimiento de cookies.
- Repositorio local en Windows: `C:\desarrollo\licaty\cleango-web`.
- GitHub: `cleangodominicana-hash/cleangord-web`. Rama de trabajo **`develop`**; **`main`** publica en Vercel tras integración aprobada por el responsable.
- **Confirma las versiones y scripts reales en `package.json` antes de ejecutarlos**; estas indicaciones no sustituyen el código fuente.

## Comandos y verificaciones

En PowerShell, desde la raíz:

- Desarrollo: `.\node_modules\.bin\astro.cmd dev` (preferido en esta máquina: `pnpm dev` ha intentado reinstalar `node_modules` debido a diferencias de configuración).
- Pruebas conocidas: `node --test tests/contact.test.mjs`; inspecciona `package.json` y `tests/` para identificar otras pruebas y scripts disponibles.
- Build: `.\node_modules\.bin\astro.cmd build` o el script de build ya configurado en `package.json`.
- Tipado/Astro: usar **el comando ya configurado** en el proyecto; no instalar herramientas ni dependencias solo para comprobar tipos.
- Integridad Git: `git diff --check`, `git status --short`, `git diff --stat`.

Antes de dar por terminada una implementación, ejecutar las verificaciones existentes pertinentes y **reportar exactamente cuáles se ejecutaron**, si pasaron y cuáles no pudieron ejecutarse. No afirmar que algo fue probado visualmente o en producción si no se comprobó.

## Estructura relevante

- `src/components/`: componentes Astro reutilizables (hero, tarjetas de servicios, CTA, testimonios, antes/después, formulario, encabezado).
- `src/i18n/ui.ts`: textos y configuración de interfaz en inglés y español.
- `src/pages/` y `src/pages/es/`: rutas EN y ES.
- `src/config/contact.ts`: configuración de opciones de contacto.
- `api/contact.ts`: endpoint y validación del formulario.
- `tests/`: pruebas automatizadas existentes.
- `src/styles/`: estilos globales.
- `public/images/services/`: cinco fotografías WebP de tarjetas de servicios.
- `docs/`: **contenido preexistente no rastreado; no leer, modificar, mover, eliminar ni agregar al staging sin permiso explícito**.

Inspecciona el árbol de archivos antes de suponer que existen otras rutas o herramientas.

## Servicios y mensajes comerciales

Cinco servicios principales, en este orden:

1. Limpieza de Airbnb y alquileres vacacionales.
2. Limpieza de villas y apartamentos.
3. Limpieza postobra.
4. Limpieza de áreas comunes.
5. Limpieza de oficinas.

Servicios adicionales bajo cotización: limpieza profunda, lavandería, colchones/muebles/tapicería, jardinería, piscina, aire acondicionado y tareas de mantenimiento relacionadas. Algunos servicios pueden ejecutarse mediante colaboradores: **no afirmar que todos se prestan con personal propio**.

- **No publicar tarifas rígidas** ni inventar descuentos, paquetes, disponibilidad o tiempos garantizados.
- Para Airbnb se priorizan inspección visual, presentación de la propiedad, fotografías/videos e incidencias, según acuerdo. La lavandería y servicios extraordinarios pueden cotizarse aparte.
- Captar solicitudes por WhatsApp y formulario. WhatsApp: **`https://wa.me/18493815983`** (número sin `+` en la ruta).
- Mensajes naturales, profesionales, concretos y sin afirmaciones absolutas no verificadas.
- Mantener coherencia de contenido y CTA en ES/EN; no traducir literalmente si perjudica la naturalidad.

## SEO, confianza y accesibilidad

- Preservar rutas, canonical, `hreflang`, sitemap, robots, metadatos SEO, analítica y consentimiento.
- Preservar el comportamiento de eventos GA4 (`contact_click`, `generate_lead`) salvo autorización explícita.
- No inventar opiniones, nombres de clientes, estadísticas, imágenes de trabajos, certificaciones ni experiencia corporativa.
- Las fotografías generadas con IA en servicios son **ilustrativas**; no presentarlas como trabajos realmente ejecutados.
- No publicar testimonios sin fuente ni mostrar fotografías de stock como pares auténticos de «Antes y después».
- Describir fielmente las imágenes con `alt` apropiado por idioma; mantener buen diseño responsive, contraste, rendimiento y enlaces accesibles.
- No usar reseñas de Google sin verificar su contenido, atribución y condiciones aplicables.

## Convenciones de implementación

- Reutiliza componentes, convenciones y estilos ya presentes. Haz el **cambio mínimo y específico**.
- Respeta los tipos TypeScript; evita `any`, conversiones forzadas y errores silenciados sin justificación.
- Valida la entrada del usuario en frontend y backend donde aplique; evita divergencias entre opciones de formulario y API.
- No cambies contratos, endpoints, analítica, textos de otras secciones o dependencias como efecto colateral.
- Si alteras enlaces, formularios o lógica compartida, añade/actualiza pruebas que cubran ES/EN y casos relevantes.
- No generes contenido promocional ficticio ni sustituyas fotografía auténtica por ilustraciones sin autorización.

## Reglas estrictas de Git y archivos

- **Trabaja solamente en `develop`**. Verifica la rama antes de modificar algo.
- **No ejecutar** `git add`, `git commit`, `git push`, crear PR, merge, cambiar de rama ni desplegar. El responsable realiza esas acciones personalmente.
- **Nunca usar `git add .`** ni comandos destructivos (`git reset --hard`, `git clean`, restauraciones masivas, borrados de cambios ajenos).
- Respeta todo trabajo previo, archivos nuevos/no rastreados y cambios en curso.
- **No tocar `docs/`** sin autorización específica.
- No añadir, actualizar o reinstalar dependencias ni modificar lockfiles sin consentimiento.
- No tocar secretos, `.env`, credenciales, tokens ni datos personales; nunca incluirlos en informes o commits.

## Flujo de trabajo y agentes OpenCode

- **Plan**: inspección, auditorías, diagnóstico, arquitectura o tareas ambiguas; sin escribir archivos. Para trabajos no triviales, presenta un plan corto y espera aprobación antes de usar Build.
- **Build**: cambios concretos que el responsable ya aprobó. Ejecuta una sola etapa a la vez y no amplíes el alcance.
- Dar prioridad a **modelos gratuitos disponibles en OpenCode** cuando sean suficientemente fiables para la tarea. Escalar a modelos de pago solo si la complejidad, riesgos o fallos lo justifican; no cambiar de modelo por cuenta propia si el responsable especificó uno.
- Antes de editar: comprobar rama, estado Git, archivos pertinentes y dependencias entre EN/ES.
- Si faltan datos importantes, existen riesgos o la seguridad de la solución es baja, preguntar; **no inventar**.
- Al terminar, comunicar: resumen de cambios, archivos modificados, pruebas con resultados, riesgos pendientes y estado Git. Dejar todo **sin commit** para revisión humana.

## Contexto reciente y trabajo pendiente

- **06B completada y desplegada**: cinco categorías de servicios bilingües, tarjetas con cinco WebP locales, CTA y opciones de formulario alineadas.
- **06C pendiente**, en etapas independientes:
  1. Retirar testimonios no verificables y la sección engañosa de «Antes y después»; corregir enlaces `wa.me` y descripción imprecisa de foto de stock del hero.
  2. Mejorar acceso a cotización desde el hero móvil.
  3. Mensajes de WhatsApp según servicio y revisión de campos del formulario.
  4. SEO local y comunicación para temporada alta, sin inventar disponibilidad.
  5. Comprobar medición de clics, leads y formularios.
- Hay un Perfil de Empresa en Google, pero todavía se están reuniendo reseñas auténticas. No importar ni mostrar opiniones sin aprobación explícita.
- **Las etapas pendientes no son autorización automática para implementarlas todas**: ejecutar solo lo que pida el prompt vigente.

## Documentación

Antes de cambios importantes, consultar `package.json`, el componente afectado y las pruebas. No asumir que los archivos de `docs/` son editables. Si este `AGENTS.md` entra en conflicto con instrucciones expresas posteriores del responsable, solicitar confirmación antes de ejecutar acciones irreversibles.

## Language and Token Efficiency

- All task prompts and instructions provided to OpenCode should be written in English.
- Always respond in English, including plans, progress updates, implementation summaries, and final reports.
- Keep responses concise, technical, and focused on changes, validation results, and blockers.
- Avoid unnecessary repetition and explanations already covered in AGENTS.md.
- Preserve bilingual website content: Spanish for ES pages and English for EN pages.
- Never translate or rewrite existing user-facing copy unless explicitly requested.
- Prioritize correctness, maintainability, security, and testing over token savings.
