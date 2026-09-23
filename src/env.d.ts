/// <reference types="astro/client" />

/**
 * Typed environment variables. Every name here must also appear in .env.example
 * with a comment explaining what it is for — an undocumented secret is a trap
 * for whoever deploys this next.
 */
interface ImportMetaEnv {
  /** Canonical origin, no trailing slash. Overrides the default in src/config.mjs. */
  readonly SITE_URL?: string;

  /**
   * Sub-path the site is served from, e.g. '/bella-service/'. Defaults to '/'.
   * The GitHub Pages workflow sets this; nothing else should need to.
   */
  readonly BASE_PATH?: string;

  /**
   * Optional webhook the contact form posts to directly from the browser —
   * an n8n Webhook node, or anything that accepts JSON.
   *
   * PUBLIC_ prefix is required: Astro only exposes variables with that prefix
   * to client-side code, and this one has to be readable in the browser.
   *
   * When set, the form bypasses /api/kontakt entirely, which is what lets it
   * work on a static host. The URL is visible in the page source, so the
   * receiving workflow must validate and rate-limit for itself.
   *
   * An empty value counts as unset: see the note in src/data/webhooks.ts.
   */
  readonly PUBLIC_CONTACT_WEBHOOK?: string;

  /**
   * Optional webhook the SERVER mirrors each delivered enquiry to, after the
   * mail has been sent. Never exposed to the browser (no PUBLIC_ prefix).
   *
   * A failure here is logged and swallowed: the visitor's enquiry has already
   * been mailed, and an automation hiccup must not turn a successful
   * submission into an error on their screen.
   */
  readonly CONTACT_WEBHOOK?: string;

  /**
   * The two n8n webhooks the inline quote request posts to, straight from the
   * browser. PUBLIC_ so they are readable client-side.
   *
   * SIMPLE receives an e-mail address and nothing else — the start page hero.
   * DETAILED also carries the service and the area — the price-request panel.
   *
   * Both default to the client's n8n TEST endpoints, which only answer once
   * per "Execute workflow" click. Set these to the /webhook/ production URLs
   * before launch. See emails/README.md.
   */
  readonly PUBLIC_WEBHOOK_QUOTE_SIMPLE?: string;
  readonly PUBLIC_WEBHOOK_QUOTE_DETAILED?: string;

  /** SMTP transport for the contact form. All five are required together. */
  readonly SMTP_HOST?: string;
  readonly SMTP_PORT?: string;
  readonly SMTP_USER?: string;
  readonly SMTP_PASSWORD?: string;
  /** Mailbox that receives contact form submissions. */
  readonly CONTACT_TO?: string;
  /** Envelope sender. Must be a mailbox the SMTP account may send as. */
  readonly CONTACT_FROM?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
