# @mastors/gridder

## 1.2.4

### Patch Changes

- Added `"sass"` export condition to `exports["."]` — bundlers (Vite, Webpack, etc.) now resolve the correct SCSS entry point automatically
- Added root-level `_index.scss` forwarding `scss/index` — enables `@use "@mastors/gridder"` via Sass `loadPaths: ['node_modules']` with no custom importer required
- Added `_index.scss` to `"files"` so the entry point is included in published packages
- Updated dependency: `@mastors/core@1.2.4`

## 1.2.0

### Minor Changes

- Added `gridder($area, ...)` mixin — named `grid-area` placement with optional `align-self` / `justify-self` overrides
- Added `gridder-areas($rows...)` mixin — declare `grid-template-areas` from a variadic list of quoted row strings
- Updated dependency: `@mastors/core@1.2.0`

## 1.1.0

### Patch Changes

- Updated dependencies
  - @mastors/core@1.1.0

## 1.0.0

### Major Changes

- Initial release of `@mastors/gridder`
