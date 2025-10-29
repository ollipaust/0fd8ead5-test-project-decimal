import type { LoaderFunctionArgs } from '@remix-run/node';
import appConfig from '~/app-config';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const domain = appConfig.canonicalDomain || new URL(request.url).origin;

    // Use custom robots.txt if provided
    if (appConfig.robotsTxtCustom) {
        return new Response(appConfig.robotsTxtCustom, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Cache-Control': 'public, max-age=3600',
            },
        });
    }

    // Generate default robots.txt
    const sitemapUrl = appConfig.sitemapEnabled !== false ? `${domain}/sitemap.xml` : null;

    const robotsTxt = `User-agent: *
${appConfig.maintenanceMode ? 'Disallow: /' : 'Allow: /'}

${sitemapUrl ? `Sitemap: ${sitemapUrl}` : ''}`;

    return new Response(robotsTxt, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=3600',
        },
    });
};
