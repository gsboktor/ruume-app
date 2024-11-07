import { useTransition } from '@Ruume/providers/TransitionsManager';
import { authService } from '@Ruume/services/auth';
import { logger } from '@Ruume/services/logging';
import { notificationAtom } from '@Ruume/store';
import { phoneNumberAtom } from '@Ruume/store/auth';
import { DispatcherKeys } from '@Ruume/types/logging';
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
        throw error as AuthError;
      }
    },
    onError: (error, v) => {
      logger.dispatch(DispatcherKeys.ERROR, 'Error signing up with phone', {
        error,
        phoneNumber: v.phoneNumber,
      });
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
