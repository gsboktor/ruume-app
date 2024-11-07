import { useTransition } from '@Ruume/providers/TransitionsManager';
import { logger } from '@Ruume/services/logging';
import { profileService } from '@Ruume/services/profile';
import { notificationAtom } from '@Ruume/store';
import { DispatcherKeys } from '@Ruume/types/logging';
import { CreateProfileRequest } from '@Ruume/types/services/profile';

import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useCreateProfile = (uid?: string) => {
  const setNotification = useSetAtom(notificationAtom);
  const { enqueue } = useTransition();

  return useMutation({
    mutationFn: async (payload: Omit<CreateProfileRequest, 'user_id'>) => {
      {
        if (!uid) {
          throw new Error('No uid provided');
        }

        const profileRes = await profileService.createProfile({ ...payload, user_id: uid });

        //TODO: Create a custom error class that accepts a message, status code, and "action"
        //TODO: Add Status Code enum
        if (profileRes.status >= 400) {
          throw new Error('Response returned a non-200 code');
        }
        return profileRes.data?.[0];
      }
    },
    retry: 1,
    onSuccess: (data) => {
      if (data?.id) {
        setTimeout(() => {
          enqueue('/(tabs)/ruume-home');
        }, 500);
      }
    },
    onError: (error) => {
      logger.dispatch(DispatcherKeys.ERROR, 'useCreateProfile mutation failed', { ...error });
      if (!uid) {
        enqueue('/(auth)/ruume-sign-in-page');
      }
      setNotification({
        default: {
          visible: true,
          message: 'Whoops! Something failed.',
          messageContent: 'Sorry about that! Try signing in again.',
        },
      });
    },
  });
};
