# @mastors/gridder

> Complete CSS Grid utility class system + authoring mixins for the Mastors ecosystem.

[![npm version](https://img.shields.io/npm/v/@mastors/gridder.svg)](https://www.npmjs.com/package/@mastors/gridder)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

---

## Overview

`@mastors/gridder` delivers a full set of CSS Grid utility classes and authoring mixins built on top of `@mastors/core`. Every class has a responsive variant — just prefix with a breakpoint key (e.g. `.md:grid-cols-3`).

---

## Installation

```bash
npm install @mastors/gridder @mastors/core
# or
pnpm add @mastors/gridder @mastors/core
```

Requires `sass >= 1.80.0`:

```bash
npm install --save-dev sass
```

---

## Usage

### Import the stylesheet

```scss
@use "@mastors/core/scss";
@use "@mastors/gridder/scss";
```

Or import only the SCSS source to compile yourself:

```scss
@use "@mastors/gridder/scss/index";
```

### Use authoring mixins

```scss
@use "@mastors/core/api" as m;
@use "@mastors/gridder/scss/mixins" as grid;

.layout {
  @include grid.gridder-areas(
    "header header header",
    "sidebar main    main",
    "footer footer  footer"
  );
  grid-template-columns: 240px 1fr;
  gap: m.spacing(4);
}

.layout__header  { @include grid.gridder("header"); }
.layout__sidebar { @include grid.gridder("sidebar"); }
.layout__main    { @include grid.gridder("main"); }
.layout__footer  { @include grid.gridder("footer"); }
```

---

## Package Exports

```json
{
  ".":        "./dist/mastors-gridder.css",
  "./scss":   "./scss/index.scss",
  "./scss/*": "./scss/*"
}
```

---

## Utility Classes

### Display

| Class | CSS |
|---|---|
| `.grid` | `display: grid` |
| `.inline-grid` | `display: inline-grid` |

### Template Columns

`.grid-cols-1` through `.grid-cols-12` `.grid-cols-none`

```html
<div class="grid grid-cols-3 md:grid-cols-6">...</div>
```

### Template Rows

`.grid-rows-1` through `.grid-rows-6` `.grid-rows-none`

### Auto Flow

`.grid-flow-row` `.grid-flow-col` `.grid-flow-dense` `.grid-flow-row-dense` `.grid-flow-col-dense`

### Auto Columns / Rows

`.auto-cols-auto` `.auto-cols-min` `.auto-cols-max` `.auto-cols-fr`
`.auto-rows-auto` `.auto-rows-min` `.auto-rows-max` `.auto-rows-fr`

### Column Span

`.col-span-1` through `.col-span-12` `.col-span-full` `.col-auto`

### Row Span

`.row-span-1` through `.row-span-6` `.row-span-full` `.row-auto`

### Column Start / End

`.col-start-1` through `.col-start-13` `.col-start-auto`
`.col-end-1` through `.col-end-13` `.col-end-auto`

### Row Start / End

`.row-start-1` through `.row-start-7` `.row-start-auto`
`.row-end-1` through `.row-end-7` `.row-end-auto`

### Justify Items / Content

`.justify-items-start` `.justify-items-end` `.justify-items-center` `.justify-items-stretch`
`.justify-content-start` `.justify-content-end` `.justify-content-center` `.justify-content-between` `.justify-content-around` `.justify-content-evenly`

### Align Items / Content

`.items-start` `.items-end` `.items-center` `.items-stretch` `.items-baseline`
`.content-start` `.content-end` `.content-center` `.content-between` `.content-around` `.content-evenly` `.content-stretch`

### Place Items / Content / Self

`.place-items-start` `.place-items-center` `.place-items-end` `.place-items-stretch`
`.place-content-start` `.place-content-center` `.place-content-between` `.place-content-stretch`
`.place-self-auto` `.place-self-start` `.place-self-center` `.place-self-end` `.place-self-stretch`

### Gap

`.gap-0` through `.gap-96` (follows the core spacing scale)
`.gap-x-{n}` `.gap-y-{n}`

### Layout Presets

`.grid-sidebar` — two-column layout with a 240px sidebar and a `1fr` main area
`.grid-holy-grail` — three-column holy grail layout

---

## Authoring Mixins

### `gridder($area, $col-start?, $col-end?, $row-start?, $row-end?, $align-self?, $justify-self?)`

Place an element in a named grid area or via explicit line numbers.

```scss
// Named area (grid-template-areas mode)
@include grid.gridder("sidebar");

// Explicit lines
@include grid.gridder(
  $area:         null,
  $col-start:    1,
  $col-end:      3,
  $row-start:    2,
  $row-end:      4,
  $align-self:   center,
  $justify-self: stretch
);
```

### `gridder-areas($rows...)`

Declare `grid-template-areas` from a variadic list of quoted row strings.

```scss
@include grid.gridder-areas(
  "header header",
  "nav    main",
  "footer footer"
);
```

---

## Responsive Variants

Every utility class ships a breakpoint-prefixed responsive variant:

```html
<div class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">...</div>
<div class="col-span-full md:col-span-6">...</div>
<div class="gap-4 xl:gap-8">...</div>
```

Breakpoints: `sm:` `md:` `lg:` `xl:` `2xl:`

---

## Changelog

See the [root CHANGELOG](../../README.md#changelog).

## License

MIT © Mastors Contributors
