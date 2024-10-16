import React from 'react';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ruume-auth-page" />
        <Stack.Screen name="ruume-otp-page" />
      </Stack>
    </>
  );
}
