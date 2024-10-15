import React from 'react';
import { View } from 'react-native';

import RuumeAuthButtonGroup from '@Ruume/components/ruume-auth/RuumeAuthButtonGroup';
import RuumeAuthForm from '@Ruume/components/ruume-auth/RuumeAuthForm';
import RuumeAuthHeader from '@Ruume/components/ruume-auth/RuumeAuthHeader';

import styled from 'styled-components';

const AuthPageContainer = styled(View)`
  display: flex;
  flex: 1;
  padding: 16px;
  gap: 48px;
  background-color: ${({ theme }) => theme.background};
`;

export default function RuumeAuthPage() {
  return (
    <AuthPageContainer>
      <RuumeAuthHeader />
      <RuumeAuthForm />
      <RuumeAuthButtonGroup />
    </AuthPageContainer>
  );
}
