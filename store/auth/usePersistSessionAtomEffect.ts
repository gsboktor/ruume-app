// eslint-disable-next-line simpleImportSort/imports
import { supabase } from '@Ruume/clients/supabase';

import { globalSessionAtom } from './globalSessionAtom';

import { atomEffect } from 'jotai-effect';
import { RESET } from 'jotai/utils';

export const persistSessionAtomEffect = atomEffect((_, set) => {
  console.log('usePersistSessionAtomEffect');
  const unsubscribe = supabase.auth.onAuthStateChange((_event, session) => {
    switch (_event) {
      case 'SIGNED_IN':
        set(globalSessionAtom, session);
        break;
      case 'SIGNED_OUT':
        set(globalSessionAtom, RESET);
        break;
      case 'TOKEN_REFRESHED':
        set(globalSessionAtom, session);
        break;
    }
  });

  return () => unsubscribe.data.subscription.unsubscribe();
});
