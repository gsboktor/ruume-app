import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { clientPersister, queryClient } from '@Ruume/clients/react-query';
import { authStateAtomEffect } from '@Ruume/store';
import { NotificationToast } from '@Ruume/ui';
import { Colors } from '@Ruume/ui/colors';
import { appTheme } from '@Ruume/ui/theme';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import { useAtomValue } from 'jotai';
import { ThemeProvider } from 'styled-components/native';

if (__DEV__) {
  import('@Ruume/ReactotronConfig');
}

export default function RootLayout() {
  useAtomValue(authStateAtomEffect);

  const colorScheme = useColorScheme();
  return (
    <PersistQueryClientProvider persistOptions={{ persister: clientPersister }} client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider theme={colorScheme === 'dark' ? appTheme.dark : appTheme.light}>
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
        </ThemeProvider>
      </SafeAreaProvider>
    </PersistQueryClientProvider>
  );
}
