import baseConfig from '@acme/eslint-config/base';
import { Config } from 'typescript-eslint';

const config: Config = [
  {
    ignores: [],
  },
  ...baseConfig,
];

export default config;
