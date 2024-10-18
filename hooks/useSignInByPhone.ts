import { authService } from '@Ruume/services/auth';
import { SignInType } from '@Ruume/types/services';

import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

export const useSignInByPhone = () => {
  return useMutation({
    mutationFn: async (signInPayload: SignInType) => {
      try {
        const { data, error } = await authService.signInWithPhone(signInPayload);
        if (error) {
          throw error;
        }

        return data;
      } catch (error) {
        console.log('Error signing in with phone:', error);
        throw error as AuthError;
      }
    },
    retry: 2,
  });
};
