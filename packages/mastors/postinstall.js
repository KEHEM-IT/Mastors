#!/usr/bin/env node
// packages/mastors/postinstall.js
// Runs automatically after: npm install mastors
// 1. Prints welcome banner
// 2. Triggers @mastors/core init-config to scaffold config files
'use strict'

const path = require('path')
const fs   = require('fs')
const { execSync } = require('child_process')

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  green:  '\x1b[32m',
  cyan:   '\x1b[36m',
  yellow: '\x1b[33m',
  white:  '\x1b[37m',
  gray:   '\x1b[90m',
}

const W = 60
const ln = (char = '─') => C.gray + char.repeat(W) + C.reset

const msg = [
  '',
  ln('═'),
  `${C.bold}${C.white}  ✦  Thanks for installing Mastors!${C.reset}`,
  ln('═'),
  '',
  `  ${C.green}[✔]${C.reset} ${C.bold}@mastors/core${C.reset}   ${C.gray}(installed by default)${C.reset}`,
  '',
  `  ${C.gray}[○]${C.reset} ${C.bold}@mastors/gridder${C.reset}  ${C.gray}— CSS Grid utility classes${C.reset}`,
  `  ${C.gray}[○]${C.reset} ${C.bold}@mastors/flexer${C.reset}   ${C.gray}— Flexbox utility classes${C.reset}`,
  '',
  ln(),
  `  ${C.yellow}Pick & install packages interactively:${C.reset}`,
  `  ${C.cyan}${C.bold}npx mastors${C.reset}`,
  '',
  `  ${C.yellow}Docs:${C.reset}  ${C.dim}https://mastorscdn.kehem.com${C.reset}`,
  ln(),
  '',
].join('\n')

process.stdout.write(msg)

// Skip CI / monorepo self-installs
const cwd  = process.env.INIT_CWD || process.cwd()
const isCi = process.env.CI === 'true' || process.env.CI === '1'
const isRepo = (() => {
  try {
    const pkg = require(path.join(cwd, 'package.json'))
    return pkg.name === 'mastors-monorepo' || pkg.name === '@mastors/monorepo'
  } catch (_) { return false }
})()

if (isCi || isRepo) process.exit(0)

// Try to locate @mastors/core's init-config relative to this package
const candidates = [
  // Hoisted (npm / yarn / bun)
  path.join(cwd, 'node_modules', '@mastors', 'core', 'scripts', 'init-config.js'),
  // Nested under mastors package
  path.join(__dirname, 'node_modules', '@mastors', 'core', 'scripts', 'init-config.js'),
]

const initScript = candidates.find(p => fs.existsSync(p))

if (initScript) {
  try {
    execSync(`node "${initScript}"`, { stdio: 'inherit', env: { ...process.env, INIT_CWD: cwd } })
  } catch (_) {
    // Never fail the install on config-init error
  }
}
