import React from 'react';
import { View } from 'react-native';

import Settings from '@Ruume/assets/icons/settings.svg';
import { BaseText } from '@Ruume/components/shared';

import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

const StyledHomeContainer = styled(View)`
  height: 100%;
  background-color: black;
  padding: 16px;
`;

export default function RuumeHome() {
  return (
    <>
      <StyledHomeContainer>
        <StatusBar style="light" />
        <BaseText type="bold" style={{ color: 'white' }}>
          Welcome to Ruume Home!
        </BaseText>
        <Settings width={24} height={24} fill="white" />
      </StyledHomeContainer>
    </>
  );
}
