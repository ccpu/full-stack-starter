import type { Config } from 'typescript-eslint';
import baseConfig, { restrictEnvAccess } from '@internal/eslint-config/base';
import nextjsConfig from '@internal/eslint-config/nextjs';
import reactConfig from '@internal/eslint-config/react';

const config: Config = [
  {
    ignores: ['.next/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];

export default config;
