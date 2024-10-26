import React from 'react';
import { View } from 'react-native';

import { LandingAction } from '@Ruume/components/ruume-landing';

import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

const Container = styled(View)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme?.background};
`;

export default function RuumeLandingPage() {
  return (
    <>
      <StatusBar style="light" />
      <Container>
        <LandingAction />
      </Container>
    </>
  );
}
