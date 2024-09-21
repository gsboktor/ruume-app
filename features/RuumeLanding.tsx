import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { LandingAction } from '@Ruume/components';

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
  return (
    <Container>
      <SafeAreaView>
        {!landingContentVisible ? (
          <LandingAction setLandingContentVisible={setLandingContentVisible} />
        ) : (
          <View>
            <Text style={{ color: '#fff' }}>Hello Landing Content!</Text>
          </View>
        )}
      </SafeAreaView>
    </Container>
  );
};
