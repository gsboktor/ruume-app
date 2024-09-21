import React from 'react';
import { type TextProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';

import styled from 'styled-components/native';

export type BaseTextProps = AnimatedProps<TextProps> & {
  type?: 'default' | 'light' | 'extraLight' | 'bold' | 'semiBold' | 'thin';
};

const fontFamily = {
  default: 'DMSans',
  light: 'DMSansLight',
  extraLight: 'DMSansExtraLight',
  bold: 'DMSansBold',
  semiBold: 'DMSansSemiBold',
  thin: 'DMSansThin',
};

const BaseTextStyle = styled(Animated.Text)<{ type: BaseTextProps['type'] }>`
  font-family: ${({ type }) => fontFamily[type as keyof typeof fontFamily]};
`;

export const BaseText = ({ type = 'default', ...rest }: BaseTextProps) => {
  return <BaseTextStyle type={type} {...rest} />;
};
