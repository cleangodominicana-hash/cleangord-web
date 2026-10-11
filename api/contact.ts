import type { VercelRequest, VercelResponse } from '@vercel/node';

export const serviceLabels = {
  en: {
    'airbnb-cleaning': 'Airbnb Cleaning',
    'villa-cleaning': 'Villa Cleaning',
    'apartment-cleaning': 'Apartment Cleaning',
    'deep-cleaning': 'Deep Cleaning',
    'scheduled-cleaning': 'Scheduled Cleaning',
    'light-maintenance': 'Light Maintenance'
  },
  es: {
    'airbnb-cleaning': 'Limpieza de Airbnb',
    'villa-cleaning': 'Limpieza de Villas',
    'apartment-cleaning': 'Limpieza de Apartamentos',
    'deep-cleaning': 'Limpieza Profunda',
    'scheduled-cleaning': 'Servicios Programados',
    'light-maintenance': 'Mantenimiento Ligero'
  }
} as const;

export const serviceIds = Object.keys(serviceLabels.en) as ServiceId[];
type ServiceId = keyof typeof serviceLabels.en;

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

const validText = (value: unknown, min: number, max: number) =>
  typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;

const getHeader = (request: VercelRequest, name: string) => {
  const value = request.headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
};

const allowedOrigins = () => {
  const origins = new Set([PRODUCTION_ORIGIN]);
  if (process.env.VERCEL_ENV !== 'production') {
    if (/^[a-z0-9.-]+$/i.test(process.env.VERCEL_URL ?? '')) origins.add(`https://${process.env.VERCEL_URL}`);
    origins.add('http://localhost:3000');
    origins.add('http://localhost:4321');
  }
  return origins;
};

export default async function handler(request: VercelRequest, response: VercelResponse): Promise<void> {
  const json = (body: object, status: number, headers: Record<string, string> = {}) => {
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    for (const [name, value] of Object.entries(headers)) response.setHeader(name, value);
    response.status(status).json(body);
  };

  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405, { Allow: 'POST' });

  if (!allowedOrigins().has(getHeader(request, 'origin'))) {
    return json({ ok: false, error: 'invalid_origin' }, 403);
  }

  if (getHeader(request, 'content-type').split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    return json({ ok: false, error: 'invalid_content_type' }, 415);
  }

  const declaredLength = Number(getHeader(request, 'content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'request_too_large' }, 413);
  }

  let rawBody: string;
  try {
    if (typeof request.body === 'string') rawBody = request.body;
    else if (Buffer.isBuffer(request.body)) rawBody = request.body.toString('utf8');
    else {
      const serialized = JSON.stringify(request.body);
      if (typeof serialized !== 'string') throw new TypeError('Invalid request body');
      rawBody = serialized;
    }
  } catch {
    return json({ ok: false, error: 'invalid_request' }, 400);
  }
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
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

  const idempotencyKey = getHeader(request, 'idempotency-key');
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
