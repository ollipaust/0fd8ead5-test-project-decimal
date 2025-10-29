import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const textShadows = {
    xs: '0 1px 1px var(--tw-shadow-color)',
    sm: '0 1px 2px var(--tw-shadow-color)',
    md: '0 2px 4px var(--tw-shadow-color)',
    lg: '0 4px 8px var(--tw-shadow-color)',
    xl: '0 8px 16px var(--tw-shadow-color)',
    '2xl': '0 12px 24px var(--tw-shadow-color)',
    none: 'none',
};

export default {
    content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx,css}'],
    theme: {
        fontFamily: {
            // Modern system font stack for sans-serif
            display: [
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'sans-serif',
            ],
            sans: [
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'sans-serif',
            ],
            // Native serif fonts for Classic template
            serif: [
                'Georgia',
                'Cambria',
                'Times New Roman',
                'Times',
                'serif',
            ],
            // Native monospace fonts
            mono: [
                'ui-monospace',
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas',
                'Liberation Mono',
                'Courier New',
                'monospace',
            ],
        },
        extend: {
            fontSize: {
                xxs: '0.45rem',
                '9xl': '8rem', // 160px
                '10xl': '11rem', // 176px
                '11xl': '12rem', // 192px
                '12xl': '13rem', // 208px
            },
            borderRadius: {
                ...defaultTheme.borderRadius,
                '4xl': '2rem', // 32px
                '5xl': '2.5rem', // 40px
                '6xl': '3rem', // 48px
            },
            // Extended spacing for padding, margin, width, height, etc.
            spacing: {
                ...defaultTheme.spacing,
                '14': '3.5rem', // 56px
                '16': '4rem', // 64px
                '22': '5.5rem', // 88px
                '26': '6.5rem', // 104px
                '30': '7.5rem', // 120px
                '7xl': '8rem', // 128px
                '8xl': '9rem', // 144px
                '9xl': '10rem', // 160px
                '10xl': '11rem', // 176px
                '11xl': '12rem', // 192px
                '12xl': '13rem', // 208px
            },
            colors: {
                zinc: {
                    '25': '#fcfcfc',
                    '50': '#fafafa',
                    '75': '#f7f7f8',
                    '100': '#f4f4f5',
                    '125': '#ececef',
                    '150': '#e8e8eb',
                    '175': '#e6e6e9',
                    '200': '#e4e4e7',
                    '225': '#dfdfe3',
                    '250': '#dadade',
                    '275': '#d7d7db',
                    '300': '#d4d4d8',
                    '325': '#c2c2c8',
                    '350': '#b5b5bd',
                    '375': '#ababb4',
                    '400': '#a1a1aa',
                    '425': '#93939e',
                    '450': '#868691',
                    '475': '#797985',
                    '500': '#71717a',
                    '525': '#666670',
                    '550': '#5c5c66',
                    '575': '#575760',
                    '600': '#52525b',
                    '625': '#4c4c55',
                    '650': '#46464f',
                    '675': '#43434b',
                    '700': '#3f3f46',
                    '725': '#3b3b42',
                    '750': '#37373e',
                    '775': '#32323a',
                    '800': '#27272a',
                    '825': '#242427',
                    '850': '#1f1f23',
                    '875': '#1b1b1f',
                    '900': '#18181b',
                    '925': '#131316',
                    '950': '#0C0C0E',
                    '975': '#050506',
                },
                branding: {
                    primary: {
                        DEFAULT: '#0A8DE9',
                        light: '#5CBBFF',
                        dark: '#0068B8',
                    },
                    secondary: {
                        DEFAULT: '#FDC85D',
                        light: '#8EDDFF',
                        dark: '#F2A202',
                    },
                    accent: {
                        DEFAULT: '#00FFFF',
                        light: '#66FFFF',
                        dark: '#00CCCC',
                    },
                },
            },
            textShadow: textShadows,
            boxShadow: {
                ...defaultTheme.boxShadow,
                xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            },
            // Z-index with more granular control
            zIndex: {
                ...defaultTheme.zIndex,
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
            // Extended sizes for min/max width/height
            maxWidth: {
                ...defaultTheme.maxWidth,
                '7xl': '80rem', // 1280px
                '8xl': '88rem', // 1408px
                '9xl': '96rem', // 1536px
                '10xl': '104rem', // 1664px
                '11xl': '112rem', // 1792px
                '12xl': '120rem', // 1920px
            },
            minWidth: {
                ...defaultTheme.minWidth,
                '7xl': '80rem',
                '8xl': '88rem',
                '9xl': '96rem',
                '10xl': '104rem',
                '11xl': '112rem',
                '12xl': '120rem',
            },
            minHeight: {
                ...defaultTheme.minHeight,
                '7xl': '80rem',
                '8xl': '88rem',
                '9xl': '96rem',
                '10xl': '104rem',
                '11xl': '112rem',
                '12xl': '120rem',
            },
            height: {
                ...defaultTheme.height,
                '7xl': '80rem',
                '8xl': '88rem',
                '9xl': '96rem',
                '10xl': '104rem',
                '11xl': '112rem',
                '12xl': '120rem',
            },
            width: {
                ...defaultTheme.width,
                '7xl': '80rem',
                '8xl': '88rem',
                '9xl': '96rem',
                '10xl': '104rem',
                '11xl': '112rem',
                '12xl': '120rem',
            },
        },
    },
    plugins: [
        function ({
            matchUtilities,
            theme,
            addUtilities,
        }: {
            matchUtilities: (
                utilities: Record<string, (value: string) => { textShadow: string }>,
                options: { values: Record<string, string> }
            ) => void;
            theme: (path: string) => Record<string, string>;
            addUtilities: (utilities: Record<string, string>) => void;
        }) {
            // Create the generic text-shadow utility for custom values
            matchUtilities(
                {
                    'text-shadow': (value: string) => ({ textShadow: value }),
                },
                { values: theme('textShadow') }
            );
            // Create specific text-shadow-[size] utility classes
            const textShadowValues = theme('textShadow');
            const shadowUtilities = Object.entries(textShadowValues).reduce(
                (acc, [key, value]) => ({
                    ...acc,
                    [`.text-shadow-${key}`]: {
                        textShadow: value,
                    },
                }),
                {}
            );
            addUtilities(shadowUtilities);
        },
    ],
} satisfies Config;
