import type { ViewStyle } from "react-native";
import React from "react";
import { View } from "react-native";

interface ReactNativeContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

// Simple wrapper to render React Native components in web environment
export const ReactNativeContainer: React.FC<ReactNativeContainerProps> = ({
  children,
  style = {},
}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          width: "100%",
          minHeight: 300,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
