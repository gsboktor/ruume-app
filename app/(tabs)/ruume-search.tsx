import React from 'react';
import { View } from 'react-native';

import { BaseText } from '@Ruume/ui';

import styled from 'styled-components/native';

const StyledSearchContainer = styled(View)`
  height: 100%;
  background-color: black;
`;

export default function RuumeSearch() {
  return (
    <StyledSearchContainer>
      <BaseText>Ruume Search</BaseText>
    </StyledSearchContainer>
  );
}
