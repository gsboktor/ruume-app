import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, PanResponder, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LightningIcon from '@Ruume/assets/icons/lightning.svg';
import { notificationAtom } from '@Ruume/store';

import { BaseText } from './BaseText';

import * as Haptics from 'expo-haptics';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { useAtom } from 'jotai';
import styled from 'styled-components/native';

const NotificationToastContainer = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  z-index: 1000;
`;

const Toast = styled(Animated.View)`
  background-color: white;
  border-radius: 50px;
  padding: 28px;
  width: ${Dimensions.get('window').width * 0.95}px;
  align-items: center;
  justify-content: start;
  opacity: 0.95;
`;

const ToastContent = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 12px;
`;

const ToastContentHeader = styled(View)`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ToastContentMain = styled(View)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const ToastHandle = styled(View)`
  position: absolute;
  bottom: 8px;
  width: 64px;
  background-color: ${({ theme }) => theme.textLightGray};
  height: 6px;
  border-radius: 12px;
`;

export const NotificationToast = () => {
  const [notification, setNotification] = useAtom(notificationAtom);
  const [, setOpenMode] = useState(false);
  const openModeRef = useRef(false);
  const contentRef = useRef<View>(null);

  const insets = useSafeAreaInsets();

  const translateY = useSharedValue(-insets.top);
  const opacity = useSharedValue(0);
  const height = useSharedValue(Dimensions.get('window').height / 10);
  const scale = useSharedValue(0.9);

  const setRef = useCallback((val: boolean) => {
    openModeRef.current = val;
    setOpenMode(val);
  }, []);

  const handleOpenModeWithEffect = useCallback(() => {
    scale.value = withSequence(
      withTiming(1.075, { duration: 125, easing: Easing.elastic(1.1) }),
      withTiming(1, { duration: 100, easing: Easing.elastic(1.1) }, () => {
        runOnJS(Haptics.impactAsync)(ImpactFeedbackStyle.Medium);
        runOnJS(setRef)(true);
      }),
    );
  }, [scale, setRef]);

  const handleCloseAndCollapseEffect = useCallback(() => {
    scale.value = withSequence(
      withTiming(0.7, { duration: 125, easing: Easing.elastic(1.1) }),
      withTiming(0.9, { duration: 125, easing: Easing.elastic(1.1) }, () => {
        translateY.value = withSpring(-insets.top, { damping: 15, stiffness: 200 });
        opacity.value = withTiming(0, { duration: 200 }, (finished) => {
          if (finished) {
            runOnJS(setNotification)({
              default: {
                visible: false,
                message: '',
                messageContent: '',
              },
            });
            runOnJS(setRef)(false);
          }
        });
      }),
    );
  }, [insets.top, opacity, scale, setNotification, setRef, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        if (!openModeRef.current) {
          scale.value = withTiming(1, { duration: 100, easing: Easing.elastic(1.1) });
          runOnJS(Haptics.impactAsync)(ImpactFeedbackStyle.Heavy);
        }
      },
      onPanResponderRelease: () => {
        if (!openModeRef.current) {
          height.value = withSequence(
            withTiming(Dimensions.get('window').height / 10, { duration: 125, easing: Easing.linear }, () => {
              scale.value = withTiming(0.9, { duration: 125, easing: Easing.elastic(1.1) });
            }),
          );
          runOnJS(setRef)(false);
        }
      },
      onPanResponderMove: (_, gestureState) => {
        if (height.value >= 150 && !openModeRef.current) {
          handleOpenModeWithEffect();
        }
        if (gestureState.dy > 50 && !openModeRef.current) {
          if (height.value >= 150) {
            handleOpenModeWithEffect();
          } else {
            height.value = gestureState.dy;
          }
        }

        if (gestureState.dy < 0) {
          height.value = withTiming(Dimensions.get('window').height / 10, { duration: 125, easing: Easing.linear });
          handleCloseAndCollapseEffect();
        }
      },
    }),
  );

  useEffect(() => {
    if (notification.default.visible) {
      translateY.value = withSpring(insets.top, { damping: 15, stiffness: 200 });
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [notification.default.visible, translateY, opacity, insets.top]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const toastContentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    height: height.value,
  }));

  if (!notification.default.visible) {
    return null;
  }

  return (
    <NotificationToastContainer style={animatedStyle}>
      <Toast style={toastContentStyle} {...panResponder.current.panHandlers}>
        <ToastContent ref={contentRef}>
          <ToastContentHeader>
            <LightningIcon width={24} height={24} fill={'black'} style={{ flex: 1 }} />
            <BaseText
              numberOfLines={1}
              style={{
                fontSize: 22,
                height: '100%',
                flex: 3,
                textAlign: 'center',
                marginRight: 24,
              }}
            >
              {notification.default.message}
            </BaseText>
          </ToastContentHeader>
          {openModeRef.current && (
            <ToastContentMain>
              <BaseText style={{ fontSize: 16 }}>{notification.default.messageContent}</BaseText>
            </ToastContentMain>
          )}
        </ToastContent>
        <ToastHandle />
      </Toast>
    </NotificationToastContainer>
  );
};
