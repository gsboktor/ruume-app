import { authService } from '@Ruume/services/auth';
import { SignUpType } from '@Ruume/types/services';

import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

export const useSignUpByPhone = () => {
  return useMutation({
    mutationFn: async (signUpPayload: SignUpType) => {
      try {
        const { data, error } = await authService.signUpWithPhone(signUpPayload);
        if (error) {
          throw error;
        }

        return data;
      } catch (error) {
        console.log('Error signing up with phone:', error);
        throw error as AuthError;
      }
    },
    retry: 2,
  });
};
