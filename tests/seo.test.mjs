import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { siteSettings } from '../src/i18n/ui.ts';

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const distDir = fileURLToPath(new URL('../dist/', import.meta.url));

test('layout keeps canonical, hreflang, and declares the local favicon', async () => {
  const layout = await source('src/layouts/MainLayout.astro');
  assert.match(layout, /<link rel="canonical" href=\{canonical\} \/>/);
  assert.match(layout, /hreflang="en" href=\{alternates\.en\}/);
  assert.match(layout, /hreflang="es" href=\{alternates\.es\}/);
  assert.match(layout, /hreflang="x-default" href=\{alternates\.en\}/);
  assert.match(layout, /<link rel="icon" href="\/favicon\.ico" sizes="48x48" type="image\/x-icon" \/>/);
  // The 696 KB favicon.svg stays unlinked so no page loads it.
  assert.doesNotMatch(layout, /favicon\.svg/);
});

test('opening hours in the schema are backed by the published schedule', async () => {
  const seo = await source('src/utils/seo.ts');
  assert.match(seo, /openingHoursSpecification/);
  assert.match(seo, /siteSettings\.openingHours/);

  // The footer schedule is the internal source of truth for the hours.
  assert.match(siteSettings.schedule, /Mon - Sun/);
  const published = siteSettings.schedule.match(/(\d+):(\d+) ([AP])M - (\d+):(\d+) ([AP])M/);
  assert.ok(published, 'published schedule keeps its expected format');
  const to24h = (h, m, meridiem) =>
    `${String((Number(h) % 12) + (meridiem === 'P' ? 12 : 0)).padStart(2, '0')}:${m}`;
  assert.equal(siteSettings.openingHours.opens, to24h(published[1], published[2], published[3]));
  assert.equal(siteSettings.openingHours.closes, to24h(published[4], published[5], published[6]));
  assert.equal(siteSettings.openingHours.dayOfWeek.length, 7);
  assert.equal(siteSettings.openingHours.dayOfWeek[0], 'Monday');
  assert.equal(siteSettings.openingHours.dayOfWeek[6], 'Sunday');

  // Both locales display the same hours in the footer.
  const ui = await source('src/i18n/ui.ts');
  assert.match(ui, /schedule: siteSettings\.schedule/);
  assert.match(ui, /"Lun - Dom: 7:00 a\. m\. - 7:00 p\. m\."/);
});

test('FAQPage JSON-LD is limited to home pages that render the visible FAQ', async () => {
  const [layout, faqComponent, enHome, esHome] = await Promise.all([
    source('src/layouts/MainLayout.astro'),
    source('src/components/FAQ.astro'),
    source('src/pages/index.astro'),
    source('src/pages/es/index.astro')
  ]);
  assert.match(layout, /routeKey === 'home'/);
  assert.match(layout, /faqSchema\(current\.faqs\)/);
  assert.match(faqComponent, /dict\.faqs\.map/);
  assert.match(enHome, /import FAQ from '\.\.\/components\/FAQ\.astro'/);
  assert.match(esHome, /import FAQ from '\.\.\/\.\.\/components\/FAQ\.astro'/);

  const otherPages = [
    'src/pages/services.astro', 'src/pages/es/servicios.astro',
    'src/pages/services/airbnb-cleaning.astro', 'src/pages/es/servicios/limpieza-airbnb.astro',
    'src/pages/coverage.astro', 'src/pages/es/cobertura.astro',
    'src/pages/about.astro', 'src/pages/es/nosotros.astro',
    'src/pages/contact.astro', 'src/pages/es/contacto.astro',
    'src/pages/privacy.astro', 'src/pages/es/privacidad.astro'
  ];
  for (const page of otherPages) {
    assert.doesNotMatch(await source(page), /FAQ\.astro/, `${page} has no FAQ section`);
  }
});

test('built pages expose parseable JSON-LD with matching visible content', async (t) => {
  let files;
  try {
    files = (await readdir(distDir, { recursive: true })).filter((f) => f.endsWith('.html'));
  } catch {
    return t.skip('dist not built');
  }
  assert.equal(files.length, 14, 'fourteen built pages');

  for (const relative of files) {
    const normalized = relative.split('\\').join('/');
    const html = await readFile(join(distDir, relative), 'utf8');

    assert.match(html, /<link rel="canonical" href="https:\/\/www\.cleangopuntacana\.com\//, normalized);
    assert.match(html, /hreflang="en"/, normalized);
    assert.match(html, /hreflang="es"/, normalized);
    assert.match(html, /<link rel="icon" href="\/favicon\.ico"/, normalized);

    const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    assert.equal(scripts.length, 1, `${normalized} has one JSON-LD block`);
    const data = JSON.parse(scripts[0][1]);
    assert.equal(data['@context'], 'https://schema.org', normalized);
    assert.ok(Array.isArray(data['@graph']), normalized);

    const localBusiness = data['@graph'].find((node) => node['@type'] === 'LocalBusiness');
    assert.ok(localBusiness, `${normalized} keeps LocalBusiness`);
    const hours = localBusiness.openingHoursSpecification;
    assert.equal(hours['@type'], 'OpeningHoursSpecification', normalized);
    assert.equal(hours.opens, '07:00', normalized);
    assert.equal(hours.closes, '19:00', normalized);
    assert.equal(hours.dayOfWeek.length, 7, normalized);

    const faqPages = data['@graph'].filter((node) => node['@type'] === 'FAQPage');
    const isHome = normalized === 'index.html' || normalized === 'es/index.html';
    if (isHome) {
      assert.equal(faqPages.length, 1, `${normalized} has one FAQPage`);
      assert.equal(faqPages[0].mainEntity.length, 4, `${normalized} lists the four visible questions`);
      for (const question of faqPages[0].mainEntity) {
        assert.equal(question['@type'], 'Question', normalized);
        assert.ok(html.includes(question.name), `${normalized} renders "${question.name}"`);
        assert.equal(question.acceptedAnswer['@type'], 'Answer', normalized);
        assert.ok(html.includes(question.acceptedAnswer.text), `${normalized} renders its answer`);
      }
    } else {
      assert.equal(faqPages.length, 0, `${normalized} has no FAQ section, so no FAQPage`);
    }
  }
});
