import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Settings } from 'lucide-react';
import appConfig from '~/app-config';

export function GDPRBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true, // Always true, can't be disabled
        analytics: false,
        marketing: false,
        functional: false,
    });

    useEffect(() => {
        // Only show if GDPR banner is enabled in config
        if (appConfig.gdprBannerEnabled !== true) {
            return;
        }

        const consent = localStorage.getItem('gdpr-consent');
        if (!consent) {
            setIsVisible(true);
        } else {
            try {
                const savedPreferences = JSON.parse(consent);
                setPreferences({ ...preferences, ...savedPreferences });
            } catch (e) {
                console.error('Failed to parse GDPR preferences', e);
            }
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true,
        };
        localStorage.setItem('gdpr-consent', JSON.stringify(allAccepted));
        setPreferences(allAccepted);
        setIsVisible(false);
        window.dispatchEvent(new Event('gdpr-consent-changed'));
    };

    const handleSavePreferences = () => {
        localStorage.setItem('gdpr-consent', JSON.stringify(preferences));
        setIsVisible(false);
        setShowSettings(false);
        window.dispatchEvent(new Event('gdpr-consent-changed'));
    };

    const handleRejectAll = () => {
        const minimal = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false,
        };
        localStorage.setItem('gdpr-consent', JSON.stringify(minimal));
        setPreferences(minimal);
        setIsVisible(false);
        window.dispatchEvent(new Event('gdpr-consent-changed'));
    };

    if (!appConfig.gdprBannerEnabled) {
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
                    <div className='mx-auto max-w-7xl rounded-xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-gray-900/95'>
                        {!showSettings ? (
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-start gap-4'>
                                    <Shield
                                        className='h-6 w-6 flex-shrink-0'
                                        style={{ color: appConfig.primaryColor }}
                                    />
                                    <div className='flex-1'>
                                        <h3 className='text-lg font-display font-semibold text-gray-900 dark:text-white'>
                                            Your Privacy Matters
                                        </h3>
                                        <p className='mt-2 text-sm font-sans text-gray-600 dark:text-gray-400'>
                                            We use cookies and similar technologies to provide you with a personalized experience and to analyze our traffic. You can choose which categories of cookies you want to allow.
                                            {appConfig.privacyPolicyUrl && (
                                                <>
                                                    {' '}
                                                    <a
                                                        href={appConfig.privacyPolicyUrl}
                                                        className='underline hover:no-underline'
                                                        style={{ color: appConfig.primaryColor }}
                                                    >
                                                        Privacy Policy
                                                    </a>
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
                                    <button
                                        onClick={() => setShowSettings(true)}
                                        className='inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
                                    >
                                        <Settings className='h-4 w-4' />
                                        Customize
                                    </button>
                                    <button
                                        onClick={handleRejectAll}
                                        className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
                                    >
                                        Reject All
                                    </button>
                                    <button
                                        onClick={handleAcceptAll}
                                        className='rounded-lg px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-lg'
                                        style={{
                                            backgroundColor: appConfig.primaryColor,
                                            boxShadow: `0 4px 14px 0 ${appConfig.primaryColor}40`
                                        }}
                                    >
                                        Accept All
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className='space-y-4'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-lg font-display font-semibold text-gray-900 dark:text-white'>
                                        Cookie Preferences
                                    </h3>
                                    <button
                                        onClick={() => setShowSettings(false)}
                                        className='rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    >
                                        <X className='h-5 w-5' />
                                    </button>
                                </div>

                                <div className='space-y-3'>
                                    <CookieCategory
                                        title='Necessary'
                                        description='Required for the website to function properly'
                                        checked={preferences.necessary}
                                        disabled
                                        onChange={() => {}}
                                    />
                                    <CookieCategory
                                        title='Analytics'
                                        description='Help us understand how visitors interact with our website'
                                        checked={preferences.analytics}
                                        onChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                                    />
                                    <CookieCategory
                                        title='Marketing'
                                        description='Used to track visitors across websites for advertising purposes'
                                        checked={preferences.marketing}
                                        onChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                                    />
                                    <CookieCategory
                                        title='Functional'
                                        description='Enable enhanced functionality and personalization'
                                        checked={preferences.functional}
                                        onChange={(checked) => setPreferences({ ...preferences, functional: checked })}
                                    />
                                </div>

                                <div className='flex justify-end gap-3 pt-2'>
                                    <button
                                        onClick={handleRejectAll}
                                        className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
                                    >
                                        Reject All
                                    </button>
                                    <button
                                        onClick={handleSavePreferences}
                                        className='rounded-lg px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-lg'
                                        style={{
                                            backgroundColor: appConfig.primaryColor,
                                            boxShadow: `0 4px 14px 0 ${appConfig.primaryColor}40`
                                        }}
                                    >
                                        Save Preferences
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

interface CookieCategoryProps {
    title: string;
    description: string;
    checked: boolean;
    disabled?: boolean;
    onChange: (checked: boolean) => void;
}

function CookieCategory({ title, description, checked, disabled, onChange }: CookieCategoryProps) {
    return (
        <div className='flex items-start gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700'>
            <input
                type='checkbox'
                checked={checked}
                disabled={disabled}
                onChange={(e) => onChange(e.target.checked)}
                className='mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50'
            />
            <div className='flex-1'>
                <div className='flex items-center gap-2'>
                    <h4 className='text-sm font-display font-semibold text-gray-900 dark:text-white'>
                        {title}
                    </h4>
                    {disabled && (
                        <span className='text-xs text-gray-500 dark:text-gray-400'>
                            (Required)
                        </span>
                    )}
                </div>
                <p className='mt-1 text-xs font-sans text-gray-600 dark:text-gray-400'>
                    {description}
                </p>
            </div>
        </div>
    );
}
