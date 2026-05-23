// @mastors/core — build.js
// Compiles scss/index.scss → dist/mastors-core.css
// Runs tsc for TypeScript declarations.

'use strict'

const path    = require('path')
const { execSync } = require('child_process')
const { compile }  = require('@mastors/sass-config/compile')
const { cleanDir } = require('@mastors/build-utils')

const root    = __dirname
const distDir = path.join(root, 'dist')
const isProd  = process.argv.includes('--prod')

// 1. Clean dist
cleanDir(distDir)

// 2. Compile SCSS
compile(
  path.join(root, 'scss', 'index.scss'),
  path.join(distDir, 'mastors-core.css'),
  isProd
)

// 3. Compile TypeScript
console.log('[core] Compiling TypeScript...')
execSync('tsc -p tsconfig.build.json', { stdio: 'inherit', cwd: root })

console.log('[core] Build complete.')
