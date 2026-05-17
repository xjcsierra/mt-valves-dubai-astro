# MT Valves & Fittings UAE — Astro site (mtme.ae)

Migration of the catalogue website from static HTML to **Astro 5 + Tailwind CSS**.
Live domain: **https://mtme.ae**

The original static HTML version is kept as backup in [`mt-valves-dubai`](https://github.com/xjcsierra/mt-valves-dubai).

## Stack

- Astro 5 (static output)
- Tailwind CSS 3 (Barlow Condensed typography, MT brand palette)
- i18n: English (default) + Arabic (RTL) at `/ar/*`
- Sitemap auto-generated via `@astrojs/sitemap`
- Hosted on **Cloudflare Pages** (custom domain managed in Cloudflare DNS)

## Project structure

```
src/
  layouts/    BaseLayout.astro (SEO, OG, hreflang, RTL)
  components/ Header, Footer, Hero, ... (UI building blocks)
  pages/      index.astro (EN) + /ar/index.astro (AR) + dynamic PDP routes
  styles/     global.css (Barlow Condensed + brand tokens)
public/
  CNAME       mtme.ae
  robots.txt
  /og/, /img/  static assets
```

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview
```

## Deployment — Cloudflare Pages

1. Cloudflare Dashboard → *Workers & Pages* → *Create application* → *Pages* → *Connect to Git*.
2. Pick repo **xjcsierra/mt-valves-dubai-astro**.
3. Build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. After the first build, go to *Custom domains* → add `mtme.ae`. Cloudflare wires DNS automatically because the zone is in the same account.
5. SSL is provisioned automatically.

## Roadmap

- [ ] F1 — Layout + Header / Footer + identity (done)
- [ ] F2 — Home hero + sectors carousel
- [ ] F3 — Catalogue, listings and dynamic PDP for ~224 products (driven by JSON exported from the v22 source dataset)
- [ ] F4 — Industries / Knowledge / News (Astro content collections)
- [ ] F5 — Contact + cart-quote + configurator
- [ ] F6 — Arabic locale (RTL) parity
- [ ] Future — Shopify / Snipcart integration when commercial e-commerce launches

## License

Proprietary · MT Valves & Fittings.
