#!/usr/bin/env node
// scaffold-package.js — Generate a new @mastors/* package scaffold
// Usage: node scripts/scaffold-package.js <package-name>
//
// Example: node scripts/scaffold-package.js spacer
// Creates: packages/spacer/ with full SCSS + package.json scaffold

'use strict'

const fs   = require('fs')
const path = require('path')

// ─── CLI args ────────────────────────────────────────────────────────────────

const name = process.argv[2]
if (!name) {
  console.error('Usage: node scripts/scaffold-package.js <package-name>')
  process.exit(1)
}

if (!/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error(`Invalid package name "${name}". Use lowercase letters, numbers, and hyphens only.`)
  process.exit(1)
}

const pkgDir = path.join(__dirname, '..', 'packages', name)

if (fs.existsSync(pkgDir)) {
  console.error(`Package already exists: packages/${name}`)
  process.exit(1)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mkdir(rel) {
  fs.mkdirSync(path.join(pkgDir, rel), { recursive: true })
}

function write(rel, content) {
  fs.writeFileSync(path.join(pkgDir, rel), content.trimStart(), 'utf-8')
}

// ─── Directory structure ─────────────────────────────────────────────────────

mkdir('.')
mkdir('scss/utilities')
mkdir('scss/mixins')
mkdir('scss/generators')
mkdir('scss/responsive')
mkdir('dist')

// ─── Files ───────────────────────────────────────────────────────────────────

// scss/index.scss
write('scss/index.scss', `
// @mastors/${name} — scss/index.scss
// ─────────────────────────────────────────────────────────────
// Entry point for the ${name} package.
// ─────────────────────────────────────────────────────────────

@use "@mastors/core/api" as core;

@use "mixins/index"     as *;
@use "generators/index" as *;

@use "utilities/index";
@use "responsive/index";
`)

// scss/utilities/_index.scss
write('scss/utilities/_index.scss', `
// @mastors/${name}/utilities/_index.scss
// Forward all utility partials.

// @forward "your-utility";
`)

// scss/utilities/.gitkeep
write('scss/utilities/.gitkeep', '')

// scss/mixins/_index.scss
write('scss/mixins/_index.scss', `
// @mastors/${name}/mixins/_index.scss
// Forward all mixin partials.

// @forward "your-mixin";
`)

// scss/generators/_index.scss
write('scss/generators/_index.scss', `
// @mastors/${name}/generators/_index.scss
// Forward all generator partials.

// @forward "your-generator";
`)

// scss/responsive/_index.scss
write('scss/responsive/_index.scss', `
// @mastors/${name}/responsive/_index.scss
// Responsive variant wrappers.

@use "@mastors/core/scss/responsive/engine" as engine;

// @include engine.run($your-utilities-map);
`)

// dist/.gitkeep
write('dist/.gitkeep', '')

// package.json
write('package.json', `
{
  "name": "@mastors/${name}",
  "version": "1.0.0",
  "description": "Mastors ${name[0].toUpperCase() + name.slice(1)} — TODO: describe this package",
  "license": "MIT",
  "author": "Mastors Contributors",
  "homepage": "https://mastorscdn.kehem.com/packages/${name}",
  "repository": {
    "type": "git",
    "url": "https://github.com/KEHEM-IT/Mastors.git",
    "directory": "packages/${name}"
  },
  "keywords": ["mastors", "${name}", "scss", "utilities", "css-framework"],
  "sass": "./scss/index.scss",
  "style": "./dist/mastors-${name}.css",
  "exports": {
    ".": "./dist/mastors-${name}.css",
    "./scss": "./scss/index.scss",
    "./scss/*": "./scss/*"
  },
  "files": ["dist", "scss", "README.md"],
  "scripts": {
    "build": "node build.js",
    "build:prod": "node build.js --prod",
    "dev": "node build.js --watch",
    "clean": "rimraf dist"
  },
  "devDependencies": {
    "@mastors/build-utils": "workspace:*",
    "@mastors/sass-config": "workspace:*",
    "rimraf": "^5.0.0",
    "sass": "^1.70.0"
  },
  "peerDependencies": {
    "@mastors/core": "workspace:*",
    "sass": ">=1.60.0"
  },
  "sideEffects": ["dist/*.css", "scss/**/*.scss"]
}
`)

// build.js
write('build.js', `
'use strict'
const path             = require('path')
const { compile, watch } = require('@mastors/sass-config/compile')
const { cleanDir }     = require('@mastors/build-utils')

const root    = __dirname
const distDir = path.join(root, 'dist')
const isProd  = process.argv.includes('--prod')
const isWatch = process.argv.includes('--watch')

if (isWatch) {
  watch(
    path.join(root, 'scss', 'index.scss'),
    path.join(distDir, 'mastors-${name}.css')
  )
} else {
  cleanDir(distDir)
  compile(
    path.join(root, 'scss', 'index.scss'),
    path.join(distDir, 'mastors-${name}.css'),
    isProd
  )
  console.log('[${name}] Build complete.')
}
`)

// tsconfig.json
write('tsconfig.json', `
{
  "extends": "../../tooling/tsconfig/base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"]
}
`)

// README.md
write('README.md', `
# @mastors/${name}

> Part of the [Mastors](https://mastorscdn.kehem.com) frontend SCSS ecosystem.

## Installation

\`\`\`bash
npm install @mastors/${name}
\`\`\`

## Usage

\`\`\`scss
@use "@mastors/${name}/scss";
\`\`\`

## Peer Dependencies

- \`@mastors/core >= 1.0.0\`
- \`sass >= 1.60.0\`

## License

MIT © Mastors Contributors
`)

// ─── Done ────────────────────────────────────────────────────────────────────

console.log(`
[scaffold] ✅ Created packages/${name}/

  Directory structure:
    packages/${name}/
    ├── scss/
    │   ├── index.scss
    │   ├── utilities/_index.scss
    │   ├── mixins/_index.scss
    │   ├── generators/_index.scss
    │   └── responsive/_index.scss
    ├── dist/.gitkeep
    ├── build.js
    ├── package.json
    ├── tsconfig.json
    └── README.md

  Next steps:
    1. Implement your SCSS utilities in packages/${name}/scss/utilities/
    2. Add your package to pnpm-workspace.yaml if not already included
    3. Run: pnpm install && pnpm build --filter=@mastors/${name}
`)
