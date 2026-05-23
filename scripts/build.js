#!/usr/bin/env node
// build.js — Root build orchestrator for the Mastors monorepo
// Delegates to Turbo; extend this for custom pre/post build hooks.

'use strict'

const { execSync } = require('child_process')

const args = process.argv.slice(2)
const filter = args.find(a => a.startsWith('--filter=')) || ''

const cmd = `turbo run build ${filter}`.trim()
console.log(`[mastors] Running: ${cmd}`)

try {
  execSync(cmd, { stdio: 'inherit' })
} catch (err) {
  process.exit(1)
}
