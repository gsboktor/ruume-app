import { queryClient } from '@Ruume/clients/react-query';
import { supabase } from '@Ruume/clients/supabase';
import { FormType } from '@Ruume/types/forms';

import { formTypeAtom } from './formTypeAtom';

import { router } from 'expo-router';
import { atomEffect } from 'jotai-effect';

export const authStateAtomEffect = atomEffect((_, set) => {
  const unsubscribe = supabase.auth.onAuthStateChange((_event) => {
    queryClient.invalidateQueries({ queryKey: ['session'] });
    switch (_event) {
      case 'SIGNED_IN':
        router.replace('/');
        break;
      case 'SIGNED_OUT':
        set(formTypeAtom, FormType.SIGN_IN);
        router.replace('/(auth)/ruume-sign-in-page');
        break;
      case 'TOKEN_REFRESHED':
        break;
    }
  });

  return () => unsubscribe.data.subscription.unsubscribe();
});
