#!/usr/bin/env node
// packages/core/scripts/init-config.js
// ─────────────────────────────────────────────────────────────
// Generates mastors.config.js (JS/TS config) and
// mastors.config.scss (SCSS bridge) in the user's project root.
//
// Run standalone:  node node_modules/@mastors/core/scripts/init-config.js
// Called by:       mastors CLI after package install
// ─────────────────────────────────────────────────────────────
'use strict'

const fs   = require('fs')
const path = require('path')

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  green:  '\x1b[32m',
  cyan:   '\x1b[36m',
  yellow: '\x1b[33m',
  white:  '\x1b[37m',
  gray:   '\x1b[90m',
  red:    '\x1b[31m',
}

const W  = 60
const ln = (char = '─') => C.gray + char.repeat(W) + C.reset

// ── Destination (user's project root) ────────────────────────
const dest = process.env.INIT_CWD || process.cwd()
const JS_CONFIG   = path.join(dest, 'mastors.config.js')
const SCSS_BRIDGE = path.join(dest, 'mastors.config.scss')

// ── Config template ───────────────────────────────────────────
const JS_TEMPLATE = `\
// mastors.config.js
// ─────────────────────────────────────────────────────────────
// Mastors Design System — Configuration File
// Edit this file to customise every design token, theme, and
// feature flag in your project.
// After changes run:  npx mastors build  (or rebuild your SCSS)
// Docs: https://mastorscdn.kehem.com/docs/config
// ─────────────────────────────────────────────────────────────

/** @type {import('@mastors/core').MastorsConfig} */
module.exports = {

  // ── General ────────────────────────────────────────────────
  // Class prefix applied to all utility classes.
  // e.g. "m-" → .m-flex, .m-grid-cols-3
  prefix: "",

  // Append !important to every generated utility rule.
  important: false,

  // Dark-mode strategy:
  //   "class"          → .dark .bg-primary   (toggle a class on <html>)
  //   "media"          → @media (prefers-color-scheme: dark)
  //   "data-attribute" → [data-theme="dark"] .bg-primary
  darkMode: "class",

  // Enable right-to-left utilities (.ms-*, .me-*, logical props…)
  rtl: false,

  // ── Colors ─────────────────────────────────────────────────
  colors: {
    // Primary brand color — 11-shade scale (50 … 950)
    primary: {
      50:  "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",   // ← default accent
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554",
    },

    // Secondary / complementary brand color
    secondary: {
      50:  "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
      950: "#2e1065",
    },

    // Accent color (optional — falls back to primary-500 if null)
    accent: null,

    // Semantic palette overrides (null = use built-in defaults)
    success: null,
    warning: null,
    error:   null,
    info:    null,

    // Add any custom palette keys here:
    // brand: { 500: "#ff6b35", ... },
  },

  // ── Typography ─────────────────────────────────────────────
  typography: {
    // Base HTML font size in px — all rem values are relative to this
    baseFontSize: 16,

    // Default line-height on <body>
    baseLineHeight: 1.5,

    // Default letter-spacing on <body>
    baseLetterSpacing: "normal",

    // Font-family stacks  (keys: "sans" | "serif" | "mono" | any custom name)
    fontFamilies: {
      sans:  "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      serif: "Georgia, Cambria, 'Times New Roman', Times, serif",
      mono:  "ui-monospace, 'SFMono-Regular', Menlo, Monaco, Consolas, monospace",
    },

    // Body font key — must match a key in fontFamilies above
    defaultFont: "sans",

    // Heading font key — can differ from body
    headingFont: "sans",

    // Heading font weight
    headingFontWeight: "700",

    // Smooth anti-aliasing for headings
    headingSmoothing: true,

    // Font-size scale overrides (merges with the built-in scale)
    // e.g. { "2xl": "1.625rem", "display": "5rem" }
    fontSizeOverrides: {},

    // Font-weight overrides
    // e.g. { bold: "800" }
    fontWeightOverrides: {},

    // Line-height overrides
    // e.g. { tight: "1.2" }
    lineHeightOverrides: {},
  },

  // ── Spacing ────────────────────────────────────────────────
  spacing: {
    // Unit for the spacing scale: "rem" | "px" | "em"
    unit: "rem",

    // Base spacing unit (px).
    // 1 step = baseUnit / baseFontSize  rem
    // e.g. baseUnit 4 → step-4 = 1rem, step-8 = 2rem  (Tailwind-compatible)
    baseUnit: 4,

    // Merge extra custom steps into the scale
    // e.g. { "128": "32rem", "144": "36rem" }
    extend: {},
  },

  // ── Border Radius ──────────────────────────────────────────
  radius: {
    // Default radius applied to buttons, cards, inputs, etc.
    default: "0.375rem",   // maps to the "md" step

    // Override individual scale steps
    // e.g. { none: "0", sm: "0.125rem", lg: "0.75rem", full: "9999px" }
    overrides: {},
  },

  // ── Borders ────────────────────────────────────────────────
  borders: {
    // Default border width
    defaultWidth: "1px",
    // Default border style
    defaultStyle: "solid",
    // Default border color key (resolves from semantic theme tokens)
    defaultColor: "border",
  },

  // ── Shadows ────────────────────────────────────────────────
  shadows: {
    // Override individual shadow scale steps
    // e.g. { md: "0 4px 12px 0 rgb(0 0 0 / 15%)" }
    overrides: {},
  },

  // ── Breakpoints ────────────────────────────────────────────
  breakpoints: {
    xs:    "475px",
    sm:    "640px",
    md:    "768px",
    lg:    "1024px",
    xl:    "1280px",
    "2xl": "1536px",
  },

  // ── Z-Index Scale ──────────────────────────────────────────
  zIndex: {
    overrides: {
      // e.g. modal: "500", tooltip: "700", toast: "900"
    },
  },

  // ── Opacity Scale ──────────────────────────────────────────
  opacity: {
    overrides: {
      // e.g. { "10": "0.10", "15": "0.15" }
    },
  },

  // ── Transitions ────────────────────────────────────────────
  transitions: {
    // Default duration for all transition utilities
    defaultDuration: "200ms",
    // Default easing curve
    defaultEasing: "cubic-bezier(0.4, 0, 0.2, 1)",   // "ease-in-out"
    // Additional named durations merged into the scale
    // e.g. { slow: "500ms", instant: "0ms" }
    durationOverrides: {},
  },

  // ── Container ──────────────────────────────────────────────
  container: {
    // Centre the container block by default
    center: true,
    // Horizontal padding inside the container
    padding: "1rem",
    // Per-breakpoint horizontal padding (overrides \`padding\` above)
    // e.g. { md: "2rem", lg: "4rem" }
    paddingPerBreakpoint: {},
    // Max-widths per breakpoint (null = no max-width at that bp)
    maxWidths: {
      sm:    "640px",
      md:    "768px",
      lg:    "1024px",
      xl:    "1280px",
      "2xl": "1536px",
    },
  },

  // ── Theme Tokens (semantic CSS custom properties) ──────────
  // These map to CSS variables: --mastors-<key>
  // Use them in your SCSS as var(--mastors-bg), var(--mastors-text), etc.
  theme: {
    light: {
      // Surface & background
      // bg:             "#ffffff",
      // bg-subtle:      "#f9fafb",
      // surface:        "#ffffff",

      // Text
      // text:           "#111827",
      // text-muted:     "#6b7280",
      // text-subtle:    "#9ca3af",

      // Borders
      // border:         "#e5e7eb",
      // border-strong:  "#9ca3af",

      // Accent (defaults to primary-600)
      // accent:         "#2563eb",
      // accent-hover:   "#1d4ed8",
      // accent-subtle:  "#eff6ff",
      // accent-text:    "#ffffff",
    },
    dark: {
      // Surface & background
      // bg:             "#0f172a",
      // bg-subtle:      "#111827",
      // surface:        "#111827",

      // Text
      // text:           "#f9fafb",
      // text-muted:     "#9ca3af",

      // Accent (defaults to primary-400 in dark)
      // accent:         "#60a5fa",
      // accent-hover:   "#93c5fd",
    },
  },

  // ── Feature Flags ──────────────────────────────────────────
  // Set to false to completely tree-shake that module from the build.
  features: {
    flexer:     true,   // flexbox utilities
    gridder:    true,   // CSS grid utilities
    typography: true,   // type-scale utilities
    themes:     true,   // light/dark theme vars
    animator:   true,   // animation/transition utilities
    responsive: true,   // responsive modifier prefixes
    utilities:  true,   // general utility classes
    helpers:    true,   // helper classes (sr-only, truncate…)
    a11y:       true,   // accessibility utilities
  },

  // ── Plugins / Extensions ───────────────────────────────────
  // Array of paths (relative to this config) to extra SCSS files
  // appended after the Mastors core layer.
  // e.g. ["./src/scss/custom-components.scss"]
  plugins: [],
}
`

