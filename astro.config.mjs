// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { BASE_PATH, DEFAULT_LOCALE, LOCALES, SITE_URL } from './src/config.mjs';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Canonical origin. Drives <link rel="canonical">, hreflang tags and sitemap.xml.
  // Change it in src/config.mjs — never hard-code a domain anywhere else.
  site: SITE_URL,

  // '/' locally; '/<repo>/' when the Pages workflow sets BASE_PATH.
  base: BASE_PATH,

  // Every page is prerendered to plain HTML at build time. Only routes that
  // explicitly `export const prerender = false` (currently just the contact
  // endpoint) are rendered on demand by the Node server.
  output: 'static',
  adapter: node({ mode: 'standalone' }),

  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: {
      // Swedish carries no prefix and English sits under /en/, so the start
      // page is "/" and not "/sv/". Customers in Skane search in Swedish; the
      // root domain should answer them in it.
      //
      // src/i18n/utils.ts depends on this exact setting: path() builds
      // unprefixed Swedish URLs, and getLocale() reads a missing prefix as
      // Swedish. Flipping this to true breaks every Swedish link on the site.
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: { sv: 'sv-SE', en: 'en-GB' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
