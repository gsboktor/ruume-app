/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback } from 'react';
import { GestureResponderEvent, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

import * as Haptics from 'expo-haptics';
import { ImpactFeedbackStyle } from 'expo-haptics';

export type HapticPressableProps = PressableProps & {
  hapticWeight?: ImpactFeedbackStyle;
  style?: StyleProp<ViewStyle>;
};

export const HapticPressable = ({ children, onPress, hapticWeight, style }: HapticPressableProps) => {
  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      hapticWeight && Haptics.impactAsync(hapticWeight);
      onPress?.(e);
    },
    [onPress, hapticWeight],
  );

  return (
    <Pressable onPress={handlePress} style={style}>
      {children}
    </Pressable>
  );
};
