import { execSync } from 'child_process';

/**
 * Check if a package is installed globally
 */
export const isPackageInstalledGlobally = (packageName: string): boolean => {
  try {
    execSync(`npm list -g ${packageName}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};
