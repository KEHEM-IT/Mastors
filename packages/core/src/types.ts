/**
 * @mastors/core — src/types.ts
 * Shared TypeScript type definitions for the Mastors ecosystem.
 */

export type MastorsConfig = {
  prefix?: string
  important?: boolean
  darkMode?: 'class' | 'media'
  rtl?: boolean
}

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ThemeMode = 'light' | 'dark' | 'system'

export type ColorPaletteName = 'primary' | 'neutral' | 'success' | 'warning' | 'error' | 'info'
export type ColorShadeValue  = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'

export type SpacingScale =
  | '0' | 'px' | '0.5' | '1' | '1.5' | '2' | '2.5' | '3' | '3.5' | '4'
  | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '14' | '16'
  | '20' | '24' | '28' | '32' | '36' | '40' | '44' | '48' | '52'
  | '56' | '60' | '64' | '72' | '80' | '96'

export type RadiusScale = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

export type ShadowScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'none'

export type ZIndexScale = 'base' | 'raised' | 'dropdown' | 'sticky' | 'overlay' | 'modal' | 'toast' | 'tooltip' | 'max'

export type DurationScale = '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000'

export type EasingScale = 'linear' | 'in' | 'out' | 'in-out' | 'bounce'

export type FontSizeScale =
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'

export type FontFamilyScale = 'sans' | 'serif' | 'mono'

export type FontWeightScale =
  | 'thin' | 'extralight' | 'light' | 'normal' | 'medium'
  | 'semibold' | 'bold' | 'extrabold' | 'black'

export type LineHeightScale = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'

export type LetterSpacingScale = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'

export type OpacityScale =
  | '0' | '5' | '10' | '15' | '20' | '25' | '30' | '40'
  | '50' | '60' | '70' | '75' | '80' | '90' | '95' | '100'
