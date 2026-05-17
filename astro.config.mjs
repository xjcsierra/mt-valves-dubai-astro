// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// MT Valves & Fittings UAE — mtme.ae
// Astro configuration. EN is the default locale, AR uses RTL layout.
export default defineConfig({
  site: 'https://mtme.ae',
  trailingSlash: 'ignore',
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          ar: 'ar'
        }
      }
    })
  ]
});
