// Stub for expo-router during development
// This prevents Vite from trying to process the actual expo-router files

import type { ReactNode } from 'react';

export const router = {
  push: (href: string) => {
    console.warn(`[expo-router stub] router.push called with: ${href}`);
    // In a browser extension context, we might want to handle this differently
    // For now, just log it
  },
  replace: (href: string) => {
    console.warn(`[expo-router stub] router.replace called with: ${href}`);
  },
  back: () => {
    console.warn(`[expo-router stub] router.back called`);
  },
  canGoBack: () => false,
  setParams: (params: Record<string, unknown>) => {
    console.warn(`[expo-router stub] router.setParams called with:`, params);
  },
  dismiss: () => {
    console.warn(`[expo-router stub] router.dismiss called`);
  },
  dismissAll: () => {
    console.warn(`[expo-router stub] router.dismissAll called`);
  },
};

// Mock Stack component for cases where it might be imported
export const Stack = ({
  children,
  ..._props
}: {
  children: ReactNode;
  [key: string]: unknown;
}) => {
  console.warn(`[expo-router stub] Stack component rendered with props:`, _props);
  return children;
};

// Mock other common exports that might be used
export const Link = ({
  children,
  href,
  ..._props
}: {
  children: ReactNode;
  href: string;
  [key: string]: unknown;
}) => {
  console.warn(`[expo-router stub] Link component rendered with href: ${href}`);
  return children;
};

export const useRouter = () => router;

export const useLocalSearchParams = () => ({});

export const useGlobalSearchParams = () => ({});

export const useSegments = () => [];

export const usePathname = () => '/';

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
