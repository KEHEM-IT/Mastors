# @mastors/core

> The foundational layer of the Mastors ecosystem — design tokens, SCSS functions, mixins, generators, reset, responsive engine, and theme system.

[![npm](https://img.shields.io/npm/v/@mastors/core.svg)](https://www.npmjs.com/package/@mastors/core)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)
[![sass](https://img.shields.io/badge/requires-sass%20%3E%3D1.80-CC6699.svg)](https://sass-lang.com)

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
  - [Full stylesheet import](#full-stylesheet-import)
  - [Public API (zero output)](#public-api-zero-output)
  - [TypeScript / JavaScript](#typescript--javascript)
- [Configuration](#configuration)
  - [Feature flags](#feature-flags)
  - [Dark mode strategy](#dark-mode-strategy)
  - [Class prefix](#class-prefix)
- [Design Tokens](#design-tokens)
  - [Color](#color)
  - [Spacing](#spacing)
  - [Typography](#typography)
  - [Border Radius](#border-radius)
  - [Shadows](#shadows)
  - [Z-Index](#z-index)
  - [Opacity](#opacity)
  - [Transitions](#transitions)
- [Functions](#functions)
- [Mixins](#mixins)
  - [Breakpoints](#breakpoints)
  - [Theme](#theme)
  - [Elevation](#elevation)
  - [Transition](#transition)
  - [Container](#container)
  - [Pseudo](#pseudo)
- [Responsive Engine](#responsive-engine)
- [Theme System](#theme-system)
- [Base Layer](#base-layer)
- [Utility Classes](#utility-classes)
- [Helpers](#helpers)
- [Accessibility](#accessibility)
- [Package Exports](#package-exports)
- [Peer Dependencies](#peer-dependencies)

---

## Overview

`@mastors/core` is the only required package in the Mastors ecosystem. It provides:

- **Design tokens** — color, spacing, typography, radius, shadows, z-index, opacity, and transitions as SCSS maps
- **Functions** — `rem()`, `em()`, `color()`, `spacing()`, `tint()`, `shade()`, `alpha()`, `contrast()`
- **Mixins** — `bp()`, `dark-mode()`, `elevation()`, `transition()`, `container()`, `pseudo()`
- **Generator engine** — the `generate-utilities()` mixin that all utility packages use
- **Reset** — modern CSS reset and document defaults
- **Theme system** — CSS custom property–based light/dark theming
- **Responsive engine** — breakpoint-aware utility variant generation
- **Utility classes** — display, position, overflow, spacing, sizing, colors, borders, shadows, opacity, cursor, z-index, transforms, and more
- **TypeScript types and runtime token mirror**

All other `@mastors/*` packages consume `@mastors/core/api` for shared tokens, functions, and mixins.

---

## Installation

```bash
npm install @mastors/core sass
# or
pnpm add @mastors/core sass
```

`sass >= 1.80.0` is required as a peer dependency.

---

## Usage

### Full stylesheet import

Import the complete compiled stylesheet — reset, tokens, themes, utilities, helpers, and accessibility:

```scss
@use "@mastors/core/scss";
```

### Public API (zero output)

Import only the public API surface. No CSS is emitted — you get access to all tokens, functions, and mixins for use in your own components:

```scss
@use "@mastors/core/api" as m;

.card {
  padding:          m.spacing(6);
  background-color: m.color("neutral", 50);
  border-radius:    m.radius("xl");
  box-shadow:       m.shadow("md");

  @include m.bp("lg") {
    padding: m.spacing(10);
  }

  @include m.dark-mode {
    background-color: m.color("neutral", 800);
    color:            m.color("neutral", 100);
  }
}
```

### TypeScript / JavaScript

Access design token values at runtime for CSS-in-JS, design tools, or testing:

```ts
import { tokens } from '@mastors/core'

const primary600   = tokens.color.primary['600']  // '#2563eb'
const spacing4     = tokens.spacing['4']           // '1rem'
const shadowMd     = tokens.shadow.md              // '0 4px 6px ...'
const radiusXl     = tokens.radius.xl              // '0.75rem'
const duration200  = tokens.duration['200']        // '200ms'
```

Import TypeScript types:

```ts
import type {
  MastorsConfig,
  Breakpoint,
  ThemeMode,
  Tokens,
  ColorPalette,
  SpacingKey,
  RadiusKey,
} from '@mastors/core'
```

---

## Configuration

Override the global config map before importing core to customise behaviour. The config must be set before any `@use "@mastors/core"` statement in your project.

```scss
// styles/_config.scss — set BEFORE @use "@mastors/core"
@use "@mastors/core/scss/config/settings" with (
  $mastors-config: (
    "prefix":    "",        // optional class prefix, e.g. "m-" → .m-flex
    "important": false,     // append !important to all utility declarations
    "dark-mode": "class",   // "class" | "media"
    "rtl":       false,     // enable RTL logical property variants
  )
);
```

### Feature flags

Disable any layer you don't need to reduce output size:

```scss
@use "@mastors/core/scss/config/flags" with (
  $enable-utilities:  true,
  $enable-responsive: true,
  $enable-helpers:    true,
  $enable-a11y:       true,
  $enable-themes:     true,
);
```

### Dark mode strategy

**Class-based** (default) — add `.dark` or `data-theme="dark"` to `<html>`:

```html
<html class="dark">...</html>
```

**Media-query** — responds automatically to the OS preference:

```scss
@use "@mastors/core/scss/config/settings" with (
  $mastors-config: ("dark-mode": "media")
);
```

### Class prefix

Add a prefix to every generated utility class to prevent collisions:

```scss
$mastors-config: ("prefix": "m-") !default;
// .m-flex, .m-block, .m-grid-cols-3, ...
```

---

## Design Tokens

All tokens are available via the public API after `@use "@mastors/core/api" as m`.

### Color

Six semantic palettes, each with 11 shades (50–950), plus `white`, `black`, and `transparent`.

```scss
m.color("primary", 600)    // #2563eb
m.color("neutral", 100)    // #f3f4f6
m.color("success", 500)    // #22c55e
m.color("warning", 400)    // #fbbf24
m.color("error", 600)      // #dc2626
m.color("info", 500)       // #06b6d4
m.color("white")           // #ffffff
m.color("black")           // #000000
```

Palettes: `primary` · `neutral` · `success` · `warning` · `error` · `info`

### Spacing

35-step scale from `0` to `96` (matching Tailwind's spacing scale):

```scss
m.spacing(0)    // 0px
m.spacing(1)    // 0.25rem
m.spacing(4)    // 1rem
m.spacing(8)    // 2rem
m.spacing(16)   // 4rem
m.spacing(96)   // 24rem
```

### Typography

```scss
// Font sizes (xs → 9xl)
m.font-size("sm")      // 0.875rem
m.font-size("base")    // 1rem
m.font-size("2xl")     // 1.5rem
m.font-size("5xl")     // 3rem

// Font families
m.font-family("sans")  // system-ui, -apple-system, ...
m.font-family("mono")  // ui-monospace, SFMono-Regular, ...

// Font weights
m.font-weight("semibold")  // 600
m.font-weight("bold")      // 700

// Line heights
m.line-height("tight")     // 1.25
m.line-height("normal")    // 1.5

// Letter spacing
m.letter-spacing("wide")   // 0.025em
```

### Border Radius

```scss
m.radius("none")   // 0px
m.radius("sm")     // 0.125rem
m.radius("md")     // 0.375rem
m.radius("lg")     // 0.5rem
m.radius("xl")     // 0.75rem
m.radius("2xl")    // 1rem
m.radius("full")   // 9999px
```

### Shadows

```scss
m.shadow("xs")     // subtle shadow
m.shadow("sm")     // small shadow
m.shadow("md")     // medium shadow (default)
m.shadow("lg")     // large shadow
m.shadow("xl")     // extra large shadow
m.shadow("2xl")    // page-level shadow
m.shadow("inner")  // inset shadow
m.shadow("none")   // none
```

### Z-Index

```scss
m.z("base")      // 0
m.z("raised")    // 10
m.z("dropdown")  // 100
m.z("sticky")    // 200
m.z("overlay")   // 300
m.z("modal")     // 400
m.z("toast")     // 500
m.z("tooltip")   // 600
m.z("max")       // 9999
```

### Opacity

```scss
m.opacity("0")    // 0
m.opacity("50")   // 0.5
m.opacity("75")   // 0.75
m.opacity("100")  // 1
```

### Transitions

```scss
m.duration("150")   // 150ms
m.duration("200")   // 200ms
m.duration("300")   // 300ms

m.easing("in-out")  // cubic-bezier(0.4, 0, 0.2, 1)
m.easing("out")     // cubic-bezier(0, 0, 0.2, 1)
m.easing("bounce")  // cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## Functions

| Function | Description | Example |
|---|---|---|
| `rem($px)` | Convert px to rem | `rem(16px)` → `1rem` |
| `em($px)` | Convert px to em | `em(16px)` → `1em` |
| `color($palette, $shade)` | Get a color token | `color("primary", 600)` |
| `spacing($key)` | Get a spacing token | `spacing(4)` → `1rem` |
| `radius($key)` | Get a radius token | `radius("xl")` → `0.75rem` |
| `shadow($key)` | Get a shadow token | `shadow("md")` |
| `z($key)` | Get a z-index token | `z("modal")` → `400` |
| `opacity($key)` | Get an opacity token | `opacity("50")` → `0.5` |
| `duration($key)` | Get a duration token | `duration("200")` → `200ms` |
| `easing($key)` | Get an easing token | `easing("in-out")` |
| `tint($c, $pct)` | Mix color with white | `tint(blue, 20%)` |
| `shade($c, $pct)` | Mix color with black | `shade(blue, 20%)` |
| `alpha($c, $a)` | Adjust alpha channel | `alpha(blue, 0.5)` |
| `contrast($bg)` | Black or white for contrast | `contrast(#1e40af)` → white |
| `fluid($min, $max)` | Clamp-based fluid value | `fluid(1rem, 2rem)` |

---

## Mixins

### Breakpoints

Mobile-first, min-width media queries using the named breakpoint map.

```scss
// Breakpoints: xs (0px) · sm (640px) · md (768px) · lg (1024px) · xl (1280px) · 2xl (1536px)

@include m.bp("md") {
  // Applies at 768px and above
}

@include m.breakpoint-down("lg") {
  // Applies below 1024px
}

// Aliases
@include m.respond-to("xl") { ... }
@include m.breakpoint-up("sm") { ... }
```

### Theme

```scss
@include m.dark-mode {
  // Activates when .dark is on <html> (class mode)
  // or prefers-color-scheme: dark (media mode)
  background-color: m.color("neutral", 900);
}

@include m.light-mode {
  background-color: m.color("white");
}

@include m.theme("ocean") {
  // Activates under [data-theme="ocean"]
  --accent: #0891b2;
}
```

### Elevation

```scss
@include m.elevation("sm");   // box-shadow: 0 1px 3px ...
@include m.elevation("lg");   // box-shadow: 0 10px 15px ...
@include m.elevation("none"); // box-shadow: none
```

### Transition

```scss
// All properties, 200ms, in-out easing (defaults)
@include m.transition();

// Specific properties
@include m.transition((color, background-color), "150", "out");

// Custom combination
@include m.transition((transform, opacity), "300", "bounce");
```

### Container

```scss
.page-section {
  @include m.container();
  // max-width per breakpoint, auto horizontal margins, configurable padding
}
```

### Pseudo

```scss
.icon::before {
  @include m.pseudo();
  // Sets display: block, position: absolute, content: ""
}
```

---

## Responsive Engine

The engine in `responsive/_engine.scss` wraps utility maps in breakpoint media queries. Sub-packages call `@include engine.run($utilities)` in their responsive layer.

Generated class pattern: `.{breakpoint}\:{class}`

```html
<!-- Responsive display -->
<div class="hidden md:block lg:flex">...</div>

<!-- Responsive spacing (from @mastors/core utilities) -->
<div class="p-4 md:p-8 lg:p-12">...</div>

<!-- Responsive layout (from @mastors/flexer or @mastors/gridder) -->
<div class="flex flex-col md:flex-row lg:gap-8">...</div>
```

Container queries are supported via `responsive/_container-queries.scss`:

```html
<div class="cq-inline">
  <div class="child">Responds to container width</div>
</div>
```

```scss
@include m.cq(40rem) {
  .child { font-size: 1.25rem; }
}
```

Fluid typography scales smoothly between two viewports using `clamp()`:

```scss
h1 { @include m.fluid-type(2rem, 3.75rem); }
// or
h1 { font-size: m.fluid-type(2rem, 3.75rem); }
```

---

## Theme System

Core emits all design tokens as `--mastors-*` CSS custom properties on `:root`. Theme layers override them.

**Default (light) theme properties:**

```css
:root {
  --mastors-bg:           #ffffff;
  --mastors-bg-subtle:    #f9fafb;
  --mastors-surface:      #ffffff;
  --mastors-text:         #111827;
  --mastors-text-muted:   #6b7280;
  --mastors-border:       #e5e7eb;
  --mastors-accent:       #2563eb;
  --mastors-accent-hover: #1d4ed8;
}
```

**Dark theme** activates via `.dark` on `<html>` (or `prefers-color-scheme` in media mode):

```html
<html class="dark">...</html>
```

Use semantic custom properties directly in your CSS for automatic theme switching:

```css
.card {
  background-color: var(--mastors-surface);
  color:            var(--mastors-text);
  border-color:     var(--mastors-border);
}
```

---

## Base Layer

The base layer emits a modern CSS reset and document defaults when you import the full stylesheet:

- `box-sizing: border-box` on all elements
- Zero margin and padding on all elements
- `img`, `video`, `canvas`, `svg` set to `display: block; max-width: 100%`
- `input`, `button`, `textarea`, `select` inherit font
- Smooth scroll behaviour on `html`
- `-webkit-font-smoothing: antialiased` on `body`

---

## Utility Classes

When importing the full stylesheet, core emits these utility classes:

| Group | Classes |
|---|---|
| Display | `.block` `.inline-block` `.inline` `.flex` `.inline-flex` `.grid` `.inline-grid` `.hidden` `.contents` |
| Position | `.static` `.relative` `.absolute` `.fixed` `.sticky` · `.inset-*` `.top-*` `.right-*` `.bottom-*` `.left-*` |
| Overflow | `.overflow-auto/hidden/scroll/visible` · `.overflow-x-*` `.overflow-y-*` |
| Spacing | `.m-*` `.mx-*` `.my-*` `.mt/r/b/l/s/e-*` · `.p-*` `.px-*` `.py-*` `.pt/r/b/l/s/e-*` · `.gap-*` `.gap-x-*` `.gap-y-*` |
| Sizing | `.w-*` `.h-*` · `.min-w-*` `.max-w-*` `.min-h-*` `.max-h-*` |
| Colors | `.text-*` `.bg-*` (all palettes × all shades + semantic) |
| Borders | `.border` `.border-*` `.rounded-*` |
| Shadows | `.shadow-*` |
| Opacity | `.opacity-*` |
| Cursor | `.cursor-pointer` `.cursor-not-allowed` `.cursor-grab` etc. |
| Pointer events | `.pointer-events-none` `.pointer-events-auto` |
| Z-index | `.z-base` `.z-dropdown` `.z-modal` `.z-tooltip` etc. |
| Transforms | `.translate-x-*` `.translate-y-*` `.rotate-*` `.scale-*` `.origin-*` |

All display, position, and spacing utilities support responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).

---

## Helpers

| Class | Effect |
|---|---|
| `.visually-hidden`, `.vh` | Visually hidden, screen-reader accessible |
| `.visually-hidden-focusable` | Hidden until focused (use for skip links) |
| `.truncate` | Single-line text truncation with ellipsis |
| `.line-clamp-{1-6}` | Multi-line text clamp |
| `.break-words` | `overflow-wrap: break-word` |
| `.break-all` | `word-break: break-all` |
| `.ratio-square` | `aspect-ratio: 1 / 1` |
| `.ratio-video` | `aspect-ratio: 16 / 9` |
| `.ratio-portrait` | `aspect-ratio: 3 / 4` |
| `.ratio-wide` | `aspect-ratio: 21 / 9` |
| `.ratio-golden` | `aspect-ratio: 1.618 / 1` |

---

## Accessibility

| Class | Effect |
|---|---|
| `.sr-only` | Visually hidden, announced by screen readers |
| `.not-sr-only` | Undoes `.sr-only` |
| `.focus-ring` | Visible focus ring using `:focus-visible` |
| `.focus-visible` | Explicit focus-visible state |
| `.motion-safe:*` | Apply only when `prefers-reduced-motion: no-preference` |
| `.motion-reduce:*` | Apply when `prefers-reduced-motion: reduce` |

---

## Package Exports

```scss
/* Full stylesheet — reset + tokens + themes + utilities */
@use "@mastors/core/scss";

/* Public API — zero CSS output, all tokens/mixins/functions */
@use "@mastors/core/api" as m;

/* Individual partials */
@use "@mastors/core/scss/tokens/color" as ct;
@use "@mastors/core/scss/mixins/breakpoint" as bp;
@use "@mastors/core/scss/functions/rem" as r;
```

```ts
// Runtime token access
import { tokens } from '@mastors/core'

// TypeScript types
import type { MastorsConfig, Breakpoint, ThemeMode, Tokens } from '@mastors/core'
```

---

## Peer Dependencies

| Package | Version |
|---|---|
| `sass` | `>= 1.80.0` |

---

## License

MIT © Mastors Contributors
