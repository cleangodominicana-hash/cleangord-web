import { serviceIds, serviceLabels, type ServiceId } from '../src/config/contact.ts';

const MAX_BODY_BYTES = 12_000;
const PRODUCTION_ORIGIN = 'https://www.cleangopuntacana.com';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s.-]+$/;
const IDEMPOTENCY_PATTERN = /^[A-Za-z0-9_-]{8,128}$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
  locale?: unknown;
  company?: unknown;
  startedAt?: unknown;
};

const json = (body: object, status: number, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers
    }
  });

const validText = (value: unknown, min: number, max: number) =>
  typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;

const allowedOrigins = () => {
  const origins = new Set([PRODUCTION_ORIGIN]);
  if (process.env.VERCEL_ENV !== 'production') {
    origins.add('http://localhost:3000');
    origins.add('http://localhost:4321');
  }
  return origins;
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405, { Allow: 'POST' });

  if (!allowedOrigins().has(request.headers.get('origin') ?? '')) {
    return json({ ok: false, error: 'invalid_origin' }, 403);
  }

  if (request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    return json({ ok: false, error: 'invalid_content_type' }, 415);
  }

  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'request_too_large' }, 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return json({ ok: false, error: 'invalid_request' }, 400);
  }
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'request_too_large' }, 413);
  }

  let body: ContactPayload;
  try {
    body = JSON.parse(rawBody) as ContactPayload;
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ ok: false, error: 'invalid_fields' }, 400);
  }

  const idempotencyKey = request.headers.get('idempotency-key') ?? '';
  const locale = body.locale;
  const service = body.service;
  const phoneValid = body.phone === undefined || body.phone === '' || (
    validText(body.phone, 7, 30) &&
    PHONE_PATTERN.test(String(body.phone)) &&
    String(body.phone).replace(/\D/g, '').length >= 7
  );
  const submittedAt = typeof body.startedAt === 'number' ? body.startedAt : NaN;
  const elapsed = Date.now() - submittedAt;

  if (body.company !== '' || !Number.isFinite(submittedAt) || elapsed < 2_500) {
    return json({ ok: false, error: 'submission_rejected' }, 400);
  }
  if (
    !validText(body.name, 2, 100) ||
    !validText(body.email, 3, 254) ||
    !EMAIL_PATTERN.test(String(body.email)) ||
    !phoneValid ||
    !validText(body.message, 10, 2_000) ||
    !serviceIds.includes(service as ServiceId) ||
    (locale !== 'en' && locale !== 'es') ||
    !IDEMPOTENCY_PATTERN.test(idempotencyKey)
  ) {
    return json({ ok: false, error: 'invalid_fields' }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !from || !to) return json({ ok: false, error: 'service_unavailable' }, 503);

  const name = String(body.name).trim();
  const email = String(body.email).trim();
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const message = String(body.message).trim();
  const serviceLabel = serviceLabels[locale][service as ServiceId];
  const text = [
    `Language: ${locale}`,
    `Service: ${serviceLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    '',
    'Message:',
    message
  ].join('\n');

  let resendResponse: Response;
  try {
    resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Clean GO contact: ${serviceLabel}`,
        text
      })
    });
  } catch {
    return json({ ok: false, error: 'delivery_failed' }, 502);
  }

  if (!resendResponse.ok) return json({ ok: false, error: 'delivery_failed' }, 502);
  return json({ ok: true }, 200);
}
