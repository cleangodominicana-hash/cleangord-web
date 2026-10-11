import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { afterEach, beforeEach, test } from 'node:test';
import handler, { serviceIds, serviceLabels } from '../api/contact.ts';
import { serviceIds as formServiceIds, serviceLabels as formServiceLabels } from '../src/config/contact.ts';

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

const request = (body = validPayload(), options = {}) => ({
  method: options.method ?? 'POST',
  headers: {
    origin: options.origin ?? origin,
    'content-type': options.contentType ?? 'application/json',
    'idempotency-key': options.idempotencyKey ?? 'contact_test_123',
    ...options.headers
  },
  body: options.method === 'GET' ? undefined : (options.rawBody ?? body),
  query: {},
  cookies: {}
});

const response = () => ({
  statusCode: 200,
  body: undefined,
  headers: {},
  setHeader(name, value) {
    this.headers[name.toLowerCase()] = value;
    return this;
  },
  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  },
  json(body) {
    this.body = body;
    return this;
  }
});

const invoke = async (req = request()) => {
  const res = response();
  await handler(req, res);
  return res;
};

beforeEach(() => {
  process.env.VERCEL_ENV = 'production';
  delete process.env.VERCEL_URL;
  process.env.RESEND_API_KEY = 'test-key';
  process.env.CONTACT_FROM = 'Clean GO <contact@cleangopuntacana.com>';
  process.env.CONTACT_TO = 'owner@example.com';
  globalThis.fetch = async () => new Response(JSON.stringify({ id: 'email-id' }), { status: 200 });
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('uses only an erased type import and keeps form services in sync', async () => {
  const source = await readFile(new URL('../api/contact.ts', import.meta.url), 'utf8');
  assert.match(source, /^import type .* from '@vercel\/node';/m);
  assert.doesNotMatch(source, /^\s*import\s+(?!type\b)/m);
  assert.deepEqual(serviceIds, [...formServiceIds]);
  assert.deepEqual(serviceLabels, formServiceLabels);
});

test('handles Vercel headers, methods, JSON, malformed bodies, and size limits', async (t) => {
  await t.test('method', async () => {
    const res = await invoke(request(undefined, { method: 'GET' }));
    assert.equal(res.statusCode, 405);
    assert.equal(res.headers.allow, 'POST');
  });
  await t.test('content type', async () => assert.equal((await invoke(request(undefined, { contentType: 'text/plain' }))).statusCode, 415));
  await t.test('origin', async () => assert.equal((await invoke(request(undefined, { origin: 'https://evil.example' }))).statusCode, 403));
  await t.test('array header', async () => assert.equal((await invoke(request(undefined, { headers: { origin: [origin] } }))).statusCode, 200));
  await t.test('buffer body', async () => assert.equal((await invoke(request(undefined, { rawBody: Buffer.from(JSON.stringify(validPayload())) }))).statusCode, 200));
  await t.test('malformed JSON', async () => assert.equal((await invoke(request(undefined, { rawBody: '{' }))).statusCode, 400));
  await t.test('declared size', async () => assert.equal((await invoke(request(undefined, { headers: { 'content-length': '12001' } }))).statusCode, 413));
  await t.test('actual size', async () => assert.equal((await invoke(request(validPayload({ message: 'x'.repeat(12_001) })))).statusCode, 413));
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
    const res = await invoke(request(validPayload(changes)));
    assert.equal(res.statusCode, 400, JSON.stringify(changes));
  }
  assert.equal((await invoke(request(validPayload(), { idempotencyKey: 'bad' }))).statusCode, 400);
  assert.equal((await invoke(request(undefined, { rawBody: 'null' }))).statusCode, 400);
});

test('fails safely when server variables are missing', async () => {
  for (const variable of ['RESEND_API_KEY', 'CONTACT_FROM', 'CONTACT_TO']) {
    const value = process.env[variable];
    delete process.env[variable];
    const res = await invoke();
    assert.equal(res.statusCode, 503, variable);
    assert.deepEqual(res.body, { ok: false, error: 'service_unavailable' });
    process.env[variable] = value;
  }
});

test('returns a controlled error without the Resend key in Preview', async () => {
  process.env.VERCEL_ENV = 'preview';
  process.env.VERCEL_URL = 'cleango-preview.vercel.app';
  delete process.env.RESEND_API_KEY;
  const res = await invoke(request(undefined, { origin: 'https://cleango-preview.vercel.app' }));
  assert.equal(res.statusCode, 503);
  assert.deepEqual(res.body, { ok: false, error: 'service_unavailable' });
});

test('returns a safe error when Resend rejects or cannot be reached', async () => {
  globalThis.fetch = async () => new Response('rejected', { status: 422 });
  assert.equal((await invoke()).statusCode, 502);

  globalThis.fetch = async () => { throw new Error('network details must not escape'); };
  const res = await invoke();
  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.body, { ok: false, error: 'delivery_failed' });
});

test('sends validated text to Resend and returns ok only after acceptance', async () => {
  let outbound;
  globalThis.fetch = async (url, init) => {
    outbound = { url, init };
    return new Response(JSON.stringify({ id: 'private-resend-id' }), { status: 200 });
  };

  const res = await invoke();
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true });
  assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
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

  assert.equal((await invoke()).statusCode, 200);
  assert.equal((await invoke()).statusCode, 200);
  assert.equal(deliveries, 1);
});
