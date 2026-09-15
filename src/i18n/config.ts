/**
 * Locales and the route table.
 *
 * Every internal link in this project goes through `path()` in ./utils.ts,
 * which reads this table. That is the whole point: a URL slug is written down
 * once, here, and renaming one cannot leave a dead link behind. Never hard-code
 * an internal href in a template.
 */

export const LOCALES = ['sv', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'sv';

/** Native language names, for the language switcher. */
export const LOCALE_NAMES: Record<Locale, string> = {
  sv: 'Svenska',
  en: 'English',
};

/** BCP‑47 tags for <html lang>, hreflang and sitemap. */
export const LOCALE_TAGS: Record<Locale, string> = {
  sv: 'sv-SE',
  en: 'en-GB',
};

/**
 * The site's pages, keyed by a stable id, with the URL slug per language.
 * An empty slug means the language's index page (/sv/ and /en/).
 *
 * Adding a page = add a row here, then create the matching files at
 * src/pages/sv/<sv-slug>.astro and src/pages/en/<en-slug>.astro.
 */
export const ROUTES = {
  home: { sv: '', en: '' },
  services: { sv: 'tjanster', en: 'services' },
  process: { sv: 'sa-gar-det-till', en: 'how-it-works' },
  contact: { sv: 'kontakt', en: 'contact' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

/**
 * Main navigation, in order. Three pages, because that is the site structure
 * in Bussiness-info.md — resist adding a fourth without the client asking.
 */
export const NAV_ORDER = [
  'home',
  'services',
  'process',
  'contact',
] as const satisfies readonly RouteKey[];

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}
