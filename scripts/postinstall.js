#!/usr/bin/env node
// postinstall.js — Mastors ecosystem welcome script
// Runs automatically after: npm install @mastors

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
  ${CYAN}→${RESET} ${DIM}npm install${RESET} @mastors/flexer
  ${CYAN}→${RESET} ${DIM}npm install${RESET} @mastors/gridder
  ${CYAN}→${RESET} ${DIM}npm install${RESET} @mastors/typography
  ${CYAN}→${RESET} ${DIM}npm install${RESET} @mastors/themes
  ${CYAN}→${RESET} ${DIM}npm install${RESET} @mastors/animator

${BOLD}  Documentation:${RESET}
  ${YELLOW}https://mastors.dev${RESET}

${line()}
`

process.stdout.write(message)
