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
- [Container Queries](#container-queries)
- [Fluid Typography](#fluid-typography)
- [Theme System](#theme-system)
- [Base Layer](#base-layer)
- [Utility Classes](#utility-classes)
- [Helpers](#helpers)
- [Accessibility](#accessibility)
- [Generator Engine](#generator-engine)
- [Semantic Layer](#semantic-layer)
- [Known Stubs](#known-stubs)
- [Package Exports](#package-exports)
- [Peer Dependencies](#peer-dependencies)
- [Changelog](#changelog)

---

## Overview

`@mastors/core` is the only required package in the Mastors ecosystem. It provides:

- **Design tokens** — color, spacing, typography, radius, shadows, z-index, opacity, and transitions as SCSS maps
- **Functions** — `rem()`, `em()`, `color()`, `spacing()`, `tint()`, `shade()`, `alpha()`, `contrast()`, `fluid()`, `map-deep-get()`, `map-collect()`, `str-replace()`
- **Mixins** — `bp()`, `dark-mode()`, `light-mode()`, `theme()`, `elevation()`, `transition()`, `container()`, `pseudo()`
- **Generator engine** — `generate-utilities()`, `emit-custom-properties()`, and responsive-generator mixins used by all utility packages
- **Reset** — modern CSS reset and document defaults
- **Theme system** — CSS custom property-based light/dark theming with a full semantic contract
- **Responsive engine** — breakpoint-aware utility variant generation (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- **Container queries** — `.cq-inline`, `.cq-size`, `cq()` mixin for `@container` rules
- **Fluid typography** — `fluid-type()` mixin and function using `clamp()`
- **Utility classes** — display, position, overflow, spacing, sizing, colors, borders (full directional radius scale), shadows, opacity, cursor, z-index, transforms
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
    "prefix":    "",        // optional class prefix, e.g. "m-" -> .m-flex
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

Six semantic palettes, each with 11 shades (50-950), plus `white`, `black`, and `transparent`.

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

Palettes: `primary` - `neutral` - `success` - `warning` - `error` - `info`

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

Half-step keys (`0.5`, `1.5`, `2.5`, `3.5`) are also available:

```scss
m.spacing("0.5")  // 0.125rem
m.spacing("1.5")  // 0.375rem
```

### Typography

```scss
// Font sizes (xs -> 9xl)
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
m.radius("3xl")    // 1.5rem
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
| `rem($px)` | Convert px to rem | `rem(16px)` -> `1rem` |
| `em($px)` | Convert px to em | `em(16px)` -> `1em` |
| `color($palette, $shade)` | Get a color token | `color("primary", 600)` |
| `spacing($key)` | Get a spacing token | `spacing(4)` -> `1rem` |
| `radius($key)` | Get a radius token | `radius("xl")` -> `0.75rem` |
| `shadow($key)` | Get a shadow token | `shadow("md")` |
| `z($key)` | Get a z-index token | `z("modal")` -> `400` |
| `opacity($key)` | Get an opacity token | `opacity("50")` -> `0.5` |
| `duration($key)` | Get a duration token | `duration("200")` -> `200ms` |
| `easing($key)` | Get an easing token | `easing("in-out")` |
| `tint($c, $pct)` | Mix color with white | `tint(blue, 20%)` |
| `shade($c, $pct)` | Mix color with black | `shade(blue, 20%)` |
| `alpha($c, $a)` | Adjust alpha channel | `alpha(blue, 0.5)` |
| `contrast($bg)` | Black or white for contrast (1) | `contrast(#1e40af)` -> white |
| `fluid($min, $max)` | Clamp-based fluid value | `fluid(1rem, 2rem)` |
| `map-deep-get($map, $keys...)` | Deep nested map access | `map-deep-get($tokens, "primary", "600")` |
| `map-collect($maps...)` | Shallow-merge multiple maps | `map-collect($a, $b)` |
| `str-replace($str, $search)` | Replace substring | `str-replace("a-b", "-", "_")` |

(1) `contrast()` uses a simplified linear luminance approximation without sRGB gamma expansion. The threshold is set to `0.35` (not the WCAG `0.179`) to compensate for the missing gamma step — this gives correct results across the neutral scale. Suitable for UI decisions; implement full sRGB linearisation for strict WCAG 2.1 contrast-ratio auditing.

---

## Mixins

### Breakpoints

Mobile-first, min-width media queries using the named breakpoint map.

```scss
// Breakpoints: xs (0px) - sm (640px) - md (768px) - lg (1024px) - xl (1280px) - 2xl (1536px)

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

The engine in `responsive/_engine.scss` wraps utility maps in breakpoint media queries. Sub-packages can call `@include engine.run($utilities)` directly for standalone use.

For the standard workflow, responsive variant generation is built into `generate-utilities()` — any utility entry that declares `responsive: true` automatically emits both base classes and breakpoint-prefixed variants in a single call. No separate invocation is required.

Generated class pattern: `.{breakpoint}\:{class}`

```html
<!-- Responsive display -->
<div class="hidden md:block lg:flex">...</div>

<!-- Responsive position -->
<div class="relative md:absolute lg:sticky">...</div>

<!-- Responsive layout (from @mastors/flexer or @mastors/gridder) -->
<div class="flex flex-col md:flex-row lg:gap-8">...</div>
```

Utilities with responsive support at v1.0: `display`, `position`.

---

## Container Queries

Container queries are supported via `responsive/_container-queries.scss`.

**Setup classes:**

| Class | Effect |
|---|---|
| `.cq-inline` | `container-type: inline-size` |
| `.cq-size` | `container-type: size` |
| `.cq-normal` | `container-type: normal` |
| `[data-container]` | `container-type: inline-size` (attribute-based) |

**Usage:**

```html
<div class="cq-inline">
  <div class="child">Responds to container width, not viewport</div>
</div>
```

```scss
@use "@mastors/core/api" as m;

.child {
  font-size: 1rem;

  @include m.cq(40rem) {
    font-size: 1.25rem;
  }

  // Named container query
  @include m.cq(30rem, "card") {
    padding: m.spacing(6);
  }
}
```

---

## Fluid Typography

`responsive/_fluid-type.scss` provides clamp()-based fluid font sizes that scale between two viewport widths without media queries.

```scss
@use "@mastors/core/api" as m;

// As a mixin (applies font-size property)
h1 { @include m.fluid-type(2rem, 3.75rem); }

// As a function (use in any property value)
h1 { font-size: m.fluid-type(2rem, 3.75rem); }

// Custom viewport range
h2 { @include m.fluid-type(1.5rem, 3rem, 480px, 1440px); }
```

Opt-in preset scale for all heading levels:

```scss
@use "@mastors/core/scss/responsive/fluid-type" as ft;
@include ft.fluid-scale();
// Applies fluid-type() to h1-h6 and p
```

---

## Theme System

Core emits all design tokens as `--mastors-*` CSS custom properties on `:root`. Theme layers override a semantic subset.

**Default (light) theme properties:**

```css
:root {
  --mastors-bg:              #ffffff;
  --mastors-bg-subtle:       #f9fafb;
  --mastors-surface:         #ffffff;
  --mastors-surface-raised:  #f9fafb;
  --mastors-surface-overlay: #f3f4f6;
  --mastors-text:            #111827;
  --mastors-text-muted:      #6b7280;
  --mastors-text-subtle:     #9ca3af;
  --mastors-text-inverse:    #ffffff;
  --mastors-border:          #e5e7eb;
  --mastors-border-strong:   #9ca3af;
  --mastors-accent:          #2563eb;
  --mastors-accent-hover:    #1d4ed8;
  --mastors-accent-subtle:   #eff6ff;
  --mastors-accent-text:     #ffffff;
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

Custom themes can be applied with any `data-theme` attribute:

```scss
@use "@mastors/core/api" as m;

@include m.theme("ocean") {
  --mastors-accent: #0891b2;
  --mastors-accent-hover: #0e7490;
}
```

```html
<div data-theme="ocean">
  <!-- accent color is teal inside here -->
</div>
```

---

## Base Layer

The base layer emits a modern CSS reset and document defaults when you import the full stylesheet:

- `box-sizing: border-box` on all elements (declared once in `_reset.scss`)
- Zero margin and padding on all elements
- `img`, `video`, `canvas`, `svg` set to `display: block; max-width: 100%`
- `input`, `button`, `textarea`, `select` inherit font
- Smooth scroll behaviour on `html`
- `-webkit-font-smoothing: antialiased` on `body`
- Base `color` and `background-color` on `html` driven by semantic custom properties
- Heading sizes (h1-h6) driven by the typography token scale
- Code/pre elements default to the mono font family

---

## Utility Classes

When importing the full stylesheet, core emits these utility classes:

| Group | Classes |
|---|---|
| Display | `.block` `.inline-block` `.inline` `.flex` `.inline-flex` `.grid` `.inline-grid` `.hidden` `.contents` `.table` `.table-cell` `.table-row` |
| Position | `.static` `.relative` `.absolute` `.fixed` `.sticky` - `.inset-*` `.top-*` `.right-*` `.bottom-*` `.left-*` |
| Overflow | `.overflow-auto/hidden/scroll/visible/clip` - `.overflow-x-*` `.overflow-y-*` |
| Spacing | `.m-*` `.mx-*` `.my-*` `.mt/r/b/l/s/e-*` - `.p-*` `.px-*` `.py-*` `.pt/r/b/l/s/e-*` - `.gap-*` `.gap-x-*` `.gap-y-*` |
| Sizing | `.w-*` `.h-*` - `.min-w-*` `.max-w-*` `.min-h-*` `.max-h-*` |
| Colors | `.text-*` `.bg-*` (all palettes x all shades + semantic) |
| Borders | `.border` `.border-*` `.rounded-*` `.rounded-{t\|b\|l\|r}-*` (full scale, all token steps) |
| Shadows | `.shadow-*` |
| Opacity | `.opacity-*` |
| Cursor | `.cursor-pointer` `.cursor-not-allowed` `.cursor-grab` etc. |
| Pointer events | `.pointer-events-none` `.pointer-events-auto` |
| Z-index | `.z-base` `.z-dropdown` `.z-modal` `.z-tooltip` etc. |
| Transforms | `.translate-x-*` `.translate-y-*` `.rotate-*` `.scale-*` `.origin-*` `.transform-gpu` `.transform-none` |

Display and position utilities support responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).

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
| `.break-keep` | `word-break: keep-all` |
| `.ratio-auto` | `aspect-ratio: auto` |
| `.ratio-square` | `aspect-ratio: 1 / 1` |
| `.ratio-video` | `aspect-ratio: 16 / 9` |
| `.ratio-portrait` | `aspect-ratio: 3 / 4` |
| `.ratio-wide` | `aspect-ratio: 21 / 9` |
| `.ratio-golden` | `aspect-ratio: 1.618 / 1` |
| `.clearfix` | Float clearfix via `::after` |

---

## Accessibility

| Class / Rule | Effect |
|---|---|
| `.sr-only` | Visually hidden, announced by screen readers |
| `.not-sr-only` | Undoes `.sr-only` |
| `.visually-hidden`, `.vh` | Equivalent to `.sr-only` with `!important` guards |
| `.visually-hidden-focusable` | Hidden until focused (skip-link pattern) |
| `:focus-visible` | 2px primary-500 ring, 2px offset — keyboard only |
| `:focus:not(:focus-visible)` | Removes ring for mouse/pointer users |
| `prefers-reduced-motion: reduce` | Collapses all animation/transition durations to 0.01ms |

---

## Generator Engine

The three generator mixins are the engine behind all utility class output in the Mastors ecosystem.

### `generate-utilities($utilities)`

Generates utility classes from a configuration map. Used by `@mastors/flexer`, `@mastors/gridder`, and all core utility partials.

The mixin runs in two passes:
- **Pass 1** — emits base (unprefixed) classes for every entry.
- **Pass 2** — for every entry with `responsive: true`, iterates all breakpoints (skipping `xs`/0px) and emits breakpoint-prefixed variants inside `@media` blocks. Respects the `$enable-responsive` flag and the global prefix/`!important` config.

```scss
@use "@mastors/core/scss/generators/class-generator" as gen;

@include gen.generate-utilities((
  "text-align": (
    property:   text-align,
    prefix:     "text",
    responsive: true,
    values: (
      "left":   left,
      "center": center,
      "right":  right,
    ),
  ),
));
// Emits: .text-left, .text-center, .text-right
// And:   .sm\:text-left, .md\:text-left, … for all breakpoints
```

### `emit-custom-properties($map, $prefix)`

Emits flat CSS custom properties from a token map onto the current selector.

```scss
:root {
  @include gen.emit-custom-properties($spacing-tokens, "mastors-spacing");
  // -> --mastors-spacing-4: 1rem; etc.
}
```

### `emit-nested-custom-properties($map, $prefix)`

Recursively emits custom properties from a nested map (e.g. color palettes).

```scss
:root {
  @include gen.emit-nested-custom-properties($color-tokens, "mastors-color");
  // -> --mastors-color-primary-500: #3b82f6; etc.
}
```

---

## Semantic Layer

The semantic layer in `semantic/` provides role-based SCSS variable aliases on top of the raw token maps. Use these in component SCSS instead of raw token references to get automatic theme compatibility.

**Colors:**

```scss
@use "@mastors/core/scss/semantic/colors" as sem;

.my-card {
  background: sem.$color-surface;          // var(--mastors-surface)
  color:      sem.$color-text;             // var(--mastors-text)
  border:     1px solid sem.$color-border; // var(--mastors-border)
}
```

**Spacing:**

```scss
@use "@mastors/core/scss/semantic/spacing" as sem;

.section {
  padding: sem.$space-section;    // spacing(16) = 4rem
  gap:     sem.$space-component;  // spacing(4)  = 1rem
}
```

**Typography:**

```scss
@use "@mastors/core/scss/semantic/typography" as sem;

body { font-family: sem.$font-body; }   // system-ui stack
code { font-family: sem.$font-mono; }   // monospace stack
```

---

## Known Stubs

Two files are intentionally empty at v1.0 and act as reserved extension points:

| File | Purpose |
|---|---|
| `abstracts/_maps.scss` | Shared utility maps consumed by 3+ unrelated files. Empty until such maps exist. |
| `vendors/_index.scss` | Third-party CSS overrides. Add a partial and `@forward` it here when needed. |
| `base/_box-sizing.scss` | Retained as a named path slot; box-sizing is declared in `_reset.scss`. |

These stubs are documented in each file's header comment.

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
@use "@mastors/core/scss/responsive/fluid-type" as ft;
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

## Changelog

### v1.0.0

- Initial public release
- Full token system: color, spacing, typography, radii, shadows, z-index, opacity, transitions, sizing
- Complete functions layer: `rem`, `em`, `color`, `spacing`, `radius`, `shadow`, `z`, `opacity`, `duration`, `easing`, `tint`, `shade`, `alpha`, `contrast`, `fluid`, `map-deep-get`, `map-collect`, `str-replace`
- Complete mixins layer: `bp`, `respond-to`, `breakpoint-up`, `breakpoint-down`, `dark-mode`, `light-mode`, `theme`, `elevation`, `transition`, `container`, `pseudo`
- **Fixed:** `generate-utilities()` now runs a two-pass emit — Pass 1 outputs base classes, Pass 2 automatically emits breakpoint-prefixed responsive variants for all entries with `responsive: true`. Previously responsive variants were silently not emitted.
- **Fixed:** `generators/_responsive-generator.scss` replaced the `@content`-based no-op stub with a thin wrapper that correctly delegates to `engine.run()` for backward compatibility.
- **Fixed:** `contrast()` luminance threshold corrected from `0.179` (WCAG linearised) to `0.35` (calibrated for the simplified non-gamma-expanded approximation in use). Prevents wrong light/dark decisions on mid-grey backgrounds.
- **Added:** `stylelint` linting with `stylelint-config-standard-scss` — `pnpm lint` now runs real SCSS style checks. `postcss-scss`, `stylelint`, and `stylelint-config-standard-scss` added to `devDependencies`; `.stylelintrc.json` added to `packages/core`.
- Generator engine: `generate-utilities` (with integrated responsive Pass 2), `emit-custom-properties`, `emit-nested-custom-properties`
- Responsive engine with correct numeric breakpoint escaping (`2xl:` prefix)
- Container queries: `.cq-inline`, `.cq-size`, `.cq-normal`, `[data-container]`, `cq()` mixin
- Fluid typography: `fluid-type()` mixin + function + `fluid-scale()` preset
- Full directional border-radius utility scale — all four sides x all token steps
- Light and dark themes via CSS custom property semantic contract (15 semantic props)
- Modern CSS reset — no duplicate `box-sizing` declarations
- Accessibility layer: `:focus-visible` ring, `prefers-reduced-motion` override, `.sr-only`, `.visually-hidden`
- Dual dark-mode strategy: class-based and media-query, configurable via `$mastors-config`

---

## License

MIT (c) Mastors Contributors
