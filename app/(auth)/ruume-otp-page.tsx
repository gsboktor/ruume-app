import React, { useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput, View } from 'react-native';

import { RuumeAuthButtonGroup, RuumeAuthDisclaimer } from '@Ruume/components/ruume-auth';
import { RuumeOTPField } from '@Ruume/components/ruume-otp';
import { useRefArray } from '@Ruume/hooks';
import { useVerifyOTP } from '@Ruume/hooks/useVerifyOTP';
import { notificationAtom, signUpFormAtom } from '@Ruume/store';
import { BaseText } from '@Ruume/ui';
import { vh, vw } from '@Ruume/utils/viewport';

import { router } from 'expo-router';
import { useAtomValue, useSetAtom } from 'jotai';
import styled, { useTheme } from 'styled-components';

const OTP_LENGTH = 6;

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

  const setNotification = useSetAtom(notificationAtom);
  const signUpDetails = useAtomValue(signUpFormAtom);

  const { mutate: verifyOTP, isPending: verifyOTPLoading, error: verifyOTPError, data: verifyOTPData } = useVerifyOTP();

  const handleSubmit = useCallback(async () => {
    const phoneNumber = signUpDetails.phoneNumber;
    if (!phoneNumber) {
      router.replace('/(auth)/ruume-sign-up-page');
      setNotification({
        default: {
          visible: true,
          message: 'Please sign in again',
          messageContent: 'Please sign in again to continue.',
        },
      });
      return;
    }
    const code = otpDigitsValue.current.join('');

    if (!code || code.length !== OTP_LENGTH) {
      setNotification({
        default: {
          visible: true,
          message: 'Please check your code',
          messageContent: 'Your code is incomplete or incorrect.',
        },
      });
      return;
    }

    await verifyOTP({ phoneNumber: phoneNumber, code });
  }, [otpDigitsValue, setNotification, signUpDetails.phoneNumber, verifyOTP]);

  useEffect(() => {
    if (verifyOTPData?.session && verifyOTPData?.session?.user) {
      router.replace('/(tabs)/ruume-home');
    }

    if (verifyOTPError) {
      setNotification({
        default: {
          visible: true,
          message: 'Issue verifying your code',
          messageContent: 'There was an issue verifying your code. Please double check your one-time passcode.',
        },
      });
    }
  }, [setNotification, verifyOTPData, verifyOTPError]);

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
