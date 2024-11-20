/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable simpleImportSort/imports */
import 'react-native-get-random-values';

import React, { useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { clientPersister, queryClient } from '@Ruume/clients/react-query';
import { PageLoader } from '@Ruume/components/loaders';
import { NotificationToast } from '@Ruume/ui';
import { appTheme } from '@Ruume/ui/theme';

import { DrawerSkeleton } from '@Ruume/components/drawer';
import { useGetSession } from '@Ruume/hooks';
import { TransitionsManager } from '@Ruume/providers';
import { drawerStateAtom } from '@Ruume/store/ui/drawerStateAtom';
import { Colors } from '@Ruume/ui/colors';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { useAtomValue } from 'jotai';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ThemeProvider } from 'styled-components/native';

if (__DEV__) {
  import('@Ruume/ReactotronConfig');
}

SystemUI.setBackgroundColorAsync(Colors.systemBackgroundGray);

function AppContent() {
  const { isPending } = useGetSession();

  const drawerState = useAtomValue(drawerStateAtom);
  const screenScale = useSharedValue(1);
  const screenBorderRadius = useSharedValue(0);

  const screenScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: screenScale.value }],
      borderRadius: screenBorderRadius.value,
    };
  });

  const rescale = useCallback(() => {
    'worklet';
    screenScale.value = withTiming(drawerState.visible ? 0.9 : 1, { duration: 300 });
    screenBorderRadius.value = withTiming(drawerState.visible ? 56 : 0, { duration: 300 });
  }, [drawerState.visible, screenScale, screenBorderRadius]);

  const [loaded] = useFonts({
    SpaceMono: require('@Ruume/assets/fonts/SpaceMono-Regular.ttf'),
    Gabarito: require('@Ruume/assets/fonts/Gabarito/Gabarito-Regular.ttf'),
    GabaritoBold: require('@Ruume/assets/fonts/Gabarito/Gabarito-Bold.ttf'),
    GabaritoMedium: require('@Ruume/assets/fonts/Gabarito/Gabarito-Medium.ttf'),
    GabaritoSemiBold: require('@Ruume/assets/fonts/Gabarito/Gabarito-SemiBold.ttf'),
    GabaritoExtraBold: require('@Ruume/assets/fonts/Gabarito/Gabarito-ExtraBold.ttf'),
    GrandHotel: require('@Ruume/assets/fonts/GrandHotel/GrandHotel-Regular.ttf'),
  });

  useEffect(() => {
    rescale();
  }, [drawerState.visible, rescale]);

  if (!loaded || isPending) {
    return <PageLoader />;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NotificationToast />

        <Animated.View style={[{ flex: 1, overflow: 'hidden' }, screenScaleStyle]}>
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
        </Animated.View>
        {drawerState.visible && (
          <DrawerSkeleton breakPoints={drawerState.breakPoints} onStateChange={() => {}}>
            {drawerState.content}
          </DrawerSkeleton>
        )}
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
