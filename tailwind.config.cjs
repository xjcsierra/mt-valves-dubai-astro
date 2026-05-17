/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      fontFamily: {
        // Primary brand typography — Barlow Condensed (matches mtspain.net)
        display: ['"Barlow Condensed"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"Barlow Condensed"', 'Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        // MT brand palette (corporate — editorial — fluid)
        ink: '#0E1419',          // headings / dark body
        graphite: '#3A4148',     // secondary text
        steel: '#7B848C',        // muted / metadata
        mist: '#E8EBEE',         // dividers / surfaces
        paper: '#F6F7F8',        // page background
        accent: '#0B7DBB',       // MT corporate blue (industrial)
        accentDark: '#085A89',
        signal: '#E07A00'        // CTA / hover
      },
      letterSpacing: {
        wider2: '0.06em',
        widest2: '0.14em'
      },
      maxWidth: {
        editorial: '88rem'
      }
    }
  },
  plugins: []
};
