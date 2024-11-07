import React from 'react';

import placeholderImg from '@Ruume/assets/images/placeholder.png';
import { renderWithProviders } from '@Ruume/utils/tests';

import { ProfilePicturePicker } from '../ProfilePicturePicker';

jest.mock('@Ruume/assets/icons/add.svg', () => 'AddCircleIcon');

describe('ProfilePicker', () => {
  it('renders with placeholder image', () => {
    const { getByTestId } = renderWithProviders(<ProfilePicturePicker onAddPicture={() => {}} loading={false} />, {});
    const img = getByTestId('profile-image');

    expect(img).toBeDefined();
    expect(img.props.source).toEqual(placeholderImg);
  });

  it('renders with loading indicator if set to true', () => {
    const { getByTestId } = renderWithProviders(<ProfilePicturePicker onAddPicture={() => {}} loading={true} />, {});

    expect(getByTestId('loading-indicator')).toBeDefined();
  });
});
