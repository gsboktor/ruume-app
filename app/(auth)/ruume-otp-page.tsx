import React, { useCallback } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput, View } from 'react-native';

import { RuumeAuthButtonGroup, RuumeAuthDisclaimer } from '@Ruume/components/ruume-auth';
import { RuumeOTPField } from '@Ruume/components/ruume-otp';
import { useRefArray, useVerifyOTP } from '@Ruume/hooks';
import { BaseText } from '@Ruume/ui';
import { vh, vw } from '@Ruume/utils/viewport';

import styled, { useTheme } from 'styled-components';

const RuumeOTPPageContainer = styled(ScrollView)`
  padding: 16px;
  background-color: ${({ theme }) => theme?.background};
`;

const RuumeOTPMainContainer = styled(KeyboardAvoidingView)`
  flex: 2.5;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding-top: ${vh * 8}px;
`;

const RuumeOTPInputs = styled(View)`
  width: ${vw * 85}px;
`;

const RuumeOTPFooterContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

export default function RuumeOTPPage() {
  const theme = useTheme();

  const digitRefs = useRefArray<TextInput>();
  const otpDigitsValue = useRefArray<string>();

  const { mutate: verifyOTP, isPending: verifyOTPLoading } = useVerifyOTP();

  const handleSubmit = useCallback(async () => {
    await verifyOTP({ code: otpDigitsValue.current.join('') });
  }, [otpDigitsValue, verifyOTP]);

  return (
    <RuumeOTPPageContainer keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
      <RuumeOTPMainContainer behavior="padding">
        <BaseText style={{ fontSize: 38, color: theme?.text }}>Enter your code</BaseText>
        <RuumeOTPInputs>
          <RuumeOTPField digitRefs={digitRefs} otpDigitsValue={otpDigitsValue} />
        </RuumeOTPInputs>
        <RuumeAuthDisclaimer primaryText="Check your messages for a passcode from Ruume." />
      </RuumeOTPMainContainer>
      <RuumeOTPFooterContainer>
        <RuumeAuthDisclaimer primaryText="Not seeing your code?" actionLabel="Resend code" onActionPress={() => {}} />
      </RuumeOTPFooterContainer>
      <RuumeAuthButtonGroup
        handleSubmit={handleSubmit}
        label="Verify Code"
        offset={vh * 20}
        isLoading={verifyOTPLoading}
      />
    </RuumeOTPPageContainer>
  );
}
