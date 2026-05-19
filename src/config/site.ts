/**
 * MT Valves & Fittings UAE — Site configuration
 * ----------------------------------------------------
 * Central source of truth. Toggle a module ON/OFF by
 * changing a boolean below — the UI re-renders automatically:
 * navigation links, hero CTAs, footer columns and pages.
 */
export const site = {
  name: 'MT Valves & Fittings UAE',
  shortName: 'MT',
  domain: 'https://mtme.ae',
  email: 'sales@mtme.ae',
  phone: '+971 (04) 453 4693',
  hours: 'Sun–Thu · 08:00–17:30 GST',
  whatsapp: '',
  address: {
    line1: 'BB1 Jumeirah Lakes Towers',
    line2: 'Dubai 32765, United Arab Emirates'
  }
} as const;

/**
 * Feature flags.
 * Phase 1 (landing only): home + news + contact = TRUE.
 * Everything else stays FALSE until ready.
 */
export const features = {
  // — Active in Phase 1 —
  home: true,
  articles: true,
  contact: true,
  // — Hidden until content is ready —
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
  // — Functional modules —
  configurator: false,
  cartQuote: false,
  // — Internationalization —
  arabic: false
} as const;

export type FeatureKey = keyof typeof features;

/** Helper: returns true only if a feature is enabled. */
export const isEnabled = (key: FeatureKey): boolean => features[key] === true;
