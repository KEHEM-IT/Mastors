#!/usr/bin/env node
'use strict'

const { execSync } = require('child_process')
const readline     = require('readline')

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  green:  '\x1b[32m',
  cyan:   '\x1b[36m',
  yellow: '\x1b[33m',
  white:  '\x1b[37m',
  gray:   '\x1b[90m',
}

const W = 60
const ln = (char = '─') => C.gray + char.repeat(W) + C.reset

const PACKAGES = [
  { name: '@mastors/gridder', desc: 'Mastors Grid utility',    selected: false },
  { name: '@mastors/flexer',  desc: 'Mastors Flexbox utility', selected: false },
]

function detectPM() {
  try { execSync('pnpm --version', { stdio: 'ignore' }); return 'pnpm' } catch (_) {}
  try { execSync('yarn --version', { stdio: 'ignore' }); return 'yarn' } catch (_) {}
  return 'npm'
}

function render(cursor) {
  process.stdout.write('\x1b[2J\x1b[H')
  console.log(ln('═'))
  console.log(`${C.bold}${C.white}✦  Mastors  —  Package Manager${C.reset}`)
  console.log(`${C.gray}Included @mastors/core [Tokens, mixins, functions & SCSS architecture]${C.reset}`)
  console.log(ln('═'))
  console.log(`${C.gray}· Space to Select | Enter to Install${C.reset}`)
  PACKAGES.forEach((pkg, i) => {
    const active = i === cursor
    const toggle = pkg.selected ? `${C.green}●${C.reset}` : `${C.gray}○${C.reset}`
    const arrow  = active ? `${C.cyan}>${C.reset}` : ' '
    console.log(`${arrow} ${toggle} ${pkg.name} ${C.gray}[${pkg.desc}]${C.reset}`)
  })
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
        console.log(`${C.gray}$ ${cmd}${C.reset}`)
        console.log()
        try {
          execSync(cmd, { stdio: 'inherit' })
        } catch (_) {}
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
