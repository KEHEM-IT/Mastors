// @mastors/sass-config — index.js
// Shared Sass compiler options used by all packages in the Mastors monorepo.
// Import this in package-level build scripts to ensure consistency.

'use strict'

/** @type {import('sass').Options<'sync'>} */
const sassOptions = {
  style: 'expanded',       // 'expanded' for dev, 'compressed' for prod
  sourceMap: true,
  sourceMapIncludeSources: true,
  // TODO: Add custom importers, load paths, or functions here
}

/** @type {import('sass').Options<'sync'>} */
const sassOptionsProd = {
  ...sassOptions,
  style: 'compressed',
  sourceMap: false,
}

module.exports = {
  sassOptions,
  sassOptionsProd,
}
