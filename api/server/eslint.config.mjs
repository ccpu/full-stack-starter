import path from 'node:path';
import { fileURLToPath } from 'node:url';
import baseConfig from '@internal/eslint-config/base';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: dirname,
      },
    },
  },
];

export default config;
