import reactConfig from '@internal/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
const config = [
  ...reactConfig,
  {
    ignores: ['dist/**'],
  },
];

export default config;
