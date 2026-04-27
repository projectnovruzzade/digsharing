/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f8fafc',
        surface: '#ffffff',
        'surface-2': '#f1f5f9',
        border: '#e2e8f0',
        fg: '#0f172a',
        'fg-secondary': '#475569',
        'fg-muted': '#94a3b8',
        'fg-inverse': '#ffffff',
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1e40af',
          light: '#dbeafe',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          dark: '#6d28d9',
        },
        success: '#16a34a',
        warning: '#d97706',
        danger: '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.05), 0 1px 2px 0 rgba(0,0,0,0.05)',
        'card-md': '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
}
