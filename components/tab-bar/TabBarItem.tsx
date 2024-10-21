import React, { useMemo, useRef } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { HapticPressable } from '@Ruume/ui';

import { ImpactFeedbackStyle } from 'expo-haptics';
import styled from 'styled-components/native';

const StyledLeftTabBarItemContainer = styled(Animated.View)`
  width: 100px;
  height: 60px;
  border-radius: 50px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin-right: -48px;
`;

const StyledRightTabBarItemContainer = styled(Animated.View)`
  width: 100px;
  height: 60px;
  border-radius: 50px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin-left: -48px;
`;

const StyledMainTabBarItemContainer = styled(Animated.View)`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const StyledBlackCircle = styled(Animated.View)`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

export type TabBarItemProps = {
  onPress: () => void;
  idx: number;
  isFocused: boolean;
  tabBarIcon?: (props: { focused: boolean; color: string; size: number }) => React.ReactNode;
};

export default function TabBarItem({ onPress, idx, isFocused, tabBarIcon }: TabBarItemProps) {
  const isMain = idx === 1;
  const Icon = tabBarIcon && tabBarIcon({ focused: isFocused, color: '#000', size: 24 });
  const firstMount = useRef(true);

  const scaleSharedValue = useSharedValue(1);
  const iconRotation = useSharedValue(0);

  const iconRotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotation.value}deg` }],
  }));
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleSharedValue.value }],
  }));

  useMemo(() => {
    if (isFocused) {
      if (!firstMount.current) {
        iconRotation.value = withRepeat(
          withSequence(
            withTiming(25, { duration: 125, easing: Easing.linear }),
            withTiming(0, { duration: 125, easing: Easing.linear }),
          ),
          2,
        );
      }
      scaleSharedValue.value = withTiming(isMain ? 1.2 : 1.15, { duration: 250, easing: Easing.elastic(1.5) });
    } else {
      scaleSharedValue.value = withTiming(1, { duration: 250, easing: Easing.elastic(1.5) });
    }
    firstMount.current = false;
  }, [isFocused, isMain, iconRotation, scaleSharedValue, firstMount]);

  return (
    <HapticPressable
      onPress={onPress}
      hapticWeight={!isFocused ? ImpactFeedbackStyle.Heavy : undefined}
      style={isMain ? { zIndex: 100 } : {}}
    >
      {idx === 0 && (
        <StyledLeftTabBarItemContainer style={[scaleStyle]}>
          <Animated.View style={[iconRotationStyle, { marginRight: 48 }]}>{Icon}</Animated.View>
        </StyledLeftTabBarItemContainer>
      )}
      {idx === 1 && (
        <StyledBlackCircle style={[scaleStyle]}>
          <StyledMainTabBarItemContainer>
            <Animated.View style={iconRotationStyle}>{Icon}</Animated.View>
          </StyledMainTabBarItemContainer>
        </StyledBlackCircle>
      )}
      {idx === 2 && (
        <StyledRightTabBarItemContainer style={[scaleStyle]}>
          <Animated.View style={[iconRotationStyle, { marginLeft: 48 }]}>{Icon}</Animated.View>
        </StyledRightTabBarItemContainer>
      )}
    </HapticPressable>
  );
}
