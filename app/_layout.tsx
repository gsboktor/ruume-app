/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable simpleImportSort/imports */
import 'react-native-get-random-values';

import React from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { clientPersister, queryClient } from '@Ruume/clients/react-query';
import { PageLoader } from '@Ruume/components/loaders';
import { NotificationToast } from '@Ruume/ui';
import { Colors } from '@Ruume/ui/colors';
import { appTheme } from '@Ruume/ui/theme';

import { useGetSession } from '@Ruume/hooks';
import { TransitionsManager } from '@Ruume/providers/TransitionsManager';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { ThemeProvider } from 'styled-components/native';

if (__DEV__) {
  import('@Ruume/ReactotronConfig');
}

function AppContent() {
  const { isPending } = useGetSession();

  const [loaded] = useFonts({
    SpaceMono: require('@Ruume/assets/fonts/SpaceMono-Regular.ttf'),
    Gabarito: require('@Ruume/assets/fonts/Gabarito/Gabarito-Regular.ttf'),
    GabaritoBold: require('@Ruume/assets/fonts/Gabarito/Gabarito-Bold.ttf'),
    GabaritoMedium: require('@Ruume/assets/fonts/Gabarito/Gabarito-Medium.ttf'),
    GabaritoSemiBold: require('@Ruume/assets/fonts/Gabarito/Gabarito-SemiBold.ttf'),
    GabaritoExtraBold: require('@Ruume/assets/fonts/Gabarito/Gabarito-ExtraBold.ttf'),
    GrandHotel: require('@Ruume/assets/fonts/GrandHotel/GrandHotel-Regular.ttf'),
  });

  if (!loaded || isPending) {
    return <PageLoader />;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
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
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(landing)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'simple_push' }} />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <PersistQueryClientProvider persistOptions={{ persister: clientPersister }} client={queryClient}>
      <ThemeProvider theme={colorScheme === 'dark' ? appTheme.dark : appTheme.light}>
        <TransitionsManager Loader={PageLoader}>
          <AppContent />
        </TransitionsManager>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}
