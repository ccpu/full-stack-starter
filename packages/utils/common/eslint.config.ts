import type { Config } from 'typescript-eslint';
import baseConfig from '@internal/eslint-config/base';

const config: Config = [
  {
    ignores: [],
  },
  ...baseConfig,
];

export default config;
