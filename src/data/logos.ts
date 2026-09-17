import type { Locale } from '../i18n/config';

/**
 * The logo cloud on the start page, under the heading "Våra samarbetspartners".
 *
 * ⚠ ONLY put a logo here that the company has an actual relationship with —
 * a certification it holds, a trade body it belongs to, a supplier it uses, a
 * client that has agreed to be named. A row of logos is read as a claim of
 * association, so an unearned one is a false statement about the business, not
 * decoration.
 *
 * This is why the list shipped empty. The block this was modelled on arrived
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
  {
    // Supplied by the client as "work-with1", which is the only thing that
    // puts it here — the file name is the claim of association, nothing else.
    // Confirm with Bella what the relationship is before launch, and add the
    // href once it is known.
    id: 'mbc-group',
    src: '/media/logos/mbc-group.png',
    alt: { sv: 'MBC Group', en: 'MBC Group' },
  },
  {
    // Named by the client as a samarbetspartner. No URL supplied yet — add the
    // href once Bella confirms it.
    id: 'sydsverige-entreprenad',
    src: '/media/logos/sydsverige-entreprenad.png',
    alt: { sv: 'Sydsverige Entreprenad', en: 'Sydsverige Entreprenad' },
  },
  {
    // Named by the client as a samarbetspartner. Same — href pending.
    id: 'we-construction',
    src: '/media/logos/we-construction.png',
    alt: { sv: 'WE Construction', en: 'WE Construction' },
  },
  {
    // Supplied as a white knockout on transparent, which would have been
    // invisible on the cream band. The alpha channel carries the whole mark,
    // so the RGB was recoloured to the same ink as the other wordmarks — the
    // strip greyscales everything anyway, so this is what a dark original of
    // the same file would have produced.
    id: 'akea',
    src: '/media/logos/akea.png',
    alt: { sv: 'Akea, del av Eleda', en: 'Akea, part of Eleda' },
  },
  {
    id: 'maleribolaget',
    src: '/media/logos/maleribolaget.png',
    alt: { sv: 'Måleribolaget', en: 'Måleribolaget' },
  },
  {
    // ⚠ Not a samarbetspartner — this is Syna's credit rating seal, and it
    // carries the year 2026 in the artwork. It is a claim about Bella's own
    // creditworthiness, so it expires: replace or remove it when the rating
    // year turns over, or it becomes a stale claim on a live site.
    id: 'syna',
    src: '/media/logos/syna.png',
    alt: {
      sv: 'Syna: högsta kreditklass 2026',
      en: 'Syna: highest credit rating 2026',
    },
  },

  // Other plausible candidates, each needing confirmation that it is genuinely
  // held before it goes on a live site:
  //   - Godkänd för F-skatt (Skatteverket)
  //   - A trade body membership, if they hold one
  //   - Paint or treatment manufacturers whose products they actually apply
  //   - Named clients or housing associations who have agreed to appear
];

/** Whether the strip has anything to show. */
export const hasLogos = logos.length > 0;

/**
 * A marquee needs enough logos to look like a row passing by. Below this, a
 * single wordmark would slide across an empty band and read as a bug, so the
 * strip sits still and centres instead.
 */
export const MARQUEE_MIN = 4;

/** Whether the strip scrolls or simply sits there. */
export const shouldScroll = logos.length >= MARQUEE_MIN;
