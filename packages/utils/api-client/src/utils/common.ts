import fs from "fs";
import path from "path";

/**
 * Get package.json structure for generated API client package
 */
export const getPackageJson = (packageName: string) => {
  return {
    name: packageName,
    private: true,
    version: "0.1.0",
    type: "module" as const,
    exports: {
      ".": "./src/index.ts",
    },
    license: "MIT",
    scripts: {
      build: "tsc",
      clean: "git clean -xdf .cache .turbo dist node_modules",
      dev: "tsc",
      format:
        "prettier --check . --ignore-path ../../.gitignore --ignore-path ../../.prettierignore",
      lint: "eslint",
      typecheck: "tsc --noEmit --emitDeclarationOnly false",
    },
    dependencies: {
      "whatwg-fetch": "^3.6.2",
    },
    devDependencies: {
      "@acme/eslint-config": "workspace:*",
      "@acme/prettier-config": "workspace:*",
      "@acme/tsconfig": "workspace:*",
      eslint: "catalog:",
      prettier: "catalog:",
      typescript: "catalog:",
    },
    prettier: "@acme/prettier-config",
  };
};

/**
 * Check if swagger file has changed by comparing content
 */
export const isSwaggerFileChanged = (
  sourceFile: string,
  targetFile: string,
): boolean => {
  if (!fs.existsSync(targetFile)) return true;

  const sourceContent = fs.readFileSync(sourceFile, "utf8");
  const targetContent = fs.readFileSync(targetFile, "utf8");

  return sourceContent !== targetContent;
};

/**
 * Get absolute path from project root
 */
export const resolveFromRoot = (relativePath: string): string => {
  // If we're running from the scripts directory, go up one level
  const currentDir = process.cwd();
  const projectRoot = currentDir.endsWith("scripts")
    ? path.dirname(currentDir)
    : currentDir;
  return path.resolve(projectRoot, relativePath);
};
