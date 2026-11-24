import { Pressable, Text } from 'react-native';
import { useTheme } from './use-theme.native';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Pressable
      className={`rounded-md border border-border px-4 py-2 ${className ?? ''}`}
      onPress={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Text className="text-foreground">
        {resolvedTheme === 'dark' ? 'Dark Theme' : 'Light Theme'}
      </Text>
    </Pressable>
  );
}
