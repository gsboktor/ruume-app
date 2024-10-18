import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { BaseText } from './BaseText';

import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export type FormFieldProps = {
  icon?: React.ReactNode;
  validationMessage?: string;
  placeholder?: string;
  inputMode?: TextInputProps['inputMode'];
  onBlur?: () => void;
  onFocus?: () => void;
  style?: TextInputProps['style'];
  placeholderTextColor?: string;
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

const FormInputWrapper = styled(LinearGradient)`
  display: flex;
  flex: 3;
  border-radius: 40px;
  padding: 16px;
`;

export const FormField = ({
  icon,
  validationMessage,
  placeholder,
  inputMode = 'text',
  onBlur,
  onFocus,
  style,
  placeholderTextColor,
  ...rest
}: FormFieldProps) => {
  return (
    <FormFieldContainer>
      <FormFieldMainContent>
        {icon && icon}
        <FormInputWrapper colors={['#434343', '#303030']}>
          <TextInput
            placeholder={placeholder}
            inputMode={inputMode}
            onBlur={onBlur}
            onFocus={onFocus}
            style={style}
            placeholderTextColor={placeholderTextColor}
            {...rest}
          />
        </FormInputWrapper>
      </FormFieldMainContent>

      {validationMessage && (
        <BaseText style={{ color: 'white', fontSize: 12, alignSelf: 'flex-end' }}>{validationMessage}</BaseText>
      )}
    </FormFieldContainer>
  );
};
