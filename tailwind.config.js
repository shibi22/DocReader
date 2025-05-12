/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#F8FAFC',
        },
        indigo: {
          600: '#4F46E5',
        },
        emerald: {
          500: '#10B981',
        },
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'bounce': 'bounce 1.5s infinite',
        'spin': 'spin 1s linear infinite',
      },
      transitionProperty: {
        'height': 'height',
      }
    },
  },
  plugins: [],
};