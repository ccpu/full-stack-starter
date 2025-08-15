/* eslint-disable react-hooks-extra/no-unnecessary-use-prefix */
// Stub for expo-router during development
// This prevents Vite from trying to process the actual expo-router files

import type { ReactNode } from 'react';

export const router = {
  push: (href: string): void => {
    console.warn(`[expo-router stub] router.push called with: ${href}`);
    // In a browser extension context, we might want to handle this differently
    // For now, just log it
  },
  replace: (href: string): void => {
    console.warn(`[expo-router stub] router.replace called with: ${href}`);
  },
  back: (): void => {
    console.warn(`[expo-router stub] router.back called`);
  },
  canGoBack: (): boolean => false,
  setParams: (params: Record<string, unknown>): void => {
    console.warn(`[expo-router stub] router.setParams called with:`, params);
  },
  dismiss: (): void => {
    console.warn(`[expo-router stub] router.dismiss called`);
  },
  dismissAll: (): void => {
    console.warn(`[expo-router stub] router.dismissAll called`);
  },
};

// Mock Stack component for cases where it might be imported
export async function Stack({
  children,
  ..._props
}: {
  children: ReactNode;
  [key: string]: unknown;
}): Promise<ReactNode> {
  console.warn(`[expo-router stub] Stack component rendered with props:`, _props);
  return children;
}

// Mock other common exports that might be used
export async function Link({
  children,
  href,
  ..._props
}: {
  children: ReactNode;
  href: string;
  [key: string]: unknown;
}): Promise<ReactNode> {
  console.warn(`[expo-router stub] Link component rendered with href: ${href}`);
  return children;
}

export const useRouter = (): typeof router => router;

export const useLocalSearchParams = (): Record<string, unknown> => ({});

export const useGlobalSearchParams = (): Record<string, unknown> => ({});

export const useSegments = (): unknown[] => [];

export const usePathname = (): string => '/';

export default {
  router,
  Stack,
  Link,
  useRouter,
  useLocalSearchParams,
  useGlobalSearchParams,
  useSegments,
  usePathname,
};
