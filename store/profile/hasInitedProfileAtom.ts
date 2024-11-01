import { appStorage } from '@Ruume/utils/jotai';

import { atomWithStorage } from 'jotai/utils';

export const hasInitedProfileAtom = atomWithStorage('ruume-profile-has-inited', false, appStorage<boolean>(), {
  getOnInit: true,
});
