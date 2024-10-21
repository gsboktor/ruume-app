import React from 'react';
import { View } from 'react-native';

import { BaseText, HapticPressable } from '@Ruume/ui';

import { ImpactFeedbackStyle } from 'expo-haptics';
import styled, { useTheme } from 'styled-components/native';

const DisclaimerContainer = styled(View)`
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

type AuthDisclaimerProps =
  | {
      primaryText: string;
      actionLabel?: null;
      onActionPress?: null;
      leftIcon?: null;
    }
  | {
      primaryText: string;
      actionLabel: string;
      onActionPress?: () => void;
      leftIcon?: React.ReactNode;
    };

//TODO: Add a link for the disclaimer learn more
export const RuumeAuthDisclaimer = ({ primaryText, actionLabel, onActionPress, leftIcon }: AuthDisclaimerProps) => {
  const theme = useTheme();

  return (
    <DisclaimerContainer>
      <BaseText style={{ fontSize: 14, color: theme?.textLightGray, textAlign: 'center' }}>{primaryText}</BaseText>
      {actionLabel && (
        <HapticPressable
          style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
          onPress={onActionPress}
          hapticWeight={ImpactFeedbackStyle.Light}
        >
          {leftIcon}
          <BaseText
            style={{
              fontSize: 12,
              color: theme?.textLightGray,
              textAlign: 'center',
              textDecorationLine: 'underline',
            }}
          >
            {actionLabel}
          </BaseText>
        </HapticPressable>
      )}
    </DisclaimerContainer>
  );
};
