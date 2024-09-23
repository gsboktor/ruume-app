import React from 'react';
import { View } from 'react-native';

import Settings from '@Ruume/assets/icons/settings.svg';
import { BaseText } from '@Ruume/components/shared';

import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

const StyledHomeContainer = styled(View)`
  height: 100%;
  background-color: black;
`;

export default function RuumeHome() {
  return (
    <>
      <StatusBar style="light" />
      <StyledHomeContainer>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
          <BaseText type="bold" style={{ color: '#fff' }}>
            Welcome to Ruume Home!
          </BaseText>
          <Settings width={24} height={24} fill="white" />
        </View>
      </StyledHomeContainer>
    </>
  );
}
