/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';

import { PageLoader } from '@Ruume/components/loaders';
import { useGetSession } from '@Ruume/hooks/useGetSession';

import { useFonts } from 'expo-font';
import { Redirect } from 'expo-router';

//TODO: Load Fonts and Create Splash Screen

export default function Index() {
  const { data: session } = useGetSession();

  const [loaded] = useFonts({
    SpaceMono: require('@Ruume/assets/fonts/SpaceMono-Regular.ttf'),
    Gabarito: require('@Ruume/assets/fonts/Gabarito/Gabarito-Regular.ttf'),
    GabaritoBold: require('@Ruume/assets/fonts/Gabarito/Gabarito-Bold.ttf'),
    GabaritoMedium: require('@Ruume/assets/fonts/Gabarito/Gabarito-Medium.ttf'),
    GabaritoSemiBold: require('@Ruume/assets/fonts/Gabarito/Gabarito-SemiBold.ttf'),
    GabaritoExtraBold: require('@Ruume/assets/fonts/Gabarito/Gabarito-ExtraBold.ttf'),
    GrandHotel: require('@Ruume/assets/fonts/GrandHotel/GrandHotel-Regular.ttf'),
  });

  if (!loaded) {
    return <PageLoader />;
  }

  return session?.user?.role === 'authenticated' ? (
    <Redirect href="/ruume-home" />
  ) : (
    <Redirect href="/ruume-landing-page" />
  );
}
