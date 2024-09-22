import React from 'react';
import { View } from 'react-native';

import { BaseText } from '@Ruume/components/shared';

export default function RuumeHome() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BaseText type="bold">Welcome to Ruume Home!</BaseText>
    </View>
  );
}
