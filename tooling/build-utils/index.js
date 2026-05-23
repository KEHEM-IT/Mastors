// @mastors/build-utils — index.js
// Shared build helpers for all Mastors packages.

'use strict'

const fs   = require('fs')
const path = require('path')

/**
 * Ensure a directory exists (creates recursively).
 * @param {string} dir
 */
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

/**
 * Clean a directory by removing and recreating it.
 * @param {string} dir
 */
function cleanDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })
}

/**
 * Resolve a path relative to the calling package root.
 * @param {string} pkgRoot - __dirname of the calling script
 * @param {...string} parts
 */
function fromRoot(pkgRoot, ...parts) {
  return path.resolve(pkgRoot, ...parts)
}

module.exports = { ensureDir, cleanDir, fromRoot }
