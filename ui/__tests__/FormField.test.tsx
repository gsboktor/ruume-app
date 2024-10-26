/* eslint-disable simpleImportSort/imports */
import { renderWithProviders } from '@Ruume/utils/tests';
import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { FormField } from '../FormField';

describe('FormField', () => {
  it('renders correctly', () => {
    const { getByTestId } = renderWithProviders(<FormField testID="form-field" />, {});
    expect(getByTestId('form-field')).toBeDefined();
  });

  it('focuses and allows only numbers on numeric input mode', () => {
    const { getByTestId } = renderWithProviders(<FormField testID="form-field" inputMode="numeric" />, {});

    const input = getByTestId('form-field');

    fireEvent.press(input);
    fireEvent.changeText(input, '1234567890');

    expect(input).toHaveDisplayValue('1234567890');
  });

  it('focuses and uses text entry', () => {
    const { getByTestId } = renderWithProviders(<FormField testID="form-field" inputMode="text" />, {});

    const input = getByTestId('form-field');

    fireEvent.press(input);
    fireEvent.changeText(input, 'ABCDEFG');

    expect(input).toHaveDisplayValue('ABCDEFG');
  });
});
