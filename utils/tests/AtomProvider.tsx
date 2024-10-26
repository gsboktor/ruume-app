/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { HydrateAtoms } from './atoms';

import { Provider } from 'jotai';

export const AtomProvider = ({
  children,
  initialValues,
}: {
  children: React.ReactNode;
  initialValues: any;
}) => {
  return (
    <Provider>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </Provider>
  );
};
