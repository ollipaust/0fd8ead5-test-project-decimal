import { Link } from '@remix-run/react';
import { LayoutDashboard } from 'lucide-react';
import type { SiteConfig } from '~/app-config';
import { MinimalDarkUI } from './shared/MinimalDarkUI';

/**
 * Minimal Dark Template
 * Elegant, sleek dark mode for creators and portfolios
 */

interface MinimalDarkThemeProps {
    config: SiteConfig;
}

export function MinimalDarkTheme({ config }: MinimalDarkThemeProps) {
    const primary = config.primaryColor;
    const sections = config.pages?.home?.sections ?? [];

    return (
        <>
            <MinimalDarkUI
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
        <div className='mx-auto max-w-2xl rounded-xl border border-neutral-800 bg-neutral-950 p-8 text-center shadow-lg mt-16'>
            <LayoutDashboard className='mx-auto mb-4 h-12 w-12 text-neutral-600' />
            <p className='text-xl font-semibold text-white mb-2'>No Content Published</p>
            <p className='text-sm text-neutral-400 mb-6'>
                Start building your app by adding content sections.
            </p>
            <Link
                to='/hub/projects/config'
                className='inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg transition-all hover:shadow-xl'
                style={{ backgroundColor: primary }}
            >
                <LayoutDashboard className='h-4 w-4' />
                Open Dashboard
            </Link>
        </div>
    );
}
