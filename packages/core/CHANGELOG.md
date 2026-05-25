# @mastors/core

## 1.2.0

### Minor Changes

- Added `vars($token, $fallback?)` SCSS function in `functions/_vars.scss` — wraps the `--mastors-` namespace so consumers reference tokens via `var(--mastors-{name})` without hard-coding the prefix
- Added `config/_index.scss` shim — forwards `_settings.scss` and `_flags.scss` through the public API (`@use "@mastors/core/api"`)
- Added `utilities/_typography.scss` — text-align, font-size/weight/family, font-style, leading, tracking, text-decoration, text-transform, text-overflow, white-space, word-break, vertical-align, list-style, font-smoothing
- Added `utilities/_animation.scss` — transition presets, token-driven durations/delays/easings, named animation presets (spin/ping/pulse/bounce/fade/slide/scale), `@keyframes`, fill-mode, play-state, iteration utilities
- Added `utilities/_interaction.scss` — user-select, resize, scroll-behavior, scroll-snap, touch-action, and hover:/focus:/disabled: state variant utilities
- Added `utilities/_layout.scss` — aspect-ratio block (`.aspect-square`, `.aspect-video`, `.aspect-4-3`, etc.), documented alongside object-fit/position
- Added `accessibility/_print.scss` — `print:hidden`, `screen:hidden`, break utilities, color/shadow resets, automatic `a[href]::after` link expansion

## 1.1.0

### Minor Changes

- Fix deprecated Sass `if()` syntax in `_em.scss` and `_class-generator.scss` — replaced with `@if/@else` blocks for compatibility with modern Sass
- Add `inputs` field to `turbo.json` build task so SCSS changes correctly invalidate the Turbo cache

## 1.0.0

### Major Changes

- Initial release of `@mastors/core`
