import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { BaseText } from '@Ruume/ui';

import { styled, ThemeContext } from 'styled-components/native';

const HeaderContainer = styled(View)`
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(80px);
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export default function RuumeAuthHeader() {
  const theme = useContext(ThemeContext);

  const fadeInSharedValue = useSharedValue(0);
  const fadeInAnimation = useAnimatedStyle(() => ({
    opacity: fadeInSharedValue.value,
  }));

  useEffect(() => {
    fadeInSharedValue.value = withTiming(1, { duration: 350 });
  }, [fadeInSharedValue]);

  return (
    <HeaderContainer>
      <BaseText type="stylized" style={[{ fontSize: 64, color: theme?.text }, fadeInAnimation]}>
        Ruume
      </BaseText>
    </HeaderContainer>
  );
}
