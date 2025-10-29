import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';

/**
 * Green Tech Template UI
 * Modern web app interface inspired by sustainable technology,
 * natural greens and earth tones, organic shapes, professional and honest aesthetic
 *
 * Keywords: clean energy · professional · earthy · honest
 * Use: sustainability apps, EV, climate tech, mobility services
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

interface GreenTechUIProps {
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

export function GreenTechUI({ data, isPreview = false }: GreenTechUIProps) {
    const primary = data.primaryColor;
    const { r, g, b } = hexToRgb(primary);
    const sections = data.sections ?? [];
    const LinkComponent = isPreview ? 'a' : Link;
    const heroImage = data.heroImageUrl;

    return (
        <div
            className='min-h-screen bg-emerald-50'
            style={heroImage ? {
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            } : undefined}
        >
            {/* Overlay for readability when hero image is used */}
            {heroImage && (
                <div className='fixed inset-0 bg-emerald-50/80 backdrop-blur-sm pointer-events-none' />
            )}

            {/* Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='relative bg-white/90 backdrop-blur-md border-b border-stone-200'
            >
                <div className='mx-auto max-w-7xl px-6 py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <motion.div
                                initial={{ rotate: -180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                className='w-8 h-8 rounded-full flex items-center justify-center'
                                style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.15)` }}
                            >
                                <Leaf className='w-4 h-4' style={{ color: primary }} />
                            </motion.div>
                            <span className='text-xl font-semibold tracking-tight text-stone-900'>
                                {data.appName}
                            </span>
                        </div>
                        <ul className='hidden md:flex items-center gap-8'>
                            {data.menuItems.map(({ href, label }) => (
                                <li key={href}>
                                    <a className='text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors'>
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className='relative px-6 py-20 overflow-hidden'>
                <div className='relative mx-auto max-w-7xl'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {data.heroBadge && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className='inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium'
                                    style={{
                                        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.12)`,
                                        color: primary,
                                    }}
                                >
                                    <Leaf className='w-3.5 h-3.5' />
                                    {data.heroBadge}
                                </motion.div>
                            )}

                            <h1 className='text-5xl md:text-6xl font-bold leading-tight text-stone-900 mb-6'>
                                {data.heroTitle}
                            </h1>

                            {data.heroSubtitle && (
                                <p className='text-xl font-semibold mb-4' style={{ color: primary }}>
                                    {data.heroSubtitle}
                                </p>
                            )}

                            <p className='text-lg text-stone-600 leading-relaxed mb-8'>
                                {data.heroDescription}
                            </p>

                            <div className='flex items-center gap-4'>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='inline-flex items-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-white shadow-md'
                                    style={{
                                        backgroundColor: primary,
                                        boxShadow: `0 4px 20px rgba(${r}, ${g}, ${b}, 0.25)`,
                                    }}
                                >
                                    {data.heroCTA || 'Get Started'}
                                    <ArrowRight className='h-5 w-5' />
                                </motion.button>
                            </div>

                            {Array.isArray(data.heroStats) && data.heroStats.length > 0 && (
                                <motion.dl
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className='grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-stone-200'
                                >
                                    {data.heroStats.map((stat, idx) => (
                                        <div key={idx}>
                                            <dt className='text-3xl font-bold mb-1' style={{ color: primary }}>
                                                {stat.value}
                                            </dt>
                                            <dd className='text-sm text-stone-600'>
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
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='relative'
                        >
                            <div className='relative aspect-square'>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 2, 0],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    className='absolute inset-0 rounded-[3rem] shadow-xl'
                                    style={{
                                        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
                                        boxShadow: `0 20px 60px rgba(${r}, ${g}, ${b}, 0.2)`,
                                    }}
                                />
                                <div className='absolute inset-12 flex items-center justify-center'>
                                    <Leaf className='w-24 h-24' style={{ color: primary, opacity: 0.4 }} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className='px-6 py-20 bg-stone-50/90 backdrop-blur-sm relative'>
                <div className='mx-auto max-w-7xl'>
                    {sections.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className='prose prose-lg prose-stone max-w-none'
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
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            {[1, 2, 3, 4].map((idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -4 }}
                                    className='p-8 bg-white rounded-2xl border border-stone-200 shadow-sm'
                                >
                                    <div
                                        className='w-14 h-14 rounded-2xl mb-5 flex items-center justify-center'
                                        style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.15)` }}
                                    >
                                        <Leaf className='w-7 h-7' style={{ color: primary }} />
                                    </div>
                                    <h3 className='text-xl font-semibold text-stone-900 mb-3'>
                                        Feature {idx}
                                    </h3>
                                    <p className='text-stone-600'>
                                        Your content will appear here
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className='relative border-t border-stone-200 bg-white/90 backdrop-blur-sm px-6 py-12'>
                <div className='mx-auto max-w-7xl'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-8'>
                        <div>
                            <div className='flex items-center gap-2 mb-2'>
                                <div
                                    className='w-8 h-8 rounded-full flex items-center justify-center'
                                    style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.15)` }}
                                >
                                    <Leaf className='w-4 h-4' style={{ color: primary }} />
                                </div>
                                <span className='text-lg font-semibold text-stone-900'>
                                    {data.appName}
                                </span>
                            </div>
                            {data.appDescription && (
                                <p className='text-sm text-stone-600'>
                                    {data.appDescription}
                                </p>
                            )}
                        </div>
                        <nav>
                            <ul className='flex items-center gap-6'>
                                {data.menuItems.map(({ href, label }) => (
                                    <li key={href}>
                                        <a className='text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors'>
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className='mt-8 pt-8 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                        <p className='text-sm text-stone-600'>
                            {data.footerText}
                        </p>
                        <p className='text-sm text-stone-600'>
                            Powered by <span className='font-semibold' style={{ color: primary }}>Decimal.tools</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
