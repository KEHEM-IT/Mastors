#!/usr/bin/env node
// release.js — Mastors release helper
// Usage: node scripts/release.js [--dry-run]
//
// Steps:
//   1. Run full build across all packages
//   2. Apply changeset versions
//   3. Publish all public packages

'use strict'

const { execSync } = require('child_process')

const isDry = process.argv.includes('--dry-run')

const run = cmd => {
  console.log(`\n[release] ${cmd}`)
  execSync(cmd, { stdio: 'inherit' })
}

run('turbo run build --filter=./packages/*')
run('pnpm changeset version')
run(`pnpm -r publish --access public${isDry ? ' --dry-run' : ''}`)

console.log('\n[release] Done.')
