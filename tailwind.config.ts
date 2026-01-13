import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        'dark-bg': '#0F172A',
        'dark-card': '#1E293B',
        'light-text': '#F8FAFC',
        'green-candle': '#10B981',
        'red-candle': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        's': '8px',
        'm': '12px',
        'l': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
        'modal': '0 20px 25px -5px rgba(0,0,0,0.1)',
      },
      fontSize: {
        'h1-desktop': ['72px', '1.2'],
        'h1-mobile': ['48px', '1.2'],
        'h2': ['32px', '1.25'],
        'h3': ['24px', '1.33'],
        'body': ['16px', '1.5'],
        'small': ['14px', '1.43'],
      },
    },
  },
  plugins: [],
}

export default config
