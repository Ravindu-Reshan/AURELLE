/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary buttons — #C6A57B, with lighter/darker shades for hover/active states
        primary: {
          50: '#FBF6F0',
          100: '#F3E9DB',
          500: '#C6A57B',
          600: '#B8935F',
          700: '#A67F4A',
        },
        background: '#FFF9F3', // page background
        surface: '#FFFFFF',    // navbar/footer/card backgrounds
        heading: '#6B5B53',    // headings
        body: '#7A6A62',       // regular text
        cardBorder: '#E7D7C9', // borders/card outlines
      },
    },
  },
  plugins: [],
};
