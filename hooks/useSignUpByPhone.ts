import { useTransition } from '@Ruume/providers/TransitionsManager';
import { authService } from '@Ruume/services/auth';
import { notificationAtom } from '@Ruume/store';
import { phoneNumberAtom } from '@Ruume/store/auth';
import { SignUpType } from '@Ruume/types/services/auth';

import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useSignUpByPhone = () => {
  const setNotification = useSetAtom(notificationAtom);
  const setPhoneNumber = useSetAtom(phoneNumberAtom);
  const { enqueue } = useTransition();

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
    onError: () => {
      setNotification({
        default: {
          visible: true,
          message: 'Error signing up with phone',
          messageContent: 'Please try again',
        },
      });
    },
    onSuccess: (data) => {
      setPhoneNumber(data.user?.phone ?? '');
      enqueue('/(auth)/ruume-otp-page');
    },
    retry: 2,
  });
};
