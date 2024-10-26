import React, { useCallback, useRef, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { BaseText } from './BaseText';

import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import styled, { useTheme } from 'styled-components/native';

export type FormFieldProps = {
  Icon?: React.ElementType;
  validationMessage?: string;
  placeholder?: string;
  inputMode?: TextInputProps['inputMode'];
  onBlur?: () => void;
  onFocus?: () => void;
  header?: string;
  style?: TextInputProps['style'];
  placeholderTextColor?: string;
  testID?: string;
} & TextInputProps;

const FormFieldMainContent = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: '100%';
  gap: 8px;
`;

const FormFieldContainer = styled(View)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

const FormFieldHeader = styled(BaseText)`
  font-size: 14px;
  color: ${({ theme }) => theme?.text};
  text-align: start;
  padding-left: 16px;
`;

const FormInputWrapper = styled(LinearGradient)`
  display: flex;
  flex-direction: row;
  flex: 3;
  border-radius: 20px;
  gap: 8px;
  padding: 16px;
`;

export const FormField = ({
  testID: id,
  Icon,
  validationMessage,
  placeholder,
  inputMode = 'text',
  header,
  onBlur,
  onFocus,
  style,
  placeholderTextColor,
  ...rest
}: FormFieldProps) => {
  const theme = useTheme();
  const inputRef = useRef<TextInput>(null);

  const [iconColor, setIconColor] = useState(theme?.textLightGray);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleBlur = useCallback(() => {
    scale.value = withTiming(1, { duration: 300, easing: Easing.elastic(1.2) });

    setIconColor(theme?.textLightGray);
    onBlur?.();
  }, [theme?.textLightGray, scale, onBlur]);

  const handleFocus = useCallback(() => {
    Haptics.selectionAsync();
    scale.value = withTiming(1.2, { duration: 400, easing: Easing.elastic(1.2) });

    setIconColor(theme?.text);
    onFocus?.();
  }, [theme?.text, scale, onFocus]);

  return (
    <FormFieldContainer>
      {header && <FormFieldHeader>{header}</FormFieldHeader>}
      <FormFieldMainContent>
        <FormInputWrapper colors={['#434343', '#303030']} onTouchStart={() => inputRef.current?.focus()}>
          {Icon && (
            <Animated.View testID="form-field-icon" style={animatedStyle}>
              <Icon width={24} height={24} fill={iconColor} />
            </Animated.View>
          )}
          <TextInput
            testID={id}
            placeholder={placeholder}
            inputMode={inputMode}
            onBlur={handleBlur}
            onFocus={handleFocus}
            ref={inputRef}
            style={style}
            placeholderTextColor={placeholderTextColor}
            {...rest}
          />
        </FormInputWrapper>
      </FormFieldMainContent>

      {validationMessage && (
        <BaseText style={{ color: theme?.text, fontSize: 12, alignSelf: 'flex-end' }}>{validationMessage}</BaseText>
      )}
    </FormFieldContainer>
  );
};
