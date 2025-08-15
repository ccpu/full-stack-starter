import baseConfig, { restrictEnvAccess } from '@acme/eslint-config/base';
import nextjsConfig from '@acme/eslint-config/nextjs';
import reactConfig from '@acme/eslint-config/react';
import { Config } from 'typescript-eslint';

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
