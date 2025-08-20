import type { Config } from 'typescript-eslint';
import baseConfig from '@internal/eslint-config/base';
import reactConfig from '@internal/eslint-config/react';

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
        tsconfigRootDir: import.meta.dirname as string,
      },
    },
  },
];

export default config;
