import React from 'react';
import { View } from 'react-native';

import { BaseText, HapticPressable } from '../shared';

import { ImpactFeedbackStyle } from 'expo-haptics';
import styled, { useTheme } from 'styled-components/native';

const DisclaimerContainer = styled(View)`
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

//TODO: Add a link for the disclaimer learn more
export const RuumeAuthDisclaimer = () => {
  const theme = useTheme();

  return (
    <DisclaimerContainer>
      <BaseText style={{ fontSize: 14, color: theme?.textLightGray, textAlign: 'center' }}>
        Signing up with a phone number will require a verification code.
      </BaseText>
      <HapticPressable onPress={() => {}} hapticWeight={ImpactFeedbackStyle.Light}>
        <BaseText
          style={{
            fontSize: 12,
            color: theme?.textLightGray,
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}
        >
          Learn More
        </BaseText>
      </HapticPressable>
    </DisclaimerContainer>
  );
};
