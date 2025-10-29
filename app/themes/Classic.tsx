import { Link } from '@remix-run/react';
import { LayoutDashboard } from 'lucide-react';
import type { SiteConfig } from '~/app-config';
import { ClassicUI } from './shared/ClassicUI';

/**
 * Classic/Newspaper Template
 *
 * ✅ SINGLE SOURCE OF TRUTH: Uses shared ClassicUI component
 * This template and the preview dialog both use the same underlying component.
 */

interface ClassicThemeProps {
    config: SiteConfig;
}

export function ClassicTheme({ config }: ClassicThemeProps) {
    const primary = config.primaryColor;
    const sections = config.pages?.home?.sections ?? [];

    return (
        <>
            <ClassicUI
                data={{
                    appName: config.appName,
                    primaryColor: config.primaryColor,
                    menuItems: config.menuItems,
                    tagline: config.tagline,
                    heroBadge: config.heroBadge,
                    heroTitle: config.heroTitle,
                    heroSubtitle: config.heroSubtitle,
                    heroDescription: config.heroDescription,
                    heroCTA: config.heroCTA,
                    heroCTALink: config.heroCTALink,
                    heroStats: config.heroStats,
                    heroImageUrl: config.heroImageUrl,
                    footerText: config.footerText.replace('2024', new Date().getFullYear().toString()),
                    appDescription: config.appDescription,
                    sections: sections,
                }}
                isPreview={false}
            />
            {sections.length === 0 && <EmptyState primary={primary} />}
        </>
    );
}

function EmptyState({ primary }: { primary: string }) {
    return (
        <div className='bg-white border-2 border-stone-900 p-8 text-center shadow-lg'>
            <LayoutDashboard className='mx-auto mb-4 h-12 w-12 text-stone-400' />
            <p className='font-serif text-xl font-bold text-stone-900 mb-2'>No Articles Published</p>
            <p className='font-serif text-sm text-stone-600 mb-6'>
                Begin editing your publication to populate this section with content.
            </p>
            <Link
                to='/hub/projects/config'
                className='inline-flex items-center justify-center gap-2 px-6 py-3 font-serif font-bold uppercase tracking-wide text-white border-2 border-stone-900 shadow-md'
                style={{ backgroundColor: primary }}
            >
                <LayoutDashboard className='h-4 w-4' />
                Editorial Dashboard
            </Link>
        </div>
    );
}
