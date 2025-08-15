import baseConfig from '@acme/eslint-config/base';
import reactConfig from '@acme/eslint-config/react';
import { Config } from 'typescript-eslint';

const config: Config = [
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
  ...reactConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

export default config;
