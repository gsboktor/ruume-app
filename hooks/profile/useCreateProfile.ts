import { useTransition } from '@Ruume/providers/TransitionsManager';
import { logger } from '@Ruume/services/logging';
import { profileService } from '@Ruume/services/profile';
import { notificationAtom } from '@Ruume/store';
import { DispatcherKeys } from '@Ruume/types/logging';
import { CreateProfileRequest, ProfileType } from '@Ruume/types/services/profile';
import { tryAsync } from '@Ruume/utils/tryAsync';

import { PostgrestError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useCreateProfile = (uid?: string) => {
  const setNotification = useSetAtom(notificationAtom);
  const { enqueue } = useTransition();

  return useMutation<ProfileType | undefined, PostgrestError | Error, Omit<CreateProfileRequest, 'user_id'>>({
    mutationFn: async (payload: Omit<CreateProfileRequest, 'user_id'>) =>
      await tryAsync<ProfileType, PostgrestError | Error>(
        () => {
          if (!uid) {
            throw new Error('No uid provided');
          }
          return profileService.createProfile({ ...payload, user_id: uid });
        },
        (err) => {
          throw err;
        },
      ),
    retry: 1,
    onSuccess: (data) => {
      if (data?.id) {
        setTimeout(() => {
          enqueue('/(tabs)/ruume-home');
        }, 500);
      }
    },
    onError: (error) => {
      logger.dispatch('useCreateProfile mutation failed', DispatcherKeys.ERROR, { ...error });
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
