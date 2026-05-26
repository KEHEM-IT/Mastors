#!/usr/bin/env node
// packages/core/scripts/cleanup.js
// ─────────────────────────────────────────────────────────────
// Shared uninstall cleanup script.
// Called from preuninstall hooks of any @mastors/* package.
//
// Receives the name of the package being removed via:
//   MASTORS_UNINSTALLING=@mastors/core node cleanup.js
//
// Logic:
//   • Build a list of all mastors packages currently installed.
//   • Subtract the one being removed right now.
//   • If none remain → delete mastors.config.js + mastors.config.scss.
//   • If at least one remains → keep them untouched.
// ─────────────────────────────────────────────────────────────
'use strict'

const fs   = require('fs')
const path = require('path')

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  gray:   '\x1b[90m',
  red:    '\x1b[31m',
}

const W  = 60
const ln = (char = '─') => C.gray + char.repeat(W) + C.reset

const MASTORS_PACKAGES = ['mastors', '@mastors/core', '@mastors/gridder', '@mastors/flexer']

const cwd = process.env.INIT_CWD || process.cwd()

// The package currently being uninstalled (set by the caller's preuninstall hook)
const beingRemoved = process.env.MASTORS_UNINSTALLING || ''

// Skip CI / monorepo self
const isCi   = process.env.CI === 'true' || process.env.CI === '1'
const isRepo = (() => {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'))
    return pkg.name === 'mastors-monorepo' || pkg.name === '@mastors/monorepo'
  } catch (_) { return false }
})()
if (isCi || isRepo) process.exit(0)

// ── Count remaining mastors packages ─────────────────────────
const remaining = MASTORS_PACKAGES.filter(pkg => {
  if (pkg === beingRemoved) return false  // the one being removed now
  const pkgDir = path.join(cwd, 'node_modules', pkg)
  return fs.existsSync(pkgDir)
})

const JS_CONFIG   = path.join(cwd, 'mastors.config.js')
const SCSS_BRIDGE = path.join(cwd, 'mastors.config.scss')

console.log('')
console.log(ln('═'))
console.log(`${C.bold}  ✦  Mastors — Uninstall Cleanup${C.reset}`)
console.log(ln('═'))
console.log('')

if (remaining.length > 0) {
  console.log(`  ${C.yellow}[~]${C.reset} Keeping config files`)
  console.log(`      Still installed: ${remaining.join(', ')}`)
} else {
  let removed = false

  if (fs.existsSync(JS_CONFIG)) {
    fs.unlinkSync(JS_CONFIG)
    console.log(`  ${C.red}[✗ removed]${C.reset} ${C.bold}mastors.config.js${C.reset}`)
    removed = true
  }
  if (fs.existsSync(SCSS_BRIDGE)) {
    fs.unlinkSync(SCSS_BRIDGE)
    console.log(`  ${C.red}[✗ removed]${C.reset} ${C.bold}mastors.config.scss${C.reset}`)
    removed = true
  }

  if (!removed) {
    console.log(`  ${C.gray}[○]${C.reset} No Mastors config files found.`)
  } else {
    console.log('')
    console.log(`  ${C.green}${C.bold}All Mastors config files removed.${C.reset}`)
  }
}

console.log('')
console.log(ln('═'))
console.log('')
