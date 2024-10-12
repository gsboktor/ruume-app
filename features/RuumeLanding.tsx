/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { View } from 'react-native';

import { LandingAction } from '@Ruume/components/ruume-landing';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

const Container = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const RuumeLanding = () => {
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
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Container>
        <LandingAction />
      </Container>
    </>
  );
};
