#!/usr/bin/env node
// scripts/generate-tokens.js
// ─────────────────────────────────────────────────────────────
// Reads SCSS token map files and regenerates src/tokens.ts so
// the TypeScript token mirror never drifts from the SCSS source.
//
// Run:  node scripts/generate-tokens.js
// Auto: called by `node build.js` before tsc (see build.js)
// ─────────────────────────────────────────────────────────────

'use strict'

const fs   = require('fs')
const path = require('path')

const TOKENS_DIR = path.join(__dirname, '..', 'scss', 'tokens')
const OUT_FILE   = path.join(__dirname, '..', 'src', 'tokens.ts')

// ── Helpers ──────────────────────────────────────────────────

/** Extract all $map-name: ( ... ) blocks from a SCSS string */
function extractMaps(scss) {
  const maps = {}
  const mapRe = /\$([a-z][a-z0-9-]*)\s*:\s*\(/g
  let match
  while ((match = mapRe.exec(scss)) !== null) {
    const varName = match[1]
    let depth = 1
    let i = match.index + match[0].length
    let inner = ''
    while (i < scss.length && depth > 0) {
      if (scss[i] === '(') depth++
      else if (scss[i] === ')') depth--
      if (depth > 0) inner += scss[i]
      i++
    }
    maps[varName] = parseMap(inner)
  }
  return maps
}

/** Parse a flat SCSS map body into a JS object (string keys → string values) */
function parseMap(body) {
  const result = {}
  const lines = body.split('\n')
  for (const raw of lines) {
    const line = raw.trim().replace(/,$/, '').replace(/\/\/.*$/, '').trim()
    if (!line || line.startsWith('(') || line.endsWith('(')) continue
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const rawKey = line.slice(0, colonIdx).trim().replace(/^["']|["']$/g, '')
    const rawVal = line.slice(colonIdx + 1).trim()
    if (!rawKey || !rawVal) continue
    // Unescape SCSS key escapes: "0\\.5" → "0.5", "1\\/2" → "1/2"
    const key = rawKey.replace(/\\\\?\./g, '.').replace(/\\\\?\//g, '/')
    result[key] = rawVal
  }
  return result
}

/** Parse nested color map ($color-tokens with sub-palettes) */
function extractNestedColorMap(scss) {
  const palettes = {}
  const paletteRe = /"([a-z]+)"\s*:\s*\(([\s\S]*?)\),/g
  let m
  while ((m = paletteRe.exec(scss)) !== null) {
    const name = m[1]
    const inner = m[2]
    if (inner.includes(':')) {
      palettes[name] = parseMap(inner)
    } else {
      palettes[name] = inner.trim()
    }
  }
  // flat top-level entries (white, black, transparent)
  const flatRe = /"(white|black|transparent)"\s*:\s*([^,\n]+)/g
  while ((m = flatRe.exec(scss)) !== null) {
    palettes[m[1]] = m[2].trim().replace(/,$/, '')
  }
  return palettes
}

// ── Read token files ──────────────────────────────────────────

function readScss(filename) {
  return fs.readFileSync(path.join(TOKENS_DIR, filename), 'utf8')
}

const colorScss       = readScss('_color.scss')
const spacingScss     = readScss('_spacing.scss')
const typographyScss  = readScss('_typography.scss')
const shadowsScss     = readScss('_shadows.scss')
const radiiScss       = readScss('_radii.scss')
const transitionsScss = readScss('_transitions.scss')
const zIndexScss      = readScss('_z-index.scss')
const opacityScss     = readScss('_opacity.scss')
const sizingScss      = readScss('_sizing.scss')

const colorMap       = extractNestedColorMap(colorScss)
const spacingMap     = extractMaps(spacingScss)['spacing-tokens']           || {}
const fontSizeMap    = extractMaps(typographyScss)['font-size-tokens']       || {}
const fontFamilyMap  = extractMaps(typographyScss)['font-family-tokens']     || {}
const fontWeightMap  = extractMaps(typographyScss)['font-weight-tokens']     || {}
const lineHeightMap  = extractMaps(typographyScss)['line-height-tokens']     || {}
const trackingMap    = extractMaps(typographyScss)['letter-spacing-tokens']  || {}
const shadowMap      = extractMaps(shadowsScss)['shadow-tokens']             || {}
const radiusMap      = extractMaps(radiiScss)['radius-tokens']               || {}
const durationMap    = extractMaps(transitionsScss)['duration-tokens']       || {}
const easingMap      = extractMaps(transitionsScss)['easing-tokens']         || {}
const zIndexMap      = extractMaps(zIndexScss)['z-index-tokens']             || {}
const opacityMap     = extractMaps(opacityScss)['opacity-tokens']            || {}
const sizingMap      = extractMaps(sizingScss)['sizing-tokens']              || {}

// ── Serialise to TypeScript ───────────────────────────────────

function toTsObj(map, indent = 2) {
  const pad = ' '.repeat(indent)
  const entries = Object.entries(map).map(([k, v]) => {
    const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `'${k}'`
    const val = typeof v === 'object'
      ? `{\n${toTsObj(v, indent + 2)}\n${pad}}`
      : `'${String(v)}'`
    return `${pad}${key}: ${val},`
  })
  return entries.join('\n')
}

// ── Generate file ─────────────────────────────────────────────

const now = new Date().toISOString().slice(0, 10)

const out = `\
/**
 * @mastors/core — src/tokens.ts
 * AUTO-GENERATED by scripts/generate-tokens.js on ${now}.
 * DO NOT EDIT MANUALLY — run \`node scripts/generate-tokens.js\` to regenerate.
 *
 * Source of truth: packages/core/scss/tokens/
 */

// ─── Color ───────────────────────────────────────────────────────────────────

const colorTokens = {
${toTsObj(colorMap)}
} as const

// ─── Spacing ─────────────────────────────────────────────────────────────────

const spacingTokens = {
${toTsObj(spacingMap)}
} as const

// ─── Typography ──────────────────────────────────────────────────────────────

const fontSizeTokens = {
${toTsObj(fontSizeMap)}
} as const

const fontFamilyTokens = {
${toTsObj(fontFamilyMap)}
} as const

const fontWeightTokens = {
${toTsObj(fontWeightMap)}
} as const

const lineHeightTokens = {
${toTsObj(lineHeightMap)}
} as const

const letterSpacingTokens = {
${toTsObj(trackingMap)}
} as const

// ─── Border radius ───────────────────────────────────────────────────────────

const radiusTokens = {
${toTsObj(radiusMap)}
} as const

// ─── Shadows ─────────────────────────────────────────────────────────────────

const shadowTokens = {
${toTsObj(shadowMap)}
} as const

// ─── Duration & easing ───────────────────────────────────────────────────────

const durationTokens = {
${toTsObj(durationMap)}
} as const

const easingTokens = {
${toTsObj(easingMap)}
} as const

// ─── Z-index ─────────────────────────────────────────────────────────────────

const zIndexTokens = {
${toTsObj(zIndexMap)}
} as const

// ─── Opacity ─────────────────────────────────────────────────────────────────

const opacityTokens = {
${toTsObj(opacityMap)}
} as const

// ─── Sizing ──────────────────────────────────────────────────────────────────

const sizingTokens = {
${toTsObj(sizingMap)}
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
  sizing:        sizingTokens,
} as const

// ─── Types ───────────────────────────────────────────────────────────────────

export type Tokens            = typeof tokens
export type ColorPalette      = keyof typeof colorTokens
export type SpacingKey        = keyof typeof spacingTokens
export type FontSizeKey       = keyof typeof fontSizeTokens
export type FontFamilyKey     = keyof typeof fontFamilyTokens
export type FontWeightKey     = keyof typeof fontWeightTokens
export type LineHeightKey     = keyof typeof lineHeightTokens
export type LetterSpacingKey  = keyof typeof letterSpacingTokens
export type RadiusKey         = keyof typeof radiusTokens
export type ShadowKey         = keyof typeof shadowTokens
export type DurationKey       = keyof typeof durationTokens
export type EasingKey         = keyof typeof easingTokens
export type ZIndexKey         = keyof typeof zIndexTokens
export type OpacityKey        = keyof typeof opacityTokens
export type SizingKey         = keyof typeof sizingTokens

export type ColorShade<P extends ColorPalette> =
  typeof colorTokens[P] extends Record<string, string>
    ? keyof typeof colorTokens[P]
    : never
`

fs.writeFileSync(OUT_FILE, out, 'utf8')
console.log('[generate-tokens] Written → ' + path.relative(process.cwd(), OUT_FILE))
