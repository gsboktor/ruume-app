import React from 'react';

import { appTheme } from '@Ruume/ui/theme';

import { ThemeProvider } from 'styled-components/native';

const mockTheme = appTheme;

export const ThemeProviderMock = ({ children }: { children: React.ReactNode }) => {
  const theme = mockTheme;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
