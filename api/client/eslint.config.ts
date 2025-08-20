import type { Config } from 'typescript-eslint';
import baseConfig from '@internal/eslint-config/base';

const config: Config = [
  {
    ignores: ['dist/**', 'src/apis/**', 'src/runtime.ts'],
  },
  ...baseConfig,
];

export default config;
