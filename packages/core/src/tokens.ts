/**
 * @mastors/core — src/tokens.ts
 * JavaScript/TypeScript mirror of the SCSS design token maps.
 *
 * These values are the single source of truth for CSS-in-JS consumers,
 * design tooling integrations, and runtime token access.
 *
 * Keep in sync with packages/core/scss/tokens/ when token values change.
 * Future: a build-time extractor will auto-generate this from the SCSS maps.
 */

// ─── Color ───────────────────────────────────────────────────────────────────

const colorTokens = {
  primary: {
    '50':  '#eff6ff',
    '100': '#dbeafe',
    '200': '#bfdbfe',
    '300': '#93c5fd',
    '400': '#60a5fa',
    '500': '#3b82f6',
    '600': '#2563eb',
    '700': '#1d4ed8',
    '800': '#1e40af',
    '900': '#1e3a8a',
    '950': '#172554',
  },
  neutral: {
    '50':  '#f9fafb',
    '100': '#f3f4f6',
    '200': '#e5e7eb',
    '300': '#d1d5db',
    '400': '#9ca3af',
    '500': '#6b7280',
    '600': '#4b5563',
    '700': '#374151',
    '800': '#1f2937',
    '900': '#111827',
    '950': '#030712',
  },
  success: {
    '50':  '#f0fdf4',
    '100': '#dcfce7',
    '200': '#bbf7d0',
    '300': '#86efac',
    '400': '#4ade80',
    '500': '#22c55e',
    '600': '#16a34a',
    '700': '#15803d',
    '800': '#166534',
    '900': '#14532d',
    '950': '#052e16',
  },
  warning: {
    '50':  '#fffbeb',
    '100': '#fef3c7',
    '200': '#fde68a',
    '300': '#fcd34d',
    '400': '#fbbf24',
    '500': '#f59e0b',
    '600': '#d97706',
    '700': '#b45309',
    '800': '#92400e',
    '900': '#78350f',
    '950': '#451a03',
  },
  error: {
    '50':  '#fef2f2',
    '100': '#fee2e2',
    '200': '#fecaca',
    '300': '#fca5a5',
    '400': '#f87171',
    '500': '#ef4444',
    '600': '#dc2626',
    '700': '#b91c1c',
    '800': '#991b1b',
    '900': '#7f1d1d',
    '950': '#450a0a',
  },
  info: {
    '50':  '#ecfeff',
    '100': '#cffafe',
    '200': '#a5f3fc',
    '300': '#67e8f9',
    '400': '#22d3ee',
    '500': '#06b6d4',
    '600': '#0891b2',
    '700': '#0e7490',
    '800': '#155e75',
    '900': '#164e63',
    '950': '#083344',
  },
  white:       '#ffffff',
  black:       '#000000',
  transparent: 'transparent',
} as const

// ─── Spacing ─────────────────────────────────────────────────────────────────

const spacingTokens = {
  '0':    '0px',
  'px':   '1px',
  '0.5':  '0.125rem',
  '1':    '0.25rem',
  '1.5':  '0.375rem',
  '2':    '0.5rem',
  '2.5':  '0.625rem',
  '3':    '0.75rem',
  '3.5':  '0.875rem',
  '4':    '1rem',
  '5':    '1.25rem',
  '6':    '1.5rem',
  '7':    '1.75rem',
  '8':    '2rem',
  '9':    '2.25rem',
  '10':   '2.5rem',
  '11':   '2.75rem',
  '12':   '3rem',
  '14':   '3.5rem',
  '16':   '4rem',
  '20':   '5rem',
  '24':   '6rem',
  '28':   '7rem',
  '32':   '8rem',
  '36':   '9rem',
  '40':   '10rem',
  '44':   '11rem',
  '48':   '12rem',
  '52':   '13rem',
  '56':   '14rem',
  '60':   '15rem',
  '64':   '16rem',
  '72':   '18rem',
  '80':   '20rem',
  '96':   '24rem',
} as const

// ─── Typography ──────────────────────────────────────────────────────────────

const fontSizeTokens = {
  'xs':   '0.75rem',
  'sm':   '0.875rem',
  'base': '1rem',
  'lg':   '1.125rem',
  'xl':   '1.25rem',
  '2xl':  '1.5rem',
  '3xl':  '1.875rem',
  '4xl':  '2.25rem',
  '5xl':  '3rem',
  '6xl':  '3.75rem',
  '7xl':  '4.5rem',
  '8xl':  '6rem',
  '9xl':  '8rem',
} as const

