import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { RuumeAuthDisclaimer } from '@Ruume/components/ruume-auth';
import RuumeAuthButtonGroup from '@Ruume/components/ruume-auth/RuumeAuthButtonGroup';
import RuumeAuthForm from '@Ruume/components/ruume-auth/RuumeAuthForm';
import RuumeAuthHeader from '@Ruume/components/ruume-auth/RuumeAuthHeader';
import { FormProvider } from '@Ruume/providers';
import { RuumeSignUpSchema, ruumeSignUpSchema } from '@Ruume/utils/schema';

import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';

const AuthPageContainer = styled(View)`
  display: flex;
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme?.background};
  justify-content: space-between;
`;

const AuthFormAndHeaderGroupContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default function RuumeAuthPage() {
  const methods = useForm<RuumeSignUpSchema>({
    resolver: yupResolver<RuumeSignUpSchema>(ruumeSignUpSchema),
    defaultValues: {
      phoneNumber: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <AuthPageContainer>
        <AuthFormAndHeaderGroupContainer>
          <RuumeAuthHeader />
          <RuumeAuthForm />
        </AuthFormAndHeaderGroupContainer>
        <RuumeAuthButtonGroup />
        <RuumeAuthDisclaimer />
      </AuthPageContainer>
    </FormProvider>
  );
}
