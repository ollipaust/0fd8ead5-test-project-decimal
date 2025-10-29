import { Link } from '@remix-run/react';
import { LayoutDashboard } from 'lucide-react';

/**
 * Shared Classic/Newspaper Template UI
 * Single source of truth for both actual template and preview dialog
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

interface ClassicUIProps {
    data: TemplateData;
    isPreview?: boolean;
}

export function ClassicUI({ data, isPreview = false }: ClassicUIProps) {
    const primary = data.primaryColor;
    const sections = data.sections ?? [];

    return (
        <div className='bg-white min-h-screen' style={{ fontFamily: 'Georgia, serif' }}>
            {/* Fixed Navigation */}
            <nav className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200'>
                <div className='max-w-7xl mx-auto px-8 py-6'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-bold text-stone-900' style={{ fontFamily: 'Georgia, serif' }}>
                            {data.appName}
                        </h1>
                        <ul className='flex items-center gap-8'>
                            {data.menuItems.map(({ href, label }) => (
                                <li key={href} className='text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors' style={{ fontFamily: 'Georgia, serif' }}>
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Full-Page Hero Section */}
            <section className='relative min-h-screen flex items-center justify-center px-8 pt-24 pb-16'>
                <div className='max-w-6xl mx-auto w-full'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
                        {/* Left Column - Content */}
                        <div className='space-y-8'>
                            {/* Badge */}
                            {data.heroBadge && (
                                <div>
                                    <span
                                        className='inline-block px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-full text-white'
                                        style={{ backgroundColor: primary, fontFamily: 'Georgia, serif' }}
                                    >
                                        {data.heroBadge}
                                    </span>
                                </div>
                            )}

                            {/* Headline - Large & Bold */}
                            <h2
                                className='text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-stone-900'
                                style={{ fontFamily: 'Georgia, serif' }}
                            >
                                {data.heroTitle}
                            </h2>

                            {/* Subtitle */}
                            {data.heroSubtitle && (
                                <h3 className='text-2xl md:text-3xl font-light text-stone-600' style={{ fontFamily: 'Georgia, serif' }}>
                                    {data.heroSubtitle}
                                </h3>
                            )}

                            {/* Description */}
                            <p className='text-lg md:text-xl leading-relaxed text-stone-700 max-w-xl' style={{ fontFamily: 'Georgia, serif' }}>
                                {data.heroDescription}
                            </p>

                            {/* CTA Button */}
                            {data.heroCTA && (
                                <div className='pt-4'>
                                    <button
                                        className='group inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold text-white rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105'
                                        style={{ backgroundColor: primary, fontFamily: 'Georgia, serif' }}
                                    >
                                        {data.heroCTA}
                                        <span className='text-xl group-hover:translate-x-1 transition-transform duration-300'>→</span>
                                    </button>
                                </div>
                            )}

                            {/* Stats */}
                            {Array.isArray(data.heroStats) && data.heroStats.length > 0 && (
                                <div className='grid grid-cols-3 gap-8 pt-8'>
                                    {data.heroStats.map((stat, idx) => (
                                        <div key={idx}>
                                            <div
                                                className='text-4xl md:text-5xl font-bold mb-2'
                                                style={{ color: primary, fontFamily: 'Georgia, serif' }}
                                            >
                                                {stat.value}
                                            </div>
                                            <div className='text-sm font-medium text-stone-600 uppercase tracking-wide' style={{ fontFamily: 'Georgia, serif' }}>
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Visual Space */}
                        <div className='hidden lg:block'>
                            <div className='relative aspect-square'>
                                <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-stone-100 to-stone-200'></div>
                                <div
                                    className='absolute inset-0 rounded-3xl opacity-10'
                                    style={{ backgroundColor: primary }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                {sections.length > 0 && (
                    <div className='absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400'>
                        <span className='text-xs uppercase tracking-widest' style={{ fontFamily: 'Georgia, serif' }}>Scroll</span>
                        <div className='w-px h-16 bg-gradient-to-b from-stone-400 to-transparent'></div>
                    </div>
                )}
            </section>

            {/* Content Sections */}
            {sections.length > 0 && (
                <section className='bg-stone-50 py-24 px-8'>
                    <div className='max-w-5xl mx-auto'>
                        <div
                            className='prose prose-xl prose-stone max-w-none'
                            style={{
                                fontFamily: 'Georgia, serif',
                                '--tw-prose-headings': primary,
                                '--tw-prose-links': primary,
                            } as React.CSSProperties}
                        >
                            {sections.map(section => (
                                <article key={section.id} className='mb-16 last:mb-0'>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: section.content,
                                        }}
                                    />
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className='bg-white border-t border-stone-200 py-16 px-8'>
                <div className='max-w-6xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-12'>
                        <div>
                            <h3 className='text-3xl font-bold text-stone-900 mb-4' style={{ fontFamily: 'Georgia, serif' }}>
                                {data.appName}
                            </h3>
                            {data.appDescription && (
                                <p className='text-base text-stone-600 max-w-md leading-relaxed' style={{ fontFamily: 'Georgia, serif' }}>
                                    {data.appDescription}
                                </p>
                            )}
                        </div>

                        <div className='flex justify-end items-start'>
                            <div>
                                <p className='text-sm font-semibold text-stone-900 mb-4 uppercase tracking-wider' style={{ fontFamily: 'Georgia, serif' }}>
                                    Navigation
                                </p>
                                <ul className='space-y-3'>
                                    {data.menuItems.map(({ href, label }) => (
                                        <li key={href} className='text-base text-stone-600 hover:text-stone-900 transition-colors' style={{ fontFamily: 'Georgia, serif' }}>
                                            {label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-12 border-t border-stone-200'>
                        <p className='text-sm text-stone-600' style={{ fontFamily: 'Georgia, serif' }}>
                            {data.footerText}
                        </p>
                        <p className='flex items-center gap-2 text-sm text-stone-600' style={{ fontFamily: 'Georgia, serif' }}>
                            <span>Built with</span>
                            <span className='font-semibold' style={{ color: primary }}>
                                Decimal.tools
                            </span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
