# @mastors/gridder

> Complete CSS Grid utility class system for the Mastors ecosystem.

[![npm](https://img.shields.io/npm/v/@mastors/gridder.svg)](https://www.npmjs.com/package/@mastors/gridder)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)
[![sass](https://img.shields.io/badge/requires-sass%20%3E%3D1.80-CC6699.svg)](https://sass-lang.com)

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Utility Classes](#utility-classes)
  - [Display](#display)
  - [Grid Template Columns](#grid-template-columns)
  - [Grid Template Rows](#grid-template-rows)
  - [Grid Template Areas](#grid-template-areas)
  - [Grid Auto Flow](#grid-auto-flow)
  - [Grid Auto Columns](#grid-auto-columns)
  - [Grid Auto Rows](#grid-auto-rows)
  - [Column Span](#column-span)
  - [Column Start & End](#column-start--end)
  - [Row Span](#row-span)
  - [Row Start & End](#row-start--end)
  - [Grid Column Shorthand](#grid-column-shorthand)
  - [Grid Row Shorthand](#grid-row-shorthand)
  - [Justify Items](#justify-items)
  - [Justify Self](#justify-self)
  - [Align Items](#align-items)
  - [Align Self](#align-self)
  - [Place Items](#place-items)
  - [Place Self](#place-self)
  - [Gap](#gap)
  - [Layout Presets](#layout-presets)
- [Responsive Variants](#responsive-variants)
- [Package Exports](#package-exports)
- [Peer Dependencies](#peer-dependencies)

---

## Overview

`@mastors/gridder` provides a complete set of atomic utility classes for CSS Grid — covering grid container setup, explicit and implicit track definitions, item placement, alignment, and named template area layouts. All utilities are generated via the core `generate-utilities()` engine and fully support responsive breakpoint prefixes.

The package requires `@mastors/core` as a peer dependency and consumes its public API for the generator engine. It produces only utility classes — no reset, no base styles.

---

## Installation

```bash
npm install @mastors/gridder @mastors/core sass
# or
pnpm add @mastors/gridder @mastors/core sass
```

---

## Usage

### Import the full stylesheet

```scss
@use "@mastors/core/scss";
@use "@mastors/gridder/scss";
```

### Import a single partial

```scss
@use "@mastors/gridder/scss/utilities/grid-template-columns";
```

### HTML usage

```html
<!-- 3-column grid with gap -->
<div class="grid grid-cols-3 gap-6">
  <div class="col-span-2">Wide item</div>
  <div>Narrow item</div>
</div>

<!-- Responsive grid — 1 col on mobile, 2 on md, 3 on lg -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

<!-- Item spanning full width -->
<div class="grid grid-cols-12 gap-4">
  <header class="col-span-full">Full-width header</header>
  <aside class="col-span-3">Sidebar</aside>
  <main class="col-span-9">Content</main>
</div>
```

---

## Utility Classes

### Display

Sets `display` to a grid context.

| Class | CSS |
|---|---|
| `.grid` | `display: grid` |
| `.inline-grid` | `display: inline-grid` |

Both support responsive prefixes.

---

### Grid Template Columns

Defines explicit column tracks.

**Fixed column counts** (each track is `minmax(0, 1fr)`):

| Class | CSS |
|---|---|
| `.grid-cols-1` | `grid-template-columns: repeat(1, minmax(0, 1fr))` |
| `.grid-cols-2` | `grid-template-columns: repeat(2, minmax(0, 1fr))` |
| `.grid-cols-3` | `grid-template-columns: repeat(3, minmax(0, 1fr))` |
| `.grid-cols-4` | `grid-template-columns: repeat(4, minmax(0, 1fr))` |
| `.grid-cols-5` | `grid-template-columns: repeat(5, minmax(0, 1fr))` |
| `.grid-cols-6` | `grid-template-columns: repeat(6, minmax(0, 1fr))` |
| `.grid-cols-7` | `grid-template-columns: repeat(7, minmax(0, 1fr))` |
| `.grid-cols-8` | `grid-template-columns: repeat(8, minmax(0, 1fr))` |
| `.grid-cols-9` | `grid-template-columns: repeat(9, minmax(0, 1fr))` |
| `.grid-cols-10` | `grid-template-columns: repeat(10, minmax(0, 1fr))` |
| `.grid-cols-11` | `grid-template-columns: repeat(11, minmax(0, 1fr))` |
| `.grid-cols-12` | `grid-template-columns: repeat(12, minmax(0, 1fr))` |

**Named variants:**

| Class | CSS |
|---|---|
| `.grid-cols-none` | `grid-template-columns: none` |
| `.grid-cols-subgrid` | `grid-template-columns: subgrid` |
| `.grid-cols-auto` | `grid-template-columns: auto` |
| `.grid-cols-min` | `grid-template-columns: min-content` |
| `.grid-cols-max` | `grid-template-columns: max-content` |
| `.grid-cols-fr` | `grid-template-columns: minmax(0, 1fr)` |

---

### Grid Template Rows

Defines explicit row tracks.

**Fixed row counts:**

| Class | CSS |
|---|---|
| `.grid-rows-1` | `grid-template-rows: repeat(1, minmax(0, 1fr))` |
| `.grid-rows-2` | `grid-template-rows: repeat(2, minmax(0, 1fr))` |
| `.grid-rows-3` | `grid-template-rows: repeat(3, minmax(0, 1fr))` |
| `.grid-rows-4` | `grid-template-rows: repeat(4, minmax(0, 1fr))` |
| `.grid-rows-5` | `grid-template-rows: repeat(5, minmax(0, 1fr))` |
| `.grid-rows-6` | `grid-template-rows: repeat(6, minmax(0, 1fr))` |

**Named variants:**

| Class | CSS |
|---|---|
| `.grid-rows-none` | `grid-template-rows: none` |
| `.grid-rows-subgrid` | `grid-template-rows: subgrid` |
| `.grid-rows-auto` | `grid-template-rows: auto` |
| `.grid-rows-min` | `grid-template-rows: min-content` |
| `.grid-rows-max` | `grid-template-rows: max-content` |
| `.grid-rows-fr` | `grid-template-rows: minmax(0, 1fr)` |

---

### Grid Template Areas

Named grid areas cannot be atomic utilities — the area strings are layout-specific. Gridder provides a SCSS mixin API and named placement helpers instead.

#### SCSS mixin API

```scss
@use "@mastors/gridder/scss/utilities/grid-template-areas" as areas;

.page-layout {
  display: grid;
  @include areas.define-areas(
    "header header",
    "sidebar main",
    "footer footer"
  );
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
}

.my-header  { @include areas.area(header); }
.my-sidebar { @include areas.area(sidebar); }
.my-main    { @include areas.area(main); }
.my-footer  { @include areas.area(footer); }
```

#### Named area placement classes

Assign child elements to their named areas:

| Class | CSS |
|---|---|
| `.area-header` | `grid-area: header` |
| `.area-nav` | `grid-area: nav` |
| `.area-sidebar` | `grid-area: sidebar` |
| `.area-main` | `grid-area: main` |
| `.area-aside` | `grid-area: aside` |
| `.area-footer` | `grid-area: footer` |

---

### Grid Auto Flow

Controls how the auto-placement algorithm fills the grid.

| Class | CSS |
|---|---|
| `.grid-flow-row` | `grid-auto-flow: row` |
| `.grid-flow-col` | `grid-auto-flow: column` |
| `.grid-flow-dense` | `grid-auto-flow: dense` |
| `.grid-flow-row-dense` | `grid-auto-flow: row dense` |
| `.grid-flow-col-dense` | `grid-auto-flow: column dense` |

Supports responsive prefixes.

---

### Grid Auto Columns

Sizes implicitly created columns.

| Class | CSS |
|---|---|
| `.auto-cols-auto` | `grid-auto-columns: auto` |
| `.auto-cols-min` | `grid-auto-columns: min-content` |
| `.auto-cols-max` | `grid-auto-columns: max-content` |
| `.auto-cols-fr` | `grid-auto-columns: minmax(0, 1fr)` |

---

### Grid Auto Rows

Sizes implicitly created rows.

| Class | CSS |
|---|---|
| `.auto-rows-auto` | `grid-auto-rows: auto` |
| `.auto-rows-min` | `grid-auto-rows: min-content` |
| `.auto-rows-max` | `grid-auto-rows: max-content` |
| `.auto-rows-fr` | `grid-auto-rows: minmax(0, 1fr)` |

---

### Column Span

Makes an item span multiple columns.

| Class | CSS |
|---|---|
| `.col-span-1` | `grid-column: span 1 / span 1` |
| `.col-span-2` | `grid-column: span 2 / span 2` |
| … | … |
| `.col-span-12` | `grid-column: span 12 / span 12` |
| `.col-span-full` | `grid-column: 1 / -1` |
| `.col-auto` | `grid-column: auto` |

---

### Column Start & End

Explicitly places an item at a grid column line.

**Start lines** — `.col-start-1` through `.col-start-13`, `.col-start-auto`

**End lines** — `.col-end-1` through `.col-end-13`, `.col-end-auto`

```html
<!-- Item starts at line 2 and ends at line 5 -->
<div class="col-start-2 col-end-5">...</div>
```

---

### Row Span

Makes an item span multiple rows.

| Class | CSS |
|---|---|
| `.row-span-1` | `grid-row: span 1 / span 1` |
| … | … |
| `.row-span-6` | `grid-row: span 6 / span 6` |
| `.row-span-full` | `grid-row: 1 / -1` |
| `.row-auto` | `grid-row: auto` |

---

### Row Start & End

Explicitly places an item at a grid row line.

**Start lines** — `.row-start-1` through `.row-start-7`, `.row-start-auto`

**End lines** — `.row-end-1` through `.row-end-7`, `.row-end-auto`

```html
<!-- Item starts at row 1, ends at row 3 -->
<div class="row-start-1 row-end-3">...</div>
```

---

### Grid Column Shorthand

`grid-column` shorthand placement utilities.

| Class | CSS |
|---|---|
| `.grid-col-auto` | `grid-column: auto` |
| `.grid-col-1` | `grid-column: 1` |
| … | … |
| `.grid-col-12` | `grid-column: 12` |

---

### Grid Row Shorthand

`grid-row` shorthand placement utilities.

| Class | CSS |
|---|---|
| `.grid-row-auto` | `grid-row: auto` |
| `.grid-row-1` | `grid-row: 1` |
| … | … |
| `.grid-row-6` | `grid-row: 6` |

---

### Justify Items

Aligns all grid items along the **inline axis**.

| Class | CSS |
|---|---|
| `.justify-items-start` | `justify-items: start` |
| `.justify-items-end` | `justify-items: end` |
| `.justify-items-center` | `justify-items: center` |
| `.justify-items-stretch` | `justify-items: stretch` |

Supports responsive prefixes.

---

### Justify Self

Aligns a **single** grid item along the inline axis.

| Class | CSS |
|---|---|
| `.justify-self-auto` | `justify-self: auto` |
| `.justify-self-start` | `justify-self: start` |
| `.justify-self-end` | `justify-self: end` |
| `.justify-self-center` | `justify-self: center` |
| `.justify-self-stretch` | `justify-self: stretch` |

Supports responsive prefixes.

---

### Align Items

Aligns all grid items along the **block axis**.

| Class | CSS |
|---|---|
| `.items-start` | `align-items: start` |
| `.items-end` | `align-items: end` |
| `.items-center` | `align-items: center` |
| `.items-stretch` | `align-items: stretch` |
| `.items-baseline` | `align-items: baseline` |

Supports responsive prefixes.

---

### Align Self

Aligns a **single** grid item along the block axis.

| Class | CSS |
|---|---|
| `.self-auto` | `align-self: auto` |
| `.self-start` | `align-self: start` |
| `.self-end` | `align-self: end` |
| `.self-center` | `align-self: center` |
| `.self-stretch` | `align-self: stretch` |
| `.self-baseline` | `align-self: baseline` |

Supports responsive prefixes.

---

### Place Items

Shorthand for `align-items` + `justify-items`.

| Class | CSS |
|---|---|
| `.place-items-start` | `place-items: start` |
| `.place-items-end` | `place-items: end` |
| `.place-items-center` | `place-items: center` |
| `.place-items-stretch` | `place-items: stretch` |

Supports responsive prefixes.

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

Supports responsive prefixes.

---

### Gap

Gap utilities (`.gap-*`, `.gap-x-*`, `.gap-y-*`) are provided by `@mastors/core` and work for both grid and flex containers. They are available whenever `@mastors/core` is imported.

```html
<div class="grid grid-cols-3 gap-6">...</div>
<div class="grid grid-cols-2 gap-x-8 gap-y-4">...</div>
```

See the [`@mastors/core` spacing utilities](../core/README.md#utility-classes) for the full scale.

---

### Layout Presets

Gridder ships three ready-made named-area layout classes for common full-page patterns.

#### Holy Grail

Header / (nav + main + aside) / footer — three columns, three rows.

```html
<div class="layout-holy-grail">
  <div class="area-header">Header</div>
  <div class="area-nav">Nav</div>
  <div class="area-main">Main</div>
  <div class="area-aside">Aside</div>
  <div class="area-footer">Footer</div>
</div>
```

Grid template: `"header header header" / "nav main aside" / "footer footer footer"`, columns `auto 1fr auto`.

#### Sidebar

Two-column: fixed-width sidebar + fluid main area.

```html
<div class="layout-sidebar">
  <div class="area-sidebar">Sidebar</div>
  <div class="area-main">Content</div>
</div>
```

Grid template: `"sidebar main"`, columns `auto 1fr`.

#### Dashboard

Header + (sidebar + content) + footer.

```html
<div class="layout-dashboard">
  <div class="area-header">Header</div>
  <div class="area-sidebar">Sidebar</div>
  <div class="area-content">Content</div>
  <div class="area-footer">Footer</div>
</div>
```

Grid template: `"header header" / "sidebar content" / "footer footer"`, columns `auto 1fr`.

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
<!-- 1 col → 2 col → 3 col as viewport grows -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- Switch auto-flow direction on large screens -->
<div class="grid grid-flow-row lg:grid-flow-col">

<!-- Center items on mobile, stretch on desktop -->
<div class="grid place-items-center lg:place-items-stretch">

<!-- Item spans full width on mobile, 8/12 on lg -->
<div class="col-span-full lg:col-span-8">
```

Utilities with responsive support: `grid` display, `grid-auto-flow`, `justify-items`, `justify-self`, `align-items`, `align-self`, `place-items`, `place-self`.

---

## Package Exports

```json
{
  ".": "./dist/mastors-gridder.css",
  "./scss": "./scss/index.scss",
  "./scss/*": "./scss/*"
}
```

```scss
/* Full gridder stylesheet */
@use "@mastors/gridder/scss";

/* Individual partial */
@use "@mastors/gridder/scss/utilities/grid-template-columns";

/* Template areas mixin API */
@use "@mastors/gridder/scss/utilities/grid-template-areas" as areas;
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

- **Added:** `gridder($area, ...)` mixin — named `grid-area` placement with optional `align-self` / `justify-self` overrides in the same call
- **Added:** `gridder-areas($rows...)` mixin — declare `grid-template-areas` from a variadic list of quoted row strings, co-located with `gridder()` child calls
- **Updated dependency:** `@mastors/core@1.2.0`

### v1.1.0

- Updated dependency: `@mastors/core@1.1.0`

### v1.0.0

- Initial public release — full CSS Grid utility set, layout presets, `generate-utilities()` engine, full responsive breakpoint support

---

## License

MIT © Mastors Contributors
