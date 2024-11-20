/* eslint-disable indent */
import { useCallback, useEffect } from 'react';
import { Keyboard, KeyboardEventListener, KeyboardMetrics } from 'react-native';
import { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type KeyboardAvoidingStyleWorkletFn = (
  endCoordinates: SharedValue<KeyboardMetrics | null>,
  isVisible: SharedValue<boolean>,
) => ReturnType<typeof useAnimatedStyle>;

export const useKeyboardAvoiding = (
  initialOffset: number,
  offsetRatio: number = 1.05,
  animatedStyleWorkletFn?: KeyboardAvoidingStyleWorkletFn,
) => {
  const keyboardVisible = useSharedValue(false);
  const keyboardEndCoordinates = useSharedValue<KeyboardMetrics | null>(null);
  const edgeInsets = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    const kbHeight = keyboardEndCoordinates.value?.height ?? initialOffset;
    return animatedStyleWorkletFn
      ? animatedStyleWorkletFn(keyboardEndCoordinates, keyboardVisible)
      : {
          bottom: withTiming(keyboardVisible.value ? kbHeight * offsetRatio - edgeInsets.bottom : initialOffset),
        };
  }, [animatedStyleWorkletFn, keyboardEndCoordinates, keyboardVisible]);

  const handleKeyboardWillChangeFrame = useCallback<KeyboardEventListener>(
    ({ endCoordinates }) => {
      keyboardVisible.value = true;
      keyboardEndCoordinates.value = endCoordinates;
    },
    [keyboardEndCoordinates, keyboardVisible],
  );

  const handleKeyboardWillHide = useCallback<KeyboardEventListener>(
    ({ endCoordinates }) => {
      keyboardVisible.value = false;
      keyboardEndCoordinates.value = endCoordinates;
    },
    [keyboardEndCoordinates, keyboardVisible],
  );

  useEffect(() => {
    const emitter = Keyboard.addListener('keyboardWillChangeFrame', handleKeyboardWillChangeFrame);

    return () => emitter.remove();
  }, [handleKeyboardWillChangeFrame]);

  useEffect(() => {
    const emitter = Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide);

    return () => emitter.remove();
  }, [handleKeyboardWillHide]);

  return { keyboardVisible, keyboardEndCoordinates, animatedStyle };
};
