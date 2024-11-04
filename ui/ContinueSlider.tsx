/* eslint-disable indent */
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import ArrowSlim from '@Ruume/assets/icons/arrow_slim.svg';
import Cancel from '@Ruume/assets/icons/cancel.svg';
import { notificationAtom } from '@Ruume/store';
import { NotificationType } from '@Ruume/types/store';
import { LoaderIndicatorSizes } from '@Ruume/types/ui';

import { BaseText } from './BaseText';
import { LoadingIndicator } from './LoadingIndicator';

import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useSetAtom } from 'jotai';
import styled, { useTheme } from 'styled-components';

export type ContinueSliderProps = {
  onSlideComplete: () => void;
  reset: boolean;
  loading: boolean;
  disabled: boolean;
  notification: NotificationType;
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
`;

const SlideText = styled(BaseText)`
  color: ${({ theme }) => theme.textLightGray};
  font-size: 24px;
  align-self: center;
  padding-left: 24px;
`;

const LoadingIndicatorContainer = styled(View)`
  position: absolute;
  align-self: center;
  justify-self: center;
  z-index: 100;
`;

export const ContinueSlider = ({ onSlideComplete, reset, loading, disabled, notification }: ContinueSliderProps) => {
  const theme = useTheme();

  const [maxWidth, setMaxWidth] = useState(0);
  const [gestureActive, setGestureActive] = useState(true);
  const setNotification = useSetAtom(notificationAtom);

  const width = useSharedValue(64);
  const scale = useSharedValue(1);
  const outerScale = useSharedValue(1);
  const outerX = useSharedValue(0);

  const iconX = useSharedValue(0);
  const iconOpacity = useSharedValue(1);

  const iconBobStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: iconX.value }],
      opacity: iconOpacity.value,
    };
  });

  const slideWidthStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      transform: [{ scale: withSpring(scale.value) }],
    };
  });

  const outerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: outerScale.value }, { translateX: outerX.value }],
    };
  });

  const buttonEnabledStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(disabled ? theme.textLightGray : theme.text, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      }),
      shadowOffset: { width: 16, height: 0 },
      shadowOpacity: withTiming(disabled ? 0 : 0.25, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      }),
      shadowRadius: 6,
    };
  });

  const arrowBobLoop = useCallback(() => {
    iconX.value = withRepeat(
      withSequence(withTiming(3, { duration: 800 }), withTiming(-1, { duration: 800 })),
      -1,
      true,
    );
  }, [iconX]);

  const resetSlider = useCallback(() => {
    setGestureActive(true);
    width.value = withSpring(64, { damping: 15, stiffness: 100 });
    scale.value = 1;
    outerScale.value = 1;
    iconOpacity.value = withTiming(1, { duration: 400 });
  }, [scale, setGestureActive, outerScale, width, iconOpacity]);

  const handleGestureComplete = useCallback(() => {
    runOnJS(setGestureActive)(false);
    runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
    runOnJS(onSlideComplete)();

    outerScale.value = withSequence(withTiming(1.2, { duration: 200 }), withSpring(1, { damping: 10, stiffness: 100 }));
    width.value = withTiming(maxWidth, { duration: 200, easing: Easing.elastic(0.75) });
    iconOpacity.value = withTiming(0, { duration: 400 });

    scale.value = 1.175;
  }, [maxWidth, onSlideComplete, outerScale, scale, width, iconOpacity]);

  const panGesture = useMemo(
    () =>
      gestureActive && !disabled
        ? Gesture.Pan()
            .onChange((event) => {
              if (event.changeX > 0) {
                if (width.value + event.changeX >= maxWidth * 0.6) {
                  runOnJS(handleGestureComplete)();
                  return;
                } else if (width.value + event.changeX < maxWidth * 0.6) {
                  width.value = width.value + event.changeX;
                }
              }
            })
            .onTouchesDown(() => {
              scale.value = 1.175;
              outerScale.value = withSpring(1.05, { damping: 15, stiffness: 100 });
              runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
            })
            .onTouchesUp(() => {
              if (width.value < maxWidth * 0.575) {
                scale.value = 1;
                outerScale.value = withSpring(1, { damping: 15, stiffness: 100 });
                width.value = withSpring(64, { damping: 15, stiffness: 100 });
                runOnJS(Haptics.notificationAsync)(Haptics.NotificationFeedbackType.Success);
              }
            })
            .onEnd(() => {
              if (width.value >= maxWidth * 0.575) {
                runOnJS(handleGestureComplete)();
              }
            })
        : Gesture.Pan().onTouchesDown(() => {
            if (!loading) {
              outerX.value = withSequence(
                withTiming(-12, { duration: 75 }),
                withTiming(12, { duration: 75 }),
                withTiming(0, { duration: 75 }),
              );
              runOnJS(Haptics.notificationAsync)(Haptics.NotificationFeedbackType.Error);
              runOnJS(setNotification)({ default: notification });
              return;
            }
          }),
    [
      gestureActive,
      disabled,
      width,
      maxWidth,
      handleGestureComplete,
      scale,
      outerScale,
      loading,
      outerX,
      setNotification,
      notification,
    ],
  );

  useMemo(() => {
    if (reset) {
      resetSlider();
    }

    if (!disabled) {
      arrowBobLoop();
    }
  }, [reset, resetSlider, disabled, arrowBobLoop]);

  return (
    <Animated.View style={outerStyle}>
      <SlideContainer
        onLayout={(event) => {
          setMaxWidth(event.nativeEvent.layout.width);
        }}
        colors={['#434343', '#303030']}
      >
        {loading && (
          <LoadingIndicatorContainer>
            <LoadingIndicator size={LoaderIndicatorSizes.md} />
          </LoadingIndicatorContainer>
        )}
        <SlideText style={{ color: disabled ? theme?.textLightGray : theme?.text }}>
          {disabled ? 'Disabled' : 'Slide to continue'}
        </SlideText>
        <GestureDetector gesture={panGesture}>
          <SlideButton style={[slideWidthStyle, buttonEnabledStyle]}>
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
              {!loading && (
                <>
                  {disabled ? (
                    <Cancel width={32} height={32} fill={theme?.textSubtle} />
                  ) : (
                    <Animated.View style={iconBobStyle}>
                      <ArrowSlim width={48} height={48} fill={theme?.background} />
                    </Animated.View>
                  )}
                </>
              )}
            </View>
          </SlideButton>
        </GestureDetector>
      </SlideContainer>
    </Animated.View>
  );
};
