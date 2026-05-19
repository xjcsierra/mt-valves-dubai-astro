/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Barlow Condensed"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"Barlow Condensed"', 'Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#0E1419',
        graphite: '#3A4148',
        steel: '#7B848C',
        mist: '#E8EBEE',
        paper: '#F6F7F8',
        accent: '#0B7DBB',
        accentDark: '#085A89',
        signal: '#1F5AA8',
        'mt-navy':    '#0A1F3D',
        'mt-blue':    '#1F5AA8',
        'mt-sky':     '#2E78D2',
        'mt-sky-200': '#96BCE5'
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
