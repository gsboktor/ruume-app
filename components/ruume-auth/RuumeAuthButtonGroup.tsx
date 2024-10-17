import React, { useContext } from 'react';
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { notificationAtom } from '@Ruume/store';
import { RuumeSignUpSchema } from '@Ruume/utils/schema';

import { BaseText, HapticPressable } from '../shared';

import { ImpactFeedbackStyle } from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useSetAtom } from 'jotai';
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
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const setNotification = useSetAtom(notificationAtom);

  const { handleSubmit } = useFormContext<RuumeSignUpSchema>();

  const composeErrorMessage = (errors: FieldErrors<RuumeSignUpSchema>) => {
    return Object.values(errors)
      .map((error) => error.message)
      .join('\n');
  };

  const onSubmit: SubmitHandler<RuumeSignUpSchema> = (data) => {
    console.log('Form submitted:', JSON.stringify(data));
    Keyboard.dismiss();
    router.replace('/(tabs)/ruume-home');
  };

  const onError: SubmitErrorHandler<RuumeSignUpSchema> = (errors) => {
    console.log('Form errors:', JSON.stringify(errors));
    setNotification({
      default: {
        visible: true,
        message: 'Sign up issue',
        messageContent: composeErrorMessage(errors),
      },
    });
  };

  const handleFormSubmit = handleSubmit(onSubmit, onError);

  return (
    <ButtonGroupContainer behavior="padding" keyboardVerticalOffset={insets.top * 1.25}>
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
