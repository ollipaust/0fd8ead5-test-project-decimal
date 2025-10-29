import type { MetaFunction } from '@remix-run/node';
import appConfig from '~/app-config';
import { GlassmorphismTheme } from '~/themes/Glassmorphism';

export const meta: MetaFunction = () => {
    const homePageData = appConfig.pages?.home;
    const title = homePageData?.meta_title || `${appConfig.appName}${appConfig.tagline ? ` – ${appConfig.tagline}` : ''}`;
    const description = homePageData?.meta_description || appConfig.heroDescription || appConfig.tagline || `${appConfig.appName} homepage`;
    const ogTitle = homePageData?.og_title || appConfig.heroTitle || title;
    const ogDescription = homePageData?.og_description || description;
    const ogImage = homePageData?.og_image || appConfig.ogImage;

    const userKeywords = homePageData?.meta_keywords || appConfig.seoKeywords || '';
    const decimalKeywords = 'decimal.tools, remix website builder, no-code website builder, remix app generator, website builder';
    const keywords = userKeywords ? `${userKeywords}, ${decimalKeywords}` : decimalKeywords;

    const canonical = homePageData?.canonical_url;
    const robotsContent = homePageData?.noindex || homePageData?.nofollow
        ? `${homePageData.noindex ? 'noindex' : 'index'},${homePageData.nofollow ? 'nofollow' : 'follow'}`
        : 'index,follow';

    const metaTags: Array<{ title?: string; name?: string; content?: string; property?: string; tagName?: string; rel?: string; href?: string }> = [
        { title },
        { name: 'description', content: description },
        { name: 'robots', content: robotsContent },
        { name: 'keywords', content: keywords },
        { name: 'generator', content: 'Decimal.tools - Remix Website Builder' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: appConfig.appName },
        { property: 'og:title', content: ogTitle },
        { property: 'og:description', content: ogDescription },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: ogTitle },
        { name: 'twitter:description', content: ogDescription },
        { name: 'theme-color', content: appConfig.primaryColor },
    ];

    if (ogImage) {
        metaTags.push({ property: 'og:image', content: ogImage });
        metaTags.push({ name: 'twitter:image', content: ogImage });
    }

    if (canonical) {
        metaTags.push({ tagName: 'link', rel: 'canonical', href: canonical });
    }

    return metaTags;
};

export default function Index() {
    return <GlassmorphismTheme config={appConfig} />;
}
