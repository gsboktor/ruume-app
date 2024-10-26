import React, { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { Keyboard, View } from 'react-native';

import InfoIcon from '@Ruume/assets/icons/info_circle.svg';
import { RuumeAuthDisclaimer } from '@Ruume/components/ruume-auth';
import { RuumeAuthButtonGroup } from '@Ruume/components/ruume-auth/RuumeAuthButtonGroup';
import { SignUpForm } from '@Ruume/components/ruume-sign-up';
import { useSignUpByPhone } from '@Ruume/hooks';
import { notificationAtom } from '@Ruume/store';
import { phoneNumberAtom } from '@Ruume/store/auth';
import { composeErrorMessage } from '@Ruume/utils/formatters';
import { RuumeSignUpSchema } from '@Ruume/utils/schema';
import { vh } from '@Ruume/utils/viewport';

import { router } from 'expo-router';
import { useSetAtom } from 'jotai';
import styled, { useTheme } from 'styled-components';

const AuthPageContainer = styled(View)`
  display: flex;
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme?.background};
  justify-content: space-between;
`;

export default function RuumeSignUpPage() {
  const theme = useTheme();

  const {
    mutate: signUpUser,
    isPending: signUpUserLoading,
    data: signUpUserResponse,
    error: signUpUserError,
  } = useSignUpByPhone();

  const setPhoneNumber = useSetAtom(phoneNumberAtom);
  const setNotification = useSetAtom(notificationAtom);

  const { handleSubmit } = useFormContext<RuumeSignUpSchema>();

  const onSubmit: SubmitHandler<RuumeSignUpSchema> = (data) => {
    Keyboard.dismiss();
    signUpUser(data);
  };

  const onError: SubmitErrorHandler<RuumeSignUpSchema> = (errors) => {
    Keyboard.dismiss();
    setNotification({
      default: {
        visible: true,
        message: 'Please check all fields',
        messageContent: composeErrorMessage(errors),
      },
    });
  };

  useEffect(() => {
    if (signUpUserResponse?.user) {
      setPhoneNumber(signUpUserResponse.user.phone ?? '');
      router.push('/(auth)/ruume-otp-page');
    }

    if (signUpUserError) {
      setNotification({
        default: {
          visible: true,
          message: 'We encountered an issue',
          messageContent: signUpUserError.message,
        },
      });
    }
  }, [setNotification, setPhoneNumber, signUpUserError, signUpUserResponse?.user]);

  return (
    <AuthPageContainer>
      <SignUpForm />
      <RuumeAuthButtonGroup
        label={'Sign up'}
        handleSubmit={handleSubmit(onSubmit, onError)}
        isLoading={signUpUserLoading}
        offset={vh * 17.5}
      />
      <RuumeAuthDisclaimer
        primaryText="Signing up with a phone number will require a verification code."
        actionLabel="Learn More"
        // TODO: Add action
        onActionPress={() => {}}
        leftIcon={<InfoIcon width={14} height={14} fill={theme?.textLightGray} />}
      />
    </AuthPageContainer>
  );
}
