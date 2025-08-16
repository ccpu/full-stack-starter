import baseConfig from '@internal/eslint-config/base';
import reactConfig from '@internal/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**', 'index.ts'],
  },
  ...baseConfig,
  ...reactConfig,
];
