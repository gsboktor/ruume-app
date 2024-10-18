import React, { useEffect } from 'react';
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { Keyboard, View } from 'react-native';

import { RuumeAuthDisclaimer, RuumeFormSwitcher } from '@Ruume/components/ruume-auth';
import { SignUpForm } from '@Ruume/components/ruume-auth/forms';
import { RuumeAuthButtonGroup } from '@Ruume/components/ruume-auth/RuumeAuthButtonGroup';
import { useSignUpByPhone } from '@Ruume/hooks';
import { notificationAtom } from '@Ruume/store';
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
  const setNotification = useSetAtom(notificationAtom);
  const {
    mutate: signUpUser,
    isPending: signUpUserLoading,
    data: signUpUserResponse,
    error: signUpUserError,
  } = useSignUpByPhone();

  useEffect(() => {
    if (signUpUserResponse?.user) {
      router.replace('/(auth)/ruume-otp-page');
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

  const { handleSubmit } = useFormContext<RuumeSignUpSchema>();

  const composeErrorMessage = (errors: FieldErrors<RuumeSignUpSchema>) => {
    return Object.values(errors)
      .map((error) => error.message)
      .join('\n');
  };

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

  const handleFormSubmit = handleSubmit(onSubmit, onError);

  return (
    <AuthPageContainer>
      <SignUpForm />
      <RuumeFormSwitcher
        primaryLabel="Already have an account?"
        secondaryLabel="Sign in"
        href="/(auth)/ruume-sign-in-page"
      />
      <RuumeAuthButtonGroup label={'Sign up'} handleSubmit={handleFormSubmit} isLoading={signUpUserLoading} />
      <RuumeAuthDisclaimer />
    </AuthPageContainer>
  );
}
