
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables manual dark mode toggle via `class="dark"`
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Scans all components/pages
  ],
  theme: {
    extend: {
      // Enhanced color palette
      colors: {
        brand: {
          light: '#7dd3fc',
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
        },
        violet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      // Enhanced animations
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'pulse-soft': {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.8'
          }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.7s ease-out forwards',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'pulse': 'pulse-soft 2s ease-in-out infinite',
      },
      // Enhanced spacing and sizing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Enhanced shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      }
    },
    screens: {
      // override md breakpoint to 800px
      md: '800px',
      // you can keep other defaults or customize if you want
      // e.g. sm: '640px',
      // lg: '1024px',
      // xl: '1280px',
    },
  },
  plugins: [
    // Example plugins if needed:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};
