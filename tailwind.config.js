/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Terracotta/Coral warmth
        primary: {
          50: '#fef7f5',
          100: '#fdeae5',
          200: '#fbd5cc',
          300: '#f7b5a6',
          400: '#f18a72',
          500: '#e66a4d',
          600: '#d4502f',
          700: '#b13f24',
          800: '#923622',
          900: '#793122',
        },
        // Secondary: Soft teal/ocean blue (water theme)
        secondary: {
          50: '#f0f9fa',
          100: '#d9f2f4',
          200: '#b7e5ea',
          300: '#85d1da',
          400: '#4cb4c3',
          500: '#3199a9',
          600: '#2b7b8a',
          700: '#286571',
          800: '#27535d',
          900: '#25464e',
        },
        // Warm neutrals (replacing gray)
        warm: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // Accent: Soft amber/gold
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      boxShadow: {
        'warm': '0 4px 14px 0 rgba(230, 106, 77, 0.15)',
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.08), 0 4px 16px -4px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 8px 24px -4px rgba(0, 0, 0, 0.12), 0 12px 32px -8px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'slide-out-right': 'slideOutRight 0.3s ease-in forwards',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}