import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Minimal Light Template UI
 * Modern SaaS dashboard, bright white interface, sharp typography,
 * strong spacing, neutral gray tones with one accent color
 *
 * Keywords: clean · startup · premium · crisp
 * Use: business tools, dashboards, landing pages
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

interface MinimalLightUIProps {
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

export function MinimalLightUI({ data, isPreview = false }: MinimalLightUIProps) {
    const primary = data.primaryColor;
    const { r, g, b } = hexToRgb(primary);
    const sections = data.sections ?? [];
    const LinkComponent = isPreview ? 'a' : Link;

    return (
        <div className='min-h-screen bg-white'>
            {/* Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='border-b border-neutral-200'
            >
                <div className='mx-auto max-w-7xl px-8 py-5'>
                    <div className='flex items-center justify-between'>
                        <span className='text-2xl font-bold tracking-tight text-neutral-900'>
                            {data.appName}
                        </span>
                        <ul className='hidden md:flex items-center gap-10'>
                            {data.menuItems.map(({ href, label }) => (
                                <li key={href}>
                                    <a className='text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors'>
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='px-5 py-2.5 rounded-lg text-sm font-semibold text-white'
                            style={{ backgroundColor: primary }}
                        >
                            Get Started
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className='px-8 py-24'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {data.heroBadge && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className='inline-block px-3 py-1 text-xs font-semibold rounded-full mb-8'
                                    style={{
                                        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
                                        color: primary,
                                    }}
                                >
                                    {data.heroBadge}
                                </motion.span>
                            )}

                            <h1 className='text-6xl font-bold tracking-tight text-neutral-900 mb-6'>
                                {data.heroTitle}
                            </h1>

                            {data.heroSubtitle && (
                                <p className='text-xl font-medium mb-4' style={{ color: primary }}>
                                    {data.heroSubtitle}
                                </p>
                            )}

                            <p className='text-xl text-neutral-600 leading-relaxed mb-10'>
                                {data.heroDescription}
                            </p>

                            <div className='flex items-center gap-4'>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='inline-flex items-center gap-2 px-7 py-4 rounded-lg text-base font-semibold text-white shadow-sm'
                                    style={{ backgroundColor: primary }}
                                >
                                    {data.heroCTA || 'Get Started'}
                                    <ArrowRight className='h-5 w-5' />
                                </motion.button>
                                <button className='px-7 py-4 rounded-lg text-base font-semibold text-neutral-900 border border-neutral-300 hover:border-neutral-400 transition-colors'>
                                    Learn More
                                </button>
                            </div>

                            {Array.isArray(data.heroStats) && data.heroStats.length > 0 && (
                                <motion.dl
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className='grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-neutral-200'
                                >
                                    {data.heroStats.map((stat, idx) => (
                                        <div key={idx}>
                                            <dt className='text-4xl font-bold text-neutral-900 mb-2'>
                                                {stat.value}
                                            </dt>
                                            <dd className='text-sm font-medium text-neutral-600'>
                                                {stat.label}
                                            </dd>
                                        </div>
                                    ))}
                                </motion.dl>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='relative aspect-square'
                        >
                            <div className='absolute inset-0 rounded-2xl bg-neutral-100' />
                            <div
                                className='absolute inset-4 rounded-xl border-4 border-white'
                                style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className='px-8 py-24 bg-neutral-50'>
                <div className='mx-auto max-w-7xl'>
                    {sections.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className='prose prose-lg prose-neutral max-w-none'
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
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                                </motion.article>
                            ))}
                        </motion.div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                            {[1, 2, 3].map((idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -2 }}
                                    className='p-8 bg-white rounded-xl border border-neutral-200'
                                >
                                    <div
                                        className='w-12 h-12 rounded-lg mb-6 flex items-center justify-center text-white font-bold text-lg'
                                        style={{ backgroundColor: primary }}
                                    >
                                        {idx}
                                    </div>
                                    <h3 className='text-xl font-bold text-neutral-900 mb-3'>
                                        Feature {idx}
                                    </h3>
                                    <p className='text-neutral-600'>
                                        Your content will appear here
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className='border-t border-neutral-200 bg-white px-8 py-12'>
                <div className='mx-auto max-w-7xl'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-8'>
                        <div>
                            <div className='text-xl font-bold text-neutral-900 mb-2'>
                                {data.appName}
                            </div>
                            {data.appDescription && (
                                <p className='text-sm text-neutral-600'>
                                    {data.appDescription}
                                </p>
                            )}
                        </div>
                        <nav>
                            <ul className='flex items-center gap-8'>
                                {data.menuItems.map(({ href, label }) => (
                                    <li key={href}>
                                        <a className='text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors'>
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className='mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                        <p className='text-sm text-neutral-600'>
                            {data.footerText}
                        </p>
                        <p className='text-sm text-neutral-600'>
                            Powered by <span className='font-semibold' style={{ color: primary }}>Decimal.tools</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
