/**
 * Where an inline quote request goes.
 *
 * Two endpoints, because the client's automation treats the two cases
 * differently:
 *
 *  - `simple`   an e-mail address and nothing else. The start page hero, where
 *               the visitor has told us only that they want a quote.
 *  - `detailed` the same, plus the service and the area. The price-request
 *               panel, where they have already said what and how big.
 *
 * ⚠ The defaults are the client's n8n TEST webhooks. A test webhook answers
 * exactly one call after "Execute workflow" is clicked in the editor and 404s
 * the rest of the time, so these are for wiring up, not for a live site.
 * Point the two PUBLIC_WEBHOOK_QUOTE_* variables at the /webhook/ production
 * URLs before launch.
 *
 * ⚠ These URLs ship in the page source, which is unavoidable for a browser
 * post and means anyone can send to them. The receiving workflow has to do its
 * own validation and rate limiting; nothing on this side can.
 *
 * The space in each path is encoded, because a raw space in a URL is not one.
 */
export type RequestKind = 'simple' | 'detailed';

const TEST_ENDPOINTS: Record<RequestKind, string> = {
  simple: 'https://meggamind.app.n8n.cloud/webhook-test/utan%20upgifter',
  detailed: 'https://meggamind.app.n8n.cloud/webhook-test/med%20upgifter',
};

/**
 * `||` rather than `??`, and the difference matters in CI.
 *
 * GitHub Actions substitutes an unset `vars.X` as an empty string, not as
 * undefined — and `'' ?? fallback` keeps the empty string. That shipped a
 * build with no endpoint at all, so the form posted to /api/kontakt, which
 * does not exist on a static host. An empty value means "not configured".
 */
export const requestWebhooks: Record<RequestKind, string> = {
  simple: import.meta.env.PUBLIC_WEBHOOK_QUOTE_SIMPLE || TEST_ENDPOINTS.simple,
  detailed: import.meta.env.PUBLIC_WEBHOOK_QUOTE_DETAILED || TEST_ENDPOINTS.detailed,
};

/**
 * The full contact form on /kontakt.
 *
 * Separate from the two above because it carries a different shape — a name,
 * a phone number, a property address and a written message — and its
 * confirmation e-mail has to reflect all of it.
 *
 * ⚠ This sends the form straight from the browser to n8n and bypasses
 * /api/kontakt, where the server-side honeypot, the rate limiter and the SMTP
 * send live. That endpoint only exists when the site runs on the Node adapter;
 * on a static host there is nothing there at all, which is why this falls back
 * to a real URL rather than to an empty string. To put the form back on SMTP,
 * delete the fallback below — not by setting the variable empty.
 */
export const contactWebhook: string =
  import.meta.env.PUBLIC_CONTACT_WEBHOOK || 'https://meggamind.app.n8n.cloud/webhook-test/kontakt';

/** Hours the confirmation e-mail promises. Used by the copy and the payload. */
export const RESPONSE_HOURS = 48;
