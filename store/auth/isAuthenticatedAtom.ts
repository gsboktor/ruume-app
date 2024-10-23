import { globalSessionAtom } from './globalSessionAtom';

import { atom } from 'jotai';

export const isAuthenticatedAtom = atom(async (get) => {
  const session = await get(globalSessionAtom);
  return session?.user?.role === 'authenticated';
});
