// app-config.ts
// This file is auto-generated from your project configuration
// Edit via the dashboard at https://yourdomain.com/hub/projects/config

import { invertColor } from './utils/colors';

export interface SiteConfig {
    // Theme configuration
    themeName?: string; // e.g., "Glassmorphism", "Classic"

    // Global app settings
    appName: string;
    appAuthor?: string;
    appDescription?: string;
    tagline: string;
    menuItems: Array<{
        href: string;
        label: string;
    }>;

    // Hero section
    heroTitle: string;
    heroSubtitle?: string;
    heroDescription: string;
    heroBadge?: string;
    heroCTA?: string;
    heroCTALink?: string;
    heroStats?: Array<{
        label: string;
        value: string;
    }>;
    enableHeroAnimation?: boolean;
    heroBackgroundImage?: string;
    heroImageUrl?: string;
    heroVideoUrl?: string;

    // Footer + theme
    footerText: string;
    primaryColor: string;
    secondaryColor?: string;

    // SEO
    ogImage?: string;
    favicon?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;

    // Advanced Project Settings
    projectPhase?: 'planning' | 'development' | 'testing' | 'staging' | 'production' | 'maintenance';
    appCategory?: string;
    industry?: string;
    projectTags?: string[];
    expectedLaunchDate?: string;
    actualLaunchDate?: string;
    maintenanceMode?: boolean;
    maintenanceMessage?: string;
    sitemapEnabled?: boolean;
    robotsTxtCustom?: string;
    redirectRules?: Array<{ from: string; to: string; status: number }>;
    canonicalDomain?: string;
    cookieConsentEnabled?: boolean;
    gdprBannerEnabled?: boolean;
    privacyPolicyUrl?: string;
    termsOfServiceUrl?: string;
    notifyOnDeployFailure?: boolean;
    notifyOnDeploySuccess?: boolean;
    notificationEmail?: string;
    contentLanguage?: string;
    socialMediaLinks?: Array<{ platform: string; url: string }>;

    // Pages configuration
    pages: {
        [pageName: string]: {
            page_name: string;
            page_title: string;
            page_description: string;
            sections: Array<{
                id: string;
                content: string;
            }>;
            is_published: boolean;
            // SEO & Meta (FREE)
            meta_title?: string;
            meta_description?: string;
            // PRO features
            page_slug?: string;
            meta_keywords?: string;
            og_title?: string;
            og_description?: string;
            og_image?: string;
            canonical_url?: string;
            is_featured?: boolean;
            sitemap_priority?: number;
            sitemap_changefreq?: string;
            // ENTERPRISE features
            noindex?: boolean;
            nofollow?: boolean;
            is_hidden?: boolean;
            requires_auth?: boolean;
            allowed_roles?: string[];
        };
    };
}

// Generated configuration
const siteConfig: SiteConfig = {
    // Theme configuration
    themeName: 'Glassmorphism', // Default theme

    // Global app settings
    appName: 'Test Site',
    appAuthor: 'John Doe',
    appDescription: 'A comprehensive description of your amazing app and what it offers.',
    tagline: 'Your amazing tagline here',
    menuItems: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' }
    ],

    // Hero section
    heroTitle: 'Welcome to Our Amazing Site',
    heroSubtitle: 'Building the future, one step at a time',
    heroDescription: 'We create innovative solutions that help businesses grow and succeed in the digital age.',
    heroBadge: '🚀 New Launch',
    heroCTA: 'Get Started',
    heroCTALink: '/contact',
    heroStats: [
        { label: 'Active Users', value: '10,000+' },
        { label: 'Projects Completed', value: '500+' },
        { label: 'Customer Satisfaction', value: '99%' }
    ],
    enableHeroAnimation: true,
    heroBackgroundImage: undefined,
    heroImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    heroVideoUrl: undefined,

    // Footer + theme
    footerText: '© 2024 Test Company. All rights reserved.',
    primaryColor: '#10b981',
    get secondaryColor() {
        return invertColor(this.primaryColor);
    },

    // SEO
    ogImage: undefined,
    favicon: undefined,
    seoTitle: 'Test Site - Building Amazing Things',
    seoDescription: 'We create innovative solutions that help businesses grow and succeed in the digital age. Join thousands of satisfied customers today.',
    seoKeywords: undefined,

    // Advanced Project Settings
    projectPhase: undefined,
    appCategory: undefined,
    industry: undefined,
    projectTags: undefined,
    expectedLaunchDate: undefined,
    actualLaunchDate: undefined,
    maintenanceMode: undefined,
    maintenanceMessage: undefined,
    sitemapEnabled: undefined,
    robotsTxtCustom: undefined,
    redirectRules: undefined,
    canonicalDomain: undefined,
    cookieConsentEnabled: true,
    gdprBannerEnabled: false,
    privacyPolicyUrl: undefined,
    termsOfServiceUrl: undefined,
    notifyOnDeployFailure: undefined,
    notifyOnDeploySuccess: undefined,
    notificationEmail: undefined,
    contentLanguage: undefined,
    socialMediaLinks: undefined,

    // Pages configuration
    pages: {
        home: {
            page_name: 'home',
            page_title: 'Home',
            page_description: 'Welcome to your new website',
            sections: [
                {
                    id: 'welcome-section',
                    content: '<div class="container mx-auto px-4 py-16"><div class="max-w-4xl mx-auto text-center"><h1 class="text-5xl font-bold mb-6">Welcome</h1><p class="text-xl text-gray-600 mb-8">This is your homepage. You can edit this content in the Page Layout Editor to personalize your website. You can also add HTML and inline CSS to style this section as you like.</p></div></div>',
                },
            ],
            is_published: true,
        },
    },
};

export default siteConfig;
