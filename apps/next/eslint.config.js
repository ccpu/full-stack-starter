import baseConfig, { restrictEnvAccess } from '@acme/eslint-config/base';
import nextjsConfig from '@acme/eslint-config/nextjs';
import reactConfig from '@acme/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
const config = [
  {
    ignores: ['.next/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];

export default config;
