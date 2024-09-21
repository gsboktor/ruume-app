/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import { LandingAction } from '@Ruume/components/ruume-landing';
import { BaseText } from '@Ruume/components/shared';

import { useFonts } from 'expo-font';
import styled from 'styled-components/native';

const Container = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const RuumeLanding = () => {
  const [landingContentVisible, setLandingContentVisible] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require('@Ruume/assets/fonts/SpaceMono-Regular.ttf'),
    DMSans: require('@Ruume/assets/fonts/DMSans-Regular.ttf'),
    DMSansBold: require('@Ruume/assets/fonts/DMSans-Bold.ttf'),
    DMSansLight: require('@Ruume/assets/fonts/DMSans-Light.ttf'),
    DMSansMedium: require('@Ruume/assets/fonts/DMSans-Medium.ttf'),
    DMSansSemiBold: require('@Ruume/assets/fonts/DMSans-SemiBold.ttf'),
    DMSansThin: require('@Ruume/assets/fonts/DMSans-Thin.ttf'),
    DMSansExtraLight: require('@Ruume/assets/fonts/DMSans-ExtraLight.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Container>
      <SafeAreaView>
        {!landingContentVisible ? (
          <LandingAction setLandingContentVisible={setLandingContentVisible} />
        ) : (
          <>
            <View>
              <BaseText type="bold" style={{ color: '#fff' }}>
                Hello Landing With Font Sans!
              </BaseText>
            </View>
          </>
        )}
      </SafeAreaView>
    </Container>
  );
};
