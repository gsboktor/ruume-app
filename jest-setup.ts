/* eslint-disable simpleImportSort/imports */
import { mockHaptics, mockReanimated, mockSafeArea } from '@Ruume/__mocks__';
import '@testing-library/react-native/extend-expect';

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

import 'react-native-reanimated';
import { setUpTests } from 'react-native-reanimated';
import 'styled-components';

setUpTests();
