import baseConfig from '@internal/eslint-config/base';
import { Config } from 'typescript-eslint';

const config: Config = [
  {
    ignores: ['dist/**', 'src/apis/**', 'src/runtime.ts'],
  },
  ...baseConfig,
];

export default config;
