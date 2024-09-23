import React from 'react';

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          contentStyle: {
            backgroundColor: '#000',
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
