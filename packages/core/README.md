# @mastors/core

> Foundational tokens, mixins, functions, reset, and responsive engine for the Mastors ecosystem.

[![npm version](https://img.shields.io/npm/v/@mastors/core.svg)](https://www.npmjs.com/package/@mastors/core)
[![sass](https://img.shields.io/badge/sass-%3E%3D1.80.0-pink.svg)](https://sass-lang.com)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Import & Usage](#import--usage)
- [Package Exports](#package-exports)
- [Design Tokens](#design-tokens)
  - [Colors](#colors)
  - [Spacing](#spacing)
  - [Sizing](#sizing)
  - [Typography](#typography)
  - [Shadows](#shadows)
  - [Radii](#radii)
  - [Opacity](#opacity)
  - [Z-Index](#z-index)
  - [Transitions](#transitions)
- [Theme System](#theme-system)
  - [Light & Dark Themes](#light--dark-themes)
  - [Semantic Layer](#semantic-layer)
- [Utility Classes](#utility-classes)
- [Helpers](#helpers)
- [Sass API — Functions](#sass-api--functions)
- [Sass API — Mixins](#sass-api--mixins)
- [Responsive Engine](#responsive-engine)
  - [Breakpoints](#breakpoints)
  - [Fluid Typography](#fluid-typography)
  - [Container Queries](#container-queries)
- [Accessibility](#accessibility)
- [Base & Reset](#base--reset)
- [TypeScript Mirror](#typescript-mirror)
- [Build](#build)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

`@mastors/core` is the foundation of the Mastors SCSS ecosystem — a utility-first, token-driven SCSS library that provides everything you need to build consistent, themeable, and accessible UIs. It is the single source of truth for every `@mastors/*` package and can equally be consumed standalone.

The full stylesheet compiles in this strict order:

```
config → abstracts → variables → tokens → functions → mixins
  → base → themes → semantic → responsive → helpers → utilities → accessibility
```

Every class and custom property produced by the library is driven by SCSS maps. Adding or overriding a single token automatically propagates to every utility, semantic variable, and CSS custom property that references it — with zero manual updates.

---

**Stats at a glance:**

| | |
|---|---|
| Utility modules | 18 |
| Token types | 10 |
| Breakpoints | 6 |
| Themes | Light + Dark (+ custom named themes) |
| Sass peer requirement | `>= 1.80.0` |
| Current version | `1.2.7` |

---

### 1. Design Token System

The token system is the bedrock of `@mastors/core`. All visual constants live in typed SCSS maps and are automatically emitted as namespaced CSS custom properties on `:root` (`--mastors-*`). Tokens cover:

| Token category | CSS property prefix | What it drives |
|---|---|---|
| **Color** | `--mastors-color-{palette}-{shade}` | 6 palettes × 11 shades (50–950) + white, black, transparent |
| **Spacing** | `--mastors-spacing-{key}` | 35-step scale, 0 → 24rem, used for margin / padding / gap utilities |
| **Sizing** | `--mastors-sizing-{key}` | Width / height fractions, viewport units, and keyword values |
| **Typography** | `--mastors-font-{size\|weight\|family}-{key}` | 13 font-sizes (xs–9xl), 9 weights, 3 families, line-heights, letter-spacing |
| **Shadows** | `--mastors-shadow-{key}` | 8 elevation levels: xs, sm, md, lg, xl, 2xl, inner, none |
| **Radii** | `--mastors-radius-{key}` | 9 steps: none (0) → full (9999px) |
| **Opacity** | `--mastors-opacity-{key}` | 15-step scale: 0 → 100 |
| **Z-index** | `--mastors-z-{key}` | 9 named layers: base, raised, dropdown, sticky, overlay, modal, toast, tooltip, max |
| **Durations** | `--mastors-duration-{key}` | 8 steps: 75ms → 1000ms |
| **Easings** | `--mastors-easing-{key}` | linear, in, out, in-out, bounce |

---

### 2. Sass Functions

A library of pure Sass functions that produce zero CSS output on their own. They are called inside your own rules to compute values at compile time, then inline the result directly in the declaration.

| Category | Functions |
|---|---|
| **Unit conversion** | `rem($px)` converts px to rem; `em($px, $base?)` converts px to em |
| **Token accessors** | `color($name, $shade)`, `spacing($key)`, `radius($key)`, `shadow($key)`, `z($key)`, `opacity($key)`, `duration($key)`, `easing($key)` |
| **CSS variable emitter** | `vars($token, $fallback?)` emits `var(--mastors-{token})` with an optional CSS fallback |
| **Color manipulation** | `tint($color, $pct)` mixes toward white; `shade($color, $pct)` mixes toward black; `alpha($color, $opacity)` sets the alpha channel; `contrast($bg)` returns black or white for the highest contrast; `palette($name, $shade)`, `rgb-color($name, $shade, $opacity)`, `color-ramp($base, $steps, $dir)` |
| **Math / fluid** | `fluid($min, $max, $min-vw?, $max-vw?)` generates a `clamp()` expression; `clamp-value($min, $val, $max)`, `strip-unit($value)`, `round-to($val, $decimals?)`, `lerp($a, $b, $t)` |
| **Map helpers** | `map-deep-get($map, $keys...)` for deeply nested map access; `map-collect($maps...)` for shallow merging multiple maps |

---

### 3. Sass Mixins

Mixins output CSS when `@include`d. They encapsulate repetitive patterns — media queries, theme selectors, transition declarations, pseudo-element boilerplate — so your component SCSS stays focused on intent.

| Mixin | What it outputs |
|---|---|
| `bp($key)` | Mobile-first `@media (min-width: …)` block for the given breakpoint key (xs / sm / md / lg / xl / 2xl) |
| `breakpoint-up($key)` / `respond-to($key)` | Aliases for `bp()`, identical output |
| `breakpoint-down($key)` | Max-width `@media (max-width: …)` block, useful for overriding styles below a breakpoint |
| `container($size?)` | Responsive max-width container: `width: 100%`, `margin-inline: auto`, `padding-inline: 1rem`, with per-breakpoint `max-width` steps |
| `elevation($level)` | Applies `box-shadow` using the shadow token at the given level key (xs → 2xl, inner, none) |
| `transition($props, $duration, $easing)` | Multi-property `transition` built from duration and easing token keys — no raw ms values needed |
| `pseudo($display, $pos, $content)` | Sets `content`, `display`, and `position` on `::before` / `::after` in a single call, eliminating the repetitive boilerplate |
| `dark-mode` | Wraps a block in the active dark-mode selector strategy: `.dark &` (class mode, default) or `@media (prefers-color-scheme: dark)` (media mode) |
| `light-mode` | Wraps a block in the active light-mode selector strategy |
| `theme($name)` | Scopes a block under `[data-theme="name"]` — enables multiple custom named themes on the same page |
| `cq($size, $name?)` | CSS container query: `@container (min-inline-size: …)` with optional container name |
| `fluid-type($min, $max, $min-bp?, $max-bp?)` | Sets `font-size` to a `clamp()` expression that scales smoothly between two viewport widths — no breakpoints needed |

---

### 4. Base & Reset

When the full stylesheet is imported, the base layer fires first. It applies an opinionated modern CSS reset then emits all token-based CSS custom properties on `:root`. The reset ensures a consistent rendering baseline across browsers:

- `box-sizing: border-box` on every element and pseudo-element so padding and border are included in the declared size
- Zeroed `margin` and `padding` everywhere — all whitespace is intentional and explicit
- `scroll-behavior: smooth` and `tab-size: 4` on `<html>`
- `-webkit-font-smoothing: antialiased` on `<body>` for crisper sub-pixel text rendering
- `display: block; max-width: 100%` on `img`, `picture`, `video`, `canvas`, `svg` — images never overflow their container
- `font: inherit` on all form elements (`input`, `button`, `textarea`, `select`) so typography is consistent
- `overflow-wrap: break-word` on all heading and paragraph elements to prevent horizontal overflow on narrow viewports
- `list-style: none` on `ol` and `ul` — styles are applied deliberately via utility classes
- `color: inherit; text-decoration: inherit` on all `<a>` tags — link appearance is controlled by the component, not the browser
- `border-collapse: collapse; border-spacing: 0` on `<table>` for predictable table layouts
- `cursor: pointer` on `button` and `[role="button"]` so interactive intent is always clear
- `:focus:not(:focus-visible) { outline: none }` — suppresses focus outlines for mouse users, preserving them only for keyboard navigation

---

### 5. CSS Custom Properties

Every token map is emitted onto `:root` as a flat list of CSS custom properties during the base compile step. This means every token value is available natively in CSS, JavaScript, and any framework — no build step, no import, no plugin. Switching a theme at runtime simply means redefining a subset of these properties on a scoped selector; all components consuming them update instantly.

```css
:root {
  --mastors-color-primary-500:  #3b82f6;
  --mastors-color-success-500:  #22c55e;
  --mastors-spacing-4:          1rem;
  --mastors-font-size-xl:       1.25rem;
  --mastors-font-weight-bold:   700;
  --mastors-radius-md:          0.375rem;
  --mastors-shadow-md:          0 4px 6px -1px rgb(0 0 0 / 10%), ...;
  --mastors-duration-300:       300ms;
  --mastors-easing-in-out:      cubic-bezier(0.4, 0, 0.2, 1);
  --mastors-z-modal:            400;
  --mastors-opacity-50:         0.5;
}
```

---

### 6. Theme System

`@mastors/core` ships a two-tier theme system that separates raw palette data from semantic role assignments:

**Tier 1 — Primitive tokens:** Raw color values (`--mastors-color-primary-500`, etc.) that are defined once and never change between themes. They form the color vocabulary.

**Tier 2 — Semantic variables:** Role-based SCSS variables (`$color-surface`, `$color-text`, `$color-border`, `$color-accent`, …) that map to CSS custom properties and are redefined per theme. Components built with semantic variables require zero changes to support a new theme.

**Light / dark strategy:** Configurable per project. The default is class-based: adding `.dark` to any ancestor element activates the dark theme. Switch to `"media"` to follow `prefers-color-scheme` automatically for a system-driven approach.

**Named custom themes:** Any number of additional named themes can be created with `@include theme("name") { … }` in SCSS and activated by adding `data-theme="name"` to any HTML element — scoped to that element and its subtree.

---

### 7. Utility Classes

18 utility modules are generated from token maps. Every class name is deterministic and follows the pattern `{property}-{token-key}`. Responsive variants are generated on demand and follow `{breakpoint}:{utility}`.

| Module | Classes generated |
|---|---|
| **Spacing** | `m-{key}`, `p-{key}`, `mx-`, `my-`, `px-`, `py-`, `mt-`, `mb-`, `ml-`, `mr-`, `pt-`, `pb-`, `pl-`, `pr-`, `ms-`, `me-`, `ps-`, `pe-` (logical properties), `gap-{key}`, `gap-x-`, `gap-y-`, `m-auto`, `mx-auto` |
| **Display** | `block`, `inline-block`, `inline`, `flex`, `inline-flex`, `grid`, `inline-grid`, `table`, `contents`, `hidden` — all with `{bp}:` responsive variants |
| **Position** | `static`, `relative`, `absolute`, `fixed`, `sticky` with `top-`, `right-`, `bottom-`, `left-`, `inset-`, `inset-x-`, `inset-y-` directional variants |
| **Sizing** | `w-{key}`, `h-{key}`, `min-w-`, `max-w-`, `min-h-`, `max-h-` drawn from the sizing token map (fractions, viewport units, content keywords) |
| **Typography** | `text-{size}`, `font-{weight}`, `font-{family}`, `text-{align}` (responsive), `leading-{key}`, `tracking-{key}`, `underline`, `line-through`, `no-underline`, `decoration-wavy`, `decoration-{n}`, `uppercase`, `lowercase`, `capitalize`, `italic`, `not-italic`, `antialiased`, `text-ellipsis`, `whitespace-nowrap`, `break-words`, `break-all`, `break-keep`, `list-disc`, `list-decimal`, `list-inside` |
| **Colors** | `text-{semantic}`, `text-{palette}-{shade}`, `text-white`, `text-black`, `text-current`, `text-transparent`, `bg-{semantic}`, `bg-{palette}-{shade}`, `bg-white`, `bg-transparent`, `border-{semantic}`, `border-{palette}-{shade}` |
| **Borders** | `border`, `border-0`, `border-2`, `border-4`, `border-t`, `border-r`, `border-b`, `border-l`, `border-solid`, `border-dashed`, `border-dotted`, `rounded-{key}`, `rounded-t-{key}`, `rounded-b-{key}`, `rounded-l-{key}`, `rounded-r-{key}` |
| **Shadows** | `shadow-xs`, `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-inner`, `shadow-none` |
| **Opacity** | `opacity-0`, `opacity-5`, `opacity-10`, `opacity-25`, `opacity-50`, `opacity-75`, `opacity-90`, `opacity-100` (and all intermediate steps) |
| **Transform** | `translate-x-{key}`, `translate-y-{key}`, `-translate-{axis}-{key}` (negative), `rotate-{n}`, `-rotate-{n}`, `scale-{n}`, `scale-x-{n}`, `scale-y-{n}`, `origin-{key}`, `transform-gpu`, `transform-none` |
| **Animation** | `animate-spin`, `animate-ping`, `animate-pulse`, `animate-bounce`, `animate-fade-in`, `animate-fade-out`, `animate-slide-up`, `animate-slide-down`, `animate-scale-in`, `animate-none`, `animate-repeat-infinite`, `animate-repeat-{n}` |
| **Transitions** | `transition`, `transition-colors`, `transition-opacity`, `transition-transform`, `transition-shadow`, `transition-none`, `duration-{key}`, `ease-{key}`, `delay-{key}`, `fill-forwards`, `fill-both`, `animation-paused`, `animation-running` |
| **Overflow** | `overflow-auto`, `overflow-hidden`, `overflow-scroll`, `overflow-visible`, `overflow-clip`, `overflow-x-{value}`, `overflow-y-{value}` |
| **Cursor** | `cursor-auto`, `cursor-default`, `cursor-pointer`, `cursor-wait`, `cursor-text`, `cursor-move`, `cursor-not-allowed`, `cursor-grab`, `cursor-grabbing`, `cursor-zoom-in`, `cursor-crosshair`, `cursor-none` |
| **Interaction** | `select-none`, `select-text`, `select-all`, `resize-none`, `resize-y`, `resize`, `scroll-smooth`, `snap-x`, `snap-mandatory`, `snap-start`, `snap-center`, `touch-pan-x`, `touch-manipulation`, `touch-none`, `pointer-events-none`, `pointer-events-auto`, `hover:*`, `focus:*`, `disabled:*` |
| **Layout** | `aspect-auto`, `aspect-square`, `aspect-video`, `aspect-4-3`, `aspect-3-2`, `aspect-21-9`, `aspect-9-16`, `aspect-golden`, `object-cover`, `object-contain`, `object-fill`, `object-scale-down`, `object-center`, `object-top`, `object-bottom`, `object-left`, `float-left`, `float-right`, `float-none`, `isolate`, `mix-blend-{mode}`, `bg-blend-{mode}`, `appearance-none`, `will-change-transform`, `will-change-scroll` |
| **Z-index** | `z-base` (0), `z-raised` (10), `z-dropdown` (100), `z-sticky` (200), `z-overlay` (300), `z-modal` (400), `z-toast` (500), `z-tooltip` (600), `z-max` (9999) |

---

### 8. Helpers

Pre-built single-purpose helper classes for patterns that are too specific for the generator but common enough to ship by default.

| Helper class | What it does |
|---|---|
| `truncate` | Clips text to one line with a trailing ellipsis — sets `overflow: hidden`, `white-space: nowrap`, `text-overflow: ellipsis` |
| `line-clamp-1` – `line-clamp-6` | Clamps multi-line text to N visible lines using `-webkit-line-clamp` and `overflow: hidden` |
| `break-words` | Allows long words to break at any character boundary to prevent horizontal container overflow |
| `break-all` | Forces a break at any character boundary regardless of word boundaries |
| `break-keep` | Prevents word breaks in CJK text, keeping words whole |
| `ratio-square` | Locks the element to a 1:1 aspect ratio using `aspect-ratio: 1 / 1` |
| `ratio-video` | Locks to 16:9 — the standard widescreen video ratio |
| `ratio-portrait` | Locks to 3:4 — portrait orientation |
| `ratio-wide` | Locks to 21:9 — ultra-wide cinematic ratio |
| `ratio-golden` | Locks to the golden ratio (1.618 : 1) |
| `clearfix` | Clears floated children by injecting `::after { content: ""; display: table; clear: both }` |

---

### 9. Accessibility Classes

Accessibility utilities are a first-class citizen in `@mastors/core`, not an afterthought. The accessibility layer covers screen-reader visibility, keyboard focus management, motion preferences, and print output — all without requiring any JavaScript.

| Class | What it does |
|---|---|
| `sr-only` | Hides an element visually while keeping it fully reachable by screen readers — uses the standard clip/1px/overflow-hidden technique |
| `not-sr-only` | Reverses `sr-only`, restoring normal visual rendering |
| `visually-hidden` | Alias of `sr-only` — same output, alternative naming convention |
| `vh` | Shorthand alias of `sr-only` for compact markup |
| `visually-hidden-focusable` | Invisible until it receives keyboard focus — the standard skip-link pattern (`Skip to main content`) |
| `print:hidden` | Hides the element when the document is printed via `@media print { display: none }` |
| `screen:hidden` | Makes the element invisible on screen but visible in print — useful for print-only watermarks or headers |
| `print:break-inside-avoid` | Prevents the browser's print engine from inserting a page break inside the element |
| `print:break-before` | Forces a new page to start immediately before this element when printing |
| `print:break-after` | Forces a new page to start immediately after this element when printing |
| `print:text-black` | Overrides text color to `#000` in print media for guaranteed legibility |
| `print:bg-white` | Overrides background to `#fff` in print media to avoid wasted ink on dark backgrounds |
| `print:shadow-none` | Removes `box-shadow` when printing — shadows rarely print well and add visual noise |
| `print:border-none` | Removes `border` when printing for a cleaner, document-like output |

Two global rules are applied automatically with no class required:

- **Focus ring** — `:focus-visible` receives `outline: 2px solid var(--mastors-color-primary-500)` with a 2px offset so keyboard users always have a visible focus indicator. Mouse users see no ring because `:focus:not(:focus-visible) { outline: none }` cancels it for pointer interactions.
- **Reduced motion** — A `@media (prefers-reduced-motion: reduce)` block collapses all `animation-duration`, `transition-duration`, and `animation-iteration-count` values to near-zero for users who have requested reduced motion in their OS accessibility settings. This covers every animation in the library — no opt-in needed.

---

### 10. Responsive Engine

The responsive engine wraps the utility generator to produce breakpoint-prefixed class variants. Any utility module can opt in by setting `responsive: true` in its generator config map.

Breakpoints follow a **mobile-first** strategy. The `xs` key is the base (no prefix applied) and each subsequent key adds a `min-width` condition. Write base styles first, then add overrides at larger breakpoints:

| Prefix | Media condition | Target |
|---|---|---|
| *(none)* | All viewports — `xs` base | Mobile and up |
| `sm:` | `@media (min-width: 640px)` | Large phones and up |
| `md:` | `@media (min-width: 768px)` | Tablets and up |
| `lg:` | `@media (min-width: 1024px)` | Laptops and up |
| `xl:` | `@media (min-width: 1280px)` | Desktops and up |
| `2xl:` | `@media (min-width: 1536px)` | Wide screens and up |

Beyond breakpoints, the engine also provides:

- **Fluid typography** via `clamp()` — font sizes that scale smoothly across a viewport range with no discrete breakpoints, using the `fluid-type()` mixin or `apply-fluid-type()` function.
- **Container queries** — component-level responsiveness via `@container` queries rather than viewport width, using the `cq()` mixin and `cq-inline` / `cq-size` utility classes.

---

### 11. TypeScript Mirror

A fully-typed `tokens` object is exported from the package's JavaScript / TypeScript entry point. It mirrors every SCSS token map at runtime and is **auto-generated** by `scripts/generate-tokens.js` at build time — always in sync with the SCSS source, never manually edited.

```ts
import { tokens } from '@mastors/core'
import type { Breakpoint, SpacingKey, ColorPalette } from '@mastors/core'

tokens.color.primary['600']   // '#2563eb'
tokens.spacing['4']           // '1rem'
tokens.breakpoints['md']      // '768px'
```

---

All other `@mastors/*` packages consume `@mastors/core/api` as a peer dependency.

> All token-generated classes are driven by SCSS maps. The library uses **CSS custom properties** so themes update at runtime without a rebuild.

---

## Installation

```bash
npm install @mastors/core
# or
pnpm add @mastors/core
# or
yarn add @mastors/core
```

Requires `sass >= 1.80.0` as a peer dependency:

```bash
npm install --save-dev sass
```

---

## Import & Usage

The main entry point compiles the full library in this order:
`config → abstracts → variables → tokens → functions → mixins → base → themes → semantic → responsive → helpers → utilities → accessibility`

### Full import (outputs all CSS)

```scss
@use "@mastors/core";
// or via loadPaths (no bundler alias required)
@use "@mastors/core"; // resolves _index.scss at root
```

### Public API — zero CSS output

```scss
@use "@mastors/core/api" as m;

.card {
  padding:       m.spacing(6);
  color:         m.color("primary", 700);
  border-radius: m.radius("lg");
  box-shadow:    m.vars(shadow-md);
  transition:    transform m.vars(duration-200) m.vars(ease-out);

  @include m.bp("md") {
    padding: m.spacing(10);
  }

  @include m.dark-mode {
    color: m.color("primary", 300);
  }
}
```

### Selective partial import

```scss
@use "@mastors/core/scss/tokens/color"      as ct;
@use "@mastors/core/scss/tokens/spacing"    as sp;
@use "@mastors/core/scss/mixins/breakpoint" as *;

.card {
  padding:    sp.spacing(4);
  background: ct.color("primary", 50);

  @include bp(md) {
    padding: sp.spacing(8);
  }
}
```

### Using the `vars()` function

```scss
@use "@mastors/core/scss/functions/vars" as *;

.btn {
  background:    vars(accent);
  color:         vars(accent-text);
  padding:       vars(spacing-2) vars(spacing-4);
  border-radius: vars(radius-md);
  box-shadow:    vars(shadow-sm, none); // with fallback
}
```

### JavaScript / TypeScript

```ts
import { tokens } from '@mastors/core'
import type { Breakpoint, SpacingKey, ColorPalette } from '@mastors/core'

const primary = tokens.color.primary['600']  // '#2563eb'
const space4  = tokens.spacing['4']          // '1rem'
```

---

## Package Exports

```json
{
  ".": {
    "sass":    "./scss/index.scss",
    "import":  "./dist/index.mjs",
    "require": "./dist/index.js",
    "types":   "./dist/index.d.ts"
  },
  "./scss":                  "./scss/index.scss",
  "./scss/*":                "./scss/*",
  "./api":                   "./scss/api/_index.scss",
  "./dist/mastors-core.css": "./dist/mastors-core.css"
}
```

---

## Design Tokens

### Colors

Palette keys: `primary`, `secondary`, `neutral`, `success`, `warning`, `danger`, `info`
Shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`

Each color is also emitted as a CSS custom property: `--mastors-color-{palette}-{shade}`

```scss
@use "@mastors/core/scss/tokens/color" as ct;

$blue:     ct.color("primary", 500); // → #3b82f6
$green-50: ct.color("success", 50);  // → #f0fdf4
$white:    ct.color("white");        // → #fff
```

| Palette | 500 (base) |
|---|---|
| `primary` | `#3b82f6` |
| `success` | `#22c55e` |
| `warning` | `#f59e0b` |
| `error` / `danger` | `#ef4444` |
| `info` | `#06b6d4` |
| `neutral` | `#6b7280` |

---

### Spacing

A complete scale from `0` to `96` (0 → 24rem). Emitted as `--mastors-spacing-{key}`.

```scss
@use "@mastors/core/scss/tokens/spacing" as sp;

.btn { padding: sp.spacing(2) sp.spacing(4); }
// → padding: 0.5rem 1rem;
```

| Key | Value | px |
|---|---|---|
| `0` | `0px` | 0 |
| `px` | `1px` | 1px |
| `0.5` | `0.125rem` | 2px |
| `1` | `0.25rem` | 4px |
| `1.5` | `0.375rem` | 6px |
| `2` | `0.5rem` | 8px |
| `2.5` | `0.625rem` | 10px |
| `3` | `0.75rem` | 12px |
| `4` | `1rem` | 16px |
| `5` | `1.25rem` | 20px |
| `6` | `1.5rem` | 24px |
| `8` | `2rem` | 32px |
| `10` | `2.5rem` | 40px |
| `12` | `3rem` | 48px |
| `16` | `4rem` | 64px |
| `20` | `5rem` | 80px |
| `24` | `6rem` | 96px |
| `32` | `8rem` | 128px |
| `40` | `10rem` | 160px |
| `48` | `12rem` | 192px |
| `64` | `16rem` | 256px |
| `80` | `20rem` | 320px |
| `96` | `24rem` | 384px |

Full key list: `0, px, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96` + `auto` (margin only).

---

### Sizing

Width/height scale including fractional percentages, viewport units, and keyword values. Emitted as `--mastors-sizing-{key}`.

```scss
@use "@mastors/core/scss/tokens/sizing" as sz;

.hero { width: sz.sizing("full"); height: sz.sizing("screen"); }
.card { width: sz.sizing("1/3"); max-width: sz.sizing(64); }
```

| Key | Value |
|---|---|
| `0` | `0` |
| `1/2` | `50%` |
| `1/3` | `33.3333%` |
| `2/3` | `66.6667%` |
| `1/4` | `25%` |
| `3/4` | `75%` |
| `full` | `100%` |
| `screen` | `100vw` |
| `svw` | `100svw` |
| `dvw` | `100dvw` |
| `auto` | `auto` |
| `min` | `min-content` |
| `max` | `max-content` |
| `fit` | `fit-content` |

---

### Typography

Font sizes (xs–9xl), weights (thin–black), families (sans/serif/mono), line heights, and letter spacing. Emitted as CSS custom properties.

```scss
@use "@mastors/core/scss/tokens/typography" as ty;

h1 {
  font-size:      ty.font-size("4xl");         // 2.25rem
  font-weight:    ty.font-weight("bold");       // 700
  line-height:    ty.line-height("tight");      // 1.25
  letter-spacing: ty.letter-spacing("tight");   // -0.025em
}

code { font-family: ty.font-family("mono"); }
```

**Font sizes:**

| Key | Value |
|---|---|
| `xs` | `0.75rem` |
| `sm` | `0.875rem` |
| `base` | `1rem` |
| `lg` | `1.125rem` |
| `xl` | `1.25rem` |
| `2xl` | `1.5rem` |
| `3xl` | `1.875rem` |
| `4xl` | `2.25rem` |
| `5xl` | `3rem` |
| `6xl` | `3.75rem` |
| `7xl` | `4.5rem` |
| `8xl` | `6rem` |
| `9xl` | `8rem` |

**Font weights:**

| Key | Value |
|---|---|
| `thin` | `100` |
| `extralight` | `200` |
| `light` | `300` |
| `normal` | `400` |
| `medium` | `500` |
| `semibold` | `600` |
| `bold` | `700` |
| `extrabold` | `800` |
| `black` | `900` |

**Line heights:** `none` (1), `tight` (1.25), `snug` (1.375), `normal` (1.5), `relaxed` (1.625), `loose` (2)

**Letter spacing:** `tighter` (-0.05em), `tight` (-0.025em), `normal` (0), `wide` (0.025em), `wider` (0.05em), `widest` (0.1em)

---

### Shadows

8 elevation steps. Emitted as `--mastors-shadow-{key}`.

```scss
@use "@mastors/core/scss/tokens/shadows" as sh;

.card  { box-shadow: sh.shadow("md"); }
.modal { box-shadow: sh.shadow("2xl"); }
.input { box-shadow: sh.shadow("inner"); }
```

| Key | Use case |
|---|---|
| `xs` | Subtle outlines |
| `sm` | Cards, inputs |
| `md` | Default elevation |
| `lg` | Dropdowns |
| `xl` | Modals, popovers |
| `2xl` | Large dialogs |
| `inner` | Inset / pressed state |
| `none` | Remove shadow |

---

### Radii

Border-radius scale from `none` (0) to `full` (9999px). Emitted as `--mastors-radius-{key}`.

```scss
@use "@mastors/core/scss/tokens/radii" as ra;

.btn   { border-radius: ra.radius("md"); }   // 0.375rem
.badge { border-radius: ra.radius("full"); } // 9999px
.card  { border-radius: ra.radius("xl"); }   // 0.75rem
```

| Key | Value |
|---|---|
| `none` | `0` |
| `sm` | `0.125rem` |
| `base` | `0.25rem` |
| `md` | `0.375rem` |
| `lg` | `0.5rem` |
| `xl` | `0.75rem` |
| `2xl` | `1rem` |
| `3xl` | `1.5rem` |
| `full` | `9999px` |

---

### Opacity

17-step opacity scale 0–100. Emitted as `--mastors-opacity-{key}`.

```scss
@use "@mastors/core/scss/tokens/opacity" as op;

.overlay  { opacity: op.opacity(50); }  // → 0.5
.disabled { opacity: op.opacity(30); }  // → 0.3
```

| Key | Value |
|---|---|
| `0` | `0` |
| `5` | `0.05` |
| `10` | `0.1` |
| `20` | `0.2` |
| `25` | `0.25` |
| `30` | `0.3` |
| `40` | `0.4` |
| `50` | `0.5` |
| `60` | `0.6` |
| `70` | `0.7` |
| `75` | `0.75` |
| `80` | `0.8` |
| `90` | `0.9` |
| `95` | `0.95` |
| `100` | `1` |

---

### Z-Index

Named stacking layers for predictable layering. Emitted as `--mastors-z-{key}`.

```scss
@use "@mastors/core/scss/tokens/z-index" as zi;

.dropdown { z-index: zi.z("dropdown"); } // 100
.modal    { z-index: zi.z("modal"); }    // 400
.toast    { z-index: zi.z("toast"); }    // 500
```

| Key | Value | Intended use |
|---|---|---|
| `base` | `0` | Default document flow |
| `raised` | `10` | Slightly elevated elements |
| `dropdown` | `100` | Dropdown menus |
| `sticky` | `200` | Sticky headers / sidebars |
| `overlay` | `300` | Overlay backdrops |
| `modal` | `400` | Modal dialogs |
| `toast` | `500` | Toast notifications |
| `tooltip` | `600` | Tooltips |
| `max` | `9999` | Escape hatch |

---

### Transitions

Duration tokens (75ms–1000ms) and easing curves. Emitted as `--mastors-duration-{key}` and `--mastors-easing-{key}`.

```scss
@use "@mastors/core/scss/tokens/transitions" as tr;

.btn {
  transition: background-color tr.duration("150") tr.easing("in-out");
}
```

**Durations:**

| Key | Value |
|---|---|
| `75` | `75ms` |
| `100` | `100ms` |
| `150` | `150ms` |
| `200` | `200ms` |
| `300` | `300ms` |
| `500` | `500ms` |
| `700` | `700ms` |
| `1000` | `1000ms` |

**Easings:**

| Key | Value |
|---|---|
| `linear` | `linear` |
| `in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `out` | `cubic-bezier(0, 0, 0.2, 1)` |
| `in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

---

## Theme System

### Light & Dark Themes

Themes are toggled via `.dark` / `[data-theme="dark"]` on any ancestor element (class strategy, default), or via `prefers-color-scheme` (media strategy). Themes redefine semantic custom properties — no class changes needed on individual components.

```html
<!-- Class strategy (default) -->
<html class="dark">
<!-- or -->
<html data-theme="dark">

<!-- Toggle with JS -->
<script>
  document.documentElement.classList.toggle('dark');
</script>
```

```scss
// Override dark strategy to media query:
// In your entry SCSS, before @use "@mastors/core"
$dark-mode-strategy: "media"; // default: "class"
@use "@mastors/core";
```

**Light theme custom properties (selection):**

| Property | Value |
|---|---|
| `--mastors-bg` | `#fff` |
| `--mastors-bg-subtle` | `#f9fafb` |
| `--mastors-text` | `#111827` |
| `--mastors-accent` | `#2563eb` |
| `--mastors-border` | `#e5e7eb` |

**Dark theme custom properties (selection):**

| Property | Value |
|---|---|
| `--mastors-bg` | `#030712` |
| `--mastors-bg-subtle` | `#111827` |
| `--mastors-text` | `#f9fafb` |
| `--mastors-accent` | `#60a5fa` |
| `--mastors-border` | `#374151` |

Custom named theme:

```scss
@include m.theme("ocean") {
  --mastors-accent: #0891b2;
}
```

```html
<div data-theme="ocean">...</div>
```

---

### Semantic Layer

Role-based SCSS variables that map to CSS custom properties. Use these in your components instead of raw token references — they update automatically when the theme changes.

```scss
@use "@mastors/core/scss/semantic/colors"     as sc;
@use "@mastors/core/scss/semantic/spacing"    as ss;
@use "@mastors/core/scss/semantic/typography" as st;

.card {
  background:  sc.$color-surface;
  color:       sc.$color-text;
  border:      1px solid sc.$color-border;
  padding:     ss.$space-component;
  font-family: st.$font-body;
}
```

| Variable | Custom Property | Role |
|---|---|---|
| `$color-bg` | `--mastors-bg` | Page background |
| `$color-surface` | `--mastors-surface` | Card / panel surface |
| `$color-surface-raised` | `--mastors-surface-raised` | Dropdowns, tooltips |
| `$color-text` | `--mastors-text` | Primary text |
| `$color-text-muted` | `--mastors-text-muted` | Secondary text |
| `$color-text-subtle` | `--mastors-text-subtle` | Placeholder / tertiary |
| `$color-border` | `--mastors-border` | Default border |
| `$color-accent` | `--mastors-accent` | Brand / primary action |
| `$color-accent-hover` | `--mastors-accent-hover` | Accent hover state |
| `$space-inline` | `0.25rem` (spacing(1)) | Tight inline gap |
| `$space-component` | `1rem` (spacing(4)) | Component padding |
| `$space-section` | `4rem` (spacing(16)) | Between sections |

---

## Utility Classes

### Spacing

Margin, padding, and gap utilities generated from spacing tokens. Supports all directional variants, logical properties, and `auto` for margins.

```html
<!-- Margin -->
<div class="m-4">margin: 1rem</div>
<div class="mx-auto">margin-inline: auto</div>
<div class="my-8">margin-block: 2rem</div>
<div class="mt-2 mb-6">top + bottom</div>
<div class="ms-4 me-4">inline-start/end (logical)</div>

<!-- Padding -->
<div class="p-6">padding: 1.5rem</div>
<div class="px-4 py-2">padding-x + padding-y</div>
<div class="ps-4 pe-4">padding-inline-start/end</div>

<!-- Gap -->
<div class="flex gap-4">gap: 1rem</div>
<div class="grid gap-x-6 gap-y-3">column + row gap</div>
```

---

### Display

Generates display classes including responsive variants (`md:flex`, `lg:hidden`).

```html
<div class="block">         <!-- display: block -->
<div class="inline-block">
<div class="inline">
<div class="flex">
<div class="inline-flex">
<div class="grid">
<div class="inline-grid">
<div class="contents">
<div class="hidden">        <!-- display: none -->

<!-- Responsive -->
<div class="hidden md:block">Shows from md up</div>
<div class="flex lg:hidden">Hidden from lg up</div>
```

---

### Position

```html
<div class="relative">
  <div class="absolute top-0 right-0">top-right corner</div>
  <div class="absolute inset-0">full overlay</div>
  <div class="absolute inset-x-0 bottom-0">bottom bar</div>
</div>

<div class="sticky top-0">Sticky header</div>
<div class="fixed bottom-0 right-0">Floating btn</div>
```

Inset keys: `0`, `auto`, `full` (100%), `1/2` (50%)

---

### Sizing

Width and height utilities generated from sizing tokens. Includes `min-*` and `max-*` variants.

```html
<div class="w-full h-screen">Full width, screen height</div>
<div class="w-1/2 h-32">50% width, 8rem height</div>
<div class="w-fit">Width: fit-content</div>

<!-- Min / Max -->
<div class="min-w-0 max-w-prose">Prose width (65ch)</div>
<div class="min-h-screen">Min 100vh</div>
<div class="min-h-svh">Min 100svh (small viewport)</div>
<div class="min-h-dvh">Min 100dvh (dynamic viewport)</div>
```

---

### Typography Utilities

Text size, weight, family, alignment, leading, tracking, decoration, transform, whitespace, word-break, and more. Most classes have responsive variants.

```html
<!-- Size: text-xs text-sm text-base text-lg text-xl text-2xl … text-9xl -->
<!-- Weight: font-thin font-light font-normal font-medium font-semibold font-bold font-extrabold font-black -->
<!-- Family: font-sans font-serif font-mono -->
<!-- Align (responsive): text-left text-center text-right md:text-center -->
<!-- Line height: leading-none leading-tight leading-normal leading-relaxed leading-loose -->
<!-- Letter spacing: tracking-tight tracking-normal tracking-wide tracking-widest -->
<!-- Decoration: underline line-through no-underline decoration-wavy -->
<!-- Transform: uppercase lowercase capitalize -->
<!-- Style: italic not-italic -->
<!-- Misc: antialiased text-ellipsis whitespace-nowrap break-words -->
<!-- Lists: list-disc list-inside list-decimal -->
```

---

### Color Utilities

Text color, background color, and border color classes for both semantic and primitive palettes.

```html
<!-- Semantic text -->
<p class="text-default">   <p class="text-muted">
<p class="text-subtle">    <p class="text-accent">
<p class="text-inverse">

<!-- Primitive text: text-{palette}-{shade} -->
<p class="text-primary-600">  <p class="text-success-500">
<p class="text-error-500">    <p class="text-white">

<!-- Semantic backgrounds -->
<div class="bg-default">  <div class="bg-subtle">
<div class="bg-surface">  <div class="bg-accent">

<!-- Primitive backgrounds: bg-{palette}-{shade} -->
<div class="bg-primary-50">   <div class="bg-neutral-100">
<div class="bg-warning-200">  <div class="bg-white">
<div class="bg-transparent">
```

---

### Borders

```html
<!-- Width: border border-0 border-2 border-4 border-t border-b border-l border-r -->
<!-- Style: border-dashed border-dotted border-solid -->
<!-- Color: border-default border-strong border-transparent border-primary-500 -->
<!-- Radius: rounded-none rounded-sm rounded rounded-md rounded-lg rounded-xl rounded-2xl rounded-3xl rounded-full -->
<!-- Directional: rounded-t-lg rounded-b-xl rounded-l-full rounded-r-md -->
```

---

### Shadows

```html
<div class="shadow-xs">    <div class="shadow-sm">
<div class="shadow">       <!-- md -->
<div class="shadow-md">    <div class="shadow-lg">
<div class="shadow-xl">    <div class="shadow-2xl">
<div class="shadow-inner"> <div class="shadow-none">
```

---

### Opacity

```html
<div class="opacity-0">   <div class="opacity-5">   <div class="opacity-10">
<div class="opacity-25">  <div class="opacity-50">  <div class="opacity-75">
<div class="opacity-90">  <div class="opacity-100">
```

---

### Transform

```html
<!-- Translate -->
<div class="translate-x-4">    <!-- translateX(1rem) -->
<div class="translate-y-2">    <!-- translateY(0.5rem) -->
<div class="-translate-y-1">   <!-- translateY(-0.25rem) -->
<div class="translate-x-full"> <!-- translateX(100%) -->

<!-- Rotate -->
<div class="rotate-45">   <div class="rotate-90">
<div class="rotate-180">  <div class="-rotate-45">

<!-- Scale -->
<div class="scale-50">   <div class="scale-100">
<div class="scale-105">  <div class="scale-110">
<div class="scale-x-75"> <!-- scaleX only -->

<!-- Origin -->
<div class="origin-center">  <div class="origin-top">
<div class="origin-bottom-right">

<!-- GPU -->
<div class="transform-gpu">   <!-- translateZ(0) -->
<div class="transform-none">
```

---

### Animation & Transitions

Built-in keyframe animations plus transition property, duration, easing, and delay utilities.

```html
<!-- Animations -->
<div class="animate-spin">      <div class="animate-ping">
<div class="animate-pulse">     <div class="animate-bounce">
<div class="animate-fade-in">   <div class="animate-fade-out">
<div class="animate-slide-up">  <div class="animate-slide-down">
<div class="animate-scale-in">  <div class="animate-none">

<!-- Transitions -->
<div class="transition">          <!-- all common properties -->
<div class="transition-colors">   <div class="transition-opacity">
<div class="transition-transform"> <div class="transition-shadow">
<div class="transition-none">

<!-- Duration: duration-75 duration-150 duration-300 duration-700 duration-1000 -->
<!-- Easing: ease-linear ease-in ease-out ease-in-out ease-bounce -->
<!-- Delay: delay-150 delay-300 delay-700 -->

<!-- Fill mode / play state -->
<div class="fill-forwards">       <div class="fill-both">
<div class="animation-paused">    <div class="animation-running">

<!-- Iteration -->
<div class="animate-repeat-infinite">  <div class="animate-repeat-1">
```

---

### Overflow

```html
<div class="overflow-auto">    <!-- scroll when needed -->
<div class="overflow-hidden">  <!-- clip content -->
<div class="overflow-scroll">  <!-- always scrollbar -->
<div class="overflow-visible">
<div class="overflow-clip">

<!-- Axis-specific -->
<div class="overflow-x-auto overflow-y-hidden">
```

---

### Cursor

```html
<div class="cursor-auto">         <div class="cursor-default">
<div class="cursor-pointer">      <div class="cursor-wait">
<div class="cursor-text">         <div class="cursor-move">
<div class="cursor-not-allowed">  <div class="cursor-grab">
<div class="cursor-grabbing">     <div class="cursor-zoom-in">
<div class="cursor-crosshair">    <div class="cursor-none">
```

---

### Interaction

User-select, resize, scroll behavior, scroll snap, touch action, pointer events, and state-variant utilities.

```html
<!-- User select -->
<div class="select-none">   <div class="select-text">   <div class="select-all">

<!-- Resize -->
<textarea class="resize-none">  <textarea class="resize-y">  <textarea class="resize">

<!-- Scroll -->
<div class="scroll-smooth">

<!-- Scroll snap -->
<div class="snap-x snap-mandatory overflow-x-auto">
  <div class="snap-start">  <div class="snap-center">
</div>

<!-- Touch -->
<div class="touch-pan-x">        <div class="touch-manipulation">
<div class="touch-none">

<!-- Pointer events -->
<div class="pointer-events-none">  <div class="pointer-events-auto">

<!-- State variants -->
<button class="hover:bg-accent hover:scale-105">Hover</button>
<button class="focus:ring focus:ring-2">Focus ring</button>
<button class="disabled:opacity-50 disabled:cursor-not-allowed">Disabled</button>
```

---

### Layout

Aspect ratio, object-fit, object-position, float, isolation, mix-blend-mode, background blend, appearance, and will-change.

```html
<!-- Aspect ratio -->
<div class="aspect-auto">    <div class="aspect-square">
<div class="aspect-video">   <!-- 16/9 -->
<div class="aspect-4-3">     <div class="aspect-21-9">
<div class="aspect-golden">  <!-- 1.618 -->

<!-- Object -->
<img class="object-cover">    <img class="object-contain">
<img class="object-center">   <img class="object-top">

<!-- Float (responsive) -->
<div class="float-left">  <div class="float-right">  <div class="float-none">
<div class="lg:float-right">

<!-- Misc -->
<div class="isolate">               <!-- new stacking context -->
<div class="mix-blend-multiply">
<div class="appearance-none">       <!-- custom selects -->
<div class="will-change-transform">
```

---

### Z-Index Utilities

```html
<div class="z-base">     <!-- 0 -->
<div class="z-raised">   <!-- 10 -->
<div class="z-dropdown"> <!-- 100 -->
<div class="z-sticky">   <!-- 200 -->
<div class="z-overlay">  <!-- 300 -->
<div class="z-modal">    <!-- 400 -->
<div class="z-toast">    <!-- 500 -->
<div class="z-tooltip">  <!-- 600 -->
<div class="z-max">      <!-- 9999 -->
```

---

## Helpers

Pre-built helper classes for common patterns.

### Truncate & Line Clamp

```html
<p class="truncate">Single line truncation with ellipsis</p>

<p class="line-clamp-1">Clamp to 1 line</p>
<p class="line-clamp-2">Clamp to 2 lines</p>
<p class="line-clamp-3">Clamp to 3 lines</p>
<p class="line-clamp-6">Clamp to 6 lines</p>

<p class="break-words">Break long overflow-wrap words</p>
<p class="break-all">Break at any character</p>
<p class="break-keep">Keep words together (CJK)</p>
```

### Ratio Helpers

```html
<div class="ratio-square">   <!-- 1:1 -->
<div class="ratio-video">    <!-- 16:9 -->
<div class="ratio-portrait"> <!-- 3:4 -->
<div class="ratio-wide">     <!-- 21:9 -->
<div class="ratio-golden">   <!-- 1.618 -->
```

### Clearfix

```html
<div class="clearfix">
  <img class="float-left" src="..." />
  <p>Text alongside float</p>
</div>
```

---

## Sass API — Functions

Pure Sass functions — zero CSS output when imported alone. Import via `@use "@mastors/core/scss/functions/..."` or all at once via `@use "@mastors/core/api" as m`.

### Summary Table

| Function | Signature | Description |
|---|---|---|
| `rem()` | `rem($px)` | Convert px to rem |
| `em()` | `em($px, $base?)` | Convert px to em |
| `color()` | `color($name, $shade)` | Look up a palette color by name and shade |
| `spacing()` | `spacing($key)` | Look up a spacing token |
| `radius()` | `radius($key)` | Look up a border-radius token |
| `shadow()` | `shadow($key)` | Look up a box-shadow token |
| `z()` | `z($key)` | Look up a z-index token |
| `opacity()` | `opacity($key)` | Look up an opacity token |
| `duration()` | `duration($key)` | Look up a transition duration |
| `easing()` | `easing($key)` | Look up an easing curve |
| `vars()` | `vars($token, $fallback?)` | Emit `var(--mastors-{token})` with optional fallback |
| `tint()` | `tint($color, $amount)` | Mix color toward white |
| `shade()` | `shade($color, $amount)` | Mix color toward black |
| `alpha()` | `alpha($color, $opacity)` | Set color opacity |
| `contrast()` | `contrast($bg)` | Returns black or white for best contrast |
| `palette()` | `palette($name, $shade)` | Shorthand palette accessor |
| `rgb-color()` | `rgb-color($name, $shade, $opacity)` | Palette color with optional alpha |
| `color-ramp()` | `color-ramp($base, $steps, $dir)` | Generate tint/shade ramp |
| `fluid()` / `fluid-type()` | `fluid($min, $max, $min-vw?, $max-vw?)` | Generate a fluid `clamp()` value |
| `clamp-value()` | `clamp-value($min, $val, $max)` | CSS `clamp()` shorthand |
| `strip-unit()` | `strip-unit($value)` | Remove unit from number |
| `round-to()` | `round-to($val, $decimals?)` | Round to N decimal places |
| `lerp()` | `lerp($a, $b, $t)` | Linear interpolation |
| `map-deep-get()` | `map-deep-get($map, $keys...)` | Deep nested map lookup |
| `map-collect()` | `map-collect($maps...)` | Shallow merge multiple maps |

---

### `rem()` and `em()`

```scss
@use "@mastors/core/scss/functions/rem" as *;
@use "@mastors/core/scss/functions/em"  as *;

.heading { font-size: rem(32px); }        // → 2rem
.media   { max-width: em(768px, 16px); }  // → 48em
```

---

### Color Functions

```scss
@use "@mastors/core/scss/functions/color" as *;

// tint($color, $pct) — mix with white
$light-blue: tint(#3b82f6, 40%);

// shade($color, $pct) — mix with black
$dark-blue:  shade(#3b82f6, 30%);

// alpha($color, $alpha) — set alpha channel
$semi:       alpha(#3b82f6, 0.5);

// contrast($bg) — returns black or white for best contrast
$text-color: contrast(#3b82f6);     // → white

// palette($name, $shade) — shorthand accessor
$c: palette("primary", 500);        // → #3b82f6

// rgb-color($name, $shade, $opacity) — with optional alpha
$c: rgb-color("primary", 500, 0.6);

// color-ramp($base, $steps, $dir) — tint/shade ramp
$ramp: color-ramp(#3b82f6, 5, "tint");
```

---

### Math Functions

```scss
@use "@mastors/core/scss/functions/math" as *;

// fluid($min, $max, $min-vw, $max-vw) — clamp() expression
font-size: fluid(1rem, 2rem);
// → clamp(1rem, …vw + …, 2rem)

// clamp-value($min, $val, $max)
font-size: clamp-value(0.875rem, 4vw, 2rem);

// strip-unit(16px) → 16
$n: strip-unit(16px);

// round-to($val, $decimals) — default 2
$r: round-to(3.14159);  // → 3.14

// lerp($a, $b, $t) — linear interpolation
$v: lerp(0, 100px, 0.5); // → 50px
```

---

### `vars()` — Token Reference Function

Emits `var(--mastors-{token})` with an optional CSS fallback. Zero output until used.

```scss
@use "@mastors/core/scss/functions/vars" as *;

.card {
  background: vars(surface);            // var(--mastors-surface)
  color:       vars(text);              // var(--mastors-text)
  border:      1px solid vars(border);  // var(--mastors-border)
}

// With CSS fallback
.badge {
  background: vars(accent-subtle, #eff6ff);
  // → var(--mastors-accent-subtle, #eff6ff)
}
```

---

### `string` — Path-based `vars()` accessor

```scss
@use "@mastors/core/scss/functions/string" as sf;

color: sf.vars(color, primary, 500);  // var(--mastors-color-primary-500)
gap:   sf.vars(spacing, 4);           // var(--mastors-spacing-4)
```

---

### Map Helpers

```scss
@use "@mastors/core/scss/functions/map-helpers" as *;

$nested: ("colors": ("blue": #3b82f6));
$blue: map-deep-get($nested, "colors", "blue");  // → #3b82f6

$merged: map-collect($map-a, $map-b, $map-c);    // shallow merge
```

---

## Sass API — Mixins

All mixins are available via `@use "@mastors/core/api" as m` or individually via `@use "@mastors/core/scss/mixins/..."`.

### Summary Table

| Mixin | Signature | Description |
|---|---|---|
| `bp()` | `bp($key)` | Mobile-first min-width media query |
| `breakpoint-up()` | `breakpoint-up($key)` | Alias for `bp()` |
| `breakpoint-down()` | `breakpoint-down($key)` | Max-width media query |
| `respond-to()` | `respond-to($key)` | Alias for `bp()` |
| `container()` | `container($size?)` | Responsive max-width container |
| `elevation()` | `elevation($level)` | Token-driven `box-shadow` by level |
| `transition()` | `transition($props, $duration, $easing)` | Token-driven transition shorthand |
| `pseudo()` | `pseudo($display, $pos, $content)` | `::before` / `::after` boilerplate |
| `dark-mode` | `dark-mode` | Dark mode block (class or media, per config) |
| `light-mode` | `light-mode` | Light mode block |
| `theme()` | `theme($name)` | `[data-theme="name"]` scoped block |
| `cq()` | `cq($size, $name?)` | Container query block |
| `fluid-type()` | `fluid-type($min, $max, $min-bp?, $max-bp?)` | Fluid font-size via `clamp()` |

---

### `bp()` — Breakpoint

Mobile-first `min-width` media query.

```scss
@use "@mastors/core/scss/mixins/breakpoint" as *;

.sidebar {
  display: none;

  @include bp(sm)  { display: block; }   // min-width: 640px
  @include bp(md)  { width: 240px; }     // min-width: 768px
  @include bp(lg)  { width: 300px; }     // min-width: 1024px
  @include bp(2xl) { width: 360px; }     // min-width: 1536px
}

// Aliases — all three are equivalent
@include respond-to(md)      { ... }
@include breakpoint-up(md)   { ... }

// Below a breakpoint (max-width)
@include breakpoint-down(lg) { ... }
```

**Breakpoint map:**

| Key | min-width |
|---|---|
| `xs` | `0px` (base, no prefix) |
| `sm` | `640px` |
| `md` | `768px` |
| `lg` | `1024px` |
| `xl` | `1280px` |
| `2xl` | `1536px` |

---

### `container()` — Responsive Container

```scss
@use "@mastors/core/scss/mixins/container" as *;

.page-wrapper {
  @include container;
  // → width: 100%;
  //   margin-inline: auto;
  //   padding-inline: 1rem;
  //   max-width: 640px  @sm
  //   max-width: 768px  @md
  //   max-width: 1024px @lg
  //   max-width: 1280px @xl
  //   max-width: 1400px @2xl
}
```

---

### `elevation()` — Box Shadow

Token-driven box-shadow by level key.

```scss
@use "@mastors/core/scss/mixins/elevation" as *;

.card { @include elevation("md"); }   // box-shadow: md token
.nav  { @include elevation("lg"); }   // box-shadow: lg token
.chip { @include elevation("xs"); }
```

| Key | Equivalent token |
|---|---|
| `xs` | `shadow-xs` |
| `sm` | `shadow-sm` |
| `md` | `shadow-md` |
| `lg` | `shadow-lg` |
| `xl` | `shadow-xl` |
| `2xl` | `shadow-2xl` |
| `inner` | `shadow-inner` |
| `none` | `none` |

---

### `transition()` — Token-driven Transition

```scss
@use "@mastors/core/scss/mixins/transition" as *;

.btn {
  // transition($props, $duration, $easing)
  @include transition((background-color, color), "150", "in-out");
  // → transition: background-color 150ms cubic-bezier(0.4,0,0.2,1),
  //               color 150ms cubic-bezier(0.4,0,0.2,1);
}

.modal { @include transition((transform, opacity), "300", "out"); }
```

| Parameter | Type | Example values |
|---|---|---|
| `$props` | list or single | `(color, background)`, `opacity` |
| `$duration` | string key | `"75"`, `"150"`, `"300"`, `"500"` |
| `$easing` | string key | `"linear"`, `"in"`, `"out"`, `"in-out"`, `"bounce"` |

---

### `pseudo()` — Before / After Boilerplate

```scss
@use "@mastors/core/scss/mixins/pseudo" as *;

.badge::before {
  @include pseudo($display: inline-block, $pos: relative, $content: "");
  width:         8px;
  height:        8px;
  border-radius: 50%;
  background:    currentColor;
}

// Shorthand with defaults (display:block, pos:absolute, content:"")
.overlay::after {
  @include pseudo;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}
```

| Parameter | Default | Description |
|---|---|---|
| `$display` | `block` | `display` value |
| `$pos` | `absolute` | `position` value |
| `$content` | `""` | `content` value |

---

### `dark-mode` / `light-mode` / `theme()` — Theming Mixins

```scss
@use "@mastors/core/scss/mixins/theme" as *;

.card {
  background: #fff;

  @include dark-mode {
    background: #1f2937;
    color:      #f9fafb;
  }

  @include light-mode {
    box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  }

  // Named theme — targets [data-theme="ocean"]
  @include theme("ocean") {
    background: #083344;
    color:      #ecfeff;
  }
}
```

The dark/light strategy is read from the `$mastors-config` map and matches the compiled output (class or media).

---

### `cq()` — Container Query

```scss
@use "@mastors/core/scss/mixins/container" as *;
// or
@use "@mastors/core/scss/responsive/container-queries" as cq;

// Step 1: set containment on the wrapper
<div class="cq-inline">  <!-- container-type: inline-size -->

// Step 2: use the mixin inside your component SCSS
.card {
  @include cq.cq(40rem) {
    display:               grid;
    grid-template-columns: 1fr 2fr;
  }

  // Named container
  @include cq.cq(30rem, "sidebar") {
    font-size: 0.875rem;
  }
}
```

| Class | Value |
|---|---|
| `cq-inline` | `container-type: inline-size` |
| `cq-size` | `container-type: size` |
| `data-container` | `container-type: inline-size` |

---

### `fluid-type()` — Fluid Typography Mixin

```scss
@use "@mastors/core/scss/responsive/fluid-type" as ft;

// Apply fluid font-size to a single element
.hero-title {
  @include ft.apply-fluid-type(2rem, 4rem);
  // → font-size: clamp(2rem, …vw + …, 4rem);
}

// Custom viewport range
.headline {
  @include ft.apply-fluid-type(1.5rem, 3rem, 480px, 1400px);
}

// Use as a function value
.lead { font-size: ft.fluid-type(1rem, 1.5rem); }

// Opt-in pre-built fluid heading scale (h1–h6 + p, 320px–1280px)
@include ft.fluid-scale();
```

---

## Responsive Engine

### Breakpoints

Mobile-first. The `xs` key is the base and generates no prefix.

| Key | min-width | Device |
|---|---|---|
| `xs` | `0px` | All screens (no prefix) |
| `sm` | `640px` | Large phones + |
| `md` | `768px` | Tablets + |
| `lg` | `1024px` | Laptops + |
| `xl` | `1280px` | Desktops + |
| `2xl` | `1536px` | Wide screens + |

```html
<!-- Pattern: {bp}:{utility} -->
<div class="hidden sm:block">      Shown sm+</div>
<div class="block md:hidden">      Hidden md+</div>
<div class="flex-col lg:flex-row"> Row from lg</div>
<div class="text-sm xl:text-base"> Bigger on xl</div>
```

> Only utilities with `responsive: true` in their config generate breakpoint variants. Currently enabled by default: display, position, text-align, float, clear.

---

### Fluid Typography

Uses `clamp()` to scale font sizes smoothly between two viewport widths without media queries. See the [`fluid-type()` mixin section](#fluid-type--fluid-typography-mixin) above.

---

### Container Queries

CSS container query helpers for component-level responsive design. See the [`cq()` mixin section](#cq--container-query) above.

---

## Accessibility

### Screen Reader Utilities

```html
<!-- Visually hidden, accessible to screen readers -->
<span class="sr-only">Menu (screen reader label)</span>

<!-- Undo sr-only -->
<span class="not-sr-only">Now visible</span>

<!-- Legacy aliases (equivalent to sr-only) -->
<span class="visually-hidden">  <span class="vh">

<!-- Shown when focused — skip-link pattern -->
<a class="visually-hidden-focusable" href="#main">
  Skip to main content
</a>
```

### Focus Ring

Automatically applied to `:focus-visible`. Mouse users do not see the ring.

```css
/* Auto-applied by accessibility/_focus.scss */
:focus-visible {
  outline:        2px solid var(--mastors-color-primary-500, #3b82f6);
  outline-offset: 2px;
  border-radius:  2px;
}

/* Clean up for mouse users */
:focus:not(:focus-visible) { outline: none; }
```

### Reduced Motion

Respects `prefers-reduced-motion: reduce` — all animations and transitions are disabled to near-zero duration automatically. No class needed.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:        0.01ms !important;
    animation-iteration-count: 1      !important;
    transition-duration:       0.01ms !important;
    scroll-behavior:           auto   !important;
  }
}
```

### Print Utilities

```html
<!-- Hide in print, show on screen -->
<nav class="print:hidden">Navigation</nav>

<!-- Show only in print -->
<div class="screen:hidden">Print-only watermark</div>

<!-- Page break control -->
<section class="print:break-inside-avoid">...</section>
<div class="print:break-before">New page before this</div>
<div class="print:break-after">New page after this</div>

<!-- Print-safe colors -->
<p class="print:text-black print:bg-white">Print-safe</p>
<div class="print:shadow-none print:border-none">Clean print</div>
```

---

## Base & Reset

### Reset Highlights

The base layer applies an opinionated modern CSS reset.

```css
/* box-sizing: border-box everywhere */
*, *::before, *::after { box-sizing: border-box; }

/* Zero margin/padding */
* { margin: 0; padding: 0; }

/* Smooth scroll + tab-size */
html { text-size-adjust: 100%; tab-size: 4; scroll-behavior: smooth; }

/* Font smoothing */
body { -webkit-font-smoothing: antialiased; }

/* Block images, max 100% */
img, picture, video, canvas, svg { display: block; max-width: 100%; }

/* Inherit font in form elements */
input, button, textarea, select { font: inherit; }

/* Break long words */
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }

/* Remove list styles */
ol, ul { list-style: none; }

/* Links inherit color and decoration */
a { color: inherit; text-decoration: inherit; }

/* Collapsed tables */
table { border-collapse: collapse; border-spacing: 0; }

/* Cursor on interactive elements */
button, [role="button"] { cursor: pointer; }
```

### `:root` Custom Properties

Every token map is emitted on `:root` via the generator.

```css
:root {
  /* Colors — --mastors-color-{palette}-{shade} */
  --mastors-color-primary-500: #3b82f6;
  --mastors-color-success-500: #22c55e;
  /* 6 palettes × 11 shades + white + black */

  /* Spacing */
  --mastors-spacing-4: 1rem;

  /* Typography */
  --mastors-font-size-xl:    1.25rem;
  --mastors-font-weight-bold: 700;

  /* Radii */
  --mastors-radius-md: 0.375rem;

  /* Shadows */
  --mastors-shadow-md: 0 4px 6px -1px rgb(0 0 0/10%), ...;

  /* Transitions */
  --mastors-duration-300: 300ms;
  --mastors-easing-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* Z-index */
  --mastors-z-modal: 400;

  /* Opacity */
  --mastors-opacity-50: 0.5;
}
```

---

## TypeScript Mirror

Runtime token access with full type definitions. The `src/tokens.ts` file is **auto-generated** from the SCSS token maps — never edit it manually.

```ts
import { tokens } from '@mastors/core'
import type { Breakpoint, SpacingKey, ColorPalette } from '@mastors/core'

const primary = tokens.color.primary['600']  // '#2563eb'
const space4  = tokens.spacing['4']          // '1rem'
const mdBp    = tokens.breakpoints['md']     // '768px'
```

---

## Build

```bash
# From the monorepo root
pnpm build:core

# From this package
node build.js

# Production build (minified)
node build.js --prod

# Watch mode
node build.js --watch
```

Build steps: **clean → compile SCSS → regenerate `src/tokens.ts` → compile TypeScript**

To regenerate the TypeScript token mirror without a full build:

```bash
node scripts/generate-tokens.js
```

> `src/tokens.ts` is auto-generated — never edit it manually.

---

## Changelog

### 1.2.7

- Patch release — maintenance and dependency updates

### 1.2.4

- Added `"sass"` export condition to `exports["."]` — bundlers (Vite, Webpack, etc.) now resolve the correct SCSS entry point automatically
- Added root-level `_index.scss` forwarding `scss/index` — enables `@use "@mastors/core"` via Sass `loadPaths: ['node_modules']` with no custom importer required
- Added `_index.scss` to `"files"` so the entry point is included in published packages

### 1.2.3

- Patch release — dependency and tooling updates

### 1.2.0

- Added `vars($token, $fallback?)` SCSS function in `functions/_vars.scss`
- Added `config/_index.scss` shim — forwards `_settings.scss` and `_flags.scss` through the public API
- Added `utilities/_typography.scss` — text-align, font-size/weight/family, font-style, leading, tracking, text-decoration, text-transform, text-overflow, white-space, word-break, vertical-align, list-style, font-smoothing
- Added `utilities/_animation.scss` — transition presets, token-driven durations/delays/easings, named animation presets, `@keyframes`, fill-mode, play-state, iteration utilities
- Added `utilities/_interaction.scss` — user-select, resize, scroll-behavior, scroll-snap, touch-action, and state variant utilities
- Added `utilities/_layout.scss` — aspect-ratio block
- Added `accessibility/_print.scss` — `print:hidden`, `screen:hidden`, break utilities, color/shadow resets, automatic link expansion

### 1.1.0

- Fixed deprecated Sass `if()` syntax in `_em.scss` and `_class-generator.scss`
- Added `inputs` field to `turbo.json` build task so SCSS changes correctly invalidate the Turbo cache

### 1.0.0

- Initial release

---

## License

MIT © Mastors Contributors
