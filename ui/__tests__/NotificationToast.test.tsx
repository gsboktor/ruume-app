/* eslint-disable simpleImportSort/imports */
import { act } from '@testing-library/react-native';
import React from 'react';

import { notificationAtom } from '@Ruume/store';
import { renderWithProviders } from '@Ruume/utils/tests';
import { NotificationToast } from '../NotificationToast';

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
