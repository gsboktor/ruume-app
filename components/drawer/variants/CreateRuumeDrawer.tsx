import React from 'react';
import { View } from 'react-native';

import { BaseText } from '@Ruume/ui';

import { useTheme } from 'styled-components';

export const CreateRuumeDrawer = () => {
  const theme = useTheme();
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <BaseText style={{ fontSize: 24, fontWeight: 'bold', color: theme?.text }}>Create Ruume</BaseText>
    </View>
  );
};
