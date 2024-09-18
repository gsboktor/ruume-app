import React from 'react';
import { Pressable } from 'react-native';

export type BaseButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
};
export const BaseButton = ({ onPress, children }: BaseButtonProps) => {
  return <Pressable onPress={onPress}>{children}</Pressable>;
};
