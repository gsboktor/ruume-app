import { queryClient } from '@Ruume/clients/react-query';
import { supabase } from '@Ruume/clients/supabase';

import { router } from 'expo-router';
import { atomEffect } from 'jotai-effect';

export const persistSessionAtomEffect = atomEffect(() => {
  const unsubscribe = supabase.auth.onAuthStateChange((_event) => {
    queryClient.invalidateQueries({ queryKey: ['user-session'] });
    switch (_event) {
      case 'SIGNED_IN':
        router.replace('/ruume-home');
        break;
      case 'SIGNED_OUT':
        router.replace('/(auth)/ruume-sign-in-page');
        break;
      case 'TOKEN_REFRESHED':
        break;
    }
  });

  return () => unsubscribe.data.subscription.unsubscribe();
});
