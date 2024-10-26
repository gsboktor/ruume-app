import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Colors } from '@Ruume/ui/colors';

import styled from 'styled-components/native';

const PageLoaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PageLoader = () => {
  return (
    <PageLoaderContainer>
      <ActivityIndicator testID="page-loader" size="large" color={Colors.white} />
    </PageLoaderContainer>
  );
};
