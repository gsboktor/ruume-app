import React from 'react';
import { View } from 'react-native';

import { BaseText } from '@Ruume/components/shared';

import styled from 'styled-components/native';

const StyledHomeContainer = styled(View)`
  height: 100%;
  background-color: black;
`;

export default function RuumeHome() {
  return (
    <StyledHomeContainer>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
        <BaseText type="bold">Welcome to Ruume Home!</BaseText>
      </View>
    </StyledHomeContainer>
  );
}
