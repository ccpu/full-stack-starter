import { fileURLToPath } from 'node:url';
import prettierConfig from '@pixpilot/dev-config/prettier';

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  ...prettierConfig,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: fileURLToPath(
    new URL('../../tooling/tailwind/web.ts', import.meta.url),
  ),
  tailwindFunctions: ['cn', 'cva'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '4.4.0',
  overrides: [
    {
      files: '*.json.hbs',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.js.hbs',
      options: {
        parser: 'babel',
      },
    },
    {
      files: ['*.json', 'tsconfig*.json'],
      options: {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        singleQuote: false,
        trailingComma: 'none',
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'avoid',
      },
    },
  ],
};

export default config;
