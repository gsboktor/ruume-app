import React from 'react';
import { View } from 'react-native';

import { LoaderIndicatorSizes } from '@Ruume/types/ui';
import { LoadingIndicator } from '@Ruume/ui';

import styled from 'styled-components/native';

const PageLoaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const PageLoader = () => {
  return (
    <PageLoaderContainer>
      <LoadingIndicator size={LoaderIndicatorSizes.lg} inverted />
    </PageLoaderContainer>
  );
};
