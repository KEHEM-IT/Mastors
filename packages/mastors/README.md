# mastors

> The Mastors interactive installer — pick and install `@mastors/*` packages with a single command.

[![npm version](https://img.shields.io/npm/v/mastors.svg)](https://www.npmjs.com/package/mastors)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

---

## Overview

`mastors` is the entry-point package for the Mastors ecosystem. It ships the interactive CLI (`npx mastors`) that lets you browse and install any `@mastors/*` package with arrow keys and a single keypress — no copy-pasting install commands required.

`@mastors/core` is always installed. Optional packages (`@mastors/gridder`, `@mastors/flexer`) are toggled with Space and installed together on Enter.

---

## Quick Start

```bash
npx mastors
```

No install needed — just run it. The interactive picker launches immediately.

```
════════════════════════════════════════════════════════════
✦  Mastors  —  Package Manager
Select packages to install alongside Core
════════════════════════════════════════════════════════════
· Space to Select | Enter to Install
  ● @mastors/core [Tokens, mixins, functions & SCSS architecture] [included]
> ○ @mastors/gridder [Mastors Grid utility]
  ○ @mastors/flexer [Mastors Flexbox utility]
```

**Controls:**
- `↑` / `↓` — move cursor
- `Space` — toggle an optional package
- `Enter` — install selected packages
- `Ctrl+C` — exit

---

## Installation

Installing `mastors` directly is optional — `npx mastors` works without it. Install it if you want the postinstall welcome message when setting up a new project:

```bash
npm install mastors
# or
pnpm add mastors
# or
yarn add mastors
```

On install, a welcome banner is printed listing available packages and the `npx mastors` command.

---

## What Gets Installed

`@mastors/core` is always included — it is the required foundation for the entire ecosystem.

Optional packages selected in the CLI are installed alongside it in a single `npm install` / `pnpm add` / `yarn add` call. The CLI auto-detects your package manager (pnpm → yarn → npm).

---

## Package Manager Detection

The CLI checks for your package manager in this order:

1. `pnpm` — if `pnpm --version` succeeds
2. `yarn` — if `yarn --version` succeeds
3. `npm` — fallback

---

## Related Packages

| Package | Description |
|---|---|
| [`@mastors/core`](../core/README.md) | Tokens, mixins, functions, reset, responsive engine |
| [`@mastors/flexer`](../flexer/README.md) | Flexbox utility classes + authoring mixins |
| [`@mastors/gridder`](../gridder/README.md) | CSS Grid utility classes + authoring mixins |

---

## Changelog

### v1.2.1

- **Fix:** `@mastors/core` is now always installed when pressing Enter. Previously the `required` flag caused it to be skipped — the filter condition `!p.required && p.selected` was corrected to `p.required || p.selected`.

### v1.2.0

- **Added:** Interactive CLI (`npx mastors`) — arrow-key navigation, Space to toggle, Enter to install, auto package-manager detection, thank-you message on completion.

---

## License

MIT © Mastors Contributors
