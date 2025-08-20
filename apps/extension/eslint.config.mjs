import reactConfig from '@internal/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
const config = [
  ...reactConfig,
  {
    ignores: ['build/**', 'node_modules/**', 'nativewind-env.d.ts', 'src/zip.js'],
  },
];

export default config;
