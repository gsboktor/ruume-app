import React, { useEffect } from 'react';
import { Dimensions, Pressable } from 'react-native';
import Animated, { Easing, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;
const tabBarWidth = 175;

const StyledTabBarContainer = styled(Animated.View)`
  background-color: #000;
  display: flex;
  flex-direction: row;
  width: 175px;
  height: 80px;
  border-radius: 100px;
  position: absolute;
  bottom: 20px;
  left: ${(screenWidth - tabBarWidth) / 2}px;
  justify-content: space-between;
`;

const StyledTabBarItem = styled(Pressable)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export type TabBarProps = BottomTabBarProps;

export default function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const yPosition = useSharedValue(100);
  useEffect(() => {
    yPosition.value = withDelay(25, withTiming(0, { duration: 500, easing: Easing.elastic(1.2) }));
  }, [yPosition]);

  return (
    <StyledTabBarContainer style={{ transform: [{ translateY: yPosition }] }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <StyledTabBarItem key={route.key} onPress={() => navigation.navigate(route.name)}>
            {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: '#fff', size: 24 })}
          </StyledTabBarItem>
        );
      })}
    </StyledTabBarContainer>
  );
}
