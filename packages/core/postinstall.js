#!/usr/bin/env node
// packages/core/postinstall.js
// Runs automatically after: npm install @mastors/core
// Delegates to scripts/init-config.js to generate mastors.config.js
// and mastors.config.scss in the user's project root.
'use strict'

const path = require('path')
const { execSync } = require('child_process')

// Skip during CI or when inside the Mastors monorepo itself
const cwd = process.env.INIT_CWD || process.cwd()
const isCi   = process.env.CI === 'true' || process.env.CI === '1'
const isRepo = (() => {
  try {
    const pkg = require(path.join(cwd, 'package.json'))
    return pkg.name === 'mastors-monorepo' || pkg.name === '@mastors/monorepo'
  } catch (_) { return false }
})()

if (isCi || isRepo) process.exit(0)

try {
  const initScript = path.join(__dirname, 'scripts', 'init-config.js')
  execSync(`node "${initScript}"`, { stdio: 'inherit', env: { ...process.env, INIT_CWD: cwd } })
} catch (_) {
  // Never fail the install on config-init error
}
