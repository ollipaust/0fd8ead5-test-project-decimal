import { Link } from '@remix-run/react';
import { LayoutDashboard } from 'lucide-react';
import type { SiteConfig } from '~/app-config';
import { EnterpriseUI } from './shared/EnterpriseUI';

/**
 * Enterprise/Professional Template
 *
 * ✅ SINGLE SOURCE OF TRUTH: Uses shared EnterpriseUI component
 * This template and the preview dialog both use the same underlying component.
 */

interface EnterpriseThemeProps {
    config: SiteConfig;
}

export function EnterpriseTheme({ config }: EnterpriseThemeProps) {
    const primary = config.primaryColor;
    const sections = config.pages?.home?.sections ?? [];

    return (
        <>
            <EnterpriseUI
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
        <div className='mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg mt-16'>
            <LayoutDashboard className='mx-auto mb-4 h-12 w-12 text-slate-400' />
            <p className='text-xl font-semibold text-slate-900 mb-2'>No Content Published</p>
            <p className='text-sm text-slate-600 mb-6'>
                Start building your professional site by adding content sections.
            </p>
            <Link
                to='/hub/projects/config'
                className='inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl'
                style={{
                    backgroundColor: primary,
                    boxShadow: `0 10px 40px -10px ${primary}60`,
                }}
            >
                <LayoutDashboard className='h-4 w-4' />
                Open Dashboard
            </Link>
        </div>
    );
}
