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
  assert.match(form, /name="email"[^>]+required/);
  assert.match(form, /name="service" required/);
  assert.match(form, /name="message"[^>]+required/);
  assert.match(form, /aria-live="polite"/);
  assert.match(form, /privacy policy/);
  assert.match(form, /política de privacidad/);
  assert.match(translations, /Tell us what you need/);
  assert.match(translations, /Cuéntanos qué necesitas/);
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
