'use strict'
const path               = require('path')
const { compile, watch } = require('@mastors/sass-config/compile')
const { cleanDir }       = require('@mastors/build-utils')

const root    = __dirname
const distDir = path.join(root, 'dist')
const isProd  = process.argv.includes('--prod')
const isWatch = process.argv.includes('--watch')

if (isWatch) {
  watch(
    path.join(root, 'scss', 'index.scss'),
    path.join(distDir, 'mastors-flexer.css')
  )
} else {
  cleanDir(distDir)
  compile(
    path.join(root, 'scss', 'index.scss'),
    path.join(distDir, 'mastors-flexer.css'),
    isProd
  )
  console.log('[flexer] Build complete.')
}
