/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHydrateAtoms } from 'jotai/utils';

export const HydrateAtoms = ({
  children,
  initialValues,
}: {
  children: React.ReactNode;
  initialValues: any;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};
