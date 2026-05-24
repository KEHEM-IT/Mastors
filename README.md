# Mastors

> A professional-grade, scalable frontend SCSS utility ecosystem — built as a monorepo.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)
[![turborepo](https://img.shields.io/badge/built%20with-turborepo-EF4444.svg)](https://turbo.build/)

---

## Table of Contents

- [Overview](#overview)
- [Packages](#packages)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Monorepo Architecture](#monorepo-architecture)
- [Filesystem Structure](#filesystem-structure)
- [SCSS Architecture](#scss-architecture)
- [Build System](#build-system)
- [Package Exports](#package-exports)
- [Responsive Engine](#responsive-engine)
- [Theme System](#theme-system)
- [Token System](#token-system)
- [TypeScript Support](#typescript-support)
- [Development Workflow](#development-workflow)
- [Publishing & Versioning](#publishing--versioning)
- [Naming Conventions](#naming-conventions)
- [Plugin Architecture](#plugin-architecture)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

**Mastors** is a modular, opt-in frontend SCSS utility ecosystem. It is designed as a proper monorepo using **PNPM workspaces** and **TurboRepo**, following patterns established by Tailwind CSS, Mantine, Radix, and Babel.

Every package in the `@mastors` scope is independently installable and tree-shakeable. You only ship CSS for what you actually use.

The ecosystem is built on three pillars:

1. **Tokens** — A single source of truth for all design decisions (color, spacing, type, shadow, radius, z-index, duration, easing, opacity, sizing).
2. **Architecture** — A layered SCSS system (abstracts → tokens → functions → mixins → generators → utilities) that ensures zero unintended side effects and predictable cascade ordering.
3. **Packages** — Independent, composable packages that share the core token/mixin layer but produce their own scoped CSS output.

---

## Packages

| Package | Description | Version | Install |
|---|---|---|---|
| `@mastors/core` | Foundational tokens, mixins, functions, reset, responsive engine | `1.2.0` | `npm i @mastors/core` |
| `@mastors/flexer` | Complete flexbox utility class system + authoring mixins | `1.2.0` | `npm i @mastors/flexer @mastors/core` |
| `@mastors/gridder` | Complete CSS Grid utility class system + authoring mixins | `1.2.0` | `npm i @mastors/gridder @mastors/core` |
| `@mastors/typography` | Type scale, font utilities, prose system | *coming soon* | — |
| `@mastors/themes` | Theme definitions, dark mode, custom theme support | *coming soon* | — |
| `@mastors/animator` | Animation and transition utility classes | *coming soon* | — |

All packages are published under the `@mastors` npm scope with `"access": "public"`.

---

## Installation

### Install the full ecosystem

```bash
npm install @mastors/core
# or
pnpm add @mastors/core
# or
yarn add @mastors/core
```

Installing `@mastors/core` automatically prints a terminal message listing optional packages.

### Install packages individually

```bash
# Core (required by all other packages)
npm install @mastors/core

# Add layout packages
npm install @mastors/flexer
npm install @mastors/gridder
```

### Peer dependency

All packages require `sass >= 1.80.0`:

```bash
npm install --save-dev sass
```

---

## Quick Start

### 1. Import everything (kitchen sink)

```scss
// styles/main.scss
@use "@mastors/core/scss";
@use "@mastors/flexer/scss";
@use "@mastors/gridder/scss";
```

### 2. Import core only

```scss
@use "@mastors/core/scss";
```

### 3. Use the public API in your own SCSS

```scss
// Import tokens, mixins, functions, and config — zero CSS output
@use "@mastors/core/api" as m;

.my-component {
  padding:          m.spacing(4);
  color:            m.color("primary", 600);
  border-radius:    m.radius("md");
  // Reference any token as a CSS custom property by name
  box-shadow:       m.vars(shadow-md);
  transition:       opacity m.vars(duration-200) m.vars(ease-out);

  @include m.bp("lg") {
    padding: m.spacing(8);
  }

  @include m.dark-mode {
    color: m.color("primary", 300);
  }
}
```

### 4. JavaScript / TypeScript

```ts
import { tokens } from '@mastors/core'

// Access design tokens at runtime
const primaryColor = tokens.color.primary['600']
const spacingUnit  = tokens.spacing['4']
const shadowMd     = tokens.shadow.md
```

---

## Monorepo Architecture

```
mastors/                          ← Monorepo root (private)
├── packages/                     ← Publishable @mastors/* packages
│   ├── core/
│   ├── flexer/
│   └── gridder/
├── tooling/                      ← Private shared build tooling
│   ├── sass-config/              ← Shared Sass compiler options + compile helper
│   ├── build-utils/              ← Shared build helpers (cleanDir, ensureDir)
│   └── tsconfig/                 ← Shared TypeScript base configs
├── scripts/                      ← Root-level automation scripts
├── .changeset/                   ← Changesets version management
├── package.json                  ← Root workspace manifest (private)
├── pnpm-workspace.yaml           ← PNPM workspace definition
├── turbo.json                    ← TurboRepo task config (uses "tasks" key — Turbo v2)
├── tsconfig.base.json            ← Base TypeScript config
└── tsconfig.json                 ← Root TypeScript config
```

### Dependency graph

```
@mastors/core          ← No @mastors/* peer dependencies

@mastors/flexer
  └── peerDep: @mastors/core >=1.0.0

@mastors/gridder
  └── peerDep: @mastors/core >=1.0.0

tooling/sass-config    ← private, no @mastors/* deps
tooling/build-utils    ← private, depends on sass-config
tooling/tsconfig       ← private, no deps
```

`@mastors/core` is the only package with no peer dependencies within the ecosystem. Every other package consumes core's public SCSS API (`@mastors/core/api`) for shared tokens, mixins, and functions, but produces its own independent CSS output.

---

## Filesystem Structure

### Per-package structure

Every `@mastors/*` package follows this layout:

```
packages/<name>/
├── scss/                  ← SCSS source (the primary deliverable)
│   ├── index.scss         ← Package entry point
│   ├── utilities/         ← Atomic utility class partials
│   ├── mixins/            ← Package-scoped mixins
│   ├── generators/        ← Class generation logic
│   └── responsive/        ← Responsive variant wrappers
├── src/                   ← TypeScript source (core only; JS/TS consumers)
│   ├── index.ts
│   ├── types.ts
│   └── tokens.ts          ← Auto-generated by scripts/generate-tokens.js
├── scripts/               ← Package-level build scripts (core only)
│   └── generate-tokens.js ← Regenerates src/tokens.ts from SCSS token maps
├── dist/                  ← Build output (git-ignored)
│   ├── mastors-<name>.css
│   ├── mastors-<name>.css.map
│   ├── index.js           ← CJS (core only)
│   ├── index.mjs          ← ESM (core only)
│   └── index.d.ts         ← TypeScript declarations (core only)
├── postinstall.js         ← Welcome message (core only)
├── build.js               ← Package build script
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── README.md
```

---

## SCSS Architecture

`@mastors/core` contains the full SCSS layer architecture. All other packages consume it via `@mastors/core/api`.

```
packages/core/scss/
├── index.scss             ← Master entry — imports all layers in order
│
├── config/                ← Global settings (no CSS output)
│   ├── _settings.scss     ← Master config map ($mastors-config) + config() accessor
│   ├── _flags.scss        ← Per-module enable/disable boolean flags ($enable-*)
│   └── _index.scss        ← Barrel — forwards settings + flags; consumed by api/_index.scss
│
├── abstracts/             ← Shared maps and silent placeholders (no CSS output)
│   ├── _maps.scss         ← Reserved stub for cross-cutting shared maps
│   └── _placeholders.scss ← Reserved stub for shared %placeholders
│
├── variables/             ← SCSS variables (no CSS output)
│   ├── _breakpoints.scss  ← Named breakpoint map (xs/sm/md/lg/xl/2xl)
│   ├── _grid.scss         ← Grid column/gutter config
│   ├── _container.scss    ← Container max-width map
│   └── _global.scss       ← Prefix, base font size, etc.
│
├── tokens/                ← Primitive design tokens as SCSS maps (no CSS output)
│   ├── _color.scss        ← Full color palette (scales 50–950)
│   ├── _spacing.scss      ← 35-step spacing scale
│   ├── _typography.scss   ← Font sizes, families, weights, tracking, line-height
│   ├── _shadows.scss      ← Box-shadow elevation scale (xs–2xl + inner)
│   ├── _radii.scss        ← Border-radius scale (none–full)
│   ├── _transitions.scss  ← Duration and easing curves
│   ├── _z-index.scss      ← Stacking layer map
│   ├── _opacity.scss      ← Opacity scale
│   └── _sizing.scss       ← Width/height scale (fixed + fractions + keywords)
│
├── functions/             ← SCSS functions (no CSS output)
│   ├── _color.scss        ← tint(), shade(), alpha(), contrast()
│   ├── _math.scss         ← clamp-value(), fluid()
│   ├── _string.scss       ← str-replace(), to-string()
│   ├── _map-helpers.scss  ← map-deep-get(), map-collect()
│   ├── _rem.scss          ← rem() — px → rem conversion
│   ├── _em.scss           ← em() — px → em conversion
│   └── _vars.scss         ← vars() — reference any token as var(--mastors-{name})
│
├── mixins/                ← SCSS mixins (no CSS output)
│   ├── _breakpoint.scss   ← bp(), respond-to(), breakpoint-up(), breakpoint-down()
│   ├── _theme.scss        ← dark-mode(), light-mode(), theme()
│   ├── _elevation.scss    ← elevation($level)
│   ├── _transition.scss   ← transition() with token-driven timing
│   ├── _pseudo.scss       ← pseudo($display, $pos, $content)
│   └── _container.scss    ← container() responsive width mixin
│
├── generators/            ← Class generation engines (no CSS output)
│   ├── _class-generator.scss           ← generate-utilities() — base + responsive Pass 2
│   ├── _custom-property-generator.scss ← emit-custom-properties(), emit-nested-custom-properties()
│   └── _responsive-generator.scss      ← generate-responsive() thin wrapper → engine.run()
│
├── base/                  ← CSS output: reset and document defaults
│   ├── _reset.scss        ← Modern CSS reset
│   ├── _root.scss         ← :root { --mastors-* } custom properties
│   ├── _box-sizing.scss   ← Named stub (box-sizing declared in _reset.scss)
│   └── _typography-base.scss
│
├── themes/                ← CSS output: theme custom property sets
│   ├── _base-theme.scss   ← Semantic custom property contract (reference only)
│   ├── _light.scss        ← :root + [data-theme="light"] + .light
│   └── _dark.scss         ← [data-theme="dark"] + .dark (or prefers-color-scheme)
│
├── semantic/              ← SCSS variable aliases (no extra CSS output)
│   ├── _colors.scss       ← $color-bg, $color-text, $color-accent, etc.
│   ├── _spacing.scss      ← $space-inline, $space-component, $space-section, etc.
│   └── _typography.scss   ← $font-display, $font-body, $font-mono, etc.
│
├── responsive/            ← CSS output: responsive engine + container queries
│   ├── _engine.scss       ← engine.run() — breakpoint-prefixed variant engine
│   ├── _container-queries.scss ← .cq-inline, .cq-size, cq() mixin
│   └── _fluid-type.scss   ← fluid-type() mixin + function + fluid-scale() preset
│
├── utilities/             ← CSS output: atomic utility classes
│   ├── _display.scss
│   ├── _position.scss
│   ├── _overflow.scss
│   ├── _spacing.scss      ← margin, padding, gap
│   ├── _sizing.scss       ← width, height, min/max
│   ├── _colors.scss       ← text-*, bg-* (semantic + all palette × shade)
│   ├── _borders.scss      ← border, rounded-* (full directional scale)
│   ├── _shadows.scss
│   ├── _opacity.scss
│   ├── _cursor.scss
│   ├── _pointer-events.scss
│   ├── _z-index.scss
│   ├── _transform.scss
│   ├── _typography.scss   ← text-align, font-size/weight/family, leading, tracking,
│   │                         decoration, transform, whitespace, word-break, overflow,
│   │                         vertical-align, list-style, antialiasing
│   ├── _animation.scss    ← transitions, durations, easings, keyframes (spin/ping/pulse/
│   │                         bounce/fade/slide/scale), fill-mode, play-state, iteration
│   ├── _interaction.scss  ← user-select, resize, scroll-behavior, scroll-snap,
│   │                         touch-action, hover:/focus:/disabled: state variants
│   └── _layout.scss       ← aspect-ratio (.aspect-square/video/4-3/…), object-fit,
│                             object-position, float, clear, isolation, mix-blend-mode,
│                             box-decoration-break, appearance, will-change
│
├── helpers/               ← CSS output: layout and display helpers
│   ├── _clearfix.scss
│   ├── _visually-hidden.scss  ← Legacy aliases for accessibility/_screen-reader.scss
│   ├── _truncate.scss
│   └── _ratio.scss
│
├── accessibility/         ← CSS output: a11y utilities
│   ├── _focus.scss        ← :focus-visible ring
│   ├── _motion.scss       ← prefers-reduced-motion override
│   ├── _screen-reader.scss ← .sr-only, .not-sr-only — canonical source
│   └── _print.scss        ← print:/screen: visibility, break-inside/before/after,
│                             color resets, link href expansion for print readers
│
├── vendors/               ← CSS output: third-party overrides (stub)
│
└── api/                   ← Public SCSS API surface (no CSS output)
    └── _index.scss        ← @use "@mastors/core/api" as m;
                              Forwards: functions, mixins, tokens, variables,
                              config (settings + flags), responsive/container-queries
```

### Layer import order

The `scss/index.scss` import order is strict and intentional:

```
config → abstracts → variables → tokens → functions → mixins
  → base → themes → semantic → responsive → helpers → utilities → accessibility
```

Layers that produce **no CSS output** (config through mixins) are always imported first. CSS-producing layers follow in cascade order.

---

## Build System

### TurboRepo task pipeline

Turbo orchestrates builds across all packages with automatic caching and dependency awareness. The monorepo uses Turbo v2 — the config uses the `"tasks"` key (not the deprecated `"pipeline"`).

```json
{
  "tasks": {
    "build":     { "dependsOn": ["^build"], "outputs": ["dist/**", "*.css", "*.css.map"] },
    "dev":       { "dependsOn": ["^build"], "cache": false, "persistent": true },
    "lint":      { "outputs": [] },
    "test":      { "dependsOn": ["^build"] },
    "typecheck": { "dependsOn": ["^build"] },
    "clean":     { "cache": false }
  }
}
```

`^build` means a package will not build until all of its workspace dependencies have built first, ensuring `@mastors/core` always compiles before `@mastors/flexer` and `@mastors/gridder`.

### Build commands

```bash
# Build all packages
pnpm build

# Build core only
pnpm build:core

# Build everything in parallel (no dependency order)
pnpm build:all

# Start all watchers
pnpm dev

# Lint all packages
pnpm lint

# Format all files
pnpm format

# Clean all dist directories
pnpm clean
```

### Per-package build (core)

`packages/core/build.js` runs four steps in order:

1. Clean `dist/`
2. Compile `scss/index.scss` → `dist/mastors-core.css` via `@mastors/sass-config`
3. **Regenerate `src/tokens.ts`** from SCSS token maps via `scripts/generate-tokens.js`
4. Compile TypeScript → `dist/` via `tsc`

The token codegen step (step 3) was added in v1.1 to eliminate manual sync drift between the SCSS token maps and the TypeScript mirror.

---

## Package Exports

Each package uses the modern `"exports"` field for precise subpath resolution:

**@mastors/core**

```json
{
  "exports": {
    ".":                        { "import": "./dist/index.mjs", "require": "./dist/index.js", "types": "./dist/index.d.ts" },
    "./scss":                   "./scss/index.scss",
    "./scss/*":                 "./scss/*",
    "./api":                    "./scss/api/_index.scss",
    "./dist/mastors-core.css":  "./dist/mastors-core.css"
  }
}
```

**@mastors/flexer** and **@mastors/gridder**

```json
{
  "exports": {
    ".":        "./dist/mastors-<name>.css",
    "./scss":   "./scss/index.scss",
    "./scss/*": "./scss/*"
  }
}
```

Consumers can import precisely what they need:

```scss
@use "@mastors/core/scss";                        // Full stylesheet
@use "@mastors/core/api" as m;                    // Public API (tokens, mixins, functions, config)
@use "@mastors/core/scss/tokens/color" as colors; // Single partial
```

```ts
import { tokens } from '@mastors/core'            // JS runtime tokens
```

---

## Responsive Engine

The responsive engine lives in `@mastors/core` and is consumed by all sub-packages.

Breakpoints are defined in `variables/_breakpoints.scss`:

| Key | Min-width |
|---|---|
| `xs` | 0px (base, no media query) |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

Any utility entry passed to `generate-utilities()` with `responsive: true` automatically emits both base classes and breakpoint-prefixed variants (`.sm:`, `.md:`, etc.) in a single call. Numeric breakpoint keys (e.g. `2xl`) are correctly escaped in CSS class names.

`responsive/engine.scss` (`engine.run()`) is also available standalone for sub-packages that build their own utility maps outside `generate-utilities()`.

Container queries are supported via `responsive/_container-queries.scss`:

```scss
@include m.cq(40rem) { ... }
@include m.cq(30rem, "card") { ... }
```

---

## Theme System

Mastors uses a **CSS custom property** approach for theming. Token values are emitted as `--mastors-*` custom properties on `:root` by `base/_root.scss`, and overridden by theme layers (`themes/_light.scss`, `themes/_dark.scss`).

Dark mode supports two strategies, configured via `$mastors-config`:

```scss
// Class-based dark mode (default) — activate with <html class="dark">
$mastors-config: ("dark-mode": "class") !default;

// Media-query dark mode — responds automatically to OS preference
$mastors-config: ("dark-mode": "media") !default;
```

The full semantic custom property contract (15 properties covering surfaces, text, borders, and accent) is documented in `themes/_base-theme.scss`.

Custom themes can be applied with any `data-theme` attribute:

```scss
@include m.theme("ocean") {
  --mastors-accent:       #0891b2;
  --mastors-accent-hover: #0e7490;
}
```

```html
<div data-theme="ocean">...</div>
```

---

## Token System

All design decisions live in `packages/core/scss/tokens/`. Tokens are defined as SCSS maps with accessor functions and are consumed in three ways:

**1. SCSS functions** — used in component styles:

```scss
@use "@mastors/core/api" as m;

.button {
  background: m.color("primary", 600);
  padding:    m.spacing(3) m.spacing(6);
  transition: m.duration("150") m.easing("out");
}
```

**2. CSS custom properties** — emitted to `:root` for runtime consumption:

```css
:root {
  --mastors-color-primary-600: #2563eb;
  --mastors-spacing-4: 1rem;
}
```

**3. `vars()` function** — reference emitted custom properties by token name without hard-coding the `--mastors-` prefix:

```scss
.card {
  box-shadow:  m.vars(shadow-md);
  transition:  opacity m.vars(duration-200) m.vars(ease-out);
  color:       m.vars(accent, #2563eb); // optional CSS fallback
}
```

**4. JavaScript mirror** — available in `src/tokens.ts` for design tooling and CSS-in-JS:

```ts
import { tokens } from '@mastors/core'
tokens.color.primary['600'] // '#2563eb'
tokens.spacing['4']         // '1rem'
tokens.sizing['1/2']        // '50%'
```

> `src/tokens.ts` is **auto-generated** from the SCSS token maps by `scripts/generate-tokens.js` at build time. Never edit it manually.

---

## TypeScript Support

`@mastors/core` ships full TypeScript types:

```ts
import type {
  MastorsConfig,
  Breakpoint,
  ThemeMode,
  Tokens,
  ColorPalette,
  SpacingKey,
  RadiusKey,
  SizingKey,
} from '@mastors/core'
```

All token maps have corresponding TypeScript types exported from `src/types.ts` so IDEs can autocomplete token keys. The token values themselves are typed `as const` from the auto-generated `src/tokens.ts`.

The shared TypeScript config lives in `tooling/tsconfig/base.json` and is extended by each package's `tsconfig.build.json`.

---

## Development Workflow

### Prerequisites

- Node.js >= 18
- PNPM >= 8 (`npm install -g pnpm`)

### Setup

```bash
git clone https://github.com/KEHEM-IT/Mastors.git
cd Mastors
pnpm install
```

### Common tasks

```bash
# Build all packages (respects Turbo dependency order)
pnpm build

# Watch all packages for changes
pnpm dev

# Lint all packages (stylelint on core SCSS)
pnpm lint

# Format all files
pnpm format

# Type-check TypeScript
pnpm typecheck

# Clean all build artifacts
pnpm clean
```

### Regenerate TypeScript tokens manually

```bash
cd packages/core
node scripts/generate-tokens.js
```

This is called automatically during `pnpm build` — only needed if you edit a token map and want the TypeScript mirror updated without a full build.

---

## Publishing & Versioning

Mastors uses **[Changesets](https://github.com/changesets/changesets)** for version management and changelogs.

### Creating a changeset

After making changes to one or more packages:

```bash
pnpm changeset
```

Follow the interactive prompt to select affected packages and describe the change (patch / minor / major).

### Applying versions

```bash
pnpm version-packages
```

### Publishing

```bash
# Dry run — see what would be published
pnpm publish:dry

# Full release
pnpm release
```

All packages are published under `"access": "public"` to the `@mastors` npm scope.

### Version strategy

| Bump | When |
|---|---|
| `patch` | Bug fixes, internal refactors, no API change |
| `minor` | New utility classes, new tokens, new optional config |
| `major` | Breaking changes to token names, class naming, or SCSS API |

---

## Naming Conventions

### SCSS files

| Convention | Example |
|---|---|
| Partials prefixed with `_` | `_breakpoint.scss` |
| Kebab-case filenames | `_flex-direction.scss` |
| `_index.scss` as directory barrel | `utilities/_index.scss` |

### CSS classes

| Pattern | Example |
|---|---|
| Kebab-case utility names | `.flex-row`, `.gap-4` |
| Responsive prefix with `:` | `.md:flex-col` |
| Configurable prefix via `$mastors-prefix` | `.m-flex` (opt-in) |

### SCSS variables

| Pattern | Example |
|---|---|
| Token maps plural | `$spacing-tokens`, `$color-tokens` |
| Config map singular | `$mastors-config` |
| Feature flags prefixed `$enable-` | `$enable-flexer` |
| Private/local vars prefixed `$-` | `$-radius-sides` |

### TypeScript

| Pattern | Example |
|---|---|
| PascalCase interfaces/types | `MastorsConfig`, `ThemeMode` |
| camelCase runtime exports | `tokens`, `defaultConfig` |

---

## Plugin Architecture

Mastors is designed to be extended. A plugin is a package that:

1. Has `@mastors/core` as a peer dependency
2. Imports `@mastors/core/api` for shared tokens and mixins
3. Uses the core `generate-utilities()` engine for class output
4. Follows the naming convention `@mastors/<name>` or `mastors-plugin-<name>`

```scss
// In your plugin package
@use "@mastors/core/api" as m;
@use "@mastors/core/scss/generators/class-generator" as gen;

@include gen.generate-utilities($my-utility-map);
```

A formal plugin API will be stabilised in a future minor release.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes and add a changeset: `pnpm changeset`
4. Open a pull request against `main`

New utilities must:
- Be implemented as SCSS maps consumed by `generate-utilities()` (not hardcoded selectors)
- Include responsive variants where appropriate
- Include a `_index.scss` forward entry

---

## Roadmap

### Completed ✅

- Full token system — color, spacing, typography, radii, shadows, z-index, opacity, transitions, sizing
- Complete functions layer — `rem`, `em`, `color`, `spacing`, `radius`, `shadow`, `z`, `opacity`, `duration`, `easing`, `tint`, `shade`, `alpha`, `contrast`, `fluid`, `clamp-value`, `map-deep-get`, `map-collect`, `str-replace`, `to-string`, `vars`
- Complete mixins layer — `bp`, `respond-to`, `breakpoint-up`, `breakpoint-down`, `dark-mode`, `light-mode`, `theme`, `elevation`, `transition`, `container`, `pseudo`
- Generator engine — `generate-utilities` (two-pass: base + responsive), `emit-custom-properties`, `emit-nested-custom-properties`, `generate-responsive`
- Responsive engine with numeric breakpoint key escaping (`2xl:`)
- Container queries — `.cq-inline`, `.cq-size`, `.cq-normal`, `cq()` mixin
- Fluid typography — `fluid-type()` mixin + function + `fluid-scale()` preset
- `@mastors/core` base layer — modern CSS reset, `:root` custom properties, document defaults
- `@mastors/core` utility classes — display, position, overflow, spacing, sizing, colors, borders (full directional radius scale), shadows, opacity, cursor, pointer-events, z-index, transforms, typography (text-align/size/weight/leading/tracking/decoration/transform/whitespace/overflow), animation (transitions/durations/easings/keyframes/play-state), interaction (user-select/resize/scroll/snap/touch-action/hover:/focus:/disabled: variants), layout (aspect-ratio, object-fit/position, float, clear, blend modes, will-change)
- `@mastors/core` helpers — `.truncate`, `.line-clamp-{n}`, `.break-words`, `.ratio-*`, `.clearfix`, `.visually-hidden`
- `@mastors/core` accessibility — focus ring, reduced-motion, `.sr-only` / `.not-sr-only`, print layer (`print:hidden`, `screen:hidden`, break utilities, link href expansion)
- `@mastors/flexer` — full utility set (display, direction, wrap, flow, grow, shrink, basis, shorthand, justify, align, place, order, gap) + authoring mixins (`flex-container`, `flex-item`, `flex-center`) + `generate-flex-utilities()` generator
- `@mastors/gridder` — full utility set (display, template columns/rows/areas, auto flow/cols/rows, col/row span/start/end, justify, align, place, layout presets) + authoring mixins (`gridder`, `gridder-areas`)
- **v1.1 — Release packaging** — version alignment, postinstall on correct package, `"src"` removed from published files, duplicate CSS consolidated, turbo.json migrated to Turbo v2, token codegen script
- **v1.2 — Power additions** — `vars()` function, `_config.scss` shim in public API, expanded utility layers (typography, animation, interaction, layout/aspect-ratio, print accessibility), authoring mixins for flexer and gridder

### In Progress 🔄

- `@mastors/typography` — type scale, font utilities, prose system
- `@mastors/themes` — multi-theme support
- `@mastors/animator` — keyframe and transition utilities
- Token codegen: first full run to regenerate `src/tokens.ts` with sizing tokens + correct value types

### Planned 📋

- CLI tool (`mastors init`, `mastors add`)
- VSCode IntelliSense extension
- Documentation site at [mastorscdn.kehem.com](https://mastorscdn.kehem.com)
- Plugin API stabilisation

---

## Changelog

### v1.2.0

- **Added (`@mastors/core`):** `vars($token, $fallback?)` SCSS function — wraps the `--mastors-` namespace convention so downstream consumers reference tokens as `var(--mastors-{name})` without hard-coding the prefix. Forwarded through `functions/_index.scss` and exposed via `@use "@mastors/core/api"`.
- **Added (`@mastors/core`):** `config/_index.scss` shim — forwards both `_settings.scss` (the `$mastors-config` map and `config()` accessor) and `_flags.scss` (all `$enable-*` booleans). `api/_index.scss` now includes `@forward "../config/index"` so downstream consumers can reach config flags without a direct partial import.
- **Added (`@mastors/core`):** `utilities/_typography.scss` — full typography utility surface: text-align (responsive), font-size, font-weight, font-family, font-style, line-height (leading), letter-spacing (tracking), text-decoration (line/style/thickness), text-transform, text-overflow, white-space, word-break, text-indent, vertical-align, list-style, font-smoothing.
- **Added (`@mastors/core`):** `utilities/_animation.scss` — transition-property presets (`.transition`, `.transition-colors`, etc.), token-driven durations and delays, token-driven easing functions, named animation presets (`.animate-spin/ping/pulse/bounce/fade-in/fade-out/slide-up/slide-down/scale-in`), full keyframe definitions under the `mastors-` namespace, fill-mode / play-state / iteration-count utilities.
- **Added (`@mastors/core`):** `utilities/_interaction.scss` — user-select, resize, scroll-behavior, scroll-snap (type + align + stop + margin/padding), touch-action, and state-variant pseudo-class utilities: `hover:opacity-*`, `hover:bg-accent`, `hover:scale-*`, `hover:-translate-y-1`, `focus:ring`, `focus:ring-offset-2`, `disabled:opacity-50`, `disabled:cursor-not-allowed`, `disabled:pointer-events-none`.
- **Added (`@mastors/core`):** `utilities/_layout.scss` — aspect-ratio block (`.aspect-auto`, `.aspect-square`, `.aspect-video`, `.aspect-4-3`, `.aspect-3-2`, `.aspect-21-9`, `.aspect-9-16`, `.aspect-golden`; scale is `!default`-overridable); object-fit, object-position (both already present, now documented alongside aspect-ratio).
- **Added (`@mastors/core`):** `accessibility/_print.scss` — `print:hidden`, `screen:hidden`, `print:break-inside-avoid`, `print:break-before`, `print:break-after`, `print:text-black`, `print:bg-white`, `print:border-none`, `print:shadow-none`, automatic link href expansion (`a[href]::after`), suppression for hash/JS links.
- **Added (`@mastors/flexer`):** `flex-container()` mixin — one-call flex container configuration (direction, wrap, justify, align, gap, inline).
- **Added (`@mastors/flexer`):** `flex-item()` mixin — one-call flex item configuration (grow, shrink, basis, align-self, order).
- **Added (`@mastors/flexer`):** `flex-center()` mixin — single-line centering shorthand; also ships `flex-center-x()` and `flex-center-y()` axis variants.
- **Added (`@mastors/flexer`):** `generate-flex-utilities()` generator — emit a complete flex utility set from a config map; each axis (direction, wrap, justify, align, grow, shrink, order) can be opted in or out individually, with a single `responsive` flag controlling all responsive variants.
- **Added (`@mastors/gridder`):** `gridder($area, ...)` mixin — named `grid-area` placement (pure named-area mode) or explicit four-value `grid-area` shorthand when line params are supplied; optional `align-self` / `justify-self` overrides in the same call.
- **Added (`@mastors/gridder`):** `gridder-areas($rows...)` companion mixin — declare `grid-template-areas` from a variadic list of quoted row strings, co-located with the `gridder()` child calls.

### v1.1.0

- **Fix:** Version alignment — root, core, flexer, gridder all set to `1.0.0` → `1.1.0`
- **Fix:** Root `package.json` — removed phantom `main`/`module`/`exports` fields that pointed to a path that never builds
- **Fix:** `postinstall` script moved from the private root to `@mastors/core` where it actually fires on `npm install`
- **Fix:** `"src"` removed from `@mastors/core` `files[]` — raw TypeScript source no longer ships in the published tarball
- **Fix:** `turbo.json` migrated from deprecated `"pipeline"` to `"tasks"` (Turbo v2); devDependency bumped to `^2.0.0`
- **Fix:** Duplicate visually-hidden CSS consolidated — `helpers/_visually-hidden.scss` now references the canonical rules in `accessibility/_screen-reader.scss` instead of duplicating them
- **Fix:** `@mastors/build-utils` version corrected from `2.0.0` to `1.0.0`
- **Added:** `packages/core/scripts/generate-tokens.js` — build-time codegen that reads all SCSS token maps and auto-generates `src/tokens.ts`, eliminating manual sync drift
- **Added:** `generate-tokens.js` wired into `packages/core/build.js` — runs automatically as step 3 before `tsc`
- **Added:** `sizingTokens` export added to `src/tokens.ts` (was missing in v1.0)
- **Added:** `SizingKey` TypeScript type exported from `src/tokens.ts`

### v1.0.0

- Initial public release
- Full token system: color, spacing, typography, radii, shadows, z-index, opacity, transitions, sizing
- Complete functions and mixins layers
- Generator engine with two-pass responsive output
- Responsive engine, container queries, fluid typography
- `@mastors/core`, `@mastors/flexer`, `@mastors/gridder` — full utility sets
- Light and dark themes via CSS custom property semantic contract
- Dual dark-mode strategy: class-based and media-query
- Modern CSS reset, accessibility layer, helpers

---

## License

MIT © Mastors Contributors
