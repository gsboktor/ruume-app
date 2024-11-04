import { authService } from '@Ruume/services/auth';
import { VerifyOTPType } from '@Ruume/types/services/auth';

import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async (verifyOTPPayload: VerifyOTPType) => {
      try {
        const { data, error } = await authService.verifyOTP(verifyOTPPayload);
        if (error) {
          throw error;
        }

        return data;
      } catch (error) {
        console.log('Error verifying OTP', error);
        throw error as AuthError;
      }
    },
    retry: 2,
  });
};
