import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import appConfig from '~/app-config';

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const pageData = appConfig.pages['__PAGE_NAME__'];

    if (!pageData) {
        throw new Response('Page not found', { status: 404 });
    }

    return json({ pageData });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    if (!data) {
        return [{ title: 'Page Not Found' }];
    }

    const { pageData } = data;
    const title = pageData.meta_title || `${pageData.page_title} – ${appConfig.appName}`;
    const description = pageData.meta_description || pageData.page_description;
    const ogTitle = pageData.og_title || pageData.page_title;
    const ogDescription = pageData.og_description || description;
    const ogImage = pageData.og_image || appConfig.ogImage;
    const keywords = pageData.meta_keywords;
    const canonical = pageData.canonical_url;
    const robotsContent = pageData.noindex || pageData.nofollow
        ? `${pageData.noindex ? 'noindex' : 'index'},${pageData.nofollow ? 'nofollow' : 'follow'}`
        : 'index,follow';

    const metaTags: Array<{ title?: string; name?: string; content?: string; property?: string; tagName?: string; rel?: string; href?: string }> = [
        { title },
        { name: 'description', content: description },
        { name: 'robots', content: robotsContent },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: appConfig.appName },
        { property: 'og:title', content: ogTitle },
        { property: 'og:description', content: ogDescription },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: ogTitle },
        { name: 'twitter:description', content: ogDescription },
        { name: 'theme-color', content: appConfig.primaryColor },
    ];

    if (keywords) {
        metaTags.push({ name: 'keywords', content: keywords });
    }

    if (ogImage) {
        metaTags.push({ property: 'og:image', content: ogImage });
        metaTags.push({ name: 'twitter:image', content: ogImage });
    }

    if (canonical) {
        metaTags.push({ tagName: 'link', rel: 'canonical', href: canonical });
    }

    return metaTags;
};

