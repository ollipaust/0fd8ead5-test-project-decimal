import { Link } from '@remix-run/react';
import { LayoutDashboard } from 'lucide-react';
import type { SiteConfig } from '~/app-config';
import { GreenTechUI } from './shared/GreenTechUI';

/**
 * Green Tech Template
 * Professional, earthy design for sustainability apps
 */

interface GreenTechThemeProps {
    config: SiteConfig;
}

export function GreenTechTheme({ config }: GreenTechThemeProps) {
    const primary = config.primaryColor;
    const sections = config.pages?.home?.sections ?? [];

    return (
        <>
            <GreenTechUI
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
        <div className='mx-auto max-w-2xl rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm mt-16'>
            <LayoutDashboard className='mx-auto mb-4 h-12 w-12 text-stone-400' />
            <p className='text-xl font-semibold text-stone-900 mb-2'>No Content Published</p>
            <p className='text-sm text-stone-600 mb-6'>
                Start building your app by adding content sections.
            </p>
            <Link
                to='/hub/projects/config'
                className='inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg'
                style={{ backgroundColor: primary }}
            >
                <LayoutDashboard className='h-4 w-4' />
                Open Dashboard
            </Link>
        </div>
    );
}
