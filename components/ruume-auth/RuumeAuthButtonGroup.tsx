import React, { useContext } from 'react';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { KeyboardAvoidingView, useWindowDimensions, View } from 'react-native';

import { RuumeSignUpSchema } from '@Ruume/utils/schema';

import { BaseText, HapticPressable } from '../shared';

import { ImpactFeedbackStyle } from 'expo-haptics';
import styled, { ThemeContext } from 'styled-components/native';

const ButtonGroupContainer = styled(KeyboardAvoidingView)`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 16px;
`;

const ActiveButtonContainer = styled(View)`
  background-color: ${({ theme }) => theme?.lightBackground};
  border-radius: 25px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default function RuumeAuthButtonGroup() {
  const theme = useContext(ThemeContext);
  const screenHeight = useWindowDimensions().height;

  const { handleSubmit } = useFormContext<RuumeSignUpSchema>();
  const onSubmit: SubmitHandler<RuumeSignUpSchema> = (data) => {
    console.log('Form submitted:', JSON.stringify(data));
  };

  const onError: SubmitErrorHandler<RuumeSignUpSchema> = (errors) => {
    console.log('Form errors:', JSON.stringify(errors));
  };

  const handleFormSubmit = handleSubmit(onSubmit, onError);

  return (
    <ButtonGroupContainer behavior="padding" keyboardVerticalOffset={screenHeight * 0.075}>
      <HapticPressable style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={handleFormSubmit}>
        <BaseText style={{ color: theme?.text, fontSize: 20 }}>Sign in</BaseText>
      </HapticPressable>
      <HapticPressable
        style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}
        onPress={handleFormSubmit}
        hapticWeight={ImpactFeedbackStyle.Heavy}
      >
        <ActiveButtonContainer>
          <BaseText type="stylized" style={{ fontSize: 32, height: 'auto' }}>
            Sign Up
          </BaseText>
        </ActiveButtonContainer>
      </HapticPressable>
    </ButtonGroupContainer>
  );
}
