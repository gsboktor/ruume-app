/* eslint-disable indent */
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import ArrowRight from '@Ruume/assets/icons/arrow_right.svg';

import { BaseText } from './BaseText';

import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import styled, { useTheme } from 'styled-components';

export type ContinueSliderProps = {
  onSlideComplete: () => void;
  reset: boolean;
  loading: boolean;
};

const SlideContainer = styled(LinearGradient)`
  position: relative;
  display: flex;
  height: 76px;
  width: 100%;
  border-radius: 100px;
  justify-content: center;
`;

const SlideButton = styled(Animated.View)`
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  left: 6px;
  bottom: 6px;
  top: 6px;
  width: 64px;
  height: 64px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.text};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;

const SlideText = styled(BaseText)`
  color: ${({ theme }) => theme.textLightGray};
  font-size: 24px;
  align-self: center;
  padding-left: 24px;
`;

export const ContinueSlider = ({ onSlideComplete }: ContinueSliderProps) => {
  const theme = useTheme();

  const [maxWidth, setMaxWidth] = useState(0);
  const [gestureActive, setGestureActive] = useState(true);

  const width = useSharedValue(64);
  const scale = useSharedValue(1);
  const outerScale = useSharedValue(1);

  const slideWidthStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      transform: [{ scale: withSpring(scale.value) }],
    };
  });

  const outerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: outerScale.value }],
    };
  });

  const handleGestureComplete = useCallback(() => {
    runOnJS(setGestureActive)(false);
    outerScale.value = withSequence(withTiming(1.2, { duration: 200 }), withSpring(1, { damping: 10, stiffness: 100 }));
    runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);

    width.value = withTiming(maxWidth - 36, { duration: 100, easing: Easing.elastic(0.75) });
    runOnJS(onSlideComplete)();
  }, [maxWidth, onSlideComplete, outerScale, width]);

  const panGesture = useMemo(
    () =>
      gestureActive
        ? Gesture.Pan()
            .onChange((event) => {
              if (event.changeX > 0) {
                if (width.value + event.changeX >= maxWidth * 0.75) {
                  runOnJS(handleGestureComplete)();
                  return;
                } else if (width.value + event.changeX < maxWidth - 36) {
                  width.value = width.value + event.changeX;
                }
              }
            })
            .onTouchesDown(() => {
              scale.value = 1.2;
              outerScale.value = withSpring(1.05, { damping: 15, stiffness: 100 });
              runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
            })
            .onEnd(() => {
              if (width.value >= maxWidth * 0.75) {
                runOnJS(handleGestureComplete)();
              } else {
                scale.value = 1;
                outerScale.value = withSpring(1, { damping: 15, stiffness: 100 });
                width.value = withSpring(64, { damping: 15, stiffness: 100 });
              }
            })
        : Gesture.Pan(),
    [gestureActive, width, maxWidth, handleGestureComplete, scale, outerScale],
  );
  return (
    <Animated.View style={outerStyle}>
      <SlideContainer
        onLayout={(event) => {
          setMaxWidth(event.nativeEvent.layout.width);
        }}
        colors={['#434343', '#303030']}
      >
        <SlideText>Slide to continue</SlideText>
        <GestureDetector gesture={panGesture}>
          <SlideButton style={slideWidthStyle}>
            <View
              style={{
                width: 64,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}
            >
              <ArrowRight width={48} height={48} fill={theme?.background} />
            </View>
          </SlideButton>
        </GestureDetector>
      </SlideContainer>
    </Animated.View>
  );
};
