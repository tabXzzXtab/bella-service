import nodemailer, { type Transporter } from 'nodemailer';

/**
 * SMTP delivery for the contact form.
 *
 * SMTP rather than a hosted API on purpose: it works with whatever mailbox the
 * company already pays for (Loopia, one.com, Google Workspace, Microsoft 365)
 * and adds no account, no vendor and no monthly cost. Swapping to a provider
 * SDK later means rewriting only this file.
 */

/**
 * Read config from the real process environment first, falling back to Astro's
 * build-time env. This order matters: `import.meta.env` values are frozen into
 * the bundle at build time, so a production server that supplies credentials as
 * real environment variables would otherwise be ignored.
 */
function env(key: string): string | undefined {
  const fromProcess = process.env[key];
  if (fromProcess) return fromProcess;

  const fromAstro = (import.meta.env as Record<string, string | undefined>)[key];
  return fromAstro || undefined;
}

export interface MailerConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  to: string;
  from: string;
}

/**
 * Returns the config, or null when SMTP has not been set up.
 *
 * Null is a normal state during development — see the endpoint, which prints
 * submissions to the terminal instead. It is NOT an acceptable state in
 * production, and the endpoint refuses the request rather than accepting an
 * enquiry it has nowhere to send.
 */
export function getMailerConfig(): MailerConfig | null {
  const host = env('SMTP_HOST');
  const user = env('SMTP_USER');
  const password = env('SMTP_PASSWORD');
  const to = env('CONTACT_TO');

  if (!host || !user || !password || !to) return null;

  return {
    host,
    port: Number(env('SMTP_PORT') ?? 587),
    user,
    password,
    to,
    // Falls back to the SMTP username, which is nearly always a valid sender.
    from: env('CONTACT_FROM') ?? user,
  };
}

let cached: Transporter | null = null;

/**
 * One transporter for the process, so the connection pool is reused instead of
 * a fresh TCP + TLS handshake per enquiry.
 */
export function getTransport(config: MailerConfig): Transporter {
  if (cached) return cached;

  cached = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    // 465 is implicit TLS; 587 and 25 start plaintext and upgrade via STARTTLS.
    secure: config.port === 465,
    auth: { user: config.user, pass: config.password },
    pool: true,
    maxConnections: 2,
  });

  return cached;
}

export interface OutgoingMail {
  subject: string;
  text: string;
  /** The enquirer's address, so hitting Reply in the mail client works. */
  replyTo: string;
}

export async function sendContactMail(config: MailerConfig, mail: OutgoingMail): Promise<void> {
  await getTransport(config).sendMail({
    from: config.from,
    to: config.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
  });
}
