#!/usr/bin/env node
// packages/gridder/postinstall.js
// Runs automatically after: npm install @mastors/gridder
// Delegates to @mastors/core's init-config to scaffold config files.
'use strict'

const path = require('path')
const fs   = require('fs')
const { execSync } = require('child_process')

const cwd  = process.env.INIT_CWD || process.cwd()
const isCi = process.env.CI === 'true' || process.env.CI === '1'
const isRepo = (() => {
  try {
    const pkg = require(path.join(cwd, 'package.json'))
    return pkg.name === 'mastors-monorepo' || pkg.name === '@mastors/monorepo'
  } catch (_) { return false }
})()

if (isCi || isRepo) process.exit(0)

const candidates = [
  path.join(cwd, 'node_modules', '@mastors', 'core', 'scripts', 'init-config.js'),
  path.join(__dirname, '..', 'core', 'scripts', 'init-config.js'),
]

const initScript = candidates.find(p => fs.existsSync(p))

if (initScript) {
  try {
    execSync(`node "${initScript}"`, { stdio: 'inherit', env: { ...process.env, INIT_CWD: cwd } })
  } catch (_) {}
}
