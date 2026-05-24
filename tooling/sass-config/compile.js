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

// ─── Sass CLI binary resolver ─────────────────────────────────────────────────
//
// sass 1.80+ removed './sass.js' from its package exports map, so
// require.resolve('sass/sass.js') throws ERR_PACKAGE_PATH_NOT_EXPORTED.
//
// Instead: resolve the package.json of the 'sass' package, read its "bin"
// field, and derive the absolute path to the CLI entry point from there.
// This is forward-compatible regardless of where sass puts its binary.

/**
 * Resolve the absolute path to the sass CLI script.
 * Falls back to the string 'sass' (globally installed) if resolution fails.
 * @returns {string}
 */
function resolveSassBin() {
  try {
    // require.resolve('sass') gives us the main entry (e.g. sass.node.js).
    // Walk up to the package root by finding the directory that contains package.json.
    let dir = path.dirname(require.resolve('sass'))
    while (!fs.existsSync(path.join(dir, 'package.json'))) {
      const parent = path.dirname(dir)
      if (parent === dir) throw new Error('sass package.json not found')
      dir = parent
    }
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf-8'))
    // pkg.bin is either a string or { sass: './sass.js' }
    const binRelative = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin['sass']
    return path.join(dir, binRelative)
  } catch {
    return 'sass' // fall back to globally installed sass
  }
}

// Resolve once at module load — same binary for every compile/watch call.
const SASS_BIN = resolveSassBin()

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
 * Spawns the Sass CLI with --watch, which handles dependency tracking
 * correctly (partials, forwarded files, etc.).
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

  // If SASS_BIN is an absolute path to a .js file, run it with node.
  // If it fell back to the string 'sass', spawn it as a shell command.
  const isJsFile = SASS_BIN !== 'sass' && SASS_BIN.endsWith('.js')

  const proc = isJsFile
    ? spawn('node', [SASS_BIN, ...args], { stdio: 'inherit', shell: false })
    : spawn('sass',              args,   { stdio: 'inherit', shell: true  })

  proc.on('error', err => {
    console.error('[mastors] Failed to start sass watcher:', err.message)
  })

  return proc
}

module.exports = { compile, watch, collectNodeModulesPaths }
