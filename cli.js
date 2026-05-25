#!/usr/bin/env node
'use strict'

const { execSync } = require('child_process')
const readline     = require('readline')
const fs           = require('fs')
const path         = require('path')

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  green:  '\x1b[32m',
  cyan:   '\x1b[36m',
  gray:   '\x1b[90m',
  white:  '\x1b[37m',
}

const W = 60
const ln = (char = '─') => C.gray + char.repeat(W) + C.reset
let firstRender = true

const PACKAGES = [
  { name: '@mastors/core',    desc: 'Tokens, mixins, functions & SCSS architecture', selected: true,  required: true  },
  { name: '@mastors/gridder', desc: 'Mastors Grid utility',                          selected: false, required: false },
  { name: '@mastors/flexer',  desc: 'Mastors Flexbox utility',                       selected: false, required: false },
]

function detectPM() {
  // Detect by lockfile present in the user's project (cwd), not by what's installed globally
  const cwd = process.cwd()
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml')))   return 'pnpm'
  if (fs.existsSync(path.join(cwd, 'yarn.lock')))         return 'yarn'
  if (fs.existsSync(path.join(cwd, 'package-lock.json'))) return 'npm'
  if (fs.existsSync(path.join(cwd, 'bun.lockb')))         return 'bun'
  // Fall back to npm — safest universal default
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
