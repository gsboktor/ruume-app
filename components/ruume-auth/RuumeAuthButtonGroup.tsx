import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import { BaseText, HapticPressable } from '@Ruume/ui';

import { ImpactFeedbackStyle } from 'expo-haptics';
import styled from 'styled-components/native';

const ButtonGroupContainer = styled(KeyboardAvoidingView)`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 70px;
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

export type RuumeAuthButtonGroupProps = {
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading?: boolean;
  label: string;
  offset?: number;
};

export const RuumeAuthButtonGroup = ({ handleSubmit, isLoading, label, offset }: RuumeAuthButtonGroupProps) => {
  return (
    <ButtonGroupContainer behavior="padding" keyboardVerticalOffset={offset}>
      <HapticPressable
        style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}
        onPress={handleSubmit}
        hapticWeight={ImpactFeedbackStyle.Heavy}
      >
        <ActiveButtonContainer>
          <BaseText type="stylized" style={{ fontSize: 32, height: 'auto' }}>
            {isLoading ? 'Loading...' : label}
          </BaseText>
        </ActiveButtonContainer>
      </HapticPressable>
    </ButtonGroupContainer>
  );
};