// ── SCSS bridge builder ───────────────────────────────────────
function buildScssBridge(cfg) {
  const colors      = cfg.colors      || {}
  const typography  = cfg.typography  || {}
  const spacing     = cfg.spacing     || {}
  const radius      = cfg.radius      || {}
  const borders     = cfg.borders     || {}
  const shadows     = cfg.shadows     || {}
  const breakpoints = cfg.breakpoints || {}
  const container   = cfg.container   || {}
  const transitions = cfg.transitions || {}
  const zIndex      = cfg.zIndex      || {}
  const opacity     = cfg.opacity     || {}
  const features    = cfg.features    || {}
  const theme       = cfg.theme       || {}

  function scssColorMap(name, map) {
    if (!map || typeof map !== 'object' || Object.keys(map).length === 0) return null
    const entries = Object.entries(map).map(([k, v]) => `  "${k}": ${v},`).join('\n')
    return `$mastors-${name}-color: (\n${entries}\n) !default;`
  }

  function scssMap(varName, map) {
    if (!map || typeof map !== 'object' || Object.keys(map).length === 0) return null
    const entries = Object.entries(map).map(([k, v]) => `  "${k}": ${v},`).join('\n')
    return `$mastors-${varName}: (\n${entries}\n) !default;`
  }

  function scssThemeBlock(selector, props) {
    if (!props || typeof props !== 'object' || Object.keys(props).length === 0) return null
    const vars = Object.entries(props).map(([k, v]) => `  --mastors-${k}: ${v};`).join('\n')
    return `${selector} {\n${vars}\n}`
  }

  const primary   = colors.primary   || {}
  const secondary = colors.secondary || {}

  const fontFamilies = typography.fontFamilies || {}
  const ffEntries = Object.entries(fontFamilies)
    .map(([k, v]) => `  "${k}": (${v}),`).join('\n')

  const bpEntries = Object.entries(breakpoints)
    .map(([k, v]) => `  "${k}": ${v},`).join('\n')

  const mwEntries = Object.entries(container.maxWidths || {})
    .map(([k, v]) => `  "${k}": ${v},`).join('\n')

  const ppbEntries = Object.entries(container.paddingPerBreakpoint || {})
    .map(([k, v]) => `  "${k}": ${v},`).join('\n')

  const durEntries = Object.entries(transitions.durationOverrides || {})
    .map(([k, v]) => `  "${k}": ${v},`).join('\n')

  const darkMode = cfg.darkMode || 'class'

  // Build dark-mode selectors
  let darkSelectors
  if (darkMode === 'media') {
    darkSelectors = '@media (prefers-color-scheme: dark) {\n  :root'
  } else if (darkMode === 'data-attribute') {
    darkSelectors = '[data-theme="dark"]'
  } else {
    darkSelectors = '[data-theme="dark"],\n.dark'
  }

  const lightTheme = scssThemeBlock(':root,\n[data-theme="light"],\n.light', theme.light)
  const darkTheme  = darkMode === 'media'
    ? (theme.dark && Object.keys(theme.dark).length
        ? `@media (prefers-color-scheme: dark) {\n  :root {\n` +
          Object.entries(theme.dark).map(([k,v]) => `    --mastors-${k}: ${v};`).join('\n') +
          `\n  }\n}`
        : null)
    : scssThemeBlock(darkSelectors, theme.dark)

  const lines = [
    `// mastors.config.scss`,
    `// AUTO-GENERATED — do not edit by hand.`,
    `// Source of truth: mastors.config.js`,
    `// Re-generate:  npx mastors build`,
    `// ─────────────────────────────────────────────────────────────`,
    ``,
    `// ── General ────────────────────────────────────────────────────`,
    `$mastors-prefix:    "${cfg.prefix    ?? ''}"    !default;`,
    `$mastors-important: ${cfg.important  ? 'true' : 'false'}      !default;`,
    `$mastors-dark-mode: "${darkMode}"    !default;`,
    `$mastors-rtl:       ${cfg.rtl        ? 'true' : 'false'}      !default;`,
    ``,
    `// ── Colors ─────────────────────────────────────────────────────`,
    scssColorMap('primary',   primary),
    scssColorMap('secondary', secondary),
    colors.accent  ? `$mastors-accent-color:  ${colors.accent};` : null,
    colors.success ? `$mastors-success-color: ${colors.success};` : null,
    colors.warning ? `$mastors-warning-color: ${colors.warning};` : null,
    colors.error   ? `$mastors-error-color:   ${colors.error};`   : null,
    colors.info    ? `$mastors-info-color:    ${colors.info};`    : null,
    ``,
    `// ── Typography ─────────────────────────────────────────────────`,
    `$mastors-base-font-size:      ${typography.baseFontSize      ?? 16}px  !default;`,
    `$mastors-base-line-height:    ${typography.baseLineHeight     ?? 1.5}   !default;`,
    `$mastors-base-letter-spacing: ${typography.baseLetterSpacing  ?? 'normal'} !default;`,
    `$mastors-default-font:        "${typography.defaultFont       ?? 'sans'}" !default;`,
    `$mastors-heading-font:        "${typography.headingFont       ?? 'sans'}" !default;`,
    `$mastors-heading-font-weight: ${typography.headingFontWeight  ?? '700'}  !default;`,
    `$mastors-heading-smoothing:   ${typography.headingSmoothing   !== false ? 'true' : 'false'} !default;`,
    ``,
    `$mastors-font-families: (`,
    ffEntries || `  "sans": (system-ui, -apple-system, sans-serif),`,
    `) !default;`,
    ``,
    Object.keys(typography.fontSizeOverrides || {}).length
      ? scssMap('font-size-overrides', typography.fontSizeOverrides)
      : `// $mastors-font-size-overrides: () !default;`,
    Object.keys(typography.fontWeightOverrides || {}).length
      ? scssMap('font-weight-overrides', typography.fontWeightOverrides)
      : null,
    Object.keys(typography.lineHeightOverrides || {}).length
      ? scssMap('line-height-overrides', typography.lineHeightOverrides)
      : null,
    ``,
    `// ── Spacing ────────────────────────────────────────────────────`,
    `$mastors-spacing-unit:    "${spacing.unit    ?? 'rem'}" !default;`,
    `$mastors-spacing-base-px: ${spacing.baseUnit ?? 4}      !default;`,
    Object.keys(spacing.extend || {}).length
      ? scssMap('spacing-extend', spacing.extend)
      : null,
    ``,
    `// ── Border Radius ──────────────────────────────────────────────`,
    `$mastors-radius-default: ${radius.default ?? '0.375rem'} !default;`,
    Object.keys(radius.overrides || {}).length
      ? scssMap('radius-overrides', radius.overrides)
      : null,
    ``,
    `// ── Borders ────────────────────────────────────────────────────`,
    `$mastors-border-default-width: ${borders.defaultWidth ?? '1px'}    !default;`,
    `$mastors-border-default-style: ${borders.defaultStyle ?? 'solid'}  !default;`,
    `$mastors-border-default-color: "${borders.defaultColor ?? 'border'}" !default;`,
    ``,
    `// ── Shadows ────────────────────────────────────────────────────`,
    Object.keys(shadows.overrides || {}).length
      ? scssMap('shadow-overrides', shadows.overrides)
      : `// $mastors-shadow-overrides: () !default;`,
    ``,
    `// ── Breakpoints ────────────────────────────────────────────────`,
    `$mastors-breakpoints: (`,
    bpEntries,
    `) !default;`,
    ``,
    `// ── Z-Index ────────────────────────────────────────────────────`,
    Object.keys(zIndex.overrides || {}).length
      ? scssMap('z-index-overrides', zIndex.overrides)
      : `// $mastors-z-index-overrides: () !default;`,
    ``,
    `// ── Opacity ────────────────────────────────────────────────────`,
    Object.keys(opacity.overrides || {}).length
      ? scssMap('opacity-overrides', opacity.overrides)
      : `// $mastors-opacity-overrides: () !default;`,
    ``,
    `// ── Transitions ────────────────────────────────────────────────`,
    `$mastors-default-duration: ${transitions.defaultDuration ?? '200ms'}                           !default;`,
    `$mastors-default-easing:   ${transitions.defaultEasing   ?? 'cubic-bezier(0.4, 0, 0.2, 1)'}  !default;`,
    durEntries ? `$mastors-duration-overrides: (\n${durEntries}\n) !default;` : null,
    ``,
    `// ── Container ──────────────────────────────────────────────────`,
    `$mastors-container-center:  ${container.center ? 'true' : 'false'} !default;`,
    `$mastors-container-padding: ${container.padding ?? '1rem'}          !default;`,
    ppbEntries ? `$mastors-container-padding-bp: (\n${ppbEntries}\n) !default;` : null,
    `$mastors-container-max-widths: (`,
    mwEntries,
    `) !default;`,
    ``,
    `// ── Feature Flags ──────────────────────────────────────────────`,
    `$enable-flexer:     ${features.flexer     !== false ? 'true' : 'false'} !default;`,
    `$enable-gridder:    ${features.gridder    !== false ? 'true' : 'false'} !default;`,
    `$enable-typography: ${features.typography !== false ? 'true' : 'false'} !default;`,
    `$enable-themes:     ${features.themes     !== false ? 'true' : 'false'} !default;`,
    `$enable-animator:   ${features.animator   !== false ? 'true' : 'false'} !default;`,
    `$enable-responsive: ${features.responsive !== false ? 'true' : 'false'} !default;`,
    `$enable-utilities:  ${features.utilities  !== false ? 'true' : 'false'} !default;`,
    `$enable-helpers:    ${features.helpers    !== false ? 'true' : 'false'} !default;`,
    `$enable-a11y:       ${features.a11y       !== false ? 'true' : 'false'} !default;`,
    ``,
    `// ── Theme Token Overrides ──────────────────────────────────────`,
    lightTheme || null,
    darkTheme  || null,
    ``,
  ]

  return lines.filter(l => l !== null).join('\n')
}

