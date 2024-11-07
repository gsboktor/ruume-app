import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useKeyboardAvoiding } from '@Ruume/hooks';
import { BaseText, HapticPressable, LoadingIndicator } from '@Ruume/ui';

import { ImpactFeedbackStyle } from 'expo-haptics';
import styled from 'styled-components/native';

const ButtonGroupContainer = styled(Animated.View)`
  display: flex;
  flex-direction: row;
  position: absolute;
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

export const RuumeAuthButtonGroup = ({ handleSubmit, isLoading, label }: RuumeAuthButtonGroupProps) => {
  const { animatedStyle } = useKeyboardAvoiding(70);
  return (
    <ButtonGroupContainer style={animatedStyle}>
      <HapticPressable
        style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}
        onPress={handleSubmit}
        hapticWeight={ImpactFeedbackStyle.Heavy}
      >
        <ActiveButtonContainer>
          <BaseText type="stylized" style={{ fontSize: 32, height: 'auto' }}>
            {isLoading ? <LoadingIndicator /> : label}
          </BaseText>
        </ActiveButtonContainer>
      </HapticPressable>
    </ButtonGroupContainer>
  );
};
