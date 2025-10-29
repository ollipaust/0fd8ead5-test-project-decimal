import type { LoaderFunctionArgs } from '@remix-run/node';
import appConfig from '~/app-config';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    // Only generate sitemap if enabled in config
    if (appConfig.sitemapEnabled === false) {
        throw new Response('Sitemap not enabled', { status: 404 });
    }

    const domain = appConfig.canonicalDomain || new URL(request.url).origin;

    // Build sitemap entries for all published pages
    const pages = Object.entries(appConfig.pages)
        .filter(([_, page]) => page.is_published)
        .filter(([_, page]) => !page.noindex) // Exclude noindex pages
        .filter(([_, page]) => !page.is_hidden) // Exclude hidden pages
        .map(([pageName, page]) => {
            const slug = page.page_slug || pageName;
            const url = pageName === 'home' ? domain : `${domain}/${slug}`;
            const priority = page.sitemap_priority ?? 0.5;
            const changefreq = page.sitemap_changefreq || 'monthly';
            const lastmod = new Date().toISOString().split('T')[0];

            return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
        })
        .join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages}
</urlset>`;

    return new Response(sitemap, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600',
        },
    });
};
