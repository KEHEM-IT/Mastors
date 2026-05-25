#!/usr/bin/env node
// packages/core/postinstall.js — Mastors Core install welcome
// Runs automatically after: npm install @mastors/core
'use strict'

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
  `${C.bold}${C.white}  ✦  Thanks for installing @mastors/core!${C.reset}`,
  ln('═'),
  '',
  `  ${C.green}[✔]${C.reset} ${C.bold}@mastors/core${C.reset}   ${C.gray}(installed)${C.reset}`,
  '',
  `  ${C.gray}[○]${C.reset} ${C.bold}@mastors/gridder${C.reset}  ${C.gray}— CSS Grid utility classes${C.reset}`,
  `  ${C.gray}[○]${C.reset} ${C.bold}@mastors/flexer${C.reset}   ${C.gray}— Flexbox utility classes${C.reset}`,
  '',
  ln(),
  `  ${C.yellow}Install the full Mastors suite + interactive picker:${C.reset}`,
  `  ${C.cyan}${C.bold}npm install mastors${C.reset}${C.gray}  then  ${C.reset}${C.cyan}${C.bold}npx mastors${C.reset}`,
  '',
  `  Or install extra packages directly:`,
  `  ${C.dim}npm install @mastors/gridder${C.reset}`,
  `  ${C.dim}npm install @mastors/flexer${C.reset}`,
  '',
  `  ${C.yellow}Docs:${C.reset}  ${C.dim}https://mastorscdn.kehem.com${C.reset}`,
  ln(),
  '',
].join('\n')

process.stdout.write(msg)
