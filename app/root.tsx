import * as React from 'react';
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
    useRouteError,
    isRouteErrorResponse,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import './styles/tailwind.css';
import SmoothScrolling from './components/SmoothScroll';
import Layout from './components/Layout';
import { CookieConsent } from './components/CookieConsent';
import { GDPRBanner } from './components/GDPRBanner';
import appConfig from './app-config';

// Links function for all stylesheets and assets
export const links: LinksFunction = () => {
    return [
        // Favicon links
        { rel: 'icon', href: '/favicon.ico' },
    ];
};

// Document component for common HTML structure
interface DocumentProps {
    title?: string;
    forceDark?: boolean;
    noIndex?: boolean;
    children: React.ReactNode;
}

function Document({ children, title, forceDark, noIndex }: DocumentProps) {
    return (
        <html
            lang='en'
            className={forceDark ? 'dark' : ''}
            data-theme={forceDark ? 'dark' : 'light'}
        >
            <head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, viewport-fit=cover'
                />
                {noIndex && (
                    <meta
                        name='robots'
                        content='noindex'
                    />
                )}
                <Meta />
                <Links />
                {title && <title>{title}</title>}
            </head>

            <body
                className={`flex min-h-screen w-full flex-col overflow-x-hidden antialiased selection:bg-blue-200 selection:text-black ${
                    forceDark
                        ? 'bg-gray-900 text-gray-200'
                        : 'bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200'
                }`}
            >
                {children}
            </body>
        </html>
    );
}

// Main app component
export default function App() {
    const location = useLocation();
    const [cookieConsentVisible, setCookieConsentVisible] = React.useState(false);

    React.useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        setCookieConsentVisible(!consent);

        const handleConsentChange = () => {
            const consent = localStorage.getItem('cookie-consent');
            setCookieConsentVisible(!consent);
        };

        window.addEventListener('cookie-consent-changed', handleConsentChange);
        return () => window.removeEventListener('cookie-consent-changed', handleConsentChange);
    }, []);

    // Disable Lenis for auth pages to improve performance
    const isAuthPage =
        ['/login', '/signup', '/forgot-password'].some(path =>
            location.pathname.startsWith(path)
        ) || location.pathname.includes('password-reset');

    return (
        <Document>
            <div className={cookieConsentVisible ? 'pointer-events-none' : ''}>
                <SmoothScrolling isLenisEnabled={!isAuthPage}>
                    {isAuthPage ? (
                        <Outlet />
                    ) : (
                        <Layout>
                            <Outlet />
                        </Layout>
                    )}
                </SmoothScrolling>
            </div>

            {/* Cookie Consent & GDPR Banners */}
            {appConfig.cookieConsentEnabled && <CookieConsent />}
            {appConfig.gdprBannerEnabled && <GDPRBanner />}

            <ScrollRestoration />
            <Scripts />
        </Document>
    );
}

// Error boundary for handling route errors
export function ErrorBoundary() {
    const error = useRouteError();

    // Handle typical HTTP errors with status codes
    if (isRouteErrorResponse(error)) {
        return (
            <Document
                title={error.statusText}
                forceDark
                noIndex
            >
                <div className='flex flex-1 flex-col justify-center text-white'>
                    <div className='text-center leading-none'>
                        <h1 className='font-mono text-[25vw]'>{error.status}</h1>
                        <a
                            className='inline-block text-[8vw] underline'
                            href={`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${error.status}`}
                        >
                            {error.statusText}
                        </a>
                    </div>
                </div>
                <Scripts />
            </Document>
        );
    }

    // Generic error fallback
    return (
        <Document
            title='Error'
            forceDark
            noIndex
        >
            <div className='flex flex-1 flex-col justify-center text-white'>
                <div className='text-center leading-none'>
                    <h1 className='text-[25vw]'>Error</h1>
                    <div className='text-3xl'>Something went wrong! Please try again later.</div>
                </div>
            </div>
            <Scripts />
        </Document>
    );
}
