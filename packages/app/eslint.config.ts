import baseConfig from '@internal/eslint-config/base';
import reactConfig from '@internal/eslint-config/react';
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
