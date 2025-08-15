import baseConfig from '@acme/eslint-config/base';
import { Config } from 'typescript-eslint';

const config: Config = [
  {
    ignores: ['dist/**', 'src/apis/**', 'src/runtime.ts'],
  },
  ...baseConfig,
];

export default config;
