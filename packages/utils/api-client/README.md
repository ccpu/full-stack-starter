# API Client Generation Scripts

This directory contains scripts for generating TypeScript API clients from OpenAPI/Swagger specifications.

## Setup

The required dependencies are already configured in the workspace. The script uses:

- `@openapitools/openapi-generator-cli` (must be installed globally)
- `change-case` for naming conventions
- `glob` for file operations
- `chalk` for colored console output
- `rimraf` for directory cleanup

## Usage

### Generate API Client

```bash
# From the project root
pnpm generate:api-client

# Force regeneration (skip change detection)
pnpm generate:api-client:force
```

### Direct Script Execution

```bash
# Using npx
npx tsx scripts/generate-api-client.ts [--force]

# From scripts directory
cd scripts
tsx generate-api-client.ts [--force]
```

## Configuration

### Generator Config

The OpenAPI generator configuration is located in `scripts/api-client/config.yaml`. This file controls:

- TypeScript version compatibility
- Interface generation
- Naming conventions
- Enum handling

### Output Structure

Generated clients are placed in `api/client/{api-name}/` with the following structure:

```
api/client/{api-name}/
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.js      # ESLint configuration
├── swagger.json          # Copy of source Swagger file
└── src/
    └── src/
        ├── index.ts      # Main export file
        ├── runtime.ts    # Runtime utilities
        └── apis/         # Generated API classes
```

## Features

- **Change Detection**: Automatically skips generation if Swagger file hasn't changed
- **Force Mode**: Use `--force` flag to regenerate regardless of changes
- **Workspace Integration**: Generated packages follow workspace conventions
- **TypeScript Support**: Full TypeScript types and interfaces
- **ESLint Integration**: Proper ESLint configuration for generated code
- **Consistent Naming**: Uses kebab-case for package names

## Global Dependencies

Make sure to install the OpenAPI generator globally:

```bash
npm install -g @openapitools/openapi-generator-cli
```

## Example

```bash
# Generate client from default swagger file (api/server/swagger.json)
pnpm generate:api-client

# The generated client will be available at:
# api/client/api-documentation/

# Import in your code:
import { AppApi } from '@internal/api-client';
```

## Troubleshooting

1. **Generator not found**: Install `@openapitools/openapi-generator-cli` globally
2. **Permission errors**: Run with appropriate permissions for file system operations
3. **Path issues**: Ensure you're running from the project root or using absolute paths
