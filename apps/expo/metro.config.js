const path = require('node:path');
// Learn more: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require('expo/metro-config');
const { FileStore } = require('metro-cache');

const { withNativeWind } = require('nativewind/metro');

const config = withTurborepoManagedCache(
  withNativeWind(getDefaultConfig(__dirname), {
    input: './src/styles.css',
    configPath: './tailwind.config.ts',
  }),
);
module.exports = config;

/**
 * Move the Metro cache to a `.cache/metro` folder. This enables Turborepo to cache the Metro cache alongside the rest of the codebase.
 * @see https://turborepo.com/docs/reference/configuration#env
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig} The modified Metro config with updated cache store
 */
function withTurborepoManagedCache(config) {
  const modifiedConfig = { ...config };
  modifiedConfig.cacheStores = [
    new FileStore({ root: path.join(__dirname, '.cache/metro') }),
  ];
  return modifiedConfig;
}
