# @mastors/flexer

> Complete flexbox utility class system + authoring mixins for the Mastors ecosystem.

[![npm version](https://img.shields.io/npm/v/@mastors/flexer.svg)](https://www.npmjs.com/package/@mastors/flexer)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

---

## Overview

`@mastors/flexer` delivers a full set of flexbox utility classes and authoring mixins built on top of `@mastors/core`. Every class has a responsive variant — just prefix with a breakpoint key (e.g. `.md:flex-col`).

---

## Installation

```bash
npm install @mastors/flexer @mastors/core
# or
pnpm add @mastors/flexer @mastors/core
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
@use "@mastors/flexer/scss";
```

Or import only the SCSS source to compile yourself:

```scss
@use "@mastors/flexer/scss/index";
```

### Use authoring mixins

```scss
@use "@mastors/core/api" as m;
@use "@mastors/flexer/scss/mixins" as flex;

.hero {
  @include flex.flex-container(row, wrap, center, center, 4);
}

.hero__item {
  @include flex.flex-item(1, 1, auto, center);
}

.centered-card {
  @include flex.flex-center;
}
```

### Use the generator

```scss
@use "@mastors/flexer/scss/generators/flex-generator" as gen;

@include gen.generate-flex-utilities((
  direction: true,
  wrap:      true,
  justify:   true,
  align:     true,
  grow:      true,
  shrink:    false,
  order:     false,
  responsive: true,
));
```

---

## Package Exports

```json
{
  ".": {
    "sass":  "./scss/index.scss",
    "style": "./dist/mastors-flexer.css"
  },
  "./scss":   "./scss/index.scss",
  "./scss/*": "./scss/*"
}
```

---

## Utility Classes

### Display

| Class | CSS |
|---|---|
| `.flex` | `display: flex` |
| `.inline-flex` | `display: inline-flex` |

### Direction

| Class | CSS |
|---|---|
| `.flex-row` | `flex-direction: row` |
| `.flex-row-reverse` | `flex-direction: row-reverse` |
| `.flex-col` | `flex-direction: column` |
| `.flex-col-reverse` | `flex-direction: column-reverse` |

### Wrap

| Class | CSS |
|---|---|
| `.flex-wrap` | `flex-wrap: wrap` |
| `.flex-nowrap` | `flex-wrap: nowrap` |
| `.flex-wrap-reverse` | `flex-wrap: wrap-reverse` |

### Justify Content

`.justify-start` `.justify-end` `.justify-center` `.justify-between` `.justify-around` `.justify-evenly`

### Align Items

`.items-start` `.items-end` `.items-center` `.items-baseline` `.items-stretch`

### Align Content

`.content-start` `.content-end` `.content-center` `.content-between` `.content-around` `.content-evenly`

### Align Self

`.self-auto` `.self-start` `.self-end` `.self-center` `.self-stretch` `.self-baseline`

### Place Content / Items

`.place-content-start` `.place-content-center` `.place-content-between` `.place-content-stretch`
`.place-items-start` `.place-items-center` `.place-items-end` `.place-items-stretch`

### Grow / Shrink

`.grow` `.grow-0` `.shrink` `.shrink-0`

### Flex Shorthand

`.flex-1` `.flex-auto` `.flex-initial` `.flex-none`

### Order

`.order-first` `.order-last` `.order-none` `.order-1` through `.order-12`

### Gap

`.gap-0` through `.gap-96` (follows the core spacing scale)
`.gap-x-{n}` `.gap-y-{n}`

---

## Authoring Mixins

### `flex-container($direction, $wrap, $justify, $align, $gap, $inline)`

One-call flex container configuration.

```scss
@include flex.flex-container(
  $direction: row,
  $wrap:      wrap,
  $justify:   space-between,
  $align:     center,
  $gap:       4,       // uses m.spacing(4)
  $inline:    false
);
```

### `flex-item($grow, $shrink, $basis, $align-self, $order)`

One-call flex item configuration.

```scss
@include flex.flex-item(
  $grow:       1,
  $shrink:     1,
  $basis:      auto,
  $align-self: center,
  $order:      null
);
```

### `flex-center` / `flex-center-x` / `flex-center-y`

Single-line centering shortcuts.

```scss
@include flex.flex-center;    // centers on both axes
@include flex.flex-center-x;  // centers horizontally only
@include flex.flex-center-y;  // centers vertically only
```

---

## Responsive Variants

Every utility class ships a breakpoint-prefixed responsive variant:

```html
<div class="flex-col md:flex-row lg:flex-row">...</div>
<div class="items-start md:items-center">...</div>
<div class="gap-4 lg:gap-8">...</div>
```

Breakpoints: `sm:` `md:` `lg:` `xl:` `2xl:`

---

## Changelog

### 1.2.4

- Added `"sass"` export condition to `exports["."]` — bundlers now resolve the SCSS entry point automatically
- Added root-level `_index.scss` forwarding `scss/index` — enables `@use "@mastors/flexer"` via Sass `loadPaths: ['node_modules']` with no custom importer required
- Added `_index.scss` to `"files"` so the entry point is included in published packages

### 1.2.3

- Patch release — dependency and tooling updates

### 1.2.0

- Added `flex-container()` mixin — one-call flex container configuration (direction, wrap, justify, align, gap, inline)
- Added `flex-item()` mixin — one-call flex item configuration (grow, shrink, basis, align-self, order)
- Added `flex-center()` mixin — single-line centering shorthand; also ships `flex-center-x()` and `flex-center-y()` axis variants
- Added `generate-flex-utilities()` generator — emit a complete flex utility set from a config map with per-axis opt-in and a single `responsive` flag
- Updated dependency: `@mastors/core@1.2.0`

### 1.1.0

- Updated dependencies: `@mastors/core@1.1.0`

### 1.0.0

- Initial release

## License

MIT © Mastors Contributors
