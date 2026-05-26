#!/usr/bin/env node
// packages/core/preuninstall.js
'use strict'
const path         = require('path')
const { execSync } = require('child_process')
const cleanupScript = path.join(__dirname, 'scripts', 'cleanup.js')
try {
  execSync(`node "${cleanupScript}"`, {
    stdio: 'inherit',
    env: { ...process.env, MASTORS_UNINSTALLING: '@mastors/core' },
  })
} catch (_) {}
