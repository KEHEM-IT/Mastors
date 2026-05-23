// @mastors/sass-config — compile.js
// Reusable SCSS compilation helper for all Mastors packages.
// Usage: const { compile, watch } = require('@mastors/sass-config/compile')

'use strict'

const sass   = require('sass')
const path   = require('path')
const fs     = require('fs')
const { execSync, spawn } = require('child_process')
const { sassOptions, sassOptionsProd } = require('./index')

// ─── Load-path resolver ───────────────────────────────────────────────────────
//
// Sass needs every node_modules directory in the ancestor chain so that
// @use "@mastors/core/api" resolves correctly in sub-packages.
//
// Strategy: walk up from the entry file until we hit the filesystem root,
// collecting every node_modules directory found along the way.
// This works correctly under both npm flat trees and pnpm virtual stores.

/**
 * Collect all ancestor node_modules directories from a starting path.
 * @param {string} startDir
 * @returns {string[]}
 */
function collectNodeModulesPaths(startDir) {
  const paths = []
  let dir = startDir

  while (true) {
    const nm = path.join(dir, 'node_modules')
    if (fs.existsSync(nm)) paths.push(nm)

    const parent = path.dirname(dir)
    if (parent === dir) break // filesystem root
    dir = parent
  }

  return paths
}

// ─── compile() ───────────────────────────────────────────────────────────────

/**
 * Compile an SCSS entry file to CSS synchronously.
 *
 * @param {string}   entry           - Absolute path to the SCSS entry file
 * @param {string}   outFile         - Absolute path to the output CSS file
 * @param {boolean}  [prod=false]    - Use production (compressed) settings
 * @param {string[]} [extraPaths=[]] - Additional loadPaths to inject
 */
function compile(entry, outFile, prod = false, extraPaths = []) {
  const opts = prod ? sassOptionsProd : sassOptions

  // Build the full set of load paths:
  //   1. Directory containing the entry file  (resolves relative @use)
  //   2. All ancestor node_modules dirs        (resolves @mastors/* scope)
  //   3. Any caller-supplied extras
  const autoNodeModules = collectNodeModulesPaths(path.dirname(entry))

  const result = sass.compile(entry, {
    ...opts,
    loadPaths: [
      path.dirname(entry),
      ...autoNodeModules,
      ...extraPaths,
    ],
  })

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, result.css, 'utf-8')

  if (result.sourceMap) {
    fs.writeFileSync(outFile + '.map', JSON.stringify(result.sourceMap), 'utf-8')
  }

  console.log(`[mastors] Compiled: ${path.basename(outFile)}`)
}

// ─── watch() ─────────────────────────────────────────────────────────────────

/**
 * Watch an SCSS entry file and recompile on change.
 *
 * Uses the Sass CLI `--watch` flag under the hood, which handles
 * dependency tracking correctly (partials, forwarded files, etc.).
 *
 * @param {string}   entry           - Absolute path to the SCSS entry file
 * @param {string}   outFile         - Absolute path to the output CSS file
 * @param {string[]} [extraPaths=[]] - Additional --load-path flags
 */
function watch(entry, outFile, extraPaths = []) {
  const autoNodeModules = collectNodeModulesPaths(path.dirname(entry))

  const loadPathArgs = [
    path.dirname(entry),
    ...autoNodeModules,
    ...extraPaths,
  ].flatMap(p => ['--load-path', p])

  const args = [
    ...loadPathArgs,
    '--watch',
    '--source-map',
    '--style', 'expanded',
    `${entry}:${outFile}`,
  ]

  console.log(`[mastors] Watching: ${path.basename(entry)} → ${path.basename(outFile)}`)

  // Resolve sass CLI binary from the local node_modules
  const sassBin = (() => {
    try {
      return require.resolve('sass/sass.js').replace('sass.js', '') + '../bin/sass'
    } catch {
      return 'sass' // fall back to globally installed sass
    }
  })()

  const proc = spawn('node', [require.resolve('sass/sass.js'), ...args], {
    stdio: 'inherit',
    shell: false,
  })

  proc.on('error', err => {
    // If resolving sass.js failed, fall back to spawning 'sass' directly
    console.warn('[mastors] sass.js spawn failed, falling back to sass CLI:', err.message)
    spawn('sass', args, { stdio: 'inherit', shell: true })
  })

  return proc
}

module.exports = { compile, watch, collectNodeModulesPaths }
