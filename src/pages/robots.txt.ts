import type { APIRoute } from 'astro';

/**
 * /robots.txt, generated rather than kept as a static file in /public.
 *
 * The reason is the sitemap line: it must carry the real domain, and that lives
 * in one place (`site` in astro.config.mjs). Hard-coding it in a static file is
 * how a site ends up telling Google to crawl a sitemap at localhost.
 */
export const GET: APIRoute = ({ site }) => {
  // The base matters here too: on a sub-path deployment the sitemap lives at
  // /<repo>/sitemap-index.xml, and pointing a crawler at the domain root
  // would send it to a 404.
  const sitemap = new URL(
    `${import.meta.env.BASE_URL}sitemap-index.xml`,
    site ?? 'http://localhost:4321',
  ).href;

  const body = `User-agent: *
Allow: /

# The contact endpoint has nothing to index and should not be crawled.
Disallow: /api/

Sitemap: ${sitemap}
`;

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
