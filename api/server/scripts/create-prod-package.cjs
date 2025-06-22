#!/usr/bin/env node

/**
 * Creates a production package.json by recursively finding all package.json files
 * in the workspace and merging their dependencies, filtering out workspace dependencies
 * and dev dependencies.
 *
 * This script is used during Docker build to create a clean package.json
 * with only external dependencies for production installation.
 */

const fs = require("fs");
const path = require("path");

/**
 * Recursively finds all package.json files in a directory, excluding node_modules
 */
function findPackageJsonFiles(dir, packageFiles = []) {
  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules directories
        if (item !== "node_modules") {
          findPackageJsonFiles(fullPath, packageFiles);
        }
      } else if (item === "package.json") {
        packageFiles.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}: ${error.message}`);
  }

  return packageFiles;
}

/**
 * Processes a package.json file and extracts non-workspace dependencies
 * Only includes production dependencies, excluding devDependencies
 */
function processPackageFile(packagePath) {
  try {
    const packageContent = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    const dependencies = {};

    // Process regular dependencies (production only, skip devDependencies)
    if (packageContent.dependencies) {
      Object.entries(packageContent.dependencies).forEach(([name, version]) => {
        if (!version.startsWith("workspace:")) {
          dependencies[name] = version;
        } else {
          console.log(
            `Skipping workspace dependency: ${name} from ${packagePath}`,
          );
        }
      });
    }

    return {
      name: packageContent.name,
      version: packageContent.version,
      dependencies,
      path: packagePath,
    };
  } catch (error) {
    console.warn(
      `Warning: Could not process package.json at ${packagePath}: ${error.message}`,
    );
    return null;
  }
}

function createProdPackage() {
  try {
    // Start from the workspace root
    // In Docker context, we're in /usr/src/app/scripts, so go up one level
    // In local context, we're in api/server/scripts, so go up three levels
    let workspaceRoot;
    if (
      process.env.NODE_ENV === "production" ||
      process.cwd().includes("/usr/src/app")
    ) {
      // Docker context: we're in /usr/src/app/scripts
      workspaceRoot = path.resolve(__dirname, "..");
    } else {
      // Local context: we're in api/server/scripts
      workspaceRoot = path.resolve(__dirname, "..", "..", "..");
    }

    console.log("[createProdPackage] Workspace root:", workspaceRoot);

    // Find all package.json files recursively
    const packageFiles = findPackageJsonFiles(workspaceRoot);
    console.log(`Found ${packageFiles.length} package.json files`);

    // Process all package files
    const processedPackages = packageFiles
      .map(processPackageFile)
      .filter((pkg) => pkg !== null);

    // Find the main server package (this one) for name and version
    const serverPackagePath = path.join(__dirname, "..", "package.json");
    const serverPkg = processPackageFile(serverPackagePath);

    if (!serverPkg) {
      throw new Error("Could not find or process server package.json");
    }

    // Initialize production package structure
    const prodPkg = {
      name: serverPkg.name,
      version: serverPkg.version,
      dependencies: {},
    };

    // Merge dependencies from all packages
    processedPackages.forEach((pkg) => {
      if (pkg.dependencies) {
        Object.entries(pkg.dependencies).forEach(([name, version]) => {
          // Only add if not already present (first occurrence takes precedence)
          if (!prodPkg.dependencies[name]) {
            prodPkg.dependencies[name] = version;
            console.log(
              `Added dependency: ${name}@${version} from ${path.relative(workspaceRoot, pkg.path)}`,
            );
          } else if (prodPkg.dependencies[name] !== version) {
            console.warn(
              `Version conflict for ${name}: ${prodPkg.dependencies[name]} vs ${version} from ${path.relative(workspaceRoot, pkg.path)}`,
            );
          }
        });
      }
    });

    // Write the production package.json (without workspace configuration)
    const outputPath = path.join(__dirname, "..", "package.json");
    fs.writeFileSync(outputPath, JSON.stringify(prodPkg, null, 2));

    console.log("Production package.json created successfully");
    console.log(
      `Total dependencies: ${Object.keys(prodPkg.dependencies).length}`,
    );
  } catch (error) {
    console.error("Error creating production package.json:", error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  createProdPackage();
}

module.exports = { createProdPackage };
