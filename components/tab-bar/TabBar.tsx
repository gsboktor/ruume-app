import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { vh } from '@Ruume/utils/viewport';

import TabBarItem from './TabBarItem';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';

const BarContainer = styled(View)`
  position: absolute;
  bottom: -32px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${vh * 19.0}px;
  background-color: ${({ theme }) => theme?.background};
  box-shadow: 0px -24px 16px rgba(0, 0, 0, 1);
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
`;

const StyledTabBarContainer = styled(Animated.View)`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: ${vh * 6}px;
  align-items: center;
`;

export type TabBarProps = BottomTabBarProps;

export default function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const yPosition = useSharedValue(150);
  useEffect(() => {
    yPosition.value = withSpring(0, { stiffness: 200, damping: 18, mass: 1 });
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
