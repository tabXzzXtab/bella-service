import type { APIRoute } from 'astro';

import {
  formatEmailBody,
  isRateLimited,
  looksAutomated,
  validateSubmission,
} from '../../lib/contact';
import { getMailerConfig, sendContactMail } from '../../lib/mailer';
import { site } from '../../data/site';

/**
 * POST /api/kontakt — receives a contact form submission and emails it on.
 *
 * This is the one route in the project that is NOT prerendered: every page is
 * static HTML, this alone runs on the server. That is why astro.config.mjs
 * carries a Node adapter while `output` stays 'static'.
 *
 * Responses are JSON, and always one of:
 *   200 { ok: true,  delivered: boolean }
 *   400 { ok: false, errors: { field: translationKey } }
 *   429 { ok: false, errors: { form: translationKey } }
 *   500 { ok: false, errors: { form: translationKey } }
 * The client turns those translation keys into Swedish or English.
 */
export const prerender = false;

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Never let a proxy or the browser cache a form response.
      'cache-control': 'no-store',
    },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, errors: { form: 'contact.form.error.body' } }, 400);
  }

  // clientAddress can be unavailable behind some proxies; a shared bucket is
  // still better than no limit at all.
  const clientKey = clientAddress || 'unknown';
  if (isRateLimited(clientKey)) {
    return json({ ok: false, errors: { form: 'contact.form.error.rateLimit' } }, 429);
  }

  // Answer a bot with the same success it would get from a real send, so it
  // learns nothing about whether the trick worked. Nothing is sent.
  if (looksAutomated(form)) {
    return json({ ok: true, delivered: false }, 200);
  }

  const result = validateSubmission(form);
  if (!result.ok) {
    return json({ ok: false, errors: result.errors }, 400);
  }

  const submission = result.value;
  const config = getMailerConfig();

  if (!config) {
    if (import.meta.env.DEV) {
      // Development convenience: no mail account needed to exercise the form
      // end to end. The submission is printed in full so you can read it.
      console.info(
        '\n[contact] SMTP is not configured — nothing was sent.\n' +
          formatEmailBody(submission, new Date()) +
          '\n',
      );
      return json({ ok: true, delivered: false }, 200);
    }

    // In production this is a real fault: a customer just tried to reach the
    // company and the message has nowhere to go. Fail loudly rather than show
    // a thank-you page for an enquiry that was dropped.
    console.error(
      '[contact] SMTP is not configured in production. The enquiry was NOT delivered. ' +
        'Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD and CONTACT_TO — see .env.example.',
    );
    return json({ ok: false, errors: { form: 'contact.form.error.body' } }, 500);
  }

  const receivedAt = new Date();

  try {
    await sendContactMail(config, {
      subject: `[${site.name}] ${submission.subject || 'Ny förfrågan'} – ${submission.name}`,
      text: formatEmailBody(submission, receivedAt),
      replyTo: submission.email,
    });
  } catch (error) {
    // Log the cause for whoever is on call; tell the visitor only that it
    // failed, and give them the phone number on the page as the way through.
    console.error('[contact] SMTP send failed:', error);
    return json({ ok: false, errors: { form: 'contact.form.error.body' } }, 500);
  }

  // Mirror the enquiry to an automation webhook, if one is configured.
  // Deliberately after the mail and deliberately non-fatal: the customer has
  // been dealt with, and an n8n outage must not surface as a failed
  // submission on their screen.
  const webhook = process.env.CONTACT_WEBHOOK || import.meta.env.CONTACT_WEBHOOK;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...submission, receivedAt: receivedAt.toISOString() }),
        // Never let a hanging webhook hold the visitor's request open.
        signal: AbortSignal.timeout(5000),
      });
    } catch (error) {
      console.error('[contact] webhook mirror failed (enquiry was still mailed):', error);
    }
  }

  return json({ ok: true, delivered: true }, 200);
};

/** Anything other than POST on this URL is a mistake, and says so. */
export const ALL: APIRoute = () =>
  new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
