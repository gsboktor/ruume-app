import React from 'react';
import { View } from 'react-native';

import { LoaderIndicatorSizes } from '@Ruume/types/ui';
import { LoadingIndicator } from '@Ruume/ui';

import styled from 'styled-components/native';

const PageLoaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PageLoader = () => {
  return (
    <PageLoaderContainer>
      <LoadingIndicator size={LoaderIndicatorSizes.lg} />
    </PageLoaderContainer>
  );
};
