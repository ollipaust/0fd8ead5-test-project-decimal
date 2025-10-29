import type { MetaDescriptor } from '@remix-run/node';
import appConfig from '~/app-config';

interface SEOMetaOptions {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    noindex?: boolean;
    nofollow?: boolean;
    type?: 'website' | 'article';
}

export function generateSEOMeta(options: SEOMetaOptions): MetaDescriptor[] {
    const {
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        ogImage,
        canonicalUrl,
        noindex = false,
        nofollow = false,
        type = 'website',
    } = options;

    const finalTitle = title || appConfig.seoTitle || appConfig.appName;
    const finalDescription = description || appConfig.seoDescription || appConfig.heroDescription;
    const finalOgTitle = ogTitle || finalTitle;
    const finalOgDescription = ogDescription || finalDescription;
    const finalOgImage = ogImage || appConfig.ogImage;
    const finalKeywords = keywords || appConfig.seoKeywords;

    const robotsContent = noindex || nofollow
        ? `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`
        : 'index,follow';

    const metaTags: MetaDescriptor[] = [
        { title: finalTitle },
        { name: 'description', content: finalDescription },
        { name: 'robots', content: robotsContent },
        { property: 'og:type', content: type },
        { property: 'og:site_name', content: appConfig.appName },
        { property: 'og:title', content: finalOgTitle },
        { property: 'og:description', content: finalOgDescription },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: finalOgTitle },
        { name: 'twitter:description', content: finalOgDescription },
        { name: 'theme-color', content: appConfig.primaryColor },
    ];

    if (finalKeywords) {
        metaTags.push({ name: 'keywords', content: finalKeywords });
    }

    if (finalOgImage) {
        metaTags.push({ property: 'og:image', content: finalOgImage });
        metaTags.push({ name: 'twitter:image', content: finalOgImage });
    }

    if (canonicalUrl) {
        metaTags.push({ tagName: 'link', rel: 'canonical', href: canonicalUrl });
    }

    if (appConfig.favicon) {
        metaTags.push({ tagName: 'link', rel: 'icon', href: appConfig.favicon });
    }

    // Add language meta tag if specified
    if (appConfig.contentLanguage) {
        metaTags.push({ httpEquiv: 'content-language', content: appConfig.contentLanguage });
    }

    return metaTags;
}
