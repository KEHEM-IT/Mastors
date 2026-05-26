# mastors

## 1.2.7

### Patch Changes

- **Fix:** `mastors.config.js` and `mastors.config.scss` are now correctly removed on uninstall — a `preuninstall` hook runs before the package is removed and deletes both config files if no other `@mastors/*` packages remain in the project
- **Fix:** If at least one `@mastors/*` package is still installed after removal, config files are intentionally preserved
- **Fix:** `@mastors/core` moved from `dependencies` to `peerDependencies` — prevents npm from pulling a duplicate copy when the host project already has it installed
- **Fix:** `"peerDependenciesMeta": { "sass": { "optional": true } }` added — suppresses the unmet peer dependency warning for projects that supply Sass through a bundler (Vite, Webpack) rather than as a standalone package
- Added `preuninstall.js` to the published `"files"` list so the cleanup hook is always available after install

## 1.2.6

### Patch Changes

- **Fix:** Restored `postinstall` banner and `npx mastors` prompt after `npm install mastors`
- **Fix:** `detectPM()` now excludes `pnpm-lock.yaml` from lockfile-based detection — prevents the CLI from selecting pnpm inside projects that incidentally have a stray `pnpm-lock.yaml` (e.g. monorepo roots); falls back to npm as the safe universal default
- **Fix:** Package manager detection priority reordered: `--pm` flag → `packageManager` field in `package.json` → lockfile (yarn/bun only) → npm fallback

## 1.2.1

### Patch Changes

- **Fix:** `@mastors/core` is now always installed when pressing Enter — the filter condition `!p.required && p.selected` was corrected to `p.required || p.selected`

## 1.2.0

### Minor Changes

- Added interactive CLI (`npx mastors`) — arrow-key navigation, Space to toggle optional packages, Enter to install, auto package-manager detection, thank-you message on completion
- Added `init` and `build` sub-commands — `npx mastors init` scaffolds config files; `npx mastors build` regenerates the SCSS bridge from an existing `mastors.config.js`
- Added `postinstall.js` — prints a welcome banner and lists available packages after `npm install mastors`

## 1.0.0

### Major Changes

- Initial release of `mastors`
