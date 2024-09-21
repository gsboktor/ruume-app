import React, { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import * as Haptics from 'expo-haptics';
import styled from 'styled-components/native';

const LandingActionButton = styled(Animated.View)`
  position: relative;
  width: 275px;
  height: 90px;
  background-color: #fff;
  justify-content: center;
  border-radius: 50%;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
  box-shadow: 0px 8px 10px rgba(93, 93, 93, 0.5);
`;

const LandingActionText = styled(Animated.Text)`
  font-size: 20px;
  font-weight: 300;
  width: 100%;
  text-align: center;
  overflow: hidden;
`;

export const LandingAction = ({
  setLandingContentVisible,
}: {
  setLandingContentVisible: (visible: boolean) => void;
}) => {
  const width = useSharedValue(275);
  const height = useSharedValue(90);

  const [contentVisible, setContentVisible] = useState(true);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    height: height.value,
  }));

  const handlePress = useCallback(() => {
    setContentVisible(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    width.value = withSequence(
      withTiming(290, { duration: 75 }),
      withTiming(12, { duration: 300 }, (finished) => {
        if (finished) {
          height.value = withDelay(
            25,
            withTiming(0, { duration: 200 }, (finished) => {
              if (finished) {
                runOnJS(setLandingContentVisible)(true);
              }
            }),
          );
        }
      }),
    );
  }, [width, height, setLandingContentVisible]);

  return (
    <Pressable onPress={handlePress}>
      <LandingActionButton style={animatedStyle}>
        {contentVisible && <LandingActionText exiting={FadeOut.duration(100)}>Let&apos;s Ruume</LandingActionText>}
      </LandingActionButton>
    </Pressable>
  );
};
