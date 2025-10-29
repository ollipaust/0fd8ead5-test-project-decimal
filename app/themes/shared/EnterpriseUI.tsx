import { Link } from '@remix-run/react';
import { ArrowRight, TrendingUp } from 'lucide-react';

/**
 * Shared Enterprise/Professional Template UI
 * Single source of truth for both actual template and preview dialog
 *
 * Design Inspiration: Award-winning SaaS & Corporate sites
 * - Clean, professional typography (Inter-based)
 * - Grid-based layouts with generous spacing
 * - Subtle gradients and modern card designs
 * - Strategic use of accent colors
 * - Data-driven, conversion-focused hierarchy
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

interface EnterpriseUIProps {
    data: TemplateData;
    isPreview?: boolean;
}

export function EnterpriseUI({ data, isPreview = false }: EnterpriseUIProps) {
    const primary = data.primaryColor;
    const sections = data.sections ?? [];
    const LinkComponent = isPreview ? 'a' : Link;

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50'>
            {/* Navigation Bar - Minimal & Professional */}
            <nav className='sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl'>
                <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                    <div className='flex h-16 items-center justify-between'>
                        {/* Logo */}
                        <div className='flex items-center gap-3'>
                            <div
                                className='flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white text-sm'
                                style={{ backgroundColor: primary }}
                            >
                                {data.appName.charAt(0)}
                            </div>
                            <span className='text-xl font-semibold tracking-tight text-slate-900'>
                                {data.appName}
                            </span>
                        </div>

                        {/* Navigation Links */}
                        <ul className='hidden md:flex items-center gap-8'>
                            {data.menuItems.map(({ href, label }) => (
                                <li key={href}>
                                    <a className='text-sm font-medium text-slate-600 transition-colors hover:text-slate-900'>
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <button
                            className='hidden md:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90'
                            style={{ backgroundColor: primary }}
                        >
                            Get Started
                            <ArrowRight className='h-4 w-4' />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Data-Driven & Professional */}
            <section className='relative overflow-hidden'>
                {/* Subtle Background Pattern */}
                <div
                    className='absolute inset-0 -z-10 opacity-[0.03]'
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, ${primary} 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                    }}
                />

                <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8'>
                    <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center'>
                        {/* Content */}
                        <div>
                            {/* Badge */}
                            {data.heroBadge && (
                                <div className='mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium'
                                    style={{
                                        borderColor: `${primary}40`,
                                        backgroundColor: `${primary}08`,
                                        color: primary,
                                    }}
                                >
                                    <TrendingUp className='h-3.5 w-3.5' />
                                    {data.heroBadge}
                                </div>
                            )}

                            {/* Headline */}
                            <h1 className='text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl'>
                                {data.heroTitle}
                            </h1>

                            {/* Subheadline */}
                            {data.heroSubtitle && (
                                <p
                                    className='mt-4 text-2xl font-semibold tracking-tight'
                                    style={{ color: primary }}
                                >
                                    {data.heroSubtitle}
                                </p>
                            )}

                            {/* Description */}
                            <p className='mt-6 text-lg leading-8 text-slate-600'>
                                {data.heroDescription}
                            </p>

                            {/* CTA Group */}
                            <div className='mt-10 flex flex-wrap items-center gap-4'>
                                <button
                                    className='inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl'
                                    style={{
                                        backgroundColor: primary,
                                        boxShadow: `0 10px 40px -10px ${primary}60`,
                                    }}
                                >
                                    {data.heroCTA || 'Get Started'}
                                    <ArrowRight className='h-5 w-5' />
                                </button>
                                <button className='inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition-all hover:border-slate-400 hover:bg-slate-50'>
                                    Learn More
                                </button>
                            </div>

                            {/* Stats Grid */}
                            {Array.isArray(data.heroStats) && data.heroStats.length > 0 && (
                                <dl className='mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-10'>
                                    {data.heroStats.map((stat, idx) => (
                                        <div key={idx} className='flex flex-col gap-1'>
                                            <dt
                                                className='text-3xl font-bold tracking-tight'
                                                style={{ color: primary }}
                                            >
                                                {stat.value}
                                            </dt>
                                            <dd className='text-sm font-medium text-slate-600'>
                                                {stat.label}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            )}
                        </div>

                        {/* Visual Element - Modern Card/Dashboard Preview */}
                        <div className='relative lg:h-[600px]'>
                            <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 opacity-50' />

                            {/* Floating Card Elements - Professional Dashboard Aesthetic */}
                            <div className='relative h-full'>
                                {/* Main Card */}
                                <div
                                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl'
                                    style={{
                                        boxShadow: `0 25px 50px -12px ${primary}20`,
                                    }}
                                >
                                    <div className='flex items-center gap-3 mb-6'>
                                        <div
                                            className='h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg'
                                            style={{ backgroundColor: primary }}
                                        >
                                            {data.appName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className='h-3 w-24 rounded-full bg-slate-200' />
                                            <div className='h-2 w-16 rounded-full bg-slate-100 mt-2' />
                                        </div>
                                    </div>

                                    {/* Data Visualization Bars */}
                                    <div className='space-y-3'>
                                        {[85, 92, 78].map((width, idx) => (
                                            <div key={idx}>
                                                <div className='h-2 w-full rounded-full bg-slate-100'>
                                                    <div
                                                        className='h-full rounded-full transition-all duration-1000'
                                                        style={{
                                                            width: `${width}%`,
                                                            backgroundColor: primary,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Accent Dot Elements */}
                                <div
                                    className='absolute top-20 right-20 h-16 w-16 rounded-full opacity-20'
                                    style={{ backgroundColor: primary }}
                                />
                                <div
                                    className='absolute bottom-20 left-10 h-24 w-24 rounded-full opacity-10'
                                    style={{ backgroundColor: primary }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section - Clean & Structured */}
            <section className='bg-white py-24 sm:py-32'>
                <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                    {sections.length > 0 ? (
                        <div
                            className='prose prose-lg prose-slate max-w-none'
                            style={{
                                '--tw-prose-headings': primary,
                                '--tw-prose-links': primary,
                            } as React.CSSProperties}
                        >
                            {sections.map(section => (
                                <article key={section.id} className='mb-12'>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: section.content,
                                        }}
                                    />
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className='mx-auto max-w-4xl'>
                            <div className='mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium'
                                style={{
                                    borderColor: `${primary}40`,
                                    backgroundColor: `${primary}08`,
                                    color: primary,
                                }}
                            >
                                Features
                            </div>
                            <h2
                                className='text-4xl font-bold tracking-tight text-slate-900 mb-6'
                                style={{ color: primary }}
                            >
                                Enterprise-Grade Solutions
                            </h2>
                            <div className='space-y-6 text-lg leading-8 text-slate-600'>
                                <p>
                                    Built for scale, designed for performance. Our platform delivers the
                                    tools and infrastructure that modern businesses need to succeed in a
                                    competitive landscape.
                                </p>
                                <p>
                                    From startups to Fortune 500 companies, organizations trust our
                                    solution to power their critical operations with reliability,
                                    security, and cutting-edge innovation.
                                </p>
                            </div>

                            {/* Feature Grid */}
                            <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2'>
                                {[
                                    { title: 'Scalable Infrastructure', desc: 'Built to grow with your business' },
                                    { title: 'Enterprise Security', desc: 'Bank-grade encryption & compliance' },
                                    { title: 'Real-time Analytics', desc: 'Data-driven insights at your fingertips' },
                                    { title: '24/7 Support', desc: 'Expert assistance whenever you need it' },
                                ].map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className='rounded-xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-slate-300 hover:shadow-md'
                                    >
                                        <div
                                            className='mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg text-white font-semibold'
                                            style={{ backgroundColor: primary }}
                                        >
                                            {idx + 1}
                                        </div>
                                        <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                                            {feature.title}
                                        </h3>
                                        <p className='text-sm text-slate-600'>
                                            {feature.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer - Professional & Minimal */}
            <footer className='border-t border-slate-200 bg-slate-50'>
                <div className='mx-auto max-w-7xl px-6 py-12 lg:px-8'>
                    <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
                        {/* Brand */}
                        <div className='flex items-center gap-3'>
                            <div
                                className='flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white'
                                style={{ backgroundColor: primary }}
                            >
                                {data.appName.charAt(0)}
                            </div>
                            <div>
                                <div className='text-lg font-semibold text-slate-900'>
                                    {data.appName}
                                </div>
                                {data.appDescription && (
                                    <p className='text-sm text-slate-600'>
                                        {data.appDescription}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Links */}
                        <nav>
                            <ul className='flex flex-wrap items-center gap-6'>
                                {data.menuItems.map(({ href, label }) => (
                                    <li key={href}>
                                        <a className='text-sm font-medium text-slate-600 transition-colors hover:text-slate-900'>
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Bottom Bar */}
                    <div className='mt-8 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between'>
                        <p className='text-xs text-slate-500'>
                            {data.footerText}
                        </p>
                        <p className='flex items-center gap-1 text-xs text-slate-500'>
                            <span>Powered by</span>
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
