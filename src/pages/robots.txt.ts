import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site, url }) => {
  const basePath = import.meta.env.BASE_URL.replace(/^\//u, '');
  const sitemapUrl = new URL(`${basePath}sitemap-index.xml`, site ?? url.origin);
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemapUrl.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
