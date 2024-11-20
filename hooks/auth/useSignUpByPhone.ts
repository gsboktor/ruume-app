import { useTransition } from '@Ruume/providers/TransitionsManager';
import { authService } from '@Ruume/services/auth';
import { logger } from '@Ruume/services/logging';
import { notificationAtom } from '@Ruume/store';
import { phoneNumberAtom } from '@Ruume/store/auth';
import { DispatcherKeys } from '@Ruume/types/logging';
import { SignUpResponse, SignUpType } from '@Ruume/types/services/auth';
import { tryAsync } from '@Ruume/utils/tryAsync';

import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useSignUpByPhone = () => {
  const setNotification = useSetAtom(notificationAtom);
  const setPhoneNumber = useSetAtom(phoneNumberAtom);
  const { enqueue } = useTransition();

  return useMutation({
    mutationFn: async (signUpPayload: SignUpType) => {
      return await tryAsync<SignUpResponse, AuthError>(
        () => authService.signUpWithPhone(signUpPayload),
        (err) => {
          throw err;
        },
      );
    },
    onError: (error, v) => {
      logger.dispatch('Error signing up with phone', DispatcherKeys.ERROR, {
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
      setPhoneNumber(data?.user?.phone ?? '');
      enqueue('/(auth)/ruume-otp-page');
    },
    retry: 2,
  });
};
