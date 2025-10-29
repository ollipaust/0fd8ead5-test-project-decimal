import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import type { SiteConfig } from '~/app-config';
import { GlassmorphismUI } from './shared/GlassmorphismUI';
import { invertColor } from '~/utils/colors';

/**
 * Glassmorphism Theme
 *
 * ✅ SINGLE SOURCE OF TRUTH: Uses shared GlassmorphismUI component
 * This theme and the preview dialog both use the same underlying component.
 */

interface GlassmorphismThemeProps {
    config: SiteConfig;
}

export function GlassmorphismTheme({ config }: GlassmorphismThemeProps) {
    const sections = config.pages?.home?.sections ?? [];

    return (
        <div
            className='min-h-screen flex flex-col'
            style={{
                backgroundImage: `linear-gradient(135deg, ${config.primaryColor}22 0%, ${invertColor(config.primaryColor)}33 100%)`,
                backgroundColor: '#0f0f23',
            }}
        >
            <main className='flex-grow p-6'>
                <motion.div
                    className='relative overflow-hidden'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <GlassmorphismUI
                    data={{
                        appName: config.appName,
                        primaryColor: config.primaryColor,
                        menuItems: config.menuItems,
                        heroBadge: config.heroBadge,
                        heroTitle: config.heroTitle,
                        heroSubtitle: config.heroSubtitle,
                        heroDescription: config.heroDescription,
                        heroCTA: config.heroCTA,
                        heroCTALink: config.heroCTALink,
                        heroStats: config.heroStats,
                        heroImageUrl: config.heroImageUrl,
                        heroVideoUrl: config.heroVideoUrl,
                        footerText: config.footerText.replace('2024', new Date().getFullYear().toString()),
                        appDescription: config.appDescription,
                        enableHeroAnimation: config.enableHeroAnimation,
                        sections: sections,
                    }}
                    isPreview={false}
                />
                </motion.div>
                {sections.length === 0 && <EmptyState primary={config.primaryColor} />}
            </main>
        </div>
    );
}

function EmptyState({ primary }: { primary: string }) {
    return (
        <div className='rounded-xl border border-white/30 bg-white/20 p-6 text-center shadow-sm backdrop-blur-xl mt-10'>
            <LayoutDashboard className='mx-auto mb-4 h-8 w-8 text-gray-700' />
            <p className='text-gray-800 text-lg font-sans font-medium'>No content yet</p>
            <p className='mt-1 text-sm font-sans text-gray-700'>
                Start editing your page to see it come to life.
            </p>
            <div className='mt-4'>
                <Link
                    to='/hub/projects/config'
                    className='inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow'
                    style={{ backgroundColor: primary }}
                >
                    <LayoutDashboard className='h-4 w-4' />
                    Open Dashboard
                </Link>
            </div>
        </div>
    );
}
