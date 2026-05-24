#!/usr/bin/env node
// postinstall.js — Mastors ecosystem welcome script
// Runs automatically after: npm install @mastors/core

'use strict'

const RESET  = '\x1b[0m'
const BOLD   = '\x1b[1m'
const DIM    = '\x1b[2m'
const GREEN  = '\x1b[32m'
const CYAN   = '\x1b[36m'
const YELLOW = '\x1b[33m'
const WHITE  = '\x1b[37m'
const GRAY   = '\x1b[90m'

function line(char = '─', len = 52) {
  return GRAY + char.repeat(len) + RESET
}

const message = `
${line()}
${BOLD}${WHITE}  ✦  Thanks for installing Mastors!${RESET}
${line()}

${BOLD}  Installed:${RESET}
  ${GREEN}✔${RESET} @mastors/core

${BOLD}  Optional packages:${RESET}
  ${GREEN}✔${RESET} @mastors/flexer      ${DIM}npm install @mastors/flexer${RESET}
  ${GREEN}✔${RESET} @mastors/gridder     ${DIM}npm install @mastors/gridder${RESET}
  ${CYAN}◌${RESET} @mastors/typography  ${GRAY}coming soon${RESET}
  ${CYAN}◌${RESET} @mastors/themes      ${GRAY}coming soon${RESET}
  ${CYAN}◌${RESET} @mastors/animator    ${GRAY}coming soon${RESET}

${BOLD}  Documentation:${RESET}
  ${YELLOW}https://mastorscdn.kehem.com${RESET}

${line()}
`

process.stdout.write(message)
