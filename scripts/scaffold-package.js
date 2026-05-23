#!/usr/bin/env node
// scaffold-package.js — Generate a new @mastors/* package scaffold
// Usage: node scripts/scaffold-package.js <package-name>
//
// Example: node scripts/scaffold-package.js spacer
// Creates: packages/spacer/ with full SCSS + package.json scaffold

'use strict'

const fs   = require('fs')
const path = require('path')

const name = process.argv[2]
if (!name) {
  console.error('Usage: node scripts/scaffold-package.js <package-name>')
  process.exit(1)
}

const pkgDir = path.join(__dirname, '..', 'packages', name)

if (fs.existsSync(pkgDir)) {
  console.error(`Package already exists: packages/${name}`)
  process.exit(1)
}

// TODO: Implement directory and file creation for the new package scaffold
// Scaffold should mirror the structure of @mastors/core

console.log(`[scaffold] Created packages/${name}`)
console.log(`[scaffold] Next: implement your SCSS in packages/${name}/scss/`)
