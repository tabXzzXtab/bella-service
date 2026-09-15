import { DEFAULT_LOCALE, isLocale, type Locale } from '../i18n/config';
import type { UIKey } from '../i18n/ui';

/**
 * Validation and anti-spam for the contact form.
 *
 * This lives apart from the endpoint so the rules are stated once and are
 * readable on their own. The browser also validates, but that is a courtesy to
 * the visitor — anything arriving at the endpoint is assumed hostile until it
 * has been through `validateSubmission`.
 *
 * Errors are returned as translation *keys*, not sentences, so the same result
 * renders in Swedish or English without the server knowing which.
 */

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  /** The property the work is for. Often not the enquirer's own address. */
  propertyAddress: string;
  /** Which of the six services the enquiry is about. */
  subject: string;
  message: string;
  locale: Locale;
}

export type FieldName = 'name' | 'email' | 'phone' | 'message' | 'consent';

export type ValidationResult =
  { ok: true; value: ContactSubmission } | { ok: false; errors: Partial<Record<FieldName, UIKey>> };

/** Caps that stop someone posting a novel into the mailbox. */
const LIMITS = {
  name: 120,
  email: 254, // RFC 5321 maximum
  phone: 40,
  propertyAddress: 200,
  subject: 200,
  message: 5000,
} as const;

const MIN_MESSAGE_LENGTH = 10;

/**
 * Deliberately permissive. Strict email regexes reject valid addresses far more
 * often than they catch typos; the real proof an address works is that the
 * reply arrives. This only rejects what cannot possibly be an address.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/**
 * Swedish numbers get written 0733-987 868, +46 733 98 78 68, 0733 987868 …
 * so rather than pattern-match a format, require enough digits to be dialable.
 */
const MIN_PHONE_DIGITS = 6;

function readField(form: FormData, key: string, limit: number): string {
  const raw = form.get(key);
  return typeof raw === 'string' ? raw.trim().slice(0, limit) : '';
}

function countDigits(value: string): number {
  let digits = 0;
  for (const character of value) {
    if (character >= '0' && character <= '9') digits += 1;
  }
  return digits;
}

export function validateSubmission(form: FormData): ValidationResult {
  const errors: Partial<Record<FieldName, UIKey>> = {};

  const name = readField(form, 'name', LIMITS.name);
  const email = readField(form, 'email', LIMITS.email);
  const phone = readField(form, 'phone', LIMITS.phone);
  const propertyAddress = readField(form, 'propertyAddress', LIMITS.propertyAddress);
  const subject = readField(form, 'subject', LIMITS.subject);
  const message = readField(form, 'message', LIMITS.message);
  const consent = form.get('consent');

  const rawLocale = form.get('locale');
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  if (name.length === 0) errors.name = 'contact.form.error.name';
  if (!EMAIL_PATTERN.test(email)) errors.email = 'contact.form.error.email';
  // The client's brief marks the phone number required: for this trade most
  // enquiries are settled in a two-minute call, not by email.
  if (countDigits(phone) < MIN_PHONE_DIGITS) errors.phone = 'contact.form.error.phone';
  if (message.length < MIN_MESSAGE_LENGTH) errors.message = 'contact.form.error.message';
  if (consent !== 'on' && consent !== 'true') errors.consent = 'contact.form.error.consent';

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: { name, email, phone, propertyAddress, subject, message, locale },
  };
}

/**
 * Two cheap bot checks that cost a real visitor nothing.
 *
 *  1. A honeypot field, hidden from view and from screen readers. A person
 *     never fills it in; a form-filling script fills in everything it finds.
 *  2. Elapsed time. A human needs more than a couple of seconds to describe
 *     their roof; a script posts instantly.
 *
 * Neither is a real defence against a targeted attacker, and neither is meant
 * to be — they exist to absorb the drive-by spam that makes up almost all of
 * it. If real spam gets through, add a CAPTCHA at that point, not before.
 */
export function looksAutomated(form: FormData): boolean {
  const honeypot = form.get('company');
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) return true;

  const renderedAt = Number(form.get('rendered_at'));
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    const elapsedMs = Date.now() - renderedAt;
    // Negative means clock skew or a forged value — treat as suspicious.
    if (elapsedMs < 2500) return true;
  }

  return false;
}

/**
 * A crude sliding-window limiter, keyed by client address.
 *
 * Honest about what it is: the counts live in this process's memory, so they
 * reset on restart and are not shared between instances behind a load balancer.
 * For a company site on one server that is enough. If this site is ever scaled
 * horizontally, move the counter to something shared or to the reverse proxy.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const attempts = new Map<string, number[]>();

export function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(clientKey) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(clientKey, recent);
    return true;
  }

  recent.push(now);
  attempts.set(clientKey, recent);

  // Opportunistic cleanup so the map cannot grow without bound on a long
  // running server.
  if (attempts.size > 5000) {
    for (const [key, timestamps] of attempts) {
      if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) attempts.delete(key);
    }
  }

  return false;
}

/** Plain-text body of the notification email. */
export function formatEmailBody(submission: ContactSubmission, receivedAt: Date): string {
  return [
    `Namn / Name:        ${submission.name}`,
    `Telefon / Phone:    ${submission.phone}`,
    `E-post / Email:     ${submission.email}`,
    `Fastighet / Property: ${submission.propertyAddress || '—'}`,
    `Tjänst / Service:   ${submission.subject || '—'}`,
    `Språk / Language:   ${submission.locale}`,
    `Mottaget:           ${receivedAt.toISOString()}`,
    '',
    '---',
    '',
    submission.message,
  ].join('\n');
}
