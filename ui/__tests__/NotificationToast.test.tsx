/* eslint-disable simpleImportSort/imports */
//
import { act } from '@testing-library/react-native';
import React from 'react';

import { notificationAtom } from '@Ruume/store';
import { renderWithProviders } from '@Ruume/utils/tests';
import { NotificationToast } from '../NotificationToast';

// jest.mock('expo-haptics', () => ({
//   impactAsync: jest.fn(),
//   ImpactFeedbackStyle: {
//     Medium: 'medium',
//     Heavy: 'heavy',
//   },
// }));

// jest.mock('react-native-reanimated', () => ({
//   ...jest.requireActual('react-native-reanimated/mock'),
//   useAnimatedStyle: () => ({}),
//   useSharedValue: (initial: number) => ({ value: initial }),
//   withSpring: jest.fn(),
//   withTiming: jest.fn(),
//   withSequence: jest.fn(),
//   runOnJS: (fn: () => void) => fn,
// }));

// jest.mock('react-native-safe-area-context', () => ({
//   useSafeAreaInsets: jest.fn(() => ({
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   })),
// }));

jest.mock('@Ruume/assets/icons/lightning.svg', () => 'LightningIcon');

describe('NotificationToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when notification is not visible', () => {
    const { queryByTestId } = renderWithProviders(<NotificationToast />, {
      initialAtomValues: [[notificationAtom, { default: { visible: false } }]],
    });

    expect(queryByTestId('notification-toast')).toBeNull();
  });

  it('should render when notification becomes visible', () => {
    const { getByTestId } = renderWithProviders(<NotificationToast />, {
      initialAtomValues: [[notificationAtom, { default: { visible: true } }]],
    });

    expect(getByTestId('notification-toast')).toBeTruthy();
  });

  it('should display the notification message and content', () => {
    const { getByText } = renderWithProviders(<NotificationToast />, {
      initialAtomValues: [
        [notificationAtom, { default: { visible: true, message: 'Test Message', messageContent: 'Test Content' } }],
      ],
    });

    expect(getByText('Test Message')).toBeTruthy();
  });

  //   it('should trigger haptic feedback on pan gesture', () => {
  //     const { getByTestId } = render(
  //       <ThemeProviderMock>
  //         <AtomProvider initialValues={[[notificationAtom, { default: { visible: true } }]]}>
  //           <NotificationToast />
  //         </AtomProvider>
  //       </ThemeProviderMock>,
  //     );

  //     const toast = getByTestId('notification-toast');
  //     fireEvent(toast, 'pressIn');

  //     expect(hapticsJestMock.impactAsync).toHaveBeenCalledWith(hapticsJestMock.ImpactFeedbackStyle.Heavy);
  //   });

  it('should auto-hide after 5 seconds', () => {
    jest.useFakeTimers();

    const { queryByTestId } = renderWithProviders(<NotificationToast />, {
      initialAtomValues: [[notificationAtom, { default: { visible: true } }]],
    });

    expect(queryByTestId('notification-toast')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    jest.useRealTimers();
  });
});
