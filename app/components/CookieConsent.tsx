import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import appConfig from '~/app-config';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show if cookie consent is enabled in config
        if (appConfig.cookieConsentEnabled !== true) {
            return;
        }

        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
        window.dispatchEvent(new Event('cookie-consent-changed'));
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
        window.dispatchEvent(new Event('cookie-consent-changed'));
    };

    if (!appConfig.cookieConsentEnabled) {
        return null;
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6'
                >
                    <div className='mx-auto max-w-7xl rounded-xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:bg-gray-900/90'>
                        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                            <div className='flex items-start gap-4'>
                                <Cookie
                                    className='h-6 w-6 flex-shrink-0 text-gray-700 dark:text-gray-300'
                                    style={{ color: appConfig.primaryColor }}
                                />
                                <div className='flex-1'>
                                    <h3 className='text-lg font-display font-semibold text-gray-900 dark:text-white'>
                                        Cookie Notice
                                    </h3>
                                    <p className='mt-1 text-sm font-sans text-gray-600 dark:text-gray-400'>
                                        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                                        {appConfig.privacyPolicyUrl && (
                                            <>
                                                {' '}
                                                <a
                                                    href={appConfig.privacyPolicyUrl}
                                                    className='underline hover:no-underline'
                                                    style={{ color: appConfig.primaryColor }}
                                                >
                                                    Learn more
                                                </a>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className='flex flex-shrink-0 gap-3'>
                                <button
                                    onClick={handleDecline}
                                    className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className='rounded-lg px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-lg'
                                    style={{
                                        backgroundColor: appConfig.primaryColor,
                                        boxShadow: `0 4px 14px 0 ${appConfig.primaryColor}40`
                                    }}
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
