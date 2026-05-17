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
  email: 'info@mtme.ae',
  whatsapp: '', // e.g. '+971500000000' — leave empty to hide
  address: {
    line1: 'Jebel Ali Free Zone',
    line2: 'Dubai, United Arab Emirates'
  }
} as const;

/**
 * Feature flags.
 * Phase 1 (landing only): home + articles + contact = TRUE.
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
  arabic: false // turn on when AR translations are ready
} as const;

export type FeatureKey = keyof typeof features;

/** Helper: returns true only if a feature is enabled. */
export const isEnabled = (key: FeatureKey): boolean => features[key] === true;
