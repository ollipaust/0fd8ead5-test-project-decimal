import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Soft Modern Template UI
 * Minimal web app UI, light pastel tones, rounded cards, soft shadows,
 * clean sans-serif typography, calm and friendly design, balanced white space
 *
 * Keywords: friendly · calm · pastel · approachable
 * Use: personal apps, productivity, wellness, solopreneurs
 */

interface TemplateData {
    appName: string;
    primaryColor: string;
    menuItems: Array<{ href: string; label: string }>;
    tagline?: string;
    heroBadge?: string;
    heroTitle: string;
    heroSubtitle?: string;
    heroDescription: string;
    heroCTA?: string;
    heroCTALink?: string;
    heroStats?: Array<{ label: string; value: string }>;
    heroImageUrl?: string;
    footerText: string;
    appDescription?: string;
    sections?: Array<{ id: string; content: string }>;
}

interface SoftModernUIProps {
    data: TemplateData;
    isPreview?: boolean;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { r: 16, g: 185, b: 129 };
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };
}

// Convert color to pastel by increasing lightness
function toPastel(r: number, g: number, b: number): string {
    // Blend with white (255, 255, 255) to create pastel effect
    const pastelR = Math.round(r + (255 - r) * 0.7);
    const pastelG = Math.round(g + (255 - g) * 0.7);
    const pastelB = Math.round(b + (255 - b) * 0.7);
    return `rgb(${pastelR}, ${pastelG}, ${pastelB})`;
}

export function SoftModernUI({ data, isPreview = false }: SoftModernUIProps) {
    const primary = data.primaryColor;
    const { r, g, b } = hexToRgb(primary);
    const pastelBg = toPastel(r, g, b);
    const sections = data.sections ?? [];
    const LinkComponent = isPreview ? 'a' : Link;

    return (
        <div className='min-h-screen' style={{ backgroundColor: pastelBg }}>
            {/* Navigation - Soft and minimal */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100'
            >
                <div className='mx-auto max-w-6xl px-6 py-4'>
                    <div className='flex items-center justify-between'>
                        <span className='text-xl font-medium tracking-tight' style={{ color: primary }}>
                            {data.appName}
                        </span>
                        <ul className='hidden md:flex items-center gap-8'>
                            {data.menuItems.map(({ href, label }) => (
                                <li key={href}>
                                    <a className='text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors'>
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section - Soft and friendly */}
            <section className='py-20 px-6'>
                <div className='mx-auto max-w-6xl'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {data.heroBadge && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                    className='inline-block px-4 py-2 rounded-full text-sm font-medium mb-6'
                                    style={{
                                        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
                                        color: primary,
                                    }}
                                >
                                    {data.heroBadge}
                                </motion.span>
                            )}

                            <h1 className='text-5xl md:text-6xl font-bold leading-tight mb-6' style={{ color: primary }}>
                                {data.heroTitle}
                            </h1>

                            {data.heroSubtitle && (
                                <p className='text-2xl font-medium text-slate-700 mb-4'>
                                    {data.heroSubtitle}
                                </p>
                            )}

                            <p className='text-lg text-slate-600 leading-relaxed mb-8'>
                                {data.heroDescription}
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium shadow-lg transition-shadow hover:shadow-xl'
                                style={{
                                    backgroundColor: primary,
                                    boxShadow: `0 8px 24px rgba(${r}, ${g}, ${b}, 0.3)`,
                                }}
                            >
                                {data.heroCTA || 'Get Started'}
                                <ArrowRight className='h-5 w-5' />
                            </motion.button>

                            {Array.isArray(data.heroStats) && data.heroStats.length > 0 && (
                                <motion.dl
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className='grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-200'
                                >
                                    {data.heroStats.map((stat, idx) => (
                                        <div key={idx}>
                                            <dt className='text-3xl font-bold mb-1' style={{ color: primary }}>
                                                {stat.value}
                                            </dt>
                                            <dd className='text-sm text-slate-600'>
                                                {stat.label}
                                            </dd>
                                        </div>
                                    ))}
                                </motion.dl>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className='relative'
                        >
                            <div
                                className='aspect-square rounded-3xl shadow-2xl'
                                style={{
                                    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.15)`,
                                    boxShadow: `0 25px 50px -12px rgba(${r}, ${g}, ${b}, 0.25)`,
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className='py-20 px-6'>
                <div className='mx-auto max-w-6xl'>
                    {sections.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className='prose prose-lg max-w-none'
                            style={{
                                '--tw-prose-headings': primary,
                                '--tw-prose-links': primary,
                            } as React.CSSProperties}
                        >
                            {sections.map((section, idx) => (
                                <motion.article
                                    key={section.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className='mb-12'
                                >
                                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                                </motion.article>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className='grid grid-cols-1 md:grid-cols-2 gap-8'
                        >
                            {[1, 2, 3, 4].map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -4 }}
                                    className='p-8 rounded-2xl border border-slate-200 bg-white shadow-sm'
                                    style={{
                                        boxShadow: `0 4px 16px rgba(${r}, ${g}, ${b}, 0.08)`,
                                    }}
                                >
                                    <div
                                        className='w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white font-bold'
                                        style={{ backgroundColor: primary }}
                                    >
                                        {idx + 1}
                                    </div>
                                    <h3 className='text-xl font-semibold mb-2 text-slate-900'>
                                        Feature {idx + 1}
                                    </h3>
                                    <p className='text-slate-600'>
                                        Your content will appear here
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className='border-t border-slate-100 bg-white/90 backdrop-blur-sm py-12 px-6'>
                <div className='mx-auto max-w-6xl'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                        <div>
                            <div className='text-lg font-medium mb-2' style={{ color: primary }}>
                                {data.appName}
                            </div>
                            {data.appDescription && (
                                <p className='text-sm text-slate-600'>
                                    {data.appDescription}
                                </p>
                            )}
                        </div>
                        <nav>
                            <ul className='flex items-center gap-6'>
                                {data.menuItems.map(({ href, label }) => (
                                    <li key={href}>
                                        <a className='text-sm text-slate-600 hover:text-slate-900 transition-colors'>
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className='mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                        <p className='text-xs text-slate-500'>
                            {data.footerText}
                        </p>
                        <p className='text-xs text-slate-500'>
                            Powered by <span className='font-semibold' style={{ color: primary }}>Decimal.tools</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
