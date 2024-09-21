import React, { useCallback, useState } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import * as Haptics from 'expo-haptics';
import styled from 'styled-components/native';

const LandingActionButton = styled(Animated.View)<{ pressed: boolean }>`
  width: 275px;
  height: 90px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
  box-shadow: 0px 8px 10px rgba(93, 93, 93, 0.5);
`;

export const LandingAction = ({
  setLandingContentVisible,
}: {
  setLandingContentVisible: (visible: boolean) => void;
}) => {
  const width = useSharedValue(275);
  const opacity = useSharedValue(1);
  const borderRadius = useSharedValue(50);

  const [contentVisible, setContentVisible] = useState(true);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    opacity: opacity.value,
    borderRadius: borderRadius.value,
  }));

  const handlePress = useCallback(() => {
    setContentVisible(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    width.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setLandingContentVisible)(true);
    });
    borderRadius.value = withTiming(0, { duration: 250 });
  }, [width, borderRadius, setLandingContentVisible]);

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <LandingActionButton pressed={pressed} style={animatedStyle}>
          {contentVisible && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: '300',
                width: '100%',
                textAlign: 'center',
              }}
            >
              Let&apos;s Ruume
            </Text>
          )}
        </LandingActionButton>
      )}
    </Pressable>
  );
};
