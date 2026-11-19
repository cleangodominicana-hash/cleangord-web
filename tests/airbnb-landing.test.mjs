import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getPath, getWhatsappUrl } from '../src/i18n/ui.ts';

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const built = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');

test('Airbnb routes and reciprocal language navigation follow project conventions', async () => {
  const [config, header, enPage, esPage] = await Promise.all([
    source('src/i18n/config.ts'),
    source('src/components/Header.astro'),
    source('src/pages/services/airbnb-cleaning.astro'),
    source('src/pages/es/servicios/limpieza-airbnb.astro')
  ]);

  assert.equal(getPath('en', 'airbnbService'), '/services/airbnb-cleaning/');
  assert.equal(getPath('es', 'airbnbService'), '/es/servicios/limpieza-airbnb/');
  assert.match(config, /airbnbService: \{ en: 'services\/airbnb-cleaning', es: 'servicios\/limpieza-airbnb' \}/);
  assert.match(header, /'\/services\/airbnb-cleaning\/': '\/es\/servicios\/limpieza-airbnb\/'/);
  assert.match(header, /'\/es\/servicios\/limpieza-airbnb\/': '\/services\/airbnb-cleaning\/'/);
  assert.match(enPage, /routeKey="airbnbService"/);
  assert.match(esPage, /routeKey="airbnbService"/);
});

test('Airbnb landing has service-specific actions and substantial bilingual content', async () => {
  const [landing, translations] = await Promise.all([
    source('src/components/AirbnbServiceLanding.astro'),
    source('src/i18n/ui.ts')
  ]);

  assert.equal((landing.match(/getWhatsappUrl\(locale, 'airbnb-cleaning'\)/g) ?? []).length, 2);
  assert.match(landing, /getPath\(locale, 'contact'\).*service=airbnb-cleaning/);
  assert.match(landing, /<h1/);
  assert.match(landing, /sm:flex-row/);
  assert.match(landing, /md:grid-cols-2/);
  assert.match(landing, /lg:grid-cols-3/);
  assert.match(landing, /focus-visible:outline-2/);
  assert.match(landing, /aria-labelledby="airbnb-scope-title"/);

  for (const phrase of [
    'Cleaning between stays',
    'Property checks and reports',
    'follow-up photos or videos when included in the agreed coordination',
    'Laundry, deep cleaning',
    'portfolios with multiple listings',
    'Limpieza entre reservas',
    'Inspección y reportes',
    'fotografías o videos de seguimiento cuando formen parte de la coordinación acordada',
    'La lavandería, limpieza profunda',
    'administradores con varios alojamientos',
    'Punta Cana, Bávaro, Cap Cana, Verón'
  ]) {
    assert.ok(translations.includes(phrase), `localized content includes: ${phrase}`);
  }
  assert.doesNotMatch(translations, /guaranteed availability|disponibilidad garantizada|fixed package|paquete fijo/i);
});

test('Airbnb service card has two actions while other cards retain service details', async () => {
  const [grid, translations] = await Promise.all([
    source('src/components/ServicesGrid.astro'),
    source('src/i18n/ui.ts')
  ]);
  assert.match(grid, /index === 0/);
  assert.match(grid, /showComplementary && index !== 0/);
  assert.match(grid, /getPath\(locale, 'airbnbService'\)/);
  assert.match(grid, /dict\.buttons\.airbnbDetails/);
  assert.match(grid, /\?service=\$\{serviceIds\[index\]/);
  assert.match(grid, /getPath\(locale, 'contact'\)/);
  assert.match(translations, /airbnbDetails: "Explore the service"/);
  assert.match(translations, /airbnbDetails: "Conocer el servicio"/);
});

test('built Airbnb pages have reciprocal SEO, specific links, and sitemap entries', async () => {
  const [en, es, sitemap] = await Promise.all([
    built('services/airbnb-cleaning/index.html'),
    built('es/servicios/limpieza-airbnb/index.html'),
    built('sitemap-0.xml')
  ]);

  const enPath = '/services/airbnb-cleaning/';
  const esPath = '/es/servicios/limpieza-airbnb/';
  assert.match(en, /<title>Airbnb Cleaning Services in Punta Cana \| Clean GO<\/title>/);
  assert.match(es, /<title>Limpieza de Airbnb en Punta Cana \| Clean GO<\/title>/);
  assert.match(en, new RegExp(`<link rel="canonical" href="https://www\\.cleangopuntacana\\.com${enPath}">`));
  assert.match(es, new RegExp(`<link rel="canonical" href="https://www\\.cleangopuntacana\\.com${esPath}">`));
  assert.match(en, new RegExp(`hreflang="es" href="https://www\\.cleangopuntacana\\.com${esPath}"`));
  assert.match(es, new RegExp(`hreflang="en" href="https://www\\.cleangopuntacana\\.com${enPath}"`));

  for (const [html, locale] of [[en, 'en'], [es, 'es']]) {
    assert.equal((html.match(/<h1/g) ?? []).length, 1, `${locale} has one H1`);
    assert.ok(html.includes(`${locale === 'es' ? '/es/contacto/' : '/contact/'}?service=airbnb-cleaning`));
    const whatsapp = getWhatsappUrl(locale, 'airbnb-cleaning').replaceAll('&', '&amp;');
    assert.ok(html.includes(whatsapp), `${locale} includes the service-specific WhatsApp URL`);
    assert.doesNotMatch(html, /"@type":"FAQPage"/);
  }

  assert.ok(sitemap.includes(`https://www.cleangopuntacana.com${enPath}`));
  assert.ok(sitemap.includes(`https://www.cleangopuntacana.com${esPath}`));
});

test('built service cards keep exactly two Airbnb actions and existing actions for other services', async () => {
  const [en, es] = await Promise.all([
    built('services/index.html'),
    built('es/servicios/index.html')
  ]);

  for (const [html, locale] of [[en, 'en'], [es, 'es']]) {
    const card = html.match(new RegExp(
      locale === 'es'
        ? '<h3[^>]*>Limpieza de Airbnb y Alquileres Vacacionales<\\/h3>([\\s\\S]*?)<\\/article>'
        : '<h3[^>]*>Airbnb &amp; Vacation Rental Cleaning<\\/h3>([\\s\\S]*?)<\\/article>'
    ))?.[1] ?? '';
    assert.ok(card, `${locale} Airbnb card is present`);
    assert.equal((card.match(/<a /g) ?? []).length, 2, `${locale} Airbnb card has exactly two actions`);
    assert.ok(card.includes(locale === 'es' ? 'Conocer el servicio' : 'Explore the service'));
    assert.ok(card.includes('?service=airbnb-cleaning'));
    assert.doesNotMatch(card, /<details/);
    assert.equal((html.match(/<details/g) ?? []).length, 4, `${locale} other four cards retain details`);
  }
});
