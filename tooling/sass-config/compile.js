// @mastors/sass-config — compile.js
// Reusable SCSS compilation helper for all Mastors packages.
// Usage: const { compile } = require('@mastors/sass-config/compile')

'use strict'

const sass = require('sass')
const path = require('path')
const fs   = require('fs')
const { sassOptions, sassOptionsProd } = require('./index')

/**
 * Compile an SCSS entry file to CSS.
 * @param {string} entry   - Absolute path to the SCSS entry file
 * @param {string} outFile - Absolute path to the output CSS file
 * @param {boolean} [prod] - Use production (minified) settings
 */
function compile(entry, outFile, prod = false) {
  const opts = prod ? sassOptionsProd : sassOptions

  const result = sass.compile(entry, {
    ...opts,
    loadPaths: [path.dirname(entry)],
  })

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, result.css, 'utf-8')

  if (result.sourceMap) {
    fs.writeFileSync(outFile + '.map', JSON.stringify(result.sourceMap), 'utf-8')
  }

  console.log(`[mastors] Compiled: ${path.basename(outFile)}`)
}

module.exports = { compile }
