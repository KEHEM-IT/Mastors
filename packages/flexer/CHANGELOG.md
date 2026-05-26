# @mastors/flexer

## 1.2.7

### Patch Changes

- **Fix:** `preuninstall` hook added — `mastors.config.js` and `mastors.config.scss` are deleted from the project root when all `@mastors/*` packages are removed; configs are preserved if any package remains
- **Fix:** `"peerDependenciesMeta": { "sass": { "optional": true } }` added — suppresses the unmet peer dependency warning for projects that supply Sass through a bundler rather than as a standalone package
- Added `preuninstall.js` to the published `"files"` list
- Updated dependency: `@mastors/core@1.2.7`

## 1.2.4

### Patch Changes

- Added `"sass"` export condition to `exports["."]` — bundlers (Vite, Webpack, etc.) now resolve the correct SCSS entry point automatically
- Added root-level `_index.scss` forwarding `scss/index` — enables `@use "@mastors/flexer"` via Sass `loadPaths: ['node_modules']` with no custom importer required
- Added `_index.scss` to `"files"` so the entry point is included in published packages
- Updated dependency: `@mastors/core@1.2.4`

## 1.2.0

### Minor Changes

- Added `flex-container()` mixin — one-call flex container configuration (direction, wrap, justify, align, gap, inline)
- Added `flex-item()` mixin — one-call flex item configuration (grow, shrink, basis, align-self, order)
- Added `flex-center()` mixin — single-line centering shorthand; also ships `flex-center-x()` and `flex-center-y()` axis variants
- Added `generate-flex-utilities()` generator — emit a complete flex utility set from a config map with per-axis opt-in and a single `responsive` flag
- Updated dependency: `@mastors/core@1.2.0`

## 1.1.0

### Patch Changes

- Updated dependencies
  - @mastors/core@1.1.0

## 1.0.0

### Major Changes

- Initial release of `@mastors/flexer`
