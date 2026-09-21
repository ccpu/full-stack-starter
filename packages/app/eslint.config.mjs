import reactConfig from '@internal/eslint-config/react';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...reactConfig,
  {
    ignores: ['dist/**'],
  },
];

export default config;
