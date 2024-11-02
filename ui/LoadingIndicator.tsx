import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

import { LoaderIndicatorSizes } from '@Ruume/types/ui';
import { sizeMap } from '@Ruume/utils/formatters';

import styled from 'styled-components/native';

const BreathingCirclesContainer = styled(View)<{ size: number }>`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  gap: ${({ size }) => size / 1.5}px;
`;

const AnimatedCircle = styled(Animated.View)<{ inverted?: boolean; size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50px;
  background-color: ${({ theme, inverted }) => (inverted ? theme?.text : theme?.background)};
`;

type LoadingIndicatorProps = {
  inverted?: boolean;
  size?: LoaderIndicatorSizes;
};

export const LoadingIndicator = ({ inverted, size = LoaderIndicatorSizes.sm }: LoadingIndicatorProps) => {
  const scale1 = useSharedValue(0.75);
  const scale2 = useSharedValue(0.75);
  const scale3 = useSharedValue(0.75);

  const circleScale1 = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
  }));
  const circleScale2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
  }));
  const circleScale3 = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
  }));

  scale1.value = withDelay(0, withRepeat(withTiming(1.25, { duration: 800 }), -1, true));
  scale2.value = withDelay(200, withRepeat(withTiming(1.25, { duration: 800 }), -1, true));
  scale3.value = withDelay(400, withRepeat(withTiming(1.25, { duration: 800 }), -1, true));

  const animations = [circleScale1, circleScale2, circleScale3];

  return (
    <BreathingCirclesContainer size={sizeMap[size]}>
      {Array.from({ length: 3 }).map((_, idx) => {
        return <AnimatedCircle inverted={inverted} size={sizeMap[size]} key={idx} style={animations[idx]} />;
      })}
    </BreathingCirclesContainer>
  );
};
