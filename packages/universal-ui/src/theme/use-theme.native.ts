import { useColorScheme } from 'nativewind';

type Theme = 'light' | 'dark' | 'system';

/** Native counterpart of next-themes' `useTheme`, backed by NativeWind's color scheme. */
export function useTheme(): {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
} {
  const scheme = useColorScheme();
  const resolvedTheme = scheme.colorScheme === 'dark' ? 'dark' : 'light';
  return {
    theme: resolvedTheme,
    resolvedTheme,
    setTheme: (theme) => {
      scheme.setColorScheme(theme);
    },
  };
}
