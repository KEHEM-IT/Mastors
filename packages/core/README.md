# @mastors/core

> Foundational SCSS architecture, design tokens, mixins, functions, and responsive engine for the Mastors ecosystem.

## Installation

```bash
npm install @mastors/core
# or
pnpm add @mastors/core
```

## SCSS Usage

```scss
// Full stylesheet
@use "@mastors/core/scss";

// Public API only (tokens, mixins, functions — no CSS output)
@use "@mastors/core/api" as m;
```

## JavaScript / TypeScript Usage

```ts
import { tokens } from '@mastors/core'
```

## Structure

```
scss/
├── abstracts/       # Shared maps and placeholders
├── accessibility/   # Focus, motion, screen-reader
├── api/             # Public SCSS API surface
├── base/            # Reset, root, box-sizing
├── config/          # Settings flags
├── functions/       # SCSS functions (color, math, rem, em)
├── generators/      # Class and custom property generators
├── helpers/         # Clearfix, truncate, ratio, visually-hidden
├── mixins/          # Breakpoint, theme, transition, elevation
├── responsive/      # Responsive engine + container queries
├── semantic/        # Semantic token aliases
├── themes/          # Light / dark theme definitions
├── tokens/          # Primitive design tokens
├── utilities/       # Atomic utility classes
├── variables/       # Breakpoints, grid, container, global
└── vendors/         # Third-party overrides
```

## Documentation

[https://mastors.dev/packages/core](https://mastors.dev/packages/core)
