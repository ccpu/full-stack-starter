import baseConfig from '@internal/eslint-config/base';
import { Config } from 'typescript-eslint';

const config: Config = [
  {
    ignores: [],
  },
  ...baseConfig,
];

export default config;
