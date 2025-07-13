import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import '../styles.css';

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <View className="bg- flex-1">
      <StatusBar />
      <Stack
        screenOptions={{
          headerShown: true,
          contentStyle: {
            backgroundColor: 'transparent',
          },
          animation: 'default',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: 'About',
          }}
        />
      </Stack>
    </View>
  );
}