// ── Write helpers ─────────────────────────────────────────────
function writeFile(filePath, content, label) {
  const existed = fs.existsSync(filePath)
  fs.writeFileSync(filePath, content, 'utf8')
  const tag = existed
    ? `${C.yellow}[↻ updated]${C.reset}`
    : `${C.green}[✔ created]${C.reset}`
  console.log(`  ${tag} ${C.bold}${path.basename(filePath)}${C.reset} ${C.gray}→ ${filePath}${C.reset}`)
}

function skipFile(filePath) {
  console.log(`  ${C.gray}[○ exists ]${C.reset} ${C.bold}${path.basename(filePath)}${C.reset} ${C.gray}(use --force to overwrite)${C.reset}`)
}

// ── Main ──────────────────────────────────────────────────────
function main() {
  const force = process.argv.includes('--force')

  console.log('')
  console.log(ln('═'))
  console.log(`${C.bold}${C.white}  ✦  Mastors — Initialising Config${C.reset}`)
  console.log(ln('═'))
  console.log('')

  // ── Write JS config ──────────────────────────────────────
  if (!fs.existsSync(JS_CONFIG) || force) {
    writeFile(JS_CONFIG, JS_TEMPLATE, 'mastors.config.js')
  } else {
    skipFile(JS_CONFIG)
  }

  // ── Load the just-written (or existing) JS config ────────
  let cfg = {}
  try {
    // Clear require cache so we always read the live file
    delete require.cache[require.resolve(JS_CONFIG)]
    cfg = require(JS_CONFIG)
  } catch (e) {
    console.warn(`  ${C.yellow}[!]${C.reset} Could not load mastors.config.js — using defaults for SCSS bridge.`)
  }

  // ── Write SCSS bridge (always regenerated) ────────────────
  const scssContent = buildScssBridge(cfg)
  writeFile(SCSS_BRIDGE, scssContent, 'mastors.config.scss')

  console.log('')
  console.log(ln())
  console.log(`  ${C.cyan}Next steps:${C.reset}`)
  console.log(`  ${C.dim}1.${C.reset} Edit  ${C.bold}mastors.config.js${C.reset}  to match your design system`)
  console.log(`  ${C.dim}2.${C.reset} Run   ${C.cyan}${C.bold}npx mastors build${C.reset}  to regenerate the SCSS bridge`)
  console.log(`  ${C.dim}3.${C.reset} Import in your main SCSS:`)
  console.log(`     ${C.gray}@use "./mastors.config" as mc;${C.reset}`)
  console.log(`     ${C.gray}@use "@mastors/core/scss" with ($mastors-primary-color: mc.$mastors-primary-color);${C.reset}`)
  console.log('')
  console.log(`  ${C.yellow}Docs:${C.reset}  ${C.dim}https://mastorscdn.kehem.com/docs/config${C.reset}`)
  console.log(ln('═'))
  console.log('')
}

main()
