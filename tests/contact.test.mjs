import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import handler from '../api/contact.ts';

const origin = 'https://www.cleangopuntacana.com';
const originalFetch = globalThis.fetch;

const validPayload = (changes = {}) => ({
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '',
  service: 'airbnb-cleaning',
  message: 'I need help with an upcoming turnover.',
  locale: 'en',
  company: '',
  startedAt: Date.now() - 5_000,
  ...changes
});

const request = (body = validPayload(), options = {}) => new Request('https://www.cleangopuntacana.com/api/contact', {
  method: options.method ?? 'POST',
  headers: {
    Origin: options.origin ?? origin,
    'Content-Type': options.contentType ?? 'application/json',
    'Idempotency-Key': options.idempotencyKey ?? 'contact_test_123',
    ...options.headers
  },
  body: options.method === 'GET' ? undefined : (options.rawBody ?? JSON.stringify(body))
});

beforeEach(() => {
  process.env.VERCEL_ENV = 'production';
  process.env.RESEND_API_KEY = 'test-key';
  process.env.CONTACT_FROM = 'Clean GO <contact@cleangopuntacana.com>';
  process.env.CONTACT_TO = 'owner@example.com';
  globalThis.fetch = async () => new Response(JSON.stringify({ id: 'email-id' }), { status: 200 });
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('rejects methods, content types, origins, malformed JSON, and oversized bodies', async (t) => {
  await t.test('method', async () => assert.equal((await handler(request(undefined, { method: 'GET' }))).status, 405));
  await t.test('content type', async () => assert.equal((await handler(request(undefined, { contentType: 'text/plain' }))).status, 415));
  await t.test('origin', async () => assert.equal((await handler(request(undefined, { origin: 'https://evil.example' }))).status, 403));
  await t.test('malformed JSON', async () => assert.equal((await handler(request(undefined, { rawBody: '{' }))).status, 400));
  await t.test('declared size', async () => assert.equal((await handler(request(undefined, { headers: { 'Content-Length': '12001' } }))).status, 413));
  await t.test('actual size', async () => assert.equal((await handler(request(undefined, { rawBody: JSON.stringify(validPayload({ message: 'x'.repeat(12_001) })) }))).status, 413));
});

test('rejects invalid fields, service, locale, honeypot, timing, and idempotency key', async () => {
  const invalidPayloads = [
    { name: '' },
    { name: 'x'.repeat(101) },
    { email: 'not-an-email' },
    { email: `${'x'.repeat(250)}@example.com` },
    { phone: '123' },
    { phone: 'not-a-phone' },
    { message: 'short' },
    { message: 'x'.repeat(2_001) },
    { service: 'custom-service' },
    { locale: 'fr' },
    { company: 'spam company' },
    { startedAt: Date.now() },
    { startedAt: undefined }
  ];

  for (const changes of invalidPayloads) {
    const response = await handler(request(validPayload(changes)));
    assert.equal(response.status, 400, JSON.stringify(changes));
  }
  assert.equal((await handler(request(validPayload(), { idempotencyKey: 'bad' }))).status, 400);
  assert.equal((await handler(request(undefined, { rawBody: 'null' }))).status, 400);
});

test('fails safely when server variables are missing', async () => {
  for (const variable of ['RESEND_API_KEY', 'CONTACT_FROM', 'CONTACT_TO']) {
    const value = process.env[variable];
    delete process.env[variable];
    const response = await handler(request());
    assert.equal(response.status, 503, variable);
    assert.deepEqual(await response.json(), { ok: false, error: 'service_unavailable' });
    process.env[variable] = value;
  }
});

test('returns a safe error when Resend rejects or cannot be reached', async () => {
  globalThis.fetch = async () => new Response('rejected', { status: 422 });
  assert.equal((await handler(request())).status, 502);

  globalThis.fetch = async () => { throw new Error('network details must not escape'); };
  const response = await handler(request());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { ok: false, error: 'delivery_failed' });
});

test('sends validated text to Resend and returns ok only after acceptance', async () => {
  let outbound;
  globalThis.fetch = async (url, init) => {
    outbound = { url, init };
    return new Response(JSON.stringify({ id: 'private-resend-id' }), { status: 200 });
  };

  const response = await handler(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(outbound.url, 'https://api.resend.com/emails');
  assert.equal(outbound.init.headers['Idempotency-Key'], 'contact_test_123');
  const email = JSON.parse(outbound.init.body);
  assert.equal(email.reply_to, 'jane@example.com');
  assert.equal(email.html, undefined);
  assert.match(email.text, /Service: Airbnb Cleaning/);
});

test('forwards one stable idempotency key across a double submission', async () => {
  const accepted = new Set();
  let deliveries = 0;
  globalThis.fetch = async (_url, init) => {
    const key = init.headers['Idempotency-Key'];
    if (!accepted.has(key)) {
      accepted.add(key);
      deliveries += 1;
    }
    return new Response(JSON.stringify({ id: 'same-email' }), { status: 200 });
  };

  assert.equal((await handler(request())).status, 200);
  assert.equal((await handler(request())).status, 200);
  assert.equal(deliveries, 1);
});
