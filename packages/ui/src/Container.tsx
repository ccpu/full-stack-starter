import { View } from 'react-native';

interface ContainerProps {
  children?: React.ReactNode;
}

export function Container ({ children }: ContainerProps) {
  return <View className="mx-12 flex-1 items-center">{children}</View>;
}
