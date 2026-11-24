import type { LinkProps } from './link-props';
import { router } from 'expo-router';
import { Pressable, Text } from 'react-native';

export type { LinkProps } from './link-props';

/** Native (Expo Router). */
export function Link({
  ref,
  href,
  children,
  className,
}: LinkProps & { ref?: React.Ref<React.ComponentRef<typeof Pressable>> }) {
  return (
    <Pressable ref={ref} className={className} onPress={() => router.push(href)}>
      {typeof children === 'string' ? (
        <Text className={className}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

Link.displayName = 'Link';
