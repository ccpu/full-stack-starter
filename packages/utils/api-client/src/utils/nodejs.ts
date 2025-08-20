import { execSync } from 'node:child_process';

/**
 * Check if a package is installed globally
 */
export function isPackageInstalledGlobally(packageName: string): boolean {
  try {
    execSync(`npm list -g ${packageName}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}
