/**
 * @mastors/core — src/tokens.ts
 * JavaScript mirror of the SCSS design token maps.
 * Useful for CSS-in-JS consumers or design tooling integrations.
 */

// TODO: Mirror $color-tokens, $spacing-tokens, $typography-tokens, etc.
// Keep in sync with scss/tokens/ manually or via a build-time token extractor.

export const tokens = {
  color:    {} as Record<string, Record<string, string>>,
  spacing:  {} as Record<string, string>,
  fontSize: {} as Record<string, string>,
  radius:   {} as Record<string, string>,
  shadow:   {} as Record<string, string>,
  duration: {} as Record<string, string>,
  easing:   {} as Record<string, string>,
  zIndex:   {} as Record<string, number>,
  opacity:  {} as Record<string, number>,
}

export type Tokens = typeof tokens
