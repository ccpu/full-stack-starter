import baseConfig from '@internal/eslint-config/base';

/** @type {import('typescript-eslint').Config} */
const config = [
  ...baseConfig,
  {
    ignores: ['dist/**', 'src/apis/**', 'src/runtime.ts'],
  },
];

export default config;
