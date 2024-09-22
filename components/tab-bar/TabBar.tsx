import React, { useEffect } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;
const tabBarWidth = 175;

const BarContainer = styled(View)`
  position: relative;
  background-color: #000;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTabBarContainer = styled(Animated.View)`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  width: 175px;
  height: 80px;
  border-radius: 100px;
  position: absolute;
  bottom: 40px;
  left: ${(screenWidth - tabBarWidth) / 2}px;
  align-self: center;
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
    yPosition.value = withSpring(0, { stiffness: 200, damping: 15, mass: 1 });
  }, [yPosition]);

  return (
    <BarContainer>
      <StyledTabBarContainer style={{ transform: [{ translateY: yPosition }] }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          return (
            <StyledTabBarItem key={route.key} onPress={() => navigation.navigate(route.name)}>
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: '#000', size: 24 })}
            </StyledTabBarItem>
          );
        })}
      </StyledTabBarContainer>
    </BarContainer>
  );
}
