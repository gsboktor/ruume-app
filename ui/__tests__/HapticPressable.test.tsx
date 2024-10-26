/* eslint-disable simpleImportSort/imports */
import { renderWithProviders } from '@Ruume/utils/tests';
import { fireEvent } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { ImpactFeedbackStyle } from 'expo-haptics';
import React from 'react';
import { Text } from 'react-native';
import { HapticPressable } from '../HapticPressable';

test('HapticPressable triggers onPress and with feedback', () => {
  const onPressMock = jest.fn();

  const { getByText } = renderWithProviders(
    <HapticPressable onPress={onPressMock} hapticWeight={ImpactFeedbackStyle.Light}>
      <Text>Press me</Text>
    </HapticPressable>,
    {},
  );

  fireEvent.press(getByText('Press me'));

  expect(onPressMock).toHaveBeenCalled();
  expect(Haptics.impactAsync).toHaveBeenCalledWith(ImpactFeedbackStyle.Light);
});
