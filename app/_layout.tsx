import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { appTheme, Colors } from '@Ruume/constants';

import { Stack } from 'expo-router';
import { ThemeProvider } from 'styled-components/native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={colorScheme === 'dark' ? appTheme.dark : appTheme.light}>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'none',
              contentStyle: {
                backgroundColor: Colors.black,
              },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
