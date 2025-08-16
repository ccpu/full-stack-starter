import baseConfig from '@internal/eslint-config/base';
import reactConfig from '@internal/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['build/**', 'node_modules/**', 'nativewind-env.d.ts', 'src/zip.js'],
  },
  ...baseConfig,
  ...reactConfig,
];
