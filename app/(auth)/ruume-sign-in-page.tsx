import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { Keyboard, View } from 'react-native';

import InfoIcon from '@Ruume/assets/icons/info_circle.svg';
import { RuumeAuthDisclaimer } from '@Ruume/components/ruume-auth';
import { RuumeAuthButtonGroup } from '@Ruume/components/ruume-auth/RuumeAuthButtonGroup';
import { SignInForm } from '@Ruume/components/ruume-sign-in';
import { useSignInByPhone } from '@Ruume/hooks';
import { notificationAtom } from '@Ruume/store';
import { composeErrorMessage } from '@Ruume/utils/formatters';
import { RuumeSignInSchema } from '@Ruume/utils/schema';
import { vh } from '@Ruume/utils/viewport';

import { useSetAtom } from 'jotai';
import styled, { useTheme } from 'styled-components/native';

const AuthPageContainer = styled(View)`
  display: flex;
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme?.background};
  justify-content: space-between;
`;

export default function RuumeSignInPage() {
  const theme = useTheme();

  const { mutate: signInUser, isPending: signInUserLoading } = useSignInByPhone();

  const setNotification = useSetAtom(notificationAtom);

  const { handleSubmit } = useFormContext<RuumeSignInSchema>();

  const onSubmit: SubmitHandler<RuumeSignInSchema> = (data) => {
    Keyboard.dismiss();
    signInUser(data);
  };

  const onError: SubmitErrorHandler<RuumeSignInSchema> = (errors) => {
    setNotification({
      default: {
        visible: true,
        message: 'Please check all fields',
        messageContent: composeErrorMessage(errors),
      },
    });
  };

  return (
    <AuthPageContainer>
      <SignInForm />
      <RuumeAuthButtonGroup
        label={'Sign in'}
        handleSubmit={handleSubmit(onSubmit, onError)}
        isLoading={signInUserLoading}
        offset={vh * 16}
      />
      <RuumeAuthDisclaimer
        primaryText="Signing up with a phone number will require a verification code."
        actionLabel="Learn More"
        onActionPress={() => {}}
        leftIcon={<InfoIcon width={16} height={16} fill={theme?.textLightGray} />}
      />
    </AuthPageContainer>
  );
}
