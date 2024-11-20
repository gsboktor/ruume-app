import { authService } from '@Ruume/services/auth';
import { logger } from '@Ruume/services/logging';
import { notificationAtom } from '@Ruume/store';
import { DispatcherKeys } from '@Ruume/types/logging';
import { SignInResponse, SignInType } from '@Ruume/types/services/auth';
import { tryAsync } from '@Ruume/utils/tryAsync';

import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useSignInByPhone = () => {
  const setNotification = useSetAtom(notificationAtom);

  return useMutation({
    mutationFn: async (signInPayload: SignInType) =>
      await tryAsync<SignInResponse, AuthError>(
        () => authService.signInWithPhone(signInPayload),
        (err) => {
          throw err;
        },
      ),
    onError: (error, v) => {
      logger.dispatch('Error signing in with phone', DispatcherKeys.ERROR, { error, phoneNumber: v.phoneNumber });
      setNotification({
        default: {
          visible: true,
          message: 'Error signing in with phone',
          messageContent: 'Please try again',
        },
      });
    },
    retry: 2,
  });
};
