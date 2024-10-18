import React from 'react';
import Animated from 'react-native-reanimated';

import styled from 'styled-components/native';

const FormContainer = styled(Animated.View)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function RuumeAuthForm({ RenderForm }: { RenderForm: React.FC }) {
  return (
    <FormContainer>
      <RenderForm />
    </FormContainer>
  );
}
