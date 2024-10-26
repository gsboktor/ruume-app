import React from 'react';

import { Slot } from 'expo-router';

export default function LandingLayout() {
  return <Slot screenOptions={{ headerShown: false, animation: 'simple_push' }} />;
}
