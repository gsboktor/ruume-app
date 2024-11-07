import React from 'react';
import { State } from 'react-native-gesture-handler';
import { fireGestureHandler, getByGestureTestId } from 'react-native-gesture-handler/jest-utils';

import { notificationAtom } from '@Ruume/store';
import { NotificationType } from '@Ruume/types/store';
import { renderWithProviders } from '@Ruume/utils/tests';

import { act } from '@testing-library/react-native';

import { ContinueSlider } from '../ContinueSlider';

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

jest.mock('@Ruume/assets/icons/cancel.svg', () => 'CancelIcon');
jest.mock('@Ruume/assets/icons/arrow_slim.svg', () => 'ArrowSlimIcon');

describe('ContinueSlider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the slider in a disabled state', () => {
    const { getByTestId } = renderWithProviders(
      <ContinueSlider onSlideComplete={() => {}} reset={false} notification={{} as NotificationType} disabled={true} />,
      {},
    );

    expect(getByTestId('cancel-icon')).toBeVisible();
  });

  it('should render loading indicator when continue slider is panned', () => {
    const { getByTestId } = renderWithProviders(
      <ContinueSlider
        disabled={false}
        onSlideComplete={() => {}}
        reset={false}
        notification={{} as NotificationType}
      />,
      {},
    );

    act(() => {
      fireGestureHandler(getByGestureTestId('gesture-pan'), [
        { state: State.BEGAN, translationX: 0 },
        { state: State.ACTIVE, translationX: 100 },
        { translationX: 100 },
      ]);
    });

    expect(getByTestId('loading-indicator')).toBeVisible();
  });

  it('on reset slider, should reset slider and render arrow icon', () => {
    const resetValue = false;
    const { getByTestId, rerender } = renderWithProviders(
      <ContinueSlider
        onSlideComplete={() => {}}
        reset={resetValue}
        notification={{} as NotificationType}
        disabled={false}
      />,
      {},
    );

    expect(getByTestId('arrow-icon')).toBeVisible();

    act(() => {
      fireGestureHandler(getByGestureTestId('gesture-pan'), [
        { state: State.BEGAN, translationX: 0 },
        { translationX: 100 },
      ]);
    });

    act(() => {
      rerender(
        <ContinueSlider
          onSlideComplete={() => {}}
          reset={true}
          notification={{} as NotificationType}
          disabled={false}
        />,
      );
    });

    expect(getByTestId('arrow-icon')).toBeVisible();
  });

  it('Should render keep cancel icon if pressed on disabled mode', () => {
    const { getByTestId } = renderWithProviders(
      <ContinueSlider onSlideComplete={() => {}} reset={false} notification={{} as NotificationType} disabled={true} />,
      {
        initialAtomValues: [
          [notificationAtom, { default: { visible: false, message: 'Test', messageContent: 'Test' } }],
        ],
      },
    );

    act(() => {
      fireGestureHandler(getByGestureTestId('gesture-pan'), [
        { state: State.BEGAN, translationX: 0 },
        { translationX: 100 },
      ]);
    });

    expect(getByTestId('cancel-icon')).toBeVisible();
  });
});
