import { DEFAULT_LOCALE, isLocale, ROUTES, type Locale, type RouteKey } from './config';
import { ui, type UIKey } from './ui';

/**
 * The sub-path the site is served from, normalised to '' or '/segment'.
 *
 * Astro sets `BASE_URL` from `base` in astro.config.mjs. It is '/' when the
 * site owns its domain and '/<repo>/' on GitHub Pages. Stripping the trailing
 * slash here means every builder below can concatenate without special-casing.
 *
 * Every internal URL on this site is built by `path()`, so handling the base
 * in this one place is what makes the site work at a sub-path at all — Astro
 * rewrites its own asset URLs, but it cannot rewrite hrefs we compute.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * Which language is this page?
 *
 * astro.config.mjs sets `prefixDefaultLocale: false`, so Swedish URLs carry no
 * language segment at all and only English is prefixed. A first segment of "en"
 * therefore means English; anything else — including nothing — means Swedish.
 */
export function getLocale(url: URL): Locale {
  const first = stripBase(url.pathname).split('/').filter(Boolean)[0];
  return isLocale(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
}

/** The other language. With two locales this is unambiguous. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'sv' ? 'en' : 'sv';
}

/** Remove the deployment sub-path from a pathname, leaving a root-relative one. */
function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) return pathname.slice(BASE.length) || '/';
  return pathname;
}

/**
 * Build an internal URL:
 *   path('services', 'sv') -> '/tjanster/'      (or '/repo/tjanster/' on Pages)
 *   path('services', 'en') -> '/en/services/'
 * Always ends in a slash so relative links and trailing-slash redirects behave.
 */
export function path(key: RouteKey, locale: Locale): string {
  const slug = ROUTES[key][locale];

  if (locale === DEFAULT_LOCALE) {
    return slug ? `${BASE}/${slug}/` : `${BASE}/`;
  }
  return slug ? `${BASE}/${locale}/${slug}/` : `${BASE}/${locale}/`;
}

/** Reverse lookup: which page is this pathname? `null` for 404s and assets. */
export function routeKeyFromPath(pathname: string): RouteKey | null {
  const segments = stripBase(pathname).split('/').filter(Boolean);

  // Strip a leading language segment if there is one. Swedish URLs have none.
  const hasPrefix = isLocale(segments[0]) && segments[0] !== DEFAULT_LOCALE;
  const locale: Locale = hasPrefix ? (segments[0] as Locale) : DEFAULT_LOCALE;
  const slug = (hasPrefix ? segments.slice(1) : segments).join('/');

  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    if (ROUTES[key][locale] === slug) return key;
  }
  return null;
}

/**
 * The same page in another language, for the switcher and for hreflang tags.
 * If the current URL has no counterpart (a 404, say), point at that language's
 * start page — sending someone to a second 404 helps nobody.
 */
export function alternatePath(pathname: string, target: Locale): string {
  const key = routeKeyFromPath(pathname);
  return key ? path(key, target) : path('home', target);
}

/**
 * Translator for a locale. Missing keys fall back to Swedish rather than
 * rendering an empty string, so a half-translated page is still usable.
 */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[DEFAULT_LOCALE][key];
  };
}

/** Pick the right side of a { sv, en } content field from a data file. */
export function pick<T>(field: Record<Locale, T>, locale: Locale): T {
  return field[locale] ?? field[DEFAULT_LOCALE];
}
