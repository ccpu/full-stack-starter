import * as path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import eslintConfig from '@pixpilot/dev-config/eslint';
import jestConfig from '@pixpilot/dev-config/eslint-jest';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * All packages that leverage t3-env should use this rule
 */
export const restrictEnvAccess = tseslint.config(
  { ignores: ['**/env.ts'] },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message: "Use `import { env } from '~/env'` instead to ensure validated types.",
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'process',
          importNames: ['env'],
          message: "Use `import { env } from '~/env'` instead to ensure validated types.",
        },
      ],
    },
  },
);

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  includeIgnoreFile(path.join(import.meta.dirname, '../../.gitignore')),
  { ignores: ['**/*.config.*'] },

  ...eslintConfig,
  ...jestConfig,

  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      ...turboPlugin.configs.recommended.rules,
      'no-restricted-imports': [
        'error',
        {
          name: 'zod',
          message: "Use `import { z } from 'zod/v4'` instead to ensure v4.",
        },
      ],
    },
  },

  ...restrictEnvAccess,
];
