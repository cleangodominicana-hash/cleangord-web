import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getWhatsappUrl, siteSettings } from '../src/i18n/ui.ts';

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const expectedNumber = '18493815983';

test('whatsapp links use the number without a plus sign', () => {
  for (const locale of ['en', 'es']) {
    const url = new URL(getWhatsappUrl(locale));
    assert.equal(url.protocol, 'https:');
    assert.equal(url.hostname, 'wa.me');
    assert.equal(url.pathname, `/${expectedNumber}`);
    assert.equal(url.searchParams.get('text')?.length > 0, true);
  }
});

test('whatsapp number setting keeps the plus sign out of the wa.me path', () => {
  assert.equal(siteSettings.whatsappNumber.replace(/^\+/, ''), expectedNumber);
  for (const locale of ['en', 'es']) {
    assert.doesNotMatch(getWhatsappUrl(locale), /wa\.me\/\+/);
  }
});

test('preloaded whatsapp messages are localized, quote-oriented, and percent-encoded', () => {
  const es = getWhatsappUrl('es');
  const en = getWhatsappUrl('en');
  const esText = new URL(es).searchParams.get('text');
  const enText = new URL(en).searchParams.get('text');
  assert.equal(esText, 'Hola, Clean GO. Quisiera cotizar un servicio de limpieza.\n\nTipo de propiedad:\nZona o residencial:\nFecha aproximada:');
  assert.equal(enText, "Hello, Clean GO. I'd like a cleaning quote.\n\nProperty type:\nArea or residential complex:\nApproximate date:");
  assert.notEqual(esText, enText);
  assert.match(es, /text=Hola%2C%20Clean%20GO/);
  assert.match(en, /text=Hello%2C%20Clean%20GO/);
  assert.match(es, /%0A%0A/);
  assert.match(en, /%0A%0A/);
});

test('service-specific whatsapp messages cover airbnb and villas, general otherwise', () => {
  const esAirbnb = new URL(getWhatsappUrl('es', 'airbnb-cleaning')).searchParams.get('text');
  const enAirbnb = new URL(getWhatsappUrl('en', 'airbnb-cleaning')).searchParams.get('text');
  const esVilla = new URL(getWhatsappUrl('es', 'villa-apartment-cleaning')).searchParams.get('text');
  const enVilla = new URL(getWhatsappUrl('en', 'villa-apartment-cleaning')).searchParams.get('text');
  assert.match(esAirbnb, /limpieza de Airbnb/);
  assert.match(enAirbnb, /Airbnb cleaning quote/);
  assert.match(esVilla, /villa o apartamento/);
  assert.match(enVilla, /villa or apartment cleaning quote/);
  for (const text of [esAirbnb, enAirbnb, esVilla, enVilla]) {
    assert.match(text, /Fecha aproximada:|Approximate date:/);
    assert.ok(text.length <= 300, 'service messages stay short');
  }
  // Services without a dedicated message keep the general quote prompt.
  const esOffice = new URL(getWhatsappUrl('es', 'office-cleaning')).searchParams.get('text');
  const enOffice = new URL(getWhatsappUrl('en', 'office-cleaning')).searchParams.get('text');
  assert.equal(esOffice, new URL(getWhatsappUrl('es')).searchParams.get('text'));
  assert.equal(enOffice, new URL(getWhatsappUrl('en')).searchParams.get('text'));
  assert.equal(getWhatsappUrl('es', undefined), getWhatsappUrl('es'));
});

test('header, hero, cta and footer build their whatsapp links from getWhatsappUrl', async () => {
  const components = await Promise.all([
    source('src/components/Header.astro'),
    source('src/components/Hero.astro'),
    source('src/components/CTASection.astro'),
    source('src/components/Footer.astro')
  ]);
  for (const component of components) {
    assert.match(component, /href=\{getWhatsappUrl\(locale\)\}/);
    assert.doesNotMatch(component, /wa\.me\/[0-9]/);
  }
});

test('hero leads with the bilingual whatsapp quote CTA before the benefit cards', async () => {
  const [hero, translations] = await Promise.all([
    source('src/components/Hero.astro'),
    source('src/i18n/ui.ts')
  ]);
  assert.match(translations, /whatsappQuote: "Get a cleaning quote on WhatsApp"/);
  assert.match(translations, /whatsappQuote: "Cotizar limpieza por WhatsApp"/);
  assert.match(hero, /\{dict\.buttons\.whatsappQuote\}/);
  const cta = hero.indexOf('dict.buttons.whatsappQuote');
  const benefits = hero.indexOf('dict.hero.benefits.map');
  assert.ok(cta !== -1 && benefits !== -1 && cta < benefits, 'CTA must render before benefit cards');
  assert.match(hero, /min-h-14 w-full/);
});
