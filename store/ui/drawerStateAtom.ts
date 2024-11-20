import { DrawerStateType } from '@Ruume/types/store';

import { atom } from 'jotai';

export const drawerStateAtom = atom<DrawerStateType>({
  visible: false,
  content: undefined,
  breakPoints: { expanded: 0, collapsed: 0 },
});
