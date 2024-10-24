import React from 'react';
import { FormProvider } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';

import RuumeAuthHeader from '@Ruume/components/ruume-auth/RuumeAuthHeader';
import { useAuthFormByType } from '@Ruume/hooks';
import { formTypeAtom } from '@Ruume/store';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAtomValue } from 'jotai';

export default function AuthLayout() {
  const formType = useAtomValue(formTypeAtom);
  const methods = useAuthFormByType(formType);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FormProvider {...methods}>
        <StatusBar style="light" />
        <RuumeAuthHeader />
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen name="ruume-sign-up-page" />
          <Stack.Screen name="ruume-sign-in-page" />
          <Stack.Screen name="ruume-otp-page" />
        </Stack>
      </FormProvider>
    </SafeAreaView>
  );
}
