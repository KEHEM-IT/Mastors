# @mastors/flexer

> Complete flexbox utility class system for the Mastors ecosystem.

[![npm](https://img.shields.io/npm/v/@mastors/flexer.svg)](https://www.npmjs.com/package/@mastors/flexer)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)
[![sass](https://img.shields.io/badge/requires-sass%20%3E%3D1.80-CC6699.svg)](https://sass-lang.com)

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Utility Classes](#utility-classes)
  - [Display](#display)
  - [Flex Direction](#flex-direction)
  - [Flex Wrap](#flex-wrap)
  - [Flex Flow](#flex-flow)
  - [Flex Grow & Shrink](#flex-grow--shrink)
  - [Flex Basis](#flex-basis)
  - [Flex Shorthand](#flex-shorthand)
  - [Justify Content](#justify-content)
  - [Justify Items](#justify-items)
  - [Justify Self](#justify-self)
  - [Align Content](#align-content)
  - [Align Items](#align-items)
  - [Align Self](#align-self)
  - [Place Content](#place-content)
  - [Place Items](#place-items)
  - [Place Self](#place-self)
  - [Order](#order)
  - [Gap](#gap)
- [Responsive Variants](#responsive-variants)
- [Package Exports](#package-exports)
- [Peer Dependencies](#peer-dependencies)

---

## Overview

`@mastors/flexer` provides a complete set of atomic utility classes for CSS Flexbox — covering every flex container and flex item property. All utilities are generated via the core `generate-utilities()` engine and fully support responsive breakpoint prefixes.

The package requires `@mastors/core` as a peer dependency and consumes its public API for token values and the generator engine. It produces no output of its own beyond utility classes — no reset, no base styles.

---

## Installation

```bash
npm install @mastors/flexer @mastors/core sass
# or
pnpm add @mastors/flexer @mastors/core sass
```

---

## Usage

### Import the full stylesheet

```scss
// Import @mastors/core first (or alongside), then flexer
@use "@mastors/core/scss";
@use "@mastors/flexer/scss";
```

### Import flexer standalone (with core)

```scss
// Flexer internally @uses @mastors/core/api — just import the package
@use "@mastors/flexer/scss";
```

### Import a single partial

```scss
@use "@mastors/flexer/scss/utilities/flex-direction";
```

### HTML usage

```html
<!-- Flex container -->
<div class="flex flex-row items-center justify-between gap-4">
  <div class="flex-1">Grows to fill space</div>
  <div class="shrink-0">Does not shrink</div>
</div>

<!-- Responsive column → row layout -->
<div class="flex flex-col md:flex-row gap-6">
  <aside class="basis-1/4">Sidebar</aside>
  <main class="flex-1">Content</main>
</div>

<!-- Centred content -->
<div class="flex items-center justify-center">
  <p>Perfectly centered</p>
</div>
```

---

## Utility Classes

### Display

Sets `display` to a flex context.

| Class | CSS |
|---|---|
| `.flex` | `display: flex` |
| `.inline-flex` | `display: inline-flex` |

Both support responsive prefixes: `.md:flex`, `.lg:inline-flex`.

---

### Flex Direction

Controls the main axis direction of a flex container.

| Class | CSS |
|---|---|
| `.flex-row` | `flex-direction: row` |
| `.flex-row-reverse` | `flex-direction: row-reverse` |
| `.flex-col` | `flex-direction: column` |
| `.flex-col-reverse` | `flex-direction: column-reverse` |

All support responsive prefixes.

---

### Flex Wrap

Controls whether flex items wrap to new lines.

| Class | CSS |
|---|---|
| `.flex-wrap` | `flex-wrap: wrap` |
| `.flex-wrap-reverse` | `flex-wrap: wrap-reverse` |
| `.flex-nowrap` | `flex-wrap: nowrap` |

All support responsive prefixes.

---

### Flex Flow

Sets `flex-flow` (direction + wrap) in one property.

| Class | CSS |
|---|---|
| `.flex-flow-row-wrap` | `flex-flow: row wrap` |
| `.flex-flow-row-nowrap` | `flex-flow: row nowrap` |
| `.flex-flow-row-wrap-reverse` | `flex-flow: row wrap-reverse` |
| `.flex-flow-col-wrap` | `flex-flow: column wrap` |
| `.flex-flow-col-nowrap` | `flex-flow: column nowrap` |
| `.flex-flow-col-wrap-reverse` | `flex-flow: column wrap-reverse` |

All support responsive prefixes.

---

### Flex Grow & Shrink

Controls whether a flex item can grow or shrink.

| Class | CSS |
|---|---|
| `.grow` | `flex-grow: 1` |
| `.grow-0` | `flex-grow: 0` |
| `.shrink` | `flex-shrink: 1` |
| `.shrink-0` | `flex-shrink: 0` |

---

### Flex Basis

Sets the initial main-size of a flex item.

**Named values:**

| Class | CSS |
|---|---|
| `.basis-auto` | `flex-basis: auto` |
| `.basis-full` | `flex-basis: 100%` |
| `.basis-0` | `flex-basis: 0px` |

**Fractional values:**

| Class | Value |
|---|---|
| `.basis-1/2` | `50%` |
| `.basis-1/3` | `33.333%` |
| `.basis-2/3` | `66.667%` |
| `.basis-1/4` | `25%` |
| `.basis-2/4` | `50%` |
| `.basis-3/4` | `75%` |
| `.basis-1/5` | `20%` |
| `.basis-2/5` | `40%` |
| `.basis-3/5` | `60%` |
| `.basis-4/5` | `80%` |
| `.basis-1/6` | `16.667%` |
| `.basis-5/6` | `83.333%` |
| `.basis-1/12` | `8.333%` |

**Fixed rem values:** `.basis-16` through `.basis-96` (4rem–24rem in standard spacing steps).

---

### Flex Shorthand

The most commonly used flex item presets.

| Class | CSS | When to use |
|---|---|---|
| `.flex-1` | `flex: 1 1 0%` | Grow and shrink, ignore natural size |
| `.flex-auto` | `flex: 1 1 auto` | Grow and shrink, respect natural size |
| `.flex-initial` | `flex: 0 1 auto` | Don't grow, but shrink if needed (browser default) |
| `.flex-none` | `flex: none` | Rigid — no grow, no shrink |

---

### Justify Content

Aligns flex items along the **main axis**.

| Class | CSS |
|---|---|
| `.justify-start` | `justify-content: flex-start` |
| `.justify-end` | `justify-content: flex-end` |
| `.justify-center` | `justify-content: center` |
| `.justify-between` | `justify-content: space-between` |
| `.justify-around` | `justify-content: space-around` |
| `.justify-evenly` | `justify-content: space-evenly` |
| `.justify-stretch` | `justify-content: stretch` |
| `.justify-normal` | `justify-content: normal` |

All support responsive prefixes.

---

### Justify Items

Aligns flex items along the **inline axis** (all items).

| Class | CSS |
|---|---|
| `.justify-items-start` | `justify-items: start` |
| `.justify-items-end` | `justify-items: end` |
| `.justify-items-center` | `justify-items: center` |
| `.justify-items-stretch` | `justify-items: stretch` |

All support responsive prefixes.

---

### Justify Self

Aligns a **single** flex item along the inline axis.

| Class | CSS |
|---|---|
| `.justify-self-auto` | `justify-self: auto` |
| `.justify-self-start` | `justify-self: start` |
| `.justify-self-end` | `justify-self: end` |
| `.justify-self-center` | `justify-self: center` |
| `.justify-self-stretch` | `justify-self: stretch` |

All support responsive prefixes.

---

### Align Content

Aligns **wrapped flex lines** along the cross axis.

| Class | CSS |
|---|---|
| `.content-normal` | `align-content: normal` |
| `.content-center` | `align-content: center` |
| `.content-start` | `align-content: flex-start` |
| `.content-end` | `align-content: flex-end` |
| `.content-between` | `align-content: space-between` |
| `.content-around` | `align-content: space-around` |
| `.content-evenly` | `align-content: space-evenly` |
| `.content-stretch` | `align-content: stretch` |
| `.content-baseline` | `align-content: baseline` |

All support responsive prefixes.

---

### Align Items

Aligns **all** flex items along the cross axis.

| Class | CSS |
|---|---|
| `.items-start` | `align-items: flex-start` |
| `.items-end` | `align-items: flex-end` |
| `.items-center` | `align-items: center` |
| `.items-stretch` | `align-items: stretch` |
| `.items-baseline` | `align-items: baseline` |

All support responsive prefixes.

---

### Align Self

Aligns a **single** flex item along the cross axis.

| Class | CSS |
|---|---|
| `.self-auto` | `align-self: auto` |
| `.self-start` | `align-self: flex-start` |
| `.self-end` | `align-self: flex-end` |
| `.self-center` | `align-self: center` |
| `.self-stretch` | `align-self: stretch` |
| `.self-baseline` | `align-self: baseline` |

All support responsive prefixes.

---

### Place Content

Shorthand for `align-content` + `justify-content`.

| Class | CSS |
|---|---|
| `.place-content-center` | `place-content: center` |
| `.place-content-start` | `place-content: start` |
| `.place-content-end` | `place-content: end` |
| `.place-content-between` | `place-content: space-between` |
| `.place-content-around` | `place-content: space-around` |
| `.place-content-evenly` | `place-content: space-evenly` |
| `.place-content-stretch` | `place-content: stretch` |
| `.place-content-baseline` | `place-content: baseline` |

All support responsive prefixes.

---

### Place Items

Shorthand for `align-items` + `justify-items`.

| Class | CSS |
|---|---|
| `.place-items-start` | `place-items: start` |
| `.place-items-end` | `place-items: end` |
| `.place-items-center` | `place-items: center` |
| `.place-items-stretch` | `place-items: stretch` |
| `.place-items-baseline` | `place-items: baseline` |

All support responsive prefixes.

---

### Place Self

Shorthand for `align-self` + `justify-self` on a single item.

| Class | CSS |
|---|---|
| `.place-self-auto` | `place-self: auto` |
| `.place-self-start` | `place-self: start` |
| `.place-self-end` | `place-self: end` |
| `.place-self-center` | `place-self: center` |
| `.place-self-stretch` | `place-self: stretch` |

All support responsive prefixes.

---

### Order

Controls the visual order of a flex item.

**Named values:**

| Class | CSS |
|---|---|
| `.order-first` | `order: -9999` |
| `.order-last` | `order: 9999` |
| `.order-none` | `order: 0` |

**Numeric scale:** `.order-1` through `.order-12`.

---

### Gap

Gap utilities (`.gap-*`, `.gap-x-*`, `.gap-y-*`) are provided by `@mastors/core` and work for both flex and grid containers. They do not need to be imported separately — they are available whenever `@mastors/core` is imported.

See the [`@mastors/core` spacing utilities](../core/README.md#utility-classes) for the full scale.

```html
<div class="flex gap-4">...</div>
<div class="flex gap-x-6 gap-y-2">...</div>
```

---

## Responsive Variants

Every utility marked `responsive: true` generates breakpoint-prefixed variants using the pattern `.{bp}:{class}`.

**Breakpoints:**

| Prefix | Min-width |
|---|---|
| *(none)* | 0px (mobile base) |
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

**Examples:**

```html
<!-- Stack on mobile, row on md and above -->
<div class="flex flex-col md:flex-row">

<!-- Center on small, space-between on large -->
<nav class="flex justify-center lg:justify-between">

<!-- Change alignment per breakpoint -->
<div class="flex items-start sm:items-center lg:items-end">

<!-- Responsive flex display -->
<div class="flex xl:inline-flex">
```

Utilities that support responsive variants: `flex` display, `flex-direction`, `flex-wrap`, `flex-flow`, `justify-content`, `justify-items`, `justify-self`, `align-content`, `align-items`, `align-self`, `place-content`, `place-items`, `place-self`.

---

## Package Exports

```json
{
  ".": "./dist/mastors-flexer.css",
  "./scss": "./scss/index.scss",
  "./scss/*": "./scss/*"
}
```

```scss
/* Full flexer stylesheet */
@use "@mastors/flexer/scss";

/* Individual partial */
@use "@mastors/flexer/scss/utilities/flex-direction";
```

---

## Peer Dependencies

| Package | Version |
|---|---|
| `@mastors/core` | `>= 1.0.0` |
| `sass` | `>= 1.80.0` |

---

## Changelog

### v1.2.0

- **Added:** `flex-container()` mixin — one-call flex container configuration (direction, wrap, justify, align, gap, inline)
- **Added:** `flex-item()` mixin — one-call flex item configuration (grow, shrink, basis, align-self, order)
- **Added:** `flex-center()` mixin — single-line centering shorthand; also ships `flex-center-x()` and `flex-center-y()` axis variants
- **Added:** `generate-flex-utilities()` generator — emit a complete flex utility set from a config map with per-axis opt-in and a single `responsive` flag
- **Updated dependency:** `@mastors/core@1.2.0`

### v1.1.0

- Updated dependency: `@mastors/core@1.1.0`

### v1.0.0

- Initial public release — full Flexbox utility set, `generate-utilities()` engine, full responsive breakpoint support

---

## License

MIT © Mastors Contributors
