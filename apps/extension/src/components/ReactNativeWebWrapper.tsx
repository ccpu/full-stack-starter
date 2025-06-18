import { useEffect } from "react";
import { AppRegistry } from "react-native-web";

interface ReactNativeWebWrapperProps {
  children: React.ReactNode;
}

export const ReactNativeWebWrapper: React.FC<ReactNativeWebWrapperProps> = ({
  children,
}) => {
  useEffect(() => {
    // Register the app component with React Native Web
    AppRegistry.registerComponent("App", () => () => children);

    // Get the app element and render
    const rootTag = document.getElementById("react-native-web-app");
    if (rootTag) {
      AppRegistry.runApplication("App", {
        rootTag,
      });
    }
  }, [children]);

  return (
    <div id="react-native-web-app" style={{ height: "100%", width: "100%" }} />
  );
};
