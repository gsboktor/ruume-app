import React, { useEffect } from 'react';
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { Keyboard, View } from 'react-native';

import { RuumeAuthDisclaimer } from '@Ruume/components/ruume-auth';
import { SignInForm } from '@Ruume/components/ruume-auth/forms';
import { RuumeAuthButtonGroup } from '@Ruume/components/ruume-auth/RuumeAuthButtonGroup';
import { RuumeFormSwitcher } from '@Ruume/components/ruume-auth/RuumeFormSwitcher';
import { useSignInByPhone } from '@Ruume/hooks';
import { notificationAtom } from '@Ruume/store';
import { RuumeSignInSchema } from '@Ruume/utils/schema';

import { useSetAtom } from 'jotai';
import styled from 'styled-components';

const AuthPageContainer = styled(View)`
  display: flex;
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme?.background};
  justify-content: space-between;
`;

export default function RuumeSignInPage() {
  const setNotification = useSetAtom(notificationAtom);
  const { mutate: signInUser, isPending: signInUserLoading, error: signInUserError } = useSignInByPhone();

  useEffect(() => {
    if (signInUserError) {
      setNotification({
        default: {
          visible: true,
          message: 'We encountered an issue',
          messageContent: signInUserError.message,
        },
      });
    }
  }, [setNotification, signInUserError]);

  const { handleSubmit } = useFormContext<RuumeSignInSchema>();

  const composeErrorMessage = (errors: FieldErrors<RuumeSignInSchema>) => {
    return Object.values(errors)
      .map((error) => error.message)
      .join('\n');
  };

  const onSubmit: SubmitHandler<RuumeSignInSchema> = (data) => {
    console.log('Form submitted:', JSON.stringify(data));
    Keyboard.dismiss();

    signInUser(data);
  };

  const onError: SubmitErrorHandler<RuumeSignInSchema> = (errors) => {
    console.log('Form errors:', JSON.stringify(errors));
    setNotification({
      default: {
        visible: true,
        message: 'Sign in problem',
        messageContent: composeErrorMessage(errors),
      },
    });
  };

  const handleFormSubmit = handleSubmit(onSubmit, onError);

  return (
    <AuthPageContainer>
      <SignInForm />
      <RuumeFormSwitcher
        primaryLabel="Don't have an account?"
        secondaryLabel="Sign up"
        href="/(auth)/ruume-sign-up-page"
      />
      <RuumeAuthButtonGroup label={'Sign in'} handleSubmit={handleFormSubmit} isLoading={signInUserLoading} />
      <RuumeAuthDisclaimer />
    </AuthPageContainer>
  );
}
