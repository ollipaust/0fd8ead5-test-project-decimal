import { useState } from 'react';
import * as React from 'react';
import type { MetaFunction } from '@remix-run/node';
import appConfig from '~/app-config';
import { GlassmorphismTheme } from '~/themes/Glassmorphism';
import { ClassicTheme } from '~/themes/Classic';
import { EnterpriseTheme } from '~/themes/Enterprise';
import { SoftModernTheme } from '~/themes/SoftModern';
import { MinimalLightTheme } from '~/themes/MinimalLight';
import { MinimalDarkTheme } from '~/themes/MinimalDark';
import { GreenTechTheme } from '~/themes/GreenTech';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';

export const meta: MetaFunction = () => {
    const homePageData = appConfig.pages?.home;
    const title = homePageData?.meta_title || `${appConfig.appName}${appConfig.tagline ? ` – ${appConfig.tagline}` : ''}`;
    const description = homePageData?.meta_description || appConfig.heroDescription || appConfig.tagline || `${appConfig.appName} homepage`;
    const ogTitle = homePageData?.og_title || appConfig.heroTitle || title;
    const ogDescription = homePageData?.og_description || description;
    const ogImage = homePageData?.og_image || appConfig.ogImage;

    // Enhanced keywords for both user project and decimal.tools SEO
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

/**
 * Theme Middleware
 * Renders the appropriate theme based on appConfig.themeName
 */
export default function Index(): JSX.Element {
    // Use state for dev mode theme switching
    const [currentTheme, setCurrentTheme] = useState(appConfig.themeName || 'Glassmorphism');

    // Check if we're in development mode
    const isDev = process.env.NODE_ENV === 'development';

    // Theme routing logic
    const renderTheme = () => {
        switch (currentTheme) {
            case 'Classic':
                return <ClassicTheme config={appConfig} />;
            case 'Enterprise':
                return <EnterpriseTheme config={appConfig} />;
            case 'SoftModern':
                return <SoftModernTheme config={appConfig} />;
            case 'MinimalLight':
                return <MinimalLightTheme config={appConfig} />;
            case 'MinimalDark':
                return <MinimalDarkTheme config={appConfig} />;
            case 'GreenTech':
                return <GreenTechTheme config={appConfig} />;
            case 'Glassmorphism':
            case 'Modern': // Backward compatibility
            default:
                return <GlassmorphismTheme config={appConfig} />;
        }
    };

    // Apply background styles directly to body based on current theme
    React.useEffect(() => {
        const isGlassmorphism = currentTheme === 'Glassmorphism' || currentTheme === 'Modern';

        if (isGlassmorphism) {
            document.body.style.background = `linear-gradient(135deg, ${appConfig.primaryColor}22 0%, ${(appConfig.secondaryColor || '#ffffff')}33 100%)`;
            document.body.style.backgroundColor = '#0f0f23';
        } else {
            document.body.style.background = '';
            document.body.style.backgroundColor = '';
        }

        return () => {
            document.body.style.background = '';
            document.body.style.backgroundColor = '';
        };
    }, [currentTheme]);

    return (
        <>
            {renderTheme()}
            {isDev && (
                <ThemeSwitcher
                    currentTheme={currentTheme}
                    onThemeChange={setCurrentTheme}
                />
            )}
        </>
    );
}
