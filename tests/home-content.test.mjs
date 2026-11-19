import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('home pages keep testimonials and before/after sections out of the markup', async () => {
  for (const page of ['src/pages/index.astro', 'src/pages/es/index.astro']) {
    const markup = await source(page);
    assert.doesNotMatch(markup, /Testimonials|BeforeAfter/, `${page} does not render removed sections`);
  }
});

test('the trust card reports inspections and incidents instead of visual evidence', async () => {
  const [translations, component] = await Promise.all([
    source('src/i18n/ui.ts'),
    source('src/components/WhyChooseUs.astro')
  ]);
  assert.match(translations, /title: "Property Checks & Reports", copy: "We inspect the property and report any issues identified during the service\."/);
  assert.match(translations, /title: "Supervisión y reportes", copy: "Inspeccionamos la propiedad y comunicamos cualquier incidencia detectada durante el servicio\."/);
  assert.doesNotMatch(translations, /Before \/ After|Antes \/ después/);
  assert.doesNotMatch(translations, /Visual proof that builds trust|Evidencia visual que genera confianza/);
  assert.match(component, /ClipboardCheck/);
  assert.doesNotMatch(component, /Camera/);
});
