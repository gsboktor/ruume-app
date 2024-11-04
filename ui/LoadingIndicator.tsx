import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { LoaderIndicatorSizes } from '@Ruume/types/ui';
import { sizeMap } from '@Ruume/utils/formatters';

import styled from 'styled-components/native';

const BreathingCirclesContainer = styled(View)<{ size: number }>`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
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
  const height1 = useSharedValue(sizeMap[size]);
  const height2 = useSharedValue(sizeMap[size]);
  const height3 = useSharedValue(sizeMap[size]);

  const circleHeight1 = useAnimatedStyle(() => ({
    height: height1.value,
  }));
  const circleHeight2 = useAnimatedStyle(() => ({
    height: height2.value,
  }));
  const circleHeight3 = useAnimatedStyle(() => ({
    height: height3.value,
  }));

  const startAnimation = useCallback(() => {
    'worklet';
    height1.value = withDelay(0, withRepeat(withTiming(height1.value * 2.75, { duration: 600 }), -1, true));
    height2.value = withDelay(300, withRepeat(withTiming(height2.value * 2.75, { duration: 600 }), -1, true));
    height3.value = withDelay(600, withRepeat(withTiming(height3.value * 2.75, { duration: 600 }), -1, true));
  }, [height1, height2, height3]);

  const animations = [circleHeight1, circleHeight2, circleHeight3];

  useMemo(() => {
    runOnUI(startAnimation)();
  }, [startAnimation]);

  return (
    <BreathingCirclesContainer size={sizeMap[size]}>
      {animations.map((animation, idx) => {
        return <AnimatedCircle inverted={inverted} size={sizeMap[size]} key={idx} style={animation} />;
      })}
    </BreathingCirclesContainer>
  );
};
