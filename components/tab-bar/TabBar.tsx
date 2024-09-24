import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import TabBarItem from './TabBarItem';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';

const BarContainer = styled(View)`
  position: relative;
  background-color: #000;
  /* width: 100%;
  height: 120px; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTabBarContainer = styled(Animated.View)`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 40px;
  align-items: center;
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
            <TabBarItem
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              idx={index}
              isFocused={isFocused}
              tabBarIcon={options.tabBarIcon}
            />
          );
        })}
      </StyledTabBarContainer>
    </BarContainer>
  );
}