export default function __PAGE_COMPONENT__(): JSX.Element {
    const { pageData } = useLoaderData<typeof loader>();
    const primary = appConfig.primaryColor;
    const isGlassmorphism = appConfig.themeName === 'Glassmorphism' || appConfig.themeName === 'Modern';
    const isClassic = appConfig.themeName === 'Classic';
    const isEnterprise = appConfig.themeName === 'Enterprise';

    // Glassmorphism Theme (same styling as index but without hero)
    if (isGlassmorphism) {
        return (
            <motion.div
                className='relative overflow-hidden'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <div
                    aria-hidden
                    className='pointer-events-none absolute inset-0 -z-10'
                >
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

                <div className='mx-auto rounded-2xl border border-white/30 bg-white/10 shadow-xl ring-1 ring-black/5 backdrop-blur-xl'>
                    <motion.header
                        className='flex items-center justify-between gap-4 px-6 py-5 sm:px-10'
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            to='/'
                            className='inline-flex items-center gap-3'
                        >
                            <span
                                className='text-2xl font-display font-extrabold tracking-tight text-slate-100 text-shadow-md'
                                style={{
                                    textShadow: `0 2px 8px ${primary}40`
                                }}
                            >
                                {appConfig.appName}
                            </span>
                        </Link>
                        <nav className='hidden md:block'>
                            <ul className='flex items-center gap-8'>
                                {appConfig.menuItems.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link
                                            to={href}
                                            className='text-lg text-slate-200 transition-all ease-linear duration-300 hover:text-slate-700'
                                            style={{
                                                '--hover-color': primary,
                                            } as React.CSSProperties}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = primary;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = '';
                                            }}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </motion.header>

                    <main className='px-6 pb-12 sm:px-10 sm:pb-16'>
                        <motion.section
                            className='relative overflow-hidden rounded-2xl border border-white/30 bg-white/20 px-8 py-14 shadow-lg backdrop-blur-2xl sm:px-12 lg:px-16'
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className='relative z-10'>
                                <h1 className='text-pretty text-5xl font-display font-extrabold tracking-tight sm:text-6xl lg:text-7xl'>
                                    <span
                                        className='bg-clip-text text-transparent drop-shadow-md'
                                        style={{
                                            backgroundImage: `linear-gradient(to right, ${primary}, #1e293b)`,
                                        }}
                                    >
                                        {pageData.page_title}
                                    </span>
                                </h1>

                                {pageData.page_description && (
                                    <p className='mt-6 max-w-2xl text-xl text-gray-800 leading-relaxed'>
                                        {pageData.page_description}
                                    </p>
                                )}
                            </div>

                            <div
                                aria-hidden
                                className='pointer-events-none absolute -inset-x-8 -bottom-8 h-24 bg-gradient-to-t from-white/30 to-transparent'
                            />
                        </motion.section>

                        <section className='mt-10 space-y-8'>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className='overflow-hidden rounded-2xl border border-white/30 bg-white/30 p-8 shadow-lg backdrop-blur-2xl'
                            >
                                {pageData.sections.length > 0 ? (
                                    <div
                                        className='prose prose-lg max-w-none'
                                        style={{
                                            '--tw-prose-links': primary,
                                            '--tw-prose-headings': primary,
                                        } as React.CSSProperties}
                                    >
                                        {pageData.sections.map(section => (
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
                                    <EmptyState primary={primary} />
                                )}
                            </motion.div>
                        </section>
                    </main>

                    <footer className='rounded-b-2xl border-t border-white/30 px-6 py-8 text-center text-base text-gray-800 sm:px-10'>
                        <p>
                            {appConfig.footerText.replace('2024', new Date().getFullYear().toString())}
                        </p>
                        <p className='mt-2 text-sm text-gray-600'>
                            Built with <a href='https://decimal.tools' target='_blank' rel='noopener noreferrer' className='transition-colors' style={{ color: appConfig.primaryColor }}>Decimal.tools</a>
                        </p>
                    </footer>
                </div>
            </motion.div>
        );
    }

    // Enterprise Theme (professional SaaS styling)
    if (isEnterprise) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50'>
                {/* Navigation */}
                <nav className='sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl'>
                    <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                        <div className='flex h-16 items-center justify-between'>
                            <Link to='/' className='flex items-center gap-3'>
                                <div
                                    className='flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white text-sm'
                                    style={{ backgroundColor: primary }}
                                >
                                    {appConfig.appName.charAt(0)}
                                </div>
                                <span className='text-xl font-semibold tracking-tight text-slate-900'>
                                    {appConfig.appName}
                                </span>
                            </Link>
                            <ul className='hidden md:flex items-center gap-8'>
                                {appConfig.menuItems.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link to={href} className='text-sm font-medium text-slate-600 transition-colors hover:text-slate-900'>
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Page Header */}
                <section className='bg-white border-b border-slate-200'>
                    <div className='mx-auto max-w-7xl px-6 py-16 lg:px-8'>
                        <h1 className='text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl'>
                            {pageData.page_title}
                        </h1>
                        {pageData.page_description && (
                            <p className='mt-6 text-lg leading-8 text-slate-600 max-w-3xl'>
                                {pageData.page_description}
                            </p>
                        )}
                    </div>
                </section>

                {/* Content */}
                <section className='bg-white py-16'>
                    <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                        {pageData.sections.length > 0 ? (
                            <div
                                className='prose prose-lg prose-slate max-w-none'
                                style={{
                                    '--tw-prose-headings': primary,
                                    '--tw-prose-links': primary,
                                } as React.CSSProperties}
                            >
                                {pageData.sections.map(section => (
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
                            <EmptyState primary={primary} />
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className='border-t border-slate-200 bg-slate-50'>
                    <div className='mx-auto max-w-7xl px-6 py-12 lg:px-8'>
                        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                            <p className='text-xs text-slate-500'>
                                {appConfig.footerText.replace('2024', new Date().getFullYear().toString())}
                            </p>
                            <p className='flex items-center gap-1 text-xs text-slate-500'>
                                <span>Powered by</span>
                                <a href='https://decimal.tools' target='_blank' rel='noopener noreferrer' className='font-semibold' style={{ color: primary }}>
                                    Decimal.tools
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    // Classic Theme (newspaper styling, same as index but without hero)
    if (isClassic) {
        return (
            <div className='font-serif bg-white min-h-screen'>
                {/* Masthead Header */}
                <header className='border-b-4 border-black bg-white'>
                    <div className='mx-auto max-w-7xl px-6 py-8'>
                        <div className='text-center'>
                            <Link to='/' className='inline-block'>
                                <h1
                                    className='text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'
                                    style={{ color: primary }}
                                >
                                    {appConfig.appName}
                                </h1>
                            </Link>
                            {appConfig.tagline && (
                                <p className='mt-2 text-sm uppercase tracking-widest text-stone-600'>
                                    {appConfig.tagline}
                                </p>
                            )}
                            <div className='mt-2 text-xs text-stone-500'>
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className='mt-6 border-t border-b border-stone-300 py-3'>
                            <ul className='flex flex-wrap items-center justify-center gap-8 text-sm uppercase tracking-wide'>
                                {appConfig.menuItems.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link
                                            to={href}
                                            className='transition-colors hover:text-stone-900'
                                            style={{ color: primary }}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className='mx-auto max-w-7xl px-6 py-12'>
                    {/* Page Title Section */}
                    <article className='border-b-2 border-stone-300 pb-8 mb-8'>
                        <h2
                            className='text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl'
                            style={{ color: primary }}
                        >
                            {pageData.page_title}
                        </h2>
                        {pageData.page_description && (
                            <p className='mt-4 text-xl leading-relaxed text-stone-700'>
                                {pageData.page_description}
                            </p>
                        )}
                    </article>

                    {/* Content Sections */}
                    <div className='space-y-6'>
                        {pageData.sections.length > 0 ? (
                            <div className='prose prose-lg prose-stone max-w-none'>
                                {pageData.sections.map(section => (
                                    <article key={section.id} className='mb-8'>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: section.content,
                                            }}
                                        />
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <EmptyState primary={primary} />
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className='border-t-4 border-black bg-stone-900 py-8 text-white'>
                    <div className='mx-auto max-w-7xl px-6 text-center'>
                        <p className='text-sm'>
                            {appConfig.footerText.replace('2024', new Date().getFullYear().toString())}
                        </p>
                        <p className='mt-2 text-xs text-stone-400'>
                            Built with <a href='https://decimal.tools' target='_blank' rel='noopener noreferrer' className='transition-colors' style={{ color: primary }}>Decimal.tools</a>
                        </p>
                    </div>
                </footer>
            </div>
        );
    }

    // Fallback to Glassmorphism if no theme specified
    return (
        <motion.div
            className='relative overflow-hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            <div
                aria-hidden
                className='pointer-events-none absolute inset-0 -z-10'
            >
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

            <div className='mx-auto rounded-2xl border border-white/30 bg-white/10 shadow-xl ring-1 ring-black/5 backdrop-blur-xl'>
                <motion.header
                    className='flex items-center justify-between gap-4 px-6 py-5 sm:px-10'
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link
                        to='/'
                        className='inline-flex items-center gap-3'
                    >
                        <span
                            className='text-2xl font-display font-extrabold tracking-tight text-slate-100 text-shadow-md'
                            style={{
                                textShadow: `0 2px 8px ${primary}40`
                            }}
                        >
                            {appConfig.appName}
                        </span>
                    </Link>
                    <nav className='hidden md:block'>
                        <ul className='flex items-center gap-8'>
                            {appConfig.menuItems.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        to={href}
                                        className='text-lg text-slate-200 transition-all ease-linear duration-300 hover:text-slate-700'
                                        style={{
                                            '--hover-color': primary,
                                        } as React.CSSProperties}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = primary;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = '';
                                        }}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </motion.header>

                <main className='px-6 pb-12 sm:px-10 sm:pb-16'>
                    <motion.section
                        className='relative overflow-hidden rounded-2xl border border-white/30 bg-white/20 px-8 py-14 shadow-lg backdrop-blur-2xl sm:px-12 lg:px-16'
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className='relative z-10'>
                            <h1 className='text-pretty text-5xl font-display font-extrabold tracking-tight sm:text-6xl lg:text-7xl'>
                                <span
                                    className='bg-clip-text text-transparent drop-shadow-md'
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${primary}, #1e293b)`,
                                    }}
                                >
                                    {pageData.page_title}
                                </span>
                            </h1>

                            {pageData.page_description && (
                                <p className='mt-6 max-w-2xl text-xl text-gray-800 leading-relaxed'>
                                    {pageData.page_description}
                                </p>
                            )}
                        </div>

                        <div
                            aria-hidden
                            className='pointer-events-none absolute -inset-x-8 -bottom-8 h-24 bg-gradient-to-t from-white/30 to-transparent'
                        />
                    </motion.section>

                    <section className='mt-10 space-y-8'>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className='overflow-hidden rounded-2xl border border-white/30 bg-white/30 p-8 shadow-lg backdrop-blur-2xl'
                        >
                            {pageData.sections.length > 0 ? (
                                <div
                                    className='prose prose-lg max-w-none'
                                    style={{
                                        '--tw-prose-links': primary,
                                        '--tw-prose-headings': primary,
                                    } as React.CSSProperties}
                                >
                                    {pageData.sections.map(section => (
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
                                <EmptyState primary={primary} />
                            )}
                        </motion.div>
                    </section>
                </main>

                <footer className='rounded-b-2xl border-t border-white/30 px-6 py-8 text-center text-base text-gray-800 sm:px-10'>
                    <p>
                        {appConfig.footerText.replace('2024', new Date().getFullYear().toString())}
                    </p>
                    <p className='mt-2 text-sm text-gray-600'>
                        Built with <a href='https://decimal.tools' target='_blank' rel='noopener noreferrer' className='transition-colors' style={{ color: appConfig.primaryColor }}>Decimal.tools</a>
                    </p>
                </footer>
            </div>
        </motion.div>
    );
}

function EmptyState({ primary }: { primary: string }) {
    const isClassic = appConfig.themeName === 'Classic';
    const isEnterprise = appConfig.themeName === 'Enterprise';

    if (isEnterprise) {
        return (
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center'>
                <LayoutDashboard className='mx-auto mb-4 h-10 w-10 text-slate-400' />
                <p className='text-slate-900 text-xl font-semibold'>No content yet</p>
                <p className='mt-2 text-base text-slate-600'>
                    Start editing your page to see it come to life.
                </p>
            </div>
        );
    }

    if (isClassic) {
        return (
            <div className='border-2 border-stone-300 bg-stone-50 p-8 text-center'>
                <LayoutDashboard className='mx-auto mb-4 h-10 w-10 text-stone-400' />
                <p className='text-stone-800 text-xl font-serif font-bold'>No content yet</p>
                <p className='mt-2 text-base font-serif text-stone-600'>
                    Start editing your page to see it come to life.
                </p>
            </div>
        );
    }

    return (
        <div className='rounded-xl border border-white/30 bg-white/20 p-6 text-center shadow-sm backdrop-blur-xl'>
            <LayoutDashboard className='mx-auto mb-4 h-8 w-8 text-gray-700' />
            <p className='text-gray-800 text-lg font-sans font-medium'>No content yet</p>
            <p className='mt-1 text-sm font-sans text-gray-700'>
                Start editing your page to see it come to life.
            </p>
        </div>
    );
}
