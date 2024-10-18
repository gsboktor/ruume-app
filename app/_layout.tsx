import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { queryClient } from '@Ruume/clients/react-query';
import { NotificationToast } from '@Ruume/components/shared/NotificationToast';
import { appTheme, Colors } from '@Ruume/constants';

import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ThemeProvider } from 'styled-components/native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider theme={colorScheme === 'dark' ? appTheme.dark : appTheme.light}>
          <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
            <NotificationToast />
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
            </Stack>
          </SafeAreaView>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
