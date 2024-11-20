/* eslint-disable simpleImportSort/imports */
import { mockHaptics, mockLinearGradient, mockReanimated, mockSafeArea } from '@Ruume/__mocks__';
import { setUpTests } from 'react-native-reanimated';

import '@testing-library/react-native/extend-expect';
import 'react-native-gesture-handler/jest-utils';
import 'react-native-gesture-handler/jestSetup';
import 'react-native-reanimated';
import 'styled-components';

jest.mock('expo-haptics', () => ({
  ...mockHaptics,
}));

jest.mock('react-native-reanimated', () => ({
  ...jest.requireActual('react-native-reanimated/mock'),
  ...mockReanimated,
}));

jest.mock('react-native-safe-area-context', () => ({
  ...mockSafeArea,
}));

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  useTheme: jest.fn(),
}));

jest.mock('expo-linear-gradient', () => ({
  ...mockLinearGradient,
}));

setUpTests();
