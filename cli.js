#!/usr/bin/env node
'use strict'

const { execSync } = require('child_process')
const readline     = require('readline')

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  green:  '\x1b[32m',
  cyan:   '\x1b[36m',
  gray:   '\x1b[90m',
  white:  '\x1b[37m',
}

const W        = 60
const ln       = (char = '─') => C.gray + char.repeat(W) + C.reset
const LINES    = 5 + PACKAGES_COUNT() // lines printed by render()
let   firstRender = true

const PACKAGES = [
  { name: '@mastors/gridder', desc: 'Mastors Grid utility',    selected: false },
  { name: '@mastors/flexer',  desc: 'Mastors Flexbox utility', selected: false },
]

function PACKAGES_COUNT() { return 2 }

function detectPM() {
  try { execSync('pnpm --version', { stdio: 'ignore' }); return 'pnpm' } catch (_) {}
  try { execSync('yarn --version', { stdio: 'ignore' }); return 'yarn' } catch (_) {}
  return 'npm'
}

const TOTAL_LINES = 5 + PACKAGES.length // header(4) + controls(1) + packages

function render(cursor) {
  if (!firstRender) {
    // Move cursor up TOTAL_LINES lines, then clear to end of screen
    process.stdout.write(`\x1b[${TOTAL_LINES}A\x1b[J`)
  }
  firstRender = false

  const rows = [
    ln('═'),
    `${C.bold}${C.white}✦  Mastors  —  Package Manager${C.reset}`,
    `${C.gray}Included @mastors/core [Tokens, mixins, functions & SCSS architecture]${C.reset}`,
    ln('═'),
    `${C.gray}· Space to Select | Enter to Install${C.reset}`,
    ...PACKAGES.map((pkg, i) => {
      const arrow  = i === cursor ? `${C.cyan}>${C.reset}` : ' '
      const toggle = pkg.selected  ? `${C.green}●${C.reset}` : `${C.gray}○${C.reset}`
      return `${arrow} ${toggle} ${pkg.name} ${C.gray}[${pkg.desc}]${C.reset}`
    }),
  ]

  process.stdout.write(rows.join('\n') + '\n')
}

function runInteractive() {
  let cursor = 0
  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)
  render(cursor)

  process.stdin.on('keypress', (str, key) => {
    if (!key) return
    if (key.ctrl && key.name === 'c') { process.stdin.setRawMode(false); process.exit(0) }

    if (key.name === 'up')    { cursor = (cursor - 1 + PACKAGES.length) % PACKAGES.length; render(cursor) }
    if (key.name === 'down')  { cursor = (cursor + 1) % PACKAGES.length; render(cursor) }
    if (key.name === 'space') { PACKAGES[cursor].selected = !PACKAGES[cursor].selected; render(cursor) }

    if (key.name === 'return') {
      process.stdin.setRawMode(false)
      process.stdin.pause()
      const toInstall = PACKAGES.filter(p => p.selected).map(p => p.name)
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
