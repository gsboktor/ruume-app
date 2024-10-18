import React, { useContext } from 'react';
import { View } from 'react-native';

import Settings from '@Ruume/assets/icons/settings.svg';
import { BaseText } from '@Ruume/components/shared';

import { StatusBar } from 'expo-status-bar';
import styled, { ThemeContext } from 'styled-components/native';

const StyledHomeContainer = styled(View)`
  height: 100%;
  background-color: black;
  padding: 16px;
`;

export default function RuumeHome() {
  const theme = useContext(ThemeContext);

  return (
    <>
      <StyledHomeContainer>
        <StatusBar style="light" />
        <BaseText type="default" style={{ color: theme?.text }}>
          Welcome to Ruume Home!
        </BaseText>
        <Settings width={24} height={24} fill="white" />
      </StyledHomeContainer>
    </>
  );
}