const fontFamilyTokens = {
  sans:  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  mono:  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const

const fontWeightTokens = {
  thin:       '100',
  extralight: '200',
  light:      '300',
  normal:     '400',
  medium:     '500',
  semibold:   '600',
  bold:       '700',
  extrabold:  '800',
  black:      '900',
} as const

const lineHeightTokens = {
  none:    '1',
  tight:   '1.25',
  snug:    '1.375',
  normal:  '1.5',
  relaxed: '1.625',
  loose:   '2',
} as const

const letterSpacingTokens = {
  tighter: '-0.05em',
  tight:   '-0.025em',
  normal:  '0em',
  wide:    '0.025em',
  wider:   '0.05em',
  widest:  '0.1em',
} as const

// ─── Border radius ───────────────────────────────────────────────────────────

const radiusTokens = {
  none:  '0px',
  sm:    '0.125rem',
  base:  '0.25rem',
  md:    '0.375rem',
  lg:    '0.5rem',
  xl:    '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full:  '9999px',
} as const

// ─── Shadows ─────────────────────────────────────────────────────────────────

const shadowTokens = {
  xs:    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm:    '0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)',
  md:    '0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)',
  lg:    '0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)',
  xl:    '0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none:  'none',
} as const

// ─── Duration & easing ───────────────────────────────────────────────────────

const durationTokens = {
  '75':   '75ms',
  '100':  '100ms',
  '150':  '150ms',
  '200':  '200ms',
  '300':  '300ms',
  '500':  '500ms',
  '700':  '700ms',
  '1000': '1000ms',
} as const

const easingTokens = {
  linear:  'linear',
  in:      'cubic-bezier(0.4, 0, 1, 1)',
  out:     'cubic-bezier(0, 0, 0.2, 1)',
  'in-out':'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

// ─── Z-index ─────────────────────────────────────────────────────────────────

const zIndexTokens = {
  base:     0,
  raised:   10,
  dropdown: 100,
  sticky:   200,
  overlay:  300,
  modal:    400,
  toast:    500,
  tooltip:  600,
  max:      9999,
} as const

// ─── Opacity ─────────────────────────────────────────────────────────────────

const opacityTokens = {
  '0':   0,
  '5':   0.05,
  '10':  0.1,
  '15':  0.15,
  '20':  0.2,
  '25':  0.25,
  '30':  0.3,
  '40':  0.4,
  '50':  0.5,
  '60':  0.6,
  '70':  0.7,
  '75':  0.75,
  '80':  0.8,
  '90':  0.9,
  '95':  0.95,
  '100': 1,
} as const

// ─── Exported tokens object ───────────────────────────────────────────────────

export const tokens = {
  color:         colorTokens,
  spacing:       spacingTokens,
  fontSize:      fontSizeTokens,
  fontFamily:    fontFamilyTokens,
  fontWeight:    fontWeightTokens,
  lineHeight:    lineHeightTokens,
  letterSpacing: letterSpacingTokens,
  radius:        radiusTokens,
  shadow:        shadowTokens,
  duration:      durationTokens,
  easing:        easingTokens,
  zIndex:        zIndexTokens,
  opacity:       opacityTokens,
} as const

// ─── Types ───────────────────────────────────────────────────────────────────

export type Tokens         = typeof tokens
export type ColorPalette   = keyof typeof colorTokens
export type SpacingKey     = keyof typeof spacingTokens
export type FontSizeKey    = keyof typeof fontSizeTokens
export type FontFamilyKey  = keyof typeof fontFamilyTokens
export type FontWeightKey  = keyof typeof fontWeightTokens
export type LineHeightKey  = keyof typeof lineHeightTokens
export type LetterSpacingKey = keyof typeof letterSpacingTokens
export type RadiusKey      = keyof typeof radiusTokens
export type ShadowKey      = keyof typeof shadowTokens
export type DurationKey    = keyof typeof durationTokens
export type EasingKey      = keyof typeof easingTokens
export type ZIndexKey      = keyof typeof zIndexTokens
export type OpacityKey     = keyof typeof opacityTokens

// Convenience: extract all shade keys from a palette (e.g. '50' | '100' | ...)
export type ColorShade<P extends ColorPalette> =
  typeof colorTokens[P] extends Record<string, string>
    ? keyof typeof colorTokens[P]
    : never
