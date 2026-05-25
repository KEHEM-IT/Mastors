# @mastors/core

> Foundational tokens, mixins, functions, reset, and responsive engine for the Mastors ecosystem.

[![npm version](https://img.shields.io/npm/v/@mastors/core.svg)](https://www.npmjs.com/package/@mastors/core)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

---

## Overview

`@mastors/core` is the foundation of the Mastors SCSS ecosystem. It provides:

- **Token system** — color, spacing, typography, radii, shadows, z-index, opacity, transitions, sizing
- **Functions** — `rem()`, `em()`, `color()`, `spacing()`, `vars()`, `tint()`, `shade()`, `fluid()`, and more
- **Mixins** — `bp()`, `dark-mode()`, `theme()`, `elevation()`, `transition()`, `container()`, `pseudo()`
- **Generator engine** — `generate-utilities()`, `emit-custom-properties()`, `generate-responsive()`
- **Utility classes** — display, spacing, sizing, colors, borders, shadows, typography, animation, interaction, layout, accessibility
- **Theme system** — CSS custom property contract, light/dark themes, `data-theme` support
- **Responsive engine** — breakpoint-prefixed variant generation, container queries, fluid typography
- **TypeScript mirror** — runtime token access and full type definitions

All other `@mastors/*` packages consume `@mastors/core/api` as a peer dependency.

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

## Usage

### Import the full stylesheet

```scss
@use "@mastors/core/scss";
```

This imports the complete output: reset, custom properties, themes, utilities, helpers, and accessibility classes.

### Use the public API (zero CSS output)

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

### Import a single partial

```scss
@use "@mastors/core/scss/tokens/color" as colors;
@use "@mastors/core/scss/mixins/breakpoint" as bp;
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
  ".":                       { "import": "./dist/index.mjs", "require": "./dist/index.js", "types": "./dist/index.d.ts" },
  "./scss":                  "./scss/index.scss",
  "./scss/*":                "./scss/*",
  "./api":                   "./scss/api/_index.scss",
  "./dist/mastors-core.css": "./dist/mastors-core.css"
}
```

---

## Public API (`@mastors/core/api`)

Importing `@mastors/core/api` gives access to:

### Functions

| Function | Description |
|---|---|
| `color($name, $shade)` | Look up a palette color by name and shade |
| `spacing($key)` | Look up a spacing token |
| `radius($key)` | Look up a border-radius token |
| `shadow($key)` | Look up a box-shadow token |
| `z($key)` | Look up a z-index token |
| `opacity($key)` | Look up an opacity token |
| `duration($key)` | Look up a transition duration |
| `easing($key)` | Look up an easing curve |
| `vars($token, $fallback?)` | Emit `var(--mastors-{token})` with optional fallback |
| `rem($px)` | Convert px to rem |
| `em($px, $base?)` | Convert px to em |
| `tint($color, $amount)` | Mix color toward white |
| `shade($color, $amount)` | Mix color toward black |
| `alpha($color, $opacity)` | Set color opacity |
| `fluid($min, $max, $min-bp?, $max-bp?)` | Generate a fluid `clamp()` value |

### Mixins

| Mixin | Description |
|---|---|
| `bp($key)` | Mobile-first breakpoint media query |
| `breakpoint-up($key)` | Alias for `bp()` |
| `breakpoint-down($key)` | Max-width media query |
| `respond-to($key)` | Alias for `bp()` |
| `dark-mode` | Dark mode block (class or media, per config) |
| `light-mode` | Light mode block |
| `theme($name)` | `[data-theme="name"]` scoped block |
| `elevation($level)` | Token-driven box-shadow by level |
| `transition($props...)` | Token-driven transition shorthand |
| `container($size?)` | Responsive container width |
| `pseudo($display, $pos, $content)` | `::before` / `::after` boilerplate |
| `cq($size, $name?)` | Container query block |
| `fluid-type($min, $max, $min-bp?, $max-bp?)` | Fluid font-size via `clamp()` |

### Config

```scss
@use "@mastors/core/api" as m;

// Read config values
$mode: m.config("dark-mode");   // "class" | "media"

// Check feature flags
$enabled: m.$enable-flexer;
```

---

## Token Reference

### Color

Palette keys: `primary`, `secondary`, `neutral`, `success`, `warning`, `danger`, `info`
Shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`

```scss
m.color("primary", 600)   // #2563eb
m.color("neutral", 100)   // #f5f5f5
```

### Spacing

35-step scale — `0` through `96`:

```scss
m.spacing(0)   // 0
m.spacing(1)   // 0.25rem
m.spacing(4)   // 1rem
m.spacing(16)  // 4rem
```

### Breakpoints

| Key | Min-width |
|---|---|
| `xs` | 0px (base) |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### Radii

`none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`

### Shadows

`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `inner`, `none`

### Durations

`75`, `100`, `150`, `200`, `300`, `500`, `700`, `1000` (ms)

### Easings

`linear`, `in`, `out`, `in-out`

---

## Theme System

```scss
// Class-based dark mode (default)
// Activate with: <html class="dark">
$mastors-config: ("dark-mode": "class") !default;

// Media-query dark mode
$mastors-config: ("dark-mode": "media") !default;
```

Custom theme:

```scss
@include m.theme("ocean") {
  --mastors-accent: #0891b2;
}
```

```html
<div data-theme="ocean">...</div>
```

---

## Build

```bash
# From the monorepo root
pnpm build:core

# Or from this package
node build.js
```

Build steps: clean → compile SCSS → regenerate `src/tokens.ts` → compile TypeScript.

To regenerate the TypeScript token mirror without a full build:

```bash
node scripts/generate-tokens.js
```

> `src/tokens.ts` is auto-generated — never edit it manually.

---

## Changelog

See the [root CHANGELOG](../../README.md#changelog).

## License

MIT © Mastors Contributors
