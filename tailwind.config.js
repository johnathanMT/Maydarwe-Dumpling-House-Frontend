/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C8102E',
          gold: '#E8A006',
          white: '#FFFFFF',
          black: '#141110',
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
      },
      fontFamily: {
        display: ['Fraunces', '"Noto Serif Myanmar"', ...defaultTheme.fontFamily.serif],
        sans: ['Figtree', '"Noto Sans Myanmar"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        nav: '0 1px 0 0 rgb(232 160 6 / 0.25), 0 10px 30px -15px rgb(34 30 27 / 0.25)',
      },
    },
  },
  plugins: [],
};
