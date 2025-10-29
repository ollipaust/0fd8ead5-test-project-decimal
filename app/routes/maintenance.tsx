import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { Wrench } from 'lucide-react';
import appConfig from '~/app-config';

export const meta: MetaFunction = () => {
    return [
        { title: `Maintenance - ${appConfig.appName}` },
        { name: 'robots', content: 'noindex, nofollow' },
    ];
};

export default function Maintenance() {
    const primary = appConfig.primaryColor;
    const message = appConfig.maintenanceMessage || 'We are currently performing scheduled maintenance. Please check back soon.';

    return (
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='mx-auto max-w-2xl px-6 text-center'>
                <div
                    className='mb-8 inline-flex items-center justify-center rounded-full p-6 shadow-xl'
                    style={{
                        backgroundColor: `${primary}20`,
                        border: `2px solid ${primary}40`
                    }}
                >
                    <Wrench
                        className='h-16 w-16'
                        style={{ color: primary }}
                    />
                </div>

                <h1 className='mb-4 text-5xl font-display font-bold text-gray-900'>
                    Under Maintenance
                </h1>

                <p className='mb-8 text-xl font-sans text-gray-700'>
                    {message}
                </p>

                <div className='mt-10'>
                    <Link
                        to='/'
                        className='inline-flex items-center gap-2 rounded-lg px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl'
                        style={{
                            backgroundColor: primary,
                            boxShadow: `0 4px 14px 0 ${primary}40`
                        }}
                    >
                        Return Home
                    </Link>
                </div>

                <div className='mt-12 text-sm text-gray-500'>
                    <p className='font-sans'>{appConfig.appName}</p>
                </div>
            </div>
        </div>
    );
}
