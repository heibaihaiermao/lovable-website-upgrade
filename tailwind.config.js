/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables manual dark mode toggle via `class="dark"`
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Scans all components/pages
  ],
  theme: {
    extend: {
      // Example: add custom colors, spacing, fonts, etc.
      colors: {
        brand: {
          light: '#7dd3fc',
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
        },
      },
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
