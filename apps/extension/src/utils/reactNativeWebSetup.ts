// React Native Web setup for Chrome Extension
import { AppRegistry } from "react-native-web";

// Initialize React Native Web when the module is imported
if (typeof document !== "undefined") {
  // Register any global app components here if needed
  console.log(
    "React Native Web with NativeWind initialized for Chrome Extension",
  );
}

export const initializeReactNativeWeb = () => {
  // Any additional setup can go here
  return true;
};
