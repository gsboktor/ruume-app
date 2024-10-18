import React, { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { Keyboard, View } from 'react-native';

import { RuumeAuthDisclaimer, RuumeFormSwitcher } from '@Ruume/components/ruume-auth';
import { SignUpForm } from '@Ruume/components/ruume-auth/forms';
import { RuumeAuthButtonGroup } from '@Ruume/components/ruume-auth/RuumeAuthButtonGroup';
import { useSignUpByPhone } from '@Ruume/hooks';
import { notificationAtom } from '@Ruume/store';
import { FormType } from '@Ruume/types/forms';
import { composeErrorMessage } from '@Ruume/utils/formatters';
import { RuumeSignUpSchema } from '@Ruume/utils/schema';

import { router } from 'expo-router';
import { useSetAtom } from 'jotai';
import styled from 'styled-components';

const AuthPageContainer = styled(View)`
  display: flex;
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme?.background};
  justify-content: space-between;
`;

export default function RuumeSignUpPage() {
  const {
    mutate: signUpUser,
    isPending: signUpUserLoading,
    data: signUpUserResponse,
    error: signUpUserError,
  } = useSignUpByPhone();

  const setNotification = useSetAtom(notificationAtom);
  const { handleSubmit } = useFormContext<RuumeSignUpSchema>();

  useEffect(() => {
    if (signUpUserResponse?.user) {
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
  }, [setNotification, signUpUserError, signUpUserResponse?.user]);

  const onSubmit: SubmitHandler<RuumeSignUpSchema> = (data) => {
    console.log('Form submitted:', JSON.stringify(data));

    Keyboard.dismiss();
    signUpUser(data);
  };

  const onError: SubmitErrorHandler<RuumeSignUpSchema> = (errors) => {
    console.log('Form errors:', JSON.stringify(errors));

    Keyboard.dismiss();
    setNotification({
      default: {
        visible: true,
        message: 'Sign up problem',
        messageContent: composeErrorMessage(errors),
      },
    });
  };

  return (
    <AuthPageContainer>
      <SignUpForm />
      <RuumeFormSwitcher
        primaryLabel="Already have an account?"
        secondaryLabel="Sign in"
        formType={FormType.SIGN_IN}
        href="/(auth)/ruume-sign-in-page"
      />
      <RuumeAuthButtonGroup
        label={'Sign up'}
        handleSubmit={handleSubmit(onSubmit, onError)}
        isLoading={signUpUserLoading}
      />
      <RuumeAuthDisclaimer />
    </AuthPageContainer>
  );
}
