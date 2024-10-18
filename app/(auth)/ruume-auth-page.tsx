import React, { useState } from 'react';
import { View } from 'react-native';

import { RuumeAuthDisclaimer } from '@Ruume/components/ruume-auth';
import { SignInForm, SignUpForm } from '@Ruume/components/ruume-auth/forms';
import RuumeAuthButtonGroup from '@Ruume/components/ruume-auth/RuumeAuthButtonGroup';
import RuumeAuthForm from '@Ruume/components/ruume-auth/RuumeAuthForm';
import RuumeAuthHeader from '@Ruume/components/ruume-auth/RuumeAuthHeader';
import { useAuthFormByType } from '@Ruume/hooks';
import { FormProvider } from '@Ruume/providers';

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

const formTypeToComponent = {
  signUp: SignUpForm,
  signIn: SignInForm,
};

export default function RuumeAuthPage() {
  const [formType, setFormType] = useState<'signUp' | 'signIn'>('signUp');

  const FormComponent = formTypeToComponent[formType];

  const methods = useAuthFormByType(formType);

  return (
    <FormProvider {...methods}>
      <AuthPageContainer>
        <AuthFormAndHeaderGroupContainer>
          <RuumeAuthHeader />
          <RuumeAuthForm RenderForm={FormComponent} />
        </AuthFormAndHeaderGroupContainer>
        <RuumeAuthButtonGroup formType={formType} setFormType={setFormType} />
        <RuumeAuthDisclaimer />
      </AuthPageContainer>
    </FormProvider>
  );
}
