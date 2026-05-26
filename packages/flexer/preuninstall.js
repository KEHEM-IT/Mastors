#!/usr/bin/env node
// packages/flexer/preuninstall.js
'use strict'
const path = require('path')
const fs   = require('fs')
const { execSync } = require('child_process')

const cwd = process.env.INIT_CWD || process.cwd()

// Find cleanup.js from @mastors/core
const candidates = [
  path.join(cwd, 'node_modules', '@mastors', 'core', 'scripts', 'cleanup.js'),
  path.join(__dirname, '..', 'core', 'scripts', 'cleanup.js'),
]
const cleanupScript = candidates.find(p => fs.existsSync(p))
if (cleanupScript) {
  try {
    execSync(`node "${cleanupScript}"`, {
      stdio: 'inherit',
      env: { ...process.env, MASTORS_UNINSTALLING: '@mastors/flexer', INIT_CWD: cwd },
    })
  } catch (_) {}
}
