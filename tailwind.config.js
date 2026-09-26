/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Ivory — the warm off-white base of every page
        ivory: '#FDFAF6',
        // Butter — the soft yellow of the logo, used for friendly surfaces and highlights
        butter: {
          50: '#FFFBEF',
          100: '#FFF4D6',
          200: '#FFE8AC',
          DEFAULT: '#FED271',
          400: '#FDC24A',
        },
        // Primary Red — CTAs, active states, brand seal
        primary: {
          50: '#FEF2F2',
          100: '#FDE3E3',
          200: '#FBCBCB',
          300: '#F6A3A4',
          400: '#EE6B6E',
          500: '#E03E43',
          600: '#C8102E',
          700: '#A50D26',
          800: '#880F24',
          900: '#721123',
          950: '#40040E',
          DEFAULT: '#C8102E',
        },
        // Secondary Gold — accents, highlights, dark-surface text
        secondary: {
          50: '#FFFBEB',
          100: '#FFF3C6',
          200: '#FFE588',
          300: '#FFD24A',
          400: '#FDBE1F',
          500: '#E8A006',
          600: '#C77A02',
          700: '#9E5506',
          800: '#82420C',
          900: '#6E370F',
          950: '#401C03',
          DEFAULT: '#E8A006',
        },
        // Ink — deep charcoal for typography and dark surfaces
        ink: {
          50: '#F7F6F5',
          100: '#EDEBE9',
          200: '#D8D4D0',
          300: '#B9B3AD',
          400: '#948C84',
          500: '#79716A',
          600: '#625B55',
          700: '#4F4945',
          800: '#39342F',
          900: '#221E1B',
          950: '#141110',
          DEFAULT: '#221E1B',
        },
        // Delivery partners (their own brand colours, used only on their buttons)
        partner: {
          grab: '#00B14F',
          foodpanda: '#D70F64',
        },
      },
      fontFamily: {
        // Self-hosted variable fonts (see src/styles/fonts.js). Burmese falls through to Noto.
        display: ['"Fraunces Variable"', '"Noto Serif Myanmar"', ...defaultTheme.fontFamily.serif],
        sans: ['"Figtree Variable"', '"Noto Sans Myanmar Variable"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        nav: '0 1px 0 0 rgb(232 160 6 / 0.25), 0 10px 30px -15px rgb(34 30 27 / 0.25)',
        card: '0 18px 40px -28px rgb(34 30 27 / 0.45)',
        lift: '0 28px 56px -26px rgb(34 30 27 / 0.55)',
        // Warm, soft lift for photos and stickers on light backgrounds
        warm: '0 24px 50px -24px rgb(199 122 2 / 0.45)',
        cta: '0 14px 30px -18px rgb(200 16 46 / 0.9)',
      },
      spacing: {
        header: 'var(--header-h)',
      },
      transitionTimingFunction: {
        // The one easing curve used across the site (mirrors EASE_OUT in src/lib/motion.js)
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'rise-still': {
          from: { transform: 'translateY(14px)' },
          to: { transform: 'translateY(0)' },
        },
        settle: {
          from: { transform: 'scale(1.035)' },
          to: { transform: 'scale(1)' },
        },
        'fade-down': {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        steam: {
          '0%': { opacity: '0', transform: 'translateY(8px) scaleY(0.9)' },
          '35%': { opacity: '0.75' },
          '100%': { opacity: '0', transform: 'translateY(-26px) scaleY(1.1)' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'rise-still': 'rise-still 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        settle: 'settle 1.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-down': 'fade-down 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        steam: 'steam 3.2s ease-in-out infinite',
        float: 'float 3.6s ease-in-out infinite',
        bob: 'bob 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
