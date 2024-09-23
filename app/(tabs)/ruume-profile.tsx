import React from 'react';
import { View } from 'react-native';

import { BaseText } from '@Ruume/components/shared';

import styled from 'styled-components/native';

const StyledProfileContainer = styled(View)`
  height: 100%;
  background-color: black;
`;
export default function RuumeProfile() {
  return (
    <StyledProfileContainer>
      <BaseText>Ruume Profile</BaseText>
    </StyledProfileContainer>
  );
}
