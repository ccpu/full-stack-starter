#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(currentDir, '..');

// Get the current working directory (the package directory)
const cwd = process.cwd();

// Determine if we should write or just check
const shouldWrite = process.argv.includes('--write') || process.argv.includes('--fix');

// Build the prettier command
const command = [
  'prettier',
  shouldWrite ? '--write' : '--check',
  '.',
  `--ignore-path ${resolve(rootDir, '.prettierignore')}`,
  `--ignore-path ${resolve(rootDir, '.gitignore')}`,
  '--cache',
  `--cache-location ${resolve(rootDir, '.cache/.prettiercache')}`,
].join(' ');

try {
  execSync(command, {
    stdio: 'inherit',
    cwd,
  });
} catch (error) {
  process.exit(error.status || 1);
}
