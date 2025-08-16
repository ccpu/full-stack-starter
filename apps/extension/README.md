# Extension App

This Chrome extension is part of the SaaS Lens monorepo and demonstrates how to integrate with the shared tooling infrastructure.

## Features

- ✅ **Shared TypeScript Configuration**: Uses `@internal/tsconfig` for consistent TypeScript settings
- ✅ **Shared ESLint Configuration**: Uses `@internal/eslint-config` for consistent code quality
- ✅ **Shared Prettier Configuration**: Uses `@internal/prettier-config` for consistent code formatting
- ✅ **Tailwind CSS**: Uses `@internal/tailwind-config/web` for consistent styling
- ✅ **Modern Build System**: Vite with TypeScript and React support
- ✅ **Chrome Extension APIs**: Full access to Chrome extension APIs with proper TypeScript types
- ✅ **Shared Components**: Can use shared UI components compatible with the web platform

## Architecture

The extension is configured to work seamlessly with the monorepo's shared tooling:

### TypeScript Configuration

- Extends `@internal/tsconfig/base.json` for consistent TypeScript settings
- Includes Chrome extension types for proper API support
- Configured for React JSX with modern settings

### Build System

- **Vite**: Fast development server and build tool
- **CRXJS**: Chrome extension build plugin for Vite
- **React**: Modern React 19 with TypeScript support
- **Tailwind CSS**: Utility-first CSS framework

### Code Quality

- **ESLint**: Extends shared ESLint configuration with React rules
- **Prettier**: Uses shared Prettier configuration for consistent formatting
- **TypeScript**: Strict type checking enabled

### Package Management

- Uses workspace dependencies (`@internal/*`) for shared tooling
- Uses catalog dependencies for consistent versions across the monorepo

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Format code
pnpm format
```

## Structure

```
src/
├── components/          # Shared UI components
│   └── Button.tsx       # Example reusable button component
├── utils/               # Utility functions
├── popup/               # Extension popup
├── background/          # Service worker
├── contentScript/       # Content script
├── options/             # Options page
├── devtools/            # DevTools integration
├── newtab/              # New tab page
├── sidepanel/           # Side panel
└── manifest.ts          # Extension manifest
```

## Extension Compatibility

This extension demonstrates how to:

- Share TypeScript configurations with Expo and Next.js apps
- Use common tooling (ESLint, Prettier, Tailwind) across all apps
- Create web-compatible components that work in browser extensions
- Maintain type safety with Chrome extension APIs

## Notes

- The extension uses regular Tailwind CSS instead of NativeWind since it runs in a browser environment
- Shared components from `@internal/ui` that depend on React Native are not compatible with browser extensions
- Chrome extension APIs are properly typed and available throughout the codebase
