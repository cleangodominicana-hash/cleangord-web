import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('the bilingual form keeps required fields, accessible status, and privacy link', async () => {
  const [form, translations] = await Promise.all([
    source('src/components/ContactForm.astro'),
    source('src/i18n/ui.ts')
  ]);
  assert.match(form, /name="name"[^>]+required/);
  assert.match(form, /name="zone"[^>]+required/);
  assert.match(form, /name="service" required/);
  // Email and phone are optional individually; at least one is enforced in JS and on the server.
  assert.doesNotMatch(form, /name="email"[^>]+required/);
  assert.doesNotMatch(form, /name="phone"[^>]+required/);
  assert.doesNotMatch(form, /name="message"[^>]+required/);
  assert.match(form, /name="date"[^>]+maxlength="120"/);
  assert.match(form, /name="message"[^>]+maxlength="2000"/);
  assert.match(form, /hasContactMethod/);
  assert.match(form, /contactRequired/);
  assert.match(form, /contactHint/);
  assert.match(form, /at least one contact method: email or phone\/WhatsApp/);
  assert.match(form, /al menos un medio de contacto: correo o teléfono\/WhatsApp/);
  assert.match(form, /aria-live="polite"/);
  assert.match(form, /privacy policy/);
  assert.match(form, /política de privacidad/);
  assert.match(translations, /Tell us what you need/);
  assert.match(translations, /Cuéntanos qué necesitas/);
  // The form heading and description use the approved commercial copy.
  assert.match(translations, /formTitle: "Request a Cleaning Quote"/);
  assert.match(translations, /formCopy: "Tell us what kind of cleaning you need, and we'll contact you to prepare a quote\."/);
  assert.match(translations, /formTitle: "Solicita tu cotización"/);
  assert.match(translations, /formCopy: "Cuéntanos qué tipo de limpieza necesitas y te contactaremos para preparar una cotización\."/);
});

test('the form preselects a valid ?service= id and ignores invalid ones', async () => {
  const [form, contactConfig] = await Promise.all([
    source('src/components/ContactForm.astro'),
    source('src/config/contact.ts')
  ]);
  assert.match(form, /URLSearchParams\(window\.location\.search\)/);
  assert.match(form, /option\.value === requestedService/);
  assert.match(form, /serviceField\.value = requestedService/);
  for (const id of ['airbnb-cleaning', 'villa-apartment-cleaning', 'post-construction-cleaning', 'common-area-cleaning', 'office-cleaning']) {
    assert.ok(contactConfig.includes(`'${id}'`), `${id} exists`);
  }
  const grid = await source('src/components/ServicesGrid.astro');
  assert.match(grid, /\?service=\$\{serviceIds\[index\]/);
  assert.match(grid, /getPath\(locale, 'contact'\)/);
});

test('generate_lead follows server success and analytics consent without form data', async () => {
  const form = await source('src/components/ContactForm.astro');
  const success = form.indexOf("result?.ok !== true");
  const consent = form.indexOf("localStorage.getItem(consentKey) === 'granted'");
  const lead = form.indexOf("window.gtag('event', 'generate_lead'");
  assert.ok(success !== -1 && consent > success && lead > consent);
  assert.doesNotMatch(form.slice(lead, lead + 150), /name|email|phone|message|resend/i);
});

test('contact_click remains consent-gated', async () => {
  const analytics = await source('src/components/Analytics.astro');
  assert.match(analytics, /getPreference\(\) !== granted/);
  assert.match(analytics, /window\.gtag\('event', 'contact_click'/);
});
