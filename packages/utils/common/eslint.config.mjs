import baseConfig from '@internal/eslint-config/base';

/** @type {import('typescript-eslint').Config} */
const config = [
  {
    ignores: [],
  },
  ...baseConfig,
];

export default config;
