import React from 'react';
import { View } from 'react-native';

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
        <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
          <BaseText type="bold">Welcome to Ruume Home!</BaseText>
        </View>
      </StyledHomeContainer>
    </>
  );
}
