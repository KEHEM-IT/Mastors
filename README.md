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
- [License](#license)

---

## Overview

**Mastors** is a modular, opt-in frontend SCSS utility ecosystem. It is designed as a proper monorepo using **PNPM workspaces** and **TurboRepo**, following patterns established by Tailwind CSS, Mantine, Radix, and Babel.

Every package in the `@mastors` scope is independently installable and tree-shakeable. You only ship CSS for what you actually use.

The ecosystem is built on three pillars:

1. **Tokens** — A single source of truth for all design decisions (color, spacing, type, shadow, radius, z-index, duration, easing, opacity).
2. **Architecture** — A layered SCSS system (abstracts → tokens → functions → mixins → generators → utilities) that ensures zero unintended side effects and predictable cascade ordering.
3. **Packages** — Independent, composable packages that share the core token/mixin layer but produce their own scoped CSS output.

---

## Packages

| Package | Description | Install |
|---|---|---|
| `@mastors/core` | Foundational tokens, mixins, functions, reset, responsive engine | `npm i @mastors/core` |
| `@mastors/flexer` | Complete flexbox utility class system | `npm i @mastors/flexer` |
| `@mastors/gridder` | Complete CSS Grid utility class system | `npm i @mastors/gridder` |
| `@mastors/typography` | Type scale, font utilities, prose system | `npm i @mastors/typography` |
| `@mastors/themes` | Theme definitions, dark mode, custom theme support | `npm i @mastors/themes` |
| `@mastors/animator` | Animation and transition utility classes | `npm i @mastors/animator` |

All packages are published under the `@mastors` npm scope with `"access": "public"`.

---

## Installation

### Install the full ecosystem

```bash
npm install @mastors
# or
pnpm add @mastors
# or
yarn add @mastors
```

Installing `@mastors` automatically installs `@mastors/core` and prints a terminal message listing optional packages.

### Install packages individually

```bash
# Core only (required by all other packages)
npm install @mastors/core

# Add layout packages
npm install @mastors/flexer
npm install @mastors/gridder

# Add typography
npm install @mastors/typography

# Add theming
npm install @mastors/themes

# Add animation
npm install @mastors/animator
```

### Peer dependency

All packages require `sass >= 1.60.0`:

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
@use "@mastors/typography/scss";
@use "@mastors/themes/scss";
@use "@mastors/animator/scss";
```

### 2. Import core only

```scss
@use "@mastors/core/scss";
```

### 3. Use the public API in your own SCSS

```scss
// Import tokens, mixins, and functions — zero CSS output
@use "@mastors/core/api" as m;

.my-component {
  padding: m.spacing(4);
  color: m.color("primary", 600);
  border-radius: m.radius("md");

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
const primaryColor = tokens.color['primary']['600']
const spacingUnit  = tokens.spacing['4']
```

---

## Monorepo Architecture

```
mastors/                          ← Monorepo root
├── packages/                     ← Publishable @mastors/* packages
│   ├── core/
│   ├── flexer/
│   ├── gridder/
│   ├── typography/
│   ├── themes/
│   └── animator/
├── tooling/                      ← Private shared build tooling
│   ├── sass-config/              ← Shared Sass compiler options
│   ├── build-utils/              ← Shared build helpers (cleanDir, etc.)
│   └── tsconfig/                 ← Shared TypeScript configs
├── scripts/                      ← Root-level automation scripts
│   ├── postinstall.js            ← npm postinstall welcome message
│   ├── build.js                  ← Root build orchestrator
│   ├── release.js                ← Release automation
│   └── scaffold-package.js       ← New package scaffolder
├── .changeset/                   ← Changesets version management
├── package.json                  ← Root workspace package
├── pnpm-workspace.yaml           ← PNPM workspace definition
├── turbo.json                    ← TurboRepo pipeline config
├── tsconfig.base.json            ← Base TypeScript config
└── tsconfig.json                 ← Root TypeScript config
```

### Dependency graph

```
@mastors (meta-package)
  └── @mastors/core          ← No @mastors/* dependencies

@mastors/flexer
  └── peerDep: @mastors/core

@mastors/gridder
  └── peerDep: @mastors/core

@mastors/typography
  └── peerDep: @mastors/core

@mastors/themes
  └── peerDep: @mastors/core

@mastors/animator
  └── peerDep: @mastors/core

tooling/sass-config            ← private, no @mastors/* deps
tooling/build-utils            ← private, depends on sass-config
tooling/tsconfig               ← private, no deps
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
├── src/                   ← TypeScript source (JS/TS consumers)
│   ├── index.ts
│   ├── types.ts
│   └── tokens.ts
├── dist/                  ← Build output (git-ignored except .gitkeep)
│   ├── mastors-<name>.css
│   ├── mastors-<name>.css.map
│   ├── index.js
│   ├── index.mjs
│   └── index.d.ts
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
│   ├── _settings.scss     ← Master config map ($mastors-config)
│   └── _flags.scss        ← Per-module enable/disable boolean flags
│
├── abstracts/             ← Shared maps and silent placeholders (no CSS output)
│   ├── _maps.scss
│   └── _placeholders.scss
│
├── variables/             ← SCSS variables (no CSS output)
│   ├── _breakpoints.scss  ← Named breakpoint map
│   ├── _grid.scss         ← Grid column/gutter config
│   ├── _container.scss    ← Container max-width map
│   └── _global.scss       ← Prefix, base font size, etc.
│
├── tokens/                ← Primitive design tokens as SCSS maps (no CSS output)
│   ├── _color.scss        ← Full color palette (scales 50–950)
│   ├── _spacing.scss      ← Spacing scale
│   ├── _typography.scss   ← Font sizes, families, weights, tracking
│   ├── _shadows.scss      ← Box-shadow elevation scale
│   ├── _radii.scss        ← Border-radius scale
│   ├── _transitions.scss  ← Duration and easing curves
│   ├── _z-index.scss      ← Stacking layer map
│   ├── _opacity.scss      ← Opacity scale
│   └── _sizing.scss       ← Width/height scale
│
├── functions/             ← SCSS functions (no CSS output)
│   ├── _color.scss        ← tint(), shade(), alpha(), contrast()
│   ├── _math.scss         ← clamp(), fluid scaling helpers
│   ├── _string.scss       ← str-replace(), to-string()
│   ├── _map-helpers.scss  ← map-deep-get(), map-collect()
│   ├── _rem.scss          ← rem() px conversion
│   └── _em.scss           ← em() px conversion
│
├── mixins/                ← SCSS mixins (no CSS output)
│   ├── _breakpoint.scss   ← bp(), respond-to(), breakpoint-up/down()
│   ├── _theme.scss        ← dark-mode(), light-mode(), theme()
│   ├── _elevation.scss    ← elevation($level)
│   ├── _transition.scss   ← transition() with token-driven timing
│   ├── _pseudo.scss       ← pseudo($display, $pos, $content)
│   └── _container.scss    ← container() responsive width mixin
│
├── generators/            ← Class generation engines (no CSS output)
│   ├── _class-generator.scss           ← generate-utilities() core engine
│   ├── _custom-property-generator.scss ← emit-custom-properties()
│   └── _responsive-generator.scss      ← Responsive prefix wrapper
│
├── base/                  ← CSS output: reset and document defaults
│   ├── _reset.scss
│   ├── _root.scss         ← :root { --mastors-* } custom properties
│   ├── _box-sizing.scss
│   └── _typography-base.scss
│
├── themes/                ← CSS output: theme custom property sets
│   ├── _base-theme.scss
│   ├── _light.scss
│   └── _dark.scss
│
├── semantic/              ← CSS output: semantic token aliases
│   ├── _colors.scss
│   ├── _spacing.scss
│   └── _typography.scss
│
├── responsive/            ← CSS output: responsive engine
│   ├── _engine.scss
│   ├── _container-queries.scss
│   └── _fluid-type.scss
│
├── utilities/             ← CSS output: atomic utility classes
│   ├── _display.scss
│   ├── _position.scss
│   ├── _overflow.scss
│   ├── _spacing.scss
│   ├── _sizing.scss
│   ├── _colors.scss
│   ├── _borders.scss
│   ├── _shadows.scss
│   ├── _opacity.scss
│   ├── _cursor.scss
│   ├── _pointer-events.scss
│   ├── _z-index.scss
│   └── _transform.scss
│
├── helpers/               ← CSS output: layout/display helpers
│   ├── _clearfix.scss
│   ├── _visually-hidden.scss
│   ├── _truncate.scss
│   └── _ratio.scss
│
├── accessibility/         ← CSS output: a11y utilities
│   ├── _focus.scss
│   ├── _motion.scss
│   └── _screen-reader.scss
│
├── vendors/               ← CSS output: third-party overrides
│   └── _index.scss
│
└── api/                   ← Public SCSS API surface (no CSS output)
    └── _index.scss        ← @use "@mastors/core/api" as m;
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

### TurboRepo pipeline

Turbo orchestrates builds across all packages with automatic caching and dependency awareness.

```json
{
  "pipeline": {
    "build":    { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev":      { "dependsOn": ["^build"], "cache": false, "persistent": true },
    "lint":     { "outputs": [] },
    "test":     { "dependsOn": ["^build"] },
    "clean":    { "cache": false }
  }
}
```

`^build` means a package will not build until all of its workspace dependencies have built first. This ensures `@mastors/core` always compiles before `@mastors/flexer`, etc.

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

# Clean all dist directories
pnpm clean
```

### Per-package build

Each package has its own `build.js` which:

1. Cleans `dist/`
2. Compiles `scss/index.scss` → `dist/mastors-<name>.css` via `@mastors/sass-config`
3. Runs `tsc` for TypeScript declaration files (core only)

---

## Package Exports

Each package uses the modern `"exports"` field in `package.json` for precise subpath resolution:

```json
{
  "exports": {
    ".":              { "import": "./dist/index.mjs", "require": "./dist/index.js", "types": "./dist/index.d.ts" },
    "./scss":         "./scss/index.scss",
    "./scss/*":       "./scss/*",
    "./api":          "./scss/api/_index.scss",
    "./dist/mastors-core.css": "./dist/mastors-core.css"
  }
}
```

This means consumers can import precisely what they need:

```scss
@use "@mastors/core/scss";                        // Full stylesheet
@use "@mastors/core/api" as m;                    // Public API only
@use "@mastors/core/scss/tokens/color" as colors; // Single partial
```

```ts
import { tokens } from '@mastors/core'            // JS runtime
```

---

## Responsive Engine

The responsive engine lives in `@mastors/core` and is consumed by all sub-packages.

Breakpoints are defined in `variables/_breakpoints.scss` as a named map. The generator in `generators/_responsive-generator.scss` iterates the map and wraps utility output in media queries.

Expected class naming convention:

```html
<!-- Mobile-first responsive prefixes -->
<div class="flex sm:flex-col md:flex-row lg:gap-8">
```

Container queries are supported via `responsive/_container-queries.scss`:

```scss
@container (min-width: 40rem) { ... }
```

---

## Theme System

Mastors uses a **CSS custom property** approach for theming. Token values are emitted as `--mastors-*` custom properties on `:root` by `base/_root.scss`, and overridden by theme layers.

Dark mode supports two strategies, configured via `$mastors-config`:

```scss
// Class-based dark mode (default)
// Activate with: <html class="dark">
$mastors-config: ("dark-mode": "class") !default;

// Media-query dark mode
// Activate automatically via OS preference
$mastors-config: ("dark-mode": "media") !default;
```

Custom themes can be defined by creating a new partial in `packages/themes/scss/` and registering it in `themes/_index.scss`.

---

## Token System

All design decisions live in `packages/core/scss/tokens/`. Tokens are defined as SCSS maps and consumed in two ways:

**1. SCSS variables** — used internally by mixins and generators:

```scss
@use "@mastors/core/api" as m;

.button {
  background: m.color("primary", 600);
  padding:    m.spacing(3) m.spacing(6);
}
```

**2. CSS custom properties** — emitted to `:root` for runtime consumption:

```css
:root {
  --mastors-color-primary-600: #2563eb;
  --mastors-spacing-3: 0.75rem;
}
```

**3. JavaScript mirror** — available in `src/tokens.ts` for design tooling and CSS-in-JS:

```ts
import { tokens } from '@mastors/core'
tokens.color['primary']['600'] // '#2563eb'
```

---

## TypeScript Support

`@mastors/core` ships full TypeScript types:

```ts
import type { MastorsConfig, Breakpoint, ThemeMode, Tokens } from '@mastors/core'
```

All token maps have corresponding TypeScript types so that IDEs can autocomplete token keys.

The shared TypeScript config lives in `tooling/tsconfig/base.json` and is extended by every package's `tsconfig.build.json`.

---

## Development Workflow

### Prerequisites

- Node.js >= 18
- PNPM >= 8 (`npm install -g pnpm`)

### Setup

```bash
git clone https://github.com/mastors/mastors.git
cd mastors
pnpm install
```

### Common tasks

```bash
# Build all packages (respects Turbo dependency order)
pnpm build

# Watch all packages for changes
pnpm dev

# Lint all packages
pnpm lint

# Format all files
pnpm format

# Type-check all TypeScript
pnpm typecheck

# Clean all build artifacts
pnpm clean
```

### Scaffold a new package

```bash
node scripts/scaffold-package.js <package-name>
# Example:
node scripts/scaffold-package.js spacer
# Creates: packages/spacer/ with full SCSS + package.json scaffold
```

---

## Publishing & Versioning

Mastors uses **[Changesets](https://github.com/changesets/changesets)** for version management and changelogs.

### Creating a changeset

After making changes to one or more packages, document your change:

```bash
pnpm changeset
```

Follow the interactive prompt to select affected packages and describe the change (patch / minor / major).

### Applying versions

```bash
pnpm version-packages
# Bumps package versions and updates changelogs based on pending changesets
```

### Publishing

```bash
# Dry run — see what would be published
node scripts/release.js --dry-run

# Full release — build, version, and publish to npm
node scripts/release.js
```

All packages are published under `"access": "public"` to the `@mastors` npm scope. Packages are **linked** in the changeset config, meaning they version together as a cohesive ecosystem release.

### Version strategy

- `patch` — Bug fixes, internal refactors with no API change
- `minor` — New utility classes, new tokens, new optional config
- `major` — Breaking changes to token names, class naming, or SCSS API

---

## Naming Conventions

### SCSS files

| Convention | Example |
|---|---|
| Partials prefixed with `_` | `_breakpoint.scss` |
| Kebab-case filenames | `_flex-direction.scss` |
| `_index.scss` as directory barrel | `utilities/_index.scss` |
| Descriptive, specific names | `_grid-template-columns.scss` |

### CSS classes

| Pattern | Example |
|---|---|
| Kebab-case utility names | `.flex-row`, `.gap-4` |
| Responsive prefix with `:` | `.md:flex-col` |
| Dark mode prefix with `:` | `.dark:bg-neutral-900` |
| Configurable prefix via `$mastors-prefix` | `.m-flex` (opt-in) |

### SCSS variables

| Pattern | Example |
|---|---|
| Kebab-case, noun-first | `$spacing-tokens`, `$color-primary` |
| Config map singular | `$mastors-config` |
| Token maps plural | `$spacing-tokens`, `$color-tokens` |
| Feature flags prefixed `$enable-` | `$enable-flexer` |

### TypeScript

| Pattern | Example |
|---|---|
| PascalCase interfaces/types | `MastorsConfig`, `ThemeMode` |
| camelCase runtime exports | `tokens`, `defaultConfig` |

### Package names

| Pattern | Example |
|---|---|
| Scope: `@mastors/` | `@mastors/core` |
| Short, role-describing name | `flexer`, `gridder`, `animator` |
| All lowercase, no hyphens in core names | `@mastors/core` |

---

## Plugin Architecture

Mastors is designed to be extended. A future `@mastors/plugin` API will allow community packages to hook into the class generation pipeline.

A plugin is a package that:

1. Has `@mastors/core` as a peer dependency
2. Imports `@mastors/core/api` for shared tokens and mixins
3. Uses the core `generate-utilities()` engine for class output
4. Registers itself with the Turbo pipeline via `pnpm-workspace.yaml`
5. Follows the naming convention `@mastors/<name>` or `mastors-plugin-<name>`

Expected future plugin API (placeholder):

```scss
// In your plugin package
@use "@mastors/core/api" as m;
@use "@mastors/core/scss/generators/class-generator" as gen;

// Register a utility config map with the generator
@include gen.generate-utilities($my-utility-map);
```

Until the formal plugin API is stabilised, community packages can follow the same structure as the built-in packages.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes and add a changeset: `pnpm changeset`
4. Open a pull request against `main`

Please follow the existing SCSS architecture and naming conventions. All new utilities must:

- Be implemented as SCSS maps consumed by the generator engine (not hardcoded selectors)
- Include a responsive variant via the core responsive engine
- Include a placeholder `_index.scss` forward entry

---

## Roadmap

- [ ] Implement all SCSS token maps (`tokens/`)
- [ ] Implement `functions/` layer (rem, em, color, math)
- [ ] Implement `mixins/` layer (breakpoint, theme, elevation, transition)
- [ ] Implement `generators/class-generator.scss` engine
- [ ] Implement `@mastors/core` base and utility CSS output
- [ ] Implement `@mastors/flexer` full utility set
- [ ] Implement `@mastors/gridder` full utility set
- [ ] Implement `@mastors/typography` type scale and prose system
- [ ] Implement `@mastors/themes` dark mode and custom theme support
- [ ] Implement `@mastors/animator` keyframe and transition utilities
- [ ] CLI tool (`mastors init`, `mastors add`, `mastors build`)
- [ ] VSCode IntelliSense extension
- [ ] Documentation site at [mastors.dev](https://mastors.dev)
- [ ] Plugin API stabilisation

---

## License

MIT © Mastors Contributors
