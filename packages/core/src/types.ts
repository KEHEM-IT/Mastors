/**
 * @mastors/core — src/types.ts
 * Shared TypeScript type definitions for the Mastors ecosystem.
 */

// TODO: Define MastorsConfig interface
// TODO: Define token type maps
// TODO: Define theme types

export type MastorsConfig = {
  prefix?: string
  important?: boolean
  darkMode?: 'class' | 'media'
  rtl?: boolean
}

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ThemeMode = 'light' | 'dark' | 'system'

// TODO: Expand with full token type exports
