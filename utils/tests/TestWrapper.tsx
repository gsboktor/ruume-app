import React from 'react';

import { render, RenderOptions } from '@testing-library/react-native';

import { AtomProvider } from './AtomProvider';
import { ThemeProviderMock } from './ThemeProviderMock';

/* eslint-disable @typescript-eslint/no-explicit-any */
type TestWrapperProps = {
  children: React.ReactNode;
  initialAtomValues?: Array<[any, any]>;
};

export const TestWrapper = ({ children, initialAtomValues = [] }: TestWrapperProps) => {
  return (
    <ThemeProviderMock>
      <AtomProvider initialValues={initialAtomValues}>
        {children}
      </AtomProvider>
    </ThemeProviderMock>
  );
};

export const renderWithProviders = (
  component: React.ReactElement,
  {
    initialAtomValues = [],
    ...renderOptions
  }: Partial<RenderOptions & { initialAtomValues?: Array<[any, any]> }>,
) => render(<TestWrapper initialAtomValues={initialAtomValues}>{component}</TestWrapper>, renderOptions);
