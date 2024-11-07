import { authService } from '@Ruume/services/auth';
import { logger } from '@Ruume/services/logging';
import { notificationAtom } from '@Ruume/store';
import { DispatcherKeys } from '@Ruume/types/logging';
import { SignInType } from '@Ruume/types/services/auth';

import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useSignInByPhone = () => {
  const setNotification = useSetAtom(notificationAtom);

  return useMutation({
    mutationFn: async (signInPayload: SignInType) => {
      try {
        const { data, error } = await authService.signInWithPhone(signInPayload);
        if (error) {
          throw error;
        }

        return data;
      } catch (error) {
        throw error as AuthError;
      }
    },
    onError: (error, v) => {
      logger.dispatch(DispatcherKeys.ERROR, 'Error signing in with phone', { error, phoneNumber: v.phoneNumber });
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
