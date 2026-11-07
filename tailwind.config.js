/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // One accent owns the page. `accent` is the site's existing teal (fills, borders, underlines);
        // `ink` / `deep` are the same hue darkened so text meets WCAG AA on white (5.1:1 / 9:1).
        accent: {
          DEFAULT: '#70c1b3',
          soft: '#81D8D0',
          ink: '#2a7a6e',
          deep: '#134e46',
        },
        paper: '#fbfdfc', // page background, white tinted a hair toward the accent
        hairline: 'rgb(19 78 70 / 0.10)',
      },
      boxShadow: {
        card: '0 1px 2px rgb(19 78 70 / 0.05), 0 10px 28px -14px rgb(19 78 70 / 0.22)',
        lift: '0 2px 4px rgb(19 78 70 / 0.06), 0 22px 44px -18px rgb(19 78 70 / 0.32)',
      },
    },
  },
  plugins: [],
};
