# MT Valves & Fittings UAE — Astro site (mtme.ae)

Migration of the catalogue website from static HTML to **Astro 5 + Tailwind CSS**.
Live domain: **https://mtme.ae**

The original static HTML version is kept as backup in [`mt-valves-dubai`](https://github.com/xjcsierra/mt-valves-dubai).

## Phase 1 — Landing (current)

The site currently serves a **landing experience**:

- Hero with primary CTA “Get in touch”
- About / Sectors block
- Articles teaser (3 editorial cards)
- Contact block with Dubai office details
- Dedicated `/articles` and `/contact` pages

All other modules (catalogue, industries, knowledge, projects, configurator, cart…) are
**implemented but switched OFF** via feature flags. Turn them on as content becomes ready.

## Toggling modules ON/OFF

All modules are controlled from a single file: `src/config/site.ts`.

```ts
export const features = {
  // Active in Phase 1
  home: true,
  articles: true,
  contact: true,

  // Hidden until content is ready
  catalogue: false,
  industries: false,
  knowledge: false,
  projects: false,
  resources: false,
  certifications: false,
  whereToBuy: false,
  glossary: false,
  news: false,
  about: false,

  // Functional modules
  configurator: false,
  cartQuote: false,

  // i18n
  arabic: false
};
```

Flipping a value to `true` automatically:

- Shows the link in the **Header** navigation
- Shows the link in the **Footer** column
- Enables the corresponding **CTA** in the Hero (e.g. "Browse catalogue")
- Makes the page accessible when its route exists under `src/pages/`

## Stack

- Astro 5 (static output)
- Tailwind CSS 3 (Barlow Condensed typography, MT brand palette)
- i18n ready: English (default) + Arabic (RTL) at `/ar/*` — gated by `features.arabic`
- Sitemap auto-generated via `@astrojs/sitemap`
- Hosted on **Cloudflare Pages** (custom domain managed in Cloudflare DNS)

## Project structure

```
src/
  config/     site.ts            ← contact details + feature flags
  layouts/    BaseLayout.astro   ← SEO, OG, hreflang, RTL
  components/ Header / Footer / Hero (flag-aware)
  pages/
    index.astro       ← Phase 1 landing
    contact.astro     ← Dubai contact + mailto form
    articles/index.astro
  styles/     global.css
public/
  CNAME       mtme.ae
  robots.txt
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
4. After the first build, go to *Custom domains* → add `mtme.ae`.
5. SSL is provisioned automatically.

## Roadmap

- [x] **Phase 1** — Landing + Articles + Contact (feature-flag driven)
- [ ] **Phase 2** — Activate `catalogue` (import the 224-product dataset)
- [ ] **Phase 3** — Activate `industries`, `knowledge`, `projects`
- [ ] **Phase 4** — Activate `configurator` + `cartQuote`
- [ ] **Phase 5** — Activate `arabic` (full AR/RTL parity)
- [ ] **Future** — Shopify / Snipcart integration

## License

Proprietary · MT Valves & Fittings.
