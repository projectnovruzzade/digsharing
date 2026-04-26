/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#427AB5',
          dark: '#124170',
          light: '#EBF2FB',
        },
        accent: {
          DEFAULT: '#AAFFC7',
          dark: '#16A34A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          2: '#F4F6F9',
          3: '#FAFAFA',
        },
        brand: {
          navy: '#124170',
          blue: '#427AB5',
          mint: '#AAFFC7',
        },
        border: '#E2E8F0',
        fg: {
          DEFAULT: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
          inverse: '#FFFFFF',
        },
        success: {
          DEFAULT: '#16A34A',
          bg: '#F0FDF4',
        },
        warning: {
          DEFAULT: '#D97706',
          bg: '#FFFBEB',
        },
        danger: {
          DEFAULT: '#DC2626',
          bg: '#FEF2F2',
        },
        info: {
          DEFAULT: '#0284C7',
          bg: '#F0F9FF',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['Sora', 'sans-serif'],
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md':
          '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'card-lg':
          '0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)',
        inner: 'inset 0 1px 2px rgba(0,0,0,0.06)',
        focus: '0 0 0 3px rgba(66,122,181,0.2)',
      },
    },
  },
  plugins: [],
}
