#!/usr/bin/env node
'use strict'

const { execSync } = require('child_process')
const readline     = require('readline')
const fs           = require('fs')
const path         = require('path')

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  green:  '\x1b[32m',
  cyan:   '\x1b[36m',
  yellow: '\x1b[33m',
  gray:   '\x1b[90m',
  white:  '\x1b[37m',
  red:    '\x1b[31m',
}

const W = 60
const ln = (char = '─') => C.gray + char.repeat(W) + C.reset
let firstRender = true

// ── Handle explicit sub-commands ──────────────────────────────
const [,, cmd, ...cmdArgs] = process.argv

if (cmd === 'init') {
  runInit(cmdArgs.includes('--force'))
  process.exit(0)
}

if (cmd === 'build') {
  runBuild()
  process.exit(0)
}

// ── init: scaffold / regenerate config files ─────────────────
function runInit(force) {
  const cwd = process.env.INIT_CWD || process.cwd()
  const candidates = [
    path.join(cwd, 'node_modules', '@mastors', 'core', 'scripts', 'init-config.js'),
    path.join(__dirname, 'node_modules', '@mastors', 'core', 'scripts', 'init-config.js'),
    // Monorepo / local dev path
    path.join(__dirname, '..', 'core', 'scripts', 'init-config.js'),
  ]
  const initScript = candidates.find(p => fs.existsSync(p))
  if (!initScript) {
    console.error(`${C.red}[✗]${C.reset} Could not find @mastors/core/scripts/init-config.js`)
    console.error(`    Make sure @mastors/core is installed.`)
    process.exit(1)
  }
  const extra = force ? ' --force' : ''
  try {
    execSync(`node "${initScript}"${extra}`, { stdio: 'inherit', env: { ...process.env, INIT_CWD: cwd } })
  } catch (_) { process.exit(1) }
}

// ── build: regenerate SCSS bridge from existing JS config ─────
function runBuild() {
  const cwd = process.env.INIT_CWD || process.cwd()
  const jsConfig = path.join(cwd, 'mastors.config.js')
  if (!fs.existsSync(jsConfig)) {
    console.error(`${C.red}[✗]${C.reset} mastors.config.js not found. Run: ${C.cyan}npx mastors init${C.reset}`)
    process.exit(1)
  }
  // Re-use init-config in --force mode so the SCSS bridge is always regenerated
  runInit(true)
}

const PACKAGES = [
  { name: '@mastors/core',    desc: 'Tokens, mixins, functions & SCSS architecture', selected: true,  required: true  },
  { name: '@mastors/gridder', desc: 'Mastors Grid utility',                          selected: false, required: false },
  { name: '@mastors/flexer',  desc: 'Mastors Flexbox utility',                       selected: false, required: false },
]

/**
 * Detect the package manager the user's project is actually using.
 *
 * Priority:
 *  1. --pm flag passed explicitly: npx mastors --pm yarn
 *  2. "packageManager" field in the project's package.json  (e.g. "yarn@4.x")
 *  3. Lockfile present in cwd — but ONLY yarn.lock or bun.lockb.
 *     pnpm-lock.yaml is intentionally excluded: Mastors itself uses pnpm
 *     internally, so running npx mastors from inside the repo (or any project
 *     that happened to pick up a stray pnpm-lock.yaml) would wrongly select
 *     pnpm for end-user projects.
 *  4. npm — the universal fallback that every Node.js install includes.
 */
function detectPM() {
  // 1. Explicit --pm flag
  const pmFlag = process.argv.find(a => a.startsWith('--pm='))
  if (pmFlag) {
    const val = pmFlag.split('=')[1].trim().toLowerCase()
    if (['npm', 'yarn', 'pnpm', 'bun'].includes(val)) return val
  }

  // 2. "packageManager" field in the project's package.json
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
    if (pkg.packageManager) {
      const pm = pkg.packageManager.split('@')[0].trim().toLowerCase()
      if (['npm', 'yarn', 'pnpm', 'bun'].includes(pm)) return pm
    }
  } catch (_) {}

  // 3. Lockfiles — yarn and bun only (pnpm excluded deliberately; see JSDoc above)
  const cwd = process.cwd()
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn'
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun'

  // 4. Safe universal default
  return 'npm'
}

const TOTAL_LINES = 5 + PACKAGES.length

function render(cursor) {
  if (!firstRender) {
    process.stdout.write(`\x1b[${TOTAL_LINES}A\x1b[J`)
  }
  firstRender = false

  const rows = [
    ln('═'),
    `${C.bold}${C.white}✦  Mastors  —  Package Manager${C.reset}`,
    `${C.gray}Select packages to install alongside Core${C.reset}`,
    ln('═'),
    `${C.gray}· Space to Select | Enter to Install${C.reset}`,
    ...PACKAGES.map((pkg, i) => {
      const arrow  = i === cursor ? `${C.cyan}>${C.reset}` : ' '
      const toggle = pkg.required
        ? `${C.green}●${C.reset}`
        : pkg.selected ? `${C.green}●${C.reset}` : `${C.gray}○${C.reset}`
      const lock   = pkg.required ? `${C.gray} [included]${C.reset}` : ''
      return `${arrow} ${toggle} ${pkg.name} ${C.gray}[${pkg.desc}]${C.reset}${lock}`
    }),
  ]

  process.stdout.write(rows.join('\n') + '\n')
}

function runInteractive() {
  let cursor = 1 // start on first selectable (gridder)
  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)
  render(cursor)

  process.stdin.on('keypress', (str, key) => {
    if (!key) return
    if (key.ctrl && key.name === 'c') { process.stdin.setRawMode(false); process.exit(0) }

    if (key.name === 'up') {
      do { cursor = (cursor - 1 + PACKAGES.length) % PACKAGES.length }
      while (PACKAGES[cursor].required)
      render(cursor)
    }
    if (key.name === 'down') {
      do { cursor = (cursor + 1) % PACKAGES.length }
      while (PACKAGES[cursor].required)
      render(cursor)
    }
    if (key.name === 'space') {
      if (!PACKAGES[cursor].required) {
        PACKAGES[cursor].selected = !PACKAGES[cursor].selected
        render(cursor)
      }
    }

    if (key.name === 'return') {
      process.stdin.setRawMode(false)
      process.stdin.pause()
      // Always include required packages + any user-selected optional ones
      const toInstall = PACKAGES.filter(p => p.required || p.selected).map(p => p.name)
      console.log()
      if (toInstall.length > 0) {
        const pm  = detectPM()
        const cmd = `${pm} install ${toInstall.join(' ')}`
        console.log(`${C.gray}$ ${cmd}${C.reset}\n`)
        try { execSync(cmd, { stdio: 'inherit' }) } catch (_) {}

        // After install, run init-config so config files are scaffolded
        console.log()
        runInit(false)
      }
      console.log(ln('═'))
      console.log(`${C.green}${C.bold}✦  Thank you for using Mastors!${C.reset}`)
      console.log(`${C.gray}   https://mastorscdn.kehem.com${C.reset}`)
      console.log(ln('═'))
      console.log()
      process.exit(0)
    }
  })
}

runInteractive()
