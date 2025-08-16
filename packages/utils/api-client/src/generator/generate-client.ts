import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import processModule from 'node:process';

import chalk from 'chalk';
import { glob } from 'glob';

import {
  getPackageJson,
  isPackageInstalledGlobally,
  isSwaggerFileChanged,
  resolveFromRoot,
} from '../utils/index.js';

export function generateClientApi(srcSwaggerJsonFile: string, force = false): void {
  const swaggerFilePath = path.isAbsolute(srcSwaggerJsonFile)
    ? srcSwaggerJsonFile
    : resolveFromRoot(srcSwaggerJsonFile);

  if (!fs.existsSync(swaggerFilePath)) {
    console.error(`Swagger file not found: ${swaggerFilePath}`);
    return;
  }

  const clientApiDir = resolveFromRoot(`api/client`);
  const clientApiSwaggerFilePath = path.join(clientApiDir, 'swagger.json');

  if (
    fs.existsSync(clientApiSwaggerFilePath) &&
    !isSwaggerFileChanged(swaggerFilePath, clientApiSwaggerFilePath) &&
    !force
  ) {
    console.warn('No change detected!');
    return;
  }

  console.warn('Generating client api...');
  console.warn(`File location: '${srcSwaggerJsonFile}'`);

  const clientApiSourceDir = clientApiDir;

  const packageName = `@internal/api-client`;
  const isClientApiDirExist = fs.existsSync(clientApiDir);

  if (isClientApiDirExist) {
    // Remove existing source directory
    if (fs.existsSync(clientApiSourceDir)) {
      fs.rmSync(clientApiSourceDir, { recursive: true, force: true });
    }
  }

  if (!isPackageInstalledGlobally('@openapitools/openapi-generator-cli')) {
    throw new Error(
      "Unable to find '@openapitools/openapi-generator-cli' make sure this package installed globally.",
    );
  }

  const scriptDir = path.dirname(
    new URL(import.meta.url).pathname.replace(/^\/(?<temp1>[A-Z]):/u, '$1:'),
  );
  const configPath = path.join(scriptDir, 'config.yaml');

  execSync(
    `openapi-generator-cli generate -g typescript-fetch -i "${swaggerFilePath}" -o "${clientApiSourceDir}" -c "${configPath}"`,
    { stdio: 'inherit' },
  );

  // Create package.json
  fs.writeFileSync(
    `${clientApiDir}/package.json`,
    JSON.stringify(getPackageJson(packageName), undefined, 2),
  );

  // Copy swagger file
  fs.copyFileSync(swaggerFilePath, clientApiSwaggerFilePath);

  // Add ESLint disable comments to generated files
  const files = glob.sync('**/*.ts', { cwd: clientApiDir });

  files.forEach((file) => {
    if (!file.endsWith('configuration.ts') && !file.endsWith('Extended.ts')) {
      const fullPath = path.join(clientApiDir, file);
      const data = fs.readFileSync(fullPath).toString();
      fs.writeFileSync(
        fullPath,
        `/* eslint-disable @typescript-eslint/ban-ts-comment */\n// @ts-nocheck\n${data}`,
      );
    }
  });

  // Create TypeScript config
  const tsConfigContent = {
    extends: '@internal/tsconfig/base.json',
    compilerOptions: {
      outDir: 'dist',
      rootDir: 'src',
    },
    include: ['src'],
    exclude: ['node_modules', 'dist'],
  };

  fs.writeFileSync(
    `${clientApiDir}/tsconfig.json`,
    JSON.stringify(tsConfigContent, undefined, 2),
  );

  // Create ESLint config
  const eslintConfigContent = `import baseConfig from "@internal/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
];`;

  fs.writeFileSync(`${clientApiDir}/eslint.config.js`, eslintConfigContent);

  console.warn(chalk.greenBright('Client API generated!'));
  console.warn(chalk.blueBright(`Location: ${clientApiDir}`));
  console.warn(chalk.blueBright(`Package name: ${packageName}`));
}

/* istanbul ignore next */
if (import.meta.url === `file://${processModule.argv[1]}`) {
  /* istanbul ignore next */
  generateClientApi(resolveFromRoot('api/server/swagger.json'), true);
}
