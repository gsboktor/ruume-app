import { useRef } from 'react';

export const useRefArray = <T>() => {
  return useRef<T[]>([]);
};
