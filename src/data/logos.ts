import type { Locale } from '../i18n/config';

/**
 * The logo cloud on the start page.
 *
 * ⚠ ONLY put a logo here that the company has an actual relationship with —
 * a certification it holds, a trade body it belongs to, a supplier it uses, a
 * client that has agreed to be named. A row of logos is read as a claim of
 * association, so an unearned one is a false statement about the business, not
 * decoration.
 *
 * This is why the list ships empty. The block this was modelled on arrived
 * pre-filled with NVIDIA, OpenAI, Vercel, GitHub and Supabase wordmarks, which
 * on a Skåne roof-care company would assert partnerships that do not exist.
 *
 * To add one: drop an SVG (preferred) or PNG in /public/media/logos/, add a
 * row below, and it appears. The strip hides itself entirely while the list is
 * empty, so an unfinished logo cloud never ships as a gap.
 */
export interface LogoEntry {
  /** Short stable id, used as the key. */
  id: string;
  /** Path under /public. */
  src: string;
  /** What the logo is, per language. Never just "logo". */
  alt: Record<Locale, string>;
  /** Optional link — the certifier's page, the supplier's site. */
  href?: string;
}

export const logos: readonly LogoEntry[] = [
  // Nothing here yet — see the note above before adding.
  //
  // Plausible candidates for this company, each needing confirmation that it
  // is genuinely held before it goes on a live site:
  //   - Godkänd för F-skatt (Skatteverket)
  //   - A trade body membership, if they hold one
  //   - Paint or treatment manufacturers whose products they actually apply
  //   - Named clients or housing associations who have agreed to appear
];

/** Whether the strip has anything to show. */
export const hasLogos = logos.length > 0;
