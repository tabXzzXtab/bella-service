/**
 * Build-time constants shared by astro.config.mjs and the site source.
 *
 * This file is plain JS on purpose: astro.config.mjs is loaded before the
 * TypeScript pipeline exists, so it cannot import a .ts module.
 * Everything that is *content* (company name, phone, addresses) lives in
 * src/data/site.ts instead.
 */

/** Canonical public origin, no trailing slash. */
export const SITE_URL = process.env.SITE_URL ?? 'https://bellaserviceab.se';

/**
 * Sub-path the site is served from, with leading and trailing slashes.
 *
 * '/' everywhere the site owns its domain. GitHub Pages serves a project repo
 * at https://<user>.github.io/<repo>/, so the deploy workflow sets this to
 * '/<repo>/' — otherwise every absolute link on the site would point at the
 * domain root and 404.
 *
 * Read it through `import.meta.env.BASE_URL`, never from here: Astro
 * normalises the value and that is what `path()` in src/i18n/utils.ts uses.
 */
export const BASE_PATH = process.env.BASE_PATH ?? '/';

/** @type {const} */
export const DEFAULT_LOCALE = 'sv';

/** @type {readonly ['sv', 'en']} */
export const LOCALES = ['sv', 'en'];
