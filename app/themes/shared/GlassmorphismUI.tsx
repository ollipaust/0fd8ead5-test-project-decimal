import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutDashboard } from 'lucide-react';

/**
 * Shared Glassmorphism Template UI
 * Single source of truth for both actual template and preview dialog
 */

interface TemplateData {
    appName: string;
    primaryColor: string;
    menuItems: Array<{ href: string; label: string }>;
    heroBadge?: string;
    heroTitle: string;
    heroSubtitle?: string;
    heroDescription: string;
    heroCTA?: string;
    heroCTALink?: string;
    heroStats?: Array<{ label: string; value: string }>;
    heroImageUrl?: string;
    heroVideoUrl?: string;
    footerText: string;
    appDescription?: string;
    enableHeroAnimation?: boolean;
    sections?: Array<{ id: string; content: string }>;
}

interface GlassmorphismUIProps {
    data: TemplateData;
    isPreview?: boolean;
}

export function GlassmorphismUI({ data, isPreview = false }: GlassmorphismUIProps) {
    const primary = data.primaryColor;
    const sections = data.sections ?? [];
    const LinkComponent = isPreview ? 'a' : Link;

    return (
        <div className='relative overflow-hidden min-h-full'>
            {/* BACKDROP GLOW */}
            <div aria-hidden className='pointer-events-none absolute inset-0 -z-10'>
                <div
                    className='h-full w-full rounded-2xl'
                    style={{
                        backgroundImage:
                            `radial-gradient(60rem 40rem at 0% 0%, ${primary}22 0%, transparent 60%),` +
                            `radial-gradient(70rem 50rem at 100% 10%, ${primary}18 0%, transparent 65%),` +
                            `linear-gradient(180deg, #ffffff00 0%, #ffffff55 100%)`,
                    }}
                />
            </div>

            {/* MAIN CONTAINER */}
            <div className='mx-auto rounded-2xl border border-white/30 bg-white/10 shadow-xl ring-1 ring-black/5 backdrop-blur-xl'>
                {/* HEADER */}
                <header className='flex items-center justify-between gap-4 px-6 py-5 sm:px-10'>
                    <span
                        className='text-2xl font-display font-extrabold tracking-tight text-slate-100 text-shadow-md'
                        style={{ textShadow: `0 2px 8px ${primary}40` }}
                    >
                        {data.appName}
                    </span>
                    <nav className='hidden md:block'>
                        <ul className='flex items-center gap-8'>
                            {data.menuItems.map(({ href, label }) => (
                                <li key={href} className='text-lg text-slate-200'>
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </header>

                {/* MAIN BODY */}
                <main className='px-6 pb-12 sm:px-10 sm:pb-16'>
                    {/* HERO SECTION */}
                    <section className='relative overflow-hidden rounded-2xl border border-white/30 bg-white/20 px-8 py-14 shadow-lg backdrop-blur-2xl sm:px-12 lg:px-16'>
                        <div className='relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12'>
                            <div className='lg:col-span-7 xl:col-span-8'>
                                {data.heroBadge && (
                                    <span
                                        className='mb-4 inline-block rounded-full px-3 py-1 text-sm font-semibold'
                                        style={{
                                            backgroundColor: `${primary}20`,
                                            color: primary,
                                            border: `1px solid ${primary}40`,
                                        }}
                                    >
                                        {data.heroBadge}
                                    </span>
                                )}

                                <h1 className='text-pretty text-5xl font-display font-extrabold tracking-tight sm:text-6xl lg:text-7xl'>
                                    <span
                                        className='bg-clip-text text-transparent drop-shadow-md'
                                        style={{
                                            backgroundImage: `linear-gradient(to right, ${primary}, #1e293b)`,
                                        }}
                                    >
                                        {data.heroTitle}
                                    </span>
                                </h1>

                                {data.heroSubtitle && (
                                    <p className='mt-4 text-2xl font-semibold' style={{ color: primary }}>
                                        {data.heroSubtitle}
                                    </p>
                                )}

                                <p className='mt-6 max-w-2xl text-xl text-gray-800 leading-relaxed'>
                                    {data.heroDescription}
                                </p>

                                {/* CTA Buttons */}
                                <div className='mt-10 flex flex-wrap items-center gap-4'>
                                    <button
                                        className='inline-flex items-center gap-2 rounded-xl px-6 py-3 text-lg font-semibold text-white shadow-lg'
                                        style={{
                                            backgroundColor: primary,
                                            boxShadow: `0 4px 14px 0 ${primary}40`,
                                        }}
                                    >
                                        <ArrowRight className='h-5 w-5' />
                                        {data.heroCTA || 'Get Started'}
                                    </button>
                                </div>

                                {/* Stats */}
                                {Array.isArray(data.heroStats) && data.heroStats.length > 0 && (
                                    <dl className='mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 text-base text-gray-800'>
                                        {data.heroStats.map((stat, idx) => (
                                            <div key={idx}>
                                                <dt className='font-semibold' style={{ color: primary }}>
                                                    {stat.label}
                                                </dt>
                                                <dd className='text-gray-900 font-bold'>{stat.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                )}
                            </div>
                        </div>

                        {/* Bottom gradient fade */}
                        <div
                            aria-hidden
                            className='pointer-events-none absolute -inset-x-8 -bottom-8 h-24 bg-gradient-to-t from-white/30 to-transparent'
                        />
                    </section>

                    {/* CONTENT SECTION */}
                    <section className='mt-10 space-y-8'>
                        <div className='p-8'>
                            {sections.length > 0 ? (
                                <div
                                    className='prose prose-lg max-w-none'
                                    style={{
                                        '--tw-prose-links': primary,
                                        '--tw-prose-headings': primary,
                                    } as React.CSSProperties}
                                >
                                    {sections.map(section => (
                                        <article key={section.id}>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: section.content,
                                                }}
                                            />
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <h2 className='text-3xl font-bold mb-4' style={{ color: primary }}>
                                        About Our Service
                                    </h2>
                                    <p className='text-gray-800 text-lg leading-relaxed mb-4'>
                                        This is your content section. Add your pitch, product details, or
                                        any other information you want to share with your visitors.
                                    </p>
                                    <p className='text-gray-800 text-lg leading-relaxed'>
                                        The glassmorphic design provides a modern, sleek look with smooth
                                        animations and gradient backgrounds that make your content stand
                                        out.
                                    </p>
                                </>
                            )}
                        </div>
                    </section>
                </main>
            </div>

            {/* FOOTER */}
            <footer className='mt-16 px-4 sm:px-6'>
                <div className='mx-auto'>
                    <div className='mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                        <div>
                            <h3
                                className='text-2xl font-display font-extrabold'
                                style={{ color: primary }}
                            >
                                {data.appName}
                            </h3>
                            {data.appDescription && (
                                <p className='text-lg font-sans text-white'>
                                    {data.appDescription}
                                </p>
                            )}
                        </div>
                        <nav className='text-right'>
                            <p className='font-display font-bold mb-2' style={{ color: primary }}>
                                Links
                            </p>
                            <ul className='flex items-center justify-end gap-4'>
                                {data.menuItems.map(({ href, label }) => (
                                    <li key={href} className='text-lg text-white'>
                                        {label}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-white/20 pt-6'>
                        <p className='text-sm font-sans text-white'>
                            {data.footerText}
                        </p>
                        <p className='flex items-center justify-end text-sm font-sans text-white'>
                            <span>Remix App built with&nbsp;</span>
                            <span className='font-medium' style={{ color: primary }}>
                                Decimal.tools
                            </span>
                            <span className='text-teal-400 text-xs'>💚</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
