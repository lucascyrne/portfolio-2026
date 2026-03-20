import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens using CSS variables (theme-aware)
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        border: 'var(--color-border)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        secondary: 'var(--color-secondary)',
        'secondary-foreground': 'var(--color-secondary-foreground)',
        accent: 'var(--color-accent)',
        'accent-foreground': 'var(--color-accent-foreground)',
        // Horizonte palette
        horizonte: {
          sunTop: '#F3407E',
          sunBottom: '#E77B79',
          horizon: '#D8656F',
          accent: '#F3A07E',
          dark: '#2E2E2E',
          light: '#F4F4F5',
          background: '#EFEFF0',
          text: '#2E2E2E',
          muted: '#71717A',
          border: '#E4E4E7',
          success: '#22C55E',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        inria: ['Inria Serif', 'serif'],
      },
      fontSize: {
        xsm: ['0.563rem', { lineHeight: '1.5' }],
        sm: ['0.75rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.5' }],
        lg: ['1.333rem', { lineHeight: '1.5' }],
        xl: ['1.777rem', { lineHeight: '1.5' }],
        '2xl': ['2.369rem', { lineHeight: '1.5' }],
        '3xl': ['3.157rem', { lineHeight: '1.5' }],
        '4xl': ['4.209rem', { lineHeight: '1.5' }],
      },
      backgroundImage: {
        'nebula-vignette': `radial-gradient(circle, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%), url('/assets/images/nebulosa.webp')`,
        'landing-day':
          'linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 35%, #E0F2FE 65%, #EFF6FF 100%)',
        'landing-sunset':
          'linear-gradient(180deg, #0F172A 0%, #1E293B 35%, #F3407E 75%, #E77B79 100%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1.6s ease-in-out',
        'fade-in-xs': 'fade-in 0.8s ease-in-out',
        'fade-out': 'fade-out 1.6s ease-in-out',
        'slide-in': 'slide-in 1.2s ease-out forwards',
        'slide-out': 'slide-out 1.2s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
